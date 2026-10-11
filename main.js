/**
 * Platforms Training Academy - Official Website Main Script
 * Handles Course Modals, Category Filtering, Mobile Drawer, and Interactive Actions
 */

// Course Database matching platformstraining.com
const COURSE_DATABASE = {
    "unarmed-20": {
        title: "20 HR UNARMED SECURITY COURSE",
        category: "IDFPR Security Officer Credential (PERC)",
        price: "$100.00",
        sezzle: "4 bi-weekly payments of $25.00 with Sezzle",
        duration: "2.5 Days (Monday 9:00 AM – 5:00 PM, Tuesday 9:00 AM – 5:00 PM, Wednesday 9:00 AM – 12:00 PM)",
        location: "921 E 40th St, Chicago, IL 60653",
        description: "This is the state-mandated IDFPR course under 225 ILCS 447 for students seeking employment as an unarmed security officer in Illinois. Successful completion qualifies you to apply for and obtain your Permanent Employee Registration Card (PERC).",
        curriculum: [
            "Illinois Private Detective, Private Alarm, Private Security Act (225 ILCS 447)",
            "Statutory powers of arrest and citizen's arrest limits",
            "Law on Use of Force and Defending Persons and Property (720 ILCS 5/7-1)",
            "Field patrolling techniques, access control, and observation tactics",
            "Professional security note-taking and incident report writing",
            "Fire prevention, HAZMAT safety, and PASS fire extinguisher protocols"
        ],
        prerequisites: [
            "Must be at least 18 years of age",
            "Standard duty belt required for classroom gear drills"
        ],
        cancellation: "No refunds. All classes can be rescheduled within 3 months of the original course date as courses are available."
    },
    "armed-28": {
        title: "28 HR ARMED SECURITY COURSE",
        category: "Firearms Control Card (Tan Card)",
        price: "$200.00",
        sezzle: "4 bi-weekly payments of $50.00 with Sezzle",
        duration: "2.5 Days (Wednesday 1:00 PM – 5:00 PM, Thursday 9:00 AM – 5:00 PM, Friday 9:00 AM – 5:00 PM)",
        location: "921 E 40th St, Chicago, IL 60653 & Live-Fire Range",
        description: "This is an IDFPR state course for students who have completed the 20-Hour Unarmed Course and are seeking to obtain a Firearms Control Card (Tan Card) for armed employment. Tuition covers range fees, target, ammunition, and firearm use (if student does not own one).",
        curriculum: [
            "Safe gun handling, firearm anatomy, and ballistics",
            "Revolver and semi-automatic handgun operation and marksmanship",
            "Holster draw techniques, retention, and weapon clearing drills",
            "Civil and criminal liability for armed security personnel",
            "IDFPR official live-fire range qualification scoring"
        ],
        prerequisites: [
            "Prerequisite: 20-Hour Unarmed Security Course Certificate",
            "Must be at least 21 years of age",
            "Valid FOID Card or eligible to obtain FOID",
            "No felony convictions & no battery convictions",
            "Duty belt and suitable range attire"
        ],
        cancellation: "No refunds. All classes can be rescheduled within 3 months. Range fees, ammunition, and gun use included for first attempt."
    },
    "combined-48": {
        title: "48 HR COMBINED SECURITY COURSE",
        category: "Complete Security Career Package (PERC + Tan Card)",
        price: "$300.00",
        sezzle: "4 bi-weekly payments of $75.00 with Sezzle",
        duration: "5 Full Days (Monday – Friday)",
        location: "921 E 40th St, Chicago, IL 60653 & Live-Fire Range",
        description: "Our comprehensive full-week career accelerator combining both the 20-Hour Unarmed Security Course and 28-Hour Armed Security Course. Graduates receive double certification for immediate deployment as armed or unarmed officers.",
        curriculum: [
            "All 20 hours of statutory unarmed security training",
            "All 28 hours of armed firearms security instruction",
            "Classroom law, report writing, and live-fire range qualification",
            "Assistance with IDFPR PERC and Firearms Control Card application filing"
        ],
        prerequisites: [
            "Must be at least 21 years of age for armed qualification",
            "Clean criminal record (no felonies or disqualifying battery)",
            "Duty belt required"
        ],
        cancellation: "No refunds. Rescheduling permitted within 3 months."
    },
    "ccl-16": {
        title: "16 HR IL CONCEALED CARRY COURSE",
        category: "Standard Illinois Concealed Carry License (CCL)",
        price: "$200.00",
        sezzle: "4 bi-weekly payments of $50.00 with Sezzle",
        duration: "2 Full Days (16 Hours Total)",
        location: "921 E 40th St, Chicago, IL & Range",
        description: "Full state curriculum approved by the Illinois State Police (ISP) for individuals seeking their Illinois Concealed Carry License without prior training exemptions.",
        curriculum: [
            "Firearm safety rules and fundamentals of pistol shooting",
            "Holster retention, concealed draw stroke, and malfunction clearing",
            "Illinois Concealed Carry Act (430 ILCS 66) & prohibited carry locations",
            "Federal firearms laws and interstate travel regulations",
            "Official 30-round ISP live-fire qualification at 5, 7, and 10 yards"
        ],
        prerequisites: [
            "Must be at least 21 years old",
            "Valid FOID Card or eligible for FOID",
            "Eye & ear protection and belt for range day"
        ],
        cancellation: "No refunds. Classes can be rescheduled within 3 months."
    },
    "ccl-12": {
        title: "12 HR IL CONCEALED CARRY COURSE",
        category: "Partial Credit CCL (4 Hours Prior Credit)",
        price: "$175.00",
        sezzle: "4 bi-weekly payments with Sezzle",
        duration: "12 Hours Total (Day 1 Afternoon & Day 2)",
        location: "921 E 40th St, Chicago, IL & Range",
        description: "For students who possess 4 hours of prior state-recognized training (such as Illinois DNR Hunter Safety, Utah CCL, Florida CCL, or Nevada CCW).",
        curriculum: [
            "Advanced defensive mindset and situational awareness",
            "Full Illinois statutory law breakdown (430 ILCS 66)",
            "Live-fire range qualification test"
        ],
        prerequisites: [
            "Proof of 4-hour prior approved training certificate",
            "21+ years old, FOID card eligible"
        ],
        cancellation: "Standard 3-month rescheduling policy applies."
    },
    "ccl-8": {
        title: "8 HR IL CONCEALED CARRY COURSE",
        category: "8-Hour Prior Credit CCL (NRA Recognized)",
        price: "$150.00",
        sezzle: "4 bi-weekly payments with Sezzle",
        duration: "1 Full Day (8 Hours)",
        location: "921 E 40th St, Chicago, IL & Range",
        description: "For students who possess 8 hours of prior recognized NRA firearms training (such as NRA Basic Pistol, NRA Personal Protection in the Home, or NRA Law Enforcement).",
        curriculum: [
            "Illinois Concealed Carry Act comprehensive legal review",
            "Justifiable use of deadly force under Illinois law",
            "Live-fire 30-round qualification"
        ],
        prerequisites: [
            "Official Certificate from recognized 8-hour prior course",
            "Must be at least 21 years old"
        ],
        cancellation: "Standard 3-month rescheduling policy applies."
    },
    "ccl-military": {
        title: "8 HR IL CCL – MILITARY & LAW ENFORCEMENT",
        category: "Active & Veteran Service Member Special",
        price: "$100.00",
        sezzle: "4 bi-weekly payments of $25.00 with Sezzle",
        duration: "1 Full Day (8 Hours)",
        location: "921 E 40th St, Chicago, IL & Range",
        description: "Specially discounted course for active-duty military, veterans with DD-214 honorable discharge, active/retired police officers, and correctional personnel.",
        curriculum: [
            "Illinois law and lawful use of force updates",
            "Public interactions and LE contact guidelines for armed citizens",
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
        price: "$50.00",
        sezzle: "Pay in full or use Sezzle",
        duration: "3 Hours (Classroom & Range)",
        location: "921 E 40th St, Chicago, IL & Range",
        description: "Required state refresher course every 5 years for Illinois Concealed Carry License holders to renew their permit with the Illinois State Police.",
        curriculum: [
            "Review of Illinois Concealed Carry Act changes and recent case law",
            "Mental conditioning and defensive decision-making",
            "Official 30-round live-fire qualification"
        ],
        prerequisites: [
            "Current or expiring Illinois Concealed Carry License",
            "Personal firearm, holster, and 30 rounds of ammunition"
        ],
        cancellation: "Standard 3-month rescheduling policy applies."
    },
    "firearm-requal": {
        title: "SECURITY FIREARM REQUALIFICATION",
        category: "Annual Armed Security Recertification",
        price: "$50.00",
        sezzle: "Pay in full or use Sezzle",
        duration: "Scheduled Range Session",
        location: "Range Facility, Chicago, IL",
        description: "Annual qualification course required by the IDFPR to maintain an active Firearms Control Card (Tan Card) for working armed security officers.",
        curriculum: [
            "Review of safety procedures and firearm inspection",
            "State-mandated qualification course of fire",
            "Official instructor sign-off paperwork for employer & state records"
        ],
        prerequisites: [
            "Current or previous Firearms Control Card holder",
            "Approved duty firearm and holster"
        ],
        cancellation: "Rescheduling permitted with 48 hours notice."
    },
    "firearm-upgrade": {
        title: "SECURITY FIREARM UPGRADE QUALIFICATION",
        category: "Multi-Weapon Endorsement",
        price: "$50.00",
        sezzle: "Pay in full or use Sezzle",
        duration: "Concurrent Range Session",
        location: "Range Facility, Chicago, IL",
        description: "For armed security officers seeking to add secondary firearm endorsements (e.g. adding semi-automatic to revolver or vice versa) to their IDFPR Tan Card.",
        curriculum: [
            "Proficiency and manual of arms on additional weapon platform",
            "Holster drawing and tactical reloading drills",
            "Live-fire qualification test on new weapon"
        ],
        prerequisites: [
            "Active or pending Armed Security Officer certification",
            "Firearm to be endorsed"
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
            <span class="modal-sezzle-note"><i class="fas fa-credit-card"></i> ${course.sezzle}</span>
        </div>

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
            <a href="tel:7738732591" class="btn-tactical-primary btn-large btn-full">
                <i class="fas fa-phone-alt"></i> Call (773) 873-2591 to Book
            </a>
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
                if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
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

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".desktop-nav .nav-item");

    window.addEventListener("scroll", () => {
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

    // Also trigger mailto in background if client allows
    const mailSubject = encodeURIComponent(`Platforms Training Academy Inquiry - ${name}`);
    const mailBody = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nCourse: ${course}\n\nMessage:\n${message}`);
    
    // Save to localStorage as a submission record
    const submissions = JSON.parse(localStorage.getItem("platforms_inquiries") || "[]");
    submissions.push({ name, phone, email, course, message, date: new Date().toISOString() });
    localStorage.setItem("platforms_inquiries", JSON.stringify(submissions));

    form.reset();

    // Scroll to feedback
    feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}
