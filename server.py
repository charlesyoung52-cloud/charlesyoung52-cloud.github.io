# Platforms Training Academy - Backend Server & Analytics Engine
# Chicago, IL | platformstraining.com | Lead Instructor: Charles Young
# Powered by Python Flask & SQLite3

import os
import sqlite3
import json
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory, g

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'lms_data.db')

app = Flask(__name__, static_folder=BASE_DIR, static_url_path='')

ADMIN_PIN = "7738732591" # Platforms Training Academy Admin Access PIN

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

    # Exam Results Table
    cur.execute('''
        CREATE TABLE IF NOT EXISTS exam_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id TEXT NOT NULL,
            score INTEGER NOT NULL,
            total_questions INTEGER NOT NULL,
            percentage INTEGER NOT NULL,
            passed INTEGER NOT NULL,
            time_taken_seconds INTEGER DEFAULT 0,
            answers_json TEXT,
            completed_at TEXT
        )
    ''')

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

    conn.commit()
    conn.close()

init_db()

# =========================================================================
# Static File Routes
# =========================================================================
@app.route('/')
def index():
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(BASE_DIR, filename)

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

# 3. List All Students (for Admin Dashboard)
@app.route('/api/students', methods=['GET'])
def list_students():
    db = get_db()
    rows = db.execute('''
        SELECT s.*, 
               (SELECT COUNT(*) FROM progress p WHERE p.student_id = s.id AND p.study_done = 1 AND p.scenario_done = 1 AND p.quiz_done = 1) as completed_modules,
               (SELECT MAX(percentage) FROM exam_results e WHERE e.student_id = s.id) as best_score,
               (SELECT id FROM certificates c WHERE c.student_id = s.id) as cert_id
        FROM students s
        ORDER BY s.last_active DESC
    ''').fetchall()

    students = []
    for r in rows:
        students.append({
            'id': r['id'],
            'name': r['name'],
            'email': r['email'],
            'agency': r['agency'],
            'is_paid': bool(r['is_paid']),
            'completed_modules': r['completed_modules'],
            'best_score': r['best_score'],
            'cert_id': r['cert_id'],
            'last_active': r['last_active']
        })
    return jsonify({'students': students})

# 4. Student Register / Login
@app.route('/api/students/login', methods=['POST'])
def student_login():
    data = request.get_json() or {}
    name = data.get('name', 'Student Officer').strip()
    email = data.get('email', '').strip().lower()
    student_id = data.get('student_id', email or name).strip()
    agency = data.get('agency', '').strip()
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT * FROM students WHERE id = ?', (student_id,))
    existing = cur.fetchone()

    if existing:
        cur.execute('UPDATE students SET name = ?, agency = ?, last_active = ? WHERE id = ?',
                    (name, agency, now_str, student_id))
    else:
        cur.execute('''
            INSERT INTO students (id, name, email, student_id, agency, is_paid, is_admin, created_at, last_active)
            VALUES (?, ?, ?, ?, ?, 0, 0, ?, ?)
        ''', (student_id, name, email, student_id, agency, now_str, now_str))

    db.commit()
    
    # Fetch updated record
    student = db.execute('SELECT * FROM students WHERE id = ?', (student_id,)).fetchone()
    cert = db.execute('SELECT * FROM certificates WHERE student_id = ?', (student_id,)).fetchone()

    return jsonify({
        'success': True,
        'student': {
            'id': student['id'],
            'name': student['name'],
            'email': student['email'],
            'agency': student['agency'],
            'is_paid': bool(student['is_paid']),
            'has_certificate': cert is not None,
            'cert_id': cert['id'] if cert else None
        }
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

# 6. Submit Final Exam
@app.route('/api/exam/submit', methods=['POST'])
def submit_exam():
    data = request.get_json() or {}
    student_id = data.get('student_id', 'anonymous')
    score = int(data.get('score', 0))
    total = int(data.get('total', 50))
    percentage = int(data.get('percentage', 0))
    passed = 1 if data.get('passed') else 0
    time_taken = int(data.get('time_taken_seconds', 0))
    answers_json = json.dumps(data.get('answers', {}))
    now_str = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    db = get_db()
    cur = db.cursor()
    cur.execute('''
        INSERT INTO exam_results (student_id, score, total_questions, percentage, passed, time_taken_seconds, answers_json, completed_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (student_id, score, total, percentage, passed, time_taken, answers_json, now_str))
    
    cur.execute('UPDATE students SET last_active = ? WHERE id = ?', (now_str, student_id))
    db.commit()

    return jsonify({'success': True, 'exam_id': cur.lastrowid})

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

    is_paid = bool(student['is_paid']) if student else False
    is_locked = bool(cert['is_locked']) if cert else False

    return jsonify({
        'is_paid': is_paid,
        'is_locked': is_locked,
        'certificate': dict(cert) if cert else None
    })

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"===============================================================")
    print(f" Platforms Training Academy - Online Course Server")
    print(f" Lead Instructor: Charles Young | Chicago, IL")
    print(f" Running on http://127.0.0.1:{port}")
    print(f" Admin PIN: {ADMIN_PIN}")
    print(f"===============================================================")
    app.run(host='0.0.0.0', port=port, debug=False)
