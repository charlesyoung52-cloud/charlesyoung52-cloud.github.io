/**
 * =========================================================================
 * Wix Headless Client Service for Platforms Training Academy LMS
 * Chicago, IL | https://platformstraining.com | Lead Instructor: Charles Young
 * 
 * Powered by official @wix/sdk, @wix/members, @wix/data, and @wix/redirects.
 * Integrates single sign-on (SSO), member profile sync, cloud progress persistence,
 * and seamless checkout redirects with the premium Wix site.
 * =========================================================================
 */

class PlatformsWixClient {
    constructor() {
        this.config = window.WIX_CONFIG || {
            clientId: "",
            siteUrl: "https://www.platformstraining.com",
            collectionId: "StudentCourseProgress",
            checkoutUrl: "https://www.platformstraining.com",
            debug: false
        };

        this.client = null;
        this.currentMember = null;
        this.tokens = null;
        this.isInitialized = false;

        // Auto-initialize when DOM / WixSDK is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    log(...args) {
        if (this.config.debug || window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') {
            console.log('[Wix Headless]', ...args);
        }
    }

    error(...args) {
        console.error('[Wix Headless Error]', ...args);
    }

    /**
     * Check if client ID has been properly configured
     */
    isConfigured() {
        return !!(this.config.clientId && this.config.clientId.trim().length > 5 && !this.config.clientId.includes('PASTE_'));
    }

    /**
     * Check if student is currently logged in as a Wix Member
     */
    isLoggedIn() {
        return !!(this.client && this.client.auth && this.client.auth.loggedIn && this.client.auth.loggedIn());
    }

    /**
     * Load stored tokens from localStorage
     */
    loadTokens() {
        try {
            const raw = localStorage.getItem('platforms_wix_tokens');
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            this.error('Failed to parse stored tokens:', e);
            return null;
        }
    }

    /**
     * Save tokens to localStorage
     */
    saveTokens(tokens) {
        if (!tokens) {
            localStorage.removeItem('platforms_wix_tokens');
        } else {
            localStorage.setItem('platforms_wix_tokens', JSON.stringify(tokens));
        }
    }

    /**
     * Initialize Wix SDK Client and check for incoming OAuth callbacks
     */
    async init() {
        if (this.isInitialized) return;

        if (!window.WixSDK) {
            this.error('WixSDK bundle is not loaded. Ensure wix-sdk.bundle.js is included before wix-client.js.');
            return;
        }

        if (!this.isConfigured()) {
            this.log('Standalone mode active. Add your Wix Headless Client ID in wix-config.js to enable Wix Member SSO & Cloud Sync.');
            this.isInitialized = true;
            this.dispatchStateChange();
            return;
        }

        try {
            const { createClient, OAuthStrategy, members, items, redirects } = window.WixSDK;
            this.tokens = this.loadTokens();

            this.client = createClient({
                modules: { members, items, redirects },
                auth: OAuthStrategy({
                    clientId: this.config.clientId,
                    tokens: this.tokens
                })
            });

            this.log('Client initialized with Client ID:', this.config.clientId);

            // Check if user returned from Wix OAuth login flow with ?code=...&state=...
            await this.checkOAuthCallback();

            // If logged in, fetch current member details
            if (this.isLoggedIn()) {
                await this.refreshMemberProfile();
            }

            this.isInitialized = true;
            this.dispatchStateChange();
        } catch (err) {
            this.error('Initialization error:', err);
            this.isInitialized = true;
            this.dispatchStateChange();
        }
    }

    /**
     * Process OAuth callback code and state in URL
     */
    async checkOAuthCallback() {
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');

        if (!code || !state) return;

        this.log('Found OAuth callback parameters in URL. Exchanging code for tokens...');

        try {
            const oauthDataRaw = localStorage.getItem('platforms_wix_oauth_data');
            const oauthData = oauthDataRaw ? JSON.parse(oauthDataRaw) : null;

            if (!oauthData) {
                this.error('Missing local OAuth state verification data.');
                return;
            }

            const memberTokens = await this.client.auth.getMemberTokens(code, state, oauthData);
            this.client.auth.setTokens(memberTokens);
            this.saveTokens(memberTokens);
            localStorage.removeItem('platforms_wix_oauth_data');

            this.log('Successfully authenticated member tokens!');

            // Clean query parameters from URL without page reload
            url.searchParams.delete('code');
            url.searchParams.delete('state');
            const cleanUrl = url.pathname + (url.search ? url.search : '') + url.hash;
            window.history.replaceState({}, document.title, cleanUrl);

            await this.refreshMemberProfile();

            // Dispatch notification
            window.dispatchEvent(new CustomEvent('wix:login-success', { detail: { member: this.currentMember } }));
        } catch (err) {
            this.error('Failed to exchange OAuth authorization code:', err);
        }
    }

    /**
     * Start Wix Member Login Flow
     */
    async login(customRedirect) {
        if (!this.isConfigured()) {
            alert(
                "Wix Headless Setup Required:\n\n" +
                "To enable Wix Member Sign-In, please generate a Headless Client ID in your Wix Studio / Wix Dashboard for platformstraining.com and paste it into wix-config.js.\n\n" +
                "You can continue using the course in offline/standalone mode without signing in."
            );
            return;
        }

        try {
            const redirectUri = window.location.origin + window.location.pathname;
            const originalUrl = customRedirect || window.location.href;

            const oauthData = this.client.auth.generateOAuthData(redirectUri, originalUrl);
            localStorage.setItem('platforms_wix_oauth_data', JSON.stringify(oauthData));

            const { authUrl } = await this.client.auth.getAuthUrl(oauthData);
            this.log('Redirecting student to Wix Member Auth:', authUrl);
            window.location.href = authUrl;
        } catch (err) {
            this.error('Login error:', err);
            alert('Unable to initiate Wix login: ' + (err.message || err));
        }
    }

    /**
     * Logout current member
     */
    async logout() {
        if (!this.client) return;

        try {
            const redirectUri = window.location.origin + window.location.pathname;
            let logoutUrl = null;

            if (this.client.auth && this.client.auth.logout) {
                const res = await this.client.auth.logout(redirectUri);
                logoutUrl = res?.logoutUrl;
            }

            this.saveTokens(null);
            localStorage.removeItem('platforms_wix_oauth_data');
            this.currentMember = null;

            this.dispatchStateChange();
            window.dispatchEvent(new CustomEvent('wix:logout-success'));

            if (logoutUrl) {
                window.location.href = logoutUrl;
            } else {
                window.location.reload();
            }
        } catch (err) {
            this.error('Logout error:', err);
            this.saveTokens(null);
            this.currentMember = null;
            this.dispatchStateChange();
            window.location.reload();
        }
    }

    /**
     * Fetch the authenticated Wix Member profile details
     */
    async refreshMemberProfile() {
        if (!this.client || !this.isLoggedIn()) {
            this.currentMember = null;
            return null;
        }

        try {
            const res = await this.client.members.getCurrentMember({
                fieldsets: ['FULL']
            });

            const member = res.member || res;
            if (!member) {
                this.currentMember = null;
                return null;
            }

            const contact = member.contact || {};
            const firstName = contact.firstName || member.profile?.nickname || '';
            const lastName = contact.lastName || '';
            const fullName = `${firstName} ${lastName}`.trim() || member.loginEmail || 'Student Officer';

            const email = member.loginEmail || (contact.emails && contact.emails[0]) || '';
            const phone = (contact.phones && contact.phones[0]) || '';
            
            const addrObj = (contact.addresses && contact.addresses[0]) || {};
            const address = addrObj.streetAddress || addrObj.formatted || '';
            const city = addrObj.city || '';
            const state = addrObj.subdivision || 'IL';
            const zip = addrObj.postalCode || '';

            this.currentMember = {
                id: member._id || member.id,
                fullName: fullName.toUpperCase(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                city: city,
                state: state,
                zip: zip,
                photoUrl: member.profile?.photo?.url || '',
                raw: member
            };

            this.log('Retrieved authenticated member:', this.currentMember);
            return this.currentMember;
        } catch (err) {
            this.error('Failed to fetch current member profile:', err);
            return null;
        }
    }

    /**
     * Save/Sync course progress and certificate status to Wix CMS Data collection
     */
    async syncProgressToWix(courseData) {
        if (!this.isConfigured() || !this.isLoggedIn() || !this.client?.items) {
            return { status: 'skipped', reason: 'not_authenticated_or_configured' };
        }

        try {
            const collection = this.config.collectionId || "StudentCourseProgress";
            const memberId = this.currentMember?.id || 'guest';
            
            const payload = {
                _id: memberId,
                title: this.currentMember?.fullName || courseData.studentCertData?.name || 'Student Officer',
                studentEmail: this.currentMember?.email || courseData.studentEmail,
                studentAgency: courseData.studentAgency,
                currentLessonId: courseData.currentLessonId,
                completedModulesCount: courseData.completedCount || 0,
                examPassed: !!courseData.examPassed,
                examScore: courseData.examScore || 0,
                examPercentage: courseData.examPercentage || 0,
                isPaid: !!courseData.isPaid,
                isCertLocked: !!courseData.isCertLocked,
                issuedCertId: courseData.issuedCertId || null,
                lastSavedAt: new Date().toISOString()
            };

            this.log(`Syncing progress to Wix collection "${collection}":`, payload);
            
            // Use items.save which creates or updates based on _id
            const result = await this.client.items.save(collection, payload);
            this.log('Wix Data save response:', result);
            return { status: 'success', data: result };
        } catch (err) {
            this.error('Failed to sync progress to Wix collection:', err);
            return { status: 'error', error: err.message || err };
        }
    }

    /**
     * Fetch saved progress for the current member from Wix CMS Data collection
     */
    async fetchProgressFromWix() {
        if (!this.isConfigured() || !this.isLoggedIn() || !this.client?.items) {
            return null;
        }

        try {
            const collection = this.config.collectionId || "StudentCourseProgress";
            const memberId = this.currentMember?.id;
            if (!memberId) return null;

            const res = await this.client.items.getItem(collection, memberId);
            this.log('Retrieved progress from Wix Data:', res);
            return res;
        } catch (err) {
            this.log('No existing progress record in Wix Data collection:', err);
            return null;
        }
    }

    /**
     * Redirect student to official Wix site checkout or pricing plans
     */
    async redirectToCheckout(planOrProductId) {
        if (!this.isConfigured() || !this.client?.redirects) {
            // Fallback direct navigation
            window.open(this.config.checkoutUrl || "https://www.platformstraining.com", "_blank");
            return;
        }

        try {
            const redirectUri = window.location.origin + window.location.pathname + '?payment_success=true';
            const session = await this.client.redirects.createRedirectSession({
                callbacks: {
                    postFlowUrl: redirectUri
                }
            });

            if (session && session.redirectUrl) {
                window.location.href = session.redirectUrl;
            } else {
                window.open(this.config.checkoutUrl, "_blank");
            }
        } catch (err) {
            this.error('Failed to create Wix redirect session:', err);
            window.open(this.config.checkoutUrl || "https://www.platformstraining.com", "_blank");
        }
    }

    /**
     * Get integration status summary for UI display
     */
    getStatus() {
        return {
            isConfigured: this.isConfigured(),
            isLoggedIn: this.isLoggedIn(),
            member: this.currentMember,
            clientId: this.config.clientId,
            siteUrl: this.config.siteUrl
        };
    }

    /**
     * Dispatch global event when authentication or member profile updates
     */
    dispatchStateChange() {
        window.dispatchEvent(new CustomEvent('wix:state-changed', {
            detail: this.getStatus()
        }));
    }
}

// Instantiate global singleton
window.wixClient = new PlatformsWixClient();
