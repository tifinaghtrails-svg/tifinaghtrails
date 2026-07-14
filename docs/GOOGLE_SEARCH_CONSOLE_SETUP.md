# Google Search Console Setup

## Recommended Verification

Use the domain property for `tifinaghtrails.com` if DNS access is available.

If DNS verification is not available, use the HTML meta tag method:

1. Open Google Search Console.
2. Add property: `https://tifinaghtrails.com`.
3. Choose HTML tag verification.
4. Copy only the verification token.
5. In Vercel, add:
   - `VITE_GOOGLE_SITE_VERIFICATION=your-token`
6. Redeploy production.
7. Click Verify in Search Console.

## Submit Sitemap

Submit:

```text
https://tifinaghtrails.com/sitemap.xml
```

## Inspect Important URLs

Use URL Inspection for:

- `https://tifinaghtrails.com/`
- `https://tifinaghtrails.com/tours`
- `https://tifinaghtrails.com/tours/mount-toubkal-2-day-ascent`
- `https://tifinaghtrails.com/contact`
- `https://tifinaghtrails.com/booking`

## Watch For

- Indexing status
- Duplicate canonical warnings
- Soft 404 warnings
- Crawled but not indexed
- Mobile usability
- Core Web Vitals
