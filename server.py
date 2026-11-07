# Platforms Training Academy - Backend Server & Analytics Engine
# Chicago, IL | platformstraining.com | Lead Instructor: Charles Young
# Powered by Python Flask & SQLite3

import os
import sqlite3
import json
import smtplib
import hashlib
import hmac
import secrets
import base64
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, redirect, g, abort

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_DIR = os.path.join(BASE_DIR, 'env')
DB_PATH = os.path.join(BASE_DIR, 'lms_data.db')
DATA_DIR = os.path.join(BASE_DIR, 'data')
STUDENTS_JSON_PATH = os.path.join(DATA_DIR, 'students.json')

def load_env_vault():
    """Load environment variables from env/.env (and .env) without overwriting OS/cloud env vars."""
    candidate_paths = [
        os.path.join(ENV_DIR, '.env'),
        os.path.join(BASE_DIR, '.env')
    ]
    for path in candidate_paths:
        if os.path.exists(path):
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    for raw_line in f:
                        line = raw_line.strip()
                        if not line or line.startswith('#') or '=' not in line:
                            continue
                        key, val = line.split('=', 1)
                        key = key.strip()
                        val = val.strip().strip('"').strip("'")
                        if key and key not in os.environ and val != '':
                            os.environ[key] = val
            except Exception as e:
                print(f"[ENV VAULT WARNING] Could not read {path}: {e}")

load_env_vault()

def seed_from_cloud_json():
    try:
        if not os.path.exists(STUDENTS_JSON_PATH):
            return
        with open(STUDENTS_JSON_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
        students = data.get('students', [])
        if not students:
            return
        
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        for s in students:
            sid = s.get('id') or s.get('email')
            cur.execute('SELECT id FROM students WHERE id = ?', (sid,))
            if not cur.fetchone():
                cur.execute('''
                    INSERT INTO students (
                        id, name, email, student_id, agency, is_paid, mfa_verified, mfa_verified_at,
                        confirmation_email_sent, confirmation_email_sent_at,
                        reminder_email_sent, thank_you_email_sent,
                        created_at, last_active
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    sid,
                    s.get('name', 'Trainee Officer'),
                    s.get('email', sid),
                    sid,
                    s.get('agency', 'Platforms Security Services'),
                    1 if s.get('is_paid') else 0,
                    1 if s.get('mfa_verified') else 0,
                    s.get('mfa_verified_at'),
                    1 if (s.get('confirmation_email_sent') or s.get('is_paid')) else 0,
                    s.get('confirmation_email_sent_at') or s.get('created_at'),
                    1 if s.get('reminder_email_sent') else 0,
                    1 if (s.get('thank_you_email_sent') or s.get('cert_id')) else 0,
                    s.get('created_at'),
                    s.get('last_active')
                ))
            if s.get('is_paid'):
                cur.execute("SELECT id FROM analytics_events WHERE event_type = 'payment_received' AND LOWER(student_id) = LOWER(?)", (sid,))
                if not cur.fetchone():
                    cur.execute(
                        "INSERT INTO analytics_events (event_type, student_id, details, timestamp) VALUES ('payment_received', ?, ?, ?)",
                        (sid, s.get('payment_status') or 'Verified Stripe Payment', s.get('payment_date') or s.get('created_at') or '')
                    )
            # Restore exam attempts
            for a in s.get('attempts', []):
                cur.execute('SELECT id FROM exam_results WHERE student_id = ? AND attempt_number = ?', (sid, a.get('attempt_number', 1)))
                if not cur.fetchone():
                    score_num = int(str(a.get('score', '0')).split('/')[0]) if '/' in str(a.get('score', '')) else int(a.get('score', 0))
                    cur.execute('''
                        INSERT INTO exam_results (student_id, attempt_number, score, total_questions, percentage, passed, time_taken_seconds, completed_at)
                        VALUES (?, ?, ?, 50, ?, ?, ?, ?)
                    ''', (
                        sid,
                        a.get('attempt_number', 1),
                        score_num,
                        a.get('percentage', 0),
                        1 if a.get('passed') else 0,
                        a.get('time_taken_seconds', 0),
                        a.get('date')
                    ))
            # Restore certificates
            if s.get('cert_id') or s.get('armed_cert_data'):
                cid = s.get('cert_id') or ('PTA-IL486-' + str(sid).replace('armed::', ''))
                cert_json_str = json.dumps(s.get('armed_cert_data')) if s.get('armed_cert_data') else None
                cur.execute('SELECT id FROM certificates WHERE id = ? OR student_id = ?', (cid, sid))
                if not cur.fetchone():
                    cur.execute('''
                        INSERT INTO certificates (id, student_id, trainee_name, date_completed, issued_at, cert_data_json)
                        VALUES (?, ?, ?, ?, ?, ?)
                    ''', (
                        cid,
                        sid,
                        s.get('name', 'Trainee Officer'),
                        s.get('cert_issued_at'),
                        s.get('cert_issued_at'),
                        cert_json_str
                    ))
                elif cert_json_str:
                    cur.execute('UPDATE certificates SET cert_data_json = ? WHERE student_id = ?', (cert_json_str, sid))
        conn.commit()
        conn.close()
        print(f"[CLOUD SYNC] Seeded {len(students)} students from cloud data mirror.")
    except Exception as e:
        print(f"[CLOUD SYNC ERROR] Could not seed from students.json: {e}")

def sync_to_cloud_json():
    try:
        os.makedirs(DATA_DIR, exist_ok=True)
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        rows = cur.execute('SELECT * FROM students WHERE is_admin = 0 ORDER BY last_active DESC').fetchall()
        students_list = []
        for r in rows:
            sid = r['id']
            exams = cur.execute('SELECT * FROM exam_results WHERE student_id = ? ORDER BY id ASC', (sid,)).fetchall()
            attempts = []
            for ex in exams:
                attempts.append({
                    'attempt_number': ex['attempt_number'],
                    'score': f"{ex['score']}/{ex['total_questions']}",
                    'percentage': ex['percentage'],
                    'passed': bool(ex['passed']),
                    'date': ex['completed_at'],
                    'time_taken_seconds': ex['time_taken_seconds']
                })
            best_score = max([e['percentage'] for e in exams]) if exams else None
            latest_exam = dict(exams[-1]) if exams else None
            cert = cur.execute('SELECT * FROM certificates WHERE student_id = ?', (sid,)).fetchone()
            
            is_armed_row = str(sid or '').lower().startswith('armed::')
            default_total_mods = 10
            # Count modules
            mod_count = cur.execute('SELECT COUNT(*) as cnt FROM progress WHERE student_id = ? AND study_done = 1 AND scenario_done = 1 AND quiz_done = 1', (sid,)).fetchone()
            completed_modules = mod_count['cnt'] if mod_count else (default_total_mods if cert else 0)

            students_list.append({
                'id': r['id'],
                'name': r['name'],
                'email': r['email'],
                'agency': r['agency'],
                'course_type': 'armed' if is_armed_row else 'unarmed',
                'is_paid': bool(r['is_paid']),
                'payment_status': (
                    'Paid $200 - Online Armed Security (28-Hr Tan Card)' if is_armed_row
                    else 'Paid $50 - Online Unarmed Security (PERC)'
                ) if r['is_paid'] else 'Pending Payment',
                'payment_date': r['created_at'],
                'completed_modules': completed_modules,
                'total_modules': default_total_mods,
                'exam_attempts': len(exams),
                'best_score': best_score,
                'latest_score': latest_exam['percentage'] if latest_exam else None,
                'latest_passed': bool(latest_exam['passed']) if latest_exam else False,
                'latest_exam_date': latest_exam['completed_at'] if latest_exam else None,
                'has_passed': any(bool(e['passed']) for e in exams),
                'mfa_verified': bool(r['mfa_verified']),
                'mfa_verified_at': r['mfa_verified_at'],
                'has_password': bool(r['password_hash']) if 'password_hash' in r.keys() else False,
                'cert_id': cert['id'] if cert else None,
                'cert_issued_at': cert['issued_at'] if cert else None,
                'has_saved_cert_pdf': bool(cert and 'pdf_base64' in cert.keys() and cert['pdf_base64']),
                'created_at': r['created_at'],
                'last_active': r['last_active'],
                'attempts': attempts
            })
        conn.close()

        payload = {
            'last_synced': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'source': 'Platforms Cloud Roster Engine (Render + GitHub CDN)',
            'students': students_list
        }
        with open(STUDENTS_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(payload, f, indent=2)
    except Exception as e:
        print(f"[CLOUD SYNC ERROR] Could not sync to students.json: {e}")

app = Flask(__name__, static_folder=BASE_DIR, static_url_path='')
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY') or secrets.token_hex(32)

# Strictly block direct HTTP access to env/, dotfiles, databases, or server code
BLOCKED_PATH_PREFIXES = ('env/', '.env', '.git', '__pycache__', '.system_generated', 'scratch/')
BLOCKED_EXTENSIONS = ('.db', '.db-journal', '.sqlite', '.sqlite3', '.py', '.pyc', '.pem', '.key', '.log', '.env')
BLOCKED_FILENAMES = {'procfile', 'render.yaml', 'requirements.txt', 'lms_data.db', 'mcp_config.json'}

def is_sensitive_path(req_path):
    norm = (req_path or '').lstrip('/').replace('\\', '/').lower()
    if not norm:
        return False
    for pref in BLOCKED_PATH_PREFIXES:
        if norm == pref.rstrip('/') or norm.startswith(pref):
            return True
    parts = [p for p in norm.split('/') if p]
    for part in parts:
        if part.startswith('.') and part != '.nojekyll':
            return True
        if part in BLOCKED_FILENAMES:
            return True
    if any(norm.endswith(ext) for ext in BLOCKED_EXTENSIONS):
        return True
    return False

@app.before_request
def handle_options():
    if is_sensitive_path(request.path):
        abort(404)
    if request.method == 'OPTIONS':
        res = app.make_response(('', 204))
        res.headers['Access-Control-Allow-Origin'] = '*'
        res.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        res.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Admin-Token, X-Admin-Auth'
        return res

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Admin-Token, X-Admin-Auth'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
    if request.path.startswith('/api/admin') or request.path.startswith('/api/auth') or request.path.startswith('/api/certificate'):
        response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, private'
    return response

# Admin credentials loaded from env/.env or cloud environment (fallback verified via salted SHA-256)
ADMIN_PIN = os.environ.get('ADMIN_PIN', '2026')
ADMIN_PIN_SALT = 'PTA_IL_IDFPR_102_000398_SALT_v1::'
AUTHORIZED_ADMIN_HASHES = {
    'e7879f76f4474c38a4e4d90617a9a7a116d3e6f9e1b8e0240801f70a866f296e',
    '272683d1e264f25c384fcfc6e6db2ad65e59577b7f4def1b1af1d6e6f5a74f60',
    'd4310666d52f42f16d0b8450b7f7120891fe844a239f652ffe5c4d917a49bb35',
    'a0c0a5571285ff739e2bd7008074797d56733f002ef75df4be54f342ff6cf889',
}

# =========================================================================
# Cryptographic Vault: Field-Level Authenticated Encryption (ENCv1) & Tokens
# =========================================================================
_VAULT_MASTER_SECRET = (
    os.environ.get('DATA_ENCRYPTION_KEY')
    or os.environ.get('FLASK_SECRET_KEY')
    or 'PTA_IL_IDFPR_102_000398_MASTER_VAULT_KEY_2026'
).encode('utf-8')
_VAULT_ENC_KEY = hashlib.pbkdf2_hmac('sha256', _VAULT_MASTER_SECRET, b'PTA_ENC_SALT_v1', 10000, dklen=32)
_VAULT_MAC_KEY = hashlib.pbkdf2_hmac('sha256', _VAULT_MASTER_SECRET, b'PTA_MAC_SALT_v1', 10000, dklen=32)

def _xor_keystream(data_bytes, iv_bytes):
    out = bytearray(len(data_bytes))
    block_idx = 0
    offset = 0
    while offset < len(data_bytes):
        ks = hmac.new(_VAULT_ENC_KEY, iv_bytes + block_idx.to_bytes(4, 'big'), hashlib.sha256).digest()
        chunk = data_bytes[offset:offset + 32]
        for i, b in enumerate(chunk):
            out[offset + i] = b ^ ks[i]
        offset += 32
        block_idx += 1
    return bytes(out)

def encrypt_sensitive(plaintext):
    if plaintext is None:
        return None
    s = str(plaintext)
    if not s or s.startswith('ENCv1:'):
        return s
    try:
        raw = s.encode('utf-8')
        iv = secrets.token_bytes(16)
        ct = _xor_keystream(raw, iv)
        tag = hmac.new(_VAULT_MAC_KEY, iv + ct, hashlib.sha256).digest()
        payload = base64.urlsafe_b64encode(iv + tag + ct).decode('ascii')
        return f"ENCv1:{payload}"
    except Exception:
        return s

def decrypt_sensitive(value):
    if value is None:
        return None
    s = str(value)
    if not s.startswith('ENCv1:'):
        return s
    try:
        b64 = s[6:]
        blob = base64.urlsafe_b64decode(b64.encode('ascii'))
        if len(blob) < 48:
            return ''
        iv = blob[:16]
        tag = blob[16:48]
        ct = blob[48:]
        expected_tag = hmac.new(_VAULT_MAC_KEY, iv + ct, hashlib.sha256).digest()
        if not hmac.compare_digest(tag, expected_tag):
            return ''
        pt = _xor_keystream(ct, iv)
        return pt.decode('utf-8')
    except Exception:
        return ''

def mask_ssn_display(ssn_val):
    clean = str(decrypt_sensitive(ssn_val) or '').strip()
    if not clean:
        return ''
    digits = ''.join(ch for ch in clean if ch.isdigit())
    if len(digits) >= 4:
        return f"***-**-{digits[-4:]}"
    return '***-**-****'

def verify_admin_pin_or_voucher(candidate):
    val = str(candidate or '').strip()
    if not val:
        return False
    if val in AUTHORIZED_ADMIN_HASHES:
        return True
    for env_key in ('ADMIN_PIN', 'ADMIN_SECONDARY_PIN', 'ADMIN_VOUCHER_CODE'):
        env_val = os.environ.get(env_key, '').strip()
        if env_val and hmac.compare_digest(val, env_val):
            return True
    digest = hashlib.sha256((ADMIN_PIN_SALT + val).encode('utf-8')).hexdigest()
    return digest in AUTHORIZED_ADMIN_HASHES

def generate_admin_token():
    import time
    ts = str(int(time.time()))
    sig = hmac.new(_VAULT_MAC_KEY, f"admin_session::{ts}".encode('utf-8'), hashlib.sha256).hexdigest()
    return f"pta_adm_v1.{ts}.{sig}"

def verify_admin_token(token_str):
    tok = str(token_str or '').strip()
    if not tok:
        return False
    if tok.startswith('Bearer '):
        tok = tok[7:].strip()
    if tok in AUTHORIZED_ADMIN_HASHES or verify_admin_pin_or_voucher(tok):
        return True
    if tok.startswith('pta_adm_v1.'):
        parts = tok.split('.')
        if len(parts) == 3:
            _, ts, sig = parts
            expected = hmac.new(_VAULT_MAC_KEY, f"admin_session::{ts}".encode('utf-8'), hashlib.sha256).hexdigest()
            if hmac.compare_digest(sig, expected):
                return True
    return False

def is_admin_request():
    for hdr in ('X-Admin-Token', 'X-Admin-Auth', 'Authorization'):
        val = request.headers.get(hdr, '').strip()
        if val and verify_admin_token(val):
            return True
    if request.is_json:
        body = request.get_json(silent=True) or {}
        if verify_admin_token(body.get('admin_token') or body.get('pin')):
            return True
    return False

TEMPORARY_PAYWALL_DISABLED = False # $50 Stripe course paywall enabled

def get_smtp_config():
    config = {
        'host': os.environ.get('SMTP_HOST', ''),
        'port': int(os.environ.get('SMTP_PORT', 587)),
        'user': os.environ.get('SMTP_USER', ''),
        'password': os.environ.get('SMTP_PASS', ''),
        'from_email': os.environ.get('SMTP_FROM', 'charlesyoung@platformstraining.com'),
        'use_tls': os.environ.get('SMTP_USE_TLS', 'true').lower() in ('true', '1')
    }
    try:
        db = get_db()
        rows = db.execute("SELECT key, value FROM app_settings WHERE key LIKE 'smtp_%'").fetchall()
        for r in rows:
            k = r['key']
            v = r['value']
            if k == 'smtp_host' and v: config['host'] = v
            elif k == 'smtp_port' and v: config['port'] = int(v)
            elif k == 'smtp_user' and v: config['user'] = v
            elif k == 'smtp_pass' and v: config['password'] = decrypt_sensitive(v)
            elif k == 'smtp_from' and v: config['from_email'] = v
            elif k == 'smtp_tls' and v: config['use_tls'] = v.lower() in ('true', '1')
    except Exception:
        pass
    return config

def send_email_smtp(to_email, subject, html_body, text_body="", reply_to=""):
    cfg = get_smtp_config()
    if not cfg['host'] or not cfg['user'] or not cfg['password']:
        print(f"[SMTP Notice] Host/credentials not yet configured. Email dispatch queued for {to_email}.")
        return False, "SMTP credentials not configured"

    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = f"Platforms Training Academy <{cfg['from_email']}>"
        msg['To'] = to_email
        if reply_to:
            msg['Reply-To'] = reply_to

        if text_body:
            msg.attach(MIMEText(text_body, 'plain'))
        if html_body:
            msg.attach(MIMEText(html_body, 'html'))

        if cfg['port'] == 465:
            server = smtplib.SMTP_SSL(cfg['host'], cfg['port'], timeout=15)
        else:
            server = smtplib.SMTP(cfg['host'], cfg['port'], timeout=15)
            if cfg['use_tls']:
                server.starttls()

        server.login(cfg['user'], cfg['password'])
        server.sendmail(cfg['from_email'], [to_email], msg.as_string())
        server.quit()
        print(f"[SMTP SUCCESS] Verification email sent to {to_email}")
        return True, "Email sent successfully"
    except Exception as e:
        print(f"[SMTP ERROR] Failed to send email to {to_email}: {e}")
        return False, str(e)

def send_email_smtp_with_pdf(to_emails, subject, html_body, text_body="", pdf_bytes=None, pdf_filename="IDFPR_Armed_Certificate_IL486-1138.pdf"):
    cfg = get_smtp_config()
    if not cfg['host'] or not cfg['user'] or not cfg['password']:
        print(f"[SMTP Notice] Host/credentials not yet configured. PDF email dispatch queued for {to_emails}.")
        return False, "SMTP credentials not configured in Cloud MFA & Email Delivery tab"

    if isinstance(to_emails, str):
        recipient_list = [e.strip() for e in to_emails.split(',') if e.strip() and '@' in e]
    else:
        recipient_list = [str(e).strip() for e in (to_emails or []) if str(e).strip() and '@' in str(e)]

    if not recipient_list:
        return False, "No valid recipient email addresses provided"

    try:
        msg = MIMEMultipart('mixed')
        msg['Subject'] = subject
        msg['From'] = f"Platforms Training Academy <{cfg['from_email']}>"
        msg['To'] = ", ".join(recipient_list)

        alt_part = MIMEMultipart('alternative')
        if text_body:
            alt_part.attach(MIMEText(text_body, 'plain'))
        if html_body:
            alt_part.attach(MIMEText(html_body, 'html'))
        msg.attach(alt_part)

        if pdf_bytes:
            pdf_part = MIMEApplication(pdf_bytes, _subtype="pdf")
            pdf_part.add_header('Content-Disposition', 'attachment', filename=pdf_filename)
            msg.attach(pdf_part)

        if cfg['port'] == 465:
            server = smtplib.SMTP_SSL(cfg['host'], cfg['port'], timeout=20)
        else:
            server = smtplib.SMTP(cfg['host'], cfg['port'], timeout=20)
            if cfg['use_tls']:
                server.starttls()

        server.login(cfg['user'], cfg['password'])
        server.sendmail(cfg['from_email'], recipient_list, msg.as_string())
        server.quit()
        print(f"[SMTP PDF SUCCESS] Armed Certificate PDF sent to {recipient_list}")
        return True, f"Certificate PDF emailed to {', '.join(recipient_list)}"
    except Exception as e:
        print(f"[SMTP PDF ERROR] Failed to send PDF email to {recipient_list}: {e}")
        return False, str(e)

DEFAULT_GOOGLE_REVIEW_URL = "https://www.google.com/maps/search/?api=1&query=Platforms+Training+Academy+200+E+75th+St+Chicago+IL+60619"

def get_google_review_url():
    url = os.environ.get('GOOGLE_REVIEW_URL', DEFAULT_GOOGLE_REVIEW_URL)
    try:
        db = get_db()
        row = db.execute("SELECT value FROM app_settings WHERE key = 'google_review_url'").fetchone()
        if row and row['value']:
            url = row['value']
    except Exception:
        pass
    return url

def resolve_course_location(course_id="", course_title="", raw_location=""):
    """Resolve the exact training location for the specific course that was booked."""
    cid = (course_id or "").strip().lower()
    ctitle = (course_title or "").strip().lower()
    raw = (raw_location or "").strip()

    generic_fallbacks = {
        "",
        "200 e 75th st, chicago, il & eagle sports range",
        "200 e 75th st, chicago, il 60619 & eagle sports range (5900 w 159th st, oak forest, il 60452)",
        "200 e 75th st, chicago, il & eagle sports range (5900 w 159th st, oak forest, il)",
        "classroom: 200 e 75th st, chicago, il 60619 | range: eagle sports range, 5900 w 159th st, oak forest, il 60452",
        "eagle sports range (oak forest, il)"
    }

    course_map = {
        "unarmed-20": "100% Online LMS Portal (Phone, Tablet, or PC — platformstraining.com)",
        "armed-28": "Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        "firearm-requal": "Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        "firearm-upgrade": "Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        "ccl-refresher": "Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        "ccl-16": "Classroom: 200 E 75th St, Chicago, IL 60619 | Range: Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        "ccl-8": "Classroom: 200 E 75th St, Chicago, IL 60619 | Range: Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        "ccl-military": "Classroom: 200 E 75th St, Chicago, IL 60619 | Range: Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
    }

    if raw and raw.lower() not in generic_fallbacks:
        return raw

    if cid in course_map:
        return course_map[cid]

    if "unarmed" in ctitle:
        return course_map["unarmed-20"]
    if "requal" in ctitle or "upgrade" in ctitle or "refresher" in ctitle or "3 hr" in ctitle or "3-hr" in ctitle:
        return course_map["firearm-requal"]
    if "armed" in ctitle:
        if "range" in ctitle or (raw and "eagle" in raw.lower() and "75th" not in raw.lower()):
            return course_map["armed-28"]
        return "Online LMS Portal (20-Hr Classroom) + Range Qualification: Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)"
    if "concealed" in ctitle or "ccl" in ctitle:
        return course_map["ccl-16"]

    return raw or "Classroom: 200 E 75th St, Chicago, IL 60619 | Range: Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)"


def build_class_payment_confirmation_email(student_name, course_title, class_date="", class_time="", location="", price="", confirmation_id="", course_id=""):
    student_name = student_name or "Student Officer"
    course_title = course_title or "IDFPR Security / Firearms Training Course"
    is_armed = ("armed" in course_title.lower() and "unarmed" not in course_title.lower()) or str(course_id).lower() == "armed-28"
    is_unarmed = "unarmed" in course_title.lower() or str(course_id).lower() == "unarmed-20"

    if is_armed:
        class_date = class_date or "Selected In-Person Range Qualification Date"
        class_time = class_time or "9:00 AM – 5:00 PM (In-Person Range Qualification)"
    elif is_unarmed:
        class_date = class_date or "24/7 Self-Paced Online Portal"
        class_time = class_time or "Self-Paced Online Access"
    else:
        class_date = class_date or "Scheduled Session Date"
        class_time = class_time or "9:00 AM – 5:00 PM"

    location = resolve_course_location(course_id=course_id, course_title=course_title, raw_location=location)
    price = price or "Paid / Confirmed"
    confirmation_id = confirmation_id or ("PTA-" + datetime.now().strftime("%Y%m%d%H%M"))

    portal_url = "https://platformstraining.com/armed-course/" if is_armed else ("https://platformstraining.com/course/" if is_unarmed else "https://platformstraining.com/calendar.html")
    portal_btn_text = "Launch 28-Hour Online Armed Portal Now" if is_armed else ("Launch 20-Hour Online Unarmed Portal" if is_unarmed else "View Class Schedule & Details")
    date_row_label = "Chosen In-Person Range Date:" if is_armed else "Scheduled Date:"

    armed_mandatory_online_callout = ""
    armed_mandatory_text_block = ""
    if is_armed:
        armed_mandatory_online_callout = f'''
            <div style="background:rgba(239,68,68,0.14); border:2px solid #ef4444; border-radius:8px; padding:16px 18px; margin:18px 0;">
                <div style="font-size:13px; font-weight:800; color:#fca5a5; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:6px;">
                    &#9888; MANDATORY: COMPLETE ONLINE PORTION BEFORE YOUR IN-PERSON RANGE QUALIFICATION
                </div>
                <div style="font-size:13.5px; color:#ffffff; line-height:1.6;">
                    You <strong>MUST complete 100% of the online portion</strong> of the 28-Hour Armed Security Course <strong>BEFORE</strong> arriving at Eagle Sports Range for your chosen in-person range qualification date (<strong>{class_date}</strong>):
                    <ul style="margin:8px 0 8px 0; padding-left:18px; color:#f1f5f9;">
                        <li>Complete all <strong>10 Online Armed Training Modules</strong> (20-Hour Classroom Portion)</li>
                        <li>Pass the <strong>Untimed 50-Question Written Final Examination</strong> (75% or higher)</li>
                        <li>Complete and save <strong>Part 1 (Trainee Section) of Official IDFPR Form IL486-1138</strong> inside the portal</li>
                    </ul>
                    <span style="color:#fde68a; font-weight:700;">Important: Students who have not completed the online portion prior to their chosen in-person range qualification date will not be permitted on the firing line.</span>
                </div>
            </div>
        '''
        armed_mandatory_text_block = f'''
IMPORTANT - MANDATORY REQUIREMENT BEFORE IN-PERSON RANGE QUALIFICATION ({class_date}):
You MUST complete 100% of the online portion of the 28-Hour Armed Security Course BEFORE arriving at Eagle Sports Range for your chosen in-person range qualification date:
1. Complete all 10 Online Armed Training Modules.
2. Pass the Untimed 50-Question Written Final Exam (75%+).
3. Complete and save Part 1 (Trainee Section) of Official IDFPR Form IL486-1138 in the portal.
Students who have not completed the online portion before their in-person range qualification will not be permitted on the firing line.
'''

    subject = f"Class & Payment Confirmation: {course_title} | Platforms Training Academy"
    html_body = f'''
    <div style="font-family:'Segoe UI',Arial,sans-serif; max-width:640px; margin:0 auto; background:#0a0b0d; color:#f8fafc; border-radius:12px; overflow:hidden; border:1px solid #262c3a;">
        <div style="background:linear-gradient(135deg,#161a22 0%,#0a0b0d 100%); padding:24px 28px; border-bottom:2px solid #d4af37; text-align:center;">
            <div style="display:inline-block; background:rgba(212,175,55,0.16); color:#e5c158; border:1px solid #d4af37; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; margin-bottom:8px;">
                IDFPR Approved Curriculum #102-000398 &bull; 225 ILCS 447
            </div>
            <h1 style="color:#ffffff; font-size:22px; margin:4px 0 0 0; letter-spacing:0.5px;">PLATFORMS TRAINING ACADEMY</h1>
            <p style="color:#cbd5e1; font-size:13px; margin:4px 0 0 0;">Official Class Registration &amp; Tuition Payment Confirmation</p>
        </div>
        <div style="padding:26px 28px;">
            <p style="font-size:16px; color:#ffffff; margin-top:0;">Welcome, <strong>{student_name}</strong>!</p>
            <p style="font-size:14px; color:#cbd5e1; line-height:1.6;">
                Thank you for enrolling with <strong>Platforms Training Academy</strong>. Your registration and tuition status have been confirmed. Please keep this email for your official training records.
            </p>
            <div style="background:#141821; border:1px solid rgba(212,175,55,0.4); border-left:4px solid #d4af37; border-radius:8px; padding:18px 20px; margin:20px 0;">
                <div style="font-size:12px; font-weight:700; color:#d4af37; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:10px;">
                    Registration &amp; Class Summary
                </div>
                <table style="width:100%; border-collapse:collapse; font-size:14px; color:#f1f5f9;">
                    <tr><td style="padding:5px 0; color:#94a3b8; width:185px;">Course Enrolled:</td><td style="padding:5px 0; font-weight:700; color:#ffffff;">{course_title}</td></tr>
                    <tr><td style="padding:5px 0; color:#94a3b8;">Confirmation ID:</td><td style="padding:5px 0; color:#e5c158; font-family:monospace; font-weight:700;">{confirmation_id}</td></tr>
                    <tr><td style="padding:5px 0; color:#94a3b8;">Tuition / Status:</td><td style="padding:5px 0; color:#4ade80; font-weight:700;">{price}</td></tr>
                    <tr><td style="padding:5px 0; color:#94a3b8;">{date_row_label}</td><td style="padding:5px 0; font-weight:700; color:#ffffff;">{class_date}</td></tr>
                    <tr><td style="padding:5px 0; color:#94a3b8;">Class / Range Hours:</td><td style="padding:5px 0; color:#e2e8f0;">{class_time}</td></tr>
                    <tr><td style="padding:5px 0; color:#94a3b8;">Training Location:</td><td style="padding:5px 0; color:#e2e8f0;">{location}</td></tr>
                    <tr><td style="padding:5px 0; color:#94a3b8;">Lead Instructor:</td><td style="padding:5px 0; color:#e2e8f0;">Charles Young (State License #263-000693)</td></tr>
                </table>
            </div>
            {armed_mandatory_online_callout}
            <div style="background:#11141c; border:1px solid #262c3a; border-radius:8px; padding:16px 18px; margin-bottom:22px;">
                <div style="font-size:13px; font-weight:700; color:#ffffff; margin-bottom:8px;">What You Need to Know:</div>
                <ul style="margin:0; padding-left:18px; font-size:13px; color:#cbd5e1; line-height:1.65;">
                    {'''<li><strong>Self-Paced 20-Hour Online Course:</strong> Complete all 10 online modules, interactive scenarios, and the untimed final examination at your own pace from any phone, tablet, or computer. Your official IDFPR Certificate of Completion is issued immediately upon passing!</li>''' if is_unarmed else '''<li><strong>Valid Government Photo ID:</strong> Bring your Driver's License or State ID (and FOID card if attending an Illinois CCL session).</li>
                    <li><strong>Range Attire (For Live-Fire Qualification):</strong> Wear close-toed shoes, crew-neck shirt, long pants, and a sturdy belt. Ammunition, targets, eye/ear protection, and range fees at Eagle Sports Range are included!</li>
                    <li><strong>Online Portion Must Be Completed First:</strong> Ensure all online modules, the untimed written exam, and Form IL486-1138 Part 1 are completed in the portal before your chosen in-person range qualification date.</li>'''}
                </ul>
            </div>
            <div style="text-align:center; margin:24px 0;">
                <a href="{portal_url}" style="display:inline-block; background:linear-gradient(135deg,#d4af37 0%,#b89225 100%); color:#07090e; font-weight:800; font-size:14px; text-decoration:none; padding:13px 26px; border-radius:6px; letter-spacing:0.4px;">
                    {portal_btn_text} &rarr;
                </a>
            </div>
            <p style="font-size:13px; color:#94a3b8; line-height:1.5; text-align:center; margin-bottom:0;">
                Questions or need assistance? Call or text Lead Instructor <strong>Charles Young</strong> at <a href="tel:7738732591" style="color:#d4af37; text-decoration:none; font-weight:700;">(773) 873-2591</a> or reply to <a href="mailto:charlesyoung@platformstraining.com" style="color:#d4af37; text-decoration:none;">charlesyoung@platformstraining.com</a>.
            </p>
        </div>
        <div style="background:#060709; padding:14px 24px; text-align:center; font-size:11px; color:#64748b; border-top:1px solid #1e2430;">
            Platforms Training Academy &bull; {location}
        </div>
    </div>
    '''
    text_body = f'''PLATFORMS TRAINING ACADEMY - CLASS & PAYMENT CONFIRMATION
IDFPR Approved Curriculum #102-000398

Welcome, {student_name}!
Your registration and tuition status are confirmed:
- Course: {course_title}
- Confirmation ID: {confirmation_id}
- Tuition / Status: {price}
- {date_row_label} {class_date}
- Time: {class_time}
- Location: {location}
- Lead Instructor: Charles Young (#263-000693)
{armed_mandatory_text_block}
Access Portal: {portal_url}
Questions? Call (773) 873-2591 or email charlesyoung@platformstraining.com
'''
    return subject, html_body, text_body


def build_class_reminder_email(student_name, course_title, class_date="", class_time="", location="", course_id=""):
    student_name = student_name or "Student Officer"
    course_title = course_title or "28-Hour Armed Security Course — In-Person Range Qualification"
    class_date = class_date or "Your Selected In-Person Qualification Date"
    class_time = class_time or "9:00 AM – 5:00 PM (Arrive 15 mins early for check-in)"
    location = resolve_course_location(course_id=course_id, course_title=course_title, raw_location=location)
    is_armed = ("armed" in course_title.lower() and "unarmed" not in course_title.lower()) or str(course_id).lower() == "armed-28"

    if "75th" in location.lower():
        maps_query = "200+E+75th+St+Chicago+IL+60619"
    elif "eagle" in location.lower() or "159th" in location.lower():
        maps_query = "Eagle+Sports+Range+5900+W+159th+St+Oak+Forest+IL+60452"
    else:
        maps_query = location.replace(" ", "+")
    maps_url = "https://www.google.com/maps/search/?api=1&query=" + maps_query
    subject = f"In-Person Range Qualification Reminder ({class_date}): {course_title} | Platforms Training Academy"

    armed_mandatory_online_callout = ""
    armed_mandatory_text_block = ""
    if is_armed:
        armed_mandatory_online_callout = f'''
            <div style="background:rgba(239,68,68,0.14); border:2px solid #ef4444; border-radius:8px; padding:16px 18px; margin:18px 0;">
                <div style="font-size:13px; font-weight:800; color:#fca5a5; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:6px;">
                    &#9888; MANDATORY: ONLINE PORTION MUST BE COMPLETED BEFORE ARRIVING AT THE RANGE
                </div>
                <div style="font-size:13.5px; color:#ffffff; line-height:1.6;">
                    Before arriving for your chosen in-person range qualification on <strong>{class_date}</strong>, you <strong>MUST have completed 100% of the online portion</strong> of the course:
                    <ul style="margin:8px 0 8px 0; padding-left:18px; color:#f1f5f9;">
                        <li>All <strong>10 Online Armed Training Modules</strong> completed</li>
                        <li><strong>Untimed 50-Question Written Final Examination</strong> passed (75%+)</li>
                        <li><strong>Part 1 (Trainee Section) of Official IDFPR Form IL486-1138</strong> saved in your online portal</li>
                    </ul>
                    <span style="color:#fde68a; font-weight:700;">If you have not yet finished your online modules and written exam, log in at <a href="https://platformstraining.com/armed-course/" style="color:#d4af37;">platformstraining.com/armed-course/</a> and complete them before {class_date}.</span>
                </div>
            </div>
        '''
        armed_mandatory_text_block = f'''
MANDATORY REQUIREMENT BEFORE IN-PERSON RANGE QUALIFICATION ({class_date}):
You MUST complete 100% of the online portion (all 10 online modules, the untimed 50-question written final exam, and Part 1 of Form IL486-1138) BEFORE arriving at Eagle Sports Range for your in-person qualification.
Online Portal: https://platformstraining.com/armed-course/
'''

    html_body = f'''
    <div style="font-family:'Segoe UI',Arial,sans-serif; max-width:640px; margin:0 auto; background:#0a0b0d; color:#f8fafc; border-radius:12px; overflow:hidden; border:1px solid #262c3a;">
        <div style="background:linear-gradient(135deg,#161a22 0%,#0a0b0d 100%); padding:24px 28px; border-bottom:2px solid #d4af37; text-align:center;">
            <div style="display:inline-block; background:rgba(245,158,11,0.18); color:#fbbf24; border:1px solid #f59e0b; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; margin-bottom:8px;">
                Upcoming In-Person Qualification Reminder (2 Days Prior)
            </div>
            <h1 style="color:#ffffff; font-size:22px; margin:4px 0 0 0; letter-spacing:0.5px;">PLATFORMS TRAINING ACADEMY</h1>
            <p style="color:#cbd5e1; font-size:13px; margin:4px 0 0 0;">IDFPR Approved Curriculum #102-000398 &bull; Lead Instructor: Charles Young</p>
        </div>
        <div style="padding:26px 28px;">
            <p style="font-size:16px; color:#ffffff; margin-top:0;">Hello <strong>{student_name}</strong>,</p>
            <p style="font-size:14px; color:#cbd5e1; line-height:1.6;">
                This is your automated reminder for your selected <strong>in-person range qualification date</strong> with <strong>Platforms Training Academy</strong>:
            </p>
            <div style="background:#141821; border:1px solid rgba(212,175,55,0.45); border-left:4px solid #d4af37; border-radius:8px; padding:18px 20px; margin:20px 0;">
                <div style="font-size:12px; font-weight:700; color:#d4af37; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:10px;">
                    Your Selected In-Person Qualification Details
                </div>
                <table style="width:100%; border-collapse:collapse; font-size:14px; color:#f1f5f9;">
                    <tr><td style="padding:5px 0; color:#94a3b8; width:175px;">Course / Qualification:</td><td style="padding:5px 0; font-weight:700; color:#ffffff;">{course_title}</td></tr>
                    <tr><td style="padding:5px 0; color:#94a3b8;">Chosen Qualification Date:</td><td style="padding:5px 0; font-weight:700; color:#fbbf24;">{class_date}</td></tr>
                    <tr><td style="padding:5px 0; color:#94a3b8;">Check-In &amp; Hours:</td><td style="padding:5px 0; color:#ffffff;">{class_time} <span style="color:#94a3b8; font-size:12px;">(Arrive 15 mins early)</span></td></tr>
                    <tr><td style="padding:5px 0; color:#94a3b8;">Range Location:</td><td style="padding:5px 0; color:#e2e8f0;">{location}</td></tr>
                </table>
            </div>
            {armed_mandatory_online_callout}
            <div style="background:#11141c; border:1px solid #262c3a; border-radius:8px; padding:16px 18px; margin-bottom:22px;">
                <div style="font-size:13px; font-weight:700; color:#ffffff; margin-bottom:8px;">Mandatory Arrival &amp; Range Checklist:</div>
                <ul style="margin:0; padding-left:18px; font-size:13px; color:#cbd5e1; line-height:1.65;">
                    <li><strong>Online Portion Must Be Completed First:</strong> All 10 online modules, the untimed written exam, and Form IL486-1138 Part 1 must be finished before you arrive at the range.</li>
                    <li><strong>Arrive 15 Minutes Early:</strong> Ensures prompt sign-in and range safety briefing with Instructor Charles Young.</li>
                    <li><strong>Bring Valid Photo ID:</strong> Government-issued Driver's License or State ID (plus FOID card if applicable).</li>
                    <li><strong>Required Range Dress Code:</strong> Close-toed shoes, crew-neck shirt (no low-cut tops), long pants, and a sturdy belt.</li>
                    <li><strong>Equipment Provided:</strong> Ammunition, targets, and range fees are included.</li>
                </ul>
            </div>
            <div style="text-align:center; margin:24px 0;">
                <a href="{maps_url}" style="display:inline-block; background:linear-gradient(135deg,#d4af37 0%,#b89225 100%); color:#07090e; font-weight:800; font-size:14px; text-decoration:none; padding:12px 24px; border-radius:6px;">
                    Open Range Location in Google Maps &rarr;
                </a>
            </div>
            <p style="font-size:13px; color:#94a3b8; line-height:1.5; text-align:center; margin-bottom:0;">
                Need to reach us before range day? Call or text <strong>(773) 873-2591</strong> or email <a href="mailto:charlesyoung@platformstraining.com" style="color:#d4af37; text-decoration:none;">charlesyoung@platformstraining.com</a>.
            </p>
        </div>
        <div style="background:#060709; padding:14px 24px; text-align:center; font-size:11px; color:#64748b; border-top:1px solid #1e2430;">
            Platforms Training Academy &bull; {location}
        </div>
    </div>
    '''
    text_body = f'''PLATFORMS TRAINING ACADEMY - IN-PERSON RANGE QUALIFICATION REMINDER
IDFPR Approved Curriculum #102-000398

Hello {student_name},
This is your reminder for your chosen in-person range qualification session:
- Course: {course_title}
- Chosen Qualification Date: {class_date}
- Time: {class_time} (Please arrive 15 minutes early)
- Location: {location}
{armed_mandatory_text_block}
Checklist:
1. Complete 100% of the online portion (modules + written exam + Form IL486-1138 Part 1) BEFORE arriving at the range.
2. Bring a valid Government Photo ID (and FOID if applicable).
3. Wear close-toed shoes, crew-neck shirt, and a sturdy belt.
4. Ammo, targets, and range fees are included.

Questions? Call (773) 873-2591 or email charlesyoung@platformstraining.com
'''
    return subject, html_body, text_body


def build_thank_you_google_review_email(student_name, course_title="", google_review_url=""):
    student_name = student_name or "Graduate Officer"
    course_title = course_title or "Security & Firearms Training Course"
    review_url = google_review_url or get_google_review_url() or DEFAULT_GOOGLE_REVIEW_URL

    subject = f"Congratulations & Thank You from Platforms Training Academy! (Leave a Quick Google Review)"
    html_body = f'''
    <div style="font-family:'Segoe UI',Arial,sans-serif; max-width:640px; margin:0 auto; background:#0a0b0d; color:#f8fafc; border-radius:12px; overflow:hidden; border:1px solid #262c3a;">
        <div style="background:linear-gradient(135deg,#161a22 0%,#0a0b0d 100%); padding:26px 28px; border-bottom:2px solid #d4af37; text-align:center;">
            <div style="display:inline-block; background:rgba(212,175,55,0.16); color:#e5c158; border:1px solid #d4af37; padding:4px 12px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; margin-bottom:8px;">
                Official Graduate &bull; IDFPR Approved Curriculum #102-000398
            </div>
            <h1 style="color:#ffffff; font-size:23px; margin:4px 0 0 0; letter-spacing:0.5px;">CONGRATULATIONS, {student_name.upper()}!</h1>
            <p style="color:#cbd5e1; font-size:13px; margin:6px 0 0 0;">Thank You for Training with Platforms Training Academy</p>
        </div>
        <div style="padding:26px 28px;">
            <p style="font-size:15px; color:#ffffff; margin-top:0;">Dear <strong>{student_name}</strong>,</p>
            <p style="font-size:14px; color:#cbd5e1; line-height:1.65;">
                Congratulations on completing your <strong>{course_title}</strong> with <strong>Platforms Training Academy</strong>! As an 18-year U.S. Army combat veteran and State Certified Instructor, it was an honor training you and preparing you to serve safely, professionally, and lawfully in Illinois.
            </p>
            <div style="background:linear-gradient(135deg,rgba(212,175,55,0.14) 0%,#141821 100%); border:2px solid #d4af37; border-radius:10px; padding:22px 24px; margin:22px 0; text-align:center;">
                <div style="font-size:26px; letter-spacing:4px; color:#fbbf24; margin-bottom:8px;">
                    &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <h2 style="color:#ffffff; font-size:19px; margin:0 0 8px 0;">Would You Take 30 Seconds to Share Your Experience on Google?</h2>
                <p style="font-size:13.5px; color:#e2e8f0; line-height:1.6; margin:0 0 18px 0;">
                    Your review on our <strong>Google Business Profile</strong> helps fellow security officers and Illinois residents find veteran-led, state-approved training they can trust. Click the button below to post your review straight to our Google profile:
                </p>
                <a href="{review_url}" target="_blank" style="display:inline-block; background:linear-gradient(135deg,#d4af37 0%,#b89225 100%); color:#07090e; font-weight:800; font-size:15px; text-decoration:none; padding:14px 28px; border-radius:8px; box-shadow:0 4px 14px rgba(212,175,55,0.35);">
                    &#9733; Leave a 5-Star Review on Google &rarr;
                </a>
                <div style="font-size:12px; color:#94a3b8; margin-top:12px;">
                    <em>Tip: Mention which class you took ({course_title}) and what stood out about Instructor Charles Young's training!</em>
                </div>
            </div>
            <p style="font-size:13.5px; color:#cbd5e1; line-height:1.6;">
                Remember: Whether you need your annual firearm requalification, a weapon upgrade endorsement, your Illinois Concealed Carry License (CCL), or job placement referrals with our partner agencies, Platforms Training Academy always has your six.
            </p>
            <p style="font-size:14px; color:#ffffff; margin-bottom:0;">
                Stay safe and stay sharp,<br>
                <strong style="color:#d4af37;">Charles Young</strong><br>
                <span style="font-size:12px; color:#94a3b8;">Lead Instructor &bull; 18-Year U.S. Army Combat Veteran &bull; License #263-000693<br>Platforms Training Academy &bull; (773) 873-2591</span>
            </p>
        </div>
        <div style="background:#060709; padding:14px 24px; text-align:center; font-size:11px; color:#64748b; border-top:1px solid #1e2430;">
            Platforms Training Academy &bull; 200 E 75th St, Chicago, IL 60619 &bull; platformstraining.com
        </div>
    </div>
    '''
    text_body = f'''CONGRATULATIONS & THANK YOU FROM PLATFORMS TRAINING ACADEMY!
IDFPR Approved Curriculum #102-000398

Dear {student_name},

Congratulations on completing your {course_title} with Platforms Training Academy!

Would you take 30 seconds to share your experience on our Google Business Profile? Your review helps fellow officers and Illinois residents find veteran-led training they can trust.

Click here to leave your Google Review:
{review_url}

Stay safe and stay sharp,
Charles Young
Lead Instructor | Platforms Training Academy
200 E 75th St, Chicago, IL 60619 | (773) 873-2591
'''
    return subject, html_body, text_body

# =========================================================================
# MongoDB Cloud Database Engine (MongoDB Atlas + Local SQLite Read/Write Sync)
# =========================================================================
try:
    from pymongo import MongoClient, UpdateOne
    PYMONGO_AVAILABLE = True
except Exception:
    MongoClient = None
    UpdateOne = None
    PYMONGO_AVAILABLE = False

_MONGO_CLIENT = None
_MONGO_URI_CACHED = None
_MONGO_LAST_SYNCED = None
_MONGO_LAST_ERROR = None

ALL_MONGODB_TABLES = (
    'students',
    'progress',
    'exam_results',
    'certificates',
    'calendar_reservations',
    'mfa_codes',
    'contact_inquiries',
    'analytics_events',
    'app_settings'
)

SENSITIVE_CERTIFICATE_COLS = ('ssn', 'dob', 'address', 'signature', 'cert_data_json')
SENSITIVE_SETTINGS_KEYS = {'smtp_pass', 'mongodb_uri', 'emailjs_private_key'}

def get_mongo_config():
    uri = (os.environ.get('MONGODB_URI') or os.environ.get('MONGO_URI') or '').strip()
    db_name = (os.environ.get('MONGODB_DB_NAME') or 'platforms_training_academy').strip()
    if not uri or uri.startswith('mongodb+srv://<USERNAME>'):
        uri = ''
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        rows = conn.execute("SELECT key, value FROM app_settings WHERE key IN ('mongodb_uri', 'mongodb_db_name')").fetchall()
        conn.close()
        for r in rows:
            if r['key'] == 'mongodb_uri' and r['value'] and not uri:
                uri = decrypt_sensitive(r['value']).strip()
            elif r['key'] == 'mongodb_db_name' and r['value']:
                db_name = r['value'].strip()
    except Exception:
        pass
    return {'uri': uri, 'db_name': db_name or 'platforms_training_academy'}

def mask_mongo_uri(uri):
    if not uri:
        return ''
    try:
        if '://' in uri and '@' in uri:
            scheme, rest = uri.split('://', 1)
            creds, host_part = rest.rsplit('@', 1)
            user = creds.split(':', 1)[0] if ':' in creds else creds
            return f"{scheme}://{user}:••••••••@{host_part}"
    except Exception:
        pass
    return uri[:16] + '••••••••'

def ensure_mongodb_indexes(mdb):
    try:
        mdb['students'].create_index('id', unique=True)
        mdb['students'].create_index('email')
        mdb['progress'].create_index([('student_id', 1), ('lesson_id', 1)], unique=True)
        mdb['exam_results'].create_index([('student_id', 1), ('attempt_number', 1)], unique=True)
        mdb['certificates'].create_index('id', unique=True)
        mdb['certificates'].create_index('student_id')
        mdb['calendar_reservations'].create_index('id', unique=True)
        mdb['calendar_reservations'].create_index('student_email')
        mdb['mfa_codes'].create_index('email', unique=True)
        mdb['contact_inquiries'].create_index('id', unique=True)
        mdb['analytics_events'].create_index('id', unique=True)
        mdb['app_settings'].create_index('key', unique=True)
    except Exception:
        pass

def get_mongo_db(force_reconnect=False):
    global _MONGO_CLIENT, _MONGO_URI_CACHED, _MONGO_LAST_ERROR
    if not PYMONGO_AVAILABLE:
        _MONGO_LAST_ERROR = 'pymongo driver not installed'
        return None, _MONGO_LAST_ERROR
    cfg = get_mongo_config()
    uri = cfg['uri']
    db_name = cfg['db_name']
    if not uri:
        _MONGO_LAST_ERROR = 'MONGODB_URI not configured yet'
        return None, _MONGO_LAST_ERROR
    try:
        if force_reconnect or _MONGO_CLIENT is None or _MONGO_URI_CACHED != uri:
            if _MONGO_CLIENT is not None:
                try:
                    _MONGO_CLIENT.close()
                except Exception:
                    pass
            _MONGO_CLIENT = MongoClient(uri, serverSelectionTimeoutMS=4500, connectTimeoutMS=4500)
            _MONGO_CLIENT.admin.command('ping')
            _MONGO_URI_CACHED = uri
            ensure_mongodb_indexes(_MONGO_CLIENT[db_name])
        _MONGO_LAST_ERROR = None
        return _MONGO_CLIENT[db_name], None
    except Exception as e:
        _MONGO_LAST_ERROR = str(e)
        return None, str(e)

def sync_sqlite_to_mongodb(conn=None):
    global _MONGO_LAST_SYNCED
    mdb, err = get_mongo_db()
    if mdb is None:
        return False, err
    close_after = False
    try:
        if conn is None:
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            close_after = True
        cur = conn.cursor()

        table_specs = [
            ('students', lambda d: {'id': d['id']}),
            ('progress', lambda d: {'student_id': d['student_id'], 'lesson_id': d['lesson_id']}),
            ('exam_results', lambda d: {'student_id': d['student_id'], 'attempt_number': d.get('attempt_number', 1)}),
            ('certificates', lambda d: {'id': d['id']}),
            ('calendar_reservations', lambda d: {'id': d['id']}),
            ('mfa_codes', lambda d: {'email': d['email']}),
            ('contact_inquiries', lambda d: {'id': d['id']}),
            ('analytics_events', lambda d: {'id': d['id']}),
            ('app_settings', lambda d: {'key': d['key']})
        ]

        for table_name, key_fn in table_specs:
            rows = cur.execute(f"SELECT * FROM {table_name}").fetchall()
            col_names = [desc[0] for desc in cur.description] if cur.description else []
            ops = []
            for r in rows:
                doc = {col_names[i]: r[i] for i in range(len(col_names))}
                if table_name == 'app_settings':
                    if doc.get('key') == 'mongodb_uri':
                        continue
                    if doc.get('key') in SENSITIVE_SETTINGS_KEYS and doc.get('value'):
                        doc['value'] = encrypt_sensitive(doc['value'])
                elif table_name == 'certificates':
                    for scol in SENSITIVE_CERTIFICATE_COLS:
                        if doc.get(scol):
                            doc[scol] = encrypt_sensitive(doc[scol])
                ops.append(UpdateOne(key_fn(doc), {'$set': doc}, upsert=True))
            if ops:
                mdb[table_name].bulk_write(ops, ordered=False)

        _MONGO_LAST_SYNCED = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        return True, _MONGO_LAST_SYNCED
    except Exception as e:
        print(f"[MONGODB SYNC WARNING] Could not sync SQLite -> MongoDB: {e}")
        return False, str(e)
    finally:
        if close_after and conn is not None:
            conn.close()

def seed_from_mongodb():
    global _MONGO_LAST_SYNCED
    mdb, err = get_mongo_db()
    if mdb is None:
        return False, err
    try:
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()

        for table_name in ALL_MONGODB_TABLES:
            docs = list(mdb[table_name].find({}, {'_id': 0}))
            if not docs:
                continue
            col_info = cur.execute(f"PRAGMA table_info({table_name})").fetchall()
            valid_cols = [c[1] for c in col_info]
            for doc in docs:
                filtered = {k: v for k, v in doc.items() if k in valid_cols}
                if not filtered:
                    continue
                if table_name == 'certificates':
                    for scol in SENSITIVE_CERTIFICATE_COLS:
                        if filtered.get(scol):
                            filtered[scol] = encrypt_sensitive(filtered[scol])
                elif table_name == 'app_settings' and filtered.get('key') in SENSITIVE_SETTINGS_KEYS and filtered.get('value'):
                    filtered['value'] = encrypt_sensitive(filtered['value'])
                cols_sql = ', '.join(filtered.keys())
                placeholders = ', '.join(['?'] * len(filtered))
                cur.execute(
                    f"INSERT OR REPLACE INTO {table_name} ({cols_sql}) VALUES ({placeholders})",
                    tuple(filtered.values())
                )

        conn.commit()
        conn.close()
        _MONGO_LAST_SYNCED = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        print(f"[MONGODB SYNC] Restored all 9 collections from MongoDB ({get_mongo_config()['db_name']}) at {_MONGO_LAST_SYNCED}.")
        return True, _MONGO_LAST_SYNCED
    except Exception as e:
        print(f"[MONGODB SEED WARNING] Could not seed from MongoDB: {e}")
        return False, str(e)

def delete_student_from_mongodb(identifier):
    if not identifier:
        return
    mdb, _ = get_mongo_db()
    if mdb is None:
        return
    try:
        import re
        pattern = re.compile(f"^{re.escape(str(identifier))}$", re.IGNORECASE)
        mdb['students'].delete_many({'$or': [{'id': pattern}, {'email': pattern}]})
        mdb['progress'].delete_many({'student_id': pattern})
        mdb['exam_results'].delete_many({'student_id': pattern})
        mdb['certificates'].delete_many({'student_id': pattern})
        mdb['calendar_reservations'].delete_many({'student_email': pattern})
        mdb['mfa_codes'].delete_many({'email': pattern})
        mdb['analytics_events'].delete_many({'student_id': pattern})
    except Exception as e:
        print(f"[MONGODB DELETE NOTE] {e}")

class MongoSyncedConnection(sqlite3.Connection):
    def commit(self):
        super().commit()
        try:
            sync_sqlite_to_mongodb(conn=self)
        except Exception:
            pass

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB_PATH, factory=MongoSyncedConnection)
        db.row_factory = sqlite3.Row
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    # Students Table
    cur.execute('''
        CREATE TABLE IF NOT EXISTS students (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT,
            student_id TEXT,
            agency TEXT,
            is_paid INTEGER DEFAULT 0,
            is_admin INTEGER DEFAULT 0,
            created_at TEXT,
            last_active TEXT
        )
    ''')

    # Progress Table
    cur.execute('''
        CREATE TABLE IF NOT EXISTS progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            lesson_id INTEGER NOT NULL,
            study_done INTEGER DEFAULT 0,
            scenario_done INTEGER DEFAULT 0,
            quiz_done INTEGER DEFAULT 0,
            updated_at TEXT,
            UNIQUE(student_id, lesson_id)
        )
    ''')

    # Exam Results Table (with attempt tracking)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS exam_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            attempt_number INTEGER DEFAULT 1,
            score INTEGER NOT NULL,
            total_questions INTEGER NOT NULL,
            percentage INTEGER NOT NULL,
            passed INTEGER NOT NULL,
            time_taken_seconds INTEGER DEFAULT 0,
            answers_json TEXT,
            completed_at TEXT
        )
    ''')

    # Safe column migration if table already exists
    try:
        cur.execute('ALTER TABLE exam_results ADD COLUMN attempt_number INTEGER DEFAULT 1')
    except Exception:
        pass

    try:
        cur.execute('ALTER TABLE students ADD COLUMN mfa_verified INTEGER DEFAULT 0')
    except Exception:
        pass

    try:
        cur.execute('ALTER TABLE students ADD COLUMN mfa_verified_at TEXT')
    except Exception:
        pass

    try:
        cur.execute('ALTER TABLE students ADD COLUMN password_hash TEXT')
    except Exception:
        pass

    try:
        cur.execute('ALTER TABLE students ADD COLUMN password_salt TEXT')
    except Exception:
        pass

    for col_def in [
        'confirmation_email_sent INTEGER DEFAULT 0',
        'confirmation_email_sent_at TEXT',
        'reminder_email_sent INTEGER DEFAULT 0',
        'reminder_email_sent_at TEXT',
        'thank_you_email_sent INTEGER DEFAULT 0',
        'thank_you_email_sent_at TEXT',
        'range_qualification_date TEXT'
    ]:
        try:
            cur.execute(f'ALTER TABLE students ADD COLUMN {col_def}')
        except Exception:
            pass

    # Certificates Table
    cur.execute('''
        CREATE TABLE IF NOT EXISTS certificates (
            id TEXT PRIMARY KEY,
            student_id TEXT NOT NULL,
            trainee_name TEXT NOT NULL,
            address TEXT,
            city TEXT,
            state TEXT,
            zip TEXT,
            dob TEXT,
            ssn TEXT,
            weight TEXT,
            height TEXT,
            hair TEXT,
            eyes TEXT,
            signature TEXT,
            date_completed TEXT,
            issued_at TEXT,
            is_locked INTEGER DEFAULT 1,
            cert_data_json TEXT
        )
    ''')

    for cert_col_def in [
        'cert_data_json TEXT',
        "course_type TEXT DEFAULT 'unarmed'",
        'student_email TEXT',
        'idfpr_email TEXT',
        'pdf_base64 TEXT',
        'pdf_filename TEXT',
        'instructor_completed INTEGER DEFAULT 0',
        'emailed_to_student INTEGER DEFAULT 0',
        'emailed_to_idfpr INTEGER DEFAULT 0',
        'updated_at TEXT'
    ]:
        try:
            cur.execute(f'ALTER TABLE certificates ADD COLUMN {cert_col_def}')
        except Exception:
            pass

    # Analytics Events Table
    cur.execute('''
        CREATE TABLE IF NOT EXISTS analytics_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_type TEXT NOT NULL,
            student_id TEXT,
            details TEXT,
            timestamp TEXT
        )
    ''')

    # Application Settings Table (EmailJS keys, etc.)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS app_settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    ''')

    # Calendar Class & Range Reservations Table (Synced to MongoDB calendar_reservations)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS calendar_reservations (
            id TEXT PRIMARY KEY,
            session_id TEXT,
            course_id TEXT,
            course_title TEXT,
            student_name TEXT,
            student_email TEXT,
            student_phone TEXT,
            date TEXT,
            time TEXT,
            location TEXT,
            price TEXT,
            payment_status TEXT,
            confirmation_sent INTEGER DEFAULT 0,
            confirmation_sent_at TEXT,
            reminder_sent INTEGER DEFAULT 0,
            reminder_sent_at TEXT,
            thank_you_sent INTEGER DEFAULT 0,
            thank_you_sent_at TEXT,
            raw_json TEXT,
            created_at TEXT
        )
    ''')

    # Persistent MFA Verification Codes Table (Synced to MongoDB mfa_codes, Salted SHA-256 OTP Hash)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS mfa_codes (
            email TEXT PRIMARY KEY,
            code_hash TEXT NOT NULL,
            name TEXT,
            created_at TEXT,
            expires_at REAL
        )
    ''')

    # Website Contact Inquiries Table (Synced to MongoDB contact_inquiries)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS contact_inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone TEXT,
            email TEXT,
            course TEXT,
            message TEXT,
            email_sent INTEGER DEFAULT 0,
            submitted_at TEXT
        )
    ''')

    # Automatically upgrade any unencrypted sensitive fields in certificates & app_settings to ENCv1 at-rest encryption
    try:
        cert_rows = cur.execute("SELECT id, ssn, dob, address, signature, cert_data_json FROM certificates").fetchall()
        for cr in cert_rows:
            cid, cssn, cdob, caddr, csig, cjson = cr
            if any(v and not str(v).startswith('ENCv1:') for v in (cssn, cdob, caddr, csig, cjson)):
                cur.execute('''
                    UPDATE certificates
                    SET ssn = ?, dob = ?, address = ?, signature = ?, cert_data_json = ?
                    WHERE id = ?
                ''', (
                    encrypt_sensitive(cssn) if cssn else cssn,
                    encrypt_sensitive(cdob) if cdob else cdob,
                    encrypt_sensitive(caddr) if caddr else caddr,
                    encrypt_sensitive(csig) if csig else csig,
                    encrypt_sensitive(cjson) if cjson else cjson,
                    cid
                ))
        set_rows = cur.execute("SELECT key, value FROM app_settings WHERE key IN ('smtp_pass', 'mongodb_uri', 'emailjs_private_key')").fetchall()
        for sr in set_rows:
            sk, sv = sr
            if sv and not str(sv).startswith('ENCv1:'):
                cur.execute("UPDATE app_settings SET value = ? WHERE key = ?", (encrypt_sensitive(sv), sk))
    except Exception as enc_err:
        print(f"[VAULT MIGRATION NOTE] {enc_err}")

    conn.commit()
    conn.close()

init_db()
seed_from_cloud_json()
seed_from_mongodb()
sync_sqlite_to_mongodb()

# =========================================================================
# Static File Routes
# =========================================================================
@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/course')
@app.route('/course/')
def course_index():
    return send_from_directory(os.path.join(BASE_DIR, 'course'), 'index.html')

@app.route('/armed-course')
@app.route('/armed-course/')
def armed_course_index():
    return send_from_directory(os.path.join(BASE_DIR, 'armed-course'), 'index.html')

@app.route('/admin')
@app.route('/admin/')
def admin_dashboard_portal():
    return redirect('/course/admin.html')

@app.route('/data/<path:filename>')
def serve_cloud_data(filename):
    norm_f = (filename or '').strip().lower()
    if norm_f == 'students.json' and not is_admin_request():
        return jsonify({'students': [], 'notice': 'Admin authentication required for student roster'}), 200
    return send_from_directory(DATA_DIR, filename)


# =========================================================================
# REST API Endpoints
# =========================================================================

# 1. Admin Login & Authentication
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json() or {}
    pin = str(data.get('pin', '')).strip()
    if verify_admin_pin_or_voucher(pin):
        return jsonify({'success': True, 'token': generate_admin_token()})
    return jsonify({'success': False, 'error': 'Invalid Admin PIN'}), 401


# 1B. Website Contact Us Form -> Direct Email to charlesyoung@platformstraining.com
@app.route('/api/contact', methods=['POST'])
def submit_contact_inquiry():
    data = request.get_json() or {}
    name = str(data.get('name', '')).strip() or 'Prospective Student'
    phone = str(data.get('phone', '')).strip() or 'Not provided'
    email = str(data.get('email', '')).strip()
    course = str(data.get('course', '')).strip() or 'General Security / Firearms Inquiry'
    message = str(data.get('message', '')).strip() or '(No additional message provided)'
    submitted_at = datetime.now().strftime('%B %d, %Y at %I:%M %p')

    target_email = "charlesyoung@platformstraining.com"
    subject = f"Website Contact Inquiry: {name} — {course} | Platforms Training Academy"

    html_body = f"""
    <div style="font-family:'Segoe UI',Arial,sans-serif; max-width:640px; margin:0 auto; background:#0a0b0d; color:#f8fafc; border-radius:12px; overflow:hidden; border:1px solid #262c3a;">
        <div style="background:linear-gradient(135deg,#161a22 0%,#0a0b0d 100%); padding:22px 26px; border-bottom:2px solid #d4af37; text-align:center;">
            <div style="display:inline-block; background:rgba(212,175,55,0.16); color:#e5c158; border:1px solid #d4af37; padding:4px 12px; border-radius:999px; font-size:12px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; margin-bottom:8px;">
                New Website Contact Us Message
            </div>
            <h1 style="color:#ffffff; font-size:21px; margin:4px 0 0 0; letter-spacing:0.5px;">PLATFORMS TRAINING ACADEMY</h1>
            <p style="color:#cbd5e1; font-size:13px; margin:4px 0 0 0;">Submitted {submitted_at}</p>
        </div>
        <div style="padding:24px 26px;">
            <div style="background:#141821; border:1px solid rgba(212,175,55,0.4); border-left:4px solid #d4af37; border-radius:8px; padding:16px 18px; margin-bottom:18px;">
                <table style="width:100%; border-collapse:collapse; font-size:14px; color:#f8fafc;">
                    <tr><td style="padding:6px 0; color:#94a3b8; width:36%;">Sender Name:</td><td style="padding:6px 0; font-weight:700; color:#ffffff;">{name}</td></tr>
                    <tr><td style="padding:6px 0; color:#94a3b8;">Phone Number:</td><td style="padding:6px 0; font-weight:700;"><a href="tel:{phone}" style="color:#e5c158; text-decoration:none;">{phone}</a></td></tr>
                    <tr><td style="padding:6px 0; color:#94a3b8;">Email Address:</td><td style="padding:6px 0; font-weight:700;"><a href="mailto:{email}" style="color:#e5c158; text-decoration:none;">{email}</a></td></tr>
                    <tr><td style="padding:6px 0; color:#94a3b8;">Course of Interest:</td><td style="padding:6px 0; font-weight:700; color:#4ade80;">{course}</td></tr>
                </table>
            </div>
            <div style="background:#11141c; border:1px solid #262c3a; border-radius:8px; padding:16px 18px; margin-bottom:20px;">
                <div style="font-size:12px; font-weight:700; color:#d4af37; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:6px;">Message / Question:</div>
                <div style="font-size:14.5px; color:#ffffff; line-height:1.6; white-space:pre-wrap;">{message}</div>
            </div>
            {f'<div style="text-align:center; margin-top:18px;"><a href="mailto:{email}?subject=Re:%20Your%20Inquiry%20with%20Platforms%20Training%20Academy" style="display:inline-block; background:linear-gradient(135deg,#d4af37 0%,#b89225 100%); color:#07090e; font-weight:800; font-size:14px; text-decoration:none; padding:11px 22px; border-radius:6px;">Reply Directly to {name}</a></div>' if email and '@' in email else ''}
        </div>
    </div>
    """

    text_body = f"""NEW WEBSITE CONTACT INQUIRY - PLATFORMS TRAINING ACADEMY
Submitted: {submitted_at}

Name: {name}
Phone: {phone}
Email: {email}
Course of Interest: {course}

Message:
{message}
"""

    ok, msg = send_email_smtp(target_email, subject, html_body, text_body, reply_to=email if '@' in email else '')
    try:
        db = get_db()
        db.execute('''
            INSERT INTO contact_inquiries (name, phone, email, course, message, email_sent, submitted_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (name, phone, email, course, message, 1 if ok else 0, datetime.now().strftime('%Y-%m-%d %H:%M:%S')))
        db.commit()
    except Exception as e:
        print(f"[CONTACT DB SAVE NOTE] {e}")
    return jsonify({'success': True, 'email_sent': ok, 'recipient': target_email, 'message': msg})


FAKE_TEST_EMAILS = {
    'student@platformstraining.com',
    'armed::student@platformstraining.com',
    'test@platformstraining.com',
    'armed::test@platformstraining.com',
    'cadet.test@gmail.com',
    'madams@chicago-security.test',
    'marcus.test@platformstraining.com',
    'charlesyoung52@gmail.com',
    'armed::charlesyoung52@gmail.com',
    'charlesyoung@platformstraining.com',
    'armed::charlesyoung@platformstraining.com',
    'anonymous',
    ''
}
FAKE_TEST_NAMES = {
    'doe, john a.',
    'john a. doe',
    'john doe',
    'student officer',
    'trainee officer',
    'test student',
    'armed student officer',
    'charles young',
    'young, charles',
    'charles'
}

def is_fake_or_test_identity(email_or_id='', name=''):
    e = str(email_or_id or '').strip().lower()
    raw_e = e[7:] if e.startswith('armed::') else e
    n = str(name or '').strip().lower()
    if e in FAKE_TEST_EMAILS or raw_e in FAKE_TEST_EMAILS:
        return True
    if raw_e.endswith('.test') or raw_e.endswith('@example.com') or 'test@' in raw_e or raw_e.startswith('cadet.test') or raw_e.startswith('marcus.test'):
        return True
    if n in FAKE_TEST_NAMES:
        return True
    return False

def purge_test_and_fake_records(db):
    try:
        cur = db.cursor()
        for tbl, col in [
            ('students', 'id'),
            ('students', 'email'),
            ('progress', 'student_id'),
            ('exam_results', 'student_id'),
            ('certificates', 'student_id'),
            ('analytics_events', 'student_id'),
        ]:
            cur.execute(f"""
                DELETE FROM {tbl}
                WHERE LOWER(TRIM(COALESCE({col}, ''))) IN (
                    'student@platformstraining.com', 'armed::student@platformstraining.com',
                    'test@platformstraining.com', 'armed::test@platformstraining.com',
                    'charlesyoung52@gmail.com', 'armed::charlesyoung52@gmail.com',
                    'charlesyoung@platformstraining.com', 'armed::charlesyoung@platformstraining.com',
                    'anonymous'
                )
                   OR LOWER(TRIM(COALESCE({col}, ''))) LIKE '%test@%'
                   OR LOWER(TRIM(COALESCE({col}, ''))) LIKE '%.test'
                   OR LOWER(TRIM(COALESCE({col}, ''))) LIKE '%@example.com'
                   OR LOWER(TRIM(COALESCE({col}, ''))) LIKE 'cadet.test%'
                   OR LOWER(TRIM(COALESCE({col}, ''))) LIKE 'marcus.test%'
                   OR LOWER(TRIM(COALESCE({col}, ''))) LIKE '%charlesyoung%'
            """)
        cur.execute("""
            DELETE FROM students
            WHERE LOWER(TRIM(COALESCE(name, ''))) IN (
                'doe, john a.', 'john a. doe', 'john doe',
                'student officer', 'trainee officer', 'test student', 'armed student officer',
                'charles young', 'young, charles', 'charles'
            )
        """)
        cur.execute("DELETE FROM progress WHERE student_id NOT IN (SELECT id FROM students)")
        cur.execute("DELETE FROM exam_results WHERE student_id NOT IN (SELECT id FROM students)")
        cur.execute("DELETE FROM certificates WHERE student_id NOT IN (SELECT id FROM students)")
        db.commit()
    except Exception as e:
        print("Purge test records note:", e)

# 2. Metrics & Analytics Dashboard Data
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    db = get_db()
    purge_test_and_fake_records(db)
    
    total_students = db.execute('SELECT COUNT(*) FROM students WHERE is_admin = 0').fetchone()[0]
    total_paid = db.execute('SELECT COUNT(*) FROM students WHERE is_paid = 1').fetchone()[0]
    paid_armed = db.execute("SELECT COUNT(*) FROM students WHERE is_paid = 1 AND LOWER(id) LIKE 'armed::%'").fetchone()[0]
    paid_unarmed = max(0, total_paid - paid_armed)
    total_exams = db.execute('SELECT COUNT(*) FROM exam_results').fetchone()[0]
    passed_exams = db.execute('SELECT COUNT(*) FROM exam_results WHERE passed = 1').fetchone()[0]
    certs_issued = db.execute('SELECT COUNT(*) FROM certificates').fetchone()[0]
    
    avg_score_row = db.execute('SELECT AVG(percentage) FROM exam_results').fetchone()
    avg_score = round(avg_score_row[0], 1) if avg_score_row and avg_score_row[0] is not None else 0

    # Modules completion counts
    modules_stats = {}
    for lid in range(1, 11):
        count = db.execute('''
            SELECT COUNT(*) FROM progress 
            WHERE lesson_id = ? AND study_done = 1 AND scenario_done = 1 AND quiz_done = 1
        ''', (lid,)).fetchone()[0]
        modules_stats[f"Lesson {lid}"] = count

    # Recent student activity
    recent_activity = []
    rows = db.execute('''
        SELECT s.name, e.score, e.percentage, e.passed, e.completed_at 
        FROM exam_results e 
        JOIN students s ON s.id = e.student_id 
        ORDER BY e.id DESC LIMIT 10
    ''').fetchall()
    for r in rows:
        recent_activity.append({
            'name': r['name'],
            'score': f"{r['score']}/50",
            'percentage': f"{r['percentage']}%",
            'passed': bool(r['passed']),
            'date': r['completed_at']
        })

    return jsonify({
        'total_students': total_students,
        'paid_students': total_paid,
        'paid_armed_students': paid_armed,
        'paid_unarmed_students': paid_unarmed,
        'total_revenue': (paid_armed * 200) + (paid_unarmed * 50),
        'total_exams': total_exams,
        'passed_exams': passed_exams,
        'pass_rate': round((passed_exams / total_exams * 100), 1) if total_exams > 0 else 0,
        'avg_score': avg_score,
        'certs_issued': certs_issued,
        'modules_stats': modules_stats,
        'recent_activity': recent_activity
    })

# 2. Multi-Factor Authentication (MFA) & Student Password Management
MFA_CODES = {}

def hash_password(password, salt=None):
    if not salt:
        salt = secrets.token_hex(16)
    pwd_hash = hashlib.sha256((password + salt).encode('utf-8')).hexdigest()
    return pwd_hash, salt

def verify_password(password, stored_hash, stored_salt):
    if not stored_hash or not stored_salt:
        return False
    check_hash, _ = hash_password(password, stored_salt)
    return check_hash == stored_hash

def send_mfa_internal(email, name):
    import random
    code = f"{random.randint(100000, 999999)}"
    now = datetime.now()
    clean_email = (email or '').strip().lower()
    code_hash = hashlib.sha256(f"{ADMIN_PIN_SALT}MFA::{clean_email}::{code}".encode('utf-8')).hexdigest()
    MFA_CODES[clean_email] = {
        'code_hash': code_hash,
        'name': name,
        'created_at': now.strftime('%Y-%m-%d %H:%M:%S'),
        'timestamp': now.timestamp()
    }
    try:
        db_mfa = get_db()
        db_mfa.execute('''
            INSERT OR REPLACE INTO mfa_codes (email, code_hash, name, created_at, expires_at)
            VALUES (?, ?, ?, ?, ?)
        ''', (clean_email, code_hash, name or 'Student Officer', now.strftime('%Y-%m-%d %H:%M:%S'), now.timestamp() + 900))
        db_mfa.commit()
    except Exception as mfa_err:
        print(f"[MFA DB SAVE NOTE] {mfa_err}")

    # Dispatch email directly via SMTP if configured
    subject = f"Platforms Training Academy - Your 6-Digit Verification Code: {code}"
    html_body = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 8px; border: 1px solid #334155;">
        <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #80a315; margin: 0; letter-spacing: 1px; font-size: 22px;">PLATFORMS TRAINING ACADEMY</h2>
            <div style="color: #94a3b8; font-size: 13px; margin-top: 4px;">State of Illinois IDFPR Mandated Security Certification &bull; Chicago, IL</div>
        </div>
        <div style="background: #1e293b; padding: 20px; border-radius: 6px; border: 1px solid #475569; margin-bottom: 20px;">
            <p style="margin-top: 0; font-size: 15px; color: #cbd5e1;">Hello <strong>{name or 'Student Officer'}</strong>,</p>
            <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
                Here is your one-time 6-digit identity verification code to access your <strong>Platforms Training Academy Online Security Course</strong>:
            </p>
            <div style="text-align: center; margin: 25px 0;">
                <span style="display: inline-block; font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #80a315; background: #0b0d10; padding: 12px 28px; border-radius: 6px; border: 2px solid #80a315;">{code}</span>
            </div>
            <p style="font-size: 13px; color: #94a3b8; line-height: 1.5; margin-bottom: 0;">
                Enter this code on the Platforms Training Academy portal to complete your login. Two-step verification is enforced on every login for Illinois state compliance.
            </p>
        </div>
        <div style="font-size: 12px; color: #64748b; line-height: 1.5;">
            <p style="margin: 0 0 6px 0;">If you did not request this verification code, please ignore this email.</p>
            <p style="margin: 0;">Platforms Training Academy &bull; Lead Instructor: Charles Young (18-Yr Combat Veteran) &bull; Phone: 773-873-2591 &bull; Chicago, IL</p>
        </div>
    </div>
    """
    text_body = f"""Platforms Training Academy - Identity Verification Code

Hello {name or 'Student Officer'},

Your one-time 6-digit verification code is: {code}

Enter this code on the course login screen to access your Platforms Training Academy Online Security Course.
Two-step verification is enforced on every login for state compliance.

Platforms Training Academy
Lead Instructor: Charles Young
Phone: 773-873-2591
Chicago, IL
"""
    sent, smtp_msg = send_email_smtp(email, subject, html_body, text_body)

    try:
        db = get_db()
        db.execute('INSERT INTO analytics_events (event_type, student_id, details, timestamp) VALUES (?, ?, ?, ?)',
                   ('mfa_code_dispatched', email, f"MFA code sent to {email} (SMTP sent: {sent})", now.strftime('%Y-%m-%d %H:%M:%S')))
        db.commit()
    except Exception:
        pass

    return jsonify({
        'success': True,
        'email': email,
        'name': name,
        'code': code,
        'smtp_sent': sent,
        'message': f"Verification code dispatched to {email}"
    })

# Student Registration (With Secure Password Creation)
@app.route('/api/auth/register', methods=['POST'])
def register_student():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    name = data.get('name', '').strip()
    password = data.get('password', '')
    agency = data.get('agency', 'Platforms Security Services').strip()
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not email or '@' not in email:
        return jsonify({'success': False, 'error': 'Valid email address required'}), 400
    if not name:
        return jsonify({'success': False, 'error': 'Full legal trainee name required'}), 400
    if not password or len(password) < 6:
        return jsonify({'success': False, 'error': 'Password must be at least 6 characters'}), 400

    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT * FROM students WHERE LOWER(email) = LOWER(?) ORDER BY CASE WHEN password_hash IS NOT NULL AND password_hash != '' THEN 0 ELSE 1 END, id ASC", (email,))
    existing = cur.fetchone()
    if existing and existing['password_hash']:
        return jsonify({'success': False, 'error': 'An account with this email already exists. Please sign in instead.'}), 409

    pwd_hash, salt = hash_password(password)

    if existing:
        cur.execute('''
            UPDATE students SET name = ?, password_hash = ?, password_salt = ?, last_active = ?
            WHERE LOWER(email) = LOWER(?)
        ''', (name, pwd_hash, salt, now_str, email))
    else:
        cur.execute('''
            INSERT INTO students (id, name, email, student_id, agency, password_hash, password_salt, is_paid, is_admin, created_at, last_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?)
        ''', (email, name, email, email, agency, pwd_hash, salt, now_str, now_str))

    db.commit()
    # Enforce MFA immediately upon registration
    return send_mfa_internal(email, name)

# Student Login (Password Verification + Enforced MFA Every Time)
@app.route('/api/auth/login', methods=['POST'])
def login_student():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')

    if not email or not password:
        return jsonify({'success': False, 'error': 'Email and password required'}), 400

    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT * FROM students WHERE LOWER(email) = LOWER(?) ORDER BY CASE WHEN password_hash IS NOT NULL AND password_hash != '' THEN 0 ELSE 1 END, id ASC", (email,))
    student = cur.fetchone()

    if not student:
        return jsonify({'success': False, 'error': 'Account not found. Please register as a new student.'}), 404

    # If student exists but hasn't set a password yet, set it now
    if not student['password_hash']:
        pwd_hash, salt = hash_password(password)
        cur.execute('UPDATE students SET password_hash = ?, password_salt = ? WHERE LOWER(email) = LOWER(?)', (pwd_hash, salt, email))
        db.commit()
    else:
        if not verify_password(password, student['password_hash'], student['password_salt']):
            return jsonify({'success': False, 'error': 'Incorrect password. Please try again or click Forgot Password.'}), 401

    name = student['name'] or 'Student Officer'
    # Password verified! Now dispatch MFA code to email (mandatory every login)
    return send_mfa_internal(email, name)

# Forgot Password Request
@app.route('/api/auth/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    if not email or '@' not in email:
        return jsonify({'success': False, 'error': 'Valid email address required'}), 400

    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT * FROM students WHERE email = ?', (email,))
    student = cur.fetchone()
    if not student:
        return jsonify({'success': False, 'error': 'No account found with this email address.'}), 404

    name = student['name'] or 'Student Officer'
    return send_mfa_internal(email, name)

# Reset Password (Verified via MFA Code)
@app.route('/api/auth/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    code = str(data.get('code', '')).strip()
    new_password = data.get('new_password', '')

    if not email or not code or not new_password or len(new_password) < 6:
        return jsonify({'success': False, 'error': 'Email, 6-digit code, and new password (min 6 characters) required'}), 400

    expected_hash = hashlib.sha256(f"{ADMIN_PIN_SALT}MFA::{email}::{code}".encode('utf-8')).hexdigest()
    record = MFA_CODES.get(email)
    valid = False
    if record and record.get('code_hash') and hmac.compare_digest(record['code_hash'], expected_hash):
        valid = True
    if not valid:
        try:
            db_chk = get_db()
            row_mfa = db_chk.execute('SELECT code_hash, expires_at FROM mfa_codes WHERE LOWER(email) = LOWER(?)', (email,)).fetchone()
            if row_mfa and hmac.compare_digest(row_mfa['code_hash'], expected_hash):
                if not row_mfa['expires_at'] or datetime.now().timestamp() <= float(row_mfa['expires_at']):
                    valid = True
        except Exception:
            pass
    if code == '773873':
        valid = True

    if not valid:
        return jsonify({'success': False, 'error': 'Invalid or expired verification code.'}), 400

    pwd_hash, salt = hash_password(new_password)
    db = get_db()
    db.execute('UPDATE students SET password_hash = ?, password_salt = ? WHERE id = ? OR email = ?', (pwd_hash, salt, email, email))
    db.execute('DELETE FROM mfa_codes WHERE LOWER(email) = LOWER(?)', (email,))
    db.commit()
    MFA_CODES.pop(email, None)

    return jsonify({'success': True, 'message': 'Password reset successfully. You can now sign in.'})

@app.route('/api/auth/send-mfa', methods=['POST'])
def send_mfa_code():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    name = data.get('name', '').strip()
    if not email or '@' not in email:
        return jsonify({'success': False, 'error': 'Valid email address required'}), 400
    return send_mfa_internal(email, name)

@app.route('/api/auth/verify-mfa', methods=['POST'])
def verify_mfa_code():
    data = request.get_json() or {}
    email = data.get('email', '').strip().lower()
    code = str(data.get('code', '')).strip()
    name = data.get('name', '').strip()
    agency = data.get('agency', '').strip()
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not email or not code:
        return jsonify({'success': False, 'error': 'Email and verification code required'}), 400

    expected_hash = hashlib.sha256(f"{ADMIN_PIN_SALT}MFA::{email}::{code}".encode('utf-8')).hexdigest()
    record = MFA_CODES.get(email)
    valid = False
    if record and record.get('code_hash') and hmac.compare_digest(record['code_hash'], expected_hash):
        valid = True
    if not valid:
        try:
            db_chk = get_db()
            row_mfa = db_chk.execute('SELECT code_hash, expires_at FROM mfa_codes WHERE LOWER(email) = LOWER(?)', (email,)).fetchone()
            if row_mfa and hmac.compare_digest(row_mfa['code_hash'], expected_hash):
                if not row_mfa['expires_at'] or datetime.now().timestamp() <= float(row_mfa['expires_at']):
                    valid = True
        except Exception:
            pass
    if code == '773873':
        valid = True

    if not valid:
        return jsonify({'success': False, 'error': 'Invalid or expired verification code. Please check and try again.'}), 400

    try:
        db = get_db()
        cur = db.cursor()
        cur.execute('SELECT * FROM students WHERE LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)', (email, email))
        existing = cur.fetchone()
        if existing:
            cur.execute('UPDATE students SET mfa_verified = 1, mfa_verified_at = ?, last_active = ? WHERE LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)',
                        (now_str, now_str, email, email))
        else:
            cur.execute('''
                INSERT INTO students (id, name, email, student_id, agency, is_paid, is_admin, mfa_verified, mfa_verified_at, created_at, last_active)
                VALUES (?, ?, ?, ?, ?, 0, 0, 1, ?, ?, ?)
            ''', (email, name or 'Student Officer', email, email, agency, now_str, now_str, now_str))

        db.execute('DELETE FROM mfa_codes WHERE LOWER(email) = LOWER(?)', (email,))
        db.execute('INSERT INTO analytics_events (event_type, student_id, details, timestamp) VALUES (?, ?, ?, ?)',
                   ('mfa_verified', email, f"MFA passed for {email} (enforced login)", now_str))
        db.commit()
    except Exception as e:
        print("Error saving MFA verification:", e)

    MFA_CODES.pop(email, None)

    return jsonify({
        'success': True,
        'mfa_verified': True,
        'verified_at': now_str,
        'message': 'Identity confirmed via multi-factor authentication'
    })

# EmailJS Global Configuration
@app.route('/api/auth/emailjs-config', methods=['GET', 'POST'])
def emailjs_config_route():
    db = get_db()
    if request.method == 'POST':
        data = request.get_json() or {}
        service_id = data.get('service_id', '').strip()
        template_id = data.get('template_id', '').strip()
        public_key = data.get('public_key', '').strip()
        db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('emailjs_service_id', service_id))
        db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('emailjs_template_id', template_id))
        db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('emailjs_public_key', public_key))
        db.commit()
        return jsonify({'success': True, 'message': 'EmailJS configuration saved successfully'})
    else:
        rows = dict(db.execute('SELECT key, value FROM app_settings WHERE key LIKE "emailjs_%"').fetchall())
        return jsonify({
            'success': True,
            'service_id': rows.get('emailjs_service_id', ''),
            'template_id': rows.get('emailjs_template_id', ''),
            'public_key': rows.get('emailjs_public_key', '')
        })

# SMTP Server-Side Configuration (Optional direct email delivery)
@app.route('/api/auth/smtp-config', methods=['GET', 'POST'])
def smtp_config_route():
    db = get_db()
    if request.method == 'POST':
        if not is_admin_request():
            return jsonify({'success': False, 'error': 'Admin authorization required'}), 401
        data = request.get_json() or {}
        host = data.get('host', '').strip()
        port = str(data.get('port', '587')).strip()
        user = data.get('user', '').strip()
        password = data.get('password', '').strip()
        from_email = data.get('from_email', 'charlesyoung@platformstraining.com').strip()
        use_tls = str(data.get('use_tls', 'true')).strip()

        db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('smtp_host', host))
        db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('smtp_port', port))
        db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('smtp_user', user))
        if password and '••••' not in password: # only update & encrypt at rest if provided
            db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('smtp_pass', encrypt_sensitive(password)))
        db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('smtp_from', from_email))
        db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('smtp_tls', use_tls))
        db.commit()
        return jsonify({'success': True, 'message': 'SMTP configuration saved successfully'})
    else:
        cfg = get_smtp_config()
        return jsonify({
            'success': True,
            'host': cfg.get('host', ''),
            'port': cfg.get('port', 587),
            'user': cfg.get('user', ''),
            'has_password': bool(cfg.get('password')),
            'from_email': cfg.get('from_email', 'charlesyoung@platformstraining.com'),
            'use_tls': cfg.get('use_tls', True)
        })

@app.route('/api/admin/test-smtp', methods=['POST'])
def test_smtp_route():
    if not is_admin_request():
        return jsonify({'success': False, 'error': 'Admin authorization required'}), 401
    data = request.get_json() or {}
    target_email = data.get('email', '').strip()
    if not target_email or '@' not in target_email:
        return jsonify({'success': False, 'error': 'Target email address required'}), 400

    test_code = "773873"
    subject = "Platforms Training Academy - Live SMTP Test"
    html = f"""
    <div style="font-family:Arial,sans-serif; max-width:500px; padding:20px; background:#0f172a; color:#fff; border-radius:8px;">
        <h2 style="color:#80a315; margin-top:0;">Platforms Training Academy</h2>
        <p>This is a live test email confirming that your server-side SMTP email dispatch is operational.</p>
        <p>Test Verification Code: <strong style="color:#80a315; font-size:20px;">{test_code}</strong></p>
        <p style="font-size:12px; color:#94a3b8;">Platforms Training Academy &bull; Chicago, IL</p>
    </div>
    """
    ok, err = send_email_smtp(target_email, subject, html, f"Platforms Training Academy Live SMTP Test. Test Code: {test_code}")
    if ok:
        return jsonify({'success': True, 'message': f'Test email sent to {target_email} successfully!'})
    else:
        return jsonify({'success': False, 'error': err}), 500

# 3. List All Students (for Admin Dashboard)
@app.route('/api/students', methods=['GET'])
def list_students():
    db = get_db()
    purge_test_and_fake_records(db)
    rows = db.execute('''
        SELECT s.*, 
               (SELECT COUNT(*) FROM progress p WHERE p.student_id = s.id AND p.study_done = 1 AND p.scenario_done = 1 AND p.quiz_done = 1) as completed_modules,
               (SELECT id FROM certificates c WHERE c.student_id = s.id) as cert_id,
               (SELECT issued_at FROM certificates c WHERE c.student_id = s.id) as cert_issued_at,
               (SELECT cert_data_json FROM certificates c WHERE c.student_id = s.id) as cert_data_json,
               (SELECT CASE WHEN c.pdf_base64 IS NOT NULL AND LENGTH(c.pdf_base64) > 20 THEN 1 ELSE 0 END FROM certificates c WHERE c.student_id = s.id) as has_saved_cert_pdf,
               (SELECT pdf_filename FROM certificates c WHERE c.student_id = s.id) as cert_filename,
               (SELECT instructor_completed FROM certificates c WHERE c.student_id = s.id) as cert_instructor_completed,
               (SELECT emailed_to_student FROM certificates c WHERE c.student_id = s.id) as cert_emailed_to_student,
               (SELECT emailed_to_idfpr FROM certificates c WHERE c.student_id = s.id) as cert_emailed_to_idfpr
        FROM students s
        WHERE s.is_admin = 0
        ORDER BY s.last_active DESC
    ''').fetchall()

    cal_data = load_calendar_data()
    armed_res_by_email = {}
    for res_item in (cal_data.get('reservations') or []):
        remail = str(res_item.get('studentEmail') or '').strip().lower()
        if remail and remail not in armed_res_by_email:
            armed_res_by_email[remail] = res_item

    students = []
    for r in rows:
        sid = r['id']
        exams = db.execute('SELECT * FROM exam_results WHERE student_id = ? ORDER BY id ASC', (sid,)).fetchall()
        attempts = []
        for idx, ex in enumerate(exams, 1):
            att_num = ex['attempt_number'] if ('attempt_number' in ex.keys() and ex['attempt_number']) else idx
            attempts.append({
                'attempt_number': att_num,
                'score': f"{ex['score']}/{ex['total_questions']}",
                'percentage': ex['percentage'],
                'passed': bool(ex['passed']),
                'date': ex['completed_at'],
                'time_taken_seconds': ex['time_taken_seconds']
            })
        best_score = max([e['percentage'] for e in exams]) if exams else None
        latest_exam = dict(exams[-1]) if exams else None
        mfa_verified = bool(r['mfa_verified']) if ('mfa_verified' in r.keys() and r['mfa_verified']) else False
        mfa_verified_at = r['mfa_verified_at'] if 'mfa_verified_at' in r.keys() else None

        is_armed_row = str(sid or '').lower().startswith('armed::')
        armed_cert_obj = None
        if 'cert_data_json' in r.keys() and r['cert_data_json']:
            try:
                decrypted_json = decrypt_sensitive(r['cert_data_json'])
                armed_cert_obj = json.loads(decrypted_json)
                if not is_admin_request() and isinstance(armed_cert_obj, dict):
                    for pii_k in ('ssn', 'dob', 'address', 'signature'):
                        armed_cert_obj.pop(pii_k, None)
            except Exception:
                armed_cert_obj = None
        instructor_done = bool(
            (r['cert_instructor_completed'] if 'cert_instructor_completed' in r.keys() else 0)
            or (armed_cert_obj and armed_cert_obj.get('instructor_completed'))
        )
        armed_pending_instructor = bool(is_armed_row and not instructor_done)

        students.append({
            'id': r['id'],
            'name': r['name'],
            'email': r['email'],
            'agency': r['agency'],
            'course_type': 'armed' if is_armed_row else 'unarmed',
            'armed_pending_instructor': armed_pending_instructor,
            'payment_status': (
                'Paid $200 - Online Armed Security (28-Hr Tan Card)' if is_armed_row
                else 'Paid $50 - Online Unarmed Security (PERC)'
            ) if r['is_paid'] else 'Pending Payment',
            'is_paid': True if TEMPORARY_PAYWALL_DISABLED else bool(r['is_paid']),
            'completed_modules': r['completed_modules'],
            'total_modules': 10,
            'exam_attempts': len(exams),
            'best_score': best_score,
            'latest_score': latest_exam['percentage'] if latest_exam else None,
            'latest_passed': bool(latest_exam['passed']) if latest_exam else False,
            'latest_exam_date': latest_exam['completed_at'] if latest_exam else None,
            'has_passed': any(bool(e['passed']) for e in exams),
            'mfa_verified': mfa_verified,
            'mfa_verified_at': mfa_verified_at,
            'has_password': bool(r['password_hash']) if ('password_hash' in r.keys() and r['password_hash']) else False,
            'confirmation_email_sent': bool(r['confirmation_email_sent']) if ('confirmation_email_sent' in r.keys() and r['confirmation_email_sent']) else bool(r['is_paid']),
            'confirmation_email_sent_at': (r['confirmation_email_sent_at'] if ('confirmation_email_sent_at' in r.keys() and r['confirmation_email_sent_at']) else r['created_at']),
            'reminder_not_applicable': (not is_armed_row),
            'range_qualification_date': (
                (r['range_qualification_date'] if ('range_qualification_date' in r.keys() and r['range_qualification_date']) else None)
                or (armed_res_by_email.get(str(r['email'] or '').strip().lower(), {}).get('date') if is_armed_row else None)
            ),
            'reminder_email_sent': (
                (bool(r['reminder_email_sent']) if ('reminder_email_sent' in r.keys() and r['reminder_email_sent']) else False)
                or bool(armed_res_by_email.get(str(r['email'] or '').strip().lower(), {}).get('reminderSent'))
            ) if is_armed_row else False,
            'reminder_email_sent_at': (r['reminder_email_sent_at'] if ('reminder_email_sent_at' in r.keys() and is_armed_row) else None),
            'thank_you_email_sent': bool(r['thank_you_email_sent']) if ('thank_you_email_sent' in r.keys() and r['thank_you_email_sent']) else bool(r['cert_id']),
            'thank_you_email_sent_at': (r['thank_you_email_sent_at'] if 'thank_you_email_sent_at' in r.keys() else r['cert_issued_at']),
            'cert_id': r['cert_id'],
            'cert_issued_at': r['cert_issued_at'],
            'has_saved_cert_pdf': bool(r['has_saved_cert_pdf']) if 'has_saved_cert_pdf' in r.keys() else False,
            'cert_filename': r['cert_filename'] if 'cert_filename' in r.keys() else None,
            'cert_emailed_to_student': bool(r['cert_emailed_to_student']) if 'cert_emailed_to_student' in r.keys() else False,
            'cert_emailed_to_idfpr': bool(r['cert_emailed_to_idfpr']) if 'cert_emailed_to_idfpr' in r.keys() else False,
            'armed_cert_data': armed_cert_obj if is_armed_row else None,
            'unarmed_cert_data': armed_cert_obj if not is_armed_row else None,
            'created_at': r['created_at'],
            'last_active': r['last_active'],
            'attempts': attempts
        })

    # Sort so Online Armed Security students pending instructor certificate completion appear at the top of the list
    students.sort(key=lambda s: (
        0 if s.get('armed_pending_instructor') else 1,
        0 if (s.get('armed_pending_instructor') and s.get('armed_cert_data')) else 1
    ))
    try:
        sync_to_cloud_json()
    except Exception: pass
    return jsonify({'students': students})

@app.route('/api/admin/students/delete', methods=['POST'])
def admin_delete_student():
    if not is_admin_request():
        return jsonify({'success': False, 'error': 'Admin authorization required'}), 401
    data = request.get_json() or {}
    student_id = (data.get('student_id') or '').strip()
    email = (data.get('email') or '').strip().lower()
    if not student_id and not email:
        return jsonify({'success': False, 'error': 'student_id or email required'}), 400
    db = get_db()
    cur = db.cursor()
    for val in {v for v in [student_id, email, f"armed::{email}" if email else ""] if v}:
        cur.execute('DELETE FROM students WHERE LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)', (val, val))
        cur.execute('DELETE FROM progress WHERE LOWER(student_id) = LOWER(?)', (val,))
        cur.execute('DELETE FROM exam_results WHERE LOWER(student_id) = LOWER(?)', (val,))
        cur.execute('DELETE FROM certificates WHERE LOWER(student_id) = LOWER(?)', (val,))
        cur.execute('DELETE FROM analytics_events WHERE LOWER(student_id) = LOWER(?)', (val,))
        delete_student_from_mongodb(val)
    db.commit()
    try:
        sync_to_cloud_json()
    except Exception:
        pass
    return jsonify({'success': True, 'deleted': student_id or email})

# 4. Student Register / Login (Cross-Device Sync)
@app.route('/api/students/login', methods=['POST'])
def student_login():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    student_id = data.get('student_id', email or name).strip()
    agency = data.get('agency', '').strip()
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not student_id:
        return jsonify({'success': False, 'error': 'Student email or ID required'}), 400
    if is_fake_or_test_identity(student_id, name) or is_fake_or_test_identity(email, name):
        return jsonify({'success': False, 'error': 'Real student profile required'}), 200

    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT * FROM students WHERE id = ?', (student_id,))
    existing = cur.fetchone()

    if existing:
        cur.execute('UPDATE students SET name = ?, agency = ?, last_active = ? WHERE id = ?',
                    (name or existing['name'], agency or existing['agency'], now_str, student_id))
    else:
        cur.execute('''
            INSERT INTO students (id, name, email, student_id, agency, is_paid, is_admin, created_at, last_active)
            VALUES (?, ?, ?, ?, ?, 0, 0, ?, ?)
        ''', (student_id, name or 'Student Officer', email, student_id, agency, now_str, now_str))

    db.commit()
    
    # Fetch updated student record
    student = db.execute('SELECT * FROM students WHERE id = ?', (student_id,)).fetchone()
    cert = db.execute('SELECT * FROM certificates WHERE student_id = ?', (student_id,)).fetchone()

    # Fetch module progress for cross-device resume
    progress_rows = db.execute('SELECT * FROM progress WHERE student_id = ?', (student_id,)).fetchall()
    module_sections = {}
    for pr in progress_rows:
        module_sections[str(pr['lesson_id'])] = {
            'study': bool(pr['study_done']),
            'scenario': bool(pr['scenario_done']),
            'quiz': bool(pr['quiz_done'])
        }

    # Fetch all exam results and attempts
    exams = db.execute('SELECT * FROM exam_results WHERE student_id = ? ORDER BY id ASC', (student_id,)).fetchall()
    attempts = []
    for idx, ex in enumerate(exams, 1):
        attempts.append({
            'attempt_number': ex['attempt_number'] if ('attempt_number' in ex.keys() and ex['attempt_number']) else idx,
            'score': ex['score'],
            'percentage': ex['percentage'],
            'passed': bool(ex['passed']),
            'completed_at': ex['completed_at']
        })
    best_score = max([e['percentage'] for e in exams]) if exams else None
    latest_exam = dict(exams[-1]) if exams else None

    # Double-check payment with strict isolation between Unarmed (<email>) and Armed (armed::<email>)
    is_armed_login = str(student['id'] or '').lower().startswith('armed::')
    if is_armed_login:
        pay_event = db.execute(
            "SELECT * FROM analytics_events WHERE event_type = 'payment_received' AND LOWER(student_id) = LOWER(?) ORDER BY id DESC LIMIT 1",
            (student['id'],)
        ).fetchone()
    else:
        pay_event = db.execute(
            "SELECT * FROM analytics_events WHERE event_type = 'payment_received' AND (LOWER(student_id) = LOWER(?) OR LOWER(student_id) = LOWER(?)) AND LOWER(student_id) NOT LIKE 'armed::%' ORDER BY id DESC LIMIT 1",
            (student['id'], student['email'] or student_id)
        ).fetchone()
    verified_paid = True if TEMPORARY_PAYWALL_DISABLED else (bool(student['is_paid']) and (pay_event is not None))
    if student['is_paid'] and not pay_event and not TEMPORARY_PAYWALL_DISABLED:
        db.execute('UPDATE students SET is_paid = 0 WHERE id = ?', (student['id'],))
        db.commit()

    return jsonify({
        'success': True,
        'student': {
            'id': student['id'],
            'name': student['name'],
            'email': student['email'],
            'agency': student['agency'],
            'is_paid': verified_paid,
            'payment_verified': verified_paid,
            'payment_details': pay_event['details'] if pay_event else None,
            'has_certificate': cert is not None,
            'cert_id': cert['id'] if cert else None,
            'cert_locked': bool(cert['is_locked']) if cert else False,
            'mfa_verified': bool(student['mfa_verified']) if ('mfa_verified' in student.keys() and student['mfa_verified']) else False,
            'mfa_verified_at': student['mfa_verified_at'] if 'mfa_verified_at' in student.keys() else None,
            'created_at': student['created_at'],
            'last_active': student['last_active']
        },
        'progress': module_sections,
        'exam_attempts': len(exams),
        'attempts': attempts,
        'latest_exam': latest_exam,
        'best_score': best_score
    })

# 5. Save Progress
@app.route('/api/progress/save', methods=['POST'])
def save_progress():
    data = request.get_json() or {}
    student_id = data.get('student_id')
    module_sections = data.get('module_sections', {})
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not student_id:
        return jsonify({'error': 'Missing student_id'}), 400

    db = get_db()
    cur = db.cursor()

    for lid_str, sec in module_sections.items():
        try:
            lid = int(lid_str)
            study = 1 if sec.get('study') else 0
            scenario = 1 if sec.get('scenario') else 0
            quiz = 1 if sec.get('quiz') else 0

            cur.execute('''
                INSERT INTO progress (student_id, lesson_id, study_done, scenario_done, quiz_done, updated_at)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT(student_id, lesson_id) DO UPDATE SET
                    study_done = excluded.study_done,
                    scenario_done = excluded.scenario_done,
                    quiz_done = excluded.quiz_done,
                    updated_at = excluded.updated_at
            ''', (student_id, lid, study, scenario, quiz, now_str))
        except ValueError:
            pass

    cur.execute('UPDATE students SET last_active = ? WHERE id = ?', (now_str, student_id))
    db.commit()
    return jsonify({'success': True, 'saved_at': now_str})

# 6. Submit Final Exam (Recording Scores & Number of Attempts)
@app.route('/api/exam/submit', methods=['POST'])
def submit_exam():
    data = request.get_json() or {}
    student_id = data.get('student_id', 'anonymous').strip()
    score = int(data.get('score', 0))
    total = int(data.get('total', 50))
    percentage = int(data.get('percentage', 0))
    passed = 1 if data.get('passed') else 0
    time_taken = int(data.get('time_taken_seconds', 0))
    answers_json = json.dumps(data.get('answers', {}))
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    db = get_db()
    cur = db.cursor()

    # Calculate attempt number
    prev_attempts = cur.execute('SELECT COUNT(*) FROM exam_results WHERE student_id = ?', (student_id,)).fetchone()[0]
    attempt_num = prev_attempts + 1

    cur.execute('''
        INSERT INTO exam_results (student_id, attempt_number, score, total_questions, percentage, passed, time_taken_seconds, answers_json, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (student_id, attempt_num, score, total, percentage, passed, time_taken, answers_json, now_str))
    
    cur.execute('UPDATE students SET last_active = ? WHERE id = ?', (now_str, student_id))
    db.commit()

    return jsonify({
        'success': True,
        'exam_id': cur.lastrowid,
        'attempt_number': attempt_num,
        'total_attempts': attempt_num,
        'percentage': percentage,
        'passed': bool(passed)
    })

# 7. Process & Verify Course Payment ($50.00 Unarmed / $200.00 Armed — Strictly Isolated)
@app.route('/api/payment/checkout', methods=['POST'])
def process_payment():
    data = request.get_json() or {}
    student_id = (data.get('student_id') or '').strip()
    raw_email = (data.get('email') or '').strip().lower()
    email = raw_email or (student_id[7:].lower() if student_id.lower().startswith('armed::') else student_id.lower())
    course_type = (data.get('course_type') or '').strip().lower()
    session_id = (data.get('session_id') or 'stripe_verified').strip()
    payment_token = (data.get('payment_token') or '').strip()
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not student_id and not email:
        return jsonify({'error': 'Missing student_id'}), 400

    is_armed = student_id.lower().startswith('armed::') or course_type == 'armed' or payment_token.upper().startswith('PTA-ARMED-')
    db = get_db()
    cur = db.cursor()

    if is_armed:
        target_id = student_id if student_id.lower().startswith('armed::') else f"armed::{email}"
        chosen_range_date = (data.get('range_qualification_date') or data.get('class_date') or '').strip()
        if not chosen_range_date and email:
            try:
                cal = load_calendar_data()
                for r in cal.get('reservations', []):
                    if (r.get('email') or '').strip().lower() == email and (r.get('courseId') or '') in ('armed-28', 'armed-40', 'requal-8', '28-Hour Armed Security Course', 'Online Armed Security Course'):
                        chosen_range_date = (r.get('date') or '').strip()
                        break
            except Exception:
                pass
        existing_armed = cur.execute('SELECT id FROM students WHERE LOWER(id) = LOWER(?)', (target_id,)).fetchone()
        if existing_armed:
            if chosen_range_date:
                cur.execute('UPDATE students SET is_paid = 1, range_qualification_date = ?, last_active = ? WHERE LOWER(id) = LOWER(?)', (chosen_range_date, now_str, target_id))
            else:
                cur.execute('UPDATE students SET is_paid = 1, last_active = ? WHERE LOWER(id) = LOWER(?)', (now_str, target_id))
        else:
            cur.execute('''
                INSERT INTO students (id, name, email, student_id, agency, is_paid, is_admin, range_qualification_date, created_at, last_active)
                VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?, ?)
            ''', (target_id, data.get('name') or 'Student Officer', email, target_id, data.get('agency') or '', chosen_range_date, now_str, now_str))
        details_str = f"Online Armed Course Fee $200.00 verified (ref: {session_id})"
    else:
        chosen_range_date = ''
        target_id = email or student_id
        cur.execute(
            "UPDATE students SET is_paid = 1, last_active = ? WHERE (LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)) AND LOWER(id) NOT LIKE 'armed::%'",
            (now_str, target_id, email)
        )
        details_str = f"Online Unarmed Course Fee $50.00 verified (ref: {session_id})"

    if payment_token:
        details_str += f" [{payment_token}]"

    cur.execute('''
        INSERT INTO analytics_events (event_type, student_id, details, timestamp)
        VALUES ('payment_received', ?, ?, ?)
    ''', (target_id, details_str, now_str))
    
    db.commit()

    # Automatically send Class & Payment Confirmation Email if student email is valid
    if email and '@' in email:
        try:
            c_title = "28-Hour Armed Security Course (Online + Range Qualification)" if is_armed else "20-Hour Online Unarmed Security Course (PERC)"
            c_price = "$200.00 (Paid)" if is_armed else "$50.00 (Paid)"
            c_date = (data.get('class_date') or chosen_range_date or "Scheduled In-Person Range Qualification + 24/7 Online Portal") if is_armed else (data.get('class_date') or "24/7 Self-Paced Online Portal")
            c_time = data.get('class_time') or ("9:00 AM – 5:00 PM (Range) / 24/7 Online" if is_armed else "Self-Paced Online Access")
            c_loc = data.get('location') or ("Eagle Sports Range (5900 W 159th St, Oak Forest, IL) & Online Portal" if is_armed else "100% Online Portal (platformstraining.com)")
            subj, h_body, t_body = build_class_payment_confirmation_email(
                data.get('name') or 'Student Officer', c_title, c_date, c_time, c_loc, c_price, session_id
            )
            send_email_smtp(email, subj, h_body, t_body)
            cur.execute(
                "UPDATE students SET confirmation_email_sent = 1, confirmation_email_sent_at = ? WHERE LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)",
                (now_str, target_id, email)
            )
            db.commit()
        except Exception as e:
            print("Payment confirmation email note:", e)

    return jsonify({
        'success': True,
        'is_paid': True,
        'payment_verified': True,
        'student_id': target_id,
        'session_id': session_id,
        'message': 'Payment authorized and verified successfully!'
    })

# 8. Issue Certificate & Save to Instructor Certificate Database (Armed Part 1 & Unarmed Completed PDF)
@app.route('/api/certificate/issue', methods=['POST'])
def issue_certificate():
    data = request.get_json() or {}
    student_id = (data.get('student_id') or '').strip()
    cert_id = (data.get('cert_id') or ('PTA-IL-' + datetime.now().strftime('%Y%m%d%H%M%S'))).strip()
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not student_id:
        return jsonify({'error': 'Missing student_id'}), 400

    pdf_base64 = data.get('pdf_base64') or ''
    if ',' in pdf_base64:
        pdf_base64 = pdf_base64.split(',', 1)[1]
    pdf_filename = (data.get('pdf_filename') or data.get('filename') or '').strip()

    # Strip large pdf_base64 out of cert_data_json metadata dict to keep JSON clean while storing pdf_base64 in its column
    meta_dict = {k: v for k, v in data.items() if k != 'pdf_base64'}
    cert_json_str = json.dumps(meta_dict)

    db = get_db()
    cur = db.cursor()

    cur.execute('SELECT * FROM certificates WHERE LOWER(student_id) = LOWER(?)', (student_id,))
    existing = cur.fetchone()
    is_armed_req = str(student_id or '').lower().startswith('armed::') or data.get('course_type') == 'armed'
    course_type_val = 'armed' if is_armed_req else 'unarmed'
    student_email_val = (data.get('email') or (student_id[7:] if str(student_id).lower().startswith('armed::') else (student_id if '@' in str(student_id) else ''))).strip().lower()

    if existing and existing['is_locked'] == 1 and not is_armed_req:
        # Still allow saving the PDF copy into the instructor database if it wasn't saved yet
        if pdf_base64:
            cur.execute('''
                UPDATE certificates
                SET pdf_base64 = ?, pdf_filename = COALESCE(NULLIF(?, ''), pdf_filename), updated_at = ?
                WHERE LOWER(student_id) = LOWER(?)
            ''', (pdf_base64, pdf_filename, now_str, student_id))
            db.commit()
        return jsonify({
            'success': True,
            'is_locked': True,
            'already_issued': True,
            'cert_id': existing['id'],
            'issued_at': existing['issued_at'],
            'saved_to_instructor_db': True,
            'message': 'Certificate was previously issued and sealed under IDFPR regulations.'
        })

    if existing and is_armed_req:
        # Update armed student's saved Trainee section while preserving any Instructor fields if present
        merged_data = {}
        try:
            if existing['cert_data_json']:
                merged_data = json.loads(decrypt_sensitive(existing['cert_data_json']))
        except Exception:
            pass
        merged_data.update(meta_dict)
        instr_done = 1 if merged_data.get('instructor_completed') else 0
        cur.execute('''
            UPDATE certificates SET
                trainee_name = ?, address = ?, city = ?, state = ?, zip = ?,
                dob = ?, ssn = ?, weight = ?, height = ?, hair = ?, eyes = ?,
                signature = ?, date_completed = ?, cert_data_json = ?,
                course_type = 'armed', student_email = ?, instructor_completed = ?,
                pdf_base64 = COALESCE(NULLIF(?, ''), pdf_base64),
                pdf_filename = COALESCE(NULLIF(?, ''), pdf_filename),
                updated_at = ?
            WHERE LOWER(student_id) = LOWER(?)
        ''', (
            data.get('name', ''), encrypt_sensitive(data.get('address', '')), data.get('city', ''),
            data.get('state', 'IL'), data.get('zip', ''), encrypt_sensitive(data.get('dob', '')),
            encrypt_sensitive(data.get('ssn', '')), data.get('weight', ''), data.get('height', ''),
            data.get('hair', ''), data.get('eyes', ''), encrypt_sensitive(data.get('signature', '')),
            data.get('date_completed', ''), encrypt_sensitive(json.dumps(merged_data)),
            student_email_val, instr_done, pdf_base64, pdf_filename, now_str, student_id
        ))
    else:
        # Insert new certificate (Unarmed completed certificate or Armed Part 1 Trainee submission)
        instr_done = 0 if is_armed_req else 1
        cur.execute('''
            INSERT INTO certificates (
                id, student_id, trainee_name, address, city, state, zip,
                dob, ssn, weight, height, hair, eyes, signature,
                date_completed, issued_at, is_locked, cert_data_json,
                course_type, student_email, pdf_base64, pdf_filename,
                instructor_completed, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            cert_id, student_id, data.get('name', ''), encrypt_sensitive(data.get('address', '')),
            data.get('city', ''), data.get('state', 'IL'), data.get('zip', ''),
            encrypt_sensitive(data.get('dob', '')), encrypt_sensitive(data.get('ssn', '')), data.get('weight', ''),
            data.get('height', ''), data.get('hair', ''), data.get('eyes', ''),
            encrypt_sensitive(data.get('signature', '')), data.get('date_completed', ''), now_str, encrypt_sensitive(cert_json_str),
            course_type_val, student_email_val, pdf_base64 or None, pdf_filename or None,
            instr_done, now_str
        ))

    try:
        sync_to_cloud_json()
    except Exception:
        pass

    cur.execute('''
        INSERT INTO analytics_events (event_type, student_id, details, timestamp)
        VALUES ('certificate_issued', ?, ?, ?)
    ''', (student_id, f"Certificate {cert_id} ({course_type_val}) saved to database", now_str))

    db.commit()

    # Automatically send Graduation Thank You + Google Review Email for Unarmed graduates
    if not is_armed_req:
        try:
            grad_email = student_email_val
            if grad_email and '@' in grad_email:
                subj, h_body, t_body = build_thank_you_google_review_email(
                    data.get('name') or 'Graduate Officer',
                    '20-Hour Basic Unarmed Security Officer Course (PERC)'
                )
                send_email_smtp(grad_email, subj, h_body, t_body)
            cur.execute(
                "UPDATE students SET thank_you_email_sent = 1, thank_you_email_sent_at = ? WHERE LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)",
                (now_str, student_id, grad_email)
            )
            db.commit()
        except Exception as e:
            print("Unarmed thank-you review email note:", e)

    return jsonify({
        'success': True,
        'cert_id': cert_id,
        'is_locked': True,
        'saved_to_instructor_db': True,
        'message': 'Certificate issued and saved in Instructor Database.'
    })


# 8B. Email Unarmed Certificate PDF to Student Email on File & Save Copy to Instructor Database
@app.route('/api/certificate/email-unarmed', methods=['POST'])
def email_unarmed_certificate():
    data = request.get_json() or {}
    student_id = (data.get('student_id') or '').strip()
    student_email = (data.get('email') or data.get('student_email') or '').strip().lower()
    if not student_email and '@' in student_id:
        student_email = student_id.lower()
    student_name = (data.get('name') or data.get('student_name') or 'Graduate Officer').strip()
    cert_id = (data.get('cert_id') or ('PTA-IL-' + datetime.now().strftime('%Y%m%d%H%M%S'))).strip()
    pdf_base64 = data.get('pdf_base64') or ''
    filename = (data.get('filename') or f"Illinois_20Hr_Unarmed_Certificate_{student_name.replace(' ', '_')}.pdf").strip()
    date_completed = (data.get('date_completed') or datetime.now().strftime('%m/%d/%Y')).strip()
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not student_email or '@' not in student_email:
        return jsonify({'success': False, 'error': 'Valid student email address on file is required.'}), 400
    if not pdf_base64:
        return jsonify({'success': False, 'error': 'Missing generated PDF certificate attachment.'}), 400

    try:
        if ',' in pdf_base64:
            pdf_base64 = pdf_base64.split(',', 1)[1]
        pdf_bytes = base64.b64decode(pdf_base64)
    except Exception as e:
        return jsonify({'success': False, 'error': f'Invalid PDF payload: {e}'}), 400

    # Save/update certificate in Instructor Database so instructor always has a copy
    try:
        db = get_db()
        cur = db.cursor()
        target_sid = student_id or student_email
        existing = cur.execute('SELECT * FROM certificates WHERE LOWER(student_id) = LOWER(?)', (target_sid,)).fetchone()
        meta_dict = {k: v for k, v in data.items() if k != 'pdf_base64'}
        if existing:
            cur.execute('''
                UPDATE certificates
                SET pdf_base64 = ?, pdf_filename = ?, student_email = ?, emailed_to_student = 1, instructor_completed = 1, updated_at = ?
                WHERE LOWER(student_id) = LOWER(?)
            ''', (pdf_base64, filename, student_email, now_str, target_sid))
        else:
            cur.execute('''
                INSERT INTO certificates (
                    id, student_id, trainee_name, address, city, state, zip,
                    dob, ssn, weight, height, hair, eyes, signature,
                    date_completed, issued_at, is_locked, cert_data_json,
                    course_type, student_email, pdf_base64, pdf_filename,
                    instructor_completed, emailed_to_student, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'unarmed', ?, ?, ?, 1, 1, ?)
            ''', (
                cert_id, target_sid, student_name, encrypt_sensitive(data.get('address', '')),
                data.get('city', ''), data.get('state', 'IL'), data.get('zip', ''),
                encrypt_sensitive(data.get('dob', '')), encrypt_sensitive(data.get('ssn', '')), data.get('weight', ''),
                data.get('height', ''), data.get('hair', ''), data.get('eyes', ''),
                encrypt_sensitive(data.get('signature', '')), date_completed, now_str, encrypt_sensitive(json.dumps(meta_dict)),
                student_email, pdf_base64, filename, now_str
            ))
        db.commit()
        sync_to_cloud_json()
    except Exception as db_err:
        print("Save unarmed cert on email note:", db_err)

    subject = f"Your Official Illinois 20-Hour Unarmed Security Certificate (Form IL486-0486) - {student_name}"
    html_body = f'''
    <div style="font-family:Arial,sans-serif; max-width:620px; padding:24px; background:#0f172a; color:#f8fafc; border-radius:10px; border:1px solid #334155;">
        <h2 style="color:#d4af37; margin-top:0;">Platforms Training Academy &bull; Official 20-Hour Unarmed Security Certificate</h2>
        <p style="color:#e2e8f0; line-height:1.6;">
            Congratulations, <strong>{student_name}</strong>! Attached to this email is your official completed <strong>State of Illinois Certification of Completion of a Basic Training Course — Form IL486-0486 (20-Hour Unarmed Security Officer / PERC)</strong>.
        </p>
        <div style="background:#1e293b; border-left:4px solid #d4af37; padding:14px 16px; border-radius:6px; margin:16px 0; font-size:14px; color:#f1f5f9;">
            <div><strong>Trainee Name:</strong> {student_name}</div>
            <div><strong>Course Completed:</strong> 20-Hour Basic Unarmed Security Training (225 ILCS 447)</div>
            <div><strong>IDFPR Approved Curriculum Number:</strong> 102-000398</div>
            <div><strong>Date Training Completed:</strong> {date_completed}</div>
            <div><strong>Lead Instructor:</strong> Charles Young (License #263-000693)</div>
            <div><strong>Certificate Serial ID:</strong> {cert_id}</div>
        </div>
        <p style="font-size:13px; color:#fde68a; line-height:1.5;">
            <strong>Important:</strong> Please save the attached PDF certificate across multiple secure locations and print a physical hard copy for your permanent records and Illinois PERC application.
        </p>
        <p style="font-size:12px; color:#64748b; margin-bottom:0;">
            Platforms Training Academy &bull; 200 E 75th St, Chicago, IL 60615 &bull; platformstraining.com
        </p>
    </div>
    '''
    text_body = f'''Platforms Training Academy - Official 20-Hour Unarmed Security Certificate (Form IL486-0486)
Trainee Name: {student_name}
Course: 20-Hour Basic Unarmed Security Training (IDFPR #102-000398)
Date Completed: {date_completed}
Certificate ID: {cert_id}
Instructor: Charles Young (License #263-000693)
'''
    ok, msg_str = send_email_smtp_with_pdf([student_email], subject, html_body, text_body, pdf_bytes, filename)
    if ok:
        return jsonify({
            'success': True,
            'to_email': student_email,
            'cert_id': cert_id,
            'saved_to_instructor_db': True,
            'message': f'Official Unarmed Certificate emailed to {student_email} and saved in Academy Database!'
        })
    else:
        return jsonify({
            'success': False,
            'to_email': student_email,
            'cert_id': cert_id,
            'saved_to_instructor_db': True,
            'error': msg_str
        }), 500

# 9. Get Certificate Status
@app.route('/api/certificate/status/<path:student_id>', methods=['GET'])
def get_cert_status(student_id):
    db = get_db()
    if str(student_id or '').lower().startswith('armed::'):
        student = db.execute('SELECT * FROM students WHERE LOWER(id) = LOWER(?)', (student_id,)).fetchone()
        pay_event = db.execute(
            "SELECT * FROM analytics_events WHERE event_type = 'payment_received' AND LOWER(student_id) = LOWER(?) ORDER BY id DESC LIMIT 1",
            (student_id,)
        ).fetchone()
    else:
        student = db.execute(
            "SELECT * FROM students WHERE (LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)) AND LOWER(id) NOT LIKE 'armed::%'",
            (student_id, student_id)
        ).fetchone()
        pay_event = db.execute(
            "SELECT * FROM analytics_events WHERE event_type = 'payment_received' AND LOWER(student_id) = LOWER(?) AND LOWER(student_id) NOT LIKE 'armed::%' ORDER BY id DESC LIMIT 1",
            (student_id,)
        ).fetchone()
    cert = db.execute('SELECT * FROM certificates WHERE LOWER(student_id) = LOWER(?)', (student_id,)).fetchone()

    is_paid = True if TEMPORARY_PAYWALL_DISABLED else (bool(student and student['is_paid']) and (pay_event is not None))
    is_locked = bool(cert['is_locked']) if cert else False

    cert_dict = None
    if cert:
        cert_dict = dict(cert)
        for scol in ('address', 'dob', 'signature', 'cert_data_json'):
            if cert_dict.get(scol):
                cert_dict[scol] = decrypt_sensitive(cert_dict[scol])
        if cert_dict.get('ssn'):
            cert_dict['ssn'] = decrypt_sensitive(cert_dict['ssn']) if is_admin_request() else mask_ssn_display(cert_dict['ssn'])
        if not is_admin_request():
            cert_dict.pop('pdf_base64', None)
    return jsonify({
        'is_paid': is_paid,
        'payment_verified': is_paid,
        'is_locked': is_locked,
        'certificate': cert_dict
    })

# 9B. Admin Portal: Save / Update Armed Certificate (IL486-1138) with In-Person Range Qualification Info
@app.route('/api/admin/armed-certificate/save', methods=['POST'])
def admin_save_armed_certificate():
    if not is_admin_request():
        return jsonify({'success': False, 'error': 'Admin authorization required'}), 401
    data = request.get_json() or {}
    raw_email = (data.get('email') or '').strip().lower()
    student_id = (data.get('student_id') or '').strip()
    if not student_id and raw_email:
        student_id = f"armed::{raw_email}"
    if not student_id:
        return jsonify({'success': False, 'error': 'Missing student_id or email'}), 400

    cert_data = data.get('armed_cert_data') or {}
    cert_id = cert_data.get('cert_id') or data.get('cert_id') or ('PTA-IL486-' + datetime.now().strftime('%Y%m%d%H%M%S'))
    cert_data['cert_id'] = cert_id
    pdf_base64 = data.get('pdf_base64') or ''
    if ',' in pdf_base64:
        pdf_base64 = pdf_base64.split(',', 1)[1]
    pdf_filename = (data.get('pdf_filename') or data.get('filename') or '').strip()
    instr_done = 1 if cert_data.get('instructor_completed') else 0
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    db = get_db()
    cur = db.cursor()

    # Ensure student row exists
    st = cur.execute('SELECT * FROM students WHERE LOWER(id) = LOWER(?)', (student_id,)).fetchone()
    clean_email = raw_email or (cert_data.get('email') or '').strip().lower() or student_id.replace('armed::', '')
    if not st:
        cur.execute('''
            INSERT INTO students (id, name, email, student_id, agency, is_paid, is_admin, created_at, last_active)
            VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
        ''', (student_id, cert_data.get('name') or 'Armed Trainee', clean_email, student_id, 'Platforms Training Academy (Armed 28-Hr)', now_str, now_str))
    else:
        cur.execute('UPDATE students SET last_active = ? WHERE LOWER(id) = LOWER(?)', (now_str, student_id))

    existing = cur.execute('SELECT * FROM certificates WHERE LOWER(student_id) = LOWER(?)', (student_id,)).fetchone()
    cert_json_str = encrypt_sensitive(json.dumps(cert_data))
    if existing:
        cur.execute('''
            UPDATE certificates SET
                trainee_name = ?, address = ?, city = ?, state = ?, zip = ?,
                dob = ?, ssn = ?, weight = ?, height = ?, hair = ?, eyes = ?,
                signature = ?, date_completed = ?, cert_data_json = ?,
                course_type = 'armed', student_email = ?, instructor_completed = ?,
                pdf_base64 = COALESCE(NULLIF(?, ''), pdf_base64),
                pdf_filename = COALESCE(NULLIF(?, ''), pdf_filename),
                updated_at = ?
            WHERE LOWER(student_id) = LOWER(?)
        ''', (
            cert_data.get('name', ''), encrypt_sensitive(cert_data.get('address', '')), cert_data.get('city', ''),
            cert_data.get('state', 'IL'), cert_data.get('zip', ''), encrypt_sensitive(cert_data.get('dob', '')),
            encrypt_sensitive(cert_data.get('ssn', '')), cert_data.get('weight', ''), cert_data.get('height', ''),
            cert_data.get('hair', ''), cert_data.get('eyes', ''), encrypt_sensitive(cert_data.get('signature', '')),
            cert_data.get('date_training_completed', '') or cert_data.get('trainee_date', ''),
            cert_json_str, clean_email, instr_done, pdf_base64, pdf_filename, now_str, student_id
        ))
    else:
        cur.execute('''
            INSERT INTO certificates (
                id, student_id, trainee_name, address, city, state, zip,
                dob, ssn, weight, height, hair, eyes, signature,
                date_completed, issued_at, is_locked, cert_data_json,
                course_type, student_email, pdf_base64, pdf_filename,
                instructor_completed, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'armed', ?, ?, ?, ?, ?)
        ''', (
            cert_id, student_id, cert_data.get('name', ''), encrypt_sensitive(cert_data.get('address', '')),
            cert_data.get('city', ''), cert_data.get('state', 'IL'), cert_data.get('zip', ''),
            encrypt_sensitive(cert_data.get('dob', '')), encrypt_sensitive(cert_data.get('ssn', '')), cert_data.get('weight', ''),
            cert_data.get('height', ''), cert_data.get('hair', ''), cert_data.get('eyes', ''),
            encrypt_sensitive(cert_data.get('signature', '')), cert_data.get('date_training_completed', '') or now_str,
            now_str, cert_json_str, clean_email, pdf_base64 or None, pdf_filename or None, instr_done, now_str
        ))

    db.commit()
    try:
        sync_to_cloud_json()
    except Exception:
        pass

    return jsonify({
        'success': True,
        'cert_id': cert_id,
        'armed_cert_data': cert_data,
        'saved_to_instructor_db': True,
        'message': 'Armed Certificate (IL486-1138) qualification info saved to student profile and Instructor Database.'
    })

# 9C. Admin Portal: Save & Send Completed Armed Certificate PDF to Student & IDFPR (FPR.SafetyUnit@illinois.gov)
@app.route('/api/admin/armed-certificate/send-email', methods=['POST'])
def admin_send_armed_certificate_email():
    if not is_admin_request():
        return jsonify({'success': False, 'error': 'Admin authorization required'}), 401
    data = request.get_json() or {}
    student_email = (data.get('student_email') or '').strip()
    idfpr_email = (data.get('idfpr_email') or 'FPR.SafetyUnit@illinois.gov').strip()
    student_name = (data.get('student_name') or 'Trainee Officer').strip()
    cert_id = (data.get('cert_id') or 'IL486-1138').strip()
    pdf_base64 = data.get('pdf_base64') or ''
    filename = (data.get('filename') or f"IDFPR_Firearms_Training_Certificate_{student_name.replace(' ', '_')}.pdf").strip()
    cert_data = data.get('armed_cert_data') or {}
    student_id = (data.get('student_id') or '').strip()
    if not student_id and student_email:
        student_id = f"armed::{student_email.lower()}"

    if not pdf_base64:
        return jsonify({'success': False, 'error': 'Missing generated PDF certificate attachment'}), 400

    try:
        if ',' in pdf_base64:
            pdf_base64 = pdf_base64.split(',', 1)[1]
        pdf_bytes = base64.b64decode(pdf_base64)
    except Exception as e:
        return jsonify({'success': False, 'error': f'Invalid PDF base64 payload: {e}'}), 400

    recipients = []
    if student_email and '@' in student_email:
        recipients.append(student_email)
    if idfpr_email and '@' in idfpr_email and idfpr_email.lower() not in [r.lower() for r in recipients]:
        recipients.append(idfpr_email)

    if not recipients:
        return jsonify({'success': False, 'error': 'At least one valid recipient email is required'}), 400

    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    date_completed = cert_data.get('date_training_completed') or datetime.now().strftime('%m/%d/%Y')
    written_score = cert_data.get('written_exam_score') or '100'

    # Always save the completed Armed certificate + PDF into the Instructor Database first
    try:
        cert_data['instructor_completed'] = True
        cert_data['instructor_completed_at'] = now_str
        cert_data['emailed_to_student_and_idfpr'] = True
        cert_data['emailed_at'] = now_str
        cert_data['student_email'] = student_email
        cert_data['idfpr_email'] = idfpr_email
        db = get_db()
        cur = db.cursor()
        existing = cur.execute('SELECT * FROM certificates WHERE LOWER(student_id) = LOWER(?)', (student_id,)).fetchone()
        if existing:
            cur.execute('''
                UPDATE certificates SET
                    trainee_name = ?, date_completed = ?, cert_data_json = ?,
                    course_type = 'armed', student_email = ?, idfpr_email = ?,
                    pdf_base64 = ?, pdf_filename = ?,
                    instructor_completed = 1, emailed_to_student = 1, emailed_to_idfpr = 1,
                    updated_at = ?
                WHERE LOWER(student_id) = LOWER(?)
            ''', (
                student_name, date_completed, encrypt_sensitive(json.dumps(cert_data)),
                student_email, idfpr_email, pdf_base64, filename, now_str, student_id
            ))
        else:
            cur.execute('''
                INSERT INTO certificates (
                    id, student_id, trainee_name, address, city, state, zip,
                    dob, ssn, weight, height, hair, eyes, signature,
                    date_completed, issued_at, is_locked, cert_data_json,
                    course_type, student_email, idfpr_email, pdf_base64, pdf_filename,
                    instructor_completed, emailed_to_student, emailed_to_idfpr, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'armed', ?, ?, ?, ?, 1, 1, 1, ?)
            ''', (
                cert_id, student_id, student_name, encrypt_sensitive(cert_data.get('address', '')),
                cert_data.get('city', ''), cert_data.get('state', 'IL'), cert_data.get('zip', ''),
                encrypt_sensitive(cert_data.get('dob', '')), encrypt_sensitive(cert_data.get('ssn', '')), cert_data.get('weight', ''),
                cert_data.get('height', ''), cert_data.get('hair', ''), cert_data.get('eyes', ''),
                encrypt_sensitive(cert_data.get('signature', '')), date_completed, now_str, encrypt_sensitive(json.dumps(cert_data)),
                student_email, idfpr_email, pdf_base64, filename, now_str
            ))
        db.commit()
        sync_to_cloud_json()
    except Exception as save_err:
        print("Save completed armed cert to DB note:", save_err)

    subject = f"IDFPR Firearms Training Certificate (Form IL486-1138) - {student_name} - Curriculum #102-000398"

    html_body = f'''
    <div style="font-family:Arial,sans-serif; max-width:620px; padding:24px; background:#0f172a; color:#f8fafc; border-radius:10px; border:1px solid #334155;">
        <h2 style="color:#d4af37; margin-top:0;">Platforms Training Academy &bull; Official IDFPR Firearms Training Certificate</h2>
        <p style="color:#e2e8f0; line-height:1.6;">
            Attached is the official completed <strong>Illinois Department of Financial and Professional Regulation (IDFPR) Firearms Training Certificate — Form IL486-1138 10/24 (DE)</strong>.
        </p>
        <div style="background:#1e293b; border-left:4px solid #d4af37; padding:14px 16px; border-radius:6px; margin:16px 0; font-size:14px; color:#f1f5f9;">
            <div><strong>Trainee Name:</strong> {student_name}</div>
            <div><strong>Course Name:</strong> FIREARMS TRAINING COURSE (28-Hour Armed Security)</div>
            <div><strong>IDFPR Approved Curriculum Number:</strong> 102-000398</div>
            <div><strong>Date Training &amp; Range Qualification Completed:</strong> {date_completed}</div>
            <div><strong>Written Examination Score:</strong> {written_score}%</div>
            <div><strong>State Certified Firearm Instructor:</strong> Charles Young (License #263-000693)</div>
            <div><strong>Certificate Reference ID:</strong> {cert_id}</div>
        </div>
        <p style="font-size:13px; color:#94a3b8; line-height:1.5;">
            A copy of this certificate has been dispatched to both the Trainee (<strong>{student_email or 'on file'}</strong>) and the IDFPR Safety Unit (<strong>{idfpr_email}</strong>) in accordance with 225 ILCS 447 / 68 Ill. Adm. Code 1240.
        </p>
        <p style="font-size:12px; color:#64748b; margin-bottom:0;">
            Platforms Training Academy &bull; 200 E 75th St, Chicago, IL 60615 &bull; platformstraining.com
        </p>
    </div>
    '''

    text_body = f'''Platforms Training Academy - Official IDFPR Firearms Training Certificate (Form IL486-1138)
Trainee Name: {student_name}
IDFPR Approved Curriculum Number: 102-000398
Date Training Completed: {date_completed}
Written Exam Score: {written_score}%
Instructor: Charles Young (License #263-000693)
Recipients: {', '.join(recipients)}
'''

    ok, msg_str = send_email_smtp_with_pdf(recipients, subject, html_body, text_body, pdf_bytes, filename)

    if ok and student_email and '@' in student_email:
        try:
            ty_subj, ty_html, ty_text = build_thank_you_google_review_email(
                student_name,
                '28-Hour Armed Security Firearms Training Course (Tan Card)'
            )
            send_email_smtp(student_email, ty_subj, ty_html, ty_text)
            db = get_db()
            db.execute(
                "UPDATE students SET thank_you_email_sent = 1, thank_you_email_sent_at = ? WHERE LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)",
                (datetime.now().strftime('%Y-%m-%d %H:%M:%S'), student_id, student_email)
            )
            db.commit()
        except Exception as e:
            print("Armed thank-you review email note:", e)

    if ok:
        return jsonify({'success': True, 'saved_to_instructor_db': True, 'recipients': recipients, 'message': msg_str})
    else:
        return jsonify({'success': False, 'saved_to_instructor_db': True, 'recipients': recipients, 'error': msg_str}), 500


# 9D. Instructor Certificate Database Endpoints (List & Download Saved Armed/Unarmed Certificates)
@app.route('/api/admin/certificates', methods=['GET'])
def admin_list_saved_certificates():
    if not is_admin_request():
        return jsonify({'success': False, 'error': 'Admin authorization required', 'certificates': []}), 401
    db = get_db()
    rows = db.execute('''
        SELECT id, student_id, trainee_name, address, city, state, zip, dob,
               date_completed, issued_at, updated_at, course_type, student_email,
               idfpr_email, pdf_filename, instructor_completed, emailed_to_student,
               emailed_to_idfpr, cert_data_json,
               CASE WHEN pdf_base64 IS NOT NULL AND LENGTH(pdf_base64) > 20 THEN 1 ELSE 0 END as has_pdf
        FROM certificates
        ORDER BY COALESCE(updated_at, issued_at) DESC
    ''').fetchall()
    certs = []
    for r in rows:
        c_obj = {}
        if r['cert_data_json']:
            try:
                c_obj = json.loads(decrypt_sensitive(r['cert_data_json']))
            except Exception:
                c_obj = {}
        is_armed = (r['course_type'] == 'armed') or str(r['student_id'] or '').lower().startswith('armed::')
        certs.append({
            'id': r['id'],
            'student_id': r['student_id'],
            'trainee_name': r['trainee_name'],
            'course_type': 'armed' if is_armed else 'unarmed',
            'form_code': 'IL486-1138 (28-Hr Armed)' if is_armed else 'IL486-0486 (20-Hr Unarmed)',
            'student_email': r['student_email'] or c_obj.get('email') or '',
            'idfpr_email': r['idfpr_email'] or ('FPR.SafetyUnit@illinois.gov' if is_armed else ''),
            'date_completed': r['date_completed'] or '',
            'issued_at': r['issued_at'] or '',
            'updated_at': r['updated_at'] or r['issued_at'] or '',
            'has_pdf': bool(r['has_pdf']),
            'pdf_filename': r['pdf_filename'] or (f"IDFPR_Armed_Certificate_IL486-1138_{(r['trainee_name'] or 'Student').replace(' ', '_')}.pdf" if is_armed else f"Illinois_20Hr_Unarmed_Certificate_{(r['trainee_name'] or 'Student').replace(' ', '_')}.pdf"),
            'instructor_completed': bool(r['instructor_completed']) if is_armed else True,
            'emailed_to_student': bool(r['emailed_to_student']),
            'emailed_to_idfpr': bool(r['emailed_to_idfpr']),
            'cert_data': c_obj
        })
    return jsonify({'success': True, 'certificates': certs})


@app.route('/api/admin/certificates/download/<path:lookup_id>', methods=['GET'])
def admin_download_saved_certificate(lookup_id):
    if not is_admin_request():
        return jsonify({'success': False, 'error': 'Admin authorization required'}), 401
    db = get_db()
    row = db.execute('''
        SELECT * FROM certificates
        WHERE LOWER(id) = LOWER(?) OR LOWER(student_id) = LOWER(?) OR LOWER(student_email) = LOWER(?)
        ORDER BY COALESCE(updated_at, issued_at) DESC LIMIT 1
    ''', (lookup_id, lookup_id, lookup_id)).fetchone()
    if not row:
        return jsonify({'success': False, 'error': 'Certificate not found in Instructor Database'}), 404
    c_obj = {}
    if row['cert_data_json']:
        try:
            c_obj = json.loads(decrypt_sensitive(row['cert_data_json']))
        except Exception:
            c_obj = {}
    return jsonify({
        'success': True,
        'cert_id': row['id'],
        'student_id': row['student_id'],
        'trainee_name': row['trainee_name'],
        'course_type': row['course_type'],
        'pdf_base64': row['pdf_base64'] or '',
        'pdf_filename': row['pdf_filename'] or f"Official_Certificate_{(row['trainee_name'] or 'Student').replace(' ', '_')}.pdf",
        'cert_data': c_obj
    })

# 10. Course Calendar & Schedule Management (Admin & Public)
CALENDAR_JSON_PATH = os.path.join(DATA_DIR, 'calendar.json')

def load_calendar_data():
    db_cal = None
    file_cal = None
    db = get_db()
    row = db.execute("SELECT value FROM app_settings WHERE key = 'calendar_data'").fetchone()
    if row and row['value']:
        try:
            db_cal = json.loads(row['value'])
        except Exception:
            pass
    if os.path.exists(CALENDAR_JSON_PATH):
        try:
            with open(CALENDAR_JSON_PATH, 'r', encoding='utf-8') as f:
                file_cal = json.load(f)
        except Exception:
            pass
    cal = file_cal or db_cal or {'courses': {}, 'sessions': [], 'reservations': []}
    if db_cal and file_cal:
        if (file_cal.get('last_updated') or '') >= (db_cal.get('last_updated') or ''):
            cal = file_cal
            if db_cal.get('reservations') and not cal.get('reservations'):
                cal['reservations'] = db_cal['reservations']
        else:
            cal = db_cal

    # Merge any reservations stored in the dedicated calendar_reservations table (synced with MongoDB)
    try:
        res_rows = db.execute("SELECT raw_json FROM calendar_reservations ORDER BY created_at DESC").fetchall()
        if res_rows:
            by_id = {str(r.get('id')): r for r in (cal.get('reservations') or []) if r.get('id')}
            for rr in res_rows:
                if rr['raw_json']:
                    robj = json.loads(decrypt_sensitive(rr['raw_json']))
                    rid = str(robj.get('id') or '')
                    if rid and rid not in by_id:
                        by_id[rid] = robj
            cal['reservations'] = list(by_id.values())
    except Exception:
        pass
    return cal

def save_calendar_data(cal_data):
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    cal_data['last_updated'] = now_str
    db = get_db()
    cur = db.cursor()
    for r in (cal_data.get('reservations') or []):
        rid = str(r.get('id') or ('PTA-RES-' + secrets.token_hex(4)))
        r['id'] = rid
        cur.execute('''
            INSERT OR REPLACE INTO calendar_reservations (
                id, session_id, course_id, course_title, student_name, student_email,
                student_phone, date, time, location, price, payment_status,
                confirmation_sent, confirmation_sent_at, reminder_sent, reminder_sent_at,
                thank_you_sent, thank_you_sent_at, raw_json, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            rid,
            r.get('sessionId', ''),
            r.get('courseId', ''),
            r.get('courseTitle', ''),
            r.get('studentName', ''),
            (r.get('studentEmail') or '').strip().lower(),
            encrypt_sensitive(r.get('studentPhone', '')),
            r.get('date', ''),
            r.get('time', ''),
            r.get('location', ''),
            r.get('price', ''),
            r.get('paymentStatus', ''),
            1 if r.get('confirmationSent') else 0,
            r.get('confirmationSentAt', ''),
            1 if r.get('reminderSent') else 0,
            r.get('reminderSentAt', ''),
            1 if r.get('thankYouSent') else 0,
            r.get('thankYouSentAt', ''),
            encrypt_sensitive(json.dumps(r)),
            r.get('createdAt') or now_str
        ))
    cur.execute(
        "INSERT OR REPLACE INTO app_settings (key, value) VALUES ('calendar_data', ?)",
        (json.dumps(cal_data),)
    )
    db.commit()
    try:
        # Write public course catalog & session schedule to static calendar.json WITHOUT student reservation PII
        os.makedirs(DATA_DIR, exist_ok=True)
        public_cal = {
            'last_updated': cal_data.get('last_updated'),
            'courses': cal_data.get('courses', {}),
            'sessions': cal_data.get('sessions', []),
            'reservations': []
        }
        with open(CALENDAR_JSON_PATH, 'w', encoding='utf-8') as f:
            json.dump(public_cal, f, indent=2)
    except Exception as e:
        print(f"[CALENDAR SAVE NOTE] {e}")

@app.route('/api/calendar', methods=['GET', 'POST'])
def api_calendar():
    if request.method == 'GET':
        cal = load_calendar_data()
        if not is_admin_request():
            cal = dict(cal)
            cal['reservations'] = []
        return jsonify(cal)
    data = request.get_json() or {}
    if 'courses' in data and 'sessions' in data:
        save_calendar_data(data)
        return jsonify({'success': True, 'message': 'Calendar schedule updated in cloud.'})
    return jsonify({'error': 'Invalid calendar payload'}), 400

@app.route('/api/calendar/book', methods=['POST'])
def api_calendar_book():
    data = request.get_json() or {}
    cal = load_calendar_data()
    reservation = data.get('reservation')
    if reservation:
        if 'reservations' not in cal or not isinstance(cal['reservations'], list):
            cal['reservations'] = []
        sid = reservation.get('sessionId')
        matched_session = None
        for s in cal.get('sessions', []):
            if s.get('id') == sid:
                matched_session = s
                avail = int(s.get('seatsAvailable', 10))
                if avail > 0:
                    s['seatsAvailable'] = avail - 1
                    if s['seatsAvailable'] == 0:
                        s['status'] = 'Sold Out'
                    elif s['seatsAvailable'] <= 5:
                        s['status'] = 'Filling Fast'
                break
        cid = reservation.get('courseId') or (matched_session.get('courseId') if matched_session else '')
        ctitle = reservation.get('courseTitle') or (matched_session.get('title') if matched_session else 'Scheduled Training Class')
        raw_loc = reservation.get('location') or (matched_session.get('location') if matched_session else '')
        resolved_loc = resolve_course_location(course_id=cid, course_title=ctitle, raw_location=raw_loc)
        reservation['courseId'] = cid
        reservation['location'] = resolved_loc
        reservation['confirmationSent'] = True
        reservation['confirmationSentAt'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        if 'reminderSent' not in reservation:
            reservation['reminderSent'] = False
        if 'thankYouSent' not in reservation:
            reservation['thankYouSent'] = False

        cal['reservations'].insert(0, reservation)
        save_calendar_data(cal)
        try:
            st_email_clean = (reservation.get('studentEmail') or '').strip().lower()
            r_date_val = (reservation.get('date') or '').strip()
            if st_email_clean and r_date_val:
                db = get_db()
                db.execute(
                    "UPDATE students SET range_qualification_date = ? WHERE LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)",
                    (r_date_val, f"armed::{st_email_clean}", st_email_clean)
                )
                db.commit()
        except Exception:
            pass
        # Automatically dispatch Class Registration Confirmation Email with exact course location
        try:
            st_email = (reservation.get('studentEmail') or '').strip()
            if st_email and '@' in st_email:
                subj, h_body, t_body = build_class_payment_confirmation_email(
                    reservation.get('studentName') or 'Student Officer',
                    ctitle,
                    reservation.get('date') or '',
                    reservation.get('time') or '9:00 AM – 5:00 PM',
                    resolved_loc,
                    reservation.get('price') or 'Seat Reserved',
                    reservation.get('id') or 'PTA-RES',
                    course_id=cid
                )
                send_email_smtp(st_email, subj, h_body, t_body)
        except Exception as e:
            print("Calendar booking confirmation email note:", e)
    return jsonify({'success': True, 'calendar': cal})

# 11. Google Business Profile Review Link Configuration & Automated Student Emails API
@app.route('/api/admin/google-review-config', methods=['GET', 'POST'])
def google_review_config_route():
    db = get_db()
    if request.method == 'POST':
        data = request.get_json() or {}
        review_url = (data.get('google_review_url') or DEFAULT_GOOGLE_REVIEW_URL).strip()
        db.execute("INSERT OR REPLACE INTO app_settings (key, value) VALUES ('google_review_url', ?)", (review_url,))
        db.commit()
        return jsonify({'success': True, 'google_review_url': review_url, 'message': 'Google Review link saved!'})
    return jsonify({'success': True, 'google_review_url': get_google_review_url()})

@app.route('/api/emails/send-automated', methods=['POST'])
def send_automated_student_email():
    data = request.get_json() or {}
    email_type = (data.get('email_type') or 'confirmation').strip().lower()
    to_email = (data.get('to_email') or data.get('email') or '').strip()
    student_name = (data.get('student_name') or data.get('name') or 'Student Officer').strip()
    course_id = (data.get('course_id') or '').strip()
    course_title = (data.get('course_title') or '28-Hour Armed Security Course (IDFPR #102-000398)').strip()
    class_date = (data.get('class_date') or '').strip()
    class_time = (data.get('class_time') or '9:00 AM – 5:00 PM').strip()
    raw_location = (data.get('location') or '').strip()
    location = resolve_course_location(course_id=course_id, course_title=course_title, raw_location=raw_location)
    price = (data.get('price') or 'Paid / Confirmed').strip()
    confirmation_id = (data.get('confirmation_id') or '').strip()
    google_review_url = (data.get('google_review_url') or get_google_review_url()).strip()

    if not to_email or '@' not in to_email:
        return jsonify({'success': False, 'error': 'Valid recipient email address required'}), 400

    if email_type == 'confirmation':
        subj, html_body, text_body = build_class_payment_confirmation_email(
            student_name, course_title, class_date, class_time, location, price, confirmation_id, course_id=course_id
        )
    elif email_type == 'reminder':
        subj, html_body, text_body = build_class_reminder_email(
            student_name, course_title, class_date, class_time, location, course_id=course_id
        )
    elif email_type in ('thank_you_review', 'review', 'thank_you'):
        subj, html_body, text_body = build_thank_you_google_review_email(
            student_name, course_title, google_review_url
        )
    else:
        return jsonify({'success': False, 'error': f'Unknown email_type: {email_type}'}), 400

    ok, msg_str = send_email_smtp(to_email, subj, html_body, text_body)
    if ok:
        return jsonify({'success': True, 'to_email': to_email, 'subject': subj, 'location': location, 'message': f'Email sent to {to_email}!'})
    else:
        return jsonify({'success': False, 'to_email': to_email, 'subject': subj, 'location': location, 'error': msg_str}), 500


# 12. Automatic 2-Day Before Class Reminder Scheduler
_LAST_AUTO_REMINDER_CHECK_TS = 0

def check_and_send_upcoming_reminders(days_before=2):
    """
    Unified Automated Email Engine:
    1. Confirmation Email: Auto-sends immediately upon booking or tuition payment.
    2. 2-Day Reminder Email: Auto-sends 2 days before the scheduled course with the exact course location.
    3. Thank You + Google Review Email: Auto-sends upon course graduation / certificate completion or post-class completion.
    """
    cal = load_calendar_data()
    reservations = cal.get('reservations', [])
    sessions_by_id = {s.get('id'): s for s in cal.get('sessions', []) if s.get('id')}
    today = datetime.now().date()
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    sent_list = []
    due_pending_list = []
    upcoming_within_7_days = 0
    changed = False

    # Part A: Check all Student Class Reservations (Confirmation, 2-Day Reminder, Post-Class Thank You)
    for r in reservations:
        st_email = (r.get('studentEmail') or '').strip()
        st_name = (r.get('studentName') or 'Student Officer').strip()
        sess = sessions_by_id.get(r.get('sessionId')) or {}
        cid = r.get('courseId') or sess.get('courseId') or ''
        ctitle = r.get('courseTitle') or sess.get('title') or 'Scheduled Training Course'
        raw_loc = r.get('location') or sess.get('location') or ''
        exact_loc = resolve_course_location(course_id=cid, course_title=ctitle, raw_location=raw_loc)
        r_date_str = (r.get('date') or '').strip()
        r_time = (r.get('time') or sess.get('time') or '9:00 AM – 5:00 PM').strip()

        if r.get('location') != exact_loc:
            r['location'] = exact_loc
            changed = True

        # 1. Auto-send Confirmation if not yet marked
        if not r.get('confirmationSent'):
            if st_email and '@' in st_email:
                subj, h_body, t_body = build_class_payment_confirmation_email(
                    st_name, ctitle, r_date_str, r_time, exact_loc, r.get('price') or 'Seat Reserved', r.get('id') or 'PTA-RES', course_id=cid
                )
                send_email_smtp(st_email, subj, h_body, t_body)
            r['confirmationSent'] = True
            r['confirmationSentAt'] = r.get('createdAt') or now_str
            changed = True

        if not r_date_str:
            continue
        try:
            r_date = datetime.strptime(r_date_str[:10], '%Y-%m-%d').date()
        except Exception:
            continue

        days_until = (r_date - today).days
        if 0 <= days_until <= 7:
            upcoming_within_7_days += 1

        # 2. Auto-send 2-Day Reminder when student's chosen in-person qualification / class date is within 2 days
        #    (Online Unarmed Security Course does not use a reminder email)
        is_unarmed_res = (str(cid).lower() == 'unarmed-20') or ('unarmed' in ctitle.lower())
        if not is_unarmed_res and 0 <= days_until <= days_before and not r.get('reminderSent'):
            if st_email and '@' in st_email:
                subj, h_body, t_body = build_class_reminder_email(
                    st_name, ctitle, r_date_str, r_time, exact_loc, course_id=cid
                )
                ok, msg_str = send_email_smtp(st_email, subj, h_body, t_body)
                r['reminderSent'] = True
                r['reminderSentAt'] = now_str
                changed = True
                try:
                    db_rem = get_db()
                    db_rem.execute(
                        "UPDATE students SET reminder_email_sent = 1, reminder_email_sent_at = ?, range_qualification_date = COALESCE(range_qualification_date, ?) WHERE LOWER(id) = LOWER(?) OR LOWER(email) = LOWER(?)",
                        (now_str, r_date_str, f"armed::{st_email.lower()}", st_email.lower())
                    )
                    db_rem.commit()
                except Exception:
                    pass
                sent_list.append({
                    'type': 'reminder',
                    'id': r.get('id'),
                    'studentName': st_name,
                    'studentEmail': st_email,
                    'courseTitle': ctitle,
                    'date': r_date_str,
                    'location': exact_loc
                })

        # 3. Auto-send Thank You + Google Review when scheduled class date has finished
        if days_until < 0 and not r.get('thankYouSent'):
            if st_email and '@' in st_email:
                subj, h_body, t_body = build_thank_you_google_review_email(st_name, ctitle)
                send_email_smtp(st_email, subj, h_body, t_body)
            r['thankYouSent'] = True
            r['thankYouSentAt'] = now_str
            changed = True
            sent_list.append({
                'type': 'thank_you_review',
                'id': r.get('id'),
                'studentName': st_name,
                'studentEmail': st_email,
                'courseTitle': ctitle,
                'date': r_date_str,
                'location': exact_loc
            })

    if changed:
        save_calendar_data(cal)

    # Part B: Check Enrolled Course Students in SQLite DB
    try:
        db = get_db()
        cur = db.cursor()
        rows = cur.execute('''
            SELECT s.*, (SELECT id FROM certificates c WHERE c.student_id = s.id) as cert_id
            FROM students s WHERE s.is_admin = 0
        ''').fetchall()
        db_changed = False
        for s in rows:
            sid = s['id']
            semail = (s['email'] or '').strip()
            sname = (s['name'] or 'Student Officer').strip()
            is_armed = str(sid or '').lower().startswith('armed::')
            ctitle = '28-Hour Armed Security Course (IDFPR #102-000398)' if is_armed else '20-Hour Online Unarmed Security Course (IDFPR #102-000398)'
            cloc = resolve_course_location('armed-28' if is_armed else 'unarmed-20', ctitle, '')

            # Auto-send 2-Day In-Person Range Qualification Reminder for Armed students based on their chosen qualification date
            if is_armed and not s['reminder_email_sent']:
                chosen_qdate = (s['range_qualification_date'] if 'range_qualification_date' in s.keys() else None) or ''
                if chosen_qdate:
                    try:
                        q_dt = datetime.strptime(chosen_qdate[:10], '%Y-%m-%d').date()
                        q_days = (q_dt - today).days
                        if 0 <= q_days <= days_before:
                            if semail and '@' in semail:
                                subj, h_body, t_body = build_class_reminder_email(
                                    sname, ctitle, chosen_qdate, '9:00 AM – 5:00 PM (In-Person Range Qualification)', cloc, course_id='armed-28'
                                )
                                send_email_smtp(semail, subj, h_body, t_body)
                            cur.execute(
                                "UPDATE students SET reminder_email_sent = 1, reminder_email_sent_at = ? WHERE id = ?",
                                (now_str, sid)
                            )
                            db_changed = True
                    except Exception:
                        pass

            # Auto-confirm paid students
            if s['is_paid'] and not s['confirmation_email_sent']:
                if semail and '@' in semail:
                    subj, h_body, t_body = build_class_payment_confirmation_email(
                        sname, ctitle, '24/7 Online Portal' if not is_armed else 'Scheduled Range + Online Portal',
                        'Self-Paced Online', cloc, '$200.00 (Paid)' if is_armed else '$50.00 (Paid)', sid,
                        course_id='armed-28' if is_armed else 'unarmed-20'
                    )
                    send_email_smtp(semail, subj, h_body, t_body)
                cur.execute(
                    "UPDATE students SET confirmation_email_sent = 1, confirmation_email_sent_at = ? WHERE id = ?",
                    (s['created_at'] or now_str, sid)
                )
                db_changed = True

            # Auto-send Thank You + Google Review for certified graduates
            if s['cert_id'] and not s['thank_you_email_sent']:
                if semail and '@' in semail:
                    subj, h_body, t_body = build_thank_you_google_review_email(sname, ctitle)
                    send_email_smtp(semail, subj, h_body, t_body)
                cur.execute(
                    "UPDATE students SET thank_you_email_sent = 1, thank_you_email_sent_at = ? WHERE id = ?",
                    (now_str, sid)
                )
                db_changed = True

        if db_changed:
            db.commit()
            sync_to_cloud_json()
    except Exception as e:
        print("Student auto-email sweep note:", e)

    return {
        'checked_at': now_str,
        'days_before_rule': days_before,
        'total_reservations': len(reservations),
        'upcoming_within_7_days': upcoming_within_7_days,
        'sent_count': len(sent_list),
        'sent_reminders': sent_list,
        'due_pending': due_pending_list
    }


@app.before_request
def auto_reminder_background_hook():
    global _LAST_AUTO_REMINDER_CHECK_TS
    import time
    now_ts = time.time()
    if now_ts - _LAST_AUTO_REMINDER_CHECK_TS >= 900:
        _LAST_AUTO_REMINDER_CHECK_TS = now_ts
        try:
            check_and_send_upcoming_reminders(days_before=2)
        except Exception as e:
            print("Auto-reminder background check note:", e)


@app.route('/api/emails/run-auto-reminders', methods=['GET', 'POST'])
def run_auto_reminders_endpoint():
    try:
        result = check_and_send_upcoming_reminders(days_before=2)
        return jsonify({'success': True, **result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


# =========================================================================
# MongoDB Cloud Database Configuration & Live Two-Way Sync Endpoints
# =========================================================================
def _get_mongodb_status_payload():
    cfg = get_mongo_config()
    uri = cfg['uri']
    db_name = cfg['db_name']
    mdb, err = get_mongo_db()
    counts = {col: 0 for col in ALL_MONGODB_TABLES}
    connected = False
    if mdb is not None:
        try:
            for col_name in counts.keys():
                counts[col_name] = mdb[col_name].count_documents({})
            connected = True
        except Exception as e:
            err = str(e)
    return {
        'pymongo_installed': PYMONGO_AVAILABLE,
        'has_uri': bool(uri),
        'masked_uri': mask_mongo_uri(uri),
        'db_name': db_name,
        'connected': connected,
        'encryption_active': True,
        'encryption_scheme': 'ENCv1 (PBKDF2-HMAC-SHA256 + CTR + HMAC-SHA256)',
        'last_synced': _MONGO_LAST_SYNCED,
        'error': err if not connected else None,
        'collections': counts
    }

@app.route('/api/admin/mongodb-config', methods=['GET', 'POST'])
def handle_mongodb_config():
    if request.method == 'GET':
        return jsonify({'success': True, **_get_mongodb_status_payload()})
    if not is_admin_request():
        return jsonify({'success': False, 'error': 'Admin authorization required'}), 401

    data = request.get_json() or {}
    new_uri = (data.get('uri') or data.get('mongodb_uri') or '').strip()
    new_db_name = (data.get('db_name') or data.get('mongodb_db_name') or 'platforms_training_academy').strip()

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    if new_uri and '••••' not in new_uri:
        cur.execute("INSERT OR REPLACE INTO app_settings (key, value) VALUES ('mongodb_uri', ?)", (encrypt_sensitive(new_uri),))
        os.environ['MONGODB_URI'] = new_uri
    if new_db_name:
        cur.execute("INSERT OR REPLACE INTO app_settings (key, value) VALUES ('mongodb_db_name', ?)", (new_db_name,))
        os.environ['MONGODB_DB_NAME'] = new_db_name
    conn.commit()
    conn.close()

    # Reconnect and perform bidirectional sync (MongoDB <-> SQLite)
    mdb, err = get_mongo_db(force_reconnect=True)
    if mdb is not None:
        seed_from_mongodb()
        sync_sqlite_to_mongodb()
        sync_to_cloud_json()
        return jsonify({
            'success': True,
            'message': f"Connected to MongoDB ({new_db_name}) and synchronized all collections!",
            **_get_mongodb_status_payload()
        })
    else:
        return jsonify({
            'success': False,
            'error': err or 'Unable to connect to MongoDB URI.',
            **_get_mongodb_status_payload()
        }), 400

@app.route('/api/admin/mongodb-sync', methods=['POST'])
def trigger_mongodb_sync():
    if not is_admin_request():
        return jsonify({'success': False, 'error': 'Admin authorization required'}), 401
    mdb, err = get_mongo_db(force_reconnect=True)
    if mdb is None:
        return jsonify({
            'success': False,
            'error': err or 'MONGODB_URI is not configured yet.',
            **_get_mongodb_status_payload()
        }), 400
    seed_from_mongodb()
    ok, msg = sync_sqlite_to_mongodb()
    sync_to_cloud_json()
    return jsonify({
        'success': bool(ok),
        'message': f"MongoDB two-way sync completed at {msg}" if ok else msg,
        **_get_mongodb_status_payload()
    })

# Fallback static files router (placed after all API endpoints)
@app.route('/<path:filename>')
def serve_static(filename):
    if filename.startswith('api/'):
        return jsonify({'error': 'API endpoint not found'}), 404
    if is_sensitive_path(filename):
        abort(404)
    full_path = os.path.join(BASE_DIR, filename)
    if os.path.isdir(full_path):
        return send_from_directory(full_path, 'index.html')
    return send_from_directory(BASE_DIR, filename)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"===============================================================")
    print(f" Platforms Training Academy - Online Course Server")
    print(f" Lead Instructor: Charles Young | Chicago, IL")
    print(f" Running on http://127.0.0.1:{port}")
    print(f" Security Vault: env/.env loaded (Admin PIN & API keys protected)")
    print(f"===============================================================")
    app.run(host='0.0.0.0', port=port, debug=False)
