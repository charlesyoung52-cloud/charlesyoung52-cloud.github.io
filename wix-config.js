/**
 * =========================================================================
 * Wix Headless Configuration
 * Platforms Training Academy & Online Unarmed Security Course
 * Official Site: https://www.platformstraining.com
 * =========================================================================
 * 
 * QUICK SETUP INSTRUCTIONS:
 * 1. Log in to your Wix Studio or Wix Dashboard (https://manage.wix.com)
 *    for your site: platformstraining.com
 * 
 * 2. In the Wix Dashboard, navigate to:
 *    Settings -> Headless Settings (or Developer Tools -> OAuth Apps).
 * 
 * 3. Click "Create OAuth App" (or "New Client App"):
 *    - App Name: "Platforms Online Course LMS"
 *    - App Type: Public Client / Single Page Application (SPA)
 * 
 * 4. Add the following to "Allowed Web Origins" & "Allowed Redirect URIs":
 *    - https://charlesyoung52-cloud.github.io
 *    - https://charlesyoung52-cloud.github.io/
 *    - http://127.0.0.1:5000
 *    - http://localhost:5000
 * 
 * 5. Copy the generated "Client ID" (UUID string) and paste it below
 *    into the `clientId` field.
 * 
 * 6. Save this file. When students visit the course, they can sign in with
 *    their official platformstraining.com member account, syncing their
 *    profile, training progression, and IDFPR certificate records.
 * =========================================================================
 */

window.WIX_CONFIG = {
    // ---------------------------------------------------------------------
    // 1. Wix Headless OAuth Client ID
    // Paste your Client ID from the Wix Dashboard here:
    // (Leave empty to use Standalone / Offline LMS Mode)
    // ---------------------------------------------------------------------
    clientId: "",

    // ---------------------------------------------------------------------
    // 2. Your Live Premium Wix Site URL
    // ---------------------------------------------------------------------
    siteUrl: "https://www.platformstraining.com",

    // ---------------------------------------------------------------------
    // 3. Optional: Wix Data CMS Collection ID for Student Course Progress
    // Collection name in your Wix CMS to store student progress:
    // ---------------------------------------------------------------------
    collectionId: "StudentCourseProgress",

    // ---------------------------------------------------------------------
    // 4. Optional: Wix Checkout / Pricing Plans URL
    // Direct link to your Wix site's checkout, pricing plans, or payment page:
    // ---------------------------------------------------------------------
    checkoutUrl: "https://www.platformstraining.com",

    // ---------------------------------------------------------------------
    // 5. Debugging
    // Set to true to view verbose Wix SDK diagnostic logs in browser console
    // ---------------------------------------------------------------------
    debug: false
};
