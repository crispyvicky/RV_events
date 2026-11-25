# Asset swap guide

Placeholder images currently use Unsplash URLs in `src/lib/constants.js` (`PLACEHOLDERS`) and seeded portfolio data in `src/lib/data.js`.

## When real photos arrive

1. Add files under `public/images/rv/` (example names):
   - `hero.jpg`
   - `wedding.jpg`
   - `corporate.jpg`
   - `social.jpg`
   - `destination.jpg`
   - `production.jpg`
   - `about.jpg`
   - `portfolio-01.jpg` … `portfolio-06.jpg`
2. Update `PLACEHOLDERS` in `src/lib/constants.js` to `/images/rv/...`
3. Update portfolio/services in Admin (or re-seed) with the new paths
4. Prefer landscape 2400px+ for heroes; portrait 1600px+ for portfolio cards

## Brand

- Logo / wordmark: replace text brand in Navbar/Footer when SVG ready
- Colors: CSS variables in `src/app/globals.css`
