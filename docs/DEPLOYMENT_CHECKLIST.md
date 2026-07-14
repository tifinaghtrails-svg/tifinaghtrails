# Deployment Checklist

## Vercel Environment Variables

Required for mail:

- `OWNER_EMAIL=tifinaghtrails@gmail.com`
- `SMTP_HOST=smtp.gmail.com`
- `SMTP_PORT=465`
- `SMTP_SECURE=true`
- `SMTP_USER=tifinaghtrails@gmail.com`
- `SMTP_PASS=<gmail-app-password-without-spaces>`
- `SMTP_FROM=TifinaghTrails <tifinaghtrails@gmail.com>`

Optional public variables:

- `VITE_GOOGLE_SITE_VERIFICATION=<search-console-token>`
- `VITE_GTM_ID=<gtm-id>`
- `VITE_NOINDEX=false`

## Before Deploy

- Run `npm run build`
- Run `npm run test:seo`
- Confirm `.env` is not committed
- Confirm `dist` is not committed
- Confirm `public/sitemap.xml` uses `https://tifinaghtrails.com`

## After Deploy

- Open `/api/health` and confirm `configured: true`
- Open `/api/health?details=1` if booking still fails; it returns safe booleans only, not the password.
- Submit a booking form test with a real inbox
- Submit a contact form test
- Open `/sitemap.xml`
- Open `/robots.txt`
- Open one deep tour URL directly
- Open an unknown URL and confirm it is not treated as a valid indexed page
- Check Vercel Analytics and Speed Insights after traffic begins

## Common Booking Failure Causes

- Missing Vercel SMTP environment variable
- Gmail app password copied with spaces; paste the 16-character app password without spaces
- Environment variables added to Preview but not Production, or added after deploy without redeploying
- `SMTP_FROM` does not match the Gmail sender
- Gmail account security blocks SMTP
- Deployment did not include the `api` directory

## If `/api/booking` Returns 500

1. Open the Vercel project.
2. Go to Settings -> Environment Variables.
3. Add the required SMTP variables to Production.
4. Redeploy the latest `main` commit.
5. Check `/api/health?details=1`.
6. If `configured` is true but booking still fails, open Vercel Function Logs and look for `responseCode` or `command` on the `Booking email failed` log entry.
