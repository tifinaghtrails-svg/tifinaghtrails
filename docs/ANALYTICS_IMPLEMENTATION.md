# Analytics Implementation

## Installed

- `@vercel/analytics`
- `@vercel/speed-insights`

The app uses the React/Vite imports:

- `@vercel/analytics/react`
- `@vercel/speed-insights/react`

The `@vercel/analytics/next` and `@vercel/speed-insights/next` imports are for Next.js projects, not this Vite app.

## Page Analytics

Vercel Web Analytics automatically records page views after deployment on Vercel.

Vercel Speed Insights records Core Web Vitals and performance metrics in the Vercel dashboard.

## Custom Events

Implemented in `src/utils/analytics.js`:

| Event | Trigger | Properties | PII status |
| --- | --- | --- | --- |
| `booking_request_submitted` | Booking API success | `tour_slug`, `travelers` | No name, email, phone, or message |
| `contact_message_submitted` | Contact API success | `subject_present` | No name, email, or message |
| `whatsapp_click` | Success screen WhatsApp click | `location` | No phone or customer content |

## Optional GTM

Set `VITE_GTM_ID` in Vercel if Google Tag Manager is required.

Do not send personal form data to GTM. Keep analytics events aggregated and non-identifying.

## Recommended Vercel Dashboard Checks

- Traffic by route
- Referrers
- Top pages
- Core Web Vitals
- Largest Contentful Paint on home and tour pages
- Booking/contact conversion events
