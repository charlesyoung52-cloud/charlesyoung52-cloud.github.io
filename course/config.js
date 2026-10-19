// Platforms Training Academy - Central Cloud Configuration
// Lead Instructor: Charles Young | Chicago, IL
// This file centralizes configuration so all students on all browsers automatically share settings.

window.PLATFORMS_CONFIG = {
    // 1. EmailJS Cloud Configuration for Real 6-Digit MFA Verification Emails
    // Pre-configured so MFA works automatically on EVERY device and browser without re-entering keys!
    emailjs: {
        serviceId: "service_bor93nt",
        templateId: "template_0k00oka",
        publicKey: "qZROJMBteQvfuYHqG"
    },

    // 2. Central Backend API URL for Cross-Device Student Progress & Admin Roster
    // When connected to a cloud backend (e.g. Render/Railway), all devices sync here in real time.
    apiBaseUrl: "https://charlesyoung52-cloud-github-io.onrender.com"
};
