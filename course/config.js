// Platforms Training Academy - Central Cloud Configuration
// Lead Instructor: Charles Young | Chicago, IL
// This file centralizes configuration so all students on all browsers automatically share settings.

window.PLATFORMS_CONFIG = {
    // 1. EmailJS Cloud Configuration for Real 6-Digit MFA Verification Emails
    // Once populated here, MFA will work automatically on EVERY device and browser without re-entering keys!
    emailjs: {
        serviceId: "",    // e.g. "service_xxxxxxx"
        templateId: "",   // e.g. "template_xxxxxxx"
        publicKey: ""     // e.g. "r_AbCdEf123456"
    },

    // 2. Central Backend API URL for Cross-Device Student Progress & Admin Roster
    // When connected to a cloud backend (e.g. Render/Railway), all devices sync here in real time.
    apiBaseUrl: ""
};
