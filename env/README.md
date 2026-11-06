# Environment & Secrets Vault (`env/`)

This directory stores environment configuration according to industry security best practices:

1. **`env/.env` (Private Local Vault — Git-Ignored & Deployment-Blocked)**
   - Stores sensitive API keys, Stripe secret/webhook keys (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`), SMTP email passwords (`SMTP_PASS`), Admin PINs (`ADMIN_PIN`), and Flask session signing keys (`FLASK_SECRET_KEY`).
   - Automatically loaded at startup by `server.py` and `deploy_to_github.py`.
   - **Never** uploaded to GitHub Pages or served over HTTP (`server.py` blocks `/env/*` and `/.env*` with HTTP 404).

2. **`env/.env.example` (Safe Reference Template)**
   - Lists every supported environment variable with placeholder values so you can easily configure your cloud host (e.g., Render.com Environment Variables) without exposing secrets in source control.
