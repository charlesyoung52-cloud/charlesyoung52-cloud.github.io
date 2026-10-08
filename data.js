// Platforms Training Academy - 20-Hour Online Unarmed Security Course
// Chicago, IL | platformstraining.com | Lead Instructor: Charles Young
// State of Illinois Security Certification (IDFPR / 225 ILCS 447)

const COURSE_META = {
    title: "Online Unarmed Security Course",
    academy: "Platforms Training Academy",
    location: "200 E 75th St, Chicago, IL 60619",
    phone: "(773) 873-2591",
    website: "https://www.platformstraining.com",
    instructor: "Charles Young",
    courseHours: 20,
    passingScore: 75,
    totalQuestions: 50,
    passingCorrect: 38,
    courseGoal: "To teach the basic skills, statutory knowledge, operational tactics, and professional attitude necessary to be an effective, compliant, and legally protected unarmed security officer in the State of Illinois."
};

const LESSONS_DATA = [
    {
        id: 1,
        number: "Lesson 1",
        title: "The Law of Arrest, Search, and Seizure",
        duration: "2 Hours",
        icon: "shield",
        summary: "Comprehensive analysis of Illinois citizen's arrest authority (725 ILCS 5/107-3), merchant detention privilege (720 ILCS 5/16-25), aiding peace officers (725 ILCS 5/107-8), and statutory search limits (725 ILCS 5/108-1).",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Understand the statutory boundaries between private citizen arrest powers and peace officer authority under Illinois law.</li>
                    <li>Differentiate between non-arrestable municipal ordinance violations and arrestable state criminal offenses.</li>
                    <li>Master the 4-step observation protocol for retail theft detention under 720 ILCS 5/16-25.</li>
                    <li>Analyze Illinois case law regarding false imprisonment, unlawful restraint, and warrantless search boundaries.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-1">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">The Midnight Foot Pursuit on 87th Street</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(1)" id="btn-narration-audio-1" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>It was 1:15 AM on a bitter January night. The wind was whipping off Lake Michigan, gusting through the parking lot of a 24-hour retail plaza near 87th and the Dan Ryan. Snow was drifting against the concrete pillars. Inside the warmth of the vestibule, a rookie unarmed officer named Marcus was halfway through a twelve-hour shift when the retail department manager burst through the inner doors, red-faced and out of breath.</p><p>'Marcus! That guy in the dark Carhartt jacket just shoved three DeWalt hammer drills down into a modified lining under his coat! He blew right past the last register, pushed through the floral display, and didn't pay a dime! Tackle him!' the manager barked, pointing a shaking finger out into the snowy night.</p><p>Marcus saw the suspect forty feet ahead, walking briskly toward the edge of the asphalt lot. Adrenaline flooded Marcus's chest. He felt that primal urge to sprint, crash tackle the suspect into the curb, and slap the cuffs on. He gave chase across the icy lot, his heavy boots slipping on the salt. The suspect heard footsteps, turned, saw the uniform, and broke into a full sprint—not toward a getaway car, but directly across the property boundary line and onto the public sidewalk of 87th Street, heading straight for the CTA bus turn-around.</p><p>In that fraction of a second, Marcus had to make the single most critical decision of his early security career. If he followed the store manager's orders and chased that man down the public sidewalk, tackled him on municipal CTA property, and forced him back to the store, Marcus would not be a hero. Under Illinois law, Marcus would have ceased being a licensed security officer acting under the Merchant's Detention Statute (720 ILCS 5/16-25)—he would have committed the criminal offenses of False Imprisonment, Unlawful Restraint, and Battery under 720 ILCS 5/10-3 and 5/12-3.</p><p>Here is the hard truth every security officer in Illinois must engrave into their memory: As an unarmed security guard, your arrest authority is grounded entirely in Citizen's Arrest (725 ILCS 5/107-3) and Merchant's Detention (720 ILCS 5/16-25). You do NOT possess peace officer jurisdiction. You cannot execute vehicular traffic stops, you cannot pursue subjects off property lines for non-forcible property crimes, and you cannot search a suspect's backpack or pockets against their will without committing an unlawful search under Illinois search and seizure case law.</p><p>Marcus remembered his training at Platforms Training Academy. He planted his boots at the curb of the store's property line. He did not chase into the street. Instead, he pulled out his tactical notepad, stepped back into illumination, and calmly broadcasted to Chicago Police 911 dispatch: 'Suspect description: Male, black, approximately 6-foot-1, 210 pounds, wearing a black Carhartt jacket with yellow embroidery, dark jeans, carrying stolen merchandise under the coat, last seen fleeing eastbound on 87th Street toward the CTA bus terminal.' CPD squad cars intercepted the suspect two blocks away. Marcus's clear, objective observations and refusal to cross the property line protected the store, recovered the merchandise, and kept Marcus out of handcuffs himself.</p><p>Whenever adrenaline surges through your veins on post, anchor this memory: The property line is your legal perimeter. Step over it with handcuffs drawn for a shoplifter, and you are no longer protecting a client—you are risking a felony conviction in a uniform.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec1-1">1. Statutory Authority: Arrest by Private Person (725 ILCS 5/107-3)</h3>
            <p>Under Illinois Compiled Statutes (<strong>725 ILCS 5/107-3</strong>), the power of an unarmed security officer to effect an arrest derives from citizen's arrest authority rather than sworn police powers:</p>
            <blockquote>
                <em>"Any person may arrest another when he has reasonable grounds to believe that an offense other than an ordinance violation is being committed."</em>
            </blockquote>
            
            <div class="callout warning">
                <strong>CRITICAL ILLINOIS LEGAL MANDATE:</strong> An unarmed security officer CANNOT arrest or physically detain an individual solely for a city, county, or municipal ordinance violation (e.g., Chicago Municipal Code violations such as public urination, curfew violations, panhandling, or playing loud music). The conduct must constitute an offense under the Illinois Criminal Code (a misdemeanor or felony). Detaining someone purely for an ordinance violation exposes both the officer and their employer to civil liability for false arrest, unlawful restraint, and battery.
            </div>

            <p><strong>Reasonable Grounds (Probable Cause):</strong> "Reasonable grounds" means that the facts and circumstances known to the officer at the moment of detention would lead a person of ordinary care and prudence to believe that a crime has been committed and that the person detained committed it.</p>

            <h3 id="sec1-2">2. Merchant's Detention Privilege (720 ILCS 5/16-25)</h3>
            <p>Security officers assigned to retail establishments or shopping centers in Illinois operate under the <strong>Merchant's Detention Statute (720 ILCS 5/16-25)</strong>. This statute shields merchants and licensed security personnel from civil false imprisonment suits provided strict criteria are satisfied:</p>
            <ul>
                <li><strong>Reasonable Grounds:</strong> The officer must have factual reasons to believe theft occurred.</li>
                <li><strong>Reasonable Manner:</strong> Detentions must be calm, courteous, and devoid of excessive force or intimidation.</li>
                <li><strong>Reasonable Time:</strong> The detention must last only long enough to:
                    <ol>
                        <li>Inquire into the ownership of the merchandise;</li>
                        <li>Verify identity; and</li>
                        <li>Summon a peace officer if criminal charges are pursued.</li>
                    </ol>
                </li>
            </ul>

            <div class="callout tip">
                <strong>THE 4-STEP GOLD STANDARD FOR RETAIL DETENTION:</strong>
                <ol>
                    <li><strong>Observe Selection/Concealment:</strong> Witness the subject physically take or conceal unpurchased merchandise.</li>
                    <li><strong>Maintain Continuous Uninterrupted Surveillance:</strong> Never lose sight of the subject. If surveillance is broken, you cannot verify whether the item was abandoned.</li>
                    <li><strong>Observe Failure to Pay:</strong> Watch the subject pass all open cash registers and points of sale without paying.</li>
                    <li><strong>Detain Outside the Point of Sale:</strong> Approach the subject past the outer checkout area or just outside exit doors in a safe, controlled manner.</li>
                </ol>
            </div>

            <h3 id="sec1-3">3. Assisting a Peace Officer (725 ILCS 5/107-8)</h3>
            <p>Under <strong>725 ILCS 5/107-8</strong>, any person—including a licensed security officer—who is commanded or requested by a peace officer to assist in effecting an arrest or preventing an escape has the same responsibilities and authority as that peace officer for the duration of that assistance.</p>
            <p><em>Real-World Application:</em> If a Chicago Police Officer requests your assistance in holding a combative suspect or securing a perimeter, Illinois law empowers you to act under the officer's direction and protects you from false arrest claims provided you act reasonably.</p>

            <h3 id="sec1-4">4. Search Without Warrant (725 ILCS 5/108-1)</h3>
            <p>When a lawful citizen's arrest is effected, <strong>725 ILCS 5/108-1</strong> permits a reasonable search of the arrested person and the immediate area for four explicit statutory purposes:</p>
            <ul>
                <li><strong>1. Protecting the officer from attack;</strong></li>
                <li><strong>2. Preventing the person from escaping;</strong></li>
                <li><strong>3. Discovering the fruits of the crime (e.g., stolen items);</strong> or</li>
                <li><strong>4. Discovering any instruments, tools, or weapons used in the commission of the offense.</strong></li>
            </ul>
            <div class="callout warning">
                <strong>BEST PRACTICE FOR UNARMED GUARDS:</strong> While the statute permits searching for fruits of the crime, private security industry best practice dictates conducting a <em>weapons-only pat-down</em> for officer safety and securing the subject until police arrive to conduct an exhaustive search. Never conduct invasive or strip searches.
            </div>

            <h3 id="sec1-5">5. Real-Life Correlation & Landmark Case Law</h3>
            <div class="liability-card">
                <h4>Case Law Focus: <em>Terry v. Ohio</em> (392 U.S. 1) & Private Security</h4>
                <p>Private security officers <strong>DO NOT possess Terry stop-and-frisk powers</strong>. Unlike police officers who can stop and frisk on "reasonable suspicion," a private security officer must have voluntary consent, contractual property rights, or full "reasonable grounds" of a crime to effect a detention. Frisking a visitor without consent or lawful arrest constitutes civil battery.</p>
            </div>
            <div class="liability-card">
                <h4>Case Law Focus: <em>Alvarez v. Kmart Corp.</em> (Illinois Appellate Court)</h4>
                <p>A retail merchant was held liable for unlawful restraint and false imprisonment when security detained a shopper on mere suspicion without uninterrupted observation. The court held that failure to verify concealment before stopping the shopper destroyed the merchant's statutory privilege.</p>
            </div>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Suspicious Shopper in Electronics Aisle",
            setup: "You are an unarmed security officer on duty at a major retail center on 75th Street in Chicago. You observe an individual pick up two portable hard drives and slide them into an oversized winter coat pocket. The individual walks towards the garden exit.",
            question: "What is your legally correct course of action under Illinois Law (720 ILCS 5/16-25)?",
            options: [
                {
                    text: "Approach and tackle the shopper immediately in the aisle while they still have the hard drives in their pocket.",
                    correct: false,
                    feedback: "INCORRECT. Tackling or stopping the shopper inside the store before they bypass points of sale is premature. In Illinois, the shopper can claim they intended to pay at checkout. Unjustified physical force creates immediate liability for assault, battery, and false imprisonment."
                },
                {
                    text: "Maintain continuous, uninterrupted visual surveillance, confirm the shopper bypasses all cash registers without offering payment, and politely detain them once they cross the threshold of the exit doors.",
                    correct: true,
                    feedback: "CORRECT! This adheres strictly to the 4-step merchant detention protocol under 720 ILCS 5/16-25. Continuous observation proves the item was not abandoned, and passing the registers establishes intent to permanently deprive the merchant."
                },
                {
                    text: "Wait until the shopper drives away in their vehicle, then pursue them in your personal car down the street to force them over.",
                    correct: false,
                    feedback: "INCORRECT. Private security guards possess no authority to conduct vehicular pursuits or traffic stops on public roadways. Doing so violates Illinois motor vehicle laws and creates extreme civil and criminal liability."
                }
            ],
            illustration: "assets/q_arrest_patrol.jpg"
        },
        checkOnLearning: [
            {
                id: "c1_1",
                question: "Under 725 ILCS 5/107-3, for what type of violation is a private security officer STRICTLY PROHIBITED from making an arrest?",
                options: [
                    "A Class A Misdemeanor",
                    "A City or Municipal Ordinance Violation",
                    "A Non-violent Felony",
                    "An offense committed in their presence"
                ],
                correctAnswer: "A City or Municipal Ordinance Violation",
                remediationTarget: "sec1-1",
                explanation: "725 ILCS 5/107-3 explicitly limits citizen's arrest to offenses 'other than an ordinance violation.' Security guards cannot arrest solely for city ordinance infractions."
            },
            {
                id: "c1_2",
                question: "What is the primary reason security officers must maintain UNINTERRUPTED visual observation of a suspected shoplifter prior to a stop?",
                options: [
                    "To ensure the suspect does not leave the store through an unauthorized fire exit.",
                    "To verify the suspect did not discard or place the merchandise back on a shelf when unobserved.",
                    "Because Illinois law requires at least 30 minutes of surveillance before any detention.",
                    "To give police dispatch enough time to arrive on the scene."
                ],
                correctAnswer: "To verify the suspect did not discard or place the merchandise back on a shelf when unobserved.",
                remediationTarget: "sec1-2",
                explanation: "If visual contact is broken even for a few seconds, the suspect could have dumped the merchandise. Detaining them without the item destroys probable cause and leads to false imprisonment liability."
            },
            {
                id: "c1_3",
                question: "When conducting a search incident to a lawful arrest under 725 ILCS 5/108-1, what is the recommended private security best practice?",
                options: [
                    "Conduct an invasive strip search in the security office to find all contraband.",
                    "Conduct a pat-down of outer clothing strictly for weapons for officer safety, leaving thorough searches to the police.",
                    "Search the suspect's locked vehicle parked in a public municipal garage across the street.",
                    "Confiscate all personal property and cash indefinitely as security property."
                ],
                correctAnswer: "Conduct a pat-down of outer clothing strictly for weapons for officer safety, leaving thorough searches to the police.",
                remediationTarget: "sec1-4",
                explanation: "Security best practice dictates limiting searches strictly to weapons retrieval for personal safety. Comprehensive evidentiary searches should be conducted by sworn law enforcement."
            }
        ],
        takeaways: [
            "Private security officers CANNOT arrest for municipal ordinance violations (725 ILCS 5/107-3).",
            "Maintain continuous, uninterrupted observation to satisfy Merchant Detention standards (720 ILCS 5/16-25).",
            "Private guards do not hold Terry stop-and-frisk powers without consent or lawful arrest.",
            "Searches must be strictly limited to safety and weapons retrieval."
        ]
    },
    {
        id: 2,
        number: "Lesson 2",
        title: "Civil & Criminal Liability",
        duration: "2 Hours",
        icon: "balance-scale",
        summary: "In-depth examination of the four forms of civil liability (Intentional Torts, Negligence, Strict Liability, Vicarious Liability / Respondeat Superior), Illinois premises liability, and guard accountability.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Differentiate the burden of proof between Illinois criminal prosecution and civil tort litigation.</li>
                    <li>Master the four distinct legal forms of civil liability that apply to security operations.</li>
                    <li>Analyze the doctrine of Respondeat Superior (Vicarious Liability) and employer co-defendant liability.</li>
                    <li>Understand premises liability and the guard's affirmative duty of care to identify and report hazards.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-2">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">The South Loop Velvet Rope and the Broken Gate</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 5 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(2)" id="btn-narration-audio-2" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>The bass was rattling the brick walls of a high-end South Loop nightclub at 2:30 AM on a rainy Saturday. Rainwater was sheeting off the black canvas awning onto a crowd of sixty people waiting outside the brass stanchions. An unarmed venue security officer named Derrick was working the exterior door.</p><p>A patron who had consumed multiple drinks was denied entry due to dress code violations and intoxication. The patron became furious. He began screaming profanities six inches from Derrick's face, spit flying, shouting: 'Do you know who my family is? I pay your damn salary, you rent-a-cop loser!' The crowd pulled out smartphones, cameras rolling.</p><p>Derrick felt his pride stung. He clenched his fists, forgot every word of tactical de-escalation, and let his ego take the wheel. Derrick lunged forward, grabbed the patron by the collar of his designer leather jacket, spun him around, drove him face-first into the wet brick wall, and wrenched his right arm into a painful hammerlock. Derrick then dragged the screaming patron twenty feet down a dark exterior service alley, shoved him into a gated trash corral, padlocked the iron gate from the outside, and sneered: 'You can sober up in the dumpster until the police get here.'</p><p>Ten minutes later, Chicago Police arrived. They didn't arrest the patron. They unlocked the gate, called an ambulance for the patron's fractured wrist and facial lacerations, and took Derrick's statement. Six months later, Derrick was sitting in a high-rise conference room at the Richard J. Daley Center across from a plaintiff attorney in a \$500,000 civil lawsuit.</p><p>The plaintiff's attorney dismantled Derrick piece by piece on the record. Did the patron hit you? 'No, sir.' Did he display a weapon? 'No, sir.' Was he on private property after you told him to leave? 'Yes, but...' Grabbing his collar was Battery under 720 ILCS 5/12-3. Stepping forward aggressively before touching him was Assault under 720 ILCS 5/12-1. Locking him in an alleyway where he had no safe means of egress was False Imprisonment under Illinois tort law. Worse yet, under the legal doctrine of Respondeat Superior (Vicarious Liability), Derrick's employer—Platforms Security Services—was held directly liable for Derrick's actions because he was acting within the scope of his employment.</p><p>The security contractor's insurance company settled for \$325,000. Derrick's PERC card was permanently revoked by the IDFPR, his career in private security ended, and the nightclub terminated its security contract. All because a security guard allowed an angry customer's insults to dictate his physical actions.</p><p>Anchor this lesson into your professional mindset: In private security, adrenaline makes you want to win an argument; professional discipline makes you survive the deposition. Words cannot assault you. Never let a civilian write an emotional check that your employer's liability insurance has to cash.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec2-1">1. Criminal Law vs. Civil Law: Dual Jeopardy</h3>
            <p>A security officer's actions on post are subject to two parallel legal frameworks in Illinois:</p>
            <ul>
                <li><strong>Criminal Court:</strong> Brought by the People of the State of Illinois (State's Attorney) for statutory criminal violations. The burden of proof is <em>Beyond a Reasonable Doubt (99% certainty)</em>. Penalties include prison, probation, and criminal fines.</li>
                <li><strong>Civil Court:</strong> Brought by a private plaintiff seeking financial restitution (monetary damages) for harm suffered. The burden of proof is a <em>Preponderance of the Evidence (more likely than not, >50%)</em>.</li>
            </ul>
            <div class="callout warning">
                <strong>CRITICAL LEGAL REALITY:</strong> Being acquitted or having criminal charges dismissed by the police DOES NOT protect an officer or their security company from a multi-million-dollar civil lawsuit. Because civil court requires a much lower standard of proof, guards are frequently sued and found civilly liable even when not convicted of a crime.
            </div>

            <h3 id="sec2-2">2. The Four Primary Forms of Civil Liability</h3>
            <div class="liability-grid">
                <div class="liability-card">
                    <h4>1. Intentional Tort</h4>
                    <p><strong>Definition:</strong> Intentionally committing an act that causes injury, loss, or property damage.</p>
                    <p><em>Security Examples:</em></p>
                    <ul>
                        <li><strong>Battery:</strong> Intentionally striking, pushing, or roughly handling a suspect without lawful justification.</li>
                        <li><strong>Assault:</strong> Threatening someone with physical harm or raising a fist/baton in an aggressive manner that causes immediate apprehension of battery.</li>
                        <li><strong>False Imprisonment / Unlawful Restraint:</strong> Detaining someone without reasonable grounds or refusing to let an innocent visitor leave.</li>
                        <li><strong>Defamation (Slander):</strong> Publicly shouting that an individual is a "thief" or "criminal" in front of other shoppers when unproven.</li>
                    </ul>
                </div>

                <div class="liability-card">
                    <h4>2. Negligent Liability</h4>
                    <p><strong>Definition:</strong> Failing to exercise due care when obligated to do so, resulting in injury, loss, or property damage.</p>
                    <p><em>The Four Mandatory Elements of Negligence:</em></p>
                    <ol>
                        <li><strong>Duty of Care:</strong> The legal obligation to protect or exercise reasonable caution.</li>
                        <li><strong>Breach of Duty:</strong> Failing to perform or uphold that standard of care.</li>
                        <li><strong>Proximate Cause:</strong> The breach directly caused the resulting harm.</li>
                        <li><strong>Damages:</strong> Demonstrable physical, emotional, or financial injury.</li>
                    </ol>
                    <p><em>Security Example:</em> An officer observes a water spill in a grocery aisle or a broken handrail, fails to cone it off or report it on their Daily Activity Report (DAR), and a patron slips and fractures their hip.</p>
                </div>

                <div class="liability-card">
                    <h4>3. Strict Liability</h4>
                    <p><strong>Definition:</strong> Being held legally liable for injury or damage caused when engaged in inherently dangerous activities, regardless of intent, fault, or degree of care exercised.</p>
                    <p><em>Security Examples:</em></p>
                    <ul>
                        <li>Handling or storing high explosives, hazardous chemical munitions, or fireworks.</li>
                        <li>Deploying trained attack or guard canines (K9s) that bite an innocent passerby.</li>
                    </ul>
                </div>

                <div class="liability-card">
                    <h4>4. Vicarious Liability (Respondeat Superior)</h4>
                    <p><strong>Definition:</strong> Liability placed upon employers, corporations, or property management entities for the tortious acts of their employees committed within the course and scope of their employment.</p>
                    <p><em>Legal Theory:</em> Employers possess authority over, supervisory responsibility for, and a duty to control their acting personnel. In lawsuits, plaintiffs name both the security guard and the security company/property owner to access corporate insurance policies ("deep pockets").</p>
                </div>
            </div>

            <h3 id="sec2-3">3. Illinois Case Law & Security Officer Duties</h3>
            <div class="liability-card">
                <h4>Case Law Focus: <em>Bence v. Crawford Savings & Loan Association</em> (Ill. App. Ct.)</h4>
                <p>The court examined whether a bank's armed security guard had an affirmative duty to protect customers during an armed robbery. The court ruled that security personnel must adhere to professional standards of reasonable care to prevent foreseeable harm to business invitees.</p>
            </div>
            <div class="liability-card">
                <h4>Case Law Focus: <em>Sunseri v. Puccia</em> (Illinois Law)</h4>
                <p>An establishment and its security agency were held vicariously liable when a bouncer exceeded authorized force during an eviction and committed an intentional battery on a patron. The court established that an employer cannot escape liability when employee force is committed within the context of security enforcement.</p>
            </div>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Water Spill Hazard & Combative Patron",
            setup: "During your routine foot patrol at a Chicago commercial high-rise atrium, you notice a large puddle of water leaking from an HVAC unit onto the polished marble floor. A few minutes later, a patron enters the lobby speaking loudly on speakerphone. Your partner immediately runs over, grabs the patron by the collar, and throws him out the glass doors, causing the patron to sprain his wrist.",
            question: "From a legal liability standpoint, what two severe liabilities were created?",
            options: [
                {
                    text: "Strict liability for the HVAC unit and a municipal curfew violation.",
                    correct: false,
                    feedback: "INCORRECT. HVAC condensation leaks do not qualify under strict liability (not inherently ultrahazardous like dynamite), and patron speakerphone use is not a municipal curfew offense."
                },
                {
                    text: "Negligent liability for ignoring the slip-and-fall hazard (breach of duty of care), and an Intentional Tort (Battery/Assault) by the partner for unlawful physical contact.",
                    correct: true,
                    feedback: "CORRECT! Failing to cone off or report the puddle creates immediate Negligent Liability for premises hazards. Grabbing and throwing a patron who posed no threat constitutes an Intentional Tort (Battery), subjecting both the partner and security company (Vicarious Liability) to heavy damages."
                },
                {
                    text: "No liability exists because security officers have absolute legal immunity under Illinois state law.",
                    correct: false,
                    feedback: "INCORRECT. Private security guards possess ZERO sovereign immunity. Guards are subject to civil lawsuits for both intentional torts and negligent acts."
                }
            ],
            illustration: "assets/q_arrest_patrol.jpg"
        },
        checkOnLearning: [
            {
                id: "c2_1",
                question: "Which form of liability is defined as: 'Liability placed upon employers or entities for the wrongful conduct of their employees based on supervisory authority'?",
                options: [
                    "Negligent Liability",
                    "Intentional Tort",
                    "Vicarious Liability (Respondeat Superior)",
                    "Strict Liability"
                ],
                correctAnswer: "Vicarious Liability (Respondeat Superior)",
                remediationTarget: "sec2-2",
                explanation: "Vicarious Liability (Respondeat Superior) holds employers financially responsible for the torts and unlawful acts committed by their security employees within the scope of employment."
            },
            {
                id: "c2_2",
                question: "What are the four essential elements required to establish Negligent Liability against a security officer in civil court?",
                options: [
                    "Arrest, Warrant, Handcuffs, Conviction",
                    "Duty of Care, Breach of Duty, Proximate Causation, Actual Damages",
                    "Intent, Malice, Weapon, Loss",
                    "Uniform, Badge, PERC Card, License"
                ],
                correctAnswer: "Duty of Care, Breach of Duty, Proximate Causation, Actual Damages",
                remediationTarget: "sec2-2",
                explanation: "To prove negligence in civil court, a plaintiff must demonstrate that the guard owed a duty of care, breached that duty, that the breach was the proximate cause of the injury, and that actual damages resulted."
            },
            {
                id: "c2_3",
                question: "If a security guard is criminally acquitted (found not guilty) in criminal court for an altercation, can the injured person still sue the guard in civil court?",
                options: [
                    "No, because the Double Jeopardy clause of the US Constitution forbids any further legal action.",
                    "Yes, because civil court requires a lower burden of proof (Preponderance of the Evidence) than criminal court.",
                    "No, criminal court rulings automatically terminate all civil litigation.",
                    "Only if the Governor of Illinois personally authorizes a special civil tribunal."
                ],
                correctAnswer: "Yes, because civil court requires a lower burden of proof (Preponderance of the Evidence) than criminal court.",
                remediationTarget: "sec2-1",
                explanation: "Civil lawsuits operate independently of criminal cases. Because civil court requires only a preponderance of the evidence (>50%), civil liability can still be imposed even after criminal acquittal."
            }
        ],
        takeaways: [
            "Criminal court requires 'Beyond a Reasonable Doubt'; civil court requires only 'Preponderance of the Evidence'.",
            "Intentional Torts include battery, assault, false imprisonment, and defamation.",
            "Negligence requires proving Duty, Breach, Causation, and Damages.",
            "Vicarious Liability makes your security agency financially liable for your misconduct on duty."
        ]
    },
    {
        id: 3,
        number: "Lesson 3",
        title: "Use of Force & Conflict De-escalation",
        duration: "3 Hours",
        icon: "fist-raised",
        summary: "Comprehensive breakdown of Illinois Use of Force statutes (720 ILCS 5/7-1, 7-2, 7-3), the objective reasonableness standard, the 5-level Use of Force Continuum, and tactical Verbal Judo de-escalation.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Understand the statutory criteria for the defense of person, dwelling, and property in Illinois.</li>
                    <li>Identify the legal threshold required to justify the deployment of deadly force.</li>
                    <li>Master each level of the 5-Stage Use of Force Continuum and proportional response requirements.</li>
                    <li>Implement Verbal Judo and conflict de-escalation strategies to resolve hostile encounters peacefully.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-3">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">The 2:00 AM Warehouse Yard and the Copper Spools</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 5 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(3)" id="btn-narration-audio-3" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>It was 2:15 AM in a sprawling logistics yard along Western Avenue on Chicago's Southwest Side. Fog hung thick between rows of shipping containers and flatbed trailers. An unarmed patrol guard named Andre was conducting foot patrol with a 1,000-lumen duty flashlight when he heard the rhythmic metallic clinking of bolt cutters against chain-link fencing near the northeast corner.</p><p>Andre moved cautiously around a container and saw two intruders. They had cut a 4-foot breach in the perimeter fence and were using crowbars to lever two 500-pound spools of industrial copper communications cable—valued at over \$45,000—onto the back of an idling pickup truck parked in the alleyway.</p><p>Andre illuminated them with his flashlight and commanded: 'Security! Step away from the materials and stay where you are!' One of the men, holding a 36-inch steel crowbar, sneered: 'Back off, security guard, or you won't walk out of here tonight. We're taking this metal.' The two men continued rolling the massive spool toward the truck bed.</p><p>Andre's heart was pounding at 160 beats per minute. He felt an intense surge of responsibility. He thought about how furious the client would be if \$45,000 worth of copper vanished on his watch. He carried a heavy authorized collapsible steel baton on his duty belt. For a second, a dangerous thought crossed his mind: 'Should I charge in with the baton and physically fight two men with crowbars to stop that truck from leaving?'</p><p>This is the exact threshold that defines Illinois law on the Use of Force (720 ILCS 5/7-1, 7-2, and 7-3). Illinois statute is crystal clear: A security officer or private citizen is NEVER permitted to use force likely to cause death or great bodily harm solely to defend personal property. Copper wire, laptops, vehicles, pallets of tools—none of these justify lethal force or reckless high-risk physical confrontation.</p><p>Under 720 ILCS 5/7-1, physical force is only justified to the extent you reasonably believe necessary to defend yourself or another from the imminent use of unlawful force. If the suspects are simply loading copper onto a truck and ignoring you, advancing to initiate hand-to-hand combat transforms YOU into the aggressor under Illinois law. However, if that suspect raises that 36-inch steel crowbar above his head, takes aggressive strides toward you, and closes the distance to within ten feet while shouting threats, the legal paradigm instantly transforms from Defense of Property into Defense of Life against Great Bodily Harm (*Graham v. Connor* standard).</p><p>Andre made the professional call. He created distance, used a solid shipping container as cover, and immediately utilized his radio: 'Dispatch, 10-33 priority! Active burglary in progress at Western Avenue yard, northeast perimeter. Two male subjects loading copper spools into a dark blue Ford F-150, license plate unknown, one suspect armed with a steel crowbar. I am maintaining visual contact from cover.' Within three minutes, CPD tactical units blocked both ends of the alleyway and apprehended the suspects felony-handed without a single injury.</p><p>Take this memory to every post: There is not a spool of copper, a cash register, or a flat-screen television in the State of Illinois worth your life or a manslaughter trial. We protect people first, observe and report property crimes from safety, and only escalate force when human life is under immediate threat.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec3-1">1. Force vs. Deadly Force (720 ILCS 5/7-1)</h3>
            <p>Under the Illinois Criminal Code (<strong>720 ILCS 5/7-1</strong>), force is categorized into two distinct legal classes:</p>
            <ul>
                <li><strong>Non-Deadly Force:</strong> Physical effort applied to compel compliance by a subject that is not intended and not likely to cause death or great bodily harm.</li>
                <li><strong>Deadly Force:</strong> Physical force intended or likely to cause death or great bodily harm, including discharges of firearms, edged weapons, strikes to the head with impact tools, or neck chokeholds.</li>
            </ul>

            <div class="callout warning">
                <strong>THE STATUTORY DEADLY FORCE RULE (720 ILCS 5/7-1):</strong>
                <p>A person is justified in the use of force against another when and to the extent that they reasonably believe that such conduct is necessary to defend themselves or another against imminent unlawful force. However, <strong>deadly force is justified ONLY if the person reasonably believes that such force is necessary to prevent IMMINENT DEATH OR GREAT BODILY HARM to themselves or another, or the commission of a forcible felony.</strong></p>
            </div>

            <h3 id="sec3-2">2. Defense of Dwelling & Defense of Property (720 ILCS 5/7-2 & 7-3)</h3>
            <p>Security officers frequently guard commercial properties, warehouses, retail stores, and construction sites. The law regarding defense of property is crystal clear:</p>
            <ul>
                <li><strong>Defense of Dwelling (720 ILCS 5/7-2):</strong> Force is justified to prevent or terminate an unlawful entry into a dwelling (residence). Deadly force is permitted if the entry is violent and the officer reasonably believes it necessary to prevent physical assault upon occupants or a felony inside.</li>
                <li><strong>Defense of Property Other Than Dwelling (720 ILCS 5/7-3):</strong> A security officer may use reasonable non-deadly force to terminate a trespass or theft of personal property. <strong>DEADLY FORCE IS NEVER PERMITTED SOLELY TO PROTECT PROPERTY OR PREVENT THE THEFT OF MERCHANDISE.</strong> You cannot strike an unarmed fleeing thief in the head or use lethal weapons to save company property.</li>
            </ul>

            <h3 id="sec3-3">3. The 5-Level Use of Force Continuum</h3>
            <div class="media-container">
                <img src="assets/use_of_force.png" alt="Use of Force Continuum Diagram" class="responsive-img">
            </div>
            <ol>
                <li><strong>Level 1 — Officer Presence:</strong> Professional uniform, upright posture, clean appearance, alert scanning. Deters over 80% of potential criminal activity through visual deterrence alone.</li>
                <li><strong>Level 2 — Verbal Direction:</strong> Clear, calm, respectful, assertive verbal communication. Issuing polite instructions and de-escalation dialogue.</li>
                <li><strong>Level 3 — Empty-Hand Control:</strong>
                    <ul>
                        <li><em>Soft Empty-Hand:</em> Escort holds, guiding touches, joint manipulations, and pressure points with minimal risk of injury.</li>
                        <li><em>Hard Empty-Hand:</em> Open-hand strikes, palm heel strikes, sweeps, and takedowns to overcome active physical resistance.</li>
                    </ul>
                </li>
                <li><strong>Level 4 — Intermediate Weapons:</strong> Deployment of Oleoresin Capsicum (OC) pepper spray or defensive expandable batons when empty-hand measures fail to control a violent, combative subject.</li>
                <li><strong>Level 5 — Deadly Force:</strong> Lethal defense utilized strictly when facing an imminent threat of death or great bodily harm.</li>
            </ol>

            <h3 id="sec3-4">4. Tactical De-escalation & "Verbal Judo"</h3>
            <p>Professional security officers recognize that communication is their primary defensive tool. Dr. George Thompson's <em>Verbal Judo</em> framework teaches officers to de-escalate confrontation through professional psychology:</p>
            <ul>
                <li><strong>The 5 Universal Truths:</strong>
                    <ol>
                        <li>All people want to be treated with dignity and respect.</li>
                        <li>All people prefer to be asked rather than told what to do.</li>
                        <li>All people want to know why they are being asked to do something.</li>
                        <li>All people want to be offered options rather than threats.</li>
                        <li>All people want a second chance to comply without losing face.</li>
                    </ol>
                </li>
                <li><strong>Active Listening:</strong> Paraphrasing the subject's words back to them ("What I hear you saying is that you're upset about the wait time..."). This lowers physiological agitation and validates their perspective while maintaining firm compliance expectations.</li>
            </ol>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Trespasser with Stolen Power Tools",
            setup: "While patrolling a fenced commercial construction yard in Chicago at night, you spot an intruder climbing out of a storage container holding two expensive commercial power saws valued at $2,000. You order him to drop the tools. The subject drops the saws and begins sprinting toward the outer gate to escape on foot. He is visibly unarmed and has made no verbal or physical threats against you.",
            question: "Under Illinois Law (720 ILCS 5/7-1 & 7-3), what is your legally justified response?",
            options: [
                {
                    text: "Draw your defensive baton, chase him down, and strike him across the back of the head to ensure he does not escape.",
                    correct: false,
                    feedback: "INCORRECT. Striking the head with a baton constitutes deadly force. Deadly force is NEVER permitted against a fleeing, non-violent property thief who poses no imminent threat of death or great bodily harm."
                },
                {
                    text: "Recognize that because the subject is fleeing, unarmed, and poses no threat to human life, deadly force is prohibited. Order him to halt, observe his clothing and physical description, monitor his direction of flight, recover the abandoned tools, and contact 911 dispatch immediately.",
                    correct: true,
                    feedback: "CORRECT! Illinois law (720 ILCS 5/7-3) explicitly prohibits deadly force solely to protect property or capture a non-threatening fleeing suspect. Documenting the suspect's description and recovering the property represents lawful, professional security procedure."
                },
                {
                    text: "Discharge an intermediate weapon at the back of his neck as punishment for entering the yard.",
                    correct: false,
                    feedback: "INCORRECT. Force can never be used punitively or out of anger. Striking the neck is potentially lethal and constitutes felony aggravated battery."
                }
            ],
            illustration: "assets/use_of_force.png"
        },
        checkOnLearning: [
            {
                id: "c3_1",
                question: "Under Illinois Law (720 ILCS 5/7-1), what is the ONLY legal threshold that justifies the use of deadly force?",
                options: [
                    "To prevent an unauthorized trespasser from entering a commercial warehouse.",
                    "When the officer reasonably believes that such force is necessary to prevent imminent death or great bodily harm to themselves or another, or to stop a forcible felony.",
                    "Whenever an individual refuses to comply with three consecutive lawful verbal instructions.",
                    "To prevent an individual from stealing property with a monetary value greater than $500."
                ],
                correctAnswer: "When the officer reasonably believes that such force is necessary to prevent imminent death or great bodily harm to themselves or another, or to stop a forcible felony.",
                remediationTarget: "sec3-1",
                explanation: "Under 720 ILCS 5/7-1, deadly force is strictly restricted to defending against imminent death or great bodily harm, or preventing a forcible felony. It is never permitted solely to protect tangible property."
            },
            {
                id: "c3_2",
                question: "Can an unarmed security officer in Illinois use deadly force solely to prevent a shoplifter from fleeing with a store television?",
                options: [
                    "Yes, if the television is valued above $1,000.",
                    "Yes, but only if the store owner provides written pre-authorization.",
                    "No, Illinois law (720 ILCS 5/7-3) strictly forbids deadly force solely to protect personal property or merchandise.",
                    "Yes, provided the officer yells a warning before using force."
                ],
                correctAnswer: "No, Illinois law (720 ILCS 5/7-3) strictly forbids deadly force solely to protect personal property or merchandise.",
                remediationTarget: "sec3-2",
                explanation: "720 ILCS 5/7-3 explicitly limits force in defense of property to non-deadly force. Commercial goods can be replaced; human life cannot."
            },
            {
                id: "c3_3",
                question: "According to the Verbal Judo de-escalation philosophy, what is one of the 'Universal Truths' of human interaction that helps defuse angry subjects?",
                options: [
                    "All people prefer to be aggressively commanded in public.",
                    "All people want to be offered options rather than threats.",
                    "Physical force is the fastest way to gain long-term respect.",
                    "Never explain the reason behind a security rule."
                ],
                correctAnswer: "All people want to be offered options rather than threats.",
                remediationTarget: "sec3-4",
                explanation: "Verbal Judo teaches that offering people options rather than direct threats gives them a psychological way to cooperate while preserving their dignity, preventing violent physical escalation."
            }
        ],
        takeaways: [
            "Deadly force is justified ONLY to prevent imminent death or great bodily harm (720 ILCS 5/7-1).",
            "Deadly force can NEVER be used solely to protect personal property or merchandise (720 ILCS 5/7-3).",
            "Follow the 5-Level Continuum: Presence, Verbal Direction, Empty Hand, Intermediate Weapons, Deadly Force.",
            "De-escalate conflicts early using Verbal Judo and active listening."
        ]
    },
    {
        id: 4,
        number: "Lesson 4",
        title: "Arrest, Handcuffing & Control Techniques",
        duration: "3 Hours",
        icon: "lock",
        summary: "Mechanical and medical protocols of handcuffing, double-locking, positional asphyxia prevention, expandable baton strike zones (Green, Yellow, Red), and OC pepper spray deployment with decontamination.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Master proper rear handcuff application mechanics, keyhole orientation, and double-locking procedures.</li>
                    <li>Recognize the life-threatening medical dangers of Positional Asphyxia and Excited Delirium during restraint.</li>
                    <li>Analyze expandable baton mechanics, deployment angles, and anatomical strike zones.</li>
                    <li>Execute proper OC chemical spray deployment, safe distances, and mandatory post-exposure decontamination.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-4">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">Face Down on the Wet CTA Concourse Tile</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 5 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(4)" id="btn-narration-audio-4" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>It was rush hour on a slushy Tuesday evening inside a bustling transit station concourse. Commuters were rushing through the turnstiles when an agitated, highly combative subject assaulted a female station attendant, knocking her to the floor. Two contracted security officers, Kevin and Jamal, intervened immediately to protect the attendant and restrain the subject.</p><p>The subject was over six feet tall, 240 pounds, violently thrashing, foaming at the mouth, and appeared to be experiencing excited delirium induced by PCP or methamphetamine. Kevin and Jamal used approved team-takedown mechanics to bring the subject down to the ceramic tile floor, which was coated in wet slush and road salt.</p><p>The struggle was fierce. The subject was biting, kicking, and screaming unintelligible threats. Kevin placed his right knee firmly across the subject's upper spine and shoulder blades to pin him while Jamal worked to bring the subject's left wrist behind his back. The subject was lying completely prone—face down on his stomach with his chest compressed against the wet floor. After sixty seconds of intense struggle, Jamal successfully applied the handcuffs.</p><p>The subject groaned in a muffled voice: 'Man... please... I can't breathe... I can't get no air...' Kevin, still exhausted and running on pure adrenaline, shouted back: 'If you can talk, you can breathe! Stop squirming and lie still!' Kevin kept his full body weight pinned across the subject's back for another four minutes while waiting for the police transport van.</p><p>By the time Chicago Police and CFD paramedics arrived, the subject had stopped squirming. In fact, he had stopped moving entirely. His face had turned a deep purplish-blue, his pulse was absent, and CPR was initiated on scene. The subject suffered irreversible hypoxic brain damage and died thirty-six hours later at Northwestern Memorial Hospital.</p><p>What happened on that tile floor is the tragic reality of Positional Asphyxia—the number one cause of in-custody restraint deaths in private security and law enforcement. When a human being is placed face-down in a prone position, especially after extreme physical exertion, the weight of their own abdominal organs presses up into the diaphragm, preventing the lungs from expanding. Adding a security officer's body weight onto the subject's back completely halts respiratory mechanics.</p><p>In Illinois, security officers have an absolute legal duty of care once a subject is restrained. The myth that 'if you can talk, you can breathe' has been disproven in courts across America. The moment handcuffs are ratcheted on, you must IMMEDIATELY roll the subject off their stomach into the Recovery Position (on their side) or sit them upright against a wall. Furthermore, you must double-lock the handcuffs and check the gap with your pinky finger to prevent radial nerve damage.</p><p>Remember this operational rule on every shift: The instant handcuffs click shut, the battle is over and your role as a protector begins. You are legally responsible for that person's survival. If they say they cannot breathe, you roll them into the recovery position immediately. Complacency in restraint is the quickest path to a prison sentence.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec4-1">1. Professional Handcuffing Mechanics</h3>
            <p>Handcuffs are temporary mechanical restraining devices intended to prevent attack, escape, or evidence destruction. Improper handcuffing causes severe nerve injury and creates immense civil liability.</p>
            <div class="media-container">
                <img src="assets/q_handcuffing.jpg" alt="Proper Rear Handcuffing Technique" class="responsive-img">
            </div>
            <ul>
                <li><strong>Tactical Approach:</strong> Approach from the <em>2½ tactical position</em> (rear flank). Never approach a suspect head-on.</li>
                <li><strong>Rear Application:</strong> Hands must <strong>ALWAYS be handcuffed BEHIND THE BACK with palms facing outward</strong> and thumbs pointing upward. Handcuffing with hands in front allows a suspect full mobility to strike the officer, grab weapons, or operate vehicle controls.</li>
                <li><strong>Fit Verification:</strong> Check tightness by inserting the tip of your index finger between the subject's wrist and the handcuff cheek. It should be snug but not pinch or cut off blood circulation.</li>
                <li><strong>Mandatory Double-Locking:</strong> Immediately engage the double-lock mechanism (by depressing the double-lock pin on each cuff). Double-locking serves two vital purposes:
                    <ol>
                        <li>Prevents the handcuffs from ratcheting tighter if the suspect moves or falls (preventing nerve damage/lawsuits);</li>
                        <li>Prevents the suspect from shimming or picking the cuff ratchet.</li>
                    </ol>
                </li>
            </ul>

            <h3 id="sec4-2">2. Critical Medical Warning: Positional Asphyxia & Excited Delirium</h3>
            <div class="callout warning">
                <strong>DUTY OF CARE IN RESTRAINT (POSITIONAL ASPHYXIA):</strong>
                <p>When an arrestee is handcuffed behind the back and held face-down on their stomach (prone position), the weight of their body, combined with the elevated diaphragm, severely restricts chest expansion and prevents oxygenation. <strong>Restraining an arrestee face-down in the prone position can result in sudden death from POSITIONAL ASPHYXIA within minutes.</strong></p>
                <p><strong>Mandatory Action:</strong> The moment handcuffs are applied, immediately roll the subject onto their side (recovery position) or place them in an upright seated position. <strong>NEVER leave a handcuffed subject lying face-down on their stomach, and NEVER sit or kneel on their spine or neck.</strong> Constantly monitor their breathing and consciousness.</p>
            </div>

            <h3 id="sec4-3">3. Expandable Defensive Baton Strike Zones</h3>
            <div class="media-container">
                <img src="assets/baton_chart.png" alt="Baton Target Strike Zones Chart" class="responsive-img">
            </div>
            <p>The expandable baton is an intermediate impact weapon used to immobilize active combative aggressors:</p>
            <ul>
                <li><strong>Grip & Stance:</strong> Full-hand grip centered on handle, balanced defensive stance.</li>
                <li><strong>Opening Methods:</strong> Upward deployment to the sky (maximum visibility, psychological deterrence) or downward to the ground (minimal visibility, directly fluid into a strike).</li>
                <li><strong>Green Target Zones (Primary Non-Lethal):</strong> Center of large muscle mass:
                    <ul>
                        <li>Thighs (quadriceps and femoral motor nerve point);</li>
                        <li>Calves (gastrocnemius and common peroneal nerve point);</li>
                        <li>Arms (biceps and triceps).</li>
                    </ul>
                </li>
                <li><strong>Yellow Target Zones (Secondary / High Injury):</strong> Skeletal joints (knees, elbows, wrists, collarbone). Targeted only when green zone strikes fail to stop aggressive assault.</li>
                <li><strong>Red Target Zones (LETHAL FORCE): Head, neck, throat, spine, sternum, and groin.</strong>
                    <div class="callout warning">
                        <strong>LETHAL FORCE RULE:</strong> Striking an individual on the head or neck with an impact baton constitutes <strong>DEADLY FORCE</strong>. It is legally prohibited unless the officer reasonably believes they are facing imminent death or great bodily harm!
                    </div>
                </li>
            </ul>

            <h3 id="sec4-4">4. Oleoresin Capsicum (OC) Pepper Spray Deployment & Decontamination</h3>
            <ul>
                <li><strong>Deployment:</strong> Deliver short 1/2 to 1-second bursts across the brow and eye level using a horizontal sweeping motion from a distance of 4 to 6 feet.</li>
                <li><strong>Avoid Hydraulic Needle Effect:</strong> Never spray closer than 3 feet, as pressurized liquid can cause mechanical eye injury.</li>
                <li><strong>Mandatory Decontamination Duty:</strong> Once the combative subject is handcuffed, the officer owes a legal duty of care:
                    <ol>
                        <li>Move subject to fresh, well-ventilated air;</li>
                        <li>Flush face and eyes with copious amounts of clean, cool running water (never rub eyes);</li>
                        <li>Do not apply oils, creams, or soaps;</li>
                        <li>Summon EMS if breathing difficulties, chest pains, or prolonged blindness persist.</li>
                    </ol>
                </li>
            </ul>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Combative Suspect Handcuffing & Medical Distress",
            setup: "You and your security partner successfully place handcuffs on a combative subject who attempted to assault building tenants. The suspect is lying face down on the concrete floor, breathing heavily, and slurring his words. Your partner sits on the suspect's back while waiting for police dispatch.",
            question: "What immediate life-safety correction must you enforce?",
            options: [
                {
                    text: "Tell your partner to sit harder to ensure the suspect cannot stand up.",
                    correct: false,
                    feedback: "INCORRECT. Sitting on a prone subject's back causes Positional Asphyxia, which can kill the subject within minutes."
                },
                {
                    text: "Immediately order your partner off the suspect's back, roll the handcuffed suspect onto their side in the recovery position or sit them upright, verify their handcuffs are double-locked, and continuously monitor their breathing.",
                    correct: true,
                    feedback: "CORRECT! Handcuffed subjects kept in the prone position are at extreme risk of Positional Asphyxia. Moving them onto their side or seated upright restores airway expansion and satisfies your affirmative legal duty of care."
                },
                {
                    text: "Leave the suspect face down on the floor and go back to the front desk to resume paperwork.",
                    correct: false,
                    feedback: "INCORRECT. Abandoning a restrained person in a hazardous posture is gross negligence. Officers must maintain constant physical custody and monitoring."
                }
            ],
            illustration: "assets/q_handcuffing.jpg"
        },
        checkOnLearning: [
            {
                id: "c4_1",
                question: "Why is it mandatory that an arrested subject be handcuffed with their hands BEHIND their back rather than in front?",
                options: [
                    "Because handcuffs only lock properly when positioned behind the body.",
                    "Handcuffing in front allows the subject full mobility to use their hands as a weapon, strike the guard, or attempt escape.",
                    "Illinois administrative law only requires rear handcuffing between 9:00 PM and 6:00 AM.",
                    "Because front handcuffing voids the manufacturer's warranty."
                ],
                correctAnswer: "Handcuffing in front allows the subject full mobility to use their hands as a weapon, strike the guard, or attempt escape.",
                remediationTarget: "sec4-1",
                explanation: "Rear handcuffing restricts upper body mobility, prevents suspects from utilizing hands offensively or manipulating locks, and ensures officer safety."
            },
            {
                id: "c4_2",
                question: "What is the primary danger of leaving a handcuffed subject lying face down on their stomach (in the prone position)?",
                options: [
                    "They will easily pick the handcuff keyway with a pocket clip.",
                    "Positional Asphyxia, where body weight and position prevent the lungs and diaphragm from expanding, leading to sudden asphyxiation.",
                    "The handcuffs will automatically disengage from excessive pressure.",
                    "They will suffer immediate hearing loss."
                ],
                correctAnswer: "Positional Asphyxia, where body weight and position prevent the lungs and diaphragm from expanding, leading to sudden asphyxiation.",
                remediationTarget: "sec4-2",
                explanation: "Positional asphyxia occurs when a subject's body position restricts their breathing. Leaving a restrained person face-down is a leading cause of in-custody death and massive civil liability."
            },
            {
                id: "c4_3",
                question: "In expandable baton defensive tactics, strikes to which anatomical area are legally categorized as DEADLY FORCE?",
                options: [
                    "The large muscle mass of the thighs and calves (Green Zone)",
                    "The biceps and triceps muscle groups (Green Zone)",
                    "The head, neck, throat, spine, sternum, and groin (Red Zone)",
                    "The lower forearm"
                ],
                correctAnswer: "The head, neck, throat, spine, sternum, and groin (Red Zone)",
                remediationTarget: "sec4-3",
                explanation: "Strikes to the head, neck, spine, and sternum can fracture bone, cause intracranial hemorrhage, or stop the heart. They are legally categorized as deadly force and strictly prohibited unless deadly force is justified."
            }
        ],
        takeaways: [
            "Handcuff arrestees with hands BEHIND the back, palms out, and DOUBLE-LOCK immediately.",
            "Never leave restrained subjects prone on their stomach—prevent Positional Asphyxia.",
            "Baton strikes to the head, neck, or spine constitute DEADLY FORCE (Red Zone).",
            "Always provide water decontamination after deploying OC pepper spray."
        ]
    },
    {
        id: 5,
        number: "Lesson 5",
        title: "Elements of Offenses Under Illinois Criminal Code of 2012",
        duration: "2 Hours",
        icon: "gavel",
        summary: "Detailed statutory definitions under 720 ILCS 5/ for Murder, Assault, Battery, Theft, Robbery, Burglary, Arson, Criminal Damage, Criminal Trespass, and Disorderly Conduct.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Master the statutory definitions of core Illinois criminal offenses under 720 ILCS 5/.</li>
                    <li>Differentiate critical legal distinctions (Assault vs. Battery; Theft vs. Robbery vs. Burglary).</li>
                    <li>Accurately categorize observed criminal behavior for police reporting and incident documentation.</li>
                    <li>Determine whether observed conduct meets statutory requirements for a lawful citizen's arrest.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-5">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">The Chatham Gas Station and the Flying Hennessy Bottle</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(5)" id="btn-narration-audio-5" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>At 3:00 AM on a humid August morning, an unarmed patrol guard named Terrence was stationed at a 24-hour convenience store and gas station in the Chatham neighborhood of Chicago. The interior was brightly lit, protected by bullet-resistant cashier glass.</p><p>Suddenly, a loud crash shattered the silence. A young male kicked in the lower pane of the store's plate-glass side door, stepped through the broken shards, and ran directly behind the sales counter into an area marked 'EMPLOYEES ONLY'. The intruder began grabbing cartons of Newport cigarettes from the display rack and shoving them into a heavy duffel bag.</p><p>Terrence stepped into the aisle and gave a loud tactical command: 'Stop! Drop the bag!' The intruder turned, eyes wide, grabbed a glass Hennessy bottle from the counter display, and hurled it violently directly at Terrence's face. Terrence ducked just in time; the heavy bottle shattered against the concrete wall inches behind his ear, showering him in liquor and glass shards.</p><p>The intruder dropped the duffel bag, scrambled back out through the shattered window, sprinted twenty feet across the parking apron, and ran into the open vestibule of an adjacent three-flat apartment building to hide from the sirens echoing in the distance.</p><p>When Chicago Police arrived ninety seconds later, the responding patrol sergeant asked Terrence for the incident details. How Terrence classified those ten seconds would dictate whether the Cook County State's Attorney approved Class A misdemeanors or Class X violent felonies under the Illinois Criminal Code (720 ILCS 5/).</p><p>Let's break down the law as a professional security officer: 1. Did the suspect commit Retail Theft (720 ILCS 5/16-25)? Yes, by taking cigarettes. 2. Did he commit Burglary (720 ILCS 5/19-1)? YES. Entering any building or part thereof without authority with the intent to commit a theft or felony constitutes Burglary—a non-probationable felony! 3. Did he commit Robbery (720 ILCS 5/18-1)? Yes, because the moment he threw that bottle to facilitate his escape with stolen goods, he introduced force into the theft. 4. Throwing that bottle at Terrence's face constituted Aggravated Assault (720 ILCS 5/12-2) because it caused reasonable apprehension of great bodily harm with a deadly projectile.</p><p>Terrence provided a flawless statutory breakdown to the responding officers. They searched the vestibule, took the suspect into custody without incident, and recovered the merchandise. Because Terrence articulated the burglary and aggravated assault elements clearly in his initial statement, the suspect was held on felony charges.</p><p>Keep this mental index sharp on every shift: In the Illinois Criminal Code, actions dictate felony classifications. Knowing the exact difference between simple theft, burglary, assault, and robbery transforms you from a bystander with a badge into an indispensable asset to the justice system.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec5-1">1. Statutory Offenses Breakdown (720 ILCS 5/)</h3>
            <p>Security officers must know the precise elements of crimes under the <strong>Illinois Criminal Code of 2012</strong> to document offenses credibly and avoid filing false or erroneous police reports:</p>

            <div class="offense-table">
                <div class="offense-row">
                    <div class="offense-name">Murder (720 ILCS 5/9-1)</div>
                    <div class="offense-def">Killing a person without legal justification, either intending to kill or do great bodily harm, or knowing that such acts will cause death or a strong probability of death.</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Kidnapping (720 ILCS 5/10-1)</div>
                    <div class="offense-def">Knowingly and secretly confining a person against their will, or by force or threat of imminent force carrying a person from one place to another with intent to secretly confine.</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Criminal Sexual Assault (720 ILCS 5/11-1.20)</div>
                    <div class="offense-def">Committing an act of sexual penetration by use of force or threat of force, or without knowledgeable consent.</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Assault (720 ILCS 5/12-1)</div>
                    <div class="offense-def">Conduct which places another in <strong>reasonable apprehension of receiving a battery</strong> (no physical contact required; e.g., advancing with a raised pipe or threatening immediate violence).</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Battery (720 ILCS 5/12-3)</div>
                    <div class="offense-def">Intentionally or knowingly without legal justification: (1) <strong>causes bodily harm</strong> to an individual, OR (2) <strong>makes physical contact of an insulting or provoking nature</strong> (e.g., shoving, spitting, punching).</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Theft (720 ILCS 5/16-1)</div>
                    <div class="offense-def">Knowingly obtaining or exerting unauthorized control over property of the owner by deception, threat, or unauthorized taking with intent to permanently deprive the owner of its use or benefit.</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Robbery (720 ILCS 5/18-1)</div>
                    <div class="offense-def">Knowingly <strong>taking property from the person or presence of another by the USE OF FORCE or by THREATENING THE IMMINENT USE OF FORCE</strong>. (Class 2 Felony).</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Burglary (720 ILCS 5/19-1)</div>
                    <div class="offense-def">Knowingly without authority <strong>entering or remaining within a building</strong>, housetrailer, watercraft, aircraft, or motor vehicle with the <strong>intent to commit therein a felony or theft</strong>.</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Arson (720 ILCS 5/20-1)</div>
                    <div class="offense-def">By means of fire or explosives, knowingly <strong>damaging any real property or personal property having a value of $150 or more</strong> without consent of the owner.</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Criminal Damage to Property (720 ILCS 5/21-1)</div>
                    <div class="offense-def">Knowingly damaging any property of another without consent (e.g., smashing a window, slashing tires, graffiti vandalism).</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Criminal Trespass to Real Property (720 ILCS 5/21-3)</div>
                    <div class="offense-def">Knowingly entering or remaining upon land or in a building without lawful authority after receiving notice from the owner or security officer forbidding entry, or refusing to leave after receiving oral or written notice.</div>
                </div>
                <div class="offense-row">
                    <div class="offense-name">Disorderly Conduct (720 ILCS 5/26-1)</div>
                    <div class="offense-def">Doing any act in such an unreasonable manner as to <strong>alarm or disturb another and to provoke a breach of the peace</strong> (includes transmitting false fire alarms or 911 calls).</div>
                </div>
            </div>

            <h3 id="sec5-2">2. Critical Statutory Distinctions for Security Guards</h3>
            <div class="liability-grid">
                <div class="liability-card">
                    <h4>Theft vs. Robbery vs. Burglary</h4>
                    <ul>
                        <li><strong>Theft:</strong> Secretly concealing a wallet left on a counter (no force, no confrontation).</li>
                        <li><strong>Robbery:</strong> Demanding the wallet while pushing the victim or threatening physical injury (force used against a person).</li>
                        <li><strong>Burglary:</strong> Breaking a window after closing hours to enter the business with intent to steal the cash register (unauthorized entry with intent).</li>
                    </ul>
                </div>
                <div class="liability-card">
                    <h4>Assault vs. Battery</h4>
                    <ul>
                        <li><strong>Assault is the THREAT:</strong> Raising an iron bar and yelling "I'm going to smash you!" causing the guard to jump back in reasonable apprehension.</li>
                        <li><strong>Battery is the CONTACT:</strong> The iron bar actually striking the guard, or shoving the guard backwards.</li>
                    </ul>
                </div>
            </div>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Snatch & Grab vs Force",
            setup: "A suspect approaches a customer seated at an outdoor cafe on private property, forcefully rips her purse off her shoulder while pulling her violently to the ground, and sprints away. You observe this entire incident.",
            question: "Under the Illinois Criminal Code, what is the exact legal offense you will report to Chicago Police dispatch?",
            options: [
                {
                    text: "Theft (720 ILCS 5/16-1) because only personal property was taken.",
                    correct: false,
                    feedback: "INCORRECT. Because physical force was applied to the victim's person to take the property, this elevates the offense to a violent felony."
                },
                {
                    text: "Robbery (720 ILCS 5/18-1) because the property was taken from the person/presence of another by way of physical force or threat of force.",
                    correct: true,
                    feedback: "CORRECT! Robbery under 720 ILCS 5/18-1 is distinguished from theft by the use of force or threat of force against a person. Pulling the victim to the ground makes this a Class 2 Felony Robbery."
                },
                {
                    text: "Burglary (720 ILCS 5/19-1) because an item was stolen on commercial grounds.",
                    correct: false,
                    feedback: "INCORRECT. Burglary requires entering or remaining in a building or structure with intent to commit a theft. Outdoor street snatches do not constitute burglary."
                }
            ],
            illustration: "assets/q_arrest_patrol.jpg"
        },
        checkOnLearning: [
            {
                id: "c5_1",
                question: "What is the crucial legal distinction between Assault (720 ILCS 5/12-1) and Battery (720 ILCS 5/12-3) under Illinois law?",
                options: [
                    "Assault is a felony, whereas Battery is only an ordinance violation.",
                    "Assault is conduct causing reasonable apprehension of harm (no contact required), whereas Battery requires actual physical contact or bodily harm.",
                    "Assault requires a deadly weapon, whereas Battery is committed with hands only.",
                    "Assault applies to property, whereas Battery applies to animals."
                ],
                correctAnswer: "Assault is conduct causing reasonable apprehension of harm (no contact required), whereas Battery requires actual physical contact or bodily harm.",
                remediationTarget: "sec5-1",
                explanation: "Under Illinois law, Assault (720 ILCS 5/12-1) is the threat or conduct causing apprehension of a battery. Battery (720 ILCS 5/12-3) requires actual physical contact of an insulting, provoking, or harmful nature."
            },
            {
                id: "c5_2",
                question: "What differentiates Robbery (720 ILCS 5/18-1) from simple Theft (720 ILCS 5/16-1)?",
                options: [
                    "The value of the property taken must exceed $5,000.",
                    "Robbery involves taking property from a person or presence of another by the USE OF FORCE or THREAT OF IMMINENT FORCE.",
                    "Theft can only be committed during nighttime hours.",
                    "Robbery applies strictly to banks and credit unions."
                ],
                correctAnswer: "Robbery involves taking property from a person or presence of another by the USE OF FORCE or THREAT OF IMMINENT FORCE.",
                remediationTarget: "sec5-2",
                explanation: "Robbery is distinguished by the use of force or threat of force against a person. Simple theft involves unauthorized control over property without force."
            },
            {
                id: "c5_3",
                question: "Under 720 ILCS 5/20-1, what is the minimum statutory property damage value caused by fire or explosives required to constitute the crime of Arson?",
                options: [
                    "$50",
                    "$150 or more",
                    "$1,000",
                    "$10,000"
                ],
                correctAnswer: "$150 or more",
                remediationTarget: "sec5-1",
                explanation: "Under 720 ILCS 5/20-1, Arson is defined as knowingly damaging property having a value of $150 or more by means of fire or explosives without consent."
            }
        ],
        takeaways: [
            "Assault = Apprehension of battery (threat); Battery = Actual physical contact or bodily harm.",
            "Robbery = Taking property with force or threat of force; Theft = Taking property without force.",
            "Burglary = Entering or remaining in a building without authority with intent to commit a crime.",
            "Arson = Property damage of $150 or more caused by fire or explosives."
        ]
    },
    {
        id: 6,
        number: "Lesson 6",
        title: "The Law on Private Security",
        duration: "1 Hour",
        icon: "id-badge",
        summary: "Illinois Private Detective, Private Alarm, Private Security, Fingerprint Vendor, and Locksmith Act of 2004 (225 ILCS 447), IDFPR oversight, PERC Card credentials, uniform compliance, and badge regulations.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Understand the regulatory mandate of the Illinois Department of Financial and Professional Regulation (IDFPR).</li>
                    <li>Master Permanent Employee Registration Card (PERC Card) application, renewal, and disqualification rules.</li>
                    <li>Enforce strict compliance with Illinois uniform, badge, and vehicle identification laws.</li>
                    <li>Recognize criminal penalties for impersonating a peace officer under 720 ILCS 5/32-5.1.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-6">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">The Crown Victoria, the Blue Lights, and the State Trooper</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(6)" id="btn-narration-audio-6" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>It was 11:45 PM on the shoulder of the Eisenhower Expressway (I-290) near First Avenue. A dark blue Ford Crown Victoria—a decommissioned municipal squad car—was parked behind a stranded motorist. On the dashboard of the Crown Victoria was an aftermarket light bar flashing bright blue and red strobe lights. Inside the car was an unarmed security guard named Bradley.</p><p>Bradley was wearing a navy uniform shirt adorned with gold shoulder braid, gold epaulets, and a metal shield badge that read: 'OFFICER - SPECIAL POLICE DIVISION - STATE OF ILLINOIS'. He had a duty belt with handcuffs, a radio holder, and a replica sidearm holster. Bradley had just pulled behind the motorist, stepped out, tapped on their window, and said: 'State Security Officer Bradley, step out of the car, license and registration please.'</p><p>At that moment, an Illinois State Police (ISP) patrol car pulled up behind with spotlight blazing. The Trooper walked up, took one look at Bradley's vehicle, his uniform, and his badge, and asked for his credentials. Bradley proudly handed over his Illinois Permanent Employee Registration Card (PERC).</p><p>Within sixty seconds, Bradley was in handcuffs against the hood of the Trooper's cruiser. Why? Because Bradley had violated almost every primary provision of the Private Detective, Private Alarm, Private Security, Fingerprint Vendor, and Locksmith Act of 2004 (225 ILCS 447) and committed a felony under the Illinois Criminal Code.</p><p>Let's dissect the statutes: Under 225 ILCS 447/25-30, no private security contractor or employee may wear a badge, uniform, patch, or insignia containing the word 'POLICE'. Security uniforms must distinctly differentiate the security employee from sworn municipal or state peace officers. Under the Illinois Vehicle Code (625 ILCS 5/12-215), security vehicles are authorized to use AMBER (yellow) flashing roof lights ONLY. Blue lights are strictly reserved for sworn peace officers and volunteer firefighters; operating blue or red flashing lights on a security patrol car is a Class 4 Felony: False Impersonation of a Peace Officer under 720 ILCS 5/32-5.1.</p><p>Bradley's PERC card was permanently revoked by the IDFPR. His employer's agency license was placed on state administrative probation with a \$5,000 civil penalty, and Bradley was arraigned in Maywood Circuit Court on felony impersonation charges.</p><p>Embed this principle into your professional identity: A licensed security officer in Illinois is a vital private professional, not a junior police officer. The public and our clients trust us because we respect our legal boundaries. The moment you pretend to be a sworn cop, you destroy your credibility, lose your license, and face criminal prosecution.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec6-1">1. The Illinois Private Security Act of 2004 (225 ILCS 447)</h3>
            <p>Private security operations in Illinois are governed strictly by the <strong>Illinois General Assembly</strong> through the <strong>Private Detective, Private Alarm, Private Security, Fingerprint Vendor, and Locksmith Act of 2004 (225 ILCS 447)</strong>, administered by the <strong>IDFPR</strong>.</p>
            <ul>
                <li><strong>Permanent Employee Registration Card (PERC Card):</strong> Every security guard employed by a licensed agency in Illinois must hold a valid, active PERC Card issued by IDFPR.</li>
                <li><strong>Fingerprint Background Checks:</strong> Applicants must complete state (ISP) and federal (FBI) fingerprint background checks through an IDFPR-licensed fingerprint vendor.</li>
                <li><strong>Statutory 20-Hour Training Requirement:</strong> All registered unarmed guards must successfully complete 20 hours of approved basic training within specified statutory timeframes.</li>
                <li><strong>Disqualifiers:</strong> IDFPR will deny or revoke a PERC Card for felony convictions within the preceding 10 years, acts of fraud, firearms violations, or moral turpitude.</li>
            </ul>

            <h3 id="sec6-2">2. Uniform, Badge & Vehicle Regulations (225 ILCS 447/25-30)</h3>
            <p>Illinois law imposes strict visual standards on private security uniforms to prevent public confusion with sworn law enforcement:</p>
            <ul>
                <li><strong>Agency Identification:</strong> Uniforms must display an agency shoulder patch or chest insignia clearly identifying the private security company name.</li>
                <li><strong>Badge Restrictions:</strong> Badges must be clearly marked "Security Officer" or "Security Guard."
                    <div class="callout warning">
                        <strong>PROHIBITED WORDS:</strong> Security badges, vehicle markings, or patches must NEVER contain the words <em>"Police", "Sheriff", "Deputy", "State Trooper", "Agent", or "Highway Patrol."</em>
                    </div>
                </li>
                <li><strong>Vehicle Markings:</strong> Security patrol vehicles must clearly state "Security" in letters at least 2 inches high. They are strictly prohibited from using blue flashing emergency lights (blue is reserved exclusively for sworn Illinois law enforcement; security may use amber/white warning lights on private property).</li>
                <li><strong>Impersonation of a Peace Officer (720 ILCS 5/32-5.1):</strong> Falsely representing oneself as a police officer is a Class 4 Felony in Illinois.</li>
            </ul>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Uniform & Badge Compliance",
            setup: "A new security guard purchases an unauthorized star-shaped metal badge online that reads 'SPECIAL POLICE OFFICER' and attaches it to his uniform shirt before starting his shift at a commercial office building in Chicago.",
            question: "What Illinois statute is violated, and what is the required administrative action?",
            options: [
                {
                    text: "This is completely legal as long as the guard possesses an active PERC card.",
                    correct: false,
                    feedback: "INCORRECT. Possessing a PERC card does not authorize wearing badges displaying the word 'Police'. This violates state law."
                },
                {
                    text: "Under 225 ILCS 447 and 720 ILCS 5/32-5.1, the badge violates state uniform regulations and constitutes unlawful impersonation of a peace officer. The badge must be immediately removed and replaced with an approved agency 'Security Officer' badge.",
                    correct: true,
                    feedback: "CORRECT! Illinois law strictly prohibits security personnel from wearing badges or uniform insignia containing the word 'Police' or 'Special Police.' Wearing this badge exposes the officer to felony criminal charges and IDFPR PERC revocation."
                },
                {
                    text: "The guard may wear the badge only if they also carry a baton and pepper spray.",
                    correct: false,
                    feedback: "INCORRECT. Carrying defensive tools does not grant police authority or excuse illegal uniform insignia."
                }
            ],
            illustration: "assets/q_arrest_patrol.jpg"
        },
        checkOnLearning: [
            {
                id: "c6_1",
                question: "What state agency regulates security officers and issues PERC Cards in the State of Illinois?",
                options: [
                    "Illinois Department of Transportation (IDOT)",
                    "Illinois Department of Financial and Professional Regulation (IDFPR)",
                    "Chicago Department of Public Health",
                    "Federal Bureau of Investigation (FBI)"
                ],
                correctAnswer: "Illinois Department of Financial and Professional Regulation (IDFPR)",
                remediationTarget: "sec6-1",
                explanation: "The IDFPR oversees licensing, credentialing, and disciplinary action for all private security agencies and PERC cardholders in Illinois."
            },
            {
                id: "c6_2",
                question: "Under 225 ILCS 447, which of the following words is STRICTLY PROHIBITED from appearing on an Illinois private security badge or patch?",
                options: [
                    "Security",
                    "Guard",
                    "Police",
                    "Patrol"
                ],
                correctAnswer: "Police",
                remediationTarget: "sec6-2",
                explanation: "Illinois law strictly forbids security badges or uniforms from displaying the words 'Police', 'Sheriff', or 'Deputy' to prevent impersonation and public deception."
            },
            {
                id: "c6_3",
                question: "What color emergency warning roof lights are private security vehicles in Illinois STRICTLY PROHIBITED from displaying?",
                options: [
                    "Amber",
                    "White",
                    "Blue",
                    "Yellow"
                ],
                correctAnswer: "Blue",
                remediationTarget: "sec6-2",
                explanation: "Under the Illinois Vehicle Code, blue oscillating/flashing emergency lights are reserved exclusively for sworn law enforcement vehicles. Security vehicles are restricted to amber/white warning lights on private property."
            }
        ],
        takeaways: [
            "All Illinois security guards must maintain an active IDFPR PERC Card (225 ILCS 447).",
            "Uniforms and badges must NEVER use the words 'Police', 'Sheriff', or 'Deputy'.",
            "Security vehicles are strictly forbidden from using blue emergency lights.",
            "Private security authority is bounded strictly by contract and private property boundaries."
        ]
    },
    {
        id: 7,
        number: "Lesson 7",
        title: "Fire Prevention, Life Safety & Emergency Equipment",
        duration: "2 Hours",
        icon: "fire-extinguisher",
        summary: "The Fire Tetrahedron, NFPA Classes of Fire (A, B, C, D, K), fire extinguisher mechanics and the P.A.S.S. technique, commercial high-rise evacuation protocols, and smoke escape dynamics.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Understand the chemical dynamics of the Fire Tetrahedron (Fuel, Heat, Oxygen, Chain Reaction).</li>
                    <li>Master all 5 NFPA fire classifications and identify compatible extinguishing agents.</li>
                    <li>Execute the 4-step P.A.S.S. operating sequence for portable fire extinguishers.</li>
                    <li>Apply high-rise building evacuation procedures, door thermal testing, and smoke crawl safety.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-7">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">The Banked Black Smoke and the Wrong Canister</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 5 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(7)" id="btn-narration-audio-7" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>At 4:00 AM on a frigid Sunday morning, an unarmed security officer named Elena was monitoring the central fire alarm console in the basement of a 30-story commercial office tower in downtown Chicago. Suddenly, the panel erupted into a multi-zone alarm: 'Zone 14: Server Data Facility - Duct Smoke & Heat Sensor Activated.'</p><p>Elena strapped on her two-way radio, grabbed the master keys, and took the elevator to the 13th floor—smartly avoiding the fire floor itself—before walking up the concrete stairwell to Floor 14. When she cracked open the heavy fire door to the 14th-floor hallway, she was hit with a suffocating wall of heat and the sharp, burning stench of melting PVC and electrical transformers.</p><p>Elena looked down the corridor. Dense, pitch-black smoke was banking down from the ceiling like a heavy blanket, hanging suspended exactly 4 feet off the floor. Underneath the smoke layer, the air was clear, but above it, visibility was zero and temperatures were exceeding 400 degrees Fahrenheit.</p><p>At the end of the hall, flames were visibly flickering through the open door of the server room. Mounted on the corridor wall was a pressurized water fire extinguisher (Class A). Elena grabbed the silver canister, unholstered the hose, and prepared to sprint down the hallway upright into the server room to blast the energized 480-volt electrical server banks with water.</p><p>If Elena had taken three more steps, she would have died twice over. First, standing upright in banked smoke means inhaling superheated toxic gases—principally carbon monoxide and hydrogen cyanide—which causes respiratory collapse and unconsciousness in fewer than two breaths. Second, spraying a pressurized stream of conductive water onto energized high-voltage electrical equipment (a Class C fire) creates an immediate electrical arc that travels straight up the water stream into the operator's hands, causing fatal electrocution.</p><p>Elena paused and remembered her fire safety training at Platforms Training Academy. She immediately bypassed the water can and located the red CO2 (Carbon Dioxide) extinguisher with the large plastic horn rated for Class B and C electrical fires. She dropped to her knees into the cool, breathable air layer beneath the 4-foot smoke bank. She checked the server room door with the back of her hand—it was blistering hot. Recognizing that the fire had already transitioned from incipient to fully involved, she followed the gold standard of high-rise safety: She did NOT enter. She sealed the heavy fire door to compartmentalize the flames, pulled the manual pull station, retreated down the stairwell, and directed Chicago Fire Department Engine 13 directly to the riser valve upon arrival.</p><p>Because of Elena's knowledge of fire chemistry, the Fire Tetrahedron, and Class C hazards, not a single life was lost, and the building's halon suppression system contained the fire to a single server bay.</p><p>Lock this rule into your memory: Extinguishers are designed to clear your escape path during the incipient stage of a small fire—they are not meant to turn security guards into structural firefighters. Remember the P.A.S.S. protocol (Pull, Aim, Squeeze, Sweep) and never fight a fire you cannot safely extinguish.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec7-1">1. The Chemistry of Fire & The Fire Tetrahedron</h3>
            <p>Fire is a rapid chemical oxidation process. To initiate and sustain combustion, four elements must be present simultaneously in the <strong>Fire Tetrahedron</strong>:</p>
            <ol>
                <li><strong>Oxygen:</strong> Sustains combustion (minimum ~16% required in ambient air).</li>
                <li><strong>Heat:</strong> Raises material to its ignition temperature.</li>
                <li><strong>Fuel:</strong> Combustible solid, liquid, or gas.</li>
                <li><strong>Uninhibited Chemical Chain Reaction:</strong> Self-propagating molecular oxidation.</li>
            </ol>
            <p>Extinguishment is achieved by eliminating any single component (cooling heat with water, smothering oxygen with CO2, starving fuel, or interrupting the chemical reaction with dry chemical powder).</p>

            <h3 id="sec7-2">2. The 5 Classes of Fire & Extinguisher Selection</h3>
            <div class="liability-grid">
                <div class="liability-card">
                    <h4>Class A: Ordinary Combustibles</h4>
                    <p><strong>Materials:</strong> Wood, paper, textiles, rubber, trash, standard plastics.</p>
                    <p><strong>Extinguishing Agent:</strong> Water (cooling effect) or Multi-Purpose ABC Dry Chemical.</p>
                </div>
                <div class="liability-card">
                    <h4>Class B: Flammable Liquids & Gases</h4>
                    <p><strong>Materials:</strong> Gasoline, motor oil, grease, petroleum, kerosene, solvents, paint.</p>
                    <p><strong>Extinguishing Agent:</strong> Carbon Dioxide (CO2), Foam, or Dry Chemical. <strong>NEVER USE WATER!</strong> Water causes boiling liquid expansion and explosive flare-ups.</p>
                </div>
                <div class="liability-card">
                    <h4>Class C: Energized Electrical Equipment</h4>
                    <p><strong>Materials:</strong> Server racks, electrical fuse boxes, transformers, circuit breakers, heavy motors.</p>
                    <p><strong>Extinguishing Agent:</strong> Non-conductive agents: CO2 or Clean Agent Halon substitutes. <strong>NEVER USE WATER!</strong> Water conducts high-voltage electricity directly into the guard's body, causing fatal electrocution.</p>
                </div>
                <div class="liability-card">
                    <h4>Class D: Combustible Metals</h4>
                    <p><strong>Materials:</strong> Magnesium, titanium, zirconium, sodium, potassium, lithium.</p>
                    <p><strong>Extinguishing Agent:</strong> Specialized Dry Powder agents (e.g., copper/sodium chloride powder). Ordinary extinguishers will explode violently on metal fires.</p>
                </div>
                <div class="liability-card">
                    <h4>Class K: Commercial Kitchen Media</h4>
                    <p><strong>Materials:</strong> Cooking oils, animal fats, vegetable shortenings in deep fryers.</p>
                    <p><strong>Extinguishing Agent:</strong> Wet Chemical agents (potassium acetate/carbonate) that create a thick soapy saponification blanket, smothering vapors.</p>
                </div>
            </div>

            <h3 id="sec7-3">3. Operating Technique: The P.A.S.S. Method</h3>
            <div class="media-container">
                <img src="assets/q_fire_pass.jpg" alt="P.A.S.S. Fire Extinguisher Training Demonstration" class="responsive-img">
            </div>
            <div class="pass-breakdown">
                <div class="pass-step">
                    <span class="letter">P</span>
                    <span class="action"><strong>PULL THE PIN:</strong> Pull the safety pin located in the extinguisher handle to break the plastic tamper seal and unlock the lever.</span>
                </div>
                <div class="pass-step">
                    <span class="letter">A</span>
                    <span class="action"><strong>AIM LOW AT THE BASE OF THE FIRE:</strong> Point the nozzle or horn directly at the base of the fire where the fuel is burning, NOT at the upper flames or smoke.</span>
                </div>
                <div class="pass-step">
                    <span class="letter">S</span>
                    <span class="action"><strong>SQUEEZE THE LEVER:</strong> Squeeze the operating handle slowly and steadily to release the pressurized extinguishing agent.</span>
                </div>
                <div class="pass-step">
                    <span class="letter">S</span>
                    <span class="action"><strong>SWEEP FROM SIDE TO SIDE:</strong> Sweep the nozzle across the width of the burning base until the fire is completely extinguished. Keep your eyes on the area for re-ignition.</span>
                </div>
            </div>

            <h3 id="sec7-4">4. Building Evacuation & Smoke Dynamics</h3>
            <ul>
                <li><strong>Thermal Door Testing:</strong> Always test closed doors and doorknobs with the <strong>BACK OF YOUR HAND</strong> before opening. The back of the hand is more heat-sensitive and prevents involuntary grasping of a blistering hot metal handle if heat is present. If warm or hot, DO NOT OPEN; seek an alternative escape route.</li>
                <li><strong>Smoke Layer Crawling:</strong> Smoke and toxic superheated gases rise. If trapped in smoke, <strong>crawl on hands and knees keeping your head 1 to 2 feet off the ground</strong> where the coolest, cleanest air pocket exists.</li>
                <li><strong>STAIRWAYS ONLY — NEVER ELEVATORS:</strong> Elevators must NEVER be used during a fire alarm. Elevator shafts act as vertical chimneys for smoke, and electrical power failure can trap occupants inside the burning floor zone.</li>
            </ul>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Electrical Server Room Fire",
            setup: "While conducting an evening patrol of a commercial data center in Chicago, you smell acrid burning plastic and observe dense smoke and open flames coming from an active, buzzing server rack circuit breaker cabinet.",
            question: "What is your correct immediate response?",
            options: [
                {
                    text: "Grab a pressurized water fire extinguisher from the hallway and spray it directly into the open circuit breaker.",
                    correct: false,
                    feedback: "INCORRECT. Water is an electrical conductor. Spraying water onto an energized Class C electrical breaker can cause immediate, fatal electrocution of the officer."
                },
                {
                    text: "Sound the fire alarm, ensure 911 is notified, obtain a Class C rated non-conductive extinguisher (CO2 or Clean Agent), stand 6 to 8 feet away, and execute the P.A.S.S. protocol aimed at the base of the cabinet while keeping an open exit at your back.",
                    correct: true,
                    feedback: "CORRECT! Class C fires involve energized electrical equipment and require non-conductive agents (CO2 or dry chemical). Using P.A.S.S. while keeping an unblocked escape path ensures safety."
                },
                {
                    text: "Take the passenger elevator down to the lobby to find the building superintendent.",
                    correct: false,
                    feedback: "INCORRECT. Elevators must NEVER be utilized during fire emergencies due to shaft smoke infiltration and power failure risks."
                }
            ],
            illustration: "assets/q_fire_pass.jpg"
        },
        checkOnLearning: [
            {
                id: "c7_1",
                question: "What does the letter 'A' stand for in the P.A.S.S. fire extinguisher operating method?",
                options: [
                    "Activate the nearest pull station",
                    "Aim low at the base of the fire",
                    "Alert all floor occupants immediately",
                    "Appraise the chemical fuel type"
                ],
                correctAnswer: "Aim low at the base of the fire",
                remediationTarget: "sec7-3",
                explanation: "In P.A.S.S., 'A' stands for 'Aim at the base of the fire.' Aiming at the upper flames will not extinguish the fuel source feeding the fire."
            },
            {
                id: "c7_2",
                question: "Why is water strictly prohibited for extinguishing a Class B (flammable liquid) or Class C (energized electrical) fire?",
                options: [
                    "Because water is too expensive to use on commercial fires.",
                    "Water causes explosive liquid splattering on Class B fires and conducts deadly electrical shock on Class C fires.",
                    "Water can only be deployed by licensed Chicago Fire Department firefighters.",
                    "Water freezes instantly upon contact with electrical breakers."
                ],
                correctAnswer: "Water causes explosive liquid splattering on Class B fires and conducts deadly electrical shock on Class C fires.",
                remediationTarget: "sec7-2",
                explanation: "Using water on grease/oil fires causes violent boiling liquid expansion, spreading fire across the room. Using water on energized electrical equipment conducts high voltage directly into the operator."
            },
            {
                id: "c7_3",
                question: "When escaping through a smoke-filled commercial corridor, what is the safest physical posture?",
                options: [
                    "Sprint upright with your shirt pulled over your mouth.",
                    "Crawl on hands and knees keeping your head 1 to 2 feet above the floor.",
                    "Lie completely flat on your stomach and drag your body.",
                    "Walk backward slowly while holding your breath."
                ],
                correctAnswer: "Crawl on hands and knees keeping your head 1 to 2 feet above the floor.",
                remediationTarget: "sec7-4",
                explanation: "Hot toxic gases and smoke rise to the ceiling. The cleanest, coolest breathable air layer is found 1 to 2 feet above the floor level."
            }
        ],
        takeaways: [
            "P.A.S.S. = Pull pin, Aim at base, Squeeze handle, Sweep side-to-side.",
            "NEVER use water on Class B (flammable liquid) or Class C (electrical) fires.",
            "Always test door hardware with the BACK OF YOUR HAND before opening.",
            "Crawl 1-2 feet above the floor under smoke; NEVER use elevators during a fire."
        ]
    },
    {
        id: 8,
        number: "Lesson 8",
        title: "Procedures of Report Writing",
        duration: "2 Hours",
        icon: "file-alt",
        summary: "The legal gravity of security documentation in Illinois courts, Daily Activity Reports vs Incident Reports, the Six Elements of Report Writing, and objective factual narratives.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Recognize how security reports serve as legal evidence in Illinois criminal prosecutions and civil trials.</li>
                    <li>Master the Six Elements of Report Writing (Who, What, When, Where, Why, How).</li>
                    <li>Differentiate objective factual statements from subjective opinions, assumptions, and bias.</li>
                    <li>Establish proper chain of custody for physical evidence documented on post.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-8">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">The Richard J. Daley Witness Stand and the 'Crazy Guy' Report</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 5 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(8)" id="btn-narration-audio-8" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>It was a humid morning in Courtroom 1402 of the Richard J. Daley Center in Cook County. Security Officer Marcus was sitting on the witness stand in his sharpest suit, right hand trembling slightly as a court reporter recorded every word.</p><p>Across from Marcus stood a seasoned personal injury trial attorney representing a plaintiff who had been ejected from a commercial shopping center six months earlier. The attorney held a single sheet of paper: Marcus's official incident report.</p><p>The attorney cleared his throat and read Marcus's exact words aloud to the jury: 'On above date and time, writer observed subject acting crazy and disrespectful in the food court. Subject had an aggressive attitude and looked like he was on drugs. Writer ordered subject to leave. Subject refused, so writer used reasonable and necessary force to physically eject the bum from the property.'</p><p>The attorney turned to Marcus with a cold smile: 'Officer Marcus, can you open the Illinois Compiled Statutes and show the jury the legal definition of 'acting crazy'?' Marcus swallowed hard: 'No, sir.' 'Can you tell the jury exactly what physical movements constituted an 'aggressive attitude'?' 'Well, he looked mad.' 'Did you administer a toxicology blood draw to determine he was 'on drugs'?' 'No.' 'Did you document the exact words he said?' 'No.' 'And yet, based on your subjective opinions, you placed your hands on my client and threw him onto a concrete sidewalk, breaking his clavicle?'</p><p>Marcus was shredded on cross-examination. His report was useless as legal evidence because it was filled with subjective opinions, emotional conclusions, and slurs instead of objective, verifiable facts. The case resulted in a substantial settlement against the security agency.</p><p>Now contrast that with the Gold Standard of Report Writing taught at Platforms Training Academy: The Six W's (Who, What, When, Where, Why, and How) and Objective Sensory Articulation. Marcus should have written: 'At 14:15 hours, writer observed subject (later identified as John Doe) standing at Food Court Table 4. Subject was shouting: 'I will smash these windows!' at food court staff. Writer observed subject slurring his speech, smelling strongly of an alcoholic beverage, and stumbling into chairs. At 14:17 hours, writer instructed subject to leave the property. Subject clenched both fists, stepped within two feet of writer, and raised his right fist to chest level. Writer took hold of subject's left forearm using an approved escort hold...' Facts protect you; opinions indict you.</p><p>Carry this mantra onto every post: Write every incident report as if you will be sitting on a witness stand two years from now reading it to twelve citizens who do not know you. If it isn't documented clearly and objectively in black and white, legally it never happened.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec8-1">1. The Legal Gravity of Security Reports</h3>
            <p>A security officer's written report is not merely internal company paperwork—it is an <strong>official legal document</strong> subject to subpoena in Illinois Circuit Courts, federal court depositions, and insurance liability reviews.</p>
            <div class="media-container">
                <img src="assets/q_report_writing.jpg" alt="Security Officer Drafting Incident Report" class="responsive-img">
            </div>
            <div class="callout warning">
                <strong>THE GOLDEN RULE OF DOCUMENTATION:</strong> "If it wasn't written down, it never happened." In litigation occurring two or three years after an event, an officer's written report will serve as their primary memory. If details, timestamps, or injuries are omitted, defense attorneys will argue they did not occur.
            </div>

            <h3 id="sec8-2">2. Types of Security Reports</h3>
            <ul>
                <li><strong>Daily Activity Report (DAR):</strong> A chronological log maintained throughout the shift recording guard changes, perimeter patrols, equipment inspections, visitor logs, and key checkouts.</li>
                <li><strong>Incident Report:</strong> A formal, specialized document completed immediately following any unusual event, crime, property damage, medical emergency, or physical altercation.</li>
                <li><strong>Supplemental Incident Report:</strong> Filed if new information, recovered property, or witness contacts are discovered after the initial report submission.</li>
            </ul>

            <h3 id="sec8-3">3. The Six Essential Elements of Report Writing</h3>
            <p>Every incident narrative must thoroughly answer the <strong>Six Fundamental Questions (The 5 W's and H)</strong>:</p>
            <div class="elements-grid">
                <div class="elem-card">
                    <h4>1. WHO?</h4>
                    <p>Identify all parties: Victims, suspects (detailed physical description), witnesses, responding Chicago Police officers (names, badge numbers, beat), paramedics, supervisors, and reporting officer.</p>
                </div>
                <div class="elem-card">
                    <h4>2. WHAT?</h4>
                    <p>What happened? Specific offense committed, property damaged/stolen (serial numbers, make/model), physical actions taken, statements made verbatim in quotes.</p>
                </div>
                <div class="elem-card">
                    <h4>3. WHEN?</h4>
                    <p>Exact timeline: Date, time incident occurred, time discovered, time security dispatched, time 911 called, police arrival time, and scene clearance time.</p>
                </div>
                <div class="elem-card">
                    <h4>4. WHERE?</h4>
                    <p>Exact location: Property address, floor, suite, room number, compass direction, lighting condition, camera coverage, weather conditions.</p>
                </div>
                <div class="elem-card">
                    <h4>5. WHY?</h4>
                    <p>Motives, precipitating disputes, verbal arguments leading to violence, suspect statements ("He owed me money"). Only include why if supported by facts or direct statements.</p>
                </div>
                <div class="elem-card">
                    <h4>6. HOW?</h4>
                    <p>How did the incident occur? Means of entry (e.g., crowbar pried north rear fire door), weapons used, sequence of physical struggle, and steps taken to secure the scene.</p>
                </div>
            </div>

            <h3 id="sec8-4">4. Objective vs. Subjective Writing</h3>
            <p>A professional report must be strictly <strong>OBJECTIVE (factual)</strong> rather than <strong>SUBJECTIVE (opinions, guesses, emotions)</strong>:</p>
            <ul>
                <li><em>Unprofessional / Subjective:</em> "The suspect was drunk, acting crazy, and looked like a criminal."</li>
                <li><em>Professional / Objective:</em> "The subject had bloodshot eyes, slurred speech, an odor of alcohol on his breath, and yelled profanities while stumbling."</li>
            </ul>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Writing the Burglary Incident Narrative",
            setup: "During your 3:00 AM patrol of a commercial office suite in Chicago, you find a tenant door forced open with pry marks on the lock latch, cabinets ransacked, and a broken window. Two laptops are missing from the front desk.",
            question: "How should you document this event in your formal Incident Report?",
            options: [
                {
                    text: "Write: 'I think kids from the neighborhood broke in around midnight and stole some junk because they are bad people.'",
                    correct: false,
                    feedback: "INCORRECT. This narrative contains subjective speculation, unverified timelines, and unprofessional emotional bias."
                },
                {
                    text: "Complete an Incident Report detailing: Date and exact discovery time (0300 hrs), location (Suite 400), physical evidence observed (pry marks on door latch, broken glass), missing items (two Dell Latitude laptops with serial numbers if known), notifications made (property manager, 911 dispatch, CPD Beat officer name and badge number), and attach scene photos.",
                    correct: true,
                    feedback: "CORRECT! This answers all six elements (Who, What, When, Where, Why, How) objectively and provides admissible evidence for law enforcement and insurance claims."
                },
                {
                    text: "Make a quick mental note and wait until your shift ends in two days to write a brief sentence on a scrap pad.",
                    correct: false,
                    feedback: "INCORRECT. Incident reports must be completed as soon as possible while details and timings are fresh."
                }
            ],
            illustration: "assets/q_report_writing.jpg"
        },
        checkOnLearning: [
            {
                id: "c8_1",
                question: "What are the Six Elements of Report Writing that must be answered in every complete incident report narrative?",
                options: [
                    "Name, Badge, City, State, License, Phone",
                    "Who, What, When, Where, Why, How",
                    "Arrest, Handcuffs, Force, Jail, Fine, Trial",
                    "Uniform, Equipment, Radio, Keys, Vehicle, Log"
                ],
                correctAnswer: "Who, What, When, Where, Why, How",
                remediationTarget: "sec8-3",
                explanation: "The Six Elements of Report Writing are WHO, WHAT, WHEN, WHERE, WHY, and HOW. A narrative answering these six questions contains all information required by investigators and courts."
            },
            {
                id: "c8_2",
                question: "Why should an incident report contain strictly OBJECTIVE statements rather than SUBJECTIVE statements?",
                options: [
                    "Because objective statements describe verifiable facts rather than personal assumptions, emotional bias, or unproven opinions that could be dismantled in court.",
                    "Because subjective statements are illegal under Chicago municipal building codes.",
                    "Because objective reports are required to be fewer than 20 words.",
                    "Subjective statements can only be written by licensed private investigators."
                ],
                correctAnswer: "Because objective statements describe verifiable facts rather than personal assumptions, emotional bias, or unproven opinions that could be dismantled in court.",
                remediationTarget: "sec8-4",
                explanation: "Objective writing reports demonstrable facts (what was seen, heard, and measured). Subjective writing includes personal opinions and guesses that destroy the report's credibility in legal proceedings."
            },
            {
                id: "c8_3",
                question: "When should an incident report be completed by an on-duty security officer?",
                options: [
                    "At the end of the calendar month during monthly billing.",
                    "As soon as possible following the event while facts, timestamps, and witness accounts are fresh.",
                    "Only if the property owner threatens to deduct wages.",
                    "Within 90 days of the incident."
                ],
                correctAnswer: "As soon as possible following the event while facts, timestamps, and witness accounts are fresh.",
                remediationTarget: "sec8-1",
                explanation: "Incident reports must be completed as soon as possible after an event while details, descriptions, timelines, and statements are fresh and accurate."
            }
        ],
        takeaways: [
            "A written report is a legal document subject to court scrutiny ('If it wasn't written down, it never happened').",
            "Always answer the Six Elements: WHO, WHAT, WHEN, WHERE, WHY, and HOW.",
            "Write in factual, objective, chronological language—avoid personal opinion.",
            "Complete reports as soon as possible after the event."
        ]
    },
    {
        id: 9,
        number: "Lesson 9",
        title: "Civil Rights, Ethics & Public Relations",
        duration: "2 Hours",
        icon: "users",
        summary: "Constitutional protections under the Bill of Rights (1st, 4th, 5th, 14th Amendments), handling First Amendment auditors, public vs. private property photography, and ethical unbiased security enforcement.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Understand the scope of constitutional protections (1st, 4th, 5th, 14th Amendments) in private security environments.</li>
                    <li>Handle "First Amendment Auditors" and public photography lawfully without escalating to unlawful force.</li>
                    <li>Maintain ethical standards, unbiased enforcement, and anti-discrimination compliance.</li>
                    <li>Utilize customer service and professional demeanor as a proactive crime deterrence tool.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-9">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">The Glass Doors on LaSalle Street and the Camera Lens</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 4 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(9)" id="btn-narration-audio-9" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>It was 12:30 PM on a bright Thursday afternoon outside a high-profile corporate financial institution on LaSalle Street in the heart of Chicago's Loop. Hundreds of professionals were walking past the polished granite plaza.</p><p>An unarmed security officer named Darius was stationed just inside the heavy glass revolving doors when two individuals arrived on the public sidewalk outside. They were carrying DSLR cameras on heavy stabilizing gimbals, external microphones, and wearing vests with press passes. They were First Amendment Auditors.</p><p>The auditors stood entirely on the public concrete sidewalk, approximately four feet from the building's glass facade. They pointed their cameras through the glass, zooming in on security workstations, keycard access readers, surveillance cameras, and Darius himself, narrating into their microphones: 'We are here documenting critical infrastructure in the Chicago Loop. Notice the armed and unarmed guards inside.'</p><p>The corporate building manager rushed down from the mezzanine, visibly panicked: 'Darius! Get out there and stop them! You cannot film this bank! Confiscate their cameras, make them delete that footage, and call the police right now!'</p><p>Darius walked out the front doors onto the sidewalk. He felt angry and exposed. He stepped right up to the lead cameraman, thrust his open hand directly in front of the camera lens, and yelled: 'Turn that camera off! You can't record here! Give me that phone or I'm taking you to jail!'</p><p>Within forty-eight hours, that video had 1.2 million views on YouTube under the title: 'UNEDUCATED SECURITY GUARD COMMITS BATTERY ON PUBLIC SIDEWALK.' The video clearly showed Darius initiating physical contact with the camera while standing on a public municipal sidewalk where the cameraman had an absolute constitutional right to be.</p><p>Let's review the law: Under the First Amendment to the United States Constitution and landmark federal case law, any citizen standing on a traditional public forum (such as a public sidewalk, park, or roadway) has a protected constitutional right to photograph and record anything in plain public view. Private property rules do NOT apply on public sidewalks. Furthermore, when Darius placed his hand on the camera and shoved it away, he committed Battery under 720 ILCS 5/12-3. Threatening to take the camera constituted attempted Robbery or Theft.</p><p>How should Darius have handled this? By understanding the boundary of the property line. As long as the auditor remains on the public sidewalk and is not physically blocking ingress or egress (which would be disorderly conduct or pedestrian obstruction), security officers should maintain a professional, calm demeanor. Step back inside the private threshold, inform building management of the legal reality, notify dispatch, and never provide a viral reaction.</p><p>Remember this principle on duty: A camera cannot break your bones, and YouTube auditors want nothing more than an emotional security guard who doesn't know the law. Your unshakeable professionalism and statutory knowledge is your greatest shield.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec9-1">1. The Bill of Rights & Private Security</h3>
            <p>While the US Constitution directly constrains government actions, security officers operate in public-facing commercial environments where constitutional principles define lawful interactions:</p>
            <ul>
                <li><strong>First Amendment (Speech, Assembly, Press, Photography):</strong> Individuals on public sidewalks, streets, and public traditional forums have the constitutionally protected right to film anything in plain view, including private buildings, gates, and security officers.</li>
                <li><strong>Fourth Amendment (Unreasonable Search & Seizure):</strong> Private citizens have a right to privacy. Security officers cannot randomly rummage through bags or pockets without consent, contractual agreement (e.g., ticketed concert entry condition), or lawful arrest under 725 ILCS 5/108-1.</li>
                <li><strong>Fifth Amendment (Self-Incrimination & Due Process):</strong> Private guards are not legally required to read Miranda warnings, but coerced confessions obtained through physical force or threats are inadmissible in Illinois criminal courts and create immense civil battery liability.</li>
                <li><strong>Fourteenth Amendment (Equal Protection):</strong> Every person is entitled to equal protection under the law. Enforcement must never be based upon race, religion, national origin, gender, or sexual orientation.</li>
            </ul>

            <h3 id="sec9-2">2. Managing "First Amendment Auditors" & Public Photography</h3>
            <div class="callout warning">
                <strong>TACTICAL PROTOCOL FOR PHOTOGRAPHERS / AUDITORS:</strong>
                <p>A common scenario in Chicago involves independent content creators ("First Amendment Auditors") standing on public sidewalks filming security facilities, access control gates, or lobbies hoping security officers overreact and violate their rights.</p>
                <ul>
                    <li><strong>Public Sidewalk = Protected:</strong> If the photographer is standing on a public sidewalk, public easement, or public roadway, <strong>THEY ARE COMMITTING NO CRIME</strong>. Taking pictures from a public space is fully legal.</li>
                    <li><strong>Do Not Touch or Interfere:</strong> NEVER attempt to grab their camera, block the lens with your hand, shine a flashlight into the lens, or threaten them with arrest. Doing so constitutes civil assault, battery, and disorderly conduct.</li>
                    <li><strong>Professional Response:</strong> Maintain calm officer presence, ask politely if they need assistance, notify your supervisor, and monitor. If they step onto private property where unauthorized entry is posted, politely inform them they are trespassing on private property and ask them to return to the public sidewalk.</li>
                </ul>
            </div>

            <h3 id="sec9-3">3. Ethics & Unbiased Security Enforcement</h3>
            <p>Private security personnel must conduct themselves with absolute ethical integrity:</p>
            <ul>
                <li><strong>Zero Tolerance for Racial Profiling:</strong> Decisions to stop, question, or monitor individuals must be based strictly on suspicious, observable <em>behavior</em> (e.g., peering into car windows, concealing merchandise, loitering at secure card readers), NEVER on race, age, dress style, or appearance.</li>
                <li><strong>Accepting Gratuities:</strong> Guards must never accept bribes, free merchandise, or unauthorized favors from tenants or vendors in exchange for overlooking security breaches.</li>
            </ul>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: First Amendment Auditor at Facility Gate",
            setup: "You are guarding the exterior entrance of a private corporate distribution facility in Chicago. A man stands on the public sidewalk just outside the property fence holding a video camera on a tripod, filming the guard shack and recording employee license plates. Several truck drivers ask you to 'smash his camera and kick him off the street.'",
            question: "What is your lawful, professional course of action?",
            options: [
                {
                    text: "Walk onto the public sidewalk, grab the tripod, smash the camera, and place the man under citizen's arrest for invasion of privacy.",
                    correct: false,
                    feedback: "INCORRECT. Filming from a public sidewalk is fully protected under the First Amendment. Smashing his camera or arresting him is criminal battery, criminal damage to property, and false arrest."
                },
                {
                    text: "Remain on your assigned private property, maintain professional composure, recognize that filming from a public sidewalk is constitutionally protected, do not touch the person or camera, notify your security supervisor, and monitor to ensure he does not trespass over the property line.",
                    correct: true,
                    feedback: "CORRECT! Professional guards understand the boundary between public and private space. The individual has the right to film from the public sidewalk. Remaining calm and disciplined avoids costly viral lawsuits."
                },
                {
                    text: "Shine a high-powered laser directly into the camera lens to damage the sensor.",
                    correct: false,
                    feedback: "INCORRECT. Shining lasers at individuals is dangerous, unlawful, and can cause permanent retinal eye injury, resulting in severe criminal battery charges."
                }
            ],
            illustration: "assets/q_arrest_patrol.jpg"
        },
        checkOnLearning: [
            {
                id: "c9_1",
                question: "Does an individual standing on a public sidewalk have the legal right to photograph or film a private commercial building and security guards in plain view?",
                options: [
                    "No, all photography of commercial buildings requires a written IDFPR permit.",
                    "Yes, photography from a public sidewalk of anything in plain view is protected under the First Amendment.",
                    "Only between 9:00 AM and 5:00 PM on weekdays.",
                    "No, security guards have the automatic right to seize any camera filming them."
                ],
                correctAnswer: "Yes, photography from a public sidewalk of anything in plain view is protected under the First Amendment.",
                remediationTarget: "sec9-2",
                explanation: "Under the First Amendment, individuals standing in public traditional forums (such as public sidewalks) have the right to film and photograph anything in plain sight."
            },
            {
                id: "c9_2",
                question: "Why is Public Relations considered a vital cornerstone of private security work?",
                options: [
                    "Because security guards are responsible for corporate public advertising.",
                    "Because professional demeanor, courteous customer service, and de-escalation resolve conflicts peacefully and reflect positively on the property.",
                    "Because it allows guards to issue municipal traffic citations.",
                    "Because public relations replaces the need for a PERC Card."
                ],
                correctAnswer: "Because professional demeanor, courteous customer service, and de-escalation resolve conflicts peacefully and reflect positively on the property.",
                remediationTarget: "sec9-3",
                explanation: "Public relations is an indispensable component of professional security service. Respectful communication prevents violence and builds community trust."
            },
            {
                id: "c9_3",
                question: "What constitutes unlawful 'racial profiling' in private security operations?",
                options: [
                    "Selecting individuals for investigation based on observable criminal behavior.",
                    "Stopping or monitoring individuals based upon their race, ethnicity, or background rather than specific, articulable suspicious behavior.",
                    "Requiring all employees to display their company ID badges upon building entry.",
                    "Logging the license plates of vehicles parked after business hours."
                ],
                correctAnswer: "Stopping or monitoring individuals based upon their race, ethnicity, or background rather than specific, articulable suspicious behavior.",
                remediationTarget: "sec9-3",
                explanation: "Racial profiling is the discriminatory practice of targeting individuals based on race or ethnicity. Security enforcement must always be based on observable, suspicious conduct."
            }
        ],
        takeaways: [
            "Photography from public sidewalks is protected by the First Amendment—never seize cameras.",
            "Enforce security rules based on observable behavior, NEVER racial or demographic profiling.",
            "Public relations and professional demeanor de-escalate over 90% of confrontations.",
            "Private security guards possess no sovereign immunity from civil rights tort lawsuits."
        ]
    },
    {
        id: 10,
        number: "Lesson 10",
        title: "Terrorism, Bomb Threats & Active Threat Response",
        duration: "1 Hour",
        icon: "shield-virus",
        summary: "The 8 signs of terrorism, Suspicious Activity Reporting (SAR), bomb threat protocols and the mandatory 300-foot radio silence rule, suspicious package identification, and the Run, Hide, Fight active shooter protocol.",
        content: `
            <div class="lesson-learning-objectives">
                <h4><i class="fas fa-bullseye"></i> Learning Objectives</h4>
                <ul>
                    <li>Identify the 8 pre-incident behavioral indicators (signs) of terrorism.</li>
                    <li>Execute proper bomb threat protocols and the mandatory 300-foot radio silence rule.</li>
                    <li>Identify suspicious packages and unverified parcel hazards.</li>
                    <li>Master the tactical priorities of the DHS "Run, Hide, Fight" active shooter protocol in commercial facilities.</li>
                </ul>
            </div>

                <!-- Field Instructor Narrative & Real-World Case Study -->
                <div class="instructor-field-narration" id="field-narration-les-10">
                    <div class="narration-header">
                        <div class="narrator-meta">
                            <span class="narrator-badge"><i class="fas fa-microphone-alt"></i> FIELD INSTRUCTOR NARRATION & CASE STUDY</span>
                            <h3 class="narration-title">The 95th Red Line Terminal and the 300-Foot Rule</h3>
                            <span class="narrator-byline"><i class="fas fa-user-shield"></i> Lead Instructor Charles Young &bull; Platforms Training Academy &bull; 5 Min Read / Audio</span>
                        </div>
                        <button class="narration-audio-play-btn" onclick="app.toggleFieldNarrationSpeech(10)" id="btn-narration-audio-10" title="Listen to Field Instructor Narration">
                            <i class="fas fa-headphones"></i> Listen to Narration
                        </button>
                    </div>
                    <div class="narration-body-text">
                        <p>It was 5:15 PM on a Friday evening during the height of rush hour at the 95th/Dan Ryan CTA Red Line Terminal. Thousands of South Side commuters were flowing down the concrete staircases, swiping transit cards, and packing onto the train platforms.</p><p>An unarmed transit security officer named Jordan was conducting a foot patrol scan of the mezzanine level near the north turnstiles. Sitting on a wooden bench tucked beneath an emergency exit stairwell, Jordan spotted an anomaly: a heavy black canvas gym bag. There were no passengers sitting near the bench, and the bag appeared swollen with dense contents.</p><p>Jordan approached cautiously. As he knelt three feet from the bag, he noticed two critical indicators: a thin spool of insulated red wire was protruding half an inch from the zippered pocket, and a dark oily stain was seeping through the bottom canvas, giving off a faint chemical odor resembling fertilizer and diesel.</p><p>Jordan felt a wave of cold panic. His immediate reflex was to reach out with his hand, unzip the bag to 'see what's inside', and key his 5-watt high-frequency Motorola two-way radio right above the zipper: 'Dispatch, I've got a bomb bag on the bench!'</p><p>If Jordan had keyed that radio, he and fifty commuters could have been obliterated instantly. Why? Because Radio Frequency (RF) transmissions from standard 5-watt handheld radios and cellular phones emit electromagnetic energy capable of inducing electrical currents in the blasting caps or electronic detonators of an Improvised Explosive Device (IED)!</p><p>In commercial security and anti-terrorism training, the **300-Foot Radio Silence Rule** is non-negotiable. When an explosive device or suspicious package is identified, security officers must NEVER use radios or cell phones within a 300-foot radius. Transmissions must be made via hardwired landline phones or after physically retreating beyond the 300-foot perimeter.</p><p>Jordan remembered the Eight Signs of Terrorism and Bomb Incident Protocols taught at Platforms Training Academy. He did NOT touch the bag. He did NOT key his radio. He calmly stood up, backed away slowly, and walked briskly 300 feet away to the station master's landline phone. He dialed 911: 'This is Security Officer Jordan at the 95th Red Line. We have an unconfirmed suspicious package matching explosive indicators on the north mezzanine bench. I am requesting CPD, CFD, and Bomb & Arson. Beginning silent evacuation now.'</p><p>Jordan and his team established a 300-foot inner perimeter, directed the surge of commuters away from the north stairwells toward the south bus bridges, and kept the blast zone clear. CPD Bomb & Arson arrived with containment vessels and confirmed a volatile chemical device that was rendered safe by the bomb squad without a single injury.</p><p>Burn this memory into your tactical consciousness: In an explosive emergency, curiosity kills and distance saves lives. Keep your hands off suspicious packages, observe the 300-foot radio silence rule, and execute an orderly evacuation. You are the barrier between public panic and public safety.</p>
                    </div>
                    <div class="narration-footer-takeaway">
                        <strong><i class="fas fa-lightbulb" style="color:var(--brand-green);"></i> CRITICAL ON-THE-JOB MEMORY ANCHOR:</strong> 
                        Keep this scenario in your mental tactical toolbox. Review the detailed statutory analysis below to understand exactly how Illinois law governs your actions in this situation.
                    </div>
                </div>
    


            <h3 id="sec10-1">1. The 8 Signs of Terrorism</h3>
            <p>Security officers represent the primary frontline defense for commercial high-rises, transit hubs, and infrastructure. Terrorist plots follow recognizable operational phases:</p>
            <ol>
                <li><strong>Surveillance:</strong> Individuals recording floor plans, taking prolonged photos of guard posts, CCTV camera blind spots, or perimeter fence gates.</li>
                <li><strong>Elicitation:</strong> Attempting to question security guards or cleaning staff about shifts, alarm response times, or executive schedules.</li>
                <li><strong>Tests of Security:</strong> Deliberately setting off exterior perimeter sensors or abandoning bags to gauge how quickly security responds.</li>
                <li><strong>Acquiring Supplies:</strong> Purchasing bulk ammonium nitrate fertilizer, commercial detonators, police uniforms, or fraudulent access badges.</li>
                <li><strong>Suspicious Persons Out of Place:</strong> Individuals loitering in restricted utility tunnels, HVAC mechanical rooms, or loading dock corridors without work orders.</li>
                <li><strong>Dry Runs / Rehearsals:</strong> Practicing evacuation timing, pacing routes, and rehearsing tactical approach routes.</li>
                <li><strong>Deploying Assets:</strong> Staging vehicles, positioning equipment, or taking final operational stances before an assault.</li>
            </ol>

            <h3 id="sec10-2">2. Bomb Threats & Suspicious Package Protocols</h3>
            <div class="callout warning">
                <strong>THE MANDATORY 300-FOOT RADIO SILENCE RULE:</strong>
                <p>When a suspicious package, unattended device, or bomb threat is discovered, <strong>DO NOT TRANSMIT ON TWO-WAY HANDHELD RADIOS OR CELLULAR PHONES WITHIN 300 FEET OF THE SUSPECT DEVICE!</strong> Radio and cellular transmissions emit electromagnetic radiofrequency (RF) energy that can induce an electrical current in electronic blasting caps, triggering premature detonation.</p>
            </div>
            <ul>
                <li><strong>Suspicious Package Indicators:</strong> Excessive postage, unverified return address, oily grease stains on packaging, protruding wires or foil, strange odors (marzipan, almonds, sulfur), ticking or vibrating sounds, lopsided weight.</li>
                <li><strong>Immediate Actions:</strong>
                    <ol>
                        <li>DO NOT touch, move, open, or shake the item;</li>
                        <li>Establish an immediate cordon/perimeter (minimum 300-foot evacuation radius);</li>
                        <li>Notify 911 dispatch using a <strong>hardwired landline telephone</strong> from a safe remote location;</li>
                        <li>Open windows and doors in the area if possible without approaching the device (allows blast overpressure to dissipate).</li>
                    </ol>
                </li>
            </ul>

            <h3 id="sec10-3">3. Active Threat & Active Shooter Response (Run, Hide, Fight)</h3>
            <p>In an active shooter incident in an Illinois commercial or educational facility, security officers must guide occupants under the Department of Homeland Security <strong>Run, Hide, Fight</strong> framework:</p>
            <ul>
                <li><strong>1. RUN (Primary Priority):</strong>
                    <ul>
                        <li>If a safe, accessible evacuation path exists, evacuate the building immediately.</li>
                        <li>Leave personal belongings behind; encourage others to follow, but do not let them slow your escape.</li>
                        <li>Keep hands visible with fingers spread when encountering responding police officers.</li>
                    </ul>
                </li>
                <li><strong>2. HIDE (Secondary Option):</strong>
                    <ul>
                        <li>If evacuation is impossible, find a secure room outside the shooter's view.</li>
                        <li>Lock the door, barricade with heavy furniture (desks, filing cabinets), turn off lights, close window blinds.</li>
                        <li>Silence cell phones (turn off vibrate mode), remain quiet, and stay low behind ballistic cover (concrete pillars).</li>
                    </ul>
                </li>
                <li><strong>3. FIGHT (Last Resort When Life is in Imminent Danger):</strong>
                    <ul>
                        <li>Commit 100% to aggressive physical action to incapacitate the shooter.</li>
                        <li>Act as a team if others are present; throw heavy objects (fire extinguishers, chairs), create sensory disruption.</li>
                    </ul>
                </li>
            </ul>
        `,
        scenarioSimulation: {
            title: "Tactical Scenario: Unattended Package at Loading Dock",
            setup: "During your morning loading dock inspection, you discover an unattended cardboard box tucked behind a dumpster. Protruding from the seam are two copper wires connected to a digital timer showing a countdown, and a strong chemical odor emanates from the parcel.",
            question: "What is your immediate tactical action?",
            options: [
                {
                    text: "Pick up the box and carry it out to the street dumpster so it does not harm the building.",
                    correct: false,
                    feedback: "INCORRECT. NEVER touch, tilt, or move a suspected explosive device. Movement can trigger tilt switches or anti-tamper mechanisms."
                },
                {
                    text: "Key your shoulder radio microphone right next to the box and call your supervisor to come inspect it.",
                    correct: false,
                    feedback: "INCORRECT. Transmitting on a radio next to a bomb can detonate electronic blasting caps via radio frequency induction."
                },
                {
                    text: "Do not touch the box. Maintain strict radio silence. Evacuate all personnel from the loading dock past a 300-foot safety perimeter, and call 911 from a hardwired landline telephone in a safe remote office.",
                    correct: true,
                    feedback: "CORRECT! This adheres strictly to bomb safety protocols: No touching, 300-foot perimeter evacuation, strict radio silence, and using a landline to summon police bomb squad units."
                }
            ],
            illustration: "assets/q_arrest_patrol.jpg"
        },
        checkOnLearning: [
            {
                id: "c10_1",
                question: "Why are security officers strictly forbidden from using two-way radios or cell phones within 300 feet of a suspected bomb or explosive package?",
                options: [
                    "Because radio static can confuse building fire alarm systems.",
                    "Radiofrequency (RF) transmissions can induce electrical currents in electronic blasting caps, triggering accidental detonation.",
                    "Because cell phone towers charge emergency surcharge fees during bomb calls.",
                    "Radio silence is only required if the device is smaller than a shoebox."
                ],
                correctAnswer: "Radiofrequency (RF) transmissions can induce electrical currents in electronic blasting caps, triggering accidental detonation.",
                remediationTarget: "sec10-2",
                explanation: "Electromagnetic energy from two-way radios and cellular phones can induce an electrical current in electronic detonators or blasting caps, causing premature detonation."
            },
            {
                id: "c10_2",
                question: "In the 'Run, Hide, Fight' active threat protocol, what is the absolute FIRST priority if a safe escape path exists?",
                options: [
                    "Hide under an office desk and wait for building maintenance.",
                    "Run (Evacuate immediately leaving belongings behind).",
                    "Fight the shooter bare-handed in the hallway.",
                    "Pull the building fire alarm."
                ],
                correctAnswer: "Run (Evacuate immediately leaving belongings behind).",
                remediationTarget: "sec10-3",
                explanation: "The primary and most effective life-saving priority during an active shooter event is to RUN (evacuate) if a safe path is accessible."
            },
            {
                id: "c10_3",
                question: "Which of the following is recognized as one of the 8 Pre-Incident Behavioral Signs of Terrorism?",
                options: [
                    "A customer asking for directions to the lobby restroom.",
                    "Individuals photographing CCTV camera blind spots, security access points, and taking notes on guard shift changes (Surveillance / Elicitation).",
                    "An employee wearing a high-visibility safety vest on a construction dock.",
                    "A visitor paying for parking with cash."
                ],
                correctAnswer: "Individuals photographing CCTV camera blind spots, security access points, and taking notes on guard shift changes (Surveillance / Elicitation).",
                remediationTarget: "sec10-1",
                explanation: "Surveillance and elicitation—recording security posts, blind spots, response times, or probing guards for operational details—are primary indicators of pre-operational terrorist planning."
            }
        ],
        takeaways: [
            "Observe and report the 8 Signs of Terrorism (Surveillance, Elicitation, Security Tests, etc.).",
            "Maintain strict 300-FOOT RADIO SILENCE near suspected explosive packages; use landlines.",
            "Active Shooter Priority: RUN (evacuate), HIDE (barricade/silence), FIGHT (last resort).",
            "Keep hands visible and empty when responding police arrive on an active threat scene."
        ]
    }
];

const EXAM_QUESTIONS = [
    // --- FOUNDATIONAL 26 CURRICULUM QUESTIONS ---
    {
        id: 1,
        part: "Part 1: True or False",
        type: "tf",
        question: "A security officer can affect an arrest for an ordinance violation in the State of Illinois.",
        options: [
            "True - Security officers can arrest for any local city ordinance or code infraction.",
            "False - Under 725 ILCS 5/107-3, private citizen arrests are strictly limited to offenses other than ordinance violations."
        ],
        correctAnswer: "False - Under 725 ILCS 5/107-3, private citizen arrests are strictly limited to offenses other than ordinance violations.",
        illustration: {
            type: "image",
            src: "assets/q_arrest_patrol.jpg",
            caption: "Tactical Scenario: Officer conducting private property patrol and assessing detention authority."
        },
        explanation: "FALSE. Under 725 ILCS 5/107-3 (Arrest by Private Person), a person may arrest another only when they have reasonable grounds to believe an offense OTHER THAN an ordinance violation is being committed. Detaining someone for a city ordinance (e.g., loitering, open container) exposes the officer to false arrest liability."
    },
    {
        id: 2,
        part: "Part 1: True or False",
        type: "tf",
        question: "Under Illinois law, security may not search an individual that has been lawfully arrested.",
        options: [
            "True - Security officers are never legally permitted to search an arrested person.",
            "False - Under 725 ILCS 5/108-1, a person making a lawful arrest may reasonably search the arrestee for weapons and instruments of the crime."
        ],
        correctAnswer: "False - Under 725 ILCS 5/108-1, a person making a lawful arrest may reasonably search the arrestee for weapons and instruments of the crime.",
        illustration: {
            type: "image",
            src: "assets/q_arrest_patrol.jpg",
            caption: "Search Protocol: 725 ILCS 5/108-1 permits a reasonable search upon lawful arrest for weapons and evidence."
        },
        explanation: "FALSE. Under 725 ILCS 5/108-1 (Search Without Warrant), when a lawful arrest is made, the arresting person may reasonably search the arrestee and the immediate area to protect against attack, prevent escape, or discover weapons."
    },
    {
        id: 3,
        part: "Part 1: True or False",
        type: "tf",
        question: "Under 720 ILCS 5/7-1, a person may use deadly force if they reasonably believe that their life is in danger.",
        options: [
            "True - Deadly force is legally justified when a person reasonably believes such force is necessary to prevent imminent death or great bodily harm.",
            "False - Unarmed security guards are never permitted to use deadly force under any circumstances."
        ],
        correctAnswer: "True - Deadly force is legally justified when a person reasonably believes such force is necessary to prevent imminent death or great bodily harm.",
        illustration: {
            type: "video",
            src: "assets/level_clip.mp4",
            caption: "Tactical Clip: Threat assessment and justifiable self-defense response under 720 ILCS 5/7-1."
        },
        explanation: "TRUE. Under 720 ILCS 5/7-1 (Use of Force in Defense of Person), deadly force is legally justified if the person reasonably believes that such force is necessary to prevent imminent death or great bodily harm to themselves or another, or to prevent a forcible felony."
    },
    {
        id: 4,
        part: "Part 1: True or False",
        type: "tf",
        question: "When applying restraints, arrestees should be handcuffed with their hands in front.",
        options: [
            "True - Handcuffing in front is standard and comfortable for the arrestee.",
            "False - Arrestees must always be handcuffed with hands behind the back, palms facing outward, and double-locked."
        ],
        correctAnswer: "False - Arrestees must always be handcuffed with hands behind the back, palms facing outward, and double-locked.",
        illustration: {
            type: "image",
            src: "assets/q_handcuffing.jpg",
            caption: "Proper Restraint Technique: Hands secured behind the back, palms facing outward, double locked."
        },
        explanation: "FALSE. Handcuffing in front allows the arrestee full mobility to use their hands as a weapon, strike the guard, manipulate locks, or operate vehicle controls. Arrestees must always be handcuffed behind the back with palms out and double-locked."
    },
    {
        id: 5,
        part: "Part 1: True or False",
        type: "tf",
        question: "It is legally permissible to strike an attacker on the head with an expandable baton if deadly force is justified.",
        options: [
            "True - Striking the head is deadly force and is legally justified if lethal force is authorized to prevent imminent death or great bodily harm.",
            "False - Baton strikes to the head are classified as non-lethal compliance strikes."
        ],
        correctAnswer: "True - Striking the head is deadly force and is legally justified if lethal force is authorized to prevent imminent death or great bodily harm.",
        illustration: {
            type: "image",
            src: "assets/q_baton_tactics.jpg",
            caption: "Defensive Tactics: Head, neck, and spine strikes constitute lethal impact force (Red Zone)."
        },
        explanation: "TRUE. An impact strike to the head, neck, spine, sternum, or groin constitutes deadly force. It is strictly prohibited during routine non-lethal defense, but is legally permissible if deadly force is justified."
    },
    {
        id: 6,
        part: "Part 1: True or False",
        type: "tf",
        question: "Any portable fire extinguisher is suitable for use on any type of commercial fire.",
        options: [
            "True - All fire extinguishers contain multi-purpose chemicals suitable for all hazards.",
            "False - Fire extinguishers are classified for specific fire types (A, B, C, D, K); using the wrong agent can cause explosions or electrocution."
        ],
        correctAnswer: "False - Fire extinguishers are classified for specific fire types (A, B, C, D, K); using the wrong agent can cause explosions or electrocution.",
        illustration: {
            type: "image",
            src: "assets/q_fire_pass.jpg",
            caption: "Fire Safety Equipment: Extinguishers are rated for specific fire classes (A, B, C, D, K)."
        },
        explanation: "FALSE. Fire extinguishers are classified specifically for classes A, B, C, D, and K. Using water on a Class B (flammable liquid) or Class C (energized electrical) fire causes explosive splattering or fatal electrocution."
    },
    {
        id: 7,
        part: "Part 1: True or False",
        type: "tf",
        question: "Security incident reports should be completed as soon as possible following an event.",
        options: [
            "True - Reports must be written promptly while memories, timestamps, witness statements, and physical details are fresh and accurate.",
            "False - Incident reports should only be completed after a minimum of 30 days have elapsed."
        ],
        correctAnswer: "True - Reports must be written promptly while memories, timestamps, witness statements, and physical details are fresh and accurate.",
        illustration: {
            type: "image",
            src: "assets/q_report_writing.jpg",
            caption: "Documentation: Timely completion preserves accurate memory, timestamps, and witness accounts."
        },
        explanation: "TRUE. Incident reports must be completed as soon as possible while details, descriptions, timelines, and statements are fresh and accurate."
    },
    {
        id: 8,
        part: "Part 1: True or False",
        type: "tf",
        question: "Public relations and courteous communication represent an important aspect of private security.",
        options: [
            "True - Professional demeanor and effective communication de-escalate volatile situations and build public cooperation.",
            "False - Security guards should only communicate using physical commands."
        ],
        correctAnswer: "True - Professional demeanor and effective communication de-escalate volatile situations and build public cooperation.",
        explanation: "TRUE. Over 90% of security encounters are resolved through communication and presence. Courteous, professional public relations de-escalates conflict before force becomes necessary."
    },
    {
        id: 9,
        part: "Part 2: Forms of Liability Matching",
        type: "matching_liability",
        question: "Which definition correctly describes an 'Intentional Tort' in civil law?",
        options: [
            "A- Liability placed upon employers or entities for the conduct of their employees based on supervisory authority.",
            "B- Failing to exercise due care when obligated to do so, resulting in injury, loss, or property damage.",
            "C- Being held legally liable when engaged in inherently dangerous acts regardless of fault or negligence.",
            "D- Intentionally committing acts that cause injury, loss, or property damage (such as battery or false imprisonment)."
        ],
        correctAnswer: "D- Intentionally committing acts that cause injury, loss, or property damage (such as battery or false imprisonment).",
        explanation: "An Intentional Tort occurs when a person intentionally commits a civil wrong (such as assault, battery, false imprisonment, or trespass) resulting in harm or damage."
    },
    {
        id: 10,
        part: "Part 2: Forms of Liability Matching",
        type: "matching_liability",
        question: "Which definition correctly describes 'Vicarious Liability' (Respondeat Superior)?",
        options: [
            "A- Liability placed upon people or entities other than those actually engaged in the conduct that led to injury, loss, or property damage, based on a theory that certain parties have an authority over and a duty to control the acting parties.",
            "B- Failing to exercise due care when obligated to do so, resulting in injury, loss, or property damage.",
            "C- Being held legally liable when engaged in inherently dangerous acts regardless of fault or negligence.",
            "D- Intentionally committing acts that cause injury, loss, or property damage."
        ],
        correctAnswer: "A- Liability placed upon people or entities other than those actually engaged in the conduct that led to injury, loss, or property damage, based on a theory that certain parties have an authority over and a duty to control the acting parties.",
        explanation: "Vicarious Liability (Respondeat Superior) holds an employer, security agency, or property manager legally liable for the tortious acts of employees acting within the scope of their employment."
    },
    {
        id: 11,
        part: "Part 2: Forms of Liability Matching",
        type: "matching_liability",
        question: "Which definition correctly describes 'Strict Liability'?",
        options: [
            "A- Liability placed upon employers for employee misconduct.",
            "B- Failing to exercise due care when obligated to do so, resulting in injury, loss, or property damage.",
            "C- Being held legally liable when engaged in inherently dangerous acts (e.g., explosives, guard animals) regardless of fault or negligence.",
            "D- Intentionally committing acts that cause injury, loss, or property damage."
        ],
        correctAnswer: "C- Being held legally liable when engaged in inherently dangerous acts (e.g., explosives, guard animals) regardless of fault or negligence.",
        explanation: "Strict Liability imposes legal responsibility on individuals or companies engaged in inherently dangerous or ultrahazardous activities, regardless of whether they exercised reasonable care."
    },
    {
        id: 12,
        part: "Part 2: Forms of Liability Matching",
        type: "matching_liability",
        question: "Which definition correctly describes 'Negligent Liability'?",
        options: [
            "A- Liability placed upon employers based on supervisory authority.",
            "B- Failing to exercise due care when obligated to do so, resulting in injury, loss, or property damage.",
            "C- Being held legally liable when engaged in inherently dangerous acts regardless of fault.",
            "D- Intentionally committing acts that cause injury, loss, or property damage."
        ],
        correctAnswer: "B- Failing to exercise due care when obligated to do so, resulting in injury, loss, or property damage.",
        explanation: "Negligent Liability arises when an individual owes a legal duty of care, breaches that duty by failing to act as a prudent person would, directly causing injury or loss."
    },
    {
        id: 13,
        part: "Part 3: Illinois Criminal Code Offenses",
        type: "matching_offense",
        question: "Under 720 ILCS 5/9-1, what is the statutory definition of Murder?",
        options: [
            "A- Taking property from a person by way of force or threat of force.",
            "B- Doing any act in an unreasonable manner to alarm or disturb another and provoke a breach of peace.",
            "C- Entering a building without authority with intent to commit a felony or theft.",
            "D- Killing a person without legal justification."
        ],
        correctAnswer: "D- Killing a person without legal justification.",
        explanation: "Under 720 ILCS 5/9-1, Murder is the killing of an individual without legal justification."
    },
    {
        id: 14,
        part: "Part 3: Illinois Criminal Code Offenses",
        type: "matching_offense",
        question: "Under 720 ILCS 5/12-1, what constitutes the crime of Assault?",
        options: [
            "A- Conduct which places another in reasonable apprehension of receiving a battery.",
            "B- Knowingly damaging the property of another without consent.",
            "C- Making physical contact of an insulting or provoking nature.",
            "D- Entering a building without authority."
        ],
        correctAnswer: "A- Conduct which places another in reasonable apprehension of receiving a battery.",
        explanation: "Under 720 ILCS 5/12-1, Assault is conduct that places another in reasonable apprehension of receiving a battery. No physical contact is required."
    },
    {
        id: 15,
        part: "Part 3: Illinois Criminal Code Offenses",
        type: "matching_offense",
        question: "Under 720 ILCS 5/12-3, what constitutes the crime of Battery?",
        options: [
            "A- Placing another in reasonable fear of an injury without physical contact.",
            "B- Intentionally causing bodily harm or making physical contact of an insulting or provoking manner.",
            "C- Taking property from the person of another by force.",
            "D- Remaining on commercial property after hours."
        ],
        correctAnswer: "B- Intentionally causing bodily harm or making physical contact of an insulting or provoking manner.",
        explanation: "Under 720 ILCS 5/12-3, Battery occurs when a person intentionally or knowingly causes bodily harm or makes physical contact of an insulting or provoking nature."
    },
    {
        id: 16,
        part: "Part 3: Illinois Criminal Code Offenses",
        type: "matching_offense",
        question: "Under 720 ILCS 5/16-1, what is the statutory definition of Theft?",
        options: [
            "A- Taking property from a person by way of physical force or threat of force.",
            "B- Knowingly obtaining or exerting unauthorized control over property of the owner by deception or threat with intent to permanently deprive.",
            "C- Entering a building without authority with intent to commit a theft.",
            "D- Damaging property having a value of $150 or more by fire."
        ],
        correctAnswer: "B- Knowingly obtaining or exerting unauthorized control over property of the owner by deception or threat with intent to permanently deprive.",
        explanation: "Under 720 ILCS 5/16-1, Theft is knowingly obtaining or exerting unauthorized control over property of the owner with intent to permanently deprive."
    },
    {
        id: 17,
        part: "Part 3: Illinois Criminal Code Offenses",
        type: "matching_offense",
        question: "Under 720 ILCS 5/18-1, what is the statutory definition of Robbery?",
        options: [
            "A- Taking property from a person or presence of another by the USE OF FORCE or THREAT OF IMMINENT FORCE.",
            "B- Entering a building without authority with intent to commit a felony or theft.",
            "C- Obtaining control over property by deception without physical contact.",
            "D- Secretly confining a person against their will."
        ],
        correctAnswer: "A- Taking property from a person or presence of another by the USE OF FORCE or THREAT OF IMMINENT FORCE.",
        explanation: "Under 720 ILCS 5/18-1, Robbery is knowingly taking property from the person or presence of another by the use of force or threat of force."
    },
    {
        id: 18,
        part: "Part 3: Illinois Criminal Code Offenses",
        type: "matching_offense",
        question: "Under 720 ILCS 5/19-1, what is the statutory definition of Burglary?",
        options: [
            "A- Entering or remaining in a building or location without authority and with intent to commit a felony or theft therein.",
            "B- Taking property from the person of another by force.",
            "C- Secretly confining an individual against their will.",
            "D- Damaging property having a value of $150 or more by explosives."
        ],
        correctAnswer: "A- Entering or remaining in a building or location without authority and with intent to commit a felony or theft therein.",
        explanation: "Under 720 ILCS 5/19-1, Burglary is knowingly entering or remaining in a building without authority with the intent to commit a felony or theft therein."
    },
    {
        id: 19,
        part: "Part 3: Illinois Criminal Code Offenses",
        type: "matching_offense",
        question: "Under 720 ILCS 5/20-1, what constitutes the crime of Arson?",
        options: [
            "A- Knowingly damaging any personal property valued under $50 by paint.",
            "B- Damaging real or personal property having a value of $150 or more by means of fire or explosives without consent.",
            "C- Leaving an open flame unattended in a designated smoking area.",
            "D- Entering an abandoned building with matches."
        ],
        correctAnswer: "B- Damaging real or personal property having a value of $150 or more by means of fire or explosives without consent.",
        explanation: "Under 720 ILCS 5/20-1, Arson is knowingly damaging real or personal property having a value of $150 or more by means of fire or explosives without consent."
    },
    {
        id: 20,
        part: "Part 3: Illinois Criminal Code Offenses",
        type: "matching_offense",
        question: "Under 720 ILCS 5/21-1, what constitutes Criminal Damage to Property?",
        options: [
            "A- Knowingly entering a building after business hours.",
            "B- Knowingly damaging any property of another without their consent.",
            "C- Accidentally dropping a tool during routine work duties.",
            "D- Discarding trash in an approved exterior dumpster."
        ],
        correctAnswer: "B- Knowingly damaging any property of another without their consent.",
        explanation: "Under 720 ILCS 5/21-1, Criminal Damage to Property is knowingly damaging any property of another without lawful consent."
    },
    {
        id: 21,
        part: "Part 3: Illinois Criminal Code Offenses",
        type: "matching_offense",
        question: "Under 720 ILCS 5/26-1, what constitutes Disorderly Conduct?",
        options: [
            "A- Doing any act in such an unreasonable manner as to alarm or disturb another and to provoke a breach of the peace.",
            "B- Taking property from an unoccupied vehicle.",
            "C- Failing to display an employee parking placard.",
            "D- Refusing to answer non-criminal questions from a security guard."
        ],
        correctAnswer: "A- Doing any act in such an unreasonable manner as to alarm or disturb another and to provoke a breach of the peace.",
        explanation: "Under 720 ILCS 5/26-1, Disorderly Conduct occurs when a person knowingly does any act in such an unreasonable manner as to alarm or disturb another and provoke a breach of peace."
    },
    {
        id: 22,
        part: "Part 4: Fire Safety P.A.S.S. Acronym",
        type: "pass_letter",
        question: "In the P.A.S.S. fire extinguisher operating method, what does the letter 'P' stand for?",
        options: [
            "Press the discharge trigger",
            "Pull the safety pin to unlock the lever and break the tamper seal",
            "Point the nozzle at the highest flame",
            "Push the handle into the wall bracket"
        ],
        correctAnswer: "Pull the safety pin to unlock the lever and break the tamper seal",
        illustration: {
            type: "image",
            src: "assets/q_fire_pass.jpg",
            caption: "P.A.S.S. Step 1: Pull the pin from the extinguisher handle to break the tamper seal."
        },
        explanation: "P stands for 'Pull the pin.' This unlocks the operating lever so the extinguishing agent can be discharged."
    },
    {
        id: 23,
        part: "Part 4: Fire Safety P.A.S.S. Acronym",
        type: "pass_letter",
        question: "In the P.A.S.S. fire extinguisher operating method, what does the letter 'A' stand for?",
        options: [
            "Aim low at the base of the fire where the fuel is burning",
            "Aim at the top of the smoke cloud",
            "Activate the building sprinkler system",
            "Alert all floor occupants by shouting"
        ],
        correctAnswer: "Aim low at the base of the fire where the fuel is burning",
        illustration: {
            type: "image",
            src: "assets/q_fire_pass.jpg",
            caption: "P.A.S.S. Step 2: Aim low at the base of the fire where the fuel source is located."
        },
        explanation: "A stands for 'Aim at the base of the fire.' Aiming at the upper flames will not extinguish the fuel feeding the fire; you must hit the burning base."
    },
    {
        id: 24,
        part: "Part 4: Fire Safety P.A.S.S. Acronym",
        type: "pass_letter",
        question: "In the P.A.S.S. fire extinguisher operating method, what does the first 'S' stand for?",
        options: [
            "Squeeze the operating lever or handle slowly and evenly",
            "Stand at least 50 feet away",
            "Smother the fire with cardboard",
            "Sound the evacuation bell"
        ],
        correctAnswer: "Squeeze the operating lever or handle slowly and evenly",
        illustration: {
            type: "image",
            src: "assets/q_fire_pass.jpg",
            caption: "P.A.S.S. Step 3: Squeeze the lever evenly to discharge the fire extinguishing agent."
        },
        explanation: "The first S stands for 'Squeeze the lever or handle.' This releases the pressurized extinguishing agent."
    },
    {
        id: 25,
        part: "Part 4: Fire Safety P.A.S.S. Acronym",
        type: "pass_letter",
        question: "In the P.A.S.S. fire extinguisher operating method, what does the second 'S' stand for?",
        options: [
            "Sweep from side to side across the base of the fire",
            "Stop discharging after 2 seconds",
            "Sprint toward the nearest exit",
            "Step backward quickly"
        ],
        correctAnswer: "Sweep from side to side across the base of the fire",
        illustration: {
            type: "image",
            src: "assets/q_fire_pass.jpg",
            caption: "P.A.S.S. Step 4: Sweep the nozzle from side to side across the base of the fire."
        },
        explanation: "The second S stands for 'Sweep from side to side.' Moving the nozzle side-to-side coats the fuel source until the fire is completely extinguished."
    },
    {
        id: 26,
        part: "Part 5: Report Writing Core Elements",
        type: "report_elements",
        question: "What are the Six Elements of Report Writing that must be answered in every complete incident report narrative?",
        options: [
            "Who, What, When, Where, Why, How",
            "Name, Badge Number, Time, Date, Signature, Supervisor",
            "Arrest, Search, Seizure, Liability, Force, Court",
            "Victim, Witness, Suspect, Weapon, Police, Judge"
        ],
        correctAnswer: "Who, What, When, Where, Why, How",
        illustration: {
            type: "image",
            src: "assets/q_report_writing.jpg",
            caption: "Report Writing Narrative: The 6 essential questions every complete narrative must answer."
        },
        explanation: "The Six Elements of Report Writing are WHO, WHAT, WHEN, WHERE, WHY, and HOW. A comprehensive narrative answering these six questions contains all information required by law enforcement, courts, and insurance investigators."
    },

    // --- EXPANDED HIGH-YIELD SCENARIO & ILLINOIS LAW QUESTIONS (27 - 50) ---
    {
        id: 27,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Under the Illinois Merchant's Detention Statute (720 ILCS 5/16-25), which of the following is an absolute prerequisite before a security officer may detain a suspected retail shoplifter?",
        options: [
            "The guard must maintain continuous, uninterrupted surveillance of the suspect and observe them pass all points of payment without paying.",
            "The stolen merchandise must have a retail value exceeding $500.",
            "The guard must obtain written consent from the customer before approaching.",
            "The guard must wait at least 30 minutes after the customer exits the store."
        ],
        correctAnswer: "The guard must maintain continuous, uninterrupted surveillance of the suspect and observe them pass all points of payment without paying.",
        explanation: "Under 720 ILCS 5/16-25, maintaining continuous, uninterrupted surveillance is vital to prove the merchandise was not discarded and that the suspect passed all points of sale with intent to permanently deprive the merchant."
    },
    {
        id: 28,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "What is the primary medical reason an arrested subject must NEVER be left lying face-down on their stomach (in the prone position) after being handcuffed?",
        options: [
            "Prone positioning damages the chrome plating of the handcuffs.",
            "It induces Positional Asphyxia, where body weight and abdominal pressure prevent diaphragm expansion, causing sudden asphyxiation and cardiac arrest.",
            "It automatically voids the merchant's statutory civil liability immunity under Illinois law.",
            "The suspect can easily slip their hands under their torso and pick the handcuff locks."
        ],
        correctAnswer: "It induces Positional Asphyxia, where body weight and abdominal pressure prevent diaphragm expansion, causing sudden asphyxiation and cardiac arrest.",
        illustration: {
            type: "image",
            src: "assets/q_handcuffing.jpg",
            caption: "Restraint Safety: Never leave handcuffed subjects in a prone face-down position."
        },
        explanation: "Positional Asphyxia occurs when a subject's body position restricts their breathing. Leaving a restrained person face-down is a leading cause of in-custody death and massive civil liability."
    },
    {
        id: 29,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Under the Illinois Vehicle Code and 225 ILCS 447, what color emergency oscillating or flashing roof lights are private security vehicles STRICTLY PROHIBITED from displaying?",
        options: [
            "Amber (Yellow)",
            "White",
            "Blue (Reserved exclusively for sworn Illinois law enforcement)",
            "Green"
        ],
        correctAnswer: "Blue (Reserved exclusively for sworn Illinois law enforcement)",
        explanation: "Blue flashing emergency lights are reserved strictly for sworn law enforcement vehicles in Illinois. Private security patrol vehicles are restricted to amber/white warning lights on private property."
    },
    {
        id: 30,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "When deploying an expandable defensive baton to overcome active physical resistance, to which anatomical target zones should strikes be strictly aimed?",
        options: [
            "The head and neck to achieve rapid psychological compliance.",
            "The center of large muscle mass in the thighs, calves, and arms (Green Zone), deliberately avoiding skeletal joints.",
            "The chest, sternum, and clavicle.",
            "Directly into the knee joint to break the suspect's balance."
        ],
        correctAnswer: "The center of large muscle mass in the thighs, calves, and arms (Green Zone), deliberately avoiding skeletal joints.",
        illustration: {
            type: "image",
            src: "assets/baton_chart.png",
            caption: "Baton Strike Zones: Aim at large muscle mass (Green Zone) to achieve non-lethal motor dysfunction."
        },
        explanation: "Baton strikes must be directed at the large muscle masses of the thighs (femoral/peroneal nerves) and arms (Green Zone) to cause temporary motor dysfunction without causing bone fractures or lethal injury."
    },
    {
        id: 31,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Under the legal doctrine of Vicarious Liability (Respondeat Superior), what happens if an on-duty security guard commits an unlawful battery against a visitor?",
        options: [
            "Only the individual guard can be sued; the employer has absolute immunity under Illinois state law.",
            "Both the security guard and the security company/property owner can be held liable as co-defendants for financial damages.",
            "The plaintiff can only recover damages if the guard was wearing an off-duty civilian jacket.",
            "The lawsuit is automatically dismissed if the security company provides 20 hours of training."
        ],
        correctAnswer: "Both the security guard and the security company/property owner can be held liable as co-defendants for financial damages.",
        explanation: "Under Respondeat Superior, employers are held legally and financially responsible for tortious acts committed by employees acting within the scope of their employment."
    },
    {
        id: 32,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "A 'First Amendment Auditor' stands on the public sidewalk outside a commercial entrance in Chicago filming the security desk through the glass. What is the legally correct action for the security officer?",
        options: [
            "Walk onto the public sidewalk, grab the camera, and smash it to protect tenant privacy.",
            "Maintain professional composure, recognize that filming from a public sidewalk is constitutionally protected, do not touch the person or equipment, and monitor to ensure they do not trespass onto private property.",
            "Immediately arrest the individual for commercial espionage under federal law.",
            "Shine a high-powered tactical flashlight continuously into the camera lens."
        ],
        correctAnswer: "Maintain professional composure, recognize that filming from a public sidewalk is constitutionally protected, do not touch the person or equipment, and monitor to ensure they do not trespass onto private property.",
        illustration: {
            type: "image",
            src: "assets/q_arrest_patrol.jpg",
            caption: "Civil Rights: Public sidewalk photography of areas in plain view is protected under the First Amendment."
        },
        explanation: "Photography from a public sidewalk of anything in plain view is protected under the First Amendment. Touching the person or camera constitutes battery and civil rights violations."
    },
    {
        id: 33,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Why does the mandatory bomb threat protocol require strict RADIO SILENCE within 300 feet of a suspected explosive device?",
        options: [
            "Because radio chatter might scare the person who planted the device.",
            "Radiofrequency (RF) electromagnetic energy emitted by handheld radios and cell phones can induce electrical currents in electronic blasting caps, triggering accidental detonation.",
            "Because Chicago Police dispatch systems cannot receive private security frequencies.",
            "Radio silence is only recommended during nighttime shifts."
        ],
        correctAnswer: "Radiofrequency (RF) electromagnetic energy emitted by handheld radios and cell phones can induce electrical currents in electronic blasting caps, triggering accidental detonation.",
        explanation: "Electromagnetic energy from two-way radios and cellular phones can induce an electrical current in electronic detonators or blasting caps, causing premature detonation. Use hardwired landlines from outside a 300ft cordon."
    },
    {
        id: 34,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "A grease and vegetable oil fire breaks out in a commercial kitchen deep fryer. Which type of fire extinguisher is specifically designed and mandated to extinguish this fire?",
        options: [
            "Class A Pressurized Water Extinguisher",
            "Class B Carbon Dioxide Extinguisher",
            "Class K Wet Chemical Extinguisher (creates a soapy saponification foam blanket)",
            "Class D Dry Powder Extinguisher"
        ],
        correctAnswer: "Class K Wet Chemical Extinguisher (creates a soapy saponification foam blanket)",
        explanation: "Class K wet chemical extinguishers (potassium acetate/carbonate) are specifically engineered to react with hot animal fats and vegetable oils, creating a thick soapy blanket (saponification) that smothers vapors and cools the oil."
    },
    {
        id: 35,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "What are the two primary reasons that handcuffs must ALWAYS be double-locked immediately after being applied to an arrestee?",
        options: [
            "To make the cuffs look more professional and make them heavier.",
            "To prevent the handcuffs from ratcheting tighter around the wrists during movement (preventing nerve injury), and to resist picking or shimming.",
            "Double-locking is only required if the suspect is over six feet tall.",
            "To allow the key to remain in the lock during transport."
        ],
        correctAnswer: "To prevent the handcuffs from ratcheting tighter around the wrists during movement (preventing nerve injury), and to resist picking or shimming.",
        illustration: {
            type: "image",
            src: "assets/q_handcuffing.jpg",
            caption: "Double-locking locks the ratchet in place, protecting the subject from nerve injury and resisting escape."
        },
        explanation: "Double-locking prevents the cuffs from ratcheting tighter if the suspect moves or falls (preventing nerve damage/lawsuits) and prevents the suspect from shimming the ratchet mechanism."
    },
    {
        id: 36,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "According to the Department of Homeland Security 'Run, Hide, Fight' active shooter protocol, what is the absolute FIRST tactical priority if an accessible escape route exists?",
        options: [
            "RUN: Evacuate the premises immediately, leave personal belongings behind, and guide others to safety.",
            "HIDE: Barricade in the nearest restroom and wait for security management.",
            "FIGHT: Immediately charge the active shooter barehanded.",
            "Pull the commercial building fire alarm to notify the fire department."
        ],
        correctAnswer: "RUN: Evacuate the premises immediately, leave personal belongings behind, and guide others to safety.",
        explanation: "The primary and most effective life-saving priority during an active shooter event is to RUN (evacuate) if a safe path is accessible. Hiding is secondary, and fighting is a last resort."
    },
    {
        id: 37,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Under Illinois Law (720 ILCS 5/7-3), when is a security officer legally permitted to use DEADLY FORCE solely in defense of personal property or commercial merchandise?",
        options: [
            "Whenever the merchandise is valued above $2,500.",
            "NEVER. Illinois law strictly prohibits the use of deadly force solely in defense of personal property or merchandise.",
            "Whenever the suspect refuses to stop after three verbal warnings.",
            "If the store manager signs an emergency property indemnification form."
        ],
        correctAnswer: "NEVER. Illinois law strictly prohibits the use of deadly force solely in defense of personal property or merchandise.",
        explanation: "720 ILCS 5/7-3 explicitly limits force in defense of property to non-deadly force. Commercial goods can be replaced; human life cannot."
    },
    {
        id: 38,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Under the Illinois Private Security Act of 2004 (225 ILCS 447), which of the following will automatically disqualify an applicant from obtaining or maintaining an IDFPR PERC Card?",
        options: [
            "Having a speeding ticket issued within the past 12 months.",
            "A felony conviction within the preceding 10 years.",
            "Failing to hold a four-year university bachelor's degree.",
            "Being under 35 years of age."
        ],
        correctAnswer: "A felony conviction within the preceding 10 years.",
        explanation: "Under 225 ILCS 447, felony convictions within the preceding 10 years, firearms offenses, or acts involving dishonesty/fraud are statutory disqualifiers for an Illinois PERC Card."
    },
    {
        id: 39,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Following a lawful citizen's arrest for retail theft, what is the recommended private security industry best practice regarding physical searches under 725 ILCS 5/108-1?",
        options: [
            "Conduct an invasive cavity or strip search in the security breakroom.",
            "Conduct a pat-down of outer garments strictly for weapons for personal safety, leaving comprehensive evidentiary searches to arriving police officers.",
            "Search the suspect's locked car parked on a public municipal street three blocks away.",
            "Confiscate the suspect's personal mobile phone and examine their text messages."
        ],
        correctAnswer: "Conduct a pat-down of outer garments strictly for weapons for personal safety, leaving comprehensive evidentiary searches to arriving police officers.",
        explanation: "Security best practice dictates limiting private security searches strictly to weapons retrieval for personal safety. Comprehensive evidentiary searches should be conducted by sworn law enforcement."
    },
    {
        id: 40,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Which of the following entries represents a professionally written, OBJECTIVE statement in an official security incident narrative?",
        options: [
            "\"The suspect was obviously high on narcotics and acting like a violent psycho.\"",
            "\"Subject had bloodshot eyes, slurred speech, an odor of alcohol on his breath, and yelled profanities while stumbling across the lobby floor.\"",
            "\"I believe the suspect broke into the office because he looked like a criminal.\"",
            "\"The tenant was screaming because she has a bad personality.\""
        ],
        correctAnswer: "\"Subject had bloodshot eyes, slurred speech, an odor of alcohol on his breath, and yelled profanities while stumbling across the lobby floor.\"",
        illustration: {
            type: "image",
            src: "assets/q_report_writing.jpg",
            caption: "Incident Narrative: Objectivity requires describing observed physical facts rather than subjective diagnoses."
        },
        explanation: "Objective writing documents observed facts (what was seen, smelled, and heard). Diagnosing intoxication or calling someone 'crazy' is subjective opinion that can be dismantled in court."
    },
    {
        id: 41,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "When escaping through a smoke-filled commercial corridor during a fire alarm, why must occupants crawl on hands and knees keeping their head 1 to 2 feet above the floor?",
        options: [
            "Because building motion detectors only detect individuals standing over four feet tall.",
            "Because superheated smoke and toxic combustion gases rise toward the ceiling, leaving the coolest, cleanest, and most breathable air pocket 1 to 2 feet above floor level.",
            "To prevent tripping over wet carpet.",
            "Because emergency exit signs are located on baseboards."
        ],
        correctAnswer: "Because superheated smoke and toxic combustion gases rise toward the ceiling, leaving the coolest, cleanest, and most breathable air pocket 1 to 2 feet above floor level.",
        explanation: "Hot toxic gases and smoke rise to the ceiling. The cleanest, coolest breathable air layer is found 1 to 2 feet above the floor level."
    },
    {
        id: 42,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Why is it strictly forbidden to use passenger elevators during a commercial building fire evacuation?",
        options: [
            "Elevators consume too much emergency electrical power.",
            "Elevator hoistway shafts act as vertical chimneys drawing heat and toxic smoke, and electrical failure can trap passengers inside on burning floors.",
            "Elevator permits are only valid during non-emergency operating hours.",
            "Elevators are reserved exclusively for building ownership."
        ],
        correctAnswer: "Elevator hoistway shafts act as vertical chimneys drawing heat and toxic smoke, and electrical failure can trap passengers inside on burning floors.",
        explanation: "Elevators must NEVER be used during fire emergencies. Shafts fill with smoke, call buttons can short-circuit to the fire floor, and electrical failure can trap occupants."
    },
    {
        id: 43,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "An individual is observed repeatedly photographing CCTV cameras, measuring distances between security guard posts, and attempting to elicit employee shift change schedules. Which of the 8 Signs of Terrorism are demonstrated?",
        options: [
            "Deployment and Rehearsal",
            "Surveillance and Elicitation",
            "Acquiring Supplies and Funding",
            "Dry Runs and Infiltration"
        ],
        correctAnswer: "Surveillance and Elicitation",
        explanation: "Surveillance involves recording physical security features, while Elicitation involves attempting to gain operational information about procedures, shifts, and response times."
    },
    {
        id: 44,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Do private unarmed security officers in Illinois possess constitutional 'Terry Stop' authority to detain and frisk individuals based solely on 'reasonable suspicion'?",
        options: [
            "Yes, PERC cardholders have identical Terry stop powers as sworn municipal police officers.",
            "No, private security guards do NOT possess Terry stop-and-frisk powers; stops require consent, contract, or full reasonable grounds for an arrest.",
            "Yes, but only on weekends and holidays.",
            "Only if they have completed more than 40 hours of armed security training."
        ],
        correctAnswer: "No, private security guards do NOT possess Terry stop-and-frisk powers; stops require consent, contract, or full reasonable grounds for an arrest.",
        explanation: "Under landmark Fourth Amendment jurisprudence (Terry v. Ohio), Terry stop-and-frisk powers are exclusive to sworn government law enforcement officers. Private guards lack Terry stop authority."
    },
    {
        id: 45,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Under 725 ILCS 5/107-8, what legal authority and responsibility does a private security guard have when commanded by a sworn police officer to assist in effecting an arrest?",
        options: [
            "The guard must immediately refuse and retreat into the security office.",
            "The guard has the same responsibilities and authority as that peace officer for the duration of that assistance.",
            "The guard may assist only if the suspect agrees to be helped.",
            "The guard is considered a municipal city council member during the arrest."
        ],
        correctAnswer: "The guard has the same responsibilities and authority as that peace officer for the duration of that assistance.",
        explanation: "725 ILCS 5/107-8 explicitly provides that any person requested by a peace officer to aid in effecting an arrest or preventing an escape holds the same responsibilities and authority as that peace officer."
    },
    {
        id: 46,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "Following the deployment of Oleoresin Capsicum (OC) pepper spray on a secured, handcuffed subject, what is the officer's affirmative legal duty of care?",
        options: [
            "Leave the subject in an unventilated holding closet for two hours to calm down.",
            "Move the subject to fresh air, flush face and eyes with copious amounts of clean, cool running water, never apply oils or lotions, and monitor breathing.",
            "Apply hot rubbing alcohol to their eyes to dissolve the chemical resin.",
            "Demand that the subject sign a liability release form before offering any water."
        ],
        correctAnswer: "Move the subject to fresh air, flush face and eyes with copious amounts of clean, cool running water, never apply oils or lotions, and monitor breathing.",
        explanation: "Officers owe a duty of care to decontaminate exposed individuals once secured: provide fresh air, flush eyes with cool water, monitor breathing, and summon EMS if respiratory distress persists."
    },
    {
        id: 47,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "During a commercial building fire evacuation, why should closed doors be tested with the BACK OF THE HAND before opening?",
        options: [
            "The back of the hand is more heat-sensitive, and testing this way prevents the hand from reflexively gripping a blistering brass doorknob if heat is present.",
            "Because fingerprints on doorknobs hinder arson investigations.",
            "Because grabbing doorknobs with the palm causes electrical static discharge.",
            "It is required by the Chicago Building Department only for residential doors."
        ],
        correctAnswer: "The back of the hand is more heat-sensitive, and testing this way prevents the hand from reflexively gripping a blistering brass doorknob if heat is present.",
        explanation: "Testing with the back of the hand ensures safety: palm contact can cause reflex grasping of blistering metal, causing third-degree burns and incapacitating the officer's hands."
    },
    {
        id: 48,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "What is the critical statutory distinction between Criminal Trespass to Real Property (720 ILCS 5/21-3) and Burglary (720 ILCS 5/19-1)?",
        options: [
            "Trespass is committed with tools, whereas Burglary is committed empty-handed.",
            "Burglary requires the specific intent to commit a felony or theft inside the building, whereas Criminal Trespass is merely entering or remaining without lawful authority.",
            "Trespass applies only to residential homes, while Burglary applies only to commercial offices.",
            "Burglary requires an active physical fight with the building security officer."
        ],
        correctAnswer: "Burglary requires the specific intent to commit a felony or theft inside the building, whereas Criminal Trespass is merely entering or remaining without lawful authority.",
        explanation: "Burglary (720 ILCS 5/19-1) requires entering or remaining without authority WITH INTENT to commit therein a felony or theft. Trespass is simply entering or remaining without authority after notice."
    },
    {
        id: 49,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "According to the Verbal Judo tactical de-escalation framework, what is the primary benefit of paraphrasing an aggressive subject's statements back to them?",
        options: [
            "It gives the officer an excuse to mock the subject in front of witnesses.",
            "It validates that the officer is actively listening, reduces the subject's emotional arousal, and clarifies facts while maintaining command presence.",
            "It legally waives the subject's right to speak with a police officer.",
            "It guarantees that physical force will never be required."
        ],
        correctAnswer: "It validates that the officer is actively listening, reduces the subject's emotional arousal, and clarifies facts while maintaining command presence.",
        explanation: "Paraphrasing de-escalates conflict by proving the officer is listening. Validating emotions calms amygdala-driven adrenaline surges, creating space for rational compliance."
    },
    {
        id: 50,
        part: "Part 6: Advanced Tactical & Legal Scenarios",
        type: "scenario",
        question: "When seizing physical evidence on post (such as a discarded tool, stolen merchandise, or knife), how must the Chain of Custody be legally documented?",
        options: [
            "Place the item in the guard's personal vehicle trunk and discard it after 30 days.",
            "Place in a clean evidence container, log the exact date/time/location seized in the Incident Report, maintain secure custody, and obtain a signed property transfer receipt when handing over to police.",
            "Sell the item at an employee auction to offset company losses.",
            "Wash the item with bleach to sanitize it before showing it to police detectives."
        ],
        correctAnswer: "Place in a clean evidence container, log the exact date/time/location seized in the Incident Report, maintain secure custody, and obtain a signed property transfer receipt when handing over to police.",
        explanation: "Maintaining an unbroken Chain of Custody requires documenting who seized the item, when, where, how it was secured, and securing a signed property receipt upon transfer to law enforcement."
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
