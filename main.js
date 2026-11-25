/**
 * Platforms Training Academy - Official Website Main Script
 * Handles Course Modals, Category Filtering, Mobile Drawer, and Interactive Actions
 */

// Course Database matching platformstraining.com requirements
const COURSE_DATABASE = {
    "unarmed-20": {
        title: "20 HR UNARMED SECURITY COURSE",
        category: "IDFPR State-Mandated Security Training (PERC Card)",
        price: "$50.00",
        stripeUrl: "https://buy.stripe.com/6oU4gz8oQeaD1Moaqs9oc08",
        duration: "Self-Paced (20 Hours Online)",
        location: "100% Online LMS Portal (Phone, Tablet, or PC)",
        rangeNote: "No range session required. Study all 10 modules, interactive scenarios, and practice quizzes 100% online. You will receive your certificate immediately upon completion with no waiting period.",
        description: "Official IDFPR-approved 20-hour curriculum required for all unarmed security officers in Illinois to obtain a Permanent Employee Registration Card (PERC). Complete your training 100% online at your own pace 24/7, pass the 50-question final exam (75% passing, unlimited attempts, no time limit), and receive your official certificate immediately upon completion — there is absolutely no wait time.",
        curriculum: [
            "Illinois Private Detective, Private Alarm, Private Security Act of 2004 (225 ILCS 447)",
            "Role of the Security Officer, ethics, professional conduct & de-escalation",
            "Illinois Criminal Code & Arrest Powers (720 ILCS 5/7-1 vs. 5/7-3)",
            "Force Continuum, use of non-deadly force, liability & citizen's arrest laws",
            "Report writing, incident documentation, evidence preservation & patrol procedures",
            "Emergency response, fire safety, terrorism awareness & active threat protocols"
        ],
        prerequisites: [
            "Must be at least 18 years of age",
            "Eligible to obtain an Illinois PERC Card (IDFPR)",
            "No disqualifying felony convictions",
            "Internet-connected device (Smartphone, Tablet, or Computer)"
        ],
        cancellation: "Instant digital access upon registration. Self-paced completion anytime 24/7 with immediate certificate issuance upon completion (no wait)."
    },
    "armed-28": {
        title: "28 HR ONLINE ARMED SECURITY COURSE",
        category: "IDFPR Armed Security Certification (Curriculum #102-000398 • Tan Card • Online + Range)",
        price: "$200.00",
        stripeUrl: "https://buy.stripe.com/4gMaEXdJa9Un3Uw4249oc01",
        duration: "20 Hours Self-Paced Online (24/7) + 8-Hour Live-Fire Range Qualification",
        location: "Classroom: 100% Online LMS Portal (24/7) | Range: Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        rangeNote: "All-inclusive $200 tuition covers both your 20-hour online classroom course AND your 8-hour live-fire qualification at Eagle Sports Range — ammunition, targets, and range fees are included. Bring eye & ear protection (also sold at the range).",
        description: "Authorized under 68 Ill. Adm. Code 1240.510 (IDFPR Approved Curriculum #102-000398) for officers seeking an Illinois Firearm Control Card (Tan Card). Complete all 10 online armed lessons (20 hours) and the 50-question written exam (75% passing, unlimited attempts, no time limit) 100% online at your own pace, then schedule your included 8-hour in-person range qualification at Eagle Sports Range and save your IDFPR Form IL486-1138 record to your profile for Instructor range sign-off and dispatch to you and IDFPR (FPR.SafetyUnit@illinois.gov).",
        curriculum: [
            "4 Rules for Safe Gun Handling, Causes of Firearm Accidents, Safe Trigger Finger Position, Assuming a Two-Handed Grip, Thumb Position & Stance",
            "Pistol Types, Pistol Action Types, Revolver & Semi-Automatic Pistol Components, Rifling, Clearing a Pistol, Drawing from a Holster, Loading & Reloading",
            "Cartridge Components, Rimfire & Center-Fire Cartridges, +P/+P+ Safety, Cartridge & Pistol Malfunctions (Hangfire, Squib, Tap-Rack, Double Feed) & Fundamentals of Pistol Shooting",
            "Illinois Statutory Armed Authority: Justifiable Use of Deadly Force (720 ILCS 5/7-1) & IDFPR Firearm Control Card (Tan Card) Rules (225 ILCS 447 / 68 IAC 1240.510)",
            "Official 50-Question Written Examination (75% passing = 38/50, unlimited attempts, no time limit)",
            "Included 8-hour Eagle Sports Range 50-round live-fire qualification (5, 7 & 10 yards, min 70% = 35/50)"
        ],
        prerequisites: [
            "Prerequisite: 20-Hour Unarmed Security Course Certificate",
            "Must be at least 21 years of age",
            "Valid Illinois FOID Card (or active FOID eligibility)",
            "No felony convictions & no disqualifying battery/domestic violence convictions",
            "Smartphone, tablet, or computer for online modules + duty belt/attire for range day"
        ],
        cancellation: "Instant 24/7 digital access upon enrollment. Range qualification dates can be scheduled or rescheduled within 3 months at no extra cost; ammo, targets, and range fees included."
    },
    "firearm-requal": {
        title: "SECURITY FIREARM REQUALIFICATION",
        category: "Armed Security Annual Recertification",
        price: "$125.00",
        stripeUrl: "https://buy.stripe.com/9B6cN5bB28QjbmYgOQ9oc02",
        duration: "Scheduled Range Session",
        location: "Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        rangeNote: "Ammo, targets, and range fees are included. Students should bring their own eye and ear protection, which can also be purchased directly at the range.",
        description: "Annual qualification course required by the IDFPR to maintain an active Firearms Control Card (Tan Card) for employed armed security officers in Illinois.",
        curriculum: [
            "Review of safety procedures, holster inspection, and state guidelines",
            "State-mandated qualification course of fire",
            "Official instructor sign-off paperwork for employer and IDFPR records"
        ],
        prerequisites: [
            "Current or previously issued Firearms Control Card holder",
            "Approved duty firearm and retention holster"
        ],
        cancellation: "Rescheduling permitted with 48 hours notice."
    },
    "firearm-upgrade": {
        title: "SECURITY FIREARM UPGRADE QUALIFICATION",
        category: "Armed Security Multi-Weapon Endorsement",
        price: "$125.00",
        stripeUrl: "https://buy.stripe.com/cNidR9gVm5E71Mo8ik9oc03",
        duration: "Concurrent Range Session",
        location: "Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        rangeNote: "Ammo, targets, and range fees are included. Students should bring their own eye and ear protection, which can also be purchased directly at the range.",
        description: "For armed security officers seeking to add secondary firearm endorsements (such as adding semi-automatic handgun to revolver or vice versa) to their IDFPR Tan Card.",
        curriculum: [
            "Proficiency and manual of arms on additional weapon platform",
            "Holster drawing and tactical reloading drills",
            "Live-fire qualification test on new weapon platform"
        ],
        prerequisites: [
            "Active or pending Armed Security Officer certification",
            "Firearm to be endorsed and suitable retention holster"
        ],
        cancellation: "Standard 3-month rescheduling policy applies."
    },
    "ccl-16": {
        title: "16 HR IL CONCEALED CARRY COURSE",
        category: "Standard Illinois Concealed Carry License (CCL)",
        price: "$200.00",
        stripeUrl: "https://buy.stripe.com/dRmeVdcF65E776I8ik9oc04",
        duration: "2 Full Days (9:00 AM – 5:00 PM)",
        location: "Classroom: 200 E 75th St, Chicago, IL 60619 | Range: Eagle Sports Range",
        rangeNote: "Ammo, targets, and range fees are included. Students should bring their own eye and ear protection, which can also be purchased directly at the range.",
        description: "Full state curriculum approved by the Illinois State Police (ISP) for individuals seeking their Illinois Concealed Carry License without prior training exemptions.",
        curriculum: [
            "Firearm safety rules and fundamentals of defensive pistol shooting",
            "Holster retention, concealed draw stroke, and malfunction clearing",
            "Illinois Concealed Carry Act (430 ILCS 66) & prohibited carry locations",
            "Federal firearms laws and interstate travel regulations",
            "Official 30-round ISP live-fire qualification at 5, 7, and 10 yards"
        ],
        prerequisites: [
            "Must be at least 21 years old",
            "Valid FOID Card or eligible for FOID",
            "Suitable belt for range day holster work"
        ],
        cancellation: "No refunds. Classes can be rescheduled within 3 months."
    },
    "ccl-8": {
        title: "8 HR IL CONCEALED CARRY COURSE",
        category: "8-Hour Prior Credit CCL (NRA Recognized)",
        price: "$150.00",
        stripeUrl: "https://buy.stripe.com/14AbJ148A2rVaiU0PS9oc05",
        duration: "1 Full Day (8 Hours)",
        location: "Classroom: 200 E 75th St, Chicago, IL 60619 | Range: Eagle Sports Range",
        rangeNote: "Ammo, targets, and range fees are included. Students should bring their own eye and ear protection, which can also be purchased directly at the range.",
        description: "For students who possess 8 hours of prior recognized NRA firearms training (such as NRA Basic Pistol, NRA Personal Protection in the Home, or NRA Law Enforcement).",
        curriculum: [
            "Illinois Concealed Carry Act comprehensive legal review",
            "Justifiable use of deadly force under Illinois law (720 ILCS 5/7-1)",
            "Live-fire 30-round ISP qualification test at Eagle Sports Range"
        ],
        prerequisites: [
            "Official Certificate from recognized 8-hour prior course",
            "Must be at least 21 years old",
            "Valid FOID Card or eligibility"
        ],
        cancellation: "Standard 3-month rescheduling policy applies."
    },
    "ccl-military": {
        title: "8 HR IL CCL – MILITARY & LAW ENFORCEMENT",
        category: "Military & First Responder Special",
        price: "$125.00",
        stripeUrl: "https://buy.stripe.com/aFa00jeNe0jN2QseGI9oc06",
        duration: "1 Full Day (8 Hours)",
        location: "Classroom: 200 E 75th St, Chicago, IL 60619 | Range: Eagle Sports Range",
        rangeNote: "Ammo, targets, and range fees are included. Students should bring their own eye and ear protection, which can also be purchased directly at the range.",
        description: "Specially discounted course for active-duty military, veterans with DD-214 honorable discharge, active/retired police officers, and correctional personnel. Your service grants you 8 hours of prior credit, requiring only this 8-hour law and range qualification session.",
        curriculum: [
            "Illinois statutory law and lawful use of force updates",
            "Public interactions and law enforcement contact guidelines for armed citizens",
            "Official ISP live-fire range qualification test"
        ],
        prerequisites: [
            "Valid Military ID, DD-214 (Honorable Discharge), or Law Enforcement ID",
            "Must be 21+ years old"
        ],
        cancellation: "Standard 3-month rescheduling policy applies."
    },
    "ccl-refresher": {
        title: "3 HR IL CONCEALED CARRY REFRESHER COURSE",
        category: "5-Year State License Renewal",
        price: "$125.00",
        stripeUrl: "https://buy.stripe.com/cNicN58oQd6z3Uw9mo9oc07",
        duration: "3 Hours (Classroom & Range)",
        location: "Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        rangeNote: "Ammo, targets, and range fees are included. Students should bring their own eye and ear protection, which can also be purchased directly at the range.",
        description: "Required state refresher course every 5 years for Illinois Concealed Carry License holders to renew their CCL with the Illinois State Police.",
        curriculum: [
            "Review of Illinois Concealed Carry Act changes and recent case law updates",
            "Mental conditioning, situational awareness, and defensive decision-making",
            "Official 30-round live-fire qualification"
        ],
        prerequisites: [
            "Current or expiring Illinois Concealed Carry License",
            "Approved firearm and belt holster"
        ],
        cancellation: "Standard 3-month rescheduling policy applies."
    }
};

// Open Course Details Modal
function openCourseModal(courseId) {
    const course = COURSE_DATABASE[courseId];
    if (!course) return;

    const slot = document.getElementById("modal-content-slot");
    slot.innerHTML = `
        <span class="course-badge badge-primary" style="margin-bottom:12px; display:inline-block;">${course.category}</span>
        <h3 class="modal-course-title">${course.title}</h3>
        <div class="modal-price-strip">
            <span class="modal-price-number">${course.price}</span>
        </div>

        ${course.rangeNote ? `
        <div class="modal-range-included-box" style="background:rgba(212,175,55,0.10); border:1px solid rgba(212,175,55,0.35); border-radius:6px; padding:12px 14px; margin-bottom:16px; font-size:0.88rem; color:#ffffff; display:flex; gap:10px; align-items:flex-start;">
            <i class="fas fa-bullseye text-green" style="font-size:1.1rem; margin-top:2px; color:var(--brand-green-bright);"></i>
            <div>
                <strong style="color:#fff;">Range Equipment &amp; Fees Included:</strong><br>
                ${course.rangeNote}
            </div>
        </div>` : ''}

        <h5 class="modal-section-h5"><i class="fas fa-clock"></i> Course Duration &amp; Schedule</h5>
        <p class="modal-body-p">${course.duration}</p>

        <h5 class="modal-section-h5"><i class="fas fa-map-marker-alt"></i> Location</h5>
        <p class="modal-body-p">${course.location}</p>

        <h5 class="modal-section-h5"><i class="fas fa-book-open"></i> Course Overview</h5>
        <p class="modal-body-p">${course.description}</p>

        <h5 class="modal-section-h5"><i class="fas fa-list-check"></i> Key Topics &amp; Standards</h5>
        <ul class="modal-list">
            ${course.curriculum.map(item => `<li><i class="fas fa-check text-green" style="margin-right:6px;"></i> ${item}</li>`).join("")}
        </ul>

        <h5 class="modal-section-h5"><i class="fas fa-clipboard-check"></i> Prerequisites</h5>
        <ul class="modal-list">
            ${course.prerequisites.map(item => `<li><i class="fas fa-arrow-right text-green" style="margin-right:6px;"></i> ${item}</li>`).join("")}
        </ul>

        <h5 class="modal-section-h5"><i class="fas fa-info-circle"></i> Policy</h5>
        <p class="modal-body-p" style="font-size:0.85rem; color:#94a3b8;">${course.cancellation}</p>

        <div class="modal-actions-footer" style="flex-wrap:wrap; gap:10px;">
            ${courseId === 'unarmed-20' ? `
            <a href="./course/index.html" class="btn-card-online btn-large" style="flex:1; min-width:200px; text-align:center; justify-content:center;">
                <i class="fas fa-play"></i> Start Online Course ($50)
            </a>
            ` : courseId === 'armed-28' ? `
            <a href="./armed-course/index.html" class="btn-card-online btn-large" style="flex:1; min-width:210px; text-align:center; justify-content:center;">
                <i class="fas fa-play"></i> Start Online Course ($200)
            </a>
            <a href="calendar.html?course=armed-28" class="btn-tactical-outline btn-large" style="flex:1; min-width:190px; text-align:center; justify-content:center;">
                <i class="fas fa-calendar-check"></i> View Range Dates
            </a>
            ` : `
            <a href="calendar.html?course=${courseId}" class="btn-tactical-primary btn-large" style="flex:1; min-width:200px; text-align:center; justify-content:center;">
                <i class="fas fa-calendar-check"></i> Select a Date on Calendar
            </a>
            `}
            <button onclick="closeCourseModal()" class="btn-tactical-outline btn-large">
                Close
            </button>
        </div>
    `;

    const modal = document.getElementById("course-modal");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

// Close Course Modal
function closeCourseModal(event) {
    if (event && event.target !== event.currentTarget) return;
    const modal = document.getElementById("course-modal");
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeCourseModal();
    }
});

// Category Filter Tabs
document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-tab-btn");
    const courseCards = document.querySelectorAll(".course-card");

    const applyCourseFilter = (filterValue) => {
        filterButtons.forEach(b => {
            if (b.getAttribute("data-filter") === filterValue) {
                b.classList.add("active");
            } else {
                b.classList.remove("active");
            }
        });
        courseCards.forEach(card => {
            const cardCategory = card.getAttribute("data-category") || "";
            const categories = cardCategory.split(" ");
            if (filterValue === "all" || categories.includes(filterValue)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    };

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const filterValue = btn.getAttribute("data-filter");
            applyCourseFilter(filterValue);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const initialFilter = urlParams.get("filter") || (window.location.hash ? window.location.hash.replace("#", "") : "");
    if (initialFilter && Array.from(filterButtons).some(b => b.getAttribute("data-filter") === initialFilter)) {
        applyCourseFilter(initialFilter);
    }

    // Mobile Navigation Drawer Toggle
    const mobileToggleBtn = document.getElementById("mobile-toggle-btn");
    const drawerCloseBtn = document.getElementById("drawer-close-btn");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const drawerBackdrop = document.getElementById("drawer-backdrop");

    function openDrawer() {
        mobileDrawer.classList.add("open");
        drawerBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
        mobileDrawer.classList.remove("open");
        drawerBackdrop.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    if (mobileToggleBtn) mobileToggleBtn.addEventListener("click", openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener("click", closeDrawer);

    // Close drawer on clicking link
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", closeDrawer);
    });

    // Active Navigation Highlight on Scroll & Sticky Header State
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".desktop-nav .nav-item");
    const mainHeader = document.getElementById("main-header");

    window.addEventListener("scroll", () => {
        // Sticky header elevation shadow
        if (mainHeader) {
            if (window.pageYOffset > 20) {
                mainHeader.classList.add("header-scrolled");
            } else {
                mainHeader.classList.remove("header-scrolled");
            }
        }

        let currentSectionId = "";
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });
    });
});

// Interactive Contact Form Submission Handler (Sends directly to charlesyoung@platformstraining.com)
async function handleContactSubmit(e) {
    e.preventDefault();
    const form = document.getElementById("contact-form");
    const name = document.getElementById("contact-name").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const course = document.getElementById("contact-course").value;
    const message = document.getElementById("contact-message").value.trim();
    const submitBtn = form ? form.querySelector('button[type="submit"]') : null;
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
    }

    const gmailUrl = (window.PLATFORMS_CONFIG && window.PLATFORMS_CONFIG.gmailWebhook && window.PLATFORMS_CONFIG.gmailWebhook.url)
        || localStorage.getItem('platforms_gmail_webhook_url')
        || 'https://script.google.com/macros/s/AKfycbxzEpjDZ07wPASas7X4hNyR0ThhuXYg4G2aigLE4_L_XzVBnP7-u1Z0e0dQXmdOC7lT/exec';
    const gmailSecret = (window.PLATFORMS_CONFIG && window.PLATFORMS_CONFIG.gmailWebhook && window.PLATFORMS_CONFIG.gmailWebhook.secret)
        || localStorage.getItem('platforms_gmail_webhook_secret')
        || 'pta-7Kq2x9Lm4Rv8';

    const cleanEm = (email || '').trim().toLowerCase();
    const skipList = ['student@platformstraining.com', 'test@platformstraining.com', 'charlesyoung52@gmail.com', 'charlesyoung@platformstraining.com'];
    const isTest = cleanEm && (skipList.includes(cleanEm) || cleanEm.endsWith('.test') || cleanEm.endsWith('@example.com') || cleanEm.includes('test@'));

    if (gmailUrl && !isTest) {
        try {
            const escHtml = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            const submittedAt = new Date().toLocaleString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
            const htmlMessage = `
    <div style="font-family:'Segoe UI',Arial,sans-serif; max-width:640px; margin:0 auto; background:#0a0b0d; color:#f8fafc; border-radius:12px; overflow:hidden; border:1px solid #262c3a;">
        <div style="background:linear-gradient(135deg,#161a22 0%,#0a0b0d 100%); padding:22px 26px; border-bottom:2px solid #d4af37; text-align:center;">
            <div style="display:inline-block; background:rgba(212,175,55,0.16); color:#e5c158; border:1px solid #d4af37; padding:4px 12px; border-radius:999px; font-size:12px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; margin-bottom:8px;">
                New Website Contact Us Message
            </div>
            <h1 style="color:#ffffff; font-size:21px; margin:4px 0 0 0; letter-spacing:0.5px;">PLATFORMS TRAINING ACADEMY</h1>
            <p style="color:#cbd5e1; font-size:13px; margin:4px 0 0 0;">Submitted ${escHtml(submittedAt)}</p>
        </div>
        <div style="padding:24px 26px;">
            <div style="background:#141821; border:1px solid rgba(212,175,55,0.4); border-left:4px solid #d4af37; border-radius:8px; padding:16px 18px; margin-bottom:18px;">
                <table style="width:100%; border-collapse:collapse; font-size:14px; color:#f8fafc;">
                    <tr><td style="padding:6px 0; color:#94a3b8; width:36%;">Sender Name:</td><td style="padding:6px 0; font-weight:700; color:#ffffff;">${escHtml(name)}</td></tr>
                    <tr><td style="padding:6px 0; color:#94a3b8;">Phone Number:</td><td style="padding:6px 0; font-weight:700;"><a href="tel:${escHtml(phone)}" style="color:#e5c158; text-decoration:none;">${escHtml(phone)}</a></td></tr>
                    <tr><td style="padding:6px 0; color:#94a3b8;">Email Address:</td><td style="padding:6px 0; font-weight:700;"><a href="mailto:${escHtml(email)}" style="color:#e5c158; text-decoration:none;">${escHtml(email)}</a></td></tr>
                    <tr><td style="padding:6px 0; color:#94a3b8;">Course of Interest:</td><td style="padding:6px 0; font-weight:700; color:#4ade80;">${escHtml(course)}</td></tr>
                </table>
            </div>
            <div style="background:#11141c; border:1px solid #262c3a; border-radius:8px; padding:16px 18px; margin-bottom:20px;">
                <div style="font-size:12px; font-weight:700; color:#d4af37; text-transform:uppercase; letter-spacing:0.6px; margin-bottom:6px;">Message / Question:</div>
                <div style="font-size:14.5px; color:#ffffff; line-height:1.6; white-space:pre-wrap;">${escHtml(message)}</div>
            </div>
        </div>
    </div>`;
            await fetch(gmailUrl, {
                method: 'POST',
                mode: 'no-cors',
                keepalive: true,
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({
                    action: 'add_inquiry',
                    secret: gmailSecret,
                    inquiry: { name, phone, email, course, message, submitted_at: submittedAt },
                    to: 'charlesyoung@platformstraining.com',
                    subject: `Website Course Inquiry: ${name} — ${course}`,
                    htmlBody: htmlMessage,
                    textBody: `Course Inquiry:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nCourse: ${course}\nMessage: ${message}`,
                    replyTo: email || 'charlesyoung@platformstraining.com',
                    fromName: 'Platforms Training Academy'
                })
            });
        } catch (err) {}
    }

    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
    }

    const feedback = document.getElementById("form-feedback");
    feedback.className = "form-feedback-msg success";
    feedback.innerHTML = `
        <strong><i class="fas fa-check-circle"></i> Thank you, ${name}!</strong><br>
        Your message regarding <em>${course}</em> has been sent directly to <strong>charlesyoung@platformstraining.com</strong>. Instructor Charles Young will contact you at <strong>${phone}</strong> or <strong>${email}</strong> shortly.
    `;
    feedback.style.display = "block";

    // Save to localStorage as a submission record
    const submissions = JSON.parse(localStorage.getItem("platforms_inquiries") || "[]");
    submissions.push({ name, phone, email, course, message, to: "charlesyoung@platformstraining.com", date: new Date().toISOString() });
    localStorage.setItem("platforms_inquiries", JSON.stringify(submissions));

    form.reset();

    // Scroll to feedback
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
