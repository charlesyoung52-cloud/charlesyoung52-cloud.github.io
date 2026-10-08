// Platforms Training Academy - Interactive Online Unarmed Security Course
// Application Controller & State Engine (Coursera-Inspired Interactive LMS)
// Chicago, IL | platformstraining.com | Lead Instructor: Charles Young

class SecurityCourseApp {
    constructor() {
        this.currentView = 'overview';
        this.currentLessonId = 1;
        this.currentLessonTab = 'study'; // 'study', 'scenario', 'quiz'
        this.currentQuestionIdx = 0;
        this.activeTopicFilter = 'all';
        this.userAnswers = {};
        this.flaggedQuestions = new Set();
        this.examCompleted = false;
        this.examScore = 0;
        this.examPercentage = 0;
        this.examPassed = false;
        this.timerSeconds = 0;
        this.timerInterval = null;
        this.isSpeaking = false;
        this.studentEmail = localStorage.getItem('platforms_student_email') || 'student@platformstraining.com';
        this.studentAgency = localStorage.getItem('platforms_student_agency') || 'Platforms Security Services';
        this.lastSavedTimestamp = localStorage.getItem('platforms_last_saved') || null;
        this.currentNarratingLessonId = null;
        
        // Progression state per lesson: { [lessonId]: { study: bool, scenario: bool, quiz: bool } }
        this.moduleSections = {};
        this.colAnswers = {}; // { [lessonId]: { [qIdx]: bool } }

        // Trainee certificate form data
        this.studentCertData = {
            name: 'DOE, JOHN A.',
            address: '1234 S. Michigan Ave, Apt 4B',
            city: 'Chicago',
            state: 'IL',
            zip: '60616',
            dob: '05/14/1995',
            ssn: 'XXX-XX-1234',
            weight: '185 lbs',
            height: "5' 11\"",
            hair: 'Black',
            eyes: 'Brown',
            signature: 'John A. Doe'
        };

        this.init();
    }

    init() {
        this.restoreState();
        this.bindEvents();
        this.bindCertFormEvents();
        this.renderLessonsSidebar();
        this.renderOverviewGrid();
        this.renderTopicFilterBar();
        this.renderQuestionPalette();
        this.showView('overview');
        this.updateGlobalProgress();
        this.updateTodayDates();
        this.updateHeaderProfileDisplay();
    }

    // =========================================================================
    // LocalStorage State Management
    // =========================================================================
    saveState() {
        const state = {
            currentLessonId: this.currentLessonId,
            currentLessonTab: this.currentLessonTab,
            currentQuestionIdx: this.currentQuestionIdx,
            userAnswers: this.userAnswers,
            flaggedQuestions: Array.from(this.flaggedQuestions),
            examCompleted: this.examCompleted,
            examScore: this.examScore,
            examPercentage: this.examPercentage,
            examPassed: this.examPassed,
            timerSeconds: this.timerSeconds,
            moduleSections: this.moduleSections,
            colAnswers: this.colAnswers,
            studentCertData: this.studentCertData,
            studentEmail: this.studentEmail,
            studentAgency: this.studentAgency,
            lastSavedTimestamp: this.lastSavedTimestamp
        };
        localStorage.setItem('platforms_unarmed_course_state_v3', JSON.stringify(state));
    }

    restoreState() {
        const saved = localStorage.getItem('platforms_unarmed_course_state_v3');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                this.currentLessonId = state.currentLessonId || 1;
                this.currentLessonTab = state.currentLessonTab || 'study';
                this.currentQuestionIdx = state.currentQuestionIdx || 0;
                this.userAnswers = state.userAnswers || {};
                this.flaggedQuestions = new Set(state.flaggedQuestions || []);
                this.examCompleted = state.examCompleted || false;
                this.examScore = state.examScore || 0;
                this.examPercentage = state.examPercentage || 0;
                this.examPassed = state.examPassed || false;
                this.timerSeconds = state.timerSeconds || 0;
                this.moduleSections = state.moduleSections || {};
                this.colAnswers = state.colAnswers || {};
                if (state.studentCertData) {
                    this.studentCertData = { ...this.studentCertData, ...state.studentCertData };
                }
                this.studentEmail = state.studentEmail || this.studentEmail;
                this.studentAgency = state.studentAgency || this.studentAgency;
                this.lastSavedTimestamp = state.lastSavedTimestamp || this.lastSavedTimestamp;
            } catch (e) {
                console.error("Error restoring course state:", e);
            }
        }
    }

    // =========================================================================
    // Progression & Requirement Helper Methods
    // =========================================================================
    getModuleState(lessonId) {
        if (!this.moduleSections[lessonId]) {
            this.moduleSections[lessonId] = { study: false, scenario: false, quiz: false };
        }
        return this.moduleSections[lessonId];
    }

    isStudyCompleted(lessonId) {
        return !!(this.moduleSections[lessonId] && this.moduleSections[lessonId].study);
    }

    isScenarioCompleted(lessonId) {
        return !!(this.moduleSections[lessonId] && this.moduleSections[lessonId].scenario);
    }

    isQuizPassed(lessonId) {
        if (this.moduleSections[lessonId] && this.moduleSections[lessonId].quiz) {
            return true;
        }
        const answers = this.colAnswers[lessonId];
        if (answers) {
            const correctCount = Object.values(answers).filter(Boolean).length;
            const lesson = LESSONS_DATA.find(l => l.id === lessonId);
            const totalQ = (lesson && lesson.checkOnLearning) ? lesson.checkOnLearning.length : 3;
            if (correctCount >= totalQ) {
                this.getModuleState(lessonId).quiz = true;
                return true;
            }
        }
        return false;
    }

    isLessonFullyCompleted(lessonId) {
        return this.isStudyCompleted(lessonId) && 
               this.isScenarioCompleted(lessonId) && 
               this.isQuizPassed(lessonId);
    }

    isLessonUnlocked(lessonId) {
        if (lessonId <= 1) return true;
        // Lesson N is unlocked only if Lesson N-1 is fully completed
        return this.isLessonFullyCompleted(lessonId - 1);
    }

    areAllLessonsCompleted() {
        return LESSONS_DATA.every(l => this.isLessonFullyCompleted(l.id));
    }

    getCompletedLessonsCount() {
        return LESSONS_DATA.filter(l => this.isLessonFullyCompleted(l.id)).length;
    }

    getEarliestIncompleteLesson() {
        const incomplete = LESSONS_DATA.find(l => !this.isLessonFullyCompleted(l.id));
        return incomplete ? incomplete.id : 1;
    }

    startOrResumeCourse() {
        const targetLesson = this.getEarliestIncompleteLesson();
        this.openLesson(targetLesson);
    }

    resumeEarliestIncompleteLesson() {
        const targetLesson = this.getEarliestIncompleteLesson();
        this.openLesson(targetLesson);
    }

    handleLockedLessonClick(lessonId) {
        const prereqLesson = lessonId - 1;
        alert(`🔒 MODULE ${lessonId} IS LOCKED\n\nIn accordance with IDFPR course requirements, you must complete all sections of Module ${prereqLesson} (Study Material, Tactical Scenario Simulator, and Check on Learning Quick Quiz) before unlocking Module ${lessonId}.`);
    }

    // =========================================================================
    // View Routing
    // =========================================================================
    showView(viewName) {
        this.stopSpeech();
        this.currentView = viewName;

        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) targetView.classList.add('active');

        const navBtn = document.querySelector(`.nav-btn[data-view="${viewName}"]`);
        if (navBtn) navBtn.classList.add('active');

        if (viewName === 'lesson') {
            const targetLesson = this.isLessonUnlocked(this.currentLessonId) 
                ? this.currentLessonId 
                : this.getEarliestIncompleteLesson();
            this.loadLesson(targetLesson, this.currentLessonTab);
        } else if (viewName === 'exam') {
            this.handleExamView();
        } else if (viewName === 'results') {
            this.renderResults();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.updateGlobalProgress();
        this.saveState();
    }

    handleExamView() {
        const lockedView = document.getElementById('exam-locked-view');
        const activeView = document.getElementById('exam-active-view');
        const allDone = this.areAllLessonsCompleted();

        if (!allDone) {
            // Exam Locked: Must complete all 10 modules
            if (lockedView) lockedView.style.display = 'block';
            if (activeView) activeView.style.display = 'none';

            const progressRatio = document.getElementById('exam-locked-progress-ratio');
            if (progressRatio) {
                progressRatio.textContent = `${this.getCompletedLessonsCount()} / ${LESSONS_DATA.length} Modules Completed`;
            }

            const statusGrid = document.getElementById('locked-modules-status-grid');
            if (statusGrid) {
                statusGrid.innerHTML = LESSONS_DATA.map(l => {
                    const isDone = this.isLessonFullyCompleted(l.id);
                    return `
                        <div class="locked-module-item ${isDone ? 'completed' : 'pending'}">
                            <span><strong>${l.number}:</strong> ${l.title}</span>
                            <span>${isDone ? '<i class="fas fa-check-circle"></i> Completed' : '<i class="fas fa-lock"></i> Incomplete'}</span>
                        </div>
                    `;
                }).join('');
            }
            this.stopExamTimer();
        } else {
            // Exam Unlocked
            if (lockedView) lockedView.style.display = 'none';
            if (activeView) activeView.style.display = 'block';
            this.startExamTimer();
            this.renderQuestion(this.currentQuestionIdx);
            this.renderQuestionPalette();
        }
    }

    // =========================================================================
    // Overview / Syllabus Rendering
    // =========================================================================
    renderOverviewGrid() {
        const grid = document.getElementById('overview-lessons-grid');
        if (!grid) return;

        grid.innerHTML = LESSONS_DATA.map(lesson => {
            const isUnlocked = this.isLessonUnlocked(lesson.id);
            const isCompleted = this.isLessonFullyCompleted(lesson.id);

            return `
                <div class="lesson-card ${!isUnlocked ? 'locked' : ''}" 
                     onclick="${isUnlocked ? `app.openLesson(${lesson.id})` : `app.handleLockedLessonClick(${lesson.id})`}">
                    <div class="lesson-card-header">
                        <span class="lesson-num">${lesson.number}</span>
                        <span class="lesson-time"><i class="fas fa-clock"></i> ${lesson.duration}</span>
                    </div>
                    <h3>${lesson.title}</h3>
                    <p>${lesson.summary}</p>
                    <div class="lesson-card-footer">
                        <span><i class="fas fa-book-reader"></i> 3-Part Module</span>
                        <span class="status-indicator">
                            ${!isUnlocked 
                                ? '<span class="lock-pill"><i class="fas fa-lock"></i> Locked</span>'
                                : (isCompleted 
                                    ? '<span style="color:var(--brand-green-bright); font-weight:700;"><i class="fas fa-check-double"></i> Mastered</span>' 
                                    : '<span style="color:#f59e0b; font-weight:600;"><i class="fas fa-spinner fa-spin"></i> In Progress</span>')}
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    }

    // =========================================================================
    // Lesson Study Viewer (Coursera-Inspired Tabs & Interactivity)
    // =========================================================================
    renderLessonsSidebar() {
        const list = document.getElementById('lesson-sidebar-list');
        if (!list) return;

        list.innerHTML = LESSONS_DATA.map(lesson => {
            const isUnlocked = this.isLessonUnlocked(lesson.id);
            const isCompleted = this.isLessonFullyCompleted(lesson.id);
            const isActive = lesson.id === this.currentLessonId;

            return `
                <li>
                    <button class="sidebar-item-btn ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''}" 
                            onclick="${isUnlocked ? `app.loadLesson(${lesson.id})` : `app.handleLockedLessonClick(${lesson.id})`}">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="item-tag">${lesson.number} &bull; ${lesson.duration}</span>
                            ${!isUnlocked 
                                ? '<i class="fas fa-lock" style="color:#eab308; font-size:0.75rem;" title="Locked"></i>'
                                : (isCompleted ? '<i class="fas fa-check-double" style="color:var(--brand-green); font-size:0.75rem;" title="Mastery Verified"></i>' : '')}
                        </div>
                        <span>${lesson.title}</span>
                    </button>
                </li>
            `;
        }).join('');
    }

    openLesson(lessonId) {
        if (!this.isLessonUnlocked(lessonId)) {
            this.handleLockedLessonClick(lessonId);
            return;
        }
        this.currentLessonId = lessonId;
        this.currentLessonTab = 'study';
        this.showView('lesson');
    }

    loadLesson(lessonId, tab = 'study') {
        if (!this.isLessonUnlocked(lessonId)) {
            this.handleLockedLessonClick(lessonId);
            lessonId = this.getEarliestIncompleteLesson();
        }

        this.stopSpeech();
        this.currentLessonId = lessonId;
        this.currentLessonTab = tab;
        const lesson = LESSONS_DATA.find(l => l.id === lessonId);
        if (!lesson) return;

        this.renderLessonsSidebar();
        this.renderModuleRequirementsBar(lessonId);

        document.getElementById('lesson-meta-badge').textContent = `${lesson.number} • ${lesson.duration}`;
        document.getElementById('lesson-title-display').textContent = lesson.title;

        // Render Tabs Content
        this.renderLessonTabs(lesson);
        this.switchLessonTab(tab);
        this.updateLessonNavFooter(lessonId);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderModuleRequirementsBar(lessonId) {
        const bar = document.getElementById('module-requirements-bar');
        if (!bar) return;

        const studyDone = this.isStudyCompleted(lessonId);
        const scenarioDone = this.isScenarioCompleted(lessonId);
        const quizDone = this.isQuizPassed(lessonId);
        const allDone = studyDone && scenarioDone && quizDone;

        bar.innerHTML = `
            <div class="req-chips-container">
                <span class="req-chip ${studyDone ? 'done' : 'pending'}">
                    <i class="fas ${studyDone ? 'fa-check-circle' : 'fa-circle'}"></i> 1. Study Material
                </span>
                <span class="req-chip ${scenarioDone ? 'done' : 'pending'}">
                    <i class="fas ${scenarioDone ? 'fa-check-circle' : 'fa-circle'}"></i> 2. Tactical Scenario
                </span>
                <span class="req-chip ${quizDone ? 'done' : 'pending'}">
                    <i class="fas ${quizDone ? 'fa-check-circle' : 'fa-circle'}"></i> 3. Check on Learning (3/3)
                </span>
            </div>
            <div class="req-status-msg ${allDone ? 'unlocked' : ''}">
                ${allDone 
                    ? '<i class="fas fa-check-double"></i> Module Complete — Next Module Unlocked!' 
                    : '<i class="fas fa-lock"></i> Complete all 3 sections to unlock Next Module'}
            </div>
        `;
    }

    renderLessonTabs(lesson) {
        // Tab 1: Comprehensive Study Material
        const studyPanel = document.getElementById('tab-study-content');
        if (studyPanel) {
            studyPanel.innerHTML = `
                ${lesson.content}
                <div class="takeaways-box" style="margin-top:36px;">
                    <h4><i class="fas fa-star" style="color:var(--brand-green);"></i> Key Takeaways & Exam Pointers</h4>
                    <ul>
                        ${lesson.takeaways.map(t => `<li>${t}</li>`).join('')}
                    </ul>
                </div>
                <div style="margin-top:36px; padding:20px; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-sm); text-align:center;">
                    <p style="color:var(--text-muted); margin-bottom:14px;">
                        Finished reviewing the statutory material? Confirm your study to proceed to the Tactical Scenario Simulator.
                    </p>
                    <button class="btn-primary" style="font-size:1rem; padding:12px 24px;" onclick="app.completeStudyAndGoToScenario()">
                        <i class="fas fa-check-circle"></i> Mark Study Reviewed & Go to Tactical Scenario Simulator <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
        }

        // Tab 2: Tactical Scenario Simulator
        const scenarioPanel = document.getElementById('tab-scenario-content');
        if (scenarioPanel && lesson.scenarioSimulation) {
            const sim = lesson.scenarioSimulation;
            const isCompleted = this.isScenarioCompleted(lesson.id);

            scenarioPanel.innerHTML = `
                <div class="scenario-sim-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <span class="scenario-badge"><i class="fas fa-shield-alt"></i> Interactive Tactical Scenario</span>
                        ${isCompleted ? '<span style="color:var(--brand-green-bright); font-size:0.85rem; font-weight:700;"><i class="fas fa-check-circle"></i> Scenario Completed</span>' : ''}
                    </div>
                    <h3 class="scenario-title">${sim.title}</h3>
                    
                    ${sim.illustration ? `
                        <div class="media-container" style="margin-bottom:20px;">
                            <img src="${sim.illustration}" alt="Scenario illustration" class="responsive-img">
                        </div>
                    ` : ''}

                    <div class="scenario-setup-box">
                        <strong><i class="fas fa-exclamation-triangle" style="color:var(--warning);"></i> SITUATION:</strong><br>
                        ${sim.setup}
                    </div>

                    <h4 class="scenario-decision-title"><i class="fas fa-question-circle"></i> DECISION POINT: ${sim.question}</h4>

                    <div class="scenario-options-grid">
                        ${sim.options.map((opt, oIdx) => `
                            <button class="scenario-option-btn" id="scenario-opt-${oIdx}" onclick="app.handleScenarioChoice(${lesson.id}, ${oIdx})">
                                <span style="font-weight:700; color:var(--brand-green-bright);">${String.fromCharCode(65 + oIdx)}.</span>
                                <span>${opt.text}</span>
                            </button>
                        `).join('')}
                    </div>

                    <div class="scenario-feedback-box" id="scenario-feedback"></div>
                </div>
            `;
        }

        // Tab 3: Check on Learning (Quick Quiz)
        const quizPanel = document.getElementById('tab-quiz-content');
        if (quizPanel && lesson.checkOnLearning) {
            const isQuizDone = this.isQuizPassed(lesson.id);

            quizPanel.innerHTML = `
                <div class="check-on-learning-panel">
                    <div class="col-header">
                        <h3><i class="fas fa-tasks" style="color:var(--brand-green);"></i> Check on Learning: Quick Quiz</h3>
                        <span class="col-mastery-badge" id="col-mastery-status" style="${isQuizDone ? 'color:var(--brand-green-bright);' : ''}">
                            ${isQuizDone ? '<i class="fas fa-check-double"></i> Section Passed (100%)' : 'Score 100% to Pass Section'}
                        </span>
                    </div>
                    <p style="color:var(--text-muted); margin-bottom:24px;">
                        Answer all 3 questions correctly. If you select an incorrect answer, you will be directed to review the exact statutory section in the study material before retrying.
                    </p>

                    <div id="col-questions-container">
                        ${lesson.checkOnLearning.map((q, qIdx) => `
                            <div class="col-question-card" id="col-card-${qIdx}">
                                <div class="col-question-text">${qIdx + 1}. ${q.question}</div>
                                <div class="col-options-list">
                                    ${q.options.map((opt, oIdx) => `
                                        <button class="col-option-item" id="col-btn-${qIdx}-${oIdx}" onclick="app.handleColAnswer(${lesson.id}, ${qIdx}, ${oIdx})">
                                            ${opt}
                                        </button>
                                    `).join('')}
                                </div>
                                <div class="col-explanation-box" id="col-exp-${qIdx}"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    switchLessonTab(tabName) {
        this.currentLessonTab = tabName;
        document.querySelectorAll('.lesson-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
        });
        document.querySelectorAll('.tab-content-panel').forEach(panel => {
            panel.classList.toggle('active', panel.id === `tab-${tabName}-content`);
        });
        this.saveState();
    }

    completeStudyAndGoToScenario() {
        this.getModuleState(this.currentLessonId).study = true;
        this.checkModuleProgression(this.currentLessonId);
        this.switchLessonTab('scenario');
    }

    handleScenarioChoice(lessonId, optionIndex) {
        const lesson = LESSONS_DATA.find(l => l.id === lessonId);
        if (!lesson || !lesson.scenarioSimulation) return;

        const opt = lesson.scenarioSimulation.options[optionIndex];
        const feedbackBox = document.getElementById('scenario-feedback');

        document.querySelectorAll('.scenario-option-btn').forEach((btn, idx) => {
            btn.classList.remove('selected-correct', 'selected-incorrect');
            if (idx === optionIndex) {
                btn.classList.add(opt.correct ? 'selected-correct' : 'selected-incorrect');
            }
        });

        if (feedbackBox) {
            feedbackBox.className = `scenario-feedback-box ${opt.correct ? 'correct' : 'incorrect'}`;
            feedbackBox.innerHTML = `<strong>${opt.correct ? 'TACTICAL EXCELLENCE' : 'TACTICAL & LEGAL RISK'}:</strong> ${opt.feedback}`;
            
            if (opt.correct) {
                feedbackBox.innerHTML += `<div style="margin-top:10px; font-size:0.85rem; color:var(--brand-green-bright);"><i class="fas fa-check-circle"></i> Scenario Successfully Completed! Proceed to Tab 3 (Check on Learning).</div>`;
            }
        }

        // Mark scenario completed once engaged
        this.getModuleState(lessonId).scenario = true;
        this.checkModuleProgression(lessonId);
    }

    handleColAnswer(lessonId, qIdx, oIdx) {
        const lesson = LESSONS_DATA.find(l => l.id === lessonId);
        if (!lesson || !lesson.checkOnLearning) return;

        const q = lesson.checkOnLearning[qIdx];
        const selectedText = q.options[oIdx];
        const isCorrect = selectedText === q.correctAnswer;

        // Record
        if (!this.colAnswers[lessonId]) this.colAnswers[lessonId] = {};
        this.colAnswers[lessonId][qIdx] = isCorrect;

        // Visual state
        q.options.forEach((_, optIdx) => {
            const btn = document.getElementById(`col-btn-${qIdx}-${optIdx}`);
            if (btn) {
                btn.classList.remove('correct', 'incorrect');
                if (optIdx === oIdx) {
                    btn.classList.add(isCorrect ? 'correct' : 'incorrect');
                }
            }
        });

        const expBox = document.getElementById(`col-exp-${qIdx}`);
        if (expBox) {
            expBox.className = `col-explanation-box show ${isCorrect ? 'callout tip' : 'remediation-box'}`;
            if (isCorrect) {
                expBox.innerHTML = `<strong><i class="fas fa-check-circle" style="color:var(--success);"></i> CORRECT:</strong> ${q.explanation}`;
            } else {
                expBox.innerHTML = `
                    <div class="remediation-info">
                        <i class="fas fa-exclamation-circle"></i>
                        <div>
                            <strong>INCORRECT — REVIEW REQUIRED</strong><br>
                            ${q.explanation}
                        </div>
                    </div>
                    <button class="btn-remediation" onclick="app.triggerRemediation('${q.remediationTarget}')">
                        <i class="fas fa-book-open"></i> Review Section in Material
                    </button>
                `;
            }
        }

        // Check if all 3 questions answered correctly
        const correctCount = Object.values(this.colAnswers[lessonId] || {}).filter(Boolean).length;
        if (correctCount === lesson.checkOnLearning.length) {
            this.getModuleState(lessonId).quiz = true;
            const badge = document.getElementById('col-mastery-status');
            if (badge) {
                badge.innerHTML = `<i class="fas fa-check-double"></i> Section Passed (100%)`;
                badge.style.color = "var(--brand-green-bright)";
            }
        }

        this.checkModuleProgression(lessonId);
    }

    checkModuleProgression(lessonId) {
        const isDone = this.isLessonFullyCompleted(lessonId);
        if (isDone) {
            localStorage.setItem(`lesson_done_${lessonId}`, 'true');
            localStorage.setItem(`lesson_mastered_${lessonId}`, 'true');
        }

        this.renderLessonsSidebar();
        this.renderOverviewGrid();
        this.renderModuleRequirementsBar(lessonId);
        this.updateLessonNavFooter(lessonId);
        this.updateGlobalProgress();
        this.saveState();
    }

    updateLessonNavFooter(lessonId) {
        const prevBtn = document.getElementById('lesson-prev-btn');
        const nextBtn = document.getElementById('lesson-next-btn');

        if (prevBtn) {
            prevBtn.style.display = lessonId > 1 ? 'inline-flex' : 'none';
            prevBtn.onclick = () => this.loadLesson(lessonId - 1);
        }

        if (nextBtn) {
            const isCurrentComplete = this.isLessonFullyCompleted(lessonId);

            if (!isCurrentComplete) {
                nextBtn.disabled = true;
                nextBtn.classList.add('btn-module-locked');
                nextBtn.innerHTML = `Complete Scenario & Quiz to Advance <i class="fas fa-lock"></i>`;
                nextBtn.onclick = null;
            } else {
                nextBtn.disabled = false;
                nextBtn.classList.remove('btn-module-locked');
                if (lessonId < LESSONS_DATA.length) {
                    nextBtn.innerHTML = `Next: Module ${lessonId + 1} <i class="fas fa-arrow-right"></i>`;
                    nextBtn.onclick = () => this.loadLesson(lessonId + 1);
                } else {
                    nextBtn.innerHTML = `All 10 Modules Complete! Begin 50-Q Exam <i class="fas fa-graduation-cap"></i>`;
                    nextBtn.onclick = () => this.showView('exam');
                }
            }
        }
    }

    triggerRemediation(targetElementId) {
        this.switchLessonTab('study');
        setTimeout(() => {
            const el = document.getElementById(targetElementId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('remediation-target-active');
                setTimeout(() => el.classList.remove('remediation-target-active'), 3500);
            }
        }, 200);
    }

    // =========================================================================
    // 50-Question Final Examination Engine
    // =========================================================================
    renderTopicFilterBar() {
        const bar = document.getElementById('topic-filter-bar');
        if (!bar) return;

        const filters = [
            { id: 'all', label: 'All 50 Questions' },
            { id: 'Part 1', label: 'True/False (1-8)' },
            { id: 'Part 2', label: 'Forms of Liability' },
            { id: 'Part 3', label: 'Criminal Code' },
            { id: 'Part 4', label: 'Fire Safety & P.A.S.S.' },
            { id: 'Part 5', label: 'Report Writing' },
            { id: 'Part 6', label: 'Tactical Scenarios (27-50)' }
        ];

        bar.innerHTML = filters.map(f => `
            <button class="topic-filter-chip ${this.activeTopicFilter === f.id ? 'active' : ''}" onclick="app.setTopicFilter('${f.id}')">
                ${f.label}
            </button>
        `).join('');
    }

    setTopicFilter(filterId) {
        this.activeTopicFilter = filterId;
        this.renderTopicFilterBar();
        this.renderQuestionPalette();
    }

    renderQuestionPalette() {
        const palette = document.getElementById('palette-grid');
        if (!palette) return;

        palette.className = 'palette-grid palette-grid-50';

        palette.innerHTML = EXAM_QUESTIONS.map((q, idx) => {
            const isAnswered = this.userAnswers[q.id] !== undefined;
            const isFlagged = this.flaggedQuestions.has(q.id);
            const isActive = idx === this.currentQuestionIdx;

            // Filter check
            let isVisible = true;
            if (this.activeTopicFilter !== 'all') {
                isVisible = q.part.includes(this.activeTopicFilter);
            }

            if (!isVisible) return '';

            return `
                <button class="palette-btn ${isActive ? 'active' : ''} ${isAnswered ? 'answered' : ''} ${isFlagged ? 'flagged' : ''}" 
                        onclick="app.goToQuestion(${idx})" 
                        title="Question ${idx + 1}: ${q.part} (${isAnswered ? 'Answered' : 'Unanswered'})">
                    ${idx + 1}
                </button>
            `;
        }).join('');

        this.updateAnsweredCount();
    }

    updateAnsweredCount() {
        const answeredCount = Object.keys(this.userAnswers).length;
        const total = EXAM_QUESTIONS.length;
        const display = document.getElementById('exam-answered-count');
        if (display) {
            display.textContent = `${answeredCount} / ${total} Answered`;
        }
    }

    goToQuestion(idx) {
        this.stopSpeech();
        if (idx >= 0 && idx < EXAM_QUESTIONS.length) {
            this.currentQuestionIdx = idx;
            this.renderQuestion(idx);
            this.renderQuestionPalette();
            this.saveState();
        }
    }

    renderQuestion(idx) {
        const q = EXAM_QUESTIONS[idx];
        if (!q) return;

        document.getElementById('question-part-label').textContent = q.part;
        const numDisplay = document.getElementById('question-number-display');
        if (numDisplay) {
            numDisplay.textContent = `Question ${idx + 1} of ${EXAM_QUESTIONS.length}`;
        }
        document.getElementById('question-text-content').textContent = q.question;

        // Flag button
        const flagBtn = document.getElementById('btn-flag-question');
        if (flagBtn) {
            const isFlagged = this.flaggedQuestions.has(q.id);
            flagBtn.classList.toggle('flagged', isFlagged);
            flagBtn.innerHTML = `<i class="${isFlagged ? 'fas' : 'far'} fa-flag"></i> ${isFlagged ? 'Flagged' : 'Flag'}`;
        }

        // Illustration
        const visualBox = document.getElementById('question-visual-container');
        if (visualBox) {
            if (q.illustration) {
                visualBox.style.display = 'block';
                if (q.illustration.type === 'image') {
                    visualBox.innerHTML = `
                        <img src="${q.illustration.src}" alt="Scenario illustration for Question ${idx + 1}">
                        <div class="visual-caption">
                            <strong><i class="fas fa-camera"></i> AI SCENARIO ILLUSTRATION:</strong> ${q.illustration.caption}
                        </div>
                    `;
                } else if (q.illustration.type === 'video') {
                    visualBox.innerHTML = `
                        <video controls autoplay muted loop playsinline>
                            <source src="${q.illustration.src}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                        <div class="visual-caption">
                            <strong><i class="fas fa-video"></i> TACTICAL VIDEO DEMONSTRATION:</strong> ${q.illustration.caption}
                        </div>
                    `;
                }
            } else {
                visualBox.style.display = 'none';
                visualBox.innerHTML = '';
            }
        }

        // Options
        const optionsContainer = document.getElementById('question-options-container');
        const selectedValue = this.userAnswers[q.id];

        optionsContainer.innerHTML = `
            <div class="options-list">
                ${q.options.map((opt, optIdx) => `
                    <div class="option-item ${selectedValue === opt ? 'selected' : ''}" onclick="app.selectOptionByIndex(${q.id}, ${optIdx})">
                        <div class="option-indicator"></div>
                        <div class="option-label">${opt}</div>
                    </div>
                `).join('')}
            </div>
        `;

        // Nav buttons
        const prevBtn = document.getElementById('exam-prev-btn');
        const nextBtn = document.getElementById('exam-next-btn');

        if (prevBtn) {
            prevBtn.disabled = idx === 0;
            prevBtn.onclick = () => this.goToQuestion(idx - 1);
        }

        if (nextBtn) {
            if (idx === EXAM_QUESTIONS.length - 1) {
                nextBtn.innerHTML = `Review & Submit 50-Q Exam <i class="fas fa-paper-plane"></i>`;
                nextBtn.onclick = () => this.confirmSubmitExam();
            } else {
                nextBtn.innerHTML = `Next Question <i class="fas fa-arrow-right"></i>`;
                nextBtn.onclick = () => this.goToQuestion(idx + 1);
            }
        }
    }

    selectOptionByIndex(questionId, optionIndex) {
        const q = EXAM_QUESTIONS.find(item => item.id === questionId);
        if (q && q.options && q.options[optionIndex] !== undefined) {
            this.selectAnswer(questionId, q.options[optionIndex]);
        }
    }

    selectAnswer(questionId, answer) {
        this.userAnswers[questionId] = answer;
        this.renderQuestion(this.currentQuestionIdx);
        this.renderQuestionPalette();
        this.saveState();
    }

    toggleFlagCurrent() {
        const q = EXAM_QUESTIONS[this.currentQuestionIdx];
        if (!q) return;

        if (this.flaggedQuestions.has(q.id)) {
            this.flaggedQuestions.delete(q.id);
        } else {
            this.flaggedQuestions.add(q.id);
        }

        this.renderQuestion(this.currentQuestionIdx);
        this.renderQuestionPalette();
        this.saveState();
    }

    clearCurrentAnswer() {
        const q = EXAM_QUESTIONS[this.currentQuestionIdx];
        if (!q) return;

        delete this.userAnswers[q.id];
        this.renderQuestion(this.currentQuestionIdx);
        this.renderQuestionPalette();
        this.saveState();
    }

    startExamTimer() {
        if (this.timerInterval) return;
        this.timerInterval = setInterval(() => {
            this.timerSeconds++;
            const minutes = Math.floor(this.timerSeconds / 60).toString().padStart(2, '0');
            const seconds = (this.timerSeconds % 60).toString().padStart(2, '0');
            const timerDisplay = document.getElementById('exam-timer-display');
            if (timerDisplay) {
                timerDisplay.textContent = `${minutes}:${seconds}`;
            }
        }, 1000);
    }

    stopExamTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    confirmSubmitExam() {
        const total = EXAM_QUESTIONS.length;
        const answered = Object.keys(this.userAnswers).length;
        const unanswered = total - answered;

        let message = `Are you ready to submit your 50-Question Final Examination?\n\nYou have answered ${answered} of ${total} questions.`;
        if (unanswered > 0) {
            message += `\n\nWARNING: You have ${unanswered} UNANSWERED questions! Unanswered items are counted as incorrect.`;
        }

        if (confirm(message)) {
            this.submitExam();
        }
    }

    submitExam() {
        this.stopExamTimer();
        this.stopSpeech();

        let correctCount = 0;
        EXAM_QUESTIONS.forEach(q => {
            const userAns = this.userAnswers[q.id];
            if (userAns !== undefined && userAns.trim() === q.correctAnswer.trim()) {
                correctCount++;
            }
        });

        this.examCompleted = true;
        this.examScore = correctCount;
        this.examPercentage = Math.round((correctCount / EXAM_QUESTIONS.length) * 100);
        this.examPassed = this.examPercentage >= COURSE_META.passingScore;

        this.saveState();
        this.showView('results');
    }

    // =========================================================================
    // Exam Results & Certificate Dashboard
    // =========================================================================
    renderResults() {
        const badge = document.getElementById('results-score-badge');
        const scoreNum = document.getElementById('results-score-number');
        const scorePct = document.getElementById('results-score-percentage');
        const title = document.getElementById('results-status-title');
        const subtitle = document.getElementById('results-status-subtitle');
        const certForm = document.getElementById('results-certificate-form-section');

        scoreNum.textContent = `${this.examScore} / ${EXAM_QUESTIONS.length}`;
        scorePct.textContent = `${this.examPercentage}% Score`;

        if (this.examPassed) {
            badge.className = 'score-badge passed';
            title.textContent = "CONGRATULATIONS — YOU PASSED!";
            title.style.color = "var(--brand-green-bright)";
            subtitle.textContent = `You achieved ${this.examPercentage}%, exceeding the State of Illinois passing standard of 75% (${COURSE_META.passingCorrect} correct out of 50). Please verify your trainee details in the official state form below to download or print your certificate.`;
            if (certForm) {
                certForm.style.display = 'block';
            }
        } else {
            badge.className = 'score-badge failed';
            title.textContent = "EXAM NOT PASSED — 75% REQUIRED";
            title.style.color = "var(--danger)";
            subtitle.textContent = `You scored ${this.examPercentage}% (${this.examScore} correct out of 50). A minimum of 75% (${COURSE_META.passingCorrect} correct) is required to pass the Illinois 20-Hour Unarmed Security qualification. Review your answers below and retake the exam when ready.`;
            if (certForm) {
                certForm.style.display = 'none';
            }
        }

        this.updateTodayDates();
        this.syncCertFormToPreview();

        // Render Question Breakdown List
        const reviewList = document.getElementById('results-review-list');
        if (reviewList) {
            reviewList.innerHTML = EXAM_QUESTIONS.map((q, idx) => {
                const userAns = this.userAnswers[q.id];
                const isCorrect = userAns !== undefined && userAns.trim() === q.correctAnswer.trim();

                return `
                    <div class="review-card ${isCorrect ? 'correct' : 'incorrect'}">
                        <div class="review-card-header">
                            <span class="question-part-tag">${q.part}</span>
                            <span class="status-tag" style="color: ${isCorrect ? 'var(--success)' : 'var(--danger)'}; font-weight:700;">
                                <i class="${isCorrect ? 'fas fa-check-circle' : 'fas fa-times-circle'}"></i> ${isCorrect ? 'CORRECT' : 'INCORRECT'}
                            </span>
                        </div>
                        <h4 class="review-question-title">Question ${idx + 1}: ${q.question}</h4>
                        
                        <div class="answer-comparison">
                            <div class="your-ans ${isCorrect ? 'correct-choice' : 'wrong-choice'}">
                                <strong>Your Answer:</strong> ${userAns || '<em>No answer provided</em>'}
                            </div>
                            ${!isCorrect ? `
                                <div class="correct-ans">
                                    <strong>Correct Answer:</strong> ${q.correctAnswer}
                                </div>
                            ` : ''}
                        </div>

                        <div class="explanation-box">
                            <strong><i class="fas fa-info-circle"></i> LEGAL & STATUTORY EXPLANATION:</strong>
                            ${q.explanation}
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    getFormattedTodayDate() {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yyyy = today.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }

    updateTodayDates() {
        const formatted = this.getFormattedTodayDate();
        document.querySelectorAll('.cert-field-compdate').forEach(el => {
            el.textContent = formatted;
        });
        const traineeDateInput = document.getElementById('cert-input-trainee-date');
        if (traineeDateInput) traineeDateInput.value = formatted;
        const prevDate = document.getElementById('prev-cert-date');
        if (prevDate) prevDate.textContent = formatted;
    }

    bindCertFormEvents() {
        const fieldMap = [
            { inputId: 'cert-input-name', prevId: 'prev-cert-name', key: 'name', upper: true },
            { inputId: 'cert-input-address', prevId: 'prev-cert-address', key: 'address' },
            { inputId: 'cert-input-city', prevId: 'prev-cert-city', key: 'city' },
            { inputId: 'cert-input-state', prevId: 'prev-cert-state', key: 'state', upper: true },
            { inputId: 'cert-input-zip', prevId: 'prev-cert-zip', key: 'zip' },
            { inputId: 'cert-input-dob', prevId: 'prev-cert-dob', key: 'dob' },
            { inputId: 'cert-input-ssn', prevId: 'prev-cert-ssn', key: 'ssn' },
            { inputId: 'cert-input-weight', prevId: 'prev-cert-weight', key: 'weight' },
            { inputId: 'cert-input-height', prevId: 'prev-cert-height', key: 'height' },
            { inputId: 'cert-input-hair', prevId: 'prev-cert-hair', key: 'hair' },
            { inputId: 'cert-input-eyes', prevId: 'prev-cert-eyes', key: 'eyes' },
            { inputId: 'cert-input-signature', prevId: 'prev-cert-sig', key: 'signature' }
        ];

        fieldMap.forEach(item => {
            const input = document.getElementById(item.inputId);
            if (input) {
                // Initialize input value from state
                if (this.studentCertData[item.key]) {
                    input.value = this.studentCertData[item.key];
                }
                input.addEventListener('input', (e) => {
                    let val = e.target.value;
                    if (item.upper) val = val.toUpperCase();
                    this.studentCertData[item.key] = val;
                    const prevEl = document.getElementById(item.prevId);
                    if (prevEl) prevEl.textContent = val || ' ';
                    this.saveState();
                });
            }
        });
    }

    syncCertFormToPreview() {
        const setVal = (inputId, prevId, key, fallback) => {
            const val = this.studentCertData[key] || fallback || '';
            const inp = document.getElementById(inputId);
            if (inp) inp.value = val;
            const prv = document.getElementById(prevId);
            if (prv) prv.textContent = val;
        };

        setVal('cert-input-name', 'prev-cert-name', 'name', 'DOE, JOHN A.');
        setVal('cert-input-address', 'prev-cert-address', 'address', '1234 S. Michigan Ave, Apt 4B');
        setVal('cert-input-city', 'prev-cert-city', 'city', 'Chicago');
        setVal('cert-input-state', 'prev-cert-state', 'state', 'IL');
        setVal('cert-input-zip', 'prev-cert-zip', 'zip', '60616');
        setVal('cert-input-dob', 'prev-cert-dob', 'dob', '05/14/1995');
        setVal('cert-input-ssn', 'prev-cert-ssn', 'ssn', 'XXX-XX-1234');
        setVal('cert-input-weight', 'prev-cert-weight', 'weight', '185 lbs');
        setVal('cert-input-height', 'prev-cert-height', 'height', "5' 11\"");
        setVal('cert-input-hair', 'prev-cert-hair', 'hair', 'Black');
        setVal('cert-input-eyes', 'prev-cert-eyes', 'eyes', 'Brown');
        setVal('cert-input-signature', 'prev-cert-sig', 'signature', 'John A. Doe');
    }

    async downloadOfficialPdfCertificate() {
        try {
            if (typeof PDFLib === 'undefined' || typeof UNARMED_CERT_TEMPLATE_BASE64 === 'undefined') {
                alert("Certificate generator library is initializing. Please wait a moment and try again.");
                return;
            }

            // Decode base64 to binary
            const binaryString = atob(UNARMED_CERT_TEMPLATE_BASE64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const pdfDoc = await PDFLib.PDFDocument.load(bytes);
            const page = pdfDoc.getPages()[0];
            const { height } = page.getSize();

            const helvetica = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
            const helveticaBold = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
            const timesItalic = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRomanItalic);

            // Extract values
            const name = (document.getElementById('cert-input-name')?.value || this.studentCertData.name || 'DOE, JOHN A.').toUpperCase();
            const address = document.getElementById('cert-input-address')?.value || this.studentCertData.address || '';
            const city = document.getElementById('cert-input-city')?.value || this.studentCertData.city || 'Chicago';
            const state = (document.getElementById('cert-input-state')?.value || this.studentCertData.state || 'IL').toUpperCase();
            const zip = document.getElementById('cert-input-zip')?.value || this.studentCertData.zip || '';
            const dob = document.getElementById('cert-input-dob')?.value || this.studentCertData.dob || '';
            const ssn = document.getElementById('cert-input-ssn')?.value || this.studentCertData.ssn || '';
            const weight = document.getElementById('cert-input-weight')?.value || this.studentCertData.weight || '';
            const heightVal = document.getElementById('cert-input-height')?.value || this.studentCertData.height || '';
            const hair = document.getElementById('cert-input-hair')?.value || this.studentCertData.hair || '';
            const eyes = document.getElementById('cert-input-eyes')?.value || this.studentCertData.eyes || '';
            const traineeSig = document.getElementById('cert-input-signature')?.value || this.studentCertData.signature || name;
            const compDate = this.getFormattedTodayDate();

            // Stamp Trainee Fields:
            // NAME
            page.drawText(name, { x: 35, y: height - 137, size: 11, font: helveticaBold, color: PDFLib.rgb(0, 0, 0) });
            // Address row
            page.drawText(address, { x: 35, y: height - 175, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });
            page.drawText(city, { x: 294, y: height - 175, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });
            page.drawText(state, { x: 395, y: height - 175, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });
            page.drawText(zip, { x: 490, y: height - 175, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });

            // DOB / SSN / Physical details row
            page.drawText(dob, { x: 35, y: height - 212, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });
            page.drawText(ssn, { x: 150, y: height - 212, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });
            page.drawText(weight, { x: 294, y: height - 212, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });
            page.drawText(heightVal, { x: 342, y: height - 212, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });
            page.drawText(hair, { x: 392, y: height - 212, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });
            page.drawText(eyes, { x: 490, y: height - 212, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });

            // Trainee Signature & Date
            page.drawText(traineeSig, { x: 140, y: height - 273, size: 13, font: timesItalic, color: PDFLib.rgb(0, 0, 0.4) });
            page.drawText(compDate, { x: 432, y: height - 273, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });

            // Bottom Instructor Section (Platforms Training Academy & Charles Young)
            page.drawText(compDate, { x: 35, y: height - 672, size: 11, font: helveticaBold, color: PDFLib.rgb(0, 0, 0) });
            page.drawText("Charles Young", { x: 155, y: height - 739, size: 14, font: timesItalic, color: PDFLib.rgb(0, 0, 0.6) });
            page.drawText(compDate, { x: 435, y: height - 739, size: 10, font: helvetica, color: PDFLib.rgb(0, 0, 0) });

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_');
            const filename = `Illinois_20Hr_Unarmed_Certificate_${cleanName}.pdf`;

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error("PDF download error:", err);
            alert("An error occurred while generating your official PDF. Please use the Print Certificate button to print or save as PDF.");
        }
    }

    retakeExam() {
        if (confirm("Are you sure you want to retake the 50-Question Exam? Your previous exam answers will be reset.")) {
            this.userAnswers = {};
            this.flaggedQuestions.clear();
            this.examCompleted = false;
            this.examScore = 0;
            this.examPercentage = 0;
            this.timerSeconds = 0;
            this.currentQuestionIdx = 0;
            this.saveState();
            this.renderQuestionPalette();
            this.showView('exam');
        }
    }

    // =========================================================================
    // Speech Synthesis / Audio Narration
    // =========================================================================
    toggleSpeech() {
        if (this.isSpeaking) {
            this.stopSpeech();
        } else {
            this.speakCurrentContent();
        }
    }

    stopSpeech() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        this.isSpeaking = false;
        document.querySelectorAll('.btn-speech').forEach(b => b.classList.remove('active'));
    }

    speakCurrentContent() {
        if (!('speechSynthesis' in window)) {
            alert("Speech synthesis is not supported on this browser.");
            return;
        }

        let textToRead = "";
        if (this.currentView === 'lesson') {
            const lesson = LESSONS_DATA.find(l => l.id === this.currentLessonId);
            if (lesson) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = lesson.content;
                textToRead = `${lesson.number}. ${lesson.title}. ${tempDiv.innerText}`;
            }
        } else if (this.currentView === 'exam') {
            const q = EXAM_QUESTIONS[this.currentQuestionIdx];
            if (q) {
                textToRead = `Question ${this.currentQuestionIdx + 1}. ${q.question}. Options are: ${q.options.join(', ')}`;
            }
        } else {
            textToRead = "Welcome to the Platforms Training Academy Online Unarmed Security Course.";
        }

        if (!textToRead) return;

        this.stopSpeech();
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onend = () => {
            this.isSpeaking = false;
            document.querySelectorAll('.btn-speech').forEach(b => b.classList.remove('active'));
        };

        utterance.onerror = () => {
            this.isSpeaking = false;
            document.querySelectorAll('.btn-speech').forEach(b => b.classList.remove('active'));
        };

        this.isSpeaking = true;
        document.querySelectorAll('.btn-speech').forEach(b => b.classList.add('active'));
        window.speechSynthesis.speak(utterance);
    }

    // =========================================================================
    // Progress Calculation
    // =========================================================================
    updateGlobalProgress() {
        let completedCount = 0;
        LESSONS_DATA.forEach(l => {
            if (this.isLessonFullyCompleted(l.id)) completedCount++;
        });

        const lessonWeight = 0.6;
        const examWeight = 0.4;

        const lessonProgress = (completedCount / LESSONS_DATA.length) * lessonWeight;
        const examAnswered = Object.keys(this.userAnswers).length;
        const examProgress = (examAnswered / EXAM_QUESTIONS.length) * examWeight;

        const totalProgress = Math.round((lessonProgress + examProgress) * 100);
        const fill = document.getElementById('global-progress-fill');
        if (fill) {
            fill.style.width = `${totalProgress}%`;
        }
    }

    // =========================================================================
    // Event Listeners
    // =========================================================================
    bindEvents() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.getAttribute('data-view');
                if (view) this.showView(view);
            });
        });

        // Brand logo click returns to overview
        const brand = document.querySelector('.brand-wrapper');
        if (brand) {
            brand.addEventListener('click', () => this.showView('overview'));
        }

        // Global speech toggle
        document.querySelectorAll('.btn-speech').forEach(btn => {
            btn.addEventListener('click', () => this.toggleSpeech());
        });

        // Exam flag button
        const flagBtn = document.getElementById('btn-flag-question');
        if (flagBtn) {
            flagBtn.addEventListener('click', () => this.toggleFlagCurrent());
        }

        // Clear current question answer
        const clearBtn = document.getElementById('btn-clear-question');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCurrentAnswer());
        }
    }


    // =========================================================================
    // Student Account, Profile & Navigation Guide Management
    // =========================================================================
    updateHeaderProfileDisplay() {
        const display = document.getElementById('header-student-name-display');
        if (display) {
            const name = this.studentCertData.name || 'Student Officer';
            display.textContent = name.length > 20 ? name.substring(0, 18) + '...' : name;
        }
    }

    openNavigationGuide() {
        const modal = document.getElementById('modal-navigation-guide');
        if (modal) modal.classList.add('open');
    }

    closeNavigationGuide() {
        const modal = document.getElementById('modal-navigation-guide');
        if (modal) modal.classList.remove('open');
    }

    openLoginModal() {
        const modal = document.getElementById('modal-student-login');
        if (!modal) return;

        // Populate fields
        const nameInput = document.getElementById('login-modal-name');
        if (nameInput) nameInput.value = this.studentCertData.name || '';
        const emailInput = document.getElementById('login-modal-email');
        if (emailInput) emailInput.value = this.studentEmail || '';
        const agencyInput = document.getElementById('login-modal-agency');
        if (agencyInput) agencyInput.value = this.studentAgency || '';

        // Update statistics
        const completedCount = this.getCompletedLessonsCount();
        const statModules = document.getElementById('modal-stat-modules');
        if (statModules) statModules.textContent = `${completedCount} / ${LESSONS_DATA.length} Mastered`;

        const statActive = document.getElementById('modal-stat-active-module');
        if (statActive) statActive.textContent = `Lesson ${this.currentLessonId}`;

        const totalQuizAns = Object.values(this.colAnswers).reduce((acc, curr) => acc + Object.values(curr).filter(Boolean).length, 0);
        const statQuizzes = document.getElementById('modal-stat-quizzes');
        if (statQuizzes) statQuizzes.textContent = `${totalQuizAns} / 30 Questions Mastered`;

        const statExam = document.getElementById('modal-stat-exam-status');
        if (statExam) {
            if (this.examPassed) {
                statExam.innerHTML = `<span style="color:var(--brand-green-bright);"><i class="fas fa-check-circle"></i> Passed (${this.examPercentage}%)</span>`;
            } else if (this.areAllLessonsCompleted()) {
                statExam.innerHTML = `<span style="color:var(--brand-green-bright);"><i class="fas fa-unlock"></i> Unlocked &bull; Ready</span>`;
            } else {
                statExam.innerHTML = `<span style="color:#f59e0b;"><i class="fas fa-lock"></i> Locked (${10 - completedCount} modules left)</span>`;
            }
        }

        const statSaved = document.getElementById('modal-stat-last-saved');
        if (statSaved) {
            statSaved.textContent = this.lastSavedTimestamp || 'Saved locally';
        }

        modal.classList.add('open');
    }

    closeLoginModal() {
        const modal = document.getElementById('modal-student-login');
        if (modal) modal.classList.remove('open');
    }

    saveStudentProfileFromModal() {
        const nameInput = document.getElementById('login-modal-name');
        const emailInput = document.getElementById('login-modal-email');
        const agencyInput = document.getElementById('login-modal-agency');

        if (nameInput && nameInput.value.trim()) {
            this.studentCertData.name = nameInput.value.trim().toUpperCase();
        }
        if (emailInput) this.studentEmail = emailInput.value.trim();
        if (agencyInput) this.studentAgency = agencyInput.value.trim();

        localStorage.setItem('platforms_student_email', this.studentEmail);
        localStorage.setItem('platforms_student_agency', this.studentAgency);

        this.updateHeaderProfileDisplay();
        this.syncCertFormToPreview();
        this.manualSaveProgress("Student credentials updated & progress saved!");
    }

    manualSaveProgress(customMsg) {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        this.lastSavedTimestamp = `Today at ${timeStr}`;
        localStorage.setItem('platforms_last_saved', this.lastSavedTimestamp);
        this.saveState();

        const toast = document.getElementById('lms-toast');
        const toastMsg = document.getElementById('lms-toast-msg');
        if (toast && toastMsg) {
            toastMsg.textContent = customMsg || `Course progress saved successfully (${timeStr})!`;
            toast.style.display = 'flex';
            setTimeout(() => {
                toast.style.display = 'none';
            }, 3500);
        }
    }

    exportProgressFile() {
        const exportData = {
            version: "v3",
            exportDate: new Date().toISOString(),
            studentName: this.studentCertData.name,
            studentEmail: this.studentEmail,
            studentAgency: this.studentAgency,
            currentLessonId: this.currentLessonId,
            currentLessonTab: this.currentLessonTab,
            moduleSections: this.moduleSections,
            colAnswers: this.colAnswers,
            userAnswers: this.userAnswers,
            examCompleted: this.examCompleted,
            examScore: this.examScore,
            examPercentage: this.examPercentage,
            examPassed: this.examPassed,
            studentCertData: this.studentCertData
        };

        const jsonStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const cleanName = (this.studentCertData.name || 'Student').replace(/[^a-zA-Z0-9]/g, '_');
        const filename = `platforms_unarmed_progress_${cleanName}.json`;

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.manualSaveProgress("Progress backup file downloaded!");
    }

    importProgressFile(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                if (!data.moduleSections) {
                    alert("Invalid progress file format.");
                    return;
                }

                this.moduleSections = data.moduleSections || {};
                this.colAnswers = data.colAnswers || {};
                this.userAnswers = data.userAnswers || {};
                this.currentLessonId = data.currentLessonId || 1;
                this.currentLessonTab = data.currentLessonTab || 'study';
                this.examCompleted = data.examCompleted || false;
                this.examScore = data.examScore || 0;
                this.examPercentage = data.examPercentage || 0;
                this.examPassed = data.examPassed || false;

                if (data.studentCertData) {
                    this.studentCertData = { ...this.studentCertData, ...data.studentCertData };
                }
                if (data.studentEmail) this.studentEmail = data.studentEmail;
                if (data.studentAgency) this.studentAgency = data.studentAgency;

                this.saveState();
                this.updateHeaderProfileDisplay();
                this.renderLessonsSidebar();
                this.renderOverviewGrid();
                this.updateGlobalProgress();
                this.loadLesson(this.currentLessonId, this.currentLessonTab);
                this.closeLoginModal();
                this.manualSaveProgress("Progress successfully restored from backup file!");
            } catch (err) {
                console.error("Error importing progress file:", err);
                alert("Failed to parse progress file. Please make sure it is a valid JSON export.");
            }
        };
        reader.readAsText(file);
    }

    resetCourseProgress() {
        if (confirm("Are you sure you want to RESET all course progress?\n\nThis will clear all completed modules, quiz answers, and exam records. This action cannot be undone.")) {
            localStorage.removeItem('platforms_unarmed_course_state_v3');
            this.moduleSections = {};
            this.colAnswers = {};
            this.userAnswers = {};
            this.flaggedQuestions.clear();
            this.currentLessonId = 1;
            this.currentLessonTab = 'study';
            this.examCompleted = false;
            this.examScore = 0;
            this.examPercentage = 0;
            this.examPassed = false;
            this.timerSeconds = 0;

            this.saveState();
            this.renderLessonsSidebar();
            this.renderOverviewGrid();
            this.updateGlobalProgress();
            this.closeLoginModal();
            this.showView('overview');
            this.manualSaveProgress("Course progress has been reset.");
        }
    }

    // =========================================================================
    // Field Instructor Narration Audio Player (Text-to-Speech)
    // =========================================================================
    toggleFieldNarrationSpeech(lessonId) {
        if (!('speechSynthesis' in window)) {
            alert("Audio narration is not supported on this browser.");
            return;
        }

        const btn = document.getElementById(`btn-narration-audio-${lessonId}`);

        if (this.currentNarratingLessonId === lessonId && this.isSpeaking) {
            // Stop speech
            this.stopSpeech();
            this.currentNarratingLessonId = null;
            if (btn) {
                btn.classList.remove('playing');
                btn.innerHTML = `<i class="fas fa-headphones"></i> Listen to Narration`;
            }
            return;
        }

        // Stop any current audio
        this.stopSpeech();

        const card = document.getElementById(`field-narration-les-${lessonId}`);
        if (!card) return;

        const body = card.querySelector('.narration-body-text');
        const titleEl = card.querySelector('.narration-title');
        const title = titleEl ? titleEl.innerText : `Lesson ${lessonId}`;
        const narrativeText = body ? body.innerText : '';

        const fullText = `Field Instructor Case Study. ${title}. Lead Instructor Charles Young narrating. ${narrativeText}`;

        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.rate = 0.95; // Slightly slower, measured instructional pace
        utterance.pitch = 0.95;

        utterance.onstart = () => {
            this.isSpeaking = true;
            this.currentNarratingLessonId = lessonId;
            document.querySelectorAll('.narration-audio-play-btn').forEach(b => {
                b.classList.remove('playing');
                b.innerHTML = `<i class="fas fa-headphones"></i> Listen to Narration`;
            });
            if (btn) {
                btn.classList.add('playing');
                btn.innerHTML = `<i class="fas fa-stop-circle"></i> Stop Narration`;
            }
        };

        utterance.onend = () => {
            this.isSpeaking = false;
            this.currentNarratingLessonId = null;
            if (btn) {
                btn.classList.remove('playing');
                btn.innerHTML = `<i class="fas fa-headphones"></i> Listen to Narration`;
            }
        };

        utterance.onerror = () => {
            this.isSpeaking = false;
            this.currentNarratingLessonId = null;
            if (btn) {
                btn.classList.remove('playing');
                btn.innerHTML = `<i class="fas fa-headphones"></i> Listen to Narration`;
            }
        };

        window.speechSynthesis.speak(utterance);
    }
}

// Instantiate global app once DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SecurityCourseApp();
});
