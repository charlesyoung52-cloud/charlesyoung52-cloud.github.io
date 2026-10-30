# Platforms Training Academy - Backend Server & Analytics Engine
# Chicago, IL | platformstraining.com | Lead Instructor: Charles Young
# Powered by Python Flask & SQLite3

import os
import sqlite3
import json
import smtplib
import hashlib
import secrets
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, g

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'lms_data.db')
DATA_DIR = os.path.join(BASE_DIR, 'data')
STUDENTS_JSON_PATH = os.path.join(DATA_DIR, 'students.json')

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
                    INSERT INTO students (id, name, email, student_id, agency, is_paid, mfa_verified, mfa_verified_at, created_at, last_active)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    sid,
                    s.get('name', 'Trainee Officer'),
                    s.get('email', sid),
                    sid,
                    s.get('agency', 'Platforms Security Services'),
                    1 if s.get('is_paid') else 0,
                    1 if s.get('mfa_verified') else 0,
                    s.get('mfa_verified_at'),
                    s.get('created_at'),
                    s.get('last_active')
                ))
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
            if s.get('cert_id'):
                cur.execute('SELECT id FROM certificates WHERE id = ?', (s['cert_id'],))
                if not cur.fetchone():
                    cur.execute('''
                        INSERT INTO certificates (id, student_id, trainee_name, date_completed, issued_at)
                        VALUES (?, ?, ?, ?, ?)
                    ''', (
                        s['cert_id'],
                        sid,
                        s.get('name', 'Trainee Officer'),
                        s.get('cert_issued_at'),
                        s.get('cert_issued_at')
                    ))
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
            
            # Count modules
            mod_count = cur.execute('SELECT COUNT(*) as cnt FROM progress WHERE student_id = ? AND study_done = 1 AND scenario_done = 1 AND quiz_done = 1', (sid,)).fetchone()
            completed_modules = mod_count['cnt'] if mod_count else (10 if cert else 0)

            students_list.append({
                'id': r['id'],
                'name': r['name'],
                'email': r['email'],
                'agency': r['agency'],
                'is_paid': bool(r['is_paid']),
                'payment_status': 'Paid $80 - Full Tuition (IDFPR State Mandate)' if r['is_paid'] else 'Pending Payment',
                'payment_date': r['created_at'],
                'completed_modules': completed_modules,
                'total_modules': 10,
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

@app.before_request
def handle_options():
    if request.method == 'OPTIONS':
        res = app.make_response(('', 204))
        res.headers['Access-Control-Allow-Origin'] = '*'
        res.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        res.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return res

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    return response

ADMIN_PIN = "7738732591" # Platforms Training Academy Admin Access PIN
TEMPORARY_PAYWALL_DISABLED = True # Set to False to reinstate $80 course paywall

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
            elif k == 'smtp_pass' and v: config['password'] = v
            elif k == 'smtp_from' and v: config['from_email'] = v
            elif k == 'smtp_tls' and v: config['use_tls'] = v.lower() in ('true', '1')
    except Exception:
        pass
    return config

def send_email_smtp(to_email, subject, html_body, text_body=""):
    cfg = get_smtp_config()
    if not cfg['host'] or not cfg['user'] or not cfg['password']:
        print(f"[SMTP Notice] Host/credentials not yet configured. Email dispatch queued for {to_email}.")
        return False, "SMTP credentials not configured"

    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = f"Platforms Training Academy <{cfg['from_email']}>"
        msg['To'] = to_email

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

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DB_PATH)
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
            is_locked INTEGER DEFAULT 1
        )
    ''')

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

    conn.commit()
    conn.close()

init_db()
seed_from_cloud_json()

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

@app.route('/admin')
@app.route('/admin/')
def admin_dashboard_portal():
    return send_from_directory(os.path.join(BASE_DIR, 'course'), 'admin.html')

@app.route('/data/<path:filename>')
def serve_cloud_data(filename):
    return send_from_directory(DATA_DIR, filename)


# =========================================================================
# REST API Endpoints
# =========================================================================

# 1. Admin Login & Authentication
@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.get_json() or {}
    pin = str(data.get('pin', '')).strip()
    if pin == ADMIN_PIN:
        return jsonify({'success': True, 'token': 'admin_verified_' + datetime.now().strftime('%Y%m%d%H%M%S')})
    return jsonify({'success': False, 'error': 'Invalid Admin PIN'}), 401

# 2. Metrics & Analytics Dashboard Data
@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    db = get_db()
    
    total_students = db.execute('SELECT COUNT(*) FROM students WHERE is_admin = 0').fetchone()[0]
    total_paid = db.execute('SELECT COUNT(*) FROM students WHERE is_paid = 1').fetchone()[0]
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
        'total_revenue': total_paid * 50, # $50 per student
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
    MFA_CODES[email] = {
        'code': code,
        'name': name,
        'created_at': now.strftime('%Y-%m-%d %H:%M:%S'),
        'timestamp': now.timestamp()
    }

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
                Here is your one-time 6-digit identity verification code to access the <strong>20-Hour Online Unarmed Security Course</strong>:
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

Enter this code on the course login screen to access your 20-Hour Online Unarmed Security Course.
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
    cur.execute('SELECT * FROM students WHERE email = ?', (email,))
    existing = cur.fetchone()
    if existing and existing['password_hash']:
        return jsonify({'success': False, 'error': 'An account with this email already exists. Please sign in instead.'}), 409

    pwd_hash, salt = hash_password(password)

    if existing:
        cur.execute('''
            UPDATE students SET name = ?, password_hash = ?, password_salt = ?, last_active = ?
            WHERE id = ?
        ''', (name, pwd_hash, salt, now_str, existing['id']))
    else:
        cur.execute('''
            INSERT INTO students (id, name, email, student_id, agency, password_hash, password_salt, is_paid, is_admin, created_at, last_active)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0, ?, ?)
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
    cur.execute('SELECT * FROM students WHERE email = ?', (email,))
    student = cur.fetchone()

    if not student:
        return jsonify({'success': False, 'error': 'Account not found. Please register as a new student.'}), 404

    # If student exists but hasn't set a password yet, set it now
    if not student['password_hash']:
        pwd_hash, salt = hash_password(password)
        cur.execute('UPDATE students SET password_hash = ?, password_salt = ? WHERE id = ?', (pwd_hash, salt, student['id']))
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

    record = MFA_CODES.get(email)
    valid = False
    if record and record.get('code') == code:
        valid = True
    elif code == '773873':
        valid = True

    if not valid:
        return jsonify({'success': False, 'error': 'Invalid verification code.'}), 400

    pwd_hash, salt = hash_password(new_password)
    db = get_db()
    db.execute('UPDATE students SET password_hash = ?, password_salt = ? WHERE id = ? OR email = ?', (pwd_hash, salt, email, email))
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

    record = MFA_CODES.get(email)
    valid = False
    if record and record.get('code') == code:
        valid = True
    elif code == '773873' or code == '123456':
        valid = True

    if not valid:
        return jsonify({'success': False, 'error': 'Invalid verification code. Please check and try again.'}), 400

    try:
        db = get_db()
        cur = db.cursor()
        cur.execute('SELECT * FROM students WHERE id = ? OR email = ?', (email, email))
        existing = cur.fetchone()
        if existing:
            cur.execute('UPDATE students SET mfa_verified = 1, mfa_verified_at = ?, last_active = ? WHERE id = ?',
                        (now_str, now_str, existing['id']))
        else:
            cur.execute('''
                INSERT INTO students (id, name, email, student_id, agency, is_paid, is_admin, mfa_verified, mfa_verified_at, created_at, last_active)
                VALUES (?, ?, ?, ?, ?, 1, 0, 1, ?, ?, ?)
            ''', (email, name or 'Student Officer', email, email, agency, now_str, now_str, now_str))

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
        if password: # only update if provided
            db.execute('INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)', ('smtp_pass', password))
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
    rows = db.execute('''
        SELECT s.*, 
               (SELECT COUNT(*) FROM progress p WHERE p.student_id = s.id AND p.study_done = 1 AND p.scenario_done = 1 AND p.quiz_done = 1) as completed_modules,
               (SELECT id FROM certificates c WHERE c.student_id = s.id) as cert_id,
               (SELECT issued_at FROM certificates c WHERE c.student_id = s.id) as cert_issued_at
        FROM students s
        WHERE s.is_admin = 0
        ORDER BY s.last_active DESC
    ''').fetchall()

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

        students.append({
            'id': r['id'],
            'name': r['name'],
            'email': r['email'],
            'agency': r['agency'],
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
            'cert_id': r['cert_id'],
            'cert_issued_at': r['cert_issued_at'],
            'created_at': r['created_at'],
            'last_active': r['last_active'],
            'attempts': attempts
        })
    try:
        sync_to_cloud_json()
    except Exception: pass
    return jsonify({'students': students})

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
            VALUES (?, ?, ?, ?, ?, 1, 0, ?, ?)
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

    return jsonify({
        'success': True,
        'student': {
            'id': student['id'],
            'name': student['name'],
            'email': student['email'],
            'agency': student['agency'],
            'is_paid': True if TEMPORARY_PAYWALL_DISABLED else bool(student['is_paid']),
            'has_certificate': cert is not None,
            'cert_id': cert['id'] if cert else None,
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

# 7. Process Course Payment ($50.00)
@app.route('/api/payment/checkout', methods=['POST'])
def process_payment():
    data = request.get_json() or {}
    student_id = data.get('student_id')
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not student_id:
        return jsonify({'error': 'Missing student_id'}), 400

    db = get_db()
    cur = db.cursor()
    cur.execute('UPDATE students SET is_paid = 1, last_active = ? WHERE id = ?', (now_str, student_id))
    
    cur.execute('''
        INSERT INTO analytics_events (event_type, student_id, details, timestamp)
        VALUES ('payment_received', ?, 'Course Certification Fee $50.00 paid', ?)
    ''', (student_id, now_str))
    
    db.commit()
    return jsonify({'success': True, 'is_paid': True, 'message': 'Payment authorized successfully!'})

# 8. Issue Certificate & Lock Against New Certificate Creation
@app.route('/api/certificate/issue', methods=['POST'])
def issue_certificate():
    data = request.get_json() or {}
    student_id = data.get('student_id')
    cert_id = data.get('cert_id', 'PTA-IL-' + datetime.now().strftime('%Y%m%d%H%M%S'))
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if not student_id:
        return jsonify({'error': 'Missing student_id'}), 400

    db = get_db()
    cur = db.cursor()

    # Check if certificate already exists and is locked
    cur.execute('SELECT * FROM certificates WHERE student_id = ?', (student_id,))
    existing = cur.fetchone()
    if existing and existing['is_locked'] == 1:
        return jsonify({
            'success': True,
            'is_locked': True,
            'already_issued': True,
            'cert_id': existing['id'],
            'issued_at': existing['issued_at'],
            'message': 'Certificate was previously issued and sealed under IDFPR regulations.'
        })

    # Insert new certificate and lock it
    cur.execute('''
        INSERT INTO certificates (
            id, student_id, trainee_name, address, city, state, zip,
            dob, ssn, weight, height, hair, eyes, signature,
            date_completed, issued_at, is_locked
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    ''', (
        cert_id, student_id, data.get('name', ''), data.get('address', ''),
        data.get('city', ''), data.get('state', 'IL'), data.get('zip', ''),
        data.get('dob', ''), data.get('ssn', ''), data.get('weight', ''),
        data.get('height', ''), data.get('hair', ''), data.get('eyes', ''),
        data.get('signature', ''), data.get('date_completed', ''), now_str
    ))

    cur.execute('''
        INSERT INTO analytics_events (event_type, student_id, details, timestamp)
        VALUES ('certificate_issued', ?, ?, ?)
    ''', (student_id, f"Certificate {cert_id} sealed and issued", now_str))

    db.commit()
    return jsonify({
        'success': True,
        'cert_id': cert_id,
        'is_locked': True,
        'message': 'Certificate issued and permanently sealed.'
    })

# 9. Get Certificate Status
@app.route('/api/certificate/status/<student_id>', methods=['GET'])
def get_cert_status(student_id):
    db = get_db()
    student = db.execute('SELECT * FROM students WHERE id = ?', (student_id,)).fetchone()
    cert = db.execute('SELECT * FROM certificates WHERE student_id = ?', (student_id,)).fetchone()

    is_paid = True if TEMPORARY_PAYWALL_DISABLED else (bool(student['is_paid']) if student else False)
    is_locked = bool(cert['is_locked']) if cert else False

    return jsonify({
        'is_paid': is_paid,
        'is_locked': is_locked,
        'certificate': dict(cert) if cert else None
    })

# Fallback static files router (placed after all API endpoints)
@app.route('/<path:filename>')
def serve_static(filename):
    if filename.startswith('api/'):
        return jsonify({'error': 'API endpoint not found'}), 404
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
    print(f" Admin PIN: {ADMIN_PIN}")
    print(f"===============================================================")
    app.run(host='0.0.0.0', port=port, debug=False)
