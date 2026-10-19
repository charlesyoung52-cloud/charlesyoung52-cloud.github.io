/**
 * Platforms Training Academy - Official Website Main Script
 * Handles Course Modals, Category Filtering, Mobile Drawer, and Interactive Actions
 */

// Course Database matching platformstraining.com requirements
const COURSE_DATABASE = {
    "unarmed-20": {
        title: "20 HR UNARMED SECURITY COURSE",
        category: "IDFPR State-Mandated Security Training (PERC Card)",
        price: "$80.00",
        duration: "Self-Paced (20 Hours Online)",
        location: "100% Online LMS Portal (Phone, Tablet, or PC)",
        rangeNote: "No range session required. Study all 10 modules, interactive scenarios, and practice quizzes 100% online.",
        description: "Official IDFPR-approved 20-hour curriculum required for all unarmed security officers in Illinois to obtain a Permanent Employee Registration Card (PERC). Complete your training 100% online at your own pace 24/7, pass the practice exam, and immediately download your official certificate of completion.",
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
        cancellation: "Instant digital access upon registration. Self-paced completion anytime 24/7."
    },
    "armed-28": {
        title: "28 HR ARMED SECURITY COURSE",
        category: "IDFPR Security Officer Credential (Tan Card)",
        price: "$200.00",
        duration: "2.5 Days (Wednesday 1:00 PM – 5:00 PM, Thursday 9:00 AM – 5:00 PM, Friday 9:00 AM – 5:00 PM)",
        location: "Classroom: 200 E 75th St, Chicago, IL 60619 | Range: Eagle Sports Range",
        rangeNote: "Ammo, targets, and range fees are included. Students should bring their own eye and ear protection, which can also be purchased directly at the range.",
        description: "This is the official IDFPR-approved state course for officers seeking to obtain a Firearms Control Card (Tan Card) for armed security employment in Illinois. Tuition covers full classroom instruction, legal updates, duty weapon operations, and live-fire range qualification.",
        curriculum: [
            "Safe gun handling, firearm anatomy, and ballistics",
            "Revolver and semi-automatic handgun operation and marksmanship",
            "Holster draw techniques, weapon retention, and malfunction clearing",
            "Civil and criminal liability for armed security personnel (720 ILCS 5/7-1)",
            "IDFPR official live-fire range qualification scoring at Eagle Sports Range"
        ],
        prerequisites: [
            "Prerequisite: 20-Hour Unarmed Security Course Certificate",
            "Must be at least 21 years of age",
            "Valid FOID Card or eligible to obtain FOID",
            "No felony convictions & no disqualifying battery convictions",
            "Duty belt and suitable range attire"
        ],
        cancellation: "No refunds. All classes can be rescheduled within 3 months. Range fees, ammunition, and weapon use included for qualification attempt."
    },
    "firearm-requal": {
        title: "SECURITY FIREARM REQUALIFICATION",
        category: "Armed Security Annual Recertification",
        price: "$125.00",
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
        duration: "2 Full Days (16 Hours Total)",
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
        duration: "3 Hours (Classroom & Range)",
        location: "Eagle Sports Range (5900 W 159th St, Oak Forest, IL 60452)",
        rangeNote: "Ammo, targets, and range fees are included. Students should bring their own eye and ear protection, which can also be purchased directly at the range.",
        description: "Required state refresher course every 5 years for Illinois Concealed Carry License holders to renew their permit with the Illinois State Police.",
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
        <div class="modal-range-included-box" style="background:rgba(128,163,21,0.12); border:1px solid rgba(128,163,21,0.35); border-radius:6px; padding:12px 14px; margin-bottom:16px; font-size:0.88rem; color:#e2e8f0; display:flex; gap:10px; align-items:flex-start;">
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

        <div class="modal-actions-footer">
            ${courseId === 'unarmed-20' ? `
            <a href="./course/index.html" class="btn-card-online btn-large btn-full" style="text-align:center;">
                <i class="fas fa-play"></i> Launch 20-Hour Online Course ($80)
            </a>
            ` : `
            <a href="tel:7738732591" class="btn-tactical-primary btn-large btn-full">
                <i class="fas fa-phone-alt"></i> Call (773) 873-2591 to Book
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

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            courseCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category") || "";
                const categories = cardCategory.split(" ");
                if (filterValue === "all" || categories.includes(filterValue)) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

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

// Interactive Contact Form Submission Handler
function handleContactSubmit(e) {
    e.preventDefault();
    const form = document.getElementById("contact-form");
    const name = document.getElementById("contact-name").value.trim();
    const phone = document.getElementById("contact-phone").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const course = document.getElementById("contact-course").value;
    const message = document.getElementById("contact-message").value.trim();

    const feedback = document.getElementById("form-feedback");
    feedback.className = "form-feedback-msg success";
    feedback.innerHTML = `
        <strong><i class="fas fa-check-circle"></i> Thank you, ${name}!</strong><br>
        Your inquiry for <em>${course}</em> has been submitted. Instructor Charles Young or academy staff will contact you at <strong>${phone}</strong> shortly.
    `;
    feedback.style.display = "block";

    // Save to localStorage as a submission record
    const submissions = JSON.parse(localStorage.getItem("platforms_inquiries") || "[]");
    submissions.push({ name, phone, email, course, message, date: new Date().toISOString() });
    localStorage.setItem("platforms_inquiries", JSON.stringify(submissions));

    form.reset();

    // Scroll to feedback
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
