// Platforms Training Academy - Central Cloud Configuration (Armed Security Portal)
// Lead Instructor: Charles Young | Chicago, IL
// Shared cloud settings for MFA verification emails and cross-device roster sync.

window.PLATFORMS_CONFIG = {
    // 1. EmailJS Cloud Configuration for Real 6-Digit MFA Verification Emails
    emailjs: {
        serviceId: "service_bor93nt",
        templateId: "template_0k00oka",
        publicKey: "qZROJMBteQvfuYHqG"
    },

    // 2. Google Apps Script Gmail Webhook (Strict Gmail-Only Email Delivery)
    gmailWebhook: {
        url: "https://script.google.com/macros/s/AKfycbxzEpjDZ07wPASas7X4hNyR0ThhuXYg4G2aigLE4_L_XzVBnP7-u1Z0e0dQXmdOC7lT/exec",
        secret: "pta-7Kq2x9Lm4Rv8"
    },

    // 3. Cloud / Local Backend API URL (Render in production, relative locally)
    apiBaseUrl: (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
        ? ""
        : "https://charlesyoung52-cloud-github-io.onrender.com"
};
