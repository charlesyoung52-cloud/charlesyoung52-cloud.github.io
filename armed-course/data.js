// Platforms Training Academy - 28-Hour Online Armed Security Course (20-Hr Online Classroom + 8-Hr Range Qualification)
// Chicago, IL | platformstraining.com | Lead Instructor: Charles Young
// State of Illinois Firearm Control Card ("Tan Card") Certification (225 ILCS 447 / 68 Ill. Adm. Code 1240.510 / IDFPR Approved Curriculum #102-000398)

const COURSE_META = {
    title: "Online Armed Security Course",
    subtitle: "20-Hour IDFPR Armed Classroom (Curriculum #102-000398) + Included 8-Hour Eagle Sports Range Qualification",
    academy: "Platforms Training Academy",
    curriculumNumber: "102-000398",
    instructorNumber: "263-000693",
    location: "200 E 75th St, Chicago, IL 60619",
    rangeLocation: "Eagle Sports Range, 5900 W 159th St, Oak Forest, IL 60452",
    phone: "(773) 873-2591",
    website: "https://www.platformstraining.com",
    instructor: "Charles Young",
    courseHours: 20,
    rangeHours: 8,
    totalStatutoryHours: 28,
    passingScore: 75,
    totalQuestions: 50,
    passingCorrect: 38,
    maxAttempts: 2,
    examDurationSeconds: 0,
    courseGoal: "To instill uncompromising firearm safety habits, mechanical mastery of revolvers and semi-automatic duty pistols, cartridge and malfunction diagnostics, the five fundamentals of marksmanship, Illinois deadly force law (720 ILCS 5/7-1), and live-fire range readiness required for Illinois Firearm Control Card (Tan Card) certification under 68 Ill. Adm. Code 1240.510 (IDFPR Approved Curriculum #102-000398)."
};

const LESSONS_DATA = [
    {
        id: 1,
        number: "Lesson 1",
        title: "Course Administration, The 4 Cardinal Rules of Gun Safety & Safe Storage",
        duration: "2 Hours",
        icon: "shield-alt",
        summary: "Course policies and testing standards (75% passing, 2 attempts, untimed), the 4 Rules for Safe Gun Handling, root causes of firearm accidents (Ignorance vs. Carelessness), safe trigger finger indexing, and statutory firearm storage (720 ILCS 5/24-9).",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Understand Platforms Training Academy administrative safety protocols (IDFPR Approved Curriculum #102-000398) and the mandatory 75% / 2-attempt final examination standard.</li>
                    <li>Memorize and apply the 4 Cardinal Rules for Safe Gun Handling in every duty and training environment.</li>
                    <li>Distinguish between the two primary root causes of firearm accidents: <strong>Ignorance</strong> (lack of knowledge) and <strong>Carelessness</strong> (poor or improper attitude).</li>
                    <li>Demonstrate proper Safe Trigger Finger Position along the pistol frame and comply with Illinois firearm storage mandates (720 ILCS 5/24-9).</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-1">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">The Locker Room Negligent Discharge That Ended a Career Before Shift One</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>Welcome to the Platforms Training Academy 20-Hour Armed Security Course. Stepping up from an unarmed PERC guard to an armed Illinois Tan Card officer changes everything about your professional responsibility. When you strap a loaded duty pistol onto your belt on 75th Street or downtown in the Loop, there is no undo button—once a projectile leaves the muzzle at 1,150 feet per second, your training, discipline, and legal judgment are permanently attached to wherever that bullet lands.</p>
                    <p>Years ago in Cook County, a newly hired armed officer arrived fifteen minutes early for an overnight armored lobby post. Inside the employee breakroom, he unholstered his 9mm service pistol to wipe lint off the slide while chatting with the outgoing guard. He thought he had dropped the magazine first, when in reality he racked the slide with a loaded magazine still seated, dropped the magazine second, and pointed the pistol toward a drywall partition while pressing the trigger to release the striker. The live round still sitting in the chamber punched straight through two sheets of drywall and lodged into a steel locker four inches from his coworker's head.</p>
                    <p>Nobody died that night by sheer luck—but that officer lost his employment on the spot, faced Reckless Discharge of a Firearm felony charges under 720 ILCS 5/24-1.5, and had his PERC and Tan Card credentials permanently revoked by IDFPR. Notice what caused that catastrophe: it was not a mechanical defect in the firearm. It was <strong>Carelessness</strong>—a failure to apply the 4 Rules for Safe Gun Handling that he already knew on paper.</p>
                    <p>In this course, safety is never treated as a formality before the "real" tactical material begins. Safety IS the tactical foundation. Every time you touch a firearm—at home, in your duty holster, or on the firing line with me at Eagle Sports Range—all four safety rules operate together as redundant life-saving barriers.</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    Mechanical safeties can fail; human discipline cannot. Keep the muzzle pointed in a safe direction and keep your index finger high along the frame—above and away from the trigger guard—until your sights are on a lawful threat and you have made the conscious decision to shoot.
                </div>
            </div>

            <h3 id="sec1-1">1. Course Administration &amp; Classroom Safety Policy</h3>
            <p>Under the Illinois Private Detective, Private Alarm, Private Security, Fingerprint Vendor, and Locksmith Act of 2004 (<strong>225 ILCS 447</strong>) and <strong>68 Ill. Adm. Code 1240.510</strong> (<strong>IDFPR Approved Curriculum #102-000398</strong>), armed security candidates must complete <strong>20 hours of armed security classroom instruction</strong> (authorized online under Section 1240.510(a)) followed by <strong>8 hours of live-fire range training and qualification</strong> (minimum 50 rounds at Eagle Sports Range).</p>
            <ul>
                <li><strong>Zero Live Ammunition Policy in Study/Dry-Fire Areas:</strong> Whenever inspecting, dry-practicing, or studying firearm mechanics outside a live firing line, zero live ammunition is permitted in the immediate training workspace.</li>
                <li><strong>Security of Firearms:</strong> Duty firearms must remain secured in an approved retention holster or locked transport case unless explicitly instructed by a Range Safety Officer on the firing line.</li>
                <li><strong>Final Written Examination Standard:</strong> At the conclusion of all 10 online modules, you must pass an <strong>untimed 50-question comprehensive examination</strong> with a minimum score of <strong>75% (38 out of 50 correct)</strong>. You are allotted a maximum of <strong>2 attempts</strong>.</li>
            </ul>

            <h3 id="sec1-2">2. The 4 Cardinal Rules for Safe Gun Handling</h3>
            <p>Every armed security professional must internalize and obey the <strong>4 Rules for Safe Gun Handling</strong> without exception:</p>
            <ol>
                <li><strong>RULE #1 — ALWAYS KEEP THE GUN POINTED IN A SAFE DIRECTION:</strong> A "safe direction" is one in which an unintended discharge would cause zero injury to any person and minimal property damage, accounting for surface ricochets and wall penetration (drywall, glass, and hollow doors do NOT stop pistol rounds).</li>
                <li><strong>RULE #2 — ALWAYS KEEP YOUR FINGER OFF THE TRIGGER UNTIL READY TO SHOOT:</strong> Natural startle reflexes, stumbling, or sympathetic grip clenching can cause an involuntary 15-to-25-pound squeeze of the fingers. Indexing your finger outside the trigger guard prevents startle discharges.</li>
                <li><strong>RULE #3 — ALWAYS KEEP THE GUN UNLOADED UNTIL READY TO USE:</strong> Unless actively deployed for authorized armed duty or commanded to load on the firing line, firearms should remain cleared and unloaded. Never assume a gun is unloaded—personally verify the chamber visually and physically every time you pick it up.</li>
                <li><strong>RULE #4 — ALWAYS KNOW WHAT IS IN FRONT OF &amp; BEHIND YOUR TARGET:</strong> An armed officer in a crowded Chicago retail corridor, hospital lobby, or apartment complex is legally and morally accountable for every round fired. You must identify the target positively and assess both the foreground and the backstop beyond the threat.</li>
            </ol>

            <figure class="armed-slide-figure">
                <div class="armed-slide-img-wrap">
                    <img src="assets/slide_05_four_safety_rules.jpg" alt="4 Rules for Safe Gun Handling Diagram">
                </div>
                <figcaption>
                    <strong>Academy Technical Reference &bull; The 4 Rules for Safe Gun Handling</strong>
                    Visual overview of muzzle discipline, trigger finger indexing, unloaded verification, and foreground/backstop target awareness.
                </figcaption>
            </figure>

            <h3 id="sec1-3">3. Root Causes of Firearm Accidents: Ignorance vs. Carelessness</h3>
            <p>Virtually 100% of firearm "accidents" are preventable negligent events stemming from two human root causes:</p>
            <div class="callout warning">
                <strong>THE TWO ROOT CAUSES OF FIREARM ACCIDENTS:</strong>
                <ul>
                    <li><strong>1. IGNORANCE (Lack of Knowledge):</strong>
                        <ul>
                            <li>Ignorance of the Rules for Safe Gun Handling; or</li>
                            <li>Ignorance of the proper mechanical way to operate a specific pistol (e.g., not knowing whether removing a magazine clears a chambered round).</li>
                        </ul>
                    </li>
                    <li><strong>2. CARELESSNESS (Poor or Improper Attitude):</strong>
                        <ul>
                            <li>Failure to <em>apply</em> the Rules for Safe Gun Handling despite knowing them; or</li>
                            <li>Failure to safely operate a pistol due to complacency, rushing, horseplay, distraction, or overconfidence.</li>
                        </ul>
                    </li>
                </ul>
            </div>

            <h3 id="sec1-4">4. Safe Trigger Finger Position (Indexing)</h3>
            <p>With the pistol pointed in a safe direction, the shooting-hand <strong>index finger must be placed straight alongside the frame (receiver) of the pistol, high above and away from the trigger guard</strong>. Do not rest your finger on the front of the trigger guard or hover inside the guard.</p>

            <figure class="armed-slide-figure">
                <div class="armed-slide-img-wrap">
                    <img src="assets/slide_08_trigger_finger.jpg" alt="Safe Trigger Finger Position Along Frame">
                </div>
                <figcaption>
                    <strong>Academy Technical Reference &bull; Safe Trigger Finger Position</strong>
                    Keep the index finger flat along the pistol frame above and away from the trigger guard on both semi-automatic pistols and revolvers.
                </figcaption>
            </figure>

            <h3 id="sec1-5">5. Safe Pistol Storage &amp; Illinois Safe Storage Law (720 ILCS 5/24-9)</h3>
            <p>Off-duty storage of your duty weapon requires both environmental protection and strict unauthorized-access prevention:</p>
            <ul>
                <li><strong>Environmental Protection:</strong> Store firearms in a <strong>cool, dry place</strong> to prevent moisture condensation, rust, corrosion of internal springs, and lubricant degradation.</li>
                <li><strong>Access Prevention:</strong> Store firearms in a locked safe, lockbox, or mechanical locking device where <strong>children or unauthorized persons cannot access them</strong>.</li>
                <li><strong>Illinois Statutory Mandate (720 ILCS 5/24-9 — Firearms; Child Protection):</strong> Under Illinois law, it is unlawful for any person to store or leave a loaded firearm on premises under their control if they know or reasonably should know that a minor under the age of <strong>14 years</strong> (and under Illinois FOID safe-storage reporting rules, any prohibited/unauthorized person) is likely to gain access without lawful permission, unless secured by a trigger lock, locked box, or secure location. If a minor gains access and causes great bodily harm or death, the firearm owner faces criminal prosecution and catastrophic civil liability.</li>
            </ul>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Shift-Change Firearm Handover in Security Office",
            setup: "You arrive for your morning armed post at a commercial medical center. The outgoing night-shift officer removes a semi-automatic duty pistol from the company lockbox, tells you 'Don't worry, I already unloaded it last night,' and hands it toward you.",
            question: "Which immediate action adheres strictly to the 4 Rules for Safe Gun Handling and Safe Trigger Finger Position?",
            options: [
                {
                    text: "Take his word for it since he is a veteran officer, place your finger on the trigger to test the trigger pull weight, and insert the pistol directly into your holster.",
                    correct: false,
                    feedback: "INCORRECT. Trusting someone else's word and pressing the trigger without clearing the pistol exemplifies Carelessness and violates Rules #1, #2, and #3."
                },
                {
                    text: "Accept the pistol keeping the muzzle pointed in a safe direction with your index finger flat along the frame above the trigger guard, remove the magazine if present, lock the slide to the rear, and visually and physically inspect the chamber yourself.",
                    correct: true,
                    feedback: "CORRECT! Every time a firearm changes hands, you must maintain muzzle control (Rule #1), index your finger high along the frame outside the trigger guard (Rule #2), and personally verify the chamber is empty (Rule #3)."
                },
                {
                    text: "Point the pistol upward toward the occupied second-floor office ceiling and rack the slide twice rapidly with the magazine still inserted.",
                    correct: false,
                    feedback: "INCORRECT. An occupied second floor is NOT a safe direction, and racking the slide with a loaded magazine seated chambers a live cartridge rather than clearing the weapon."
                }
            ],
            illustration: "assets/slide_08_trigger_finger.jpg"
        },
        checkOnLearning: [
            {
                id: "c1_1",
                question: "When an experienced officer knows the 4 Rules for Safe Gun Handling on paper but fails to apply them due to complacency or rushing, which root cause of firearm accidents is present?",
                options: [
                    "Mechanical Tolerance Drift",
                    "Ignorance (Lack of Knowledge)",
                    "Carelessness (Poor or Improper Attitude)",
                    "Ammunition Overpressure"
                ],
                correctAnswer: "Carelessness (Poor or Improper Attitude)",
                remediationTarget: "sec1-3",
                explanation: "Ignorance is a lack of knowledge of safety rules or pistol operation, whereas Carelessness is a poor or improper attitude—failing to apply the safety rules you already know."
            },
            {
                id: "c1_2",
                question: "Where must the shooting-hand index finger be positioned whenever you are NOT actively on target and ready to fire?",
                options: [
                    "Lightly resting on the face of the trigger to save reaction time",
                    "Hooked underneath the bottom of the trigger guard",
                    "Placed straight alongside the frame of the pistol, above and away from the trigger guard",
                    "Wrapped tightly over the rear sight blade"
                ],
                correctAnswer: "Placed straight alongside the frame of the pistol, above and away from the trigger guard",
                remediationTarget: "sec1-4",
                explanation: "Safe trigger finger indexing requires keeping the index finger flat along the pistol frame, above and away from the trigger guard, until sights are aligned on target and you decide to shoot."
            },
            {
                id: "c1_3",
                question: "What are the mandatory testing parameters for the Platforms Training Academy 20-Hour Armed Security Course written exam (IDFPR Approved Curriculum #102-000398)?",
                options: [
                    "50% passing score, unlimited attempts",
                    "75% minimum passing score (38/50) with a maximum of 2 attempts",
                    "95% passing score, 1 attempt only",
                    "No written test is required prior to live-fire range qualification"
                ],
                correctAnswer: "75% minimum passing score (38/50) with a maximum of 2 attempts",
                remediationTarget: "sec1-1",
                explanation: "Per Academy and IDFPR armed training standards (IDFPR Approved Curriculum #102-000398), trainees must score at least 75% (38/50) on the 50-question written examination, with a maximum of 2 attempts."
            }
        ],
        takeaways: [
            "Memorize all 4 Rules: Safe Direction, Finger Off Trigger, Unloaded Until Ready, Know Target Front & Behind.",
            "Ignorance = Lack of Knowledge; Carelessness = Failure to Apply Rules (Poor Attitude).",
            "Index trigger finger straight along the frame, high above the trigger guard.",
            "Store firearms unloaded/secured in a cool, dry place inaccessible to children or unauthorized persons (720 ILCS 5/24-9)."
        ]
    },
    {
        id: 2,
        number: "Lesson 2",
        title: "Two-Handed Combat Grip, Thumb Placement & Tactical Shooting Stance",
        duration: "2 Hours",
        icon: "hand-paper",
        summary: "Building a repeatable high-tang two-handed pistol grip, critical thumb placement differences between revolvers and semi-automatic pistols to prevent cylinder-gap and slide-bite injuries, and the balanced, mobile tactical stance.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Establish a high, firm shooting-hand master grip with straight-to-the-rear grip pressure.</li>
                    <li>Integrate the support hand with 360-degree heel-to-heel contact to eliminate open gaps on the grip panels.</li>
                    <li>Execute the exact thumb placement difference between a <strong>Revolver</strong> (support thumb atop shooting thumb) and a <strong>Semi-Automatic Pistol</strong> (support thumb under shooting thumb).</li>
                    <li>Assume an athletic, balanced tactical stance with weight forward on the balls of the feet to absorb recoil.</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-2">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">Why Bad Thumb Placement Draws Blood on the Firing Line</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 3 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>Every weekend at Eagle Sports Range in Oak Forest, I can tell within three seconds of watching a student grip an unloaded pistol whether they paid attention in Lesson 2—or whether they learned their grip from Hollywood movies.</p>
                    <p>Two mistakes injure untrained shooters faster than anything else. First, on a semi-automatic pistol, a student crosses their support-hand thumb high over the back of the grip behind the slide. The instant that 9mm fires, the steel slide slams rearward at vicious velocity, slicing two parallel railroad tracks across the knuckle of their thumb—classic "slide bite"—while simultaneously inducing a malfunction by slowing down the reciprocating slide.</p>
                    <p>Second, a student who trained only on semi-autos picks up a .38 Special or .357 Magnum revolver and points both thumbs far forward alongside the cylinder. When a revolver fires, superheated high-pressure gas blasts sideways out of the microscopic barrel-cylinder gap like a cutting torch, searing any thumb extended next to that gap.</p>
                    <p>Grip and stance are your recoil-management chassis. When the "V" web of your shooting hand sits high up into the backstrap/beavertail, the heel of your support hand locks flush into the exposed grip panel, your thumbs sit in the proper platform-specific configuration, and your upper body leans aggressively forward from the waist with weight on the balls of your feet, the pistol tracks flat and returns right back to your sight picture for follow-up shots.</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    Revolver = Support-hand thumb lies ATOP shooting-hand thumb (away from cylinder gap). Semi-Automatic = Support-hand thumb lies UNDER shooting-hand thumb (thumbs forward, clear of reciprocating slide).
                </div>
            </div>

            <h3 id="sec2-1">1. Assuming a Two-Handed Grip — Step 1: The Shooting Hand</h3>
            <p>A consistent two-handed grip starts the moment your shooting hand makes contact with the holstered or cleared pistol:</p>
            <ul>
                <li><strong>High Backstrap Placement:</strong> Place the <strong>"V" (web) between the thumb and forefinger</strong> of your shooting hand as <strong>high as possible on the pistol backstrap</strong> (directly beneath the beavertail or frame tang). Leaving a gap below the tang increases muzzle flip because the bore axis sits higher above your wrist pivot.</li>
                <li><strong>Lower Three Fingers &amp; Base of Thumb:</strong> Grip the pistol firmly using the base of your thumb and your <strong>lower three fingers</strong> (middle, ring, and little fingers) wrapped straight around the front strap.</li>
                <li><strong>Straight Rearward Pressure:</strong> Apply grip pressure <strong>straight to the rear</strong> (front-to-back), keeping your trigger index finger indexed straight along the frame.</li>
            </ul>

            <h3 id="sec2-2">2. Assuming a Two-Handed Grip — Step 2: Adding the Support Hand</h3>
            <p>Once the shooting hand is anchored high on the backstrap, bring your support (non-shooting) hand up to complete 360-degree contact:</p>
            <ul>
                <li><strong>Wrap Support Fingers:</strong> Wrap the four fingers of your support hand firmly over the knuckles of your shooting-hand lower three fingers, snugging right underneath the trigger guard.</li>
                <li><strong>Heel-to-Heel Contact:</strong> Rotate your support wrist slightly forward (camming the wrist) and bring the <strong>heel (meat) of the support hand firmly into the exposed grip panel against the heel of the shooting hand</strong>. Friction between palm skin and textured grip panels dramatically improves recoil control.</li>
            </ul>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_09_grip_part1.jpg" alt="Assuming a Two-Handed Grip Step 1">
                    </div>
                    <figcaption>
                        <strong>Step 1 &bull; Shooting-Hand Master Grip</strong>
                        Web ("V") high on the backstrap; grip with base of thumb and lower three fingers; trigger finger indexed along frame.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_10_grip_part2.jpg" alt="Assuming a Two-Handed Grip Step 2">
                    </div>
                    <figcaption>
                        <strong>Step 2 &bull; Support-Hand Integration</strong>
                        Wrap support-hand fingers over shooting-hand fingers and press heel of support hand firmly against heel of shooting hand.
                    </figcaption>
                </figure>
            </div>

            <h3 id="sec2-3">3. Thumb Position: Revolver vs. Semi-Automatic Pistol</h3>
            <p>Because revolvers and semi-automatic pistols vent gas and cycle moving steel differently, thumb placement MUST match the platform:</p>
            <div class="callout tip">
                <strong>MANDATORY PLATFORM THUMB PLACEMENT RULES:</strong>
                <ul>
                    <li><strong>REVOLVER:</strong> The <strong>support-hand thumb lies ATOP (curled down over) the shooting-hand thumb</strong> on the side/rear of the grip. <em>Why?</em> Never extend thumbs forward near the front of a revolver cylinder where high-pressure hot gas escapes sideways from the barrel-cylinder gap!</li>
                    <li><strong>SEMI-AUTOMATIC PISTOL:</strong> The <strong>support-hand thumb is placed UNDER the shooting-hand thumb</strong>, pointing forward along the frame below the slide ("thumbs-forward" grip). <em>Why?</em> Never cross either thumb behind the rear of the slide where the reciprocating slide will lacerate your thumb ("slide bite"), and avoid pressing down or up on the slide stop lever!</li>
                </ul>
            </div>

            <figure class="armed-slide-figure">
                <div class="armed-slide-img-wrap">
                    <img src="assets/slide_11_thumb_position.jpg" alt="Thumb Position Two-Handed Grip Revolver vs Semi-Automatic">
                </div>
                <figcaption>
                    <strong>Academy Technical Reference &bull; Revolver vs. Semi-Automatic Thumb Position</strong>
                    Left: Revolver (support-hand thumb lies atop shooting-hand thumb). Right: Semi-Automatic (support-hand thumb rests under shooting-hand thumb).
                </figcaption>
            </figure>

            <h3 id="sec2-4">4. Tactical Shooting Stance</h3>
            <p>Your shooting stance must serve as a <strong>stable yet mobile platform</strong> capable of absorbing recoil and allowing rapid 360-degree movement toward cover:</p>
            <ul>
                <li><strong>Foot Placement:</strong> Feet positioned approximately <strong>shoulder-width apart</strong> (either squared or half-step staggered with support foot slightly forward).</li>
                <li><strong>Knee Flexion:</strong> <strong>Knees slightly bent</strong> (athletic shock absorbers—never lock your knees).</li>
                <li><strong>Weight Distribution:</strong> Body weight resting forward on the <strong>balls of the feet</strong> (never leaning back on your heels, where recoil or a physical shove will knock you off balance).</li>
                <li><strong>Upper Body Alignment:</strong> Upper and lower body balanced, with the <strong>upper body facing the target and leaning aggressively forward at the waist</strong> ("nose over toes").</li>
            </ul>

            <figure class="armed-slide-figure">
                <div class="armed-slide-img-wrap">
                    <img src="assets/slide_12_tactical_stance.jpg" alt="Tactical Shooting Stance Diagram">
                </div>
                <figcaption>
                    <strong>Academy Technical Reference &bull; Proper Shooting Stance</strong>
                    Feet shoulder-width apart, knees slightly bent, weight on the balls of the feet, upper body facing target and leaning aggressively forward at the waist.
                </figcaption>
            </figure>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Qualifying with Both Duty Semi-Auto and Backup Revolver",
            setup: "During armed security pre-qualification dry practice, you transition from a 9mm semi-automatic duty pistol to a .38 Special revolver. You notice your partner extending their support thumb straight forward alongside the front seam of the revolver's cylinder.",
            question: "Why must you immediately coach your partner to change their thumb position on the revolver?",
            options: [
                {
                    text: "Extending the support thumb beside a revolver's barrel-cylinder gap exposes the thumb to superheated, high-pressure propellant gases; on a revolver, the support-hand thumb must lie ATOP the shooting-hand thumb.",
                    correct: true,
                    feedback: "CORRECT! On a revolver, hot high-pressure gases escape laterally through the cylinder-barrel gap upon firing. Locking the support-hand thumb atop the shooting-hand thumb keeps digits safely behind the cylinder face."
                },
                {
                    text: "Because on a revolver, the entire top barrel slides backward three inches during recoil.",
                    correct: false,
                    feedback: "INCORRECT. Revolvers have fixed barrels that do not reciprocate rearward; semi-automatic pistols have reciprocating slides."
                },
                {
                    text: "Thumb placement makes zero difference on any handgun as long as you lean backward on your heels.",
                    correct: false,
                    feedback: "INCORRECT. Both improper thumb placement and leaning backward on your heels compromise safety and recoil control."
                }
            ],
            illustration: "assets/slide_11_thumb_position.jpg"
        },
        checkOnLearning: [
            {
                id: "c2_1",
                question: "When establishing a two-handed grip on a SEMI-AUTOMATIC pistol, where should the support-hand thumb be positioned?",
                options: [
                    "Crossed tightly behind the rear of the slide",
                    "Under the shooting-hand thumb, pointing forward along the frame",
                    "Hooked inside the trigger guard next to the index finger",
                    "Wrapped over the top of the ejection port"
                ],
                correctAnswer: "Under the shooting-hand thumb, pointing forward along the frame",
                remediationTarget: "sec2-3",
                explanation: "On a semi-automatic pistol, the support-hand thumb rests UNDER the shooting-hand thumb along the frame so neither thumb is struck by the rearward-moving slide."
            },
            {
                id: "c2_2",
                question: "Where should the shooter's body weight rest when assuming a proper shooting stance?",
                options: [
                    "Back on the heels with knees locked straight",
                    "Entirely on the outside edge of the right foot",
                    "On the balls of the feet, with knees slightly bent and upper body leaning aggressively forward at the waist",
                    "Flat-footed while leaning backward from the shoulders"
                ],
                correctAnswer: "On the balls of the feet, with knees slightly bent and upper body leaning aggressively forward at the waist",
                remediationTarget: "sec2-4",
                explanation: "A proper stance places feet shoulder-width apart, knees slightly bent, body weight on the balls of the feet, and the upper body facing the target leaning aggressively forward at the waist."
            },
            {
                id: "c2_3",
                question: "When gripping a pistol with the shooting hand, how is the 'V' between the thumb and forefinger positioned?",
                options: [
                    "Halfway down the grip so two inches of backstrap remain visible above the hand",
                    "Placed high on the pistol backstrap, gripping with the base of the thumb and lower three fingers with pressure straight to the rear",
                    "Offset to the left side of the trigger guard",
                    "Pinching only the bottom magazine baseplate"
                ],
                correctAnswer: "Placed high on the pistol backstrap, gripping with the base of the thumb and lower three fingers with pressure straight to the rear",
                remediationTarget: "sec2-1",
                explanation: "Placing the web ('V') high on the backstrap reduces muzzle flip and aligns the pistol with the forearm bones."
            }
        ],
        takeaways: [
            "Place shooting-hand 'V' high on the backstrap; apply grip pressure straight to the rear.",
            "Eliminate grip gaps: press heel of support hand firmly against heel of shooting hand.",
            "Revolver: support thumb ATOP shooting thumb. Semi-Auto: support thumb UNDER shooting thumb.",
            "Stance: feet shoulder-width, knees slightly bent, weight on balls of feet, aggressive forward waist lean."
        ]
    },
    {
        id: 3,
        number: "Lesson 3",
        title: "Pistol Types, Action Mechanisms, Revolver Anatomy & Barrel Rifling",
        duration: "2 Hours",
        icon: "cogs",
        summary: "Comparison of revolver and semi-automatic pistol platforms, Single-Action (SA), Double-Action (DA), and Double-Action-Only (DAO) trigger mechanisms, complete revolver component identification, and barrel rifling physics (lands and grooves).",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Differentiate between the two primary duty handgun types: <strong>Revolvers</strong> and <strong>Semi-Automatic Pistols</strong>.</li>
                    <li>Explain the mechanical operation of <strong>Single-Action (SA)</strong>, <strong>Double-Action (DA)</strong>, and <strong>Double-Action-Only (DAO)</strong> triggers.</li>
                    <li>Identify every external and barrel component of a revolver, including frame, action, cylinder, cylinder release latch, ejector rod, hammer spur, chamber, muzzle, and rifling.</li>
                    <li>Define <strong>rifling</strong> (spiraling lands and grooves) and explain how gyroscopic spin stabilizes a bullet in flight.</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-3">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">Knowing Your Action Type Under Adrenaline</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 3 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>Under Illinois Administrative Code 68 IAC 1240.510, your Firearm Control Card ("Tan Card") is endorsed for the specific firearm category you qualify with—and many Illinois security agencies still issue either classic Double-Action/Single-Action pistols, striker-fired pistols, or .38 Special Double-Action revolvers depending on the contract.</p>
                    <p>Why must you understand Single-Action versus Double-Action inside and out? Imagine an armed officer carrying a traditional Double-Action/Single-Action (DA/SA) pistol—like a Beretta 92 or SIG P226. That first shot out of the holster requires a long, deliberate 10-to-12-pound trigger press that both cocks AND releases the hammer. Once that first round fires and the slide cycles, the hammer stays cocked to the rear! Shot number two now breaks at a crisp, short 4.5-pound Single-Action pull. An officer who doesn't understand that transition will either yank shot one low-left or accidentally fire shot two prematurely because they didn't expect the lighter trigger—or worse, walk around with a cocked hammer without decocking safely before holstering!</p>
                    <p>Likewise, never casually thumb-cock a Double-Action duty revolver into Single-Action mode while holding a suspect at gunpoint. Reducing a 10-pound defensive trigger down to a 3-pound hair trigger during an adrenaline dump is a textbook recipe for an unintentional discharge and criminal negligence prosecution.</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    Single-Action = 1 job (releases hammer). Double-Action = 2 jobs (cocks AND releases hammer). Never manually cock a revolver hammer into hair-trigger Single-Action mode during a defensive encounter.
                </div>
            </div>

            <h3 id="sec3-1">1. Pistol Types &amp; The Three Pistol Action Types</h3>
            <p>Handguns used in private security fall into two primary mechanical designs—<strong>Revolvers</strong> (housing cartridges in a revolving multi-chamber cylinder) and <strong>Semi-Automatic Pistols</strong> (feeding cartridges from a removable box magazine into a single barrel chamber)—and operate via three distinct action types:</p>
            <ul>
                <li><strong>1. SINGLE-ACTION (SA):</strong> Each pull of the trigger performs only a <strong>single mechanical action: releasing the hammer</strong> (or striker). Because pulling the trigger cannot cock the hammer, the <strong>hammer must be manually cocked prior to the first shot</strong> (subsequent shots on a SA semi-auto are cocked automatically by the reciprocating slide).</li>
                <li><strong>2. DOUBLE-ACTION (DA / DA-SA):</strong> Pulling the trigger performs <strong>two actions: it both cocks AND releases the hammer</strong>. On a traditional DA/SA semi-automatic pistol, the initial shot uses a long, heavier Double-Action trigger pull to cock and release the hammer, and <strong>each subsequent shot fires in Single-Action mode</strong> after the slide cocks the hammer. On a DA revolver, the shooter normally fires every shot via the full Double-Action pull.</li>
                <li><strong>3. DOUBLE-ACTION-ONLY (DAO):</strong> <strong>Every pull of the trigger both cocks and releases the hammer</strong> with a consistent long trigger stroke, and the firearm <strong>CANNOT be fired in Single-Action mode</strong> (hammer spur is bobbed/internal or un-cockable). Many security agencies favor DAO or consistent striker systems so every shot feels identical under stress.</li>
            </ul>

            <h3 id="sec3-2">2. Revolver Major Groups &amp; External Components</h3>
            <p>Every revolver is organized into three major component groups—<strong>Frame</strong>, <strong>Barrel</strong>, and <strong>Action</strong>—plus its revolving <strong>Cylinder</strong>:</p>
            <ul>
                <li><strong>Frame:</strong> The structural backbone housing the grip panels, front strap, backstrap, and trigger guard, to which the barrel and cylinder crane attach.</li>
                <li><strong>Action (Contained Within Frame):</strong> The internal mechanical linkage (trigger, hammer, mainspring, hand/pawl, cylinder stop) that rotates the cylinder, cocks the hammer, and fires the cartridge.</li>
                <li><strong>Cylinder:</strong> The rotating steel drum containing multiple individual firing <strong>chambers</strong> (typically 5, 6, or 7 rounds) that index sequentially in line with the barrel.</li>
                <li><strong>Cylinder Release Latch:</strong> Thumb latch on the left side of the frame pushed/pulled/pressed (depending on manufacturer: Smith &amp; Wesson pushes forward, Colt pulls rearward, Ruger presses inward) to swing the cylinder open for loading or clearing.</li>
                <li><strong>Ejector Rod:</strong> Rod projecting from the front center of the cylinder; pressing it rearward with the cylinder swung open extracts spent brass cases or live rounds simultaneously.</li>
                <li><strong>Hammer &amp; Hammer Spur:</strong> Pivoting steel striker block driven forward by the mainspring to ignite the cartridge primer.</li>
                <li><strong>Front Sight &amp; Rear Sight:</strong> Iron aiming references mounted atop the barrel muzzle and topstrap of the frame.</li>
            </ul>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_18_revolver_parts1.jpg" alt="Revolver Major Groups: Barrel, Frame, Action">
                    </div>
                    <figcaption>
                        <strong>Revolver Anatomy (Part 1) &bull; Major Groups</strong>
                        Barrel, Frame, and internal Action contained within the frame.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_19_revolver_parts2.jpg" alt="Revolver Sight and Grip Components">
                    </div>
                    <figcaption>
                        <strong>Revolver Anatomy (Part 2) &bull; Sights &amp; Grip Frame</strong>
                        Front sight, rear sight, trigger guard, front strap, backstrap, and grip panels.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_20_revolver_parts3.jpg" alt="Revolver Operating Controls">
                    </div>
                    <figcaption>
                        <strong>Revolver Anatomy (Part 3) &bull; Operating Controls</strong>
                        Cylinder, ejector rod, cylinder release latch, hammer, hammer spur, and trigger.
                    </figcaption>
                </figure>
            </div>

            <h3 id="sec3-3">3. Parts of a Revolver Barrel &amp; Rifling Physics</h3>
            <p>Notice an important mechanical distinction on a revolver: <strong>on a revolver, the firing chambers are bored into the revolving cylinder rather than integrally into the rear of the barrel</strong>. As the bullet exits the cylinder chamber, it jumps the tiny cylinder gap into the forcing cone of the barrel, travels down the rifled bore, and exits the <strong>muzzle</strong>.</p>
            <div class="callout tip">
                <strong>WHAT IS RIFLING? (LANDS &amp; GROOVES):</strong>
                <p><strong>Rifling</strong> consists of <strong>spiraling raised ridges (LANDS) and recessed channels (GROOVES)</strong> machined inside the barrel bore. As expanding gas drives the bullet through the bore, the lands engrave into the bullet jacket and impart rapid gyroscopic <strong>spin</strong>—just like a tightly thrown football spiral—stabilizing the bullet nose-forward in flight for accuracy. (In forensic ballistics, pistol caliber diameter is measured across opposing lands, and rifling striations leave unique microscopic markings on every fired bullet.)</p>
            </div>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_21_revolver_barrel.jpg" alt="Parts of a Revolver Barrel">
                    </div>
                    <figcaption>
                        <strong>Revolver Barrel &amp; Cylinder Alignment</strong>
                        Cylinder chamber, barrel bore with rifling, front sight, and muzzle.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_22_rifling.jpg" alt="Barrel Rifling Lands and Grooves">
                    </div>
                    <figcaption>
                        <strong>Internal Ballistics &bull; Barrel Rifling</strong>
                        Spiraling raised Lands and cut Grooves engrave the bullet to impart stabilizing spin through the bore.
                    </figcaption>
                </figure>
            </div>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Inspecting an Agency-Issued Duty Revolver",
            setup: "Your security supervisor issues you a 6-shot .38 Special revolver that has a bobbed (spurless) hammer and informs you it is a Double-Action-Only (DAO) duty firearm.",
            question: "What happens mechanically each time you press the trigger on this Double-Action-Only firearm?",
            options: [
                {
                    text: "Nothing happens unless you pry the hammer back manually with a tool before every shot.",
                    correct: false,
                    feedback: "INCORRECT. That describes a broken firearm or misunderstanding of Single-Action. A DAO firearm cannot and need not be manually cocked."
                },
                {
                    text: "Each pull of the trigger performs two mechanical functions—it both cocks AND releases the hammer (while rotating the cylinder)—and the pistol cannot be fired in Single-Action mode.",
                    correct: true,
                    feedback: "CORRECT! On a Double-Action-Only (DAO) pistol, every pull of the trigger both cocks and releases the hammer with a consistent stroke, and Single-Action mode is mechanically eliminated."
                },
                {
                    text: "A single press of the trigger fires all six chambers simultaneously in automatic burst mode.",
                    correct: false,
                    feedback: "INCORRECT. Firing more than one round per single function of the trigger defines an illegal/regulated machine gun, not a DAO handgun."
                }
            ],
            illustration: "assets/slide_20_revolver_parts3.jpg"
        },
        checkOnLearning: [
            {
                id: "c3_1",
                question: "On a traditional Double-Action (DA/SA) semi-automatic pistol, how do the first shot and subsequent shots differ?",
                options: [
                    "The first shot is Single-Action and all subsequent shots are Double-Action",
                    "The initial long, heavy trigger pull both cocks and releases the hammer, and each subsequent shot is fired in Single-Action mode after the slide cycles",
                    "The shooter must manually thumb-cock the hammer after every shot",
                    "The trigger weight doubles after every round fired"
                ],
                correctAnswer: "The initial long, heavy trigger pull both cocks and releases the hammer, and each subsequent shot is fired in Single-Action mode after the slide cycles",
                remediationTarget: "sec3-1",
                explanation: "In a DA/SA semi-automatic pistol, the initial trigger pull both cocks and releases the hammer (Double-Action), while the reciprocating slide cocks the hammer for Single-Action follow-up shots."
            },
            {
                id: "c3_2",
                question: "Which revolver component is pressed rearward after swinging the cylinder open to push spent cartridge cases out of the chambers?",
                options: [
                    "Takedown Lever",
                    "Slide Stop",
                    "Ejector Rod",
                    "Front Strap"
                ],
                correctAnswer: "Ejector Rod",
                remediationTarget: "sec3-2",
                explanation: "Pressing the Ejector Rod (located at the front center of the cylinder) actuates the extractor star to eject spent cases or live rounds from the revolver cylinder."
            },
            {
                id: "c3_3",
                question: "What is the purpose of RIFLING (spiraling lands and grooves) inside a pistol barrel?",
                options: [
                    "To slow the bullet down so it makes less noise",
                    "To engrave the bullet and impart stabilizing gyroscopic spin as it travels through the bore",
                    "To trap unburned gunpowder inside the chamber",
                    "To allow any caliber of ammunition to fit the same barrel"
                ],
                correctAnswer: "To engrave the bullet and impart stabilizing gyroscopic spin as it travels through the bore",
                remediationTarget: "sec3-3",
                explanation: "Rifling consists of spiraling raised lands and recessed grooves that engrave the bullet and spin it rapidly for aerodynamic stability and accuracy."
            }
        ],
        takeaways: [
            "Single-Action (SA) = releases hammer only; Double-Action (DA) = cocks AND releases hammer; DAO = cannot fire in SA.",
            "Know every revolver part: Frame, Action, Barrel, Cylinder, Cylinder Release Latch, Ejector Rod, Hammer/Spur.",
            "Rifling = spiraling raised Lands and recessed Grooves that spin and stabilize the bullet."
        ]
    },
    {
        id: 4,
        number: "Lesson 4",
        title: "Semi-Automatic Pistol Anatomy, Barrel Locking Lugs & The 3 Slide Functions",
        duration: "2 Hours",
        icon: "sliders-h",
        summary: "Detailed anatomy of modern duty semi-automatic pistols (slide, frame, barrel, ejection port, slide stop, magazine release, takedown lever, safety, beavertail), integral barrel chamber & locking lugs, and the 3 mechanical functions of the reciprocating slide.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Identify all major assemblies and external controls on a duty semi-automatic pistol.</li>
                    <li>Contrast semi-automatic barrel construction (integral <strong>chamber</strong> and <strong>locking lugs</strong>) against revolver barrels.</li>
                    <li>Recite the <strong>3 mechanical functions of a semi-automatic slide</strong> during every firing cycle.</li>
                    <li>Understand why magazine removal alone NEVER guarantees an empty chamber on a semi-automatic pistol.</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-4">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">Mastering the Machine That Protects Your Life</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 3 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>Over 90% of Illinois armed security officers qualify with and carry a modern 9mm semi-automatic pistol—whether a Glock 17/19, Smith &amp; Wesson M&amp;P, SIG Sauer P320, or Springfield XD. Yet if you ask an untrained shooter what actually happens in the 60 milliseconds after they press the trigger, most have no idea.</p>
                    <p>Understanding how your slide, locking lugs, extractor, ejector, magazine spring, and slide stop work together is not trivia for gunsmiths—it is how you diagnose and fix a stoppage in the middle of a lethal-force fight without looking down in confusion. For example, when your slide locks open to the rear during a string of fire, is your gun jammed, or did the empty magazine follower push up the <strong>slide stop</strong> to tell you it's time for an emergency reload? Conversely, if your high thumb accidentally rides on top of that slide stop lever during recoil, your pistol will fail to lock back on an empty magazine—leaving you pressing a dead trigger when you need a reload most.</p>
                    <p>Study the diagrams in this module until you can point to every lever, port, and lug blindfolded. On range day, when I say "lock your slide to the rear and show me clear," your hands will move with calm, professional certainty.</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    Every time a semi-auto fires, the reciprocating slide performs 3 jobs: (1) Extracts &amp; ejects the spent case, (2) Cocks the hammer or striker/firing pin, and (3) Feeds the top cartridge from the magazine into the chamber.
                </div>
            </div>

            <h3 id="sec4-1">1. Semi-Automatic Pistol Major Groups &amp; External Controls</h3>
            <p>A semi-automatic ("autoloading") pistol harnesses recoil energy to cycle the action automatically for each shot, firing <strong>one round per single press of the trigger</strong>:</p>
            <ul>
                <li><strong>Frame (Receiver):</strong> Lower polymer or metal chassis housing the trigger group, grip panels/front strap/backstrap, <strong>beavertail</strong> (rear frame tang protecting the hand from slide bite), trigger guard, and magazine well.</li>
                <li><strong>Action (Slide &amp; Internal Parts):</strong> The reciprocating steel <strong>slide</strong> riding on frame rails, containing the firing pin/striker, extractor, recoil spring assembly, and <strong>ejection port</strong>.</li>
                <li><strong>Barrel (Inside of Slide):</strong> Houses the integral chamber, locking lugs, rifled bore, and muzzle.</li>
                <li><strong>Magazine &amp; Magazine Release:</strong> Removable spring-loaded box storing cartridges vertically; pressing the <strong>magazine release</strong> button drops the magazine out of the grip well.</li>
                <li><strong>Slide Stop (Slide Lock Lever):</strong> Pushed upward automatically by the magazine follower after the last round is fired to lock the slide open; also used manually to lock the slide rearward when clearing the pistol.</li>
                <li><strong>Takedown Lever:</strong> Mechanical latch rotated or pulled down—ONLY after verifying the pistol is completely unloaded—to field-strip the slide assembly from the frame for cleaning.</li>
                <li><strong>Safety (Thumb / Grip / Trigger Safety):</strong> Mechanical block designed to inhibit unintended firing (note: mechanical safeties supplement—never replace—Rule #1 and Rule #2!).</li>
            </ul>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_24_semiauto_parts1.jpg" alt="Semi-Automatic Pistol Major Groups">
                    </div>
                    <figcaption>
                        <strong>Semi-Auto Anatomy (Part 1) &bull; Major Assemblies</strong>
                        Action (slide &amp; internal parts), Barrel (inside slide), Frame, and protective Beavertail.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_25_semiauto_parts2.jpg" alt="Semi-Automatic Pistol Sights, Grip & Ejection Port">
                    </div>
                    <figcaption>
                        <strong>Semi-Auto Anatomy (Part 2) &bull; Sights, Ejection Port &amp; Grip</strong>
                        Front sight, rear sight, ejection port, trigger guard, front strap, backstrap, and grip panels.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_26_semiauto_parts3.jpg" alt="Semi-Automatic Pistol Operating Controls">
                    </div>
                    <figcaption>
                        <strong>Semi-Auto Anatomy (Part 3) &bull; Controls &amp; Magazine</strong>
                        Slide, slide stop, takedown lever, safety, hammer/spur, trigger, magazine release, and magazine.
                    </figcaption>
                </figure>
            </div>

            <h3 id="sec4-2">2. Parts of a Semi-Automatic Pistol Barrel</h3>
            <p>Unlike a revolver (where chambers sit inside the cylinder), a semi-automatic pistol barrel contains four critical integrated features:</p>
            <ol>
                <li><strong>Chamber:</strong> The enlarged rear section of the barrel machined to the exact dimensions of a single cartridge where ignition occurs.</li>
                <li><strong>Locking Lugs / Chamber Hood:</strong> Precision steel lugs on the barrel that lock into matching recesses inside the slide (or ejection port) at the moment of firing, keeping the breech safely locked until chamber pressure drops to a safe level.</li>
                <li><strong>Rifling:</strong> Spiraling lands and grooves inside the bore that spin-stabilize the projectile.</li>
                <li><strong>Muzzle:</strong> The forward exit crown of the barrel—the final point of contact with the bullet, which must be protected from dents or nicks to preserve accuracy.</li>
            </ol>

            <figure class="armed-slide-figure">
                <div class="armed-slide-img-wrap">
                    <img src="assets/slide_27_semiauto_barrel.jpg" alt="Parts of a Semi-Automatic Pistol Barrel">
                </div>
                <figcaption>
                    <strong>Academy Technical Reference &bull; Semi-Automatic Barrel Components</strong>
                    Integral Chamber, Locking Lugs, internal Rifling, and Muzzle crown.
                </figcaption>
            </figure>

            <h3 id="sec4-3">3. The 3 Mechanical Functions of a Semi-Automatic Slide</h3>
            <div class="callout warning">
                <strong>MEMORIZE THE 3 FUNCTIONS OF A SEMI-AUTOMATIC SLIDE:</strong>
                <p>When a cartridge fires (or when the shooter manually racks the slide completely to the rear and releases it), the slide performs three sequential mechanical functions:</p>
                <ol>
                    <li><strong>Rearward Stroke — EXTRACTING &amp; EJECTING:</strong> Extracts the fired (or chambered) case from the chamber via the extractor claw and ejects it clear of the pistol through the ejection port.</li>
                    <li><strong>Rearward Stroke — COCKING:</strong> Cocks the external hammer or resets/cocks the internal firing pin / striker mechanism.</li>
                    <li><strong>Forward Stroke — FEEDING &amp; CHAMBERING:</strong> Driven forward by the compressed recoil spring, strips and feeds the top cartridge from the magazine up the feed ramp into the barrel chamber, locking into battery.</li>
                </ol>
            </div>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Racking the Slide While Riding It Forward",
            setup: "On the range, a fellow student inserts a loaded 10-round magazine into their semi-automatic pistol, pulls the slide back halfway, and keeps their hand gripping the slide to 'ease it gently forward' instead of pulling all the way back and releasing it cleanly. The pistol stops out of battery.",
            question: "Based on the 3 functions of a semi-automatic slide, why did easing ('riding') the slide forward cause a stoppage?",
            options: [
                {
                    text: "The compressed recoil spring needs its full forward velocity—unimpeded by the shooter's hand—to strip the top cartridge from the magazine, feed it up the ramp into the chamber, and lock the barrel locking lugs into battery.",
                    correct: true,
                    feedback: "CORRECT! Pull the slide briskly all the way to its rear stop and release it cleanly ('slingshot' or overhand release) so the recoil spring drives the slide forward with full force to feed and lock into battery."
                },
                {
                    text: "Semi-automatic slides only move forward when you pull the trigger twice rapidly.",
                    correct: false,
                    feedback: "INCORRECT. Pulling the trigger never closes an out-of-battery slide; the recoil spring drives the slide forward."
                },
                {
                    text: "Because semi-automatic barrels do not have chambers or locking lugs.",
                    correct: false,
                    feedback: "INCORRECT. Semi-automatic barrels feature both an integral chamber and locking lugs that lock into the slide."
                }
            ],
            illustration: "assets/slide_26_semiauto_parts3.jpg"
        },
        checkOnLearning: [
            {
                id: "c4_1",
                question: "Which of the following accurately lists all THREE mechanical functions performed by a semi-automatic pistol slide during cycling?",
                options: [
                    "Spinning the cylinder, cooling the barrel, and engaging the thumb safety",
                    "Extracting & ejecting the fired case, cocking the hammer or firing pin, and feeding the top cartridge from the magazine into the chamber",
                    "Weighing the magazine, adjusting the rear sight, and polishing the feed ramp",
                    "Releasing the magazine onto the floor after every shot"
                ],
                correctAnswer: "Extracting & ejecting the fired case, cocking the hammer or firing pin, and feeding the top cartridge from the magazine into the chamber",
                remediationTarget: "sec4-3",
                explanation: "During rearward and forward travel, the slide (1) extracts and ejects the case, (2) cocks the hammer or firing pin, and (3) feeds the top cartridge from the magazine into the chamber."
            },
            {
                id: "c4_2",
                question: "Which barrel feature is found on a locked-breech semi-automatic pistol barrel to lock the barrel and slide together during peak firing pressure?",
                options: [
                    "Ejector Rod",
                    "Cylinder Release Latch",
                    "Locking Lugs",
                    "Grip Panels"
                ],
                correctAnswer: "Locking Lugs",
                remediationTarget: "sec4-2",
                explanation: "Semi-automatic barrels feature an integral chamber, locking lugs, rifling, and muzzle. The locking lugs mate with the slide until pressure drops safely."
            },
            {
                id: "c4_3",
                question: "What protects the web of the shooter's hand from being pinched or cut by the rearward-moving slide on a semi-automatic pistol?",
                options: [
                    "The Front Sight",
                    "The Beavertail (rear frame tang)",
                    "The Magazine Baseplate",
                    "The Muzzle Crown"
                ],
                correctAnswer: "The Beavertail (rear frame tang)",
                remediationTarget: "sec4-1",
                explanation: "The beavertail extends rearward at the top of the backstrap, allowing a high grip while shielding the web of the hand from the reciprocating slide."
            }
        ],
        takeaways: [
            "Master every semi-auto control: Slide, Ejection Port, Slide Stop, Magazine Release, Takedown Lever, Safety.",
            "Semi-auto barrel = integral Chamber + Locking Lugs + Rifling + Muzzle.",
            "3 Slide Functions: (1) Extract & Eject case, (2) Cock hammer/firing pin, (3) Feed top round into chamber."
        ]
    },
    {
        id: 5,
        number: "Lesson 5",
        title: "Clearing a Pistol, Duty Holster Draw, Weapon Retention, Workspace Reloads & Cleaning",
        duration: "2 Hours",
        icon: "sync-alt",
        summary: "Mandatory 3-step sequence for clearing a semi-automatic pistol, revolver unloading procedure, 4-count duty retention holster draw, weapon retention fundamentals (68 IAC 1240.510), loading/reloading from the Workspace (Tactical vs. Emergency Reloads), and safe disassembly/cleaning.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Execute the exact 3-step sequence for <strong>Clearing a Semi-Automatic Pistol</strong> (Remove Magazine FIRST, Extract/Lock Slide SECOND, Visually &amp; Physically Inspect Chamber THIRD).</li>
                    <li>Perform a safe 4-step presentation from an active-retention duty holster and apply weapon retention counter-disarm principles mandated by <strong>68 Ill. Adm. Code 1240.510(a)(2)</strong>.</li>
                    <li>Conduct loading and reloading inside your high-chest <strong>Workspace</strong> to preserve situational awareness.</li>
                    <li>Distinguish between a <strong>Tactical Reload</strong> (retaining a partially empty magazine) and an <strong>Emergency Reload</strong> (dropping an empty/depleted magazine to get back in the fight immediately), plus safe field-stripping rules.</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-5">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">Sequence Saves Lives: Magazine Out FIRST, Slide Back SECOND</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>Remember the locker room negligent discharge from Lesson 1? Let's break down the exact mechanical mistake that caused it—because reversing Step 1 and Step 2 when clearing a semi-automatic pistol is the single most common cause of negligent discharges during administrative gun handling and pistol cleaning across law enforcement and private security nationwide.</p>
                    <p>If you rack the slide FIRST while a loaded magazine is still inside the grip, yes, the chambered round flips out onto the floor—giving your brain the false visual signal that you just emptied the gun. In reality, as that slide snaps forward, Slide Function #3 strips a brand-new live cartridge out of the magazine and locks it silently into the chamber! If you then drop the magazine SECOND and pull the trigger—as required before field-stripping striker-fired pistols like a Glock—<strong>BOOM</strong>.</p>
                    <p>Graveyard-proof your habit right now: <strong>Source of ammunition comes out FIRST</strong>. Press the magazine release and completely remove the magazine. SECOND, pull the slide to the rear to extract any chambered round and lock the slide open using the slide stop. THIRD, look with your eyes AND feel with your pinky finger (in low light) that both the chamber and the magazine well are 100% empty. Only then is a pistol clear—especially before disassembly and cleaning.</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    NEVER reverse the clearing sequence: (1) Remove Magazine FIRST, (2) Rack &amp; Lock Slide Rearward to Extract Chambered Round SECOND, (3) Visually &amp; Physically Verify Empty Chamber &amp; Magwell THIRD.
                </div>
            </div>

            <h3 id="sec5-1">1. Mandatory Procedure for Clearing a Pistol</h3>
            <p>With the muzzle pointed in a safe direction (Rule #1) and your index finger indexed high along the frame (Rule #2):</p>
            <div class="callout warning">
                <strong>THE 3-STEP SEMI-AUTOMATIC CLEARING SEQUENCE:</strong>
                <ol>
                    <li><strong>STEP 1 — REMOVE THE MAGAZINE FIRST:</strong> Depress the magazine release button and physically remove the magazine from the grip well so no fresh cartridges can be fed into the chamber.</li>
                    <li><strong>STEP 2 — EXTRACT ROUND FROM CHAMBER &amp; LOCK SLIDE OPEN:</strong> Rack the slide briskly to the rear to extract and eject any cartridge in the chamber, and engage the slide stop upward to lock the slide open.</li>
                    <li><strong>STEP 3 — VISUALLY &amp; PHYSICALLY ENSURE CHAMBER IS CLEAR:</strong> Look directly through the open ejection port into the barrel chamber AND down the magazine well (supplemented by a physical tactile check in low light) to confirm zero ammunition remains.</li>
                </ol>
                <p style="margin-top:8px;margin-bottom:0;"><em>Clearing a Revolver:</em> Point in a safe direction, finger off trigger, actuate the cylinder release latch, swing the cylinder out, tilt muzzle slightly upward/safe while pressing the ejector rod to dump all cartridges, and visually count every empty chamber in the cylinder.</p>
            </div>

            <figure class="armed-slide-figure">
                <div class="armed-slide-img-wrap">
                    <img src="assets/slide_30_clearing_pistol.jpg" alt="3-Step Sequence for Clearing a Semi-Automatic Pistol">
                </div>
                <figcaption>
                    <strong>Academy Technical Reference &bull; Clearing a Semi-Automatic Pistol</strong>
                    Left: (1) Remove Magazine first. Center: (2) Rack slide to extract chambered round. Right: (3) Visually ensure chamber is clear.
                </figcaption>
            </figure>

            <h3 id="sec5-2">2. Drawing from a Duty Holster &amp; Weapon Retention (68 IAC 1240.510)</h3>
            <p>Uniformed armed security officers carry openly in a <strong>Level II or Level III active-retention duty holster</strong> designed to prevent suspect gun-grabs. Never "bowling-ball swing" or sweep your own leg/support hand during the draw:</p>
            <ol>
                <li><strong>Count 1 — Grip &amp; Defeat Retention:</strong> Establish a high shooting-hand master grip in the holster while deactivating hood/thumb retention levers; simultaneously bring your support hand flat to your chest/sternum (safely out of the muzzle path so you never sweep your own hand!).</li>
                <li><strong>Count 2 — Clear Leather Straight Up:</strong> Draw the pistol straight vertically out of the holster with trigger finger indexed along the frame.</li>
                <li><strong>Count 3 — Rotate &amp; Marry Hands at Chest:</strong> Rotate the muzzle downrange toward the threat at chest height and join both hands into your full two-handed grip.</li>
                <li><strong>Count 4 — Drive Out to Sight Picture:</strong> Punch the pistol straight out to eye level, acquiring front sight focus; place finger on trigger ONLY if deadly force remains legally justified. <em>Re-holstering:</em> Reverse slowly and deliberately—there is NEVER a race back into the holster; look/clear shirt garments away from the trigger guard before seating.</li>
            </ol>
            <p><strong>Weapon Retention Fundamentals:</strong> Per FBI Law Enforcement Officers Killed and Assaulted (LEOKA) data, a high percentage of officers feloniously shot are killed with their own firearm after losing a close-quarters disarm struggle. Maintain <strong>reactionary distance (6+ feet)</strong>, blade your weapon hip ("gun side back") during interviews, and if an attacker grabs your holstered pistol: <strong>clamp down hard with both hands to trap the weapon in the holster</strong>, drop your center of gravity, pivot/turn away from the grab to shear their wrist grip, and create distance.</p>

            <h3 id="sec5-3">3. Loading &amp; Reloading From Your "Workspace"</h3>
            <p>Never stare down at your beltline or waist while loading or reloading—looking at the floor blinds you to a moving threat and causes balance loss. Instead, bring the pistol in close at <strong>chin/upper-chest height slightly below eye level—known as your "Workspace."</strong></p>
            <ul>
                <li><strong>Why the Workspace Works:</strong> Holding the pistol 10–14 inches in front of your chin lets you align the magazine into the magwell using peripheral vision while keeping your head upright and eyes scanning downrange toward the threat environment.</li>
                <li><strong>TACTICAL RELOAD (Proactive / Behind Cover):</strong> Reloading a pistol that still has a <strong>partially empty magazine (with a live round still in the chamber) AND RETAINING that partially full magazine</strong> in a pocket or pouch during a lull in action so you never discard reserve ammunition you might need later.</li>
                <li><strong>EMERGENCY RELOAD (Speed / Combat Reload):</strong> Executed immediately when your pistol runs dry (slide locked back) or ammunition is critically depleted under active threat—<strong>dropping the empty (or partially empty) magazine straight to the ground WITHOUT retaining it</strong>, inserting a fresh full magazine inside your Workspace, and releasing/racking the slide forward to return fire immediately.</li>
            </ul>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_32_workspace_reload.jpg" alt="Loading and Reloading from the Workspace">
                    </div>
                    <figcaption>
                        <strong>Academy Technical Reference &bull; Loading &amp; Reloading in the Workspace</strong>
                        Keep the pistol up in your upper-chest Workspace so peripheral vision guides the magazine while eyes stay toward the threat.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_34_disassembly_cleaning.jpg" alt="Pistol Disassembly and Cleaning">
                    </div>
                    <figcaption>
                        <strong>Academy Technical Reference &bull; Safe Pistol Disassembly &amp; Cleaning</strong>
                        Ensure pistol is 100% clear with zero live ammo in the room before following the manufacturer's disassembly procedure.
                    </figcaption>
                </figure>
            </div>

            <h3 id="sec5-4">4. Safe Pistol Disassembly &amp; Routine Duty Maintenance</h3>
            <p>Sweat, lint, rain, carbon fouling, and unburned powder accumulate inside a duty firearm every week, even if unfired. Before cleaning:</p>
            <ul>
                <li><strong>Rule #1 of Cleaning:</strong> Remove all live ammunition and loaded magazines to a separate room, then <strong>clear the pistol completely</strong> (mag out, rack slide, visual &amp; tactile chamber check) BEFORE touching any takedown lever or trigger.</li>
                <li><strong>Manufacturer Field-Strip Only:</strong> Follow the exact field-strip procedure in the owner's manual for your specific firearm (slide, barrel, recoil spring assembly, frame). Never detail-strip internal sear/trigger pins unless certified as an armorer.</li>
                <li><strong>Solvent &amp; Light Lubrication:</strong> Scrub bore and breechface from chamber-to-muzzle where possible, wipe dry, apply only light drops of firearm oil to frame/slide rails and barrel hood friction points (excess oil attracts grit and can contaminate primers!), reassemble, and function-check unloaded.</li>
            </ul>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Slide Locks Open Mid-Engagement vs. Lull Behind Cover",
            setup: "Scenario A: You are firing on the qualification line and your pistol slide locks open on an empty magazine while time is running. Scenario B: An active threat retreats out of view while you move behind a concrete pillar with only 3 rounds left in your 15-round magazine.",
            question: "Which reload type applies to Scenario A versus Scenario B, and where in space should both reloads be performed?",
            options: [
                {
                    text: "Scenario A uses an Emergency Reload (drop empty magazine immediately without retaining it and insert a full magazine); Scenario B uses a Tactical Reload (swap in a full magazine while retaining the partially full magazine)—both performed up high in your Workspace.",
                    correct: true,
                    feedback: "CORRECT! Emergency reloads prioritize immediate speed by jettisoning the empty magazine; Tactical reloads top off the gun during a lull behind cover while retaining the partially loaded magazine—both inside the upper-chest Workspace."
                },
                {
                    text: "Both reloads require bending at the waist and staring at your boots while holding the gun down by your knees.",
                    correct: false,
                    feedback: "INCORRECT. Reloading low by your waist forces your eyes off the threat environment; always reload inside your high-chest Workspace."
                },
                {
                    text: "Throw the entire unloaded pistol away in Scenario A and wait 30 minutes before reloading.",
                    correct: false,
                    feedback: "INCORRECT. Never discard or abandon a duty firearm."
                }
            ],
            illustration: "assets/slide_32_workspace_reload.jpg"
        },
        checkOnLearning: [
            {
                id: "c5_1",
                question: "What is the MANDATORY FIRST STEP when clearing a semi-automatic pistol?",
                options: [
                    "Pull the trigger to see if the chamber is loaded",
                    "Remove the magazine FIRST before racking the slide",
                    "Rotate the takedown lever while a loaded magazine is inserted",
                    "Look down the front of the muzzle"
                ],
                correctAnswer: "Remove the magazine FIRST before racking the slide",
                remediationTarget: "sec5-1",
                explanation: "Always remove the magazine FIRST, then rack and lock the slide to extract any chambered cartridge, and finally visually/physically verify the chamber is empty."
            },
            {
                id: "c5_2",
                question: "What defines a TACTICAL RELOAD as opposed to an Emergency Reload?",
                options: [
                    "Dropping an empty magazine onto concrete when the slide locks back",
                    "Reloading a platform that has a partially empty magazine and RETAINING that partially loaded magazine",
                    "Loading loose gunpowder directly into the barrel muzzle",
                    "Cleaning the barrel with solvent between shots"
                ],
                correctAnswer: "Reloading a platform that has a partially empty magazine and RETAINING that partially loaded magazine",
                remediationTarget: "sec5-3",
                explanation: "A Tactical Reload replaces a partially depleted magazine with a fresh full magazine while retaining the partially loaded magazine for reserve use."
            },
            {
                id: "c5_3",
                question: "Why must loading and reloading be performed inside your 'Workspace' (upper chest/chin level)?",
                options: [
                    "Because firearm warranties are voided if reloaded below waist height",
                    "It keeps the pistol in your peripheral vision for smooth magazine insertion while allowing your head and eyes to remain upright scanning downrange",
                    "Because gravity prevents magazines from seating below shoulder height",
                    "Only revolvers use a workspace"
                ],
                correctAnswer: "It keeps the pistol in your peripheral vision for smooth magazine insertion while allowing your head and eyes to remain upright scanning downrange",
                remediationTarget: "sec5-3",
                explanation: "Working in the high-chest Workspace preserves situational awareness of threats while maximizing fine-motor control."
            }
        ],
        takeaways: [
            "Clear Semi-Auto: (1) Remove Magazine FIRST, (2) Extract & Lock Slide SECOND, (3) Visually/Physically Check Chamber THIRD.",
            "Load & Reload in your high-chest Workspace so eyes stay up on the environment.",
            "Tactical Reload = swap partially empty mag & RETAIN it; Emergency Reload = drop empty mag & insert full mag fast.",
            "Verify pistol is 100% clear with zero live ammo in the room BEFORE disassembly/cleaning."
        ]
    },
    {
        id: 6,
        number: "Lesson 6",
        title: "Ammunition Anatomy, Rimfire vs. Centerfire, Firing Sequence, Headstamps & +P Loads",
        duration: "2 Hours",
        icon: "dot-circle",
        summary: "The 4 components of a modern metallic cartridge, Rimfire vs. Centerfire ignition design, the 6-step internal firing sequence, matching barrel/headstamp/box caliber designations, +P and +P+ high-pressure warnings, and safe ammunition storage.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Identify all <strong>4 components of a metallic cartridge</strong>: Case, Primer, Powder Charge (propellant), and Bullet (projectile).</li>
                    <li>Contrast <strong>Rimfire</strong> cartridges against <strong>Centerfire</strong> duty cartridges.</li>
                    <li>Trace the complete <strong>6-Step Cartridge Firing Sequence</strong> from chambering to muzzle exit.</li>
                    <li>Verify exact cartridge compatibility across the pistol barrel/slide rollmark, cartridge casehead, and factory box—including synonymous designations (<code>9mm Luger / 9mm Parabellum / 9x19mm</code>) and <strong>+P / +P+ overpressure restrictions</strong>.</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-6">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">Caliber Confusion, +P+ Pressure &amp; Why Gun Oil Kills Duty Ammo</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 3 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>Two ammunition mistakes show up repeatedly among rookie armed guards. Mistake number one happens at the sporting goods counter: a student buys a box of <strong>9mm Makarov (9x18mm)</strong> or <strong>.380 Auto (9mm Kurz / 9x17mm)</strong> thinking "9mm is 9mm" for their <strong>9mm Luger (9x19mm)</strong> service pistol—or buys <strong>9mm +P+</strong> law-enforcement submachine-gun surplus rounds and loads them into a compact pistol whose barrel is NOT rated for overpressure ammunition. Because +P and +P+ cartridges have the exact same external dimensions as standard-pressure rounds, they chamber effortlessly—right up until excessive chamber pressure cracks the locking block or blows out the case web in your hands!</p>
                    <p>Mistake number two is silent and deadly: an officer sprays penetrating gun oil or solvent directly onto their loaded duty pistol or stores loose duty rounds tossed inside a sweaty gym bag for two years. Penetrating oils and solvents creep past the primer seal and deaden the chemical priming compound. Six months later, in a life-or-death shooting, the firing pin strikes the primer and all the officer hears is a dead <em>click</em>.</p>
                    <p>Treat your duty ammunition like medical life-support equipment: match the headstamp to the barrel stamp every single time, keep spare ammo in its original factory box in a cool dry place, and never expose cartridges to solvents, water, or petroleum oil.</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    A "bullet" is ONLY the projectile at the tip—the complete unit is a "cartridge" (Case + Primer + Powder Charge + Bullet). Never fire +P or +P+ ammunition unless your specific firearm manufacturer certifies it!
                </div>
            </div>

            <h3 id="sec6-1">1. The 4 Cartridge Components &amp; Rimfire vs. Centerfire</h3>
            <p>In professional firearms terminology, a <strong>"round" or "cartridge"</strong> is a complete unit of ammunition consisting of four distinct components:</p>
            <ol>
                <li><strong>Case:</strong> Brass, nickel-plated brass, aluminum, or steel container holding all other components together and expanding on firing to seal hot gases inside the chamber (obturation).</li>
                <li><strong>Primer:</strong> Shock-sensitive chemical priming compound that detonates into a hot flash when crushed by the firing pin.</li>
                <li><strong>Powder Charge (Propellant):</strong> Smokeless chemical propellant inside the case that burns rapidly (deflagrates—it does NOT detonate like high explosives) to generate high-pressure expanding gas.</li>
                <li><strong>Bullet (Projectile):</strong> The lead or copper-jacketed projectile seated in the case mouth that is driven through the barrel bore toward the target (e.g., Full Metal Jacket [FMJ] for range training; Jacketed Hollow Point [JHP] for duty defense to reduce over-penetration).</li>
            </ol>
            <p><strong>Rimfire vs. Centerfire Cartridges:</strong></p>
            <ul>
                <li><strong>RIMFIRE CARTRIDGE (e.g., .22 LR):</strong> Priming compound is spun inside the hollow folded <strong>outer rim of the case head</strong>; the firing pin pinches the rim edge to ignite it. Rimfire cases are thin, cannot be reloaded, and are less ignition-reliable than centerfire.</li>
                <li><strong>CENTERFIRE CARTRIDGE (e.g., 9mm Luger, .38 Special, .40 S&amp;W, .45 ACP):</strong> Priming compound is housed inside a separate replaceable <strong>metal cup (primer) seated in the dead center of the thick case head</strong>. Centerfire cartridges are the mandatory standard for defensive and security duty firearms.</li>
            </ul>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_40_cartridge_components.jpg" alt="4 Components of a Cartridge">
                    </div>
                    <figcaption>
                        <strong>Cartridge Anatomy &bull; The 4 Components</strong>
                        Bullet (projectile), Powder Charge, Case, and Primer containing priming compound.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_41_rimfire_centerfire.jpg" alt="Rimfire vs Centerfire Cartridges">
                    </div>
                    <figcaption>
                        <strong>Ignition Systems &bull; Rimfire vs. Centerfire</strong>
                        Rimfire places priming compound inside the case rim; Centerfire seats a dedicated metal primer cup in the center of the case head.
                    </figcaption>
                </figure>
            </div>

            <h3 id="sec6-2">2. The 6-Step Cartridge Firing Sequence</h3>
            <p>From the instant a round sits in battery to the audible gunshot report, six physical steps occur in milliseconds:</p>
            <ol>
                <li><strong>Step 1:</strong> Cartridge is properly seated inside the barrel/cylinder <strong>chamber</strong>.</li>
                <li><strong>Step 2:</strong> Pressing the trigger releases the <strong>firing pin (or striker), which strikes the primer cup or case rim</strong> and ignites the shock-sensitive priming compound.</li>
                <li><strong>Step 3:</strong> The intense <strong>flame flash generated by the priming compound passes through the flash hole and ignites the main powder charge</strong>.</li>
                <li><strong>Step 4:</strong> The smokeless <strong>powder burns rapidly, generating high-pressure expanding gas</strong> (often 30,000–35,000 PSI in 9mm Luger).</li>
                <li><strong>Step 5:</strong> Expanding high-pressure <strong>gas unseats the bullet from the case mouth and pushes the bullet down the rifled bore at high speed</strong>.</li>
                <li><strong>Step 6:</strong> The <strong>bullet exits the muzzle</strong>, and escaping uncorked superheated high-pressure gas creates muzzle flash and the sonic pressure wave (<strong>"BANG"</strong>).</li>
            </ol>

            <figure class="armed-slide-figure">
                <div class="armed-slide-img-wrap">
                    <img src="assets/slide_42_firing_sequence.jpg" alt="6-Step Cartridge Firing Sequence">
                </div>
                <figcaption>
                    <strong>Academy Technical Reference &bull; 6-Step Cartridge Firing Sequence</strong>
                    Chambered cartridge &rarr; Firing pin strikes primer &rarr; Flame ignites powder &rarr; Gas pressure builds &rarr; Bullet driven through bore &rarr; Bullet exits muzzle ("Bang").
                </figcaption>
            </figure>

            <h3 id="sec6-3">3. Cartridge Identification, +P / +P+ Pressure &amp; Safe Ammo Storage</h3>
            <p>To prevent catastrophic caliber mismatches, verify that the <strong>Cartridge Designation</strong> matches across all three locations:</p>
            <ul>
                <li><strong>1. Stamped on the Pistol</strong> (barrel hood, barrel side, or slide);</li>
                <li><strong>2. Stamped on the Cartridge Casehead</strong> (headstamp); and</li>
                <li><strong>3. Printed on the Factory Ammunition Box</strong>.</li>
            </ul>
            <p><em>Equivalent Synonymous Designations:</em> Certain cartridges carry multiple official names for the exact same specification—most notably <strong><code>9mm Luger = 9mm Parabellum (9mm Para) = 9x19mm</code></strong>, and <strong><code>.45 Auto = .45 ACP</code></strong>. Conversely, <strong><code>.380 Auto (9x17mm)</code></strong> and <strong><code>9mm Makarov (9x18mm)</code></strong> are <em>NOT</em> interchangeable with <code>9x19mm</code>! (Note on revolvers: firearms chambered for <code>.357 Magnum</code> can safely fire shorter <code>.38 Special</code> rounds, whereas a <code>.38 Special</code> revolver CANNOT chamber or withstand longer, higher-pressure <code>.357 Magnum</code> rounds.)</p>

            <div class="callout warning">
                <strong>CRITICAL WARNING ON "+P" AND "+P+" AMMUNITION:</strong>
                <p>Cartridges marked <strong><code>+P</code></strong> or <strong><code>+P+</code></strong> on the casehead and box are loaded to <strong>higher-than-standard SAAMI internal chamber pressure</strong> (<code>+P+</code> exceeds even SAAMI <code>+P</code> specs). Because <code>+P</code> and <code>+P+</code> cartridges have the <strong>exact same external dimensions</strong> as standard-pressure cartridges, they WILL physically chamber in pistols not rated for them—risking catastrophic frame/barrel failure and shooter injury. <strong>Use +P or +P+ ammunition ONLY in firearms explicitly certified for it by the firearm manufacturer!</strong></p>
            </div>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_43_cartridge_designation.jpg" alt="Cartridge Designation Locations">
                    </div>
                    <figcaption>
                        <strong>Cartridge Identification &bull; 3 Verification Points</strong>
                        Always match the designation stamped on the Pistol, the Cartridge Casehead, and the Factory Ammunition Box.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_44_plus_p_cartridges.jpg" alt="+P and +P+ Overpressure Cartridges">
                    </div>
                    <figcaption>
                        <strong>Overpressure Ammunition &bull; +P and +P+</strong>
                        Same external dimensions as standard cartridges, loaded to higher internal pressure—use ONLY in manufacturer-certified firearms.
                    </figcaption>
                </figure>
            </div>

            <p><strong>Ammunition Storage Rules:</strong> (1) Store in a <strong>cool, dry place</strong>; (2) Keep in the <strong>original factory box</strong> so caliber, bullet weight, and lot number remain clearly identifiable; (3) Lock away from <strong>children and unauthorized persons</strong>; and (4) <strong>NEVER expose ammunition to water, cleaning solvents, or petroleum/penetrating oils</strong>, which seep into primers/powder and cause misfires, hangfires, or squib loads.</p>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Verifying Duty Ammunition Before Loading Magazines",
            setup: "Before your armed shift, a coworker offers you a Ziploc bag of loose cartridges stamped '9mm Luger +P+' that were soaked down with aerosol gun cleaner to make the brass shine. Your agency pistol's owner manual states: 'Approved for standard 9x19mm Luger; DO NOT use +P+ ammunition.'",
            question: "Identify ALL safety violations present in loading those cartridges into your duty pistol:",
            options: [
                {
                    text: "There are two severe violations: (1) +P+ overpressure cartridges have identical external dimensions and will chamber, but firing them in a non-certified pistol risks catastrophic failure; and (2) exposing cartridges to solvents/oils degrades primers and powder, risking a misfire, hangfire, or squib load.",
                    correct: true,
                    feedback: "CORRECT! Both firing +P+ ammo in a pistol not certified for it AND exposing cartridges to cleaning solvents/petroleum products create life-threatening mechanical and ignition hazards."
                },
                {
                    text: "Only the Ziploc bag is an issue because 9mm Luger and 9x19mm are completely different calibers.",
                    correct: false,
                    feedback: "INCORRECT. 9mm Luger, 9mm Parabellum, and 9x19mm ARE the same standard caliber designation—the real dangers here are the uncertified +P+ overpressure load and solvent contamination!"
                },
                {
                    text: "Spraying solvent on cartridges makes them travel faster and cleaner down the bore.",
                    correct: false,
                    feedback: "INCORRECT. Solvents and petroleum oils penetrate primer seals, causing dead primers (misfires) or incomplete ignition (squib loads)."
                }
            ],
            illustration: "assets/slide_44_plus_p_cartridges.jpg"
        },
        checkOnLearning: [
            {
                id: "c6_1",
                question: "What are the FOUR components of a modern metallic cartridge?",
                options: [
                    "Slide, Frame, Barrel, and Trigger",
                    "Case, Primer, Powder Charge, and Bullet",
                    "Muzzle, Rifling, Chamber, and Locking Lugs",
                    "Brass, Extractor, Firing Pin, and Recoil Spring"
                ],
                correctAnswer: "Case, Primer, Powder Charge, and Bullet",
                remediationTarget: "sec6-1",
                explanation: "Every complete cartridge consists of four components: Case, Primer (containing priming compound), Powder Charge, and Bullet."
            },
            {
                id: "c6_2",
                question: "Why are '+P' and '+P+' cartridges hazardous if inadvertently mixed with standard ammunition?",
                options: [
                    "They are two inches longer than standard cartridges and jam inside the magazine well",
                    "They are loaded to higher-than-standard pressure yet share the exact same external dimensions as standard cartridges, meaning they can chamber in firearms NOT certified to withstand the pressure",
                    "They are rimfire blank rounds designed only for starter pistols",
                    "They dissolve brass cases if stored in factory boxes"
                ],
                correctAnswer: "They are loaded to higher-than-standard pressure yet share the exact same external dimensions as standard cartridges, meaning they can chamber in firearms NOT certified to withstand the pressure",
                remediationTarget: "sec6-3",
                explanation: "+P and +P+ rounds share standard external dimensions so they will physically chamber, but they must ONLY be fired in pistols certified by the manufacturer for higher pressure."
            },
            {
                id: "c6_3",
                question: "Where is the priming compound located in a CENTERFIRE duty cartridge?",
                options: [
                    "Coated on the outside tip of the copper bullet",
                    "Spun around the outer folded rim of a thin brass case",
                    "Contained in a dedicated metal cup, called a primer, seated in the center of the case head",
                    "Mixed loosely at the front of the barrel muzzle"
                ],
                correctAnswer: "Contained in a dedicated metal cup, called a primer, seated in the center of the case head",
                remediationTarget: "sec6-1",
                explanation: "In a centerfire cartridge, priming compound is housed in a central metal primer cup in the center of the case head."
            }
        ],
        takeaways: [
            "4 Cartridge Components: Case, Primer, Powder Charge, Bullet.",
            "Centerfire = primer cup in center of case head; Rimfire = priming compound inside outer rim.",
            "Match caliber on Pistol + Casehead + Factory Box (9mm Luger = 9mm Para = 9x19mm; .45 Auto = .45 ACP).",
            "Fire +P / +P+ ONLY in certified guns; store ammo in factory boxes in a cool, dry place away from oils/solvents."
        ]
    },
    {
        id: 7,
        number: "Lesson 7",
        title: "Cartridge & Mechanical Pistol Malfunctions: Diagnostics & Clearing Protocols",
        duration: "2 Hours",
        icon: "exclamation-triangle",
        summary: "Identifying and safely resolving ammunition malfunctions (Misfire, the mandatory 30-second Hangfire wait rule, and bore-obstructing Squib Loads) and mechanical pistol malfunctions (Failure to Feed, Failure to Extract, Tap-Rack remediation, and Double Feed clearing).",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Differentiate the three <strong>Cartridge (Ammunition) Malfunctions</strong>: <strong>Misfire</strong>, <strong>Hangfire</strong>, and <strong>Squib Load</strong>.</li>
                    <li>Apply the <strong>30-Second Safe-Direction Rule</strong> for suspected hangfires and recognize the 3 unmistakable warning signs of a <strong>Squib Load</strong>.</li>
                    <li>Identify the three <strong>Mechanical Pistol Malfunctions</strong>: <strong>Failure to Feed</strong>, <strong>Failure to Extract</strong> (stovepipe), and <strong>Double Feed</strong>.</li>
                    <li>Execute the <strong>"Tap, Rack"</strong> immediate-action drill for Phase 1 stoppages and the full <strong>Clear &amp; Fresh Magazine</strong> remediation for Double Feeds.</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-7">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">The Quiet "Pop" That Destroys Barrels—And Hands</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>Every mechanical tool made by human beings—including the finest duty pistol and factory ammunition—can malfunction. What separates a trained professional from an amateur is knowing WHEN to run "Tap, Rack" immediately and WHEN racking another round will blow the barrel apart in your hands!</p>
                    <p>On an indoor firing line, surrounded by ear protection and neighbouring shooters, a trainee pressed the trigger and heard a muffled <em>"pop"</em> instead of a sharp crack, felt almost zero recoil in his wrists, and saw virtually no muzzle flash. Instead of stopping, his instinct was to rack the slide and fire again. Thankfully, the Range Safety Officer grabbed his shoulder and called "CEASE FIRE!" before his finger touched the trigger.</p>
                    <p>When we cleared that pistol and looked down the removed barrel from the chamber end, a copper-jacketed 9mm bullet was wedged solid halfway down the rifling! That cartridge had no powder charge—only the primer ignited, pushing the bullet two inches into the bore. Had that student fired one more live round behind that lodged bullet—a <strong>Squib Load</strong>—35,000 PSI of trapped gas would have bulged or ruptured the steel barrel and blown shrapnel through the frame.</p>
                    <p>Memorize the difference today: On a non-threat training range, if you hear reduced noise, see reduced flash, or feel reduced recoil—<strong>STOP FIRING IMMEDIATELY</strong>, keep the muzzle safe, and check for a squib obstruction!</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    Hangfire suspicion on the range = Keep pointed downrange for AT LEAST 30 SECONDS before opening the action. Squib Load (reduced noise, flash, recoil) = STOP FIRING IMMEDIATELY, clear gun, and check bore!
                </div>
            </div>

            <h3 id="sec7-1">1. Cartridge (Ammunition) Malfunctions: Misfire, Hangfire &amp; Squib Load</h3>
            <p>Ammunition malfunctions originate inside the cartridge components rather than the pistol's feeding cycle:</p>
            <ul>
                <li><strong>1. MISFIRE:</strong> Complete <strong>failure of a cartridge to ignite</strong> after the primer or case rim is struck by the firing pin (you press the trigger, hear <em>click</em>, and nothing fires). <em>Causes:</em> Either a defect in the cartridge (dead/contaminated primer) OR a defect in the pistol (broken/fouled firing pin or weak mainspring).</li>
                <li><strong>2. HANGFIRE:</strong> A <strong>perceptible delay in the ignition of a cartridge</strong> after the primer or case rim has been struck by the firing pin—often lasting several seconds due to degraded/moist priming compound or propellant.
                    <div class="callout warning">
                        <strong>THE MANDATORY 30-SECOND HANGFIRE RULE:</strong> When a cartridge fails to fire immediately in a non-lethal training environment, you CANNOT initially tell whether it is a harmless Misfire or a ticking Hangfire! Because opening the slide or laying the gun on the bench during a delayed ignition could cause an out-of-battery explosion or negligent injury, <strong>keep the pistol pointed in a safe direction downrange for AT LEAST 30 SECONDS before opening the action to remove the cartridge!</strong>
                    </div>
                </li>
                <li><strong>3. SQUIB LOAD:</strong> A cartridge that develops <strong>less than normal pressure upon ignition</strong> (e.g., missing or contaminated powder charge where only the primer fires), causing the <strong>bullet to fail to exit the muzzle and lodge inside the barrel bore</strong>!
                    <ul>
                        <li><strong>3 Warning Signs of a Squib Load:</strong> (1) <strong>Reduced Noise</strong> (a quiet "pop" or "pfft" instead of a sharp "bang"), (2) <strong>Reduced Muzzle Flash</strong>, and (3) <strong>Reduced Recoil</strong> (slide often fails to cycle).</li>
                        <li><strong>Mandatory Action:</strong> <strong>STOP FIRING IMMEDIATELY!</strong> Never "Tap, Rack" a suspected squib! Clear the firearm completely (remove magazine, lock slide open, verify empty chamber) and inspect the barrel bore from the chamber end (or insert a cleaning rod) to verify no bullet is obstructing the bore.</li>
                    </ul>
                </li>
            </ul>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_50_hangfire.jpg" alt="Hangfire 30-Second Safe Direction Rule">
                    </div>
                    <figcaption>
                        <strong>Cartridge Malfunction &bull; Hangfire Protocol</strong>
                        Perceptible ignition delay after firing pin strike—keep muzzle pointed downrange for at least 30 seconds before opening the action.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_52_squib_load.jpg" alt="Squib Load Bullet Lodged in Bore">
                    </div>
                    <figcaption>
                        <strong>Cartridge Malfunction &bull; Squib Load Obstruction</strong>
                        Under-pressure ignition leaves a bullet wedged inside the bore—firing a second round behind it causes catastrophic barrel rupture!
                    </figcaption>
                </figure>
            </div>

            <h3 id="sec7-2">2. Mechanical Pistol Malfunctions: Failure to Feed, Failure to Extract &amp; Double Feed</h3>
            <p>Mechanical cycle malfunctions interrupt one of the slide's 3 mechanical functions:</p>
            <ul>
                <li><strong>1. FAILURE TO FEED:</strong> Occurs when a live round fails to completely enter the barrel chamber after the slide cycles on a loaded magazine (often caused by an unseated magazine, weak grip/"limp-wristing", dirty feed ramp, or damaged magazine lips).</li>
                <li><strong>2. FAILURE TO EXTRACT / EJECT ("Stovepipe"):</strong> Occurs when a spent brass case fails to exit the chamber or fails to completely eject out of the ejection port before the slide closes, often trapping the empty brass upright like a stovepipe chimney.</li>
                <li><strong>3. DOUBLE FEED:</strong> Occurs when the slide attempts to strip and feed a new live cartridge from the magazine into a <strong>chamber that is ALREADY occupied</strong> by an unextracted case or round—wedging the slide partially open under spring tension.</li>
            </ul>

            <figure class="armed-slide-figure">
                <div class="armed-slide-img-wrap">
                    <img src="assets/slide_58_double_feed.jpg" alt="Double Feed Malfunction Diagram">
                </div>
                <figcaption>
                    <strong>Mechanical Malfunction &bull; Double Feed</strong>
                    A live cartridge from the magazine jams up against an already-occupied chamber, locking the action until cleared.
                </figcaption>
            </figure>

            <h3 id="sec7-3">3. Clearing Pistol Malfunctions: "Tap, Rack" vs. Double Feed Remediation</h3>
            <div class="callout tip">
                <strong>CLEARING DRILL #1 — "TAP, RACK" (For Failure to Feed or Failure to Extract):</strong>
                <ol>
                    <li><strong>TAP:</strong> Keep muzzle pointed in a safe direction (at threat in defense / downrange) with finger off trigger, and sharply <strong>TAP the bottom baseplate of the magazine</strong> with the palm of your support hand to ensure it is fully seated.</li>
                    <li><strong>RACK:</strong> Grasp the rear slide serrations overhand, <strong>RACK the slide briskly all the way to the rear, and release it cleanly</strong> (ejecting any stovepipe/bad round and feeding a fresh cartridge into battery).</li>
                </ol>
                <p style="margin-top:8px;margin-bottom:0;"><strong>CLEARING DRILL #2 — DOUBLE FEED / REPEATED FAILURE REMEDIATION:</strong> If <em>"Tap, Rack"</em> fails to clear the stoppage—or you encounter a <strong>Double Feed</strong>—you must <strong>CLEAR THE PISTOL AND INSERT A NEW MAGAZINE</strong>: (1) Lock the slide open to the rear first if spring tension traps the magazine; (2) Press the magazine release and strip/remove the magazine (using force if bound); (3) Rack the slide multiple times to clear the occupied chamber; and (4) Insert a fresh magazine and rack the slide to chamber a round. <em>(Important Range Note: During supervised live-fire training at Eagle Sports Range, DO NOT clear malfunctions on your own—stop, keep muzzle downrange, finger off trigger, raise non-shooting hand, and wait for the Instructor!)</em></p>
            </div>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Diagnosing a Sudden Quiet 'Pop' During Practice",
            setup: "While practicing on an outdoor range, you press the trigger on your 9mm pistol. Instead of a normal loud report and sharp recoil, you hear a faint muffled 'pop', see almost no flash, and feel virtually zero recoil in your hands.",
            question: "What malfunction do these three symptoms indicate, and what is your mandatory immediate action?",
            options: [
                {
                    text: "It is a Failure to Feed; immediately slap the magazine ('Tap, Rack') and pull the trigger again as fast as possible.",
                    correct: false,
                    feedback: "INCORRECT AND EXTREMELY DANGEROUS! Running Tap-Rack and firing another live round behind a lodged bullet will blow up the barrel!"
                },
                {
                    text: "These are the classic 3 signs of a Squib Load (reduced noise, reduced muzzle flash, reduced recoil) where a bullet may be lodged inside the bore. STOP FIRING IMMEDIATELY, keep muzzle pointed downrange, clear the firearm completely, and inspect the bore for an obstruction.",
                    correct: true,
                    feedback: "CORRECT! Reduced noise, reduced flash, and reduced recoil signal a Squib Load. Stopping immediately, clearing the gun, and checking the bore prevents a catastrophic barrel rupture."
                },
                {
                    text: "Look directly into the front of the loaded muzzle while pressing the trigger to see if light shines through.",
                    correct: false,
                    feedback: "INCORRECT. NEVER point a firearm at your face or look into the muzzle of an uncleared firearm (violates Rule #1)."
                }
            ],
            illustration: "assets/slide_52_squib_load.jpg"
        },
        checkOnLearning: [
            {
                id: "c7_1",
                question: "When a cartridge fails to fire immediately upon the firing pin strike in a training setting, how long must you keep the pistol pointed in a safe direction before opening the action in case of a HANGFIRE?",
                options: [
                    "2 seconds",
                    "At least 30 seconds",
                    "Open the slide immediately within half a second",
                    "24 hours"
                ],
                correctAnswer: "At least 30 seconds",
                remediationTarget: "sec7-1",
                explanation: "Because you cannot immediately distinguish a misfire from a delayed-ignition hangfire, keep the pistol pointed in a safe direction for at least 30 seconds before opening the action."
            },
            {
                id: "c7_2",
                question: "What are the THREE primary warning signs of a SQUIB LOAD?",
                options: [
                    "Extra-loud boom, blinding fireball, and heavy recoil",
                    "Reduced noise, reduced muzzle flash, and reduced recoil",
                    "Slide locking open cleanly after the 10th shot",
                    "Rear sight drifting slightly to the right"
                ],
                correctAnswer: "Reduced noise, reduced muzzle flash, and reduced recoil",
                remediationTarget: "sec7-1",
                explanation: "A squib load develops insufficient pressure, producing reduced noise, reduced muzzle flash, and reduced recoil while lodging the bullet in the bore."
            },
            {
                id: "c7_3",
                question: "What immediate clearing method is used for standard Failures to Feed or Failures to Extract, and what must you do if you encounter a DOUBLE FEED?",
                options: [
                    "Use 'Tap, Rack' (tap bottom of magazine, rack slide) for Failure to Feed/Extract; for a Double Feed, lock slide open/force-remove magazine, clear the pistol completely, and insert a new magazine",
                    "Spray oil into the muzzle for all malfunctions",
                    "Strike the hammer with a wrench while holding the trigger down",
                    "Keep pulling the trigger repeatedly until the double feed clears itself"
                ],
                correctAnswer: "Use 'Tap, Rack' (tap bottom of magazine, rack slide) for Failure to Feed/Extract; for a Double Feed, lock slide open/force-remove magazine, clear the pistol completely, and insert a new magazine",
                remediationTarget: "sec7-3",
                explanation: "Tap-Rack resolves most Failures to Feed/Extract, whereas a Double Feed (attempting to chamber into an already occupied chamber) requires locking the slide/stripping the magazine, clearing the chamber, and inserting a fresh magazine."
            }
        ],
        takeaways: [
            "Misfire = no ignition; Hangfire = delayed ignition (keep pointed in safe direction AT LEAST 30 SECONDS!).",
            "Squib Load = bullet lodged in bore (reduced noise, reduced flash, reduced recoil) — STOP FIRING IMMEDIATELY & check bore!",
            "Failure to Feed / Extract = 'TAP, RACK' (1. Tap magazine baseplate, 2. Rack slide).",
            "Double Feed = lock slide open / forcefully strip magazine, clear chamber completely, insert fresh magazine."
        ]
    },
    {
        id: 8,
        number: "Lesson 8",
        title: "The Five Fundamentals of Pistol Marksmanship",
        duration: "2 Hours",
        icon: "crosshairs",
        summary: "Mastering all 5 Pistol Shooting Fundamentals on every shot: Aiming (Sight Alignment 'Equal Height, Equal Light', Sight Picture, and Front Sight Focus), Hold Control (minimizing Arc of Movement), Breath Control (Natural Respiratory Pause), Trigger Control, and Follow-Through.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>List and execute all <strong>5 Fundamentals of Pistol Shooting</strong>: <strong>Aiming</strong>, <strong>Hold Control</strong>, <strong>Breath Control</strong>, <strong>Trigger Control</strong>, and <strong>Follow-Through</strong>.</li>
                    <li>Distinguish <strong>Sight Alignment</strong> ("Equal Height, Equal Light") from <strong>Sight Picture</strong> (Center Hold vs. Six O'Clock Hold), explain why <strong>Sight Alignment is MORE critical than Sight Picture</strong>, and maintain crisp <strong>Front Sight Focus</strong>.</li>
                    <li>Minimize your natural <strong>Arc of Movement</strong> through Hold Control and fire at the <strong>Natural Respiratory Pause</strong>.</li>
                    <li>Identify the <strong>TWO Most Important Shooting Fundamentals</strong>: <strong>Aiming</strong> and <strong>Trigger Control</strong>.</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-8">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">Why Shots Miss Low-Left—And How Two Fundamentals Fix 95% of Shooters</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>When a right-handed student shoots their first 10-round target at Eagle Sports Range and sees every bullet hole clustered down in the bottom-left corner of the paper, their first reaction is almost always: <em>"Instructor Young, I think the sights on this pistol are bent!"</em> Then I pick up that exact same pistol, press five smooth rounds dead into the center X-ring, and hand it back with a smile.</p>
                    <p>Why did those rounds dive low-left? Because the human eye and brain hate recoil! Right before the gun goes bang, an untrained shooter shifts their eyes off the front sight out onto the distant paper target, holds their breath until they shake, and then slaps or jerks the trigger while clenching all four lower fingers in anticipation of the blast—dipping the muzzle downward and left at the exact millisecond of ignition.</p>
                    <p>Every great marksman—from Olympic bullseye champions to SWAT instructors—performs the exact same <strong>Five Fundamentals</strong> on every shot: Aiming, Hold Control, Breath Control, Trigger Control, and Follow-Through. And if you remember one secret above all else on qualification day, make it Slide 73 of our curriculum: <strong>The TWO Most Important Shooting Fundamentals are AIMING (Sight Alignment &amp; Sight Picture) and TRIGGER CONTROL</strong>. Keep your eyeball locked razor-sharp on that front sight post and press the trigger straight rearward without disturbing the sights, and passing 35 out of 50 becomes effortless.</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    Sight Alignment ("Equal Height, Equal Light") is MORE critical than Sight Picture—and with iron sights, your eye can only focus sharply on ONE distance at a time: ALWAYS focus sharply on the FRONT SIGHT!
                </div>
            </div>

            <h3 id="sec8-1">1. Fundamental #1: AIMING (Sight Alignment, Sight Picture &amp; Front Sight Focus)</h3>
            <p><strong>Aiming</strong> is the process of establishing the proper geometric relationship between the <strong>Target</strong>, the <strong>Front Sight</strong>, and the <strong>Rear Sight</strong>, and consists of two distinct components:</p>
            <ul>
                <li><strong>A. SIGHT ALIGNMENT ("Equal Height, Equal Light"):</strong> Refers strictly to the proper relationship between the pistol's <strong>front sight and rear sight</strong>:
                    <ul>
                        <li><strong>Equal Height:</strong> The top edge of the front sight post sits perfectly level/flush with the top edge of the rear sight notch.</li>
                        <li><strong>Equal Light:</strong> Equal slivers of daylight appear on both the left and right sides of the front sight blade inside the rear sight notch.</li>
                    </ul>
                </li>
                <li><strong>B. SIGHT PICTURE:</strong> Obtained when your <strong>already-aligned sights are placed into proper relationship with the target</strong>—using either a <strong>Center Hold</strong> (aligned sights centered directly over the middle of the bullseye/scoring mass—standard for duty defense) or a <strong>Six O'Clock Hold</strong> (aligned sights resting right at the bottom 6 o'clock edge of a bullseye circle).</li>
            </ul>

            <div class="callout warning">
                <strong>WHY SIGHT ALIGNMENT IS MORE CRITICAL THAN SIGHT PICTURE + FRONT SIGHT FOCUS:</strong>
                <ul>
                    <li><strong>Angular Error Geometry:</strong> If your <em>Sight Picture</em> wobbles 1/2 inch off center on the target, your bullet lands only 1/2 inch off center regardless of distance. By contrast, a tiny 1/10-inch angular error in <em>Sight Alignment</em> multiplies with every yard of distance—missing the target by several inches at 10 yards and feet at 25 yards! Therefore, <strong>Sight Alignment is MORE critical than Sight Picture</strong>.</li>
                    <li><strong>FRONT SIGHT FOCUS:</strong> The human eye physically cannot focus sharply on three different distances (rear sight at 20 inches, front sight at 27 inches, target at 7–10 yards) simultaneously. When shooting iron sights, <strong>visual focus MUST be sharp on the FRONT SIGHT</strong>, leaving both the rear sight and the distant target slightly fuzzy/soft!</li>
                </ul>
            </div>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_64_sight_alignment.jpg" alt="Sight Alignment Equal Height Equal Light">
                    </div>
                    <figcaption>
                        <strong>Aiming (Part 1) &bull; Sight Alignment</strong>
                        "Equal Height, Equal Light" — front sight top flush with rear sight top and centered with equal light on both sides.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_65_sight_picture.jpg" alt="Sight Picture Six O'Clock Hold vs Center Hold">
                    </div>
                    <figcaption>
                        <strong>Aiming (Part 2) &bull; Sight Picture</strong>
                        Placing aligned sights onto the target using either a Six O'Clock Hold or a Center Hold.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_66_sight_errors.jpg" alt="Errors in Sight Alignment and Sight Picture">
                    </div>
                    <figcaption>
                        <strong>Aiming (Part 3) &bull; Sight Errors Comparison</strong>
                        Sight Alignment errors produce severe angular misses downrange; Sight Alignment is MORE critical than Sight Picture.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_67_front_sight_focus.jpg" alt="Front Sight Focus Diagram">
                    </div>
                    <figcaption>
                        <strong>Aiming (Part 4) &bull; Front Sight Focus</strong>
                        Keep sharp visual focus on the Front Sight—leaving the target and rear sight slightly fuzzy.
                    </figcaption>
                </figure>
            </div>

            <h3 id="sec8-2">2. Fundamentals #2 &amp; #3: HOLD CONTROL (Arc of Movement) &amp; BREATH CONTROL</h3>
            <ul>
                <li><strong>FUNDAMENTAL #2 — HOLD CONTROL &amp; ARC OF MOVEMENT:</strong> Hold control allows you to maintain proper sight alignment and sight picture while firing the shot. Every living human body exhibits a slight, unavoidable wobble when extending a pistol at arm's length—called the <strong>Arc (or Arch) of Movement</strong>. Do NOT jerk the trigger trying to "ambush" the exact center as the sights sweep past! Instead, maintain a firm, consistent grip and balanced stance to keep your Arc of Movement inside the scoring zone; regular dry-fire and live-fire practice steadily shrinks this arc.</li>
                <li><strong>FUNDAMENTAL #3 — BREATH CONTROL:</strong> Rising and falling chest respiration moves your shoulders and extended sights vertically off target. Take a normal breath prior to each precision shot, exhale naturally to your <strong>Natural Respiratory Pause</strong> (the relaxed 2–4 second pause at the bottom of a normal exhale before oxygen hunger sets in), and break the shot cleanly during that pause. Never hold your breath for 12+ seconds—oxygen deprivation triggers muscle tremors and blurred vision!</li>
            </ul>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_69_arc_of_movement.jpg" alt="Hold Control and Arc of Movement">
                    </div>
                    <figcaption>
                        <strong>Fundamental #2 &bull; Hold Control &amp; Arc of Movement</strong>
                        Unavoidable sight wobble while extended on target; proper grip and practice shrink your Arc of Movement.
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_70_breath_control.jpg" alt="Breath Control Natural Respiratory Pause">
                    </div>
                    <figcaption>
                        <strong>Fundamental #3 &bull; Breath Control</strong>
                        Inhale, exhale naturally, and fire the shot smoothly during the calm Natural Respiratory Pause.
                    </figcaption>
                </figure>
            </div>

            <h3 id="sec8-3">3. Fundamentals #4 &amp; #5: TRIGGER CONTROL, FOLLOW-THROUGH &amp; The Top Two</h3>
            <ul>
                <li><strong>FUNDAMENTAL #4 — TRIGGER CONTROL:</strong> Activating the trigger smoothly so zero lateral force misaligns the sights:
                    <ul>
                        <li>Place the face of the trigger on the pad of the index finger <strong>between the fingertip and the first joint</strong> (too little finger pushes left/right; too much finger hooks/pulls).</li>
                        <li>Squeeze/press the trigger <strong>straight rearward in a smooth, continuous, uninterrupted movement</strong> while keeping your lower three grip fingers at constant pressure.</li>
                    </ul>
                </li>
                <li><strong>FUNDAMENTAL #5 — FOLLOW-THROUGH:</strong> Continuing to apply all shooting fundamentals <strong>before, DURING, and immediately AFTER</strong> the shot fires—maintaining front sight focus through recoil recovery, holding the trigger rearward briefly as the shot breaks, and then releasing cleanly just to the mechanical trigger reset ("riding the reset") while acquiring a second sight picture.</li>
            </ul>
            <div class="callout tip">
                <strong>EXAM &amp; RANGE GOLDEN RULE — THE TWO MOST IMPORTANT FUNDAMENTALS:</strong>
                <p>While all five fundamentals are performed on every shot, the <strong>TWO MOST IMPORTANT SHOOTING FUNDAMENTALS</strong> are:</p>
                <ol>
                    <li><strong>AIMING (Sight Alignment &amp; Sight Picture)</strong></li>
                    <li><strong>TRIGGER CONTROL</strong></li>
                </ol>
            </div>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Correcting Sight Focus & Trigger Slap at 10 Yards",
            setup: "During the 10-yard stage of practice, you catch yourself staring sharply at the bullseye ring downrange while your front sight looks completely blurry, and jerking the trigger quickly the instant your wobbling sights cross the X-ring.",
            question: "Which adjustments properly apply the Five Fundamentals of Pistol Shooting?",
            options: [
                {
                    text: "Shift sharp visual focus back onto the Front Sight (allowing the target and rear sight to appear slightly fuzzy), establish 'Equal Height, Equal Light' sight alignment, settle into your Natural Respiratory Pause while accepting your small Arc of Movement, squeeze the trigger straight rearward smoothly with the pad between fingertip and first joint, and maintain Follow-Through.",
                    correct: true,
                    feedback: "CORRECT! Crisp front sight focus, 'Equal Height, Equal Light' alignment, calm respiratory pause, smooth straight-rearward trigger press (without slapping to ambush the wobble), and follow-through integrate all five fundamentals."
                },
                {
                    text: "Close your dominant eye completely, hold your breath for 25 seconds until your arms shake, and yank the trigger with your middle finger.",
                    correct: false,
                    feedback: "INCORRECT. Extended breath-holding induces muscle tremors, and yanking the trigger destroys sight alignment."
                },
                {
                    text: "Focus sharply on the rear sight notch only and ignore where the front sight blade sits.",
                    correct: false,
                    feedback: "INCORRECT. Focusing on the rear sight instead of the front sight causes severe sight-alignment angular errors."
                }
            ],
            illustration: "assets/slide_67_front_sight_focus.jpg"
        },
        checkOnLearning: [
            {
                id: "c8_1",
                question: "When shooting a pistol equipped with iron sights, where MUST your sharp visual focus be maintained?",
                options: [
                    "Sharply on the distant paper target",
                    "Sharply on the rear sight notch",
                    "Sharply on the Front Sight (leaving the target and rear sight slightly fuzzy)",
                    "Alternating rapidly back and forth five times per second"
                ],
                correctAnswer: "Sharply on the Front Sight (leaving the target and rear sight slightly fuzzy)",
                remediationTarget: "sec8-1",
                explanation: "Because the eye can focus sharply at only one focal plane at a time, focus must remain sharp on the Front Sight."
            },
            {
                id: "c8_2",
                question: "According to the Academy curriculum, what are the TWO MOST IMPORTANT fundamentals of pistol shooting?",
                options: [
                    "Stance Width and Boot Traction",
                    "Aiming (Sight Alignment & Sight Picture) and Trigger Control",
                    "Breath Holding and Elbow Locking",
                    "Magazine Capacity and Holster Color"
                ],
                correctAnswer: "Aiming (Sight Alignment & Sight Picture) and Trigger Control",
                remediationTarget: "sec8-3",
                explanation: "While all 5 fundamentals matter, Aiming (Sight Alignment & Sight Picture) and Trigger Control are the two most important fundamentals governing shot placement."
            },
            {
                id: "c8_3",
                question: "What does the phrase 'Equal Height, Equal Light' describe, and how does its importance compare to Sight Picture?",
                options: [
                    "It describes room lighting; Sight Picture is far more important than Sight Alignment",
                    "It describes proper Sight Alignment (front sight top level with rear sight top, equal light on both sides of front blade), which is MORE critical than Sight Picture",
                    "It describes matching two flashlights on a duty belt",
                    "It describes weighing cartridges on a scale"
                ],
                correctAnswer: "It describes proper Sight Alignment (front sight top level with rear sight top, equal light on both sides of front blade), which is MORE critical than Sight Picture",
                remediationTarget: "sec8-1",
                explanation: "'Equal Height, Equal Light' defines proper Sight Alignment, which is more critical than Sight Picture because angular misalignment multiplies error with distance."
            }
        ],
        takeaways: [
            "5 Fundamentals on EVERY shot: Aiming, Hold Control, Breath Control, Trigger Control, Follow-Through.",
            "Sight Alignment ('Equal Height, Equal Light') is MORE critical than Sight Picture; keep sharp FRONT SIGHT FOCUS.",
            "Fire during the Natural Respiratory Pause; squeeze trigger straight rearward between fingertip and first joint.",
            "The TWO Most Important Fundamentals: (1) AIMING and (2) TRIGGER CONTROL."
        ]
    },
    {
        id: 9,
        number: "Lesson 9",
        title: "Illinois Use of Deadly Force Law, Tan Card Regulations & Post-Incident Protocol",
        duration: "2 Hours",
        icon: "balance-scale",
        summary: "Statutory justification for deadly force in Illinois (720 ILCS 5/7-1), Forcible Felonies (720 ILCS 5/2-8), absolute prohibition on deadly force to protect property alone (720 ILCS 5/7-3), aggressor/fleeing-felon limits, IDFPR Tan Card compliance (225 ILCS 447), and post-shooting procedures.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Apply the strict Illinois statutory threshold for <strong>Deadly Force in Defense of Person (720 ILCS 5/7-1)</strong> and identify statutory <strong>Forcible Felonies (720 ILCS 5/2-8)</strong>.</li>
                    <li>Understand why an armed security officer may <strong>NEVER fire warning shots or use deadly force solely to protect retail merchandise or property</strong> (720 ILCS 5/7-3) or shoot a non-threatening fleeing thief.</li>
                    <li>Comply with all IDFPR <strong>Firearm Control Card ("Tan Card")</strong> carrying, uniform, employer-linkage, and 1-hour commute rules under <strong>225 ILCS 447/35-35 &amp; 35-40</strong> and <strong>68 IAC 1240.510</strong>.</li>
                    <li>Execute lawful post-incident critical response steps (scene safety, 911 medical/police notification, crime scene preservation, legal counsel, and factual reporting).</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-9">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">You Are Hired to Protect Human Life—Never Shoot Over Merchandise</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>Knowing <em>how</em> to shoot accurately on the range gets you a qualification score; knowing <em>when you CANNOT shoot</em> under Illinois law keeps you out of the Illinois Department of Corrections for First-Degree or Second-Degree Murder.</p>
                    <p>Let me give you a real-world Chicago scenario that has put untrained armed guards behind bars. An armed guard is working overnight at a commercial parking lot. He spots two suspects breaking into an unoccupied SUV and stealing catalytic converters. The guard runs outside yelling "Stop!" The suspects jump into their getaway sedan and speed away down the alley—driving AWAY from the guard, posing zero imminent threat of death or great bodily harm to anyone. Angry that they ignored his commands, the guard draws his 9mm pistol and fires three rounds at the fleeing rear bumper to "flatten the tires."</p>
                    <p>Under Illinois Criminal Code <strong>720 ILCS 5/7-1 and 5/7-3</strong>, every single round that guard fired was an unjustified felony crime—at minimum Aggravated Discharge of a Firearm (Class 1 Felony, 4 to 15 years in prison), and if a bullet penetrated the trunk and killed a passenger or an innocent neighbor down the block, First-Degree Murder! Why? Because in Illinois, <strong>deadly force is NEVER justifiable solely to prevent theft, trespass, or property loss</strong>, and once a suspect turns and flees without posing an imminent deadly threat, your legal justification to shoot evaporates instantly.</p>
                    <p>Memorize this bright line before you ever put on a gun belt: Your firearm leaves its holster ONLY to stop an imminent, unlawful threat of <strong>death, great bodily harm, or the active commission of a violent Forcible Felony</strong>.</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    No piece of stolen property in the State of Illinois is worth a gunshot. Deadly force requires a reasonable belief that it is IMMEDIATELY NECESSARY to prevent imminent DEATH, GREAT BODILY HARM, or a FORCIBLE FELONY (720 ILCS 5/7-1).
                </div>
            </div>

            <h3 id="sec9-1">1. Illinois Statutory Standard for Deadly Force (720 ILCS 5/7-1 &amp; 5/2-8)</h3>
            <p>As a licensed armed security officer in Illinois, you possess <strong>no special police immunity</strong>—your authority to use force is governed strictly by Article 7 of the Illinois Criminal Code of 2012:</p>
            <ul>
                <li><strong>Use of Force in Defense of Person (720 ILCS 5/7-1(a)):</strong> A person is justified in the use of force which is intended or likely to cause <strong>death or great bodily harm ONLY if they reasonably believe</strong> that such force is necessary to prevent:
                    <ol>
                        <li><strong>Imminent death or great bodily harm</strong> to themselves or another person; OR</li>
                        <li>The commission of a <strong>Forcible Felony</strong>.</li>
                    </ol>
                </li>
                <li><strong>What Is a "Forcible Felony"? (720 ILCS 5/2-8):</strong> Defined specifically by statute as treason, first-degree murder, second-degree murder, predatory criminal sexual assault of a child, aggravated criminal sexual assault, criminal sexual assault, robbery, burglary, residential burglary, aggravated arson, arson, aggravated kidnaping, kidnaping, aggravated battery resulting in great bodily harm or permanent disability/disfigurement, and <em>"any other felony which involves the use or threat of physical force or violence against any individual."</em></li>
                <li><strong>Defense of Other Property (720 ILCS 5/7-3):</strong> Deadly force may <strong>NEVER</strong> be used solely to prevent trespass or theft/interference with personal/commercial property unless a Forcible Felony involving threat of violence to a person is actively occurring.</li>
                <li><strong>Strict Prohibitions — Warning Shots, Fleeing Suspects &amp; Initial Aggressors (720 ILCS 5/7-4):</strong>
                    <ul>
                        <li><strong>NO Warning Shots:</strong> Firing a "warning shot" into the air or pavement constitutes reckless/aggravated discharge of a firearm and proves deadly force wasn't strictly necessary on a target.</li>
                        <li><strong>NO Shooting Non-Dangerous Fleeing Suspects:</strong> Once a threat ceases, surrenders, drops the weapon, or flees without presenting an imminent lethal danger to anyone, deadly force MUST stop immediately.</li>
                        <li><strong>Totality of Force Continuum:</strong> Always use verbal de-escalation, presence, distance, and non-lethal options whenever safe; deadly force is the absolute last resort.</li>
                    </ul>
                </li>
            </ul>

            <figure class="armed-slide-figure">
                <div class="armed-slide-img-wrap" style="background:#0f172a;">
                    <img src="../assets/use_of_force.png" alt="Objective Reasonableness Use of Force Continuum">
                </div>
                <figcaption>
                    <strong>Illinois Use-of-Force Escalation &amp; De-Escalation Framework</strong>
                    Force must remain objectively proportional to the subject's threat—escalating to deadly force ONLY against imminent death, great bodily harm, or violent forcible felony.
                </figcaption>
            </figure>

            <h3 id="sec9-2">2. Illinois Firearm Control Card ("Tan Card") Legal Rules (225 ILCS 447 &amp; 68 IAC 1240.510)</h3>
            <div class="callout warning">
                <strong>MANDATORY IDFPR ARMED SECURITY CREDENTIAL &amp; CARRY RULES:</strong>
                <ol>
                    <li><strong>Three Required Credentials on Your Person While Armed on Duty:</strong> To work legally as an armed security officer in Illinois, you must hold and carry on duty: (1) a valid Illinois <strong>FOID Card</strong> (if Illinois resident), (2) an active IDFPR <strong>PERC Card</strong> (20-Hr Unarmed prerequisite), and (3) an active IDFPR <strong>Firearm Control Card ("Tan Card")</strong> issued specifically under your employing licensed agency! (Note: An Illinois Concealed Carry License [CCL] does <em>NOT</em> replace a Tan Card for uniformed armed security work!)</li>
                    <li><strong>Employer-Specific Linkage:</strong> Unlike your PERC card (which belongs to you across employers), a <strong>Tan Card is tied directly to the specific licensed Private Security Contractor Agency</strong> employing you and must be returned upon termination.</li>
                    <li><strong>Strict On-Duty &amp; 1-Hour Transit Rule (225 ILCS 447/35-40):</strong> A Tan Card authorizes carrying your approved firearm ONLY (a) while actually engaged in the performance of official duties in uniform/post, OR (b) while commuting <strong>directly between your home and place of employment within a tight statutory window (not exceeding 1 hour each way without personal stops/errands)</strong> unless separately licensed under the Concealed Carry Act.</li>
                    <li><strong>Annual Requalification Requirement:</strong> Armed security officers must complete annual firearm refresher/range requalification every year as required by 68 Ill. Adm. Code 1240.510 to maintain active Tan Card eligibility.</li>
                </ol>
            </div>

            <h3 id="sec9-3">3. Critical Post-Shooting &amp; Deadly-Force Incident Protocol</h3>
            <p>If you are ever forced to draw or discharge your duty firearm in lawful defense of human life:</p>
            <ol>
                <li><strong>1. Assess Tactical Safety &amp; Re-Holster Before Police Arrive:</strong> Scan 360 degrees for secondary threats. Once the scene is safe and the threat is stopped, secure/holster your firearm BEFORE responding police officers enter the scene so you are not mistaken for an active shooter!</li>
                <li><strong>2. Call 911 Immediately (Request Police AND EMS):</strong> State clearly: your location, that you are the uniformed licensed security officer on duty (give your exact clothing/uniform description), that shots were fired, medical aid is needed, and follow 911 dispatcher instructions with visible empty hands when police arrive.</li>
                <li><strong>3. Preserve the Crime Scene &amp; Evidence:</strong> Do not move spent shell casings, weapons, or alter evidence unless necessary to prevent an immediate secondary injury.</li>
                <li><strong>4. Brief Public-Safety Statement &amp; Legal Representation:</strong> Provide responding officers a brief "Public Safety Statement" (pointing out any suspects, direction of flight, injured persons, and direction/number of rounds fired so police can check for stray impacts), notify your agency supervisor, and exercise your constitutional right to consult agency/personal legal counsel prior to providing a formal recorded investigative statement after physiological shock subsides.</li>
            </ol>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Retail Smash-and-Grab Fleeing Into Parking Lot",
            setup: "You are working armed uniformed security at a jewelry retail plaza. A suspect smashes a glass display case with a small hammer, grabs three gold trays, drops the hammer inside the store, and sprints empty-handed out the front exit toward the empty far end of the parking lot, posing zero physical threat to any person.",
            question: "Under Illinois Law (720 ILCS 5/7-1 & 5/7-3), may you draw your duty pistol and fire at the fleeing thief or fire a warning shot into the air?",
            options: [
                {
                    text: "Yes, fire one warning shot into the air first, and if he keeps running with expensive jewelry, shoot at his legs.",
                    correct: false,
                    feedback: "INCORRECT AND FELONIOUS! Both warning shots and shooting at legs constitute unlawful deadly force and felony Aggravated Discharge of a Firearm under Illinois law."
                },
                {
                    text: "NO. Keep your firearm holstered! Deadly force (and warning shots) are strictly prohibited to protect property or stop an unarmed fleeing thief who poses no imminent threat of death or great bodily harm. Observe physical/vehicle descriptions from a safe position and call 911 immediately.",
                    correct: true,
                    feedback: "CORRECT! Under 720 ILCS 5/7-1 and 5/7-3, deadly force is justified ONLY when reasonably necessary to prevent imminent death, great bodily harm, or an active violent forcible felony—never over fleeing property theft."
                },
                {
                    text: "Yes, because holding an Illinois Tan Card gives you greater shooting authority than Chicago Police officers.",
                    correct: false,
                    feedback: "INCORRECT. Even sworn police officers are barred under Tennessee v. Garner and 720 ILCS 5/7-5 from shooting unarmed non-dangerous fleeing suspects, and private security guards hold only private-person Article 7 justification."
                }
            ],
            illustration: "../assets/use_of_force.png"
        },
        checkOnLearning: [
            {
                id: "c9_1",
                question: "Under Illinois statute 720 ILCS 5/7-1, when is an armed security officer legally justified in using DEADLY FORCE?",
                options: [
                    "Whenever a customer refuses to show a receipt at a retail exit",
                    "To stop an unarmed suspect running away with stolen catalytic converters",
                    "ONLY when the officer reasonably believes deadly force is necessary to prevent imminent death or great bodily harm to themselves or another, or the commission of a violent forcible felony",
                    "To fire a warning shot into the ceiling to break up a verbal argument"
                ],
                correctAnswer: "ONLY when the officer reasonably believes deadly force is necessary to prevent imminent death or great bodily harm to themselves or another, or the commission of a violent forcible felony",
                remediationTarget: "sec9-1",
                explanation: "720 ILCS 5/7-1 restricts deadly force strictly to preventing imminent death, great bodily harm, or the commission of a forcible felony."
            },
            {
                id: "c9_2",
                question: "Which statement accurately describes the Illinois IDFPR Firearm Control Card ('Tan Card') under 225 ILCS 447?",
                options: [
                    "An Illinois Concealed Carry License (CCL) automatically replaces the need for a PERC or Tan Card while working uniformed armed security",
                    "A Tan Card requires active FOID + PERC credentials, is issued specifically under your employing licensed security agency, and authorizes carry only on duty and during direct home-to-work transit",
                    "Once issued, a Tan Card never requires annual range requalification and transfers automatically between any employer",
                    "A Tan Card grants peace-officer authority to make traffic stops off duty"
                ],
                correctAnswer: "A Tan Card requires active FOID + PERC credentials, is issued specifically under your employing licensed security agency, and authorizes carry only on duty and during direct home-to-work transit",
                remediationTarget: "sec9-2",
                explanation: "Under 225 ILCS 447, armed guards must hold FOID + PERC + agency-linked Tan Card, requalify annually, and carry under Tan Card authority only on duty and during direct commute."
            },
            {
                id: "c9_3",
                question: "After a lawful defensive shooting once the threat is neutralized and the scene is safe, what should an armed security officer do BEFORE responding police officers enter the room?",
                options: [
                    "Stand in the doorway waving the pistol in the air so police see you",
                    "Pick up all brass shell casings and put them in your pocket",
                    "Holster/secure your firearm, call 911 with your exact uniform description, preserve the scene, and keep empty hands visible when police arrive",
                    "Leave the property immediately and go home before police arrive"
                ],
                correctAnswer: "Holster/secure your firearm, call 911 with your exact uniform description, preserve the scene, and keep empty hands visible when police arrive",
                remediationTarget: "sec9-3",
                explanation: "Securing your weapon once safe and displaying visible empty hands prevents tragic mistaken-identity shootings when responding officers arrive."
            }
        ],
        takeaways: [
            "Deadly force (720 ILCS 5/7-1) = ONLY to prevent imminent DEATH, GREAT BODILY HARM, or FORCIBLE FELONY.",
            "NEVER fire warning shots and NEVER shoot over mere property theft or unarmed fleeing suspects.",
            "Armed duty requires active FOID + PERC + Employer-Issued IDFPR Tan Card (plus annual range requalification).",
            "Post-incident: ensure safety, holster before police arrive, call 911/EMS, preserve scene, brief public-safety facts."
        ]
    },
    {
        id: 10,
        number: "Lesson 10",
        title: "Live-Fire Range Safety, Firing Line Commands & Official 50-Round Qualification",
        duration: "2 Hours",
        icon: "bullseye",
        summary: "Preparing for your included Live-Fire Range Qualification at Eagle Sports Range: mandatory PPE and dress code, firing-line malfunction/question protocol (raise non-shooting hand), official Range Commands (LOAD, BEGIN FIRING, CEASE FIRE / Physical Contact), and exact 35/50 Pistol & Rifle/Shotgun Qualification courses of fire.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Comply with all 5 mandatory <strong>Live-Fire Range Safety &amp; Dress Code Rules</strong> prior to stepping onto Eagle Sports Range.</li>
                    <li>Execute the exact 5-step <strong>Firing-Line Malfunction / Question Protocol</strong> without turning around with a loaded firearm.</li>
                    <li>Respond instantaneously to the 3 official <strong>Range Commands</strong>: <strong>LOAD</strong>, <strong>BEGIN FIRING</strong>, and <strong>CEASE FIRE / Physical Contact</strong>.</li>
                    <li>Memorize every yardage line, round count, hand requirement, and <strong>35/50 (70%) scoring threshold</strong> for both the <strong>Pistol Qualification</strong> and <strong>Rifle/Shotgun Qualification</strong> standards.</li>
                </ul>
            </div>

            <div class="instructor-field-narration" id="field-narration-les-10">
                <div class="narration-header">
                    <div class="narrator-meta">
                        <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION &amp; CASE STUDY</span>
                        <h3 class="narration-title">Range Day at Eagle Sports Range: How to Pass 50 Rounds Like a Pro</h3>
                        <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read</span>
                    </div>
                </div>
                <div class="narration-body-text">
                    <p>Congratulations on reaching Lesson 10! Once you pass your 50-question online written exam right after this module, you will complete the Trainee section of your official <strong>IDFPR Firearms Training Certificate (Form IL486-1138 &bull; Approved Curriculum #102-000398)</strong>, which saves directly to your student profile for me to complete after your in-person live-fire qualification at <strong>Eagle Sports Range (5900 W 159th St, Oak Forest, IL)</strong>—where your range fee, targets, and qualification ammunition are ALREADY INCLUDED in your tuition!</p>
                    <p>Let me tell you what gets a student sent home from the firing line vs. what gets a student signed off smoothly on IDFPR Form IL486-1138 (and emailed to both you and <strong>FPR.SafetyUnit@illinois.gov</strong>). Nobody fails range day because they shoot a 42 instead of a 50—minimum passing is <strong>35 out of 50 rounds (70%)</strong> inside the scoring area, and we coach your grip and sight alignment so you succeed. The ONLY thing that gets someone immediately disqualified on a live firing range is violating a safety rule!</p>
                    <p>Picture what happens when a nervous student's pistol jams on the firing line: an untrained shooter turns their body 90 degrees toward the instructor while still holding the loaded gun in their hand, sweeping every student next to them! On our range, if your gun malfunctions OR you simply have a question: <strong>(1) STOP SHOOTING, (2) KEEP THE GUN POINTED DOWNRANGE IN A SAFE DIRECTION (Rule #1), (3) TAKE YOUR FINGER OFF THE TRIGGER (Rule #2), (4) RAISE YOUR NON-SHOOTING HAND, and (5) WAIT FOR ASSISTANCE</strong>. And show up dressed right: closed-toe shoes, high-necked crew shirt (hot brass down an open collar causes instant panic!), zero alcohol/drugs, and eye/ear protection on BEFORE entering the bay.</p>
                </div>
                <div class="narration-footer-takeaway">
                    <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong>
                    ANY person on the range has the authority and duty to yell "CEASE FIRE!" if they spot an unsafe condition. If you hear "CEASE FIRE" or feel physical contact on your shoulder: Finger OFF trigger immediately, keep muzzle pointed downrange, and await instructions!
                </div>
            </div>

            <h3 id="sec10-1">1. Mandatory Range Safety &amp; Dress Code Rules</h3>
            <p>Every trainee attending Live-Fire Range Qualification at Eagle Sports Range must strictly obey all five range safety mandates:</p>
            <ul>
                <li><strong>1. Wear Eye &amp; Ear Protection at ALL Times:</strong> Impact-rated wrap-around ballistic glasses and hearing protection must be worn before crossing the range bay threshold and kept on until exiting.</li>
                <li><strong>2. ZERO Alcohol or Drugs Before or While Shooting:</strong> Absolute zero tolerance for alcohol, cannabis, illicit substances, or impairing prescription sedatives prior to or during range training.</li>
                <li><strong>3. NO Open-Toe Shoes:</strong> Wear sturdy closed-toe footwear (boots or athletic shoes)—no sandals, slides, crocs, or flip-flops on a brass-strewn firing line.</li>
                <li><strong>4. Wear High-Collared / Crew-Neck Shirts (Cover Cleavage &amp; Neckline):</strong> Freshly ejected brass casings reach over 300&deg;F! Low-cut or V-neck shirts trap scalding brass against skin, causing dangerous reflexive muzzle sweeps. Wear a crew-neck shirt (and optional baseball cap).</li>
                <li><strong>5. DO NOT Attempt to Clear Malfunctions on the Range Without Permission &amp; Supervision:</strong> During supervised range qualification, never self-clear a jammed or misfired gun at the bench without an Instructor standing beside you.</li>
            </ul>

            <h3 id="sec10-2">2. Firing-Line Malfunction Protocol &amp; Official Range Commands</h3>
            <div class="callout warning">
                <strong>5-STEP RANGE MALFUNCTION OR QUESTION PROTOCOL:</strong>
                <p>If you believe you have experienced a firearm/cartridge malfunction OR simply have a question on the firing line:</p>
                <ol>
                    <li><strong>STOP SHOOTING</strong> immediately;</li>
                    <li><strong>KEEP GUN POINTED IN A SAFE DIRECTION</strong> downrange (Rule #1 — NEVER turn around with the gun!);</li>
                    <li><strong>TAKE FINGER OFF THE TRIGGER</strong> and index along the frame (Rule #2);</li>
                    <li><strong>RAISE YOUR NON-SHOOTING HAND</strong> straight up; and</li>
                    <li><strong>WAIT FOR ASSISTANCE</strong> from the Range Instructor.</li>
                </ol>
            </div>

            <p><strong>Official Academy Range Commands:</strong></p>
            <ul>
                <li><strong>"LOAD":</strong> Insert your <strong>10-round loaded magazine</strong> into the pistol and <strong>charge (rack) the pistol</strong> to chamber a round; keep muzzle pointed straight downrange and finger indexed OFF the trigger until commanded to fire.</li>
                <li><strong>"BEGIN FIRING":</strong> Acquire your sight picture and <strong>fire when ready</strong> on your assigned target number.</li>
                <li><strong>"CEASE FIRE" / PHYSICAL CONTACT:</strong> <em>Anyone</em> on a range may call "CEASE FIRE!" upon observing any hazard. If anyone calls <strong>"CEASE FIRE"</strong>—OR if an Instructor makes <strong>physical contact</strong> with your shoulder/arm—immediately <strong>take your finger off the trigger, stop firing, keep the gun pointed downrange in a safe direction, and follow the Instructor's instructions</strong>!</li>
            </ul>

            <h3 id="sec10-3">3. Official 50-Round Pistol &amp; Rifle/Shotgun Qualification Standards</h3>
            <p>To pass Illinois Armed Security live-fire qualification under <strong>68 Ill. Adm. Code 1240.510(b)</strong> and Platforms Training Academy standards, you must fire <strong>50 total rounds</strong> and score at least <strong>35 out of 50 rounds (70%) inside the target scoring area</strong>:</p>

            <div class="range-qual-table-wrap">
                <table class="range-qual-table">
                    <thead>
                        <tr>
                            <th>Stage</th>
                            <th>Pistol Distance</th>
                            <th>Rounds</th>
                            <th>Required Shooting Grip / Hand</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Stage 1</strong></td>
                            <td>5 Yards</td>
                            <td>10 Rounds</td>
                            <td><strong>Two Hands</strong> (Standard Two-Handed Grip)</td>
                        </tr>
                        <tr>
                            <td><strong>Stage 2</strong></td>
                            <td>5 Yards</td>
                            <td>10 Rounds</td>
                            <td><strong>Right Hand Only</strong> (Single-Handed)</td>
                        </tr>
                        <tr>
                            <td><strong>Stage 3</strong></td>
                            <td>5 Yards</td>
                            <td>10 Rounds</td>
                            <td><strong>Left Hand Only</strong> (Single-Handed)</td>
                        </tr>
                        <tr>
                            <td><strong>Stage 4</strong></td>
                            <td>7 Yards</td>
                            <td>10 Rounds</td>
                            <td><strong>Two Hands</strong> (Standard Two-Handed Grip)</td>
                        </tr>
                        <tr>
                            <td><strong>Stage 5</strong></td>
                            <td>10 Yards</td>
                            <td>10 Rounds</td>
                            <td><strong>Two Hands</strong> (Standard Two-Handed Grip)</td>
                        </tr>
                        <tr>
                            <td colspan="2"><strong>TOTAL PISTOL COURSE OF FIRE</strong></td>
                            <td><strong>50 Rounds</strong></td>
                            <td><strong>Minimum Passing Score: 35 / 50 (70%) Inside Scoring Area</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <p><strong>Optional Rifle / Shotgun Endorsement Qualification Standards (50 Rounds — Minimum 35 / 50 Inside Scoring Area):</strong> 10 rounds at <strong>10 Yards</strong>, 10 rounds at <strong>20 Yards</strong>, 10 rounds at <strong>30 Yards</strong>, 10 rounds at <strong>40 Yards</strong>, and 10 rounds at <strong>50 Yards</strong>.</p>

            <div class="armed-slide-grid">
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_81_pistol_qualification.jpg" alt="Official 50-Round Pistol Qualification Standards">
                    </div>
                    <figcaption>
                        <strong>Official Pistol Qualification &bull; 35/50 Passing Standard</strong>
                        5 yds (10 Two-Hand, 10 Right-Hand, 10 Left-Hand), 7 yds (10 Two-Hand), and 10 yds (10 Two-Hand).
                    </figcaption>
                </figure>
                <figure class="armed-slide-figure">
                    <div class="armed-slide-img-wrap">
                        <img src="assets/slide_82_rifle_shotgun_qualification.jpg" alt="Official Rifle and Shotgun Qualification Standards">
                    </div>
                    <figcaption>
                        <strong>Official Rifle / Shotgun Qualification &bull; 35/50 Passing Standard</strong>
                        10 rounds each at 10 yards, 20 yards, 30 yards, 40 yards, and 50 yards (50 rounds total).
                    </figcaption>
                </figure>
            </div>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Stoppage on the Live Firing Line at 7 Yards",
            setup: "You are standing in Booth #4 at Eagle Sports Range firing the 7-yard two-handed stage of your 50-round qualification. After your fourth shot, the trigger feels dead and the pistol fails to fire.",
            question: "What is the ONLY safe, compliant sequence of actions on the supervised qualification firing line?",
            options: [
                {
                    text: "Turn around 180 degrees toward the Range Instructor holding the pistol out in both hands and ask him to look at it.",
                    correct: false,
                    feedback: "INCORRECT — AUTOMATIC SAFETY DISQUALIFICATION! Turning uprange with a firearm sweeps everyone on the firing line and violates Rule #1."
                },
                {
                    text: "Stop shooting immediately, keep the pistol pointed straight downrange in a safe direction (Rule #1), take your finger off the trigger and index along the frame (Rule #2), raise your non-shooting hand, and wait calmly for the Instructor's assistance.",
                    correct: true,
                    feedback: "CORRECT! On the supervised firing line, never turn around and never attempt unsupervised malfunction clearing: Stop shooting, keep gun pointed downrange, finger off trigger, raise non-shooting hand, and wait for assistance."
                },
                {
                    text: "Take off your safety glasses and ear muffs in the active shooting booth so you can see and hear the pistol better.",
                    correct: false,
                    feedback: "INCORRECT. Eye and ear protection must NEVER be removed inside an active firing bay."
                }
            ],
            illustration: "assets/slide_81_pistol_qualification.jpg"
        },
        checkOnLearning: [
            {
                id: "c10_1",
                question: "During supervised live-fire range qualification, what must you do if you experience a malfunction or have a question?",
                options: [
                    "Walk back to the lobby carrying the loaded pistol",
                    "Stop shooting, keep gun pointed in a safe direction, take finger off trigger, raise your non-shooting hand, and wait for assistance",
                    "Disassemble the slide on the floor while neighbors are shooting",
                    "Wave the pistol above the booth partition to get attention"
                ],
                correctAnswer: "Stop shooting, keep gun pointed in a safe direction, take finger off trigger, raise your non-shooting hand, and wait for assistance",
                remediationTarget: "sec10-2",
                explanation: "Always stop shooting, maintain downrange muzzle control (Rule #1), index finger off trigger (Rule #2), raise your non-shooting hand, and wait for the Instructor."
            },
            {
                id: "c10_2",
                question: "What is the minimum passing score and exact stage breakdown for the 50-round Pistol Qualification Course?",
                options: [
                    "25/50 rounds all fired from 3 yards with two hands",
                    "35/50 rounds (70%) inside the scoring area: 5 yds (10 two-hand, 10 right-hand, 10 left-hand), 7 yds (10 two-hand), and 10 yds (10 two-hand)",
                    "50/50 rounds fired from 50 yards one-handed",
                    "10/50 rounds fired from the hip"
                ],
                correctAnswer: "35/50 rounds (70%) inside the scoring area: 5 yds (10 two-hand, 10 right-hand, 10 left-hand), 7 yds (10 two-hand), and 10 yds (10 two-hand)",
                remediationTarget: "sec10-3",
                explanation: "Pistol qualification requires at least 35/50 (70%) inside the scoring area across 5 stages: 5 yds two-hand (10), 5 yds right-hand (10), 5 yds left-hand (10), 7 yds two-hand (10), and 10 yds two-hand (10)."
            },
            {
                id: "c10_3",
                question: "What must you do immediately if ANYONE yells 'CEASE FIRE' or an Instructor makes physical contact with you on the firing line?",
                options: [
                    "Quickly fire your remaining rounds before lowering the pistol",
                    "Take your finger off the trigger, stop shooting, keep the gun pointed downrange in a safe direction, and follow instructions",
                    "Spin around to see who shouted 'Cease Fire'",
                    "Drop the loaded pistol onto the concrete floor"
                ],
                correctAnswer: "Take your finger off the trigger, stop shooting, keep the gun pointed downrange in a safe direction, and follow instructions",
                remediationTarget: "sec10-2",
                explanation: "Upon hearing 'Cease Fire' or feeling physical contact on the range, immediately remove your finger from the trigger, keep the muzzle pointed downrange in a safe direction, and await instructions."
            }
        ],
        takeaways: [
            "Range Dress & Safety: Eye/ear PPE at all times, zero alcohol/drugs, closed-toe shoes, crew-neck shirt.",
            "Range Malfunction / Question: Stop, keep pointed downrange, finger off trigger, raise non-shooting hand, wait.",
            "Commands: LOAD (10-rd mag & charge), BEGIN FIRING, CEASE FIRE / Physical Contact (stop & finger off trigger!).",
            "Pistol Qualification = 35/50 (70%) across 5 yds (10 2H, 10 RH, 10 LH), 7 yds (10 2H), and 10 yds (10 2H)."
        ]
    }
];

const EXAM_QUESTIONS = [
    // --- PART 1: TRUE OR FALSE — GUN SAFETY & STATUTORY MANDATES (1-8) ---
    {
        id: 1,
        part: "Part 1: Safety & Statutory True/False",
        type: "tf",
        question: "One of the 4 Cardinal Rules for Safe Gun Handling is to ALWAYS keep your finger off the trigger until you are ready to shoot.",
        options: ["True", "False"],
        correctAnswer: "True",
        illustration: {
            type: "image",
            src: "assets/slide_05_four_safety_rules.jpg",
            caption: "Academy Safety Standard: The 4 Cardinal Rules for Safe Gun Handling."
        },
        explanation: "TRUE. Rule #2 requires keeping your index finger straight along the frame, outside and away from the trigger guard, until your sights are aligned on target and you have decided to shoot."
    },
    {
        id: 2,
        part: "Part 1: Safety & Statutory True/False",
        type: "tf",
        question: "Simply removing the magazine from a semi-automatic pistol guarantees that the firearm is completely unloaded and safe.",
        options: ["True", "False"],
        correctAnswer: "False",
        illustration: {
            type: "image",
            src: "assets/slide_30_clearing_pistol.jpg",
            caption: "Clearing Protocol: Removing the magazine does NOT remove a live cartridge already seated inside the barrel chamber."
        },
        explanation: "FALSE. Removing the magazine only removes the source of reserve ammunition; a live cartridge can still remain inside the chamber and fire if the trigger is pulled. You must rack/lock the slide open AND visually/physically inspect the chamber."
    },
    {
        id: 3,
        part: "Part 1: Safety & Statutory True/False",
        type: "tf",
        question: "When establishing a two-handed grip on a REVOLVER, the support-hand thumb should lie ATOP the shooting-hand thumb rather than extended forward beside the cylinder.",
        options: ["True", "False"],
        correctAnswer: "True",
        illustration: {
            type: "image",
            src: "assets/slide_11_thumb_position.jpg",
            caption: "Platform Grip Safety: Revolver vs. Semi-Automatic thumb placement."
        },
        explanation: "TRUE. On a revolver, placing the support-hand thumb atop the shooting-hand thumb keeps both thumbs safely behind the barrel-cylinder gap, where superheated high-pressure gas escapes sideways upon firing."
    },
    {
        id: 4,
        part: "Part 1: Safety & Statutory True/False",
        type: "tf",
        question: "Ammunition marked '+P' or '+P+' has the same external dimensions as standard-pressure cartridges and may safely be fired in ANY pistol of that caliber regardless of manufacturer certification.",
        options: ["True", "False"],
        correctAnswer: "False",
        illustration: {
            type: "image",
            src: "assets/slide_44_plus_p_cartridges.jpg",
            caption: "Overpressure Warning: +P and +P+ loads must ONLY be fired in pistols certified for higher pressure."
        },
        explanation: "FALSE. Although +P and +P+ cartridges share standard external dimensions and will physically chamber, they generate higher internal pressures and must ONLY be used in firearms explicitly certified for them by the manufacturer."
    },
    {
        id: 5,
        part: "Part 1: Safety & Statutory True/False",
        type: "tf",
        question: "In pistol marksmanship, Sight Alignment ('Equal Height, Equal Light') is MORE critical to downrange accuracy than Sight Picture.",
        options: ["True", "False"],
        correctAnswer: "True",
        illustration: {
            type: "image",
            src: "assets/slide_66_sight_errors.jpg",
            caption: "Angular Error Physics: Sight Alignment error multiplies rapidly as target distance increases."
        },
        explanation: "TRUE. A parallel Sight Picture error offsets impact only by that exact parallel amount, whereas an angular Sight Alignment error multiplies dramatically with every yard of distance downrange."
    },
    {
        id: 6,
        part: "Part 1: Safety & Statutory True/False",
        type: "tf",
        question: "Under Illinois law (720 ILCS 5/7-1 and 5/7-3), an armed security officer may lawfully fire at an unarmed fleeing shoplifter to recover expensive retail merchandise.",
        options: ["True", "False"],
        correctAnswer: "False",
        illustration: {
            type: "image",
            src: "../assets/use_of_force.png",
            caption: "Illinois Deadly Force Boundary: Deadly force is NEVER permissible solely to protect property."
        },
        explanation: "FALSE. Under 720 ILCS 5/7-1 and 5/7-3, deadly force is justified ONLY when reasonably necessary to prevent imminent death, great bodily harm, or a violent forcible felony—never merely to protect property or stop a non-dangerous fleeing thief."
    },
    {
        id: 7,
        part: "Part 1: Safety & Statutory True/False",
        type: "tf",
        question: "Holding an Illinois Concealed Carry License (CCL) exempts a uniformed armed security guard from needing an IDFPR Firearm Control Card ('Tan Card') while working armed security.",
        options: ["True", "False"],
        correctAnswer: "False",
        explanation: "FALSE. Under 225 ILCS 447, performing armed private security duties in Illinois strictly requires an active FOID card, an active PERC card, and an employer-linked IDFPR Firearm Control Card ('Tan Card'). A personal CCL does not authorize uniformed armed security employment."
    },
    {
        id: 8,
        part: "Part 1: Safety & Statutory True/False",
        type: "tf",
        question: "On a live firing range, ANY individual who observes a dangerous or unsafe condition has the authority and obligation to call 'CEASE FIRE!' immediately.",
        options: ["True", "False"],
        correctAnswer: "True",
        explanation: "TRUE. Range safety is everyone's responsibility. Anyone spotting an unsafe condition may call 'CEASE FIRE!', upon which all shooters must immediately remove fingers from triggers, stop shooting, keep muzzles pointed downrange, and await instructions."
    },

    // --- PART 2: GRIP, STANCE, ACTIONS & FIREARM ANATOMY (9-18) ---
    {
        id: 9,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "According to the Academy curriculum, what are the TWO primary root causes of firearm accidents?",
        options: [
            "Bad weather and heavy recoil springs",
            "Ignorance (lack of knowledge) and Carelessness (poor or improper attitude / failure to apply safety rules)",
            "Short barrels and polymer frames",
            "Indoor lighting and heavy triggers"
        ],
        correctAnswer: "Ignorance (lack of knowledge) and Carelessness (poor or improper attitude / failure to apply safety rules)",
        explanation: "Firearm accidents stem from Ignorance (lack of knowledge of safety rules or pistol operation) and Carelessness (failing to apply safety rules due to complacency or poor attitude)."
    },
    {
        id: 10,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "What defines proper Safe Trigger Finger Position whenever you are handling a firearm and NOT actively firing at a target?",
        options: [
            "Index finger resting lightly on the front face of the trigger",
            "Index finger curled underneath the bottom of the trigger guard",
            "Index finger placed straight alongside the frame of the pistol, above and away from the trigger guard",
            "Middle finger inside the trigger guard with index finger on the slide"
        ],
        correctAnswer: "Index finger placed straight alongside the frame of the pistol, above and away from the trigger guard",
        illustration: {
            type: "image",
            src: "assets/slide_08_trigger_finger.jpg",
            caption: "Safe Trigger Finger Indexing: Flat along the frame, high above the trigger guard."
        },
        explanation: "Keeping the index finger flat along the frame above the trigger guard prevents involuntary startle-reflex or stumble discharges."
    },
    {
        id: 11,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "When assuming a Two-Handed Grip on a SEMI-AUTOMATIC pistol, where should the support-hand thumb be placed?",
        options: [
            "Crossed directly behind the rear of the steel slide",
            "Under the shooting-hand thumb along the side of the frame (clear of the reciprocating slide)",
            "Pressed down hard on top of the slide stop lever",
            "Wrapped over the ejection port"
        ],
        correctAnswer: "Under the shooting-hand thumb along the side of the frame (clear of the reciprocating slide)",
        illustration: {
            type: "image",
            src: "assets/slide_11_thumb_position.jpg",
            caption: "Semi-Auto Grip: Support-hand thumb rests under the shooting-hand thumb."
        },
        explanation: "On a semi-automatic pistol, placing the support-hand thumb under the shooting-hand thumb points both thumbs safely forward below the slide and prevents painful 'slide bite'."
    },
    {
        id: 12,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "Which description accurately defines a proper tactical pistol STANCE?",
        options: [
            "Feet pressed together, knees locked rigid, leaning backward on the heels",
            "Feet shoulder-width apart, knees slightly bent, upper body facing target and leaning aggressively forward at the waist, with body weight on the balls of the feet",
            "Standing sideways with one hand behind your back and weight on your back heel",
            "Sitting back on your heels with elbows locked behind your shoulders"
        ],
        correctAnswer: "Feet shoulder-width apart, knees slightly bent, upper body facing target and leaning aggressively forward at the waist, with body weight on the balls of the feet",
        illustration: {
            type: "image",
            src: "assets/slide_12_tactical_stance.jpg",
            caption: "Balanced & Mobile Platform: Aggressive forward lean with weight on the balls of the feet."
        },
        explanation: "A stable, mobile stance keeps feet shoulder-width apart, knees slightly flexed, weight forward on the balls of the feet, and the upper body leaning aggressively forward at the waist to absorb recoil."
    },
    {
        id: 13,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "On a SINGLE-ACTION (SA) pistol, what mechanical function does pulling the trigger perform?",
        options: [
            "It both cocks the hammer and releases the hammer on every pull",
            "It performs a single action: releasing an already-cocked hammer (the hammer must be manually cocked for the first shot)",
            "It rotates a 6-shot cylinder without releasing the hammer",
            "It ejects the magazine onto the ground"
        ],
        correctAnswer: "It performs a single action: releasing an already-cocked hammer (the hammer must be manually cocked for the first shot)",
        explanation: "Single-Action triggers perform only one mechanical job—releasing the hammer/striker—requiring the hammer to be manually cocked before the first shot."
    },
    {
        id: 14,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "How does a DOUBLE-ACTION-ONLY (DAO) pistol operate?",
        options: [
            "The first shot is Double-Action and all follow-up shots are Single-Action",
            "Each pull of the trigger both cocks and releases the hammer, and the firearm CANNOT be fired in Single-Action mode",
            "It fires two bullets simultaneously with one pull of the trigger",
            "It requires thumb-cocking the hammer before every single shot"
        ],
        correctAnswer: "Each pull of the trigger both cocks and releases the hammer, and the firearm CANNOT be fired in Single-Action mode",
        explanation: "In a Double-Action-Only (DAO) mechanism, every trigger press both cocks and releases the hammer with a uniform pull weight, and Single-Action mode is mechanically unavailable."
    },
    {
        id: 15,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "On a revolver, which component houses the multiple individual firing chambers that rotate into alignment with the barrel?",
        options: [
            "The Magazine Well",
            "The Cylinder",
            "The Slide Stop",
            "The Beavertail"
        ],
        correctAnswer: "The Cylinder",
        illustration: {
            type: "image",
            src: "assets/slide_20_revolver_parts3.jpg",
            caption: "Revolver Components: Cylinder, Ejector Rod, Cylinder Release Latch, Hammer, and Trigger."
        },
        explanation: "Unlike a semi-automatic pistol (whose single chamber is machined into the barrel), a revolver's firing chambers are bored into its rotating cylinder."
    },
    {
        id: 16,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "What are the spiraling raised ridges and recessed channels inside a pistol barrel called, and what do they do?",
        options: [
            "Locking Lugs & Feed Ramps — they slow the bullet down",
            "Rifling (Lands and Grooves) — they engrave the bullet and give it stabilizing spin as it travels through the bore",
            "Ejector Rods — they push empty brass out the muzzle",
            "Chokes — they spread pellets into a wide pattern"
        ],
        correctAnswer: "Rifling (Lands and Grooves) — they engrave the bullet and give it stabilizing spin as it travels through the bore",
        illustration: {
            type: "image",
            src: "assets/slide_22_rifling.jpg",
            caption: "Barrel Rifling: Spiraling Lands (raised) and Grooves (recessed) spin-stabilize the bullet."
        },
        explanation: "Rifling consists of spiraling raised Lands and cut Grooves that engrave the projectile and impart gyroscopic spin for accurate flight."
    },
    {
        id: 17,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "What are the FOUR primary parts of a semi-automatic pistol barrel?",
        options: [
            "Cylinder, Crane, Ejector Rod, and Hammer Spur",
            "Chamber, Locking Lugs, Rifling, and Muzzle",
            "Magazine, Follower, Spring, and Baseplate",
            "Front Strap, Backstrap, Grip Panel, and Trigger Guard"
        ],
        correctAnswer: "Chamber, Locking Lugs, Rifling, and Muzzle",
        illustration: {
            type: "image",
            src: "assets/slide_27_semiauto_barrel.jpg",
            caption: "Semi-Automatic Barrel Anatomy: Chamber, Locking Lugs, Rifling, and Muzzle."
        },
        explanation: "A semi-automatic barrel incorporates the integral Chamber, Locking Lugs, Rifled Bore, and Muzzle."
    },
    {
        id: 18,
        part: "Part 2: Grip, Stance & Firearm Anatomy",
        type: "mc",
        question: "What are the THREE mechanical functions of a semi-automatic pistol slide during the firing cycle?",
        options: [
            "Rotating the cylinder, locking the safety, and dropping the magazine",
            "(1) Extracting & ejecting the fired case, (2) Cocking the hammer or firing pin, and (3) Feeding the top cartridge from the magazine into the chamber",
            "(1) Igniting powder, (2) Spinning the bullet, and (3) Cooling the grip",
            "Opening the holster hood, aligning the sights, and resetting the trigger guard"
        ],
        correctAnswer: "(1) Extracting & ejecting the fired case, (2) Cocking the hammer or firing pin, and (3) Feeding the top cartridge from the magazine into the chamber",
        explanation: "Every cycle of a semi-automatic slide extracts/ejects the spent casing, cocks the hammer or striker/firing pin, and strips/feeds the top cartridge from the magazine into the chamber."
    },

    // --- PART 3: CLEARING, RELOADS, STORAGE & AMMUNITION (19-28) ---
    {
        id: 19,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "What is the ONLY correct step-by-step sequence for CLEARING a semi-automatic pistol?",
        options: [
            "1. Rack the slide first, 2. Remove the magazine second, 3. Pull the trigger to check if empty",
            "1. Remove the magazine FIRST, 2. Rack/lock the slide open to extract any round from the chamber SECOND, 3. Visually (and physically) ensure the chamber is clear THIRD",
            "1. Engage the thumb safety, 2. Put the gun in the holster without checking the chamber",
            "1. Rotate the takedown lever first while the magazine is still inserted"
        ],
        correctAnswer: "1. Remove the magazine FIRST, 2. Rack/lock the slide open to extract any round from the chamber SECOND, 3. Visually (and physically) ensure the chamber is clear THIRD",
        illustration: {
            type: "image",
            src: "assets/slide_30_clearing_pistol.jpg",
            caption: "Mandatory Clearing Order: Remove Magazine -> Extract Round -> Visually Ensure Chamber Clear."
        },
        explanation: "Racking the slide before removing a loaded magazine chambers another live round! Always remove the magazine FIRST, extract/lock the slide SECOND, and visually/physically verify an empty chamber THIRD."
    },
    {
        id: 20,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "Where should pistol loading and reloading be performed to maintain visual awareness of threats downrange?",
        options: [
            "Down by your ankles while kneeling and looking at the floor",
            "Inside your 'Workspace' (upper chest/chin height just below eye level)",
            "Behind your back out of sight",
            "Inside the holster while strapped to your hip"
        ],
        correctAnswer: "Inside your 'Workspace' (upper chest/chin height just below eye level)",
        illustration: {
            type: "image",
            src: "assets/slide_32_workspace_reload.jpg",
            caption: "Workspace Manipulation: Keep the pistol high in your chest/chin workspace while reloading."
        },
        explanation: "Loading and reloading in your upper-chest Workspace lets peripheral vision guide the magazine while your eyes stay upright scanning for threats."
    },
    {
        id: 21,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "How does an EMERGENCY RELOAD differ from a TACTICAL RELOAD?",
        options: [
            "An Emergency Reload drops an empty/depleted magazine to the ground WITHOUT retaining it and immediately inserts a full magazine; a Tactical Reload replaces a partially empty magazine while RETAINING that partially full magazine",
            "A Tactical Reload throws the entire pistol on the ground, whereas an Emergency Reload cleans the barrel",
            "An Emergency Reload is only performed off-duty at home",
            "There is zero difference between the two reloads"
        ],
        correctAnswer: "An Emergency Reload drops an empty/depleted magazine to the ground WITHOUT retaining it and immediately inserts a full magazine; a Tactical Reload replaces a partially empty magazine while RETAINING that partially full magazine",
        explanation: "Emergency reloads maximize immediate speed when empty/depleted by dropping the magazine free; Tactical reloads proactively top off the weapon during a lull while retaining remaining reserve ammo."
    },
    {
        id: 22,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "Before disassembling (field-stripping) any pistol for cleaning, what TWO precautions are mandatory?",
        options: [
            "Load a full magazine and oil the trigger face",
            "Remove all live ammunition from the cleaning area AND clear the pistol completely (verify empty magazine well and empty chamber) before starting disassembly",
            "Heat the firearm in an oven and soak cartridges in solvent",
            "Cock the hammer on a live chambered round"
        ],
        correctAnswer: "Remove all live ammunition from the cleaning area AND clear the pistol completely (verify empty magazine well and empty chamber) before starting disassembly",
        illustration: {
            type: "image",
            src: "assets/slide_34_disassembly_cleaning.jpg",
            caption: "Disassembly Safety: Ensure pistol is 100% clear before touching takedown controls."
        },
        explanation: "Never begin disassembly until live ammo is removed from the workspace and the firearm is verified 100% clear, following the manufacturer's specific procedure."
    },
    {
        id: 23,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "How should firearms and ammunition be stored when off duty, including compliance with Illinois Safe Storage Law (720 ILCS 5/24-9)?",
        options: [
            "Loaded on an open coffee table in a humid basement",
            "In a cool, dry place—locked/secured where children (especially minors under 14 per 720 ILCS 5/24-9) and unauthorized persons cannot access them, with ammunition kept in its original factory box away from oils/solvents",
            "Submerged in penetrating oil inside an unlocked glove compartment",
            "Mixed loosely with keys and coins in an open drawer"
        ],
        correctAnswer: "In a cool, dry place—locked/secured where children (especially minors under 14 per 720 ILCS 5/24-9) and unauthorized persons cannot access them, with ammunition kept in its original factory box away from oils/solvents",
        explanation: "Safe storage requires a cool, dry environment secured against children and unauthorized persons (720 ILCS 5/24-9), keeping ammo clean in factory boxes away from solvents and petroleum products."
    },
    {
        id: 24,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "What are the FOUR components of a modern cartridge?",
        options: [
            "Barrel, Slide, Trigger, and Grip",
            "Case, Primer (priming compound), Powder Charge, and Bullet",
            "Firing Pin, Extractor, Ejector, and Plunger",
            "Lead, Steel, Polymer, and Spring"
        ],
        correctAnswer: "Case, Primer (priming compound), Powder Charge, and Bullet",
        illustration: {
            type: "image",
            src: "assets/slide_40_cartridge_components.jpg",
            caption: "Cartridge Components: Bullet, Powder Charge, Case, and Primer."
        },
        explanation: "A metallic cartridge comprises four components: Case, Primer, Powder Charge, and Bullet."
    },
    {
        id: 25,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "What is the key structural difference between a RIMFIRE cartridge and a CENTERFIRE cartridge?",
        options: [
            "Rimfire cartridges hold priming compound inside the rim of the case head, whereas Centerfire cartridges house priming compound in a metal primer cup in the center of the case head",
            "Rimfire cartridges have no bullet at the front",
            "Centerfire cartridges use black powder only and cannot be used in duty pistols",
            "Rimfire cartridges are exclusively 12-gauge shotgun shells"
        ],
        correctAnswer: "Rimfire cartridges hold priming compound inside the rim of the case head, whereas Centerfire cartridges house priming compound in a metal primer cup in the center of the case head",
        illustration: {
            type: "image",
            src: "assets/slide_41_rimfire_centerfire.jpg",
            caption: "Rimfire vs. Centerfire primer construction."
        },
        explanation: "Centerfire duty cartridges locate a dedicated metal primer cup in the center of the case head, delivering superior reliability and reloadable brass strength compared to rimfire."
    },
    {
        id: 26,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "During the 6-step Cartridge Firing Sequence, what actually pushes the bullet down the barrel bore at high velocity?",
        options: [
            "The mechanical spring force of the firing pin pushing the bullet all the way out the muzzle",
            "High-pressure expanding gas generated by the rapid burning of the powder charge after the primer flame ignites it",
            "Compressed air pumped from the recoil spring",
            "Magnetic attraction from the front sight"
        ],
        correctAnswer: "High-pressure expanding gas generated by the rapid burning of the powder charge after the primer flame ignites it",
        illustration: {
            type: "image",
            src: "assets/slide_42_firing_sequence.jpg",
            caption: "Internal Ballistics: Rapidly burning smokeless powder generates high-pressure gas that drives the bullet."
        },
        explanation: "Firing pin strikes primer -> primer flame ignites powder charge -> burning powder generates high-pressure gas -> expanding gas drives bullet through the bore and exits muzzle ('Bang')."
    },
    {
        id: 27,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "Where must you check the Cartridge Designation to ensure you are loading the exact correct ammunition for your pistol?",
        options: [
            "Only on the holster belt clip",
            "Match the designation across all three places: stamped on the Pistol (barrel/slide), stamped on the Cartridge Casehead, and printed on the Factory Ammunition Box",
            "Guess by holding the bullet next to your pinky finger",
            "Check only the color of the cardboard box"
        ],
        correctAnswer: "Match the designation across all three places: stamped on the Pistol (barrel/slide), stamped on the Cartridge Casehead, and printed on the Factory Ammunition Box",
        illustration: {
            type: "image",
            src: "assets/slide_43_cartridge_designation.jpg",
            caption: "Triple Verification: Pistol barrel/hood stamp, Cartridge casehead, and Factory box."
        },
        explanation: "Always verify caliber compatibility on the pistol barrel/slide, cartridge casehead, and factory ammunition box."
    },
    {
        id: 28,
        part: "Part 3: Clearing, Reloads & Ammunition",
        type: "mc",
        question: "Which group lists THREE synonymous designations for the exact same standard 9mm duty pistol cartridge?",
        options: [
            "9mm Luger / .380 Auto / .38 Special",
            "9mm Parabellum (9mm Para) / 9mm Luger / 9x19mm",
            "9mm Makarov (9x18mm) / 9mm Luger / .357 SIG",
            ".45 ACP / .45 Colt / .454 Casull"
        ],
        correctAnswer: "9mm Parabellum (9mm Para) / 9mm Luger / 9x19mm",
        explanation: "9mm Luger, 9mm Parabellum (9mm Para), and 9x19mm are identical specifications (just as .45 Auto and .45 ACP match), whereas .380 Auto (9x17mm) and 9mm Makarov (9x18mm) are NOT interchangeable."
    },

    // --- PART 4: CARTRIDGE & MECHANICAL MALFUNCTIONS (29-35) ---
    {
        id: 29,
        part: "Part 4: Firearm & Cartridge Malfunctions",
        type: "mc",
        question: "What are the THREE classic CARTRIDGE (ammunition) malfunctions covered in the Armed Security curriculum?",
        options: [
            "Sight Alignment Error, Sight Picture Error, and Arc of Movement",
            "Misfire, Hangfire, and Squib Load",
            "Single-Action, Double-Action, and Double-Action-Only",
            "Tactical Reload, Emergency Reload, and Holster Draw"
        ],
        correctAnswer: "Misfire, Hangfire, and Squib Load",
        explanation: "Cartridge malfunctions consist of Misfire (no ignition), Hangfire (delayed ignition), and Squib Load (under-powered ignition leaving a bullet stuck in the bore)."
    },
    {
        id: 30,
        part: "Part 4: Firearm & Cartridge Malfunctions",
        type: "mc",
        question: "What is a MISFIRE, and what are its two general categories of causes?",
        options: [
            "When two bullets exit the barrel at once due to clean rifling",
            "The failure of a cartridge to ignite when the primer or case rim is struck by the firing pin—caused by either a defect in the cartridge or a defect in the pistol",
            "When the shooter misses the paper target to the left",
            "When the slide locks open after firing the last round in an empty magazine"
        ],
        correctAnswer: "The failure of a cartridge to ignite when the primer or case rim is struck by the firing pin—caused by either a defect in the cartridge or a defect in the pistol",
        explanation: "A misfire occurs when the firing pin strikes the primer/rim and no ignition occurs, caused by either faulty/contaminated priming compound or a pistol firing-pin/spring defect."
    },
    {
        id: 31,
        part: "Part 4: Firearm & Cartridge Malfunctions",
        type: "mc",
        question: "What is a HANGFIRE, and what mandatory safety rule applies on the range when a round fails to fire upon trigger press?",
        options: [
            "A perceptible delay in cartridge ignition after the primer is struck; keep the pistol pointed downrange in a safe direction for AT LEAST 30 SECONDS before opening the action",
            "A stuck holster strap; immediately set the gun down pointing toward the bench",
            "An overheated barrel; pour cold water down the muzzle immediately",
            "A broken rear sight; rack the slide within 1 second while turning around"
        ],
        correctAnswer: "A perceptible delay in cartridge ignition after the primer is struck; keep the pistol pointed downrange in a safe direction for AT LEAST 30 SECONDS before opening the action",
        illustration: {
            type: "image",
            src: "assets/slide_50_hangfire.jpg",
            caption: "Hangfire Safety Protocol: Keep pointed in a safe direction for at least 30 seconds."
        },
        explanation: "Because a misfire cannot be distinguished immediately from a delayed hangfire, keep the muzzle pointed downrange for at least 30 seconds before opening the action."
    },
    {
        id: 32,
        part: "Part 4: Firearm & Cartridge Malfunctions",
        type: "mc",
        question: "A cartridge fires with a faint 'pop' (reduced noise), reduced muzzle flash, and reduced recoil. What malfunction has likely occurred, and what MUST you do?",
        options: [
            "Normal subsonic operation — keep firing rapidly",
            "SQUIB LOAD (a bullet lodged inside the barrel bore due to under-pressure ignition) — STOP FIRING IMMEDIATELY, clear the firearm completely, and inspect the bore for obstructions!",
            "Empty magazine lockback — perform an emergency reload and fire again",
            "Hangfire — pull the trigger five more times"
        ],
        correctAnswer: "SQUIB LOAD (a bullet lodged inside the barrel bore due to under-pressure ignition) — STOP FIRING IMMEDIATELY, clear the firearm completely, and inspect the bore for obstructions!",
        illustration: {
            type: "image",
            src: "assets/slide_52_squib_load.jpg",
            caption: "Squib Load Hazard: Firing another live cartridge behind a lodged bullet ruptures the barrel!"
        },
        explanation: "Reduced noise, reduced flash, and reduced recoil warn of a Squib Load with a bullet obstructing the bore. Stop firing immediately, unload/clear completely, and check the bore."
    },
    {
        id: 33,
        part: "Part 4: Firearm & Cartridge Malfunctions",
        type: "mc",
        question: "What defines a FAILURE TO EXTRACT ('stovepipe') versus a FAILURE TO FEED?",
        options: [
            "Failure to Extract occurs when a spent case fails to exit the chamber and completely eject from the pistol; Failure to Feed occurs when a live round fails to enter the chamber after the slide cycles on a loaded magazine",
            "Both terms mean the pistol ran out of ammunition normally",
            "Failure to Extract only happens on revolvers with no slide",
            "Failure to Feed means the bullet lodged halfway down the rifling"
        ],
        correctAnswer: "Failure to Extract occurs when a spent case fails to exit the chamber and completely eject from the pistol; Failure to Feed occurs when a live round fails to enter the chamber after the slide cycles on a loaded magazine",
        explanation: "Failure to Feed leaves a live round short of battery, whereas Failure to Extract/Eject leaves a spent case in the chamber or trapped in the ejection port."
    },
    {
        id: 34,
        part: "Part 4: Firearm & Cartridge Malfunctions",
        type: "mc",
        question: "In tactical defensive operation, what immediate 2-step method clears standard Failures to Feed or Failures to Extract?",
        options: [
            "'Drop, Kick' — drop the pistol and kick the magazine",
            "'Tap, Rack' — (1) Tap the bottom of the magazine firmly to seat it, and (2) Rack the slide briskly and release",
            "'Lock, Strip, Disassemble' — remove the barrel with a screwdriver",
            "'Wait 5 Minutes' — set the firearm down"
        ],
        correctAnswer: "'Tap, Rack' — (1) Tap the bottom of the magazine firmly to seat it, and (2) Rack the slide briskly and release",
        explanation: "'Tap, Rack' seats an unlatched magazine and cycles the slide to eject a bad round/stovepipe while feeding a fresh round."
    },
    {
        id: 35,
        part: "Part 4: Firearm & Cartridge Malfunctions",
        type: "mc",
        question: "What is a DOUBLE FEED, and how is it cleared when 'Tap, Rack' cannot resolve it?",
        options: [
            "When two magazines fit side-by-side in the grip",
            "When a live cartridge attempts to feed into an ALREADY occupied chamber; clear the pistol completely (lock slide open / strip magazine with force if needed, rack slide to clear chamber) and insert a new magazine",
            "When firing two controlled shots on target ('hammer pair')",
            "When loading two calibers into a revolver"
        ],
        correctAnswer: "When a live cartridge attempts to feed into an ALREADY occupied chamber; clear the pistol completely (lock slide open / strip magazine with force if needed, rack slide to clear chamber) and insert a new magazine",
        illustration: {
            type: "image",
            src: "assets/slide_58_double_feed.jpg",
            caption: "Double Feed Stoppage: Live cartridge jammed behind an already occupied chamber."
        },
        explanation: "Because the chamber is already blocked, tapping and racking cannot clear a Double Feed—you must lock the slide/remove the magazine, clear the chamber completely, and insert a fresh magazine."
    },

    // --- PART 5: THE FIVE FUNDAMENTALS OF PISTOL MARKSMANSHIP (36-43) ---
    {
        id: 36,
        part: "Part 5: Marksmanship Fundamentals",
        type: "mc",
        question: "What are ALL FIVE Fundamentals of Pistol Shooting that must be performed with every shot?",
        options: [
            "Drawing, Stance, Holstering, Cleaning, and Storage",
            "Aiming, Hold Control, Breath Control, Trigger Control, and Follow-Through",
            "Loading, Unloading, Tapping, Racking, and Counting",
            "Running, Hiding, Fighting, Handcuffing, and Reporting"
        ],
        correctAnswer: "Aiming, Hold Control, Breath Control, Trigger Control, and Follow-Through",
        explanation: "The 5 Fundamentals of Pistol Shooting are Aiming, Hold Control, Breath Control, Trigger Control, and Follow-Through."
    },
    {
        id: 37,
        part: "Part 5: Marksmanship Fundamentals",
        type: "mc",
        question: "What are the TWO components of AIMING, and what phrase summarizes proper Sight Alignment?",
        options: [
            "Stance and Grip — 'Nose Over Toes'",
            "Sight Alignment and Sight Picture — 'Equal Height, Equal Light'",
            "Breath and Trigger — 'Tap and Rack'",
            "Lands and Grooves — 'Spin and Stabilize'"
        ],
        correctAnswer: "Sight Alignment and Sight Picture — 'Equal Height, Equal Light'",
        illustration: {
            type: "image",
            src: "assets/slide_64_sight_alignment.jpg",
            caption: "Sight Alignment: Top of front sight flush with rear sight ('Equal Height') and centered ('Equal Light')."
        },
        explanation: "Aiming comprises Sight Alignment ('Equal Height, Equal Light' between front and rear sights) and Sight Picture (placing aligned sights in proper relationship with the target)."
    },
    {
        id: 38,
        part: "Part 5: Marksmanship Fundamentals",
        type: "mc",
        question: "When aiming with traditional iron sights, where MUST your sharp visual focus be placed?",
        options: [
            "Sharply on the distant target bullseye",
            "Sharply on the rear sight notch",
            "Sharply on the FRONT SIGHT (leaving the target and rear sight slightly fuzzy)",
            "Closed eyes during ignition"
        ],
        correctAnswer: "Sharply on the FRONT SIGHT (leaving the target and rear sight slightly fuzzy)",
        illustration: {
            type: "image",
            src: "assets/slide_67_front_sight_focus.jpg",
            caption: "Front Sight Focus: Crisp front sight post, slightly soft target and rear sight."
        },
        explanation: "Human eye optics can focus sharply at only one distance at a time; focusing sharply on the Front Sight ensures precise Sight Alignment."
    },
    {
        id: 39,
        part: "Part 5: Marksmanship Fundamentals",
        type: "mc",
        question: "What is the 'Arc (Arch) of Movement' in Hold Control, and how is it reduced over time?",
        options: [
            "The curved trajectory of an ejected brass casing",
            "The unavoidable natural motion/wobble of a pistol held extended in a shooting position—minimized by proper grip/hold control and decreased through consistent practice",
            "Swinging the muzzle up from the floor during an improper draw",
            "Bullet drop past 500 yards"
        ],
        correctAnswer: "The unavoidable natural motion/wobble of a pistol held extended in a shooting position—minimized by proper grip/hold control and decreased through consistent practice",
        illustration: {
            type: "image",
            src: "assets/slide_69_arc_of_movement.jpg",
            caption: "Hold Control: Managing and shrinking your natural Arc of Movement."
        },
        explanation: "Every shooter has an unavoidable Arc of Movement when holding a pistol on target; a firm, proper grip and consistent practice shrink that arc."
    },
    {
        id: 40,
        part: "Part 5: Marksmanship Fundamentals",
        type: "mc",
        question: "According to Breath Control fundamentals, at what exact point in the breathing cycle should a precision shot be fired?",
        options: [
            "While inhaling rapidly at maximum chest expansion",
            "After holding your breath for 25 seconds until your shoulders tremble",
            "At the Natural Respiratory Pause (after taking a breath and exhaling naturally to the calm resting pause)",
            "While coughing or shouting"
        ],
        correctAnswer: "At the Natural Respiratory Pause (after taking a breath and exhaling naturally to the calm resting pause)",
        illustration: {
            type: "image",
            src: "assets/slide_70_breath_control.jpg",
            caption: "Breath Control: Fire smoothly during the calm Natural Respiratory Pause."
        },
        explanation: "Breaking the shot during the Natural Respiratory Pause eliminates vertical chest movement without inducing oxygen-starvation muscle tremors."
    },
    {
        id: 41,
        part: "Part 5: Marksmanship Fundamentals",
        type: "mc",
        question: "How should the index finger contact and press the trigger to achieve proper TRIGGER CONTROL?",
        options: [
            "Hook the second knuckle all the way through the guard and yank sideways",
            "Place the trigger between the fingertip and the first joint of the index finger, squeezing straight rearward in a smooth, continuous movement without disturbing sight alignment",
            "Slap the trigger rapidly from outside the trigger guard on every shot",
            "Use both index fingers stacked together inside the trigger guard"
        ],
        correctAnswer: "Place the trigger between the fingertip and the first joint of the index finger, squeezing straight rearward in a smooth, continuous movement without disturbing sight alignment",
        explanation: "Pressing straight to the rear in a smooth, continuous motion using the pad between the fingertip and first joint prevents pushing or pulling shots off target."
    },
    {
        id: 42,
        part: "Part 5: Marksmanship Fundamentals",
        type: "mc",
        question: "What is FOLLOW-THROUGH in pistol marksmanship?",
        options: [
            "Walking downrange immediately to inspect bullet holes while others are still shooting",
            "The continuation of applying all shooting fundamentals before, through, and immediately after the firing of the shot",
            "Throwing your hands upward to exaggerate recoil",
            "Dropping the pistol onto the shooting bench after the last shot"
        ],
        correctAnswer: "The continuation of applying all shooting fundamentals before, through, and immediately after the firing of the shot",
        explanation: "Follow-through integrates and maintains grip, sight focus, and smooth trigger control before, during, and immediately after ignition for rapid recovery and accurate follow-up shots."
    },
    {
        id: 43,
        part: "Part 5: Marksmanship Fundamentals",
        type: "mc",
        question: "Of all five shooting fundamentals, which TWO are identified in the Academy curriculum as the MOST IMPORTANT?",
        options: [
            "Breath Control and Stance Width",
            "Aiming (Sight Alignment & Sight Picture) and Trigger Control",
            "Holster Draw Speed and Reload Speed",
            "Grip Panel Texture and Barrel Length"
        ],
        correctAnswer: "Aiming (Sight Alignment & Sight Picture) and Trigger Control",
        explanation: "Aiming (Sight Alignment & Sight Picture) and Trigger Control are the two paramount fundamentals governing where every bullet strikes."
    },

    // --- PART 6: ILLINOIS DEADLY FORCE LAW, TAN CARD & RANGE QUALIFICATION (44-50) ---
    {
        id: 44,
        part: "Part 6: Law & Range Qualification",
        type: "scenario",
        question: "Under Illinois Criminal Code 720 ILCS 5/7-1, an armed security officer is justified in using force intended or likely to cause death or great bodily harm ONLY when:",
        options: [
            "A trespasser refuses to leave a parking lot and yells profanities at the guard",
            "The officer reasonably believes such force is necessary to prevent imminent death or great bodily harm to themselves or another person, or the commission of a violent Forcible Felony",
            "A shoplifter sprints across the street carrying $1,500 worth of electronics",
            "A client manager orders the officer to shoot out the tires of an unauthorized delivery van"
        ],
        correctAnswer: "The officer reasonably believes such force is necessary to prevent imminent death or great bodily harm to themselves or another person, or the commission of a violent Forcible Felony",
        illustration: {
            type: "image",
            src: "../assets/use_of_force.png",
            caption: "720 ILCS 5/7-1: Deadly force requires imminent death, great bodily harm, or forcible felony."
        },
        explanation: "Under 720 ILCS 5/7-1, deadly force is strictly restricted to preventing imminent death, great bodily harm, or a statutory Forcible Felony (720 ILCS 5/2-8)."
    },
    {
        id: 45,
        part: "Part 6: Law & Range Qualification",
        type: "scenario",
        question: "Which THREE credentials must an Illinois resident armed security officer hold and maintain to legally work an armed security post under 225 ILCS 447?",
        options: [
            "Driver's License, Hunting License, and Library Card",
            "Valid Illinois FOID Card, active IDFPR PERC Card, and active employer-specific IDFPR Firearm Control Card ('Tan Card')",
            "OSHA Forklift Card, CPR Card, and Passport",
            "Only a personal Concealed Carry License (CCL) with zero IDFPR registration"
        ],
        correctAnswer: "Valid Illinois FOID Card, active IDFPR PERC Card, and active employer-specific IDFPR Firearm Control Card ('Tan Card')",
        explanation: "Illinois armed security employment requires a valid FOID card, active PERC card (20-Hr Unarmed), and an active IDFPR Firearm Control Card ('Tan Card') issued through the employing licensed agency."
    },
    {
        id: 46,
        part: "Part 6: Law & Range Qualification",
        type: "scenario",
        question: "Under 225 ILCS 447/35-40, when may an armed security officer carry their duty firearm solely under the authority of an IDFPR Firearm Control Card ('Tan Card')?",
        options: [
            "24/7 anywhere in the United States, including off-duty bars and personal vacations",
            "ONLY while actually engaged in official armed duties on post, or while commuting directly between their residence and place of employment (within the statutory transit limit, not exceeding 1 hour each way)",
            "Whenever shopping off duty in plain clothes on weekends",
            "While lending the firearm to unlicensed coworkers"
        ],
        correctAnswer: "ONLY while actually engaged in official armed duties on post, or while commuting directly between their residence and place of employment (within the statutory transit limit, not exceeding 1 hour each way)",
        explanation: "A Tan Card is strictly an occupational credential authorizing carry on duty and during direct commute between home and work—never a general off-duty carry license."
    },
    {
        id: 47,
        part: "Part 6: Law & Range Qualification",
        type: "mc",
        question: "Which of the following violates mandatory Range Safety & Dress Code rules at Eagle Sports Range?",
        options: [
            "Wearing wrap-around eye protection and ear protection before entering the range bay",
            "Wearing open-toe sandals or a low-cut shirt, or attempting to clear a firearm malfunction on the range without Instructor permission and supervision",
            "Wearing closed-toe boots and a crew-neck shirt to block hot brass",
            "Keeping your finger off the trigger while awaiting the 'BEGIN FIRING' command"
        ],
        correctAnswer: "Wearing open-toe sandals or a low-cut shirt, or attempting to clear a firearm malfunction on the range without Instructor permission and supervision",
        explanation: "Open-toe shoes, low-cut shirts that catch hot 300°F brass, alcohol/drugs, missing PPE, and unsupervised malfunction clearing are strictly prohibited on the range."
    },
    {
        id: 48,
        part: "Part 6: Law & Range Qualification",
        type: "scenario",
        question: "During live-fire qualification on the range, your pistol fails to fire or you have a question. What are the exact 5 steps you MUST follow?",
        options: [
            "1. Turn around toward the Instructor, 2. Point the gun upward, 3. Pull the trigger again, 4. Remove ear protection, 5. Walk off the line",
            "1. Stop shooting, 2. Keep gun pointed downrange in a safe direction (Rule #1), 3. Take finger off trigger (Rule #2), 4. Raise your non-shooting hand, 5. Wait for Instructor assistance",
            "1. Field-strip the slide on the booth floor while neighboring shooters are firing",
            "1. Lay the loaded jammed gun pointing sideways toward Booth #3 and leave"
        ],
        correctAnswer: "1. Stop shooting, 2. Keep gun pointed downrange in a safe direction (Rule #1), 3. Take finger off trigger (Rule #2), 4. Raise your non-shooting hand, 5. Wait for Instructor assistance",
        explanation: "Never turn uprange with a firearm and never clear malfunctions unsupervised on the qualification line: Stop, keep pointed downrange, finger off trigger, raise non-shooting hand, and wait."
    },
    {
        id: 49,
        part: "Part 6: Law & Range Qualification",
        type: "mc",
        question: "On the qualification firing line, what action is performed upon the command 'LOAD'?",
        options: [
            "Immediately fire all 10 rounds as fast as possible",
            "Insert a 10-round loaded magazine into the pistol and charge (rack) the pistol, keeping muzzle pointed downrange and finger OFF the trigger until 'BEGIN FIRING'",
            "Disassemble the pistol on the bench",
            "Step behind the firing line and remove eye protection"
        ],
        correctAnswer: "Insert a 10-round loaded magazine into the pistol and charge (rack) the pistol, keeping muzzle pointed downrange and finger OFF the trigger until 'BEGIN FIRING'",
        explanation: "On 'LOAD', insert the 10-round magazine and charge the pistol while keeping muzzle pointed safely downrange and finger indexed along the frame until 'BEGIN FIRING' is given."
    },
    {
        id: 50,
        part: "Part 6: Law & Range Qualification",
        type: "mc",
        question: "What is the official 50-round Pistol Qualification passing score and exact yardage/hand breakdown?",
        options: [
            "Score 20/50 rounds all from 3 yards using two hands",
            "Score at least 35/50 rounds (70%) inside the scoring area across: 5 yards (10 rounds two-hand, 10 rounds right-hand, 10 rounds left-hand), 7 yards (10 rounds two-hand), and 10 yards (10 rounds two-hand)",
            "Score 48/50 rounds from 25 yards using one hand only",
            "Score 35/50 rounds across 10, 20, 30, 40, and 50 yards (which is the Rifle/Shotgun course, not Pistol)"
        ],
        correctAnswer: "Score at least 35/50 rounds (70%) inside the scoring area across: 5 yards (10 rounds two-hand, 10 rounds right-hand, 10 rounds left-hand), 7 yards (10 rounds two-hand), and 10 yards (10 rounds two-hand)",
        illustration: {
            type: "image",
            src: "assets/slide_81_pistol_qualification.jpg",
            caption: "Official Pistol Qualification Standard: 35/50 (70%) across 5, 7, and 10 yards."
        },
        explanation: "Pistol Qualification requires 35/50 (70%) inside the scoring area: 5 yds (10 two-hand, 10 right-hand, 10 left-hand), 7 yds (10 two-hand), and 10 yds (10 two-hand)."
    }
];

if (typeof window !== 'undefined') {
    window.COURSE_META = COURSE_META;
    window.LESSONS_DATA = LESSONS_DATA;
    window.EXAM_QUESTIONS = EXAM_QUESTIONS;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COURSE_META, LESSONS_DATA, EXAM_QUESTIONS };
}
