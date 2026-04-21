import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/app/globals.css', 'utf8');

// Remove ALL hero-related blocks added in previous sessions
const heroMarker = '/* Hero Banner Overlays */';
const idx = content.indexOf(heroMarker);
if (idx !== -1) content = content.substring(0, idx);

// Also wipe any second block that may have been appended
const hero2Marker = '/* =====================================================';
const idx2 = content.indexOf(hero2Marker);
if (idx2 !== -1) content = content.substring(0, idx2);

// Append one clean block
const overlay = `
/* =====================================================
   Hero Slides – transparent overlay, text-shadow only
   ===================================================== */

/* Each swiper-slide inside .home-banner must be relative
   so fill images and absolute overlays work correctly    */
.unc-home .home-banner .swiper-slide {
  position: relative !important;
}

/* Invisible full-cover layer – NO background colour */
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  pointer-events: none;
}

/* Slide 1 – left-aligned */
.hero-overlay--left { justify-content: flex-start; }
.hero-overlay--left .hero-overlay__content {
  padding-left: clamp(40px, 8%, 120px);
  text-align: left;
  max-width: 48%;
}

/* Slide 2 – centred */
.hero-overlay--center { justify-content: center; }
.hero-overlay--center .hero-overlay__content {
  text-align: center;
  max-width: 60%;
}

.hero-overlay__content { pointer-events: auto; }

.hero-overlay__title {
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #fff;
  line-height: 1.15;
  margin-bottom: 16px;
  text-shadow:
    0 2px 8px rgba(0,0,0,0.65),
    0 0 32px rgba(0,0,0,0.45);
}

.hero-overlay__subtitle {
  font-size: clamp(0.95rem, 1.6vw, 1.35rem);
  font-weight: 600;
  color: #fff;
  line-height: 1.4;
  margin-bottom: 32px;
  text-shadow:
    0 1px 6px rgba(0,0,0,0.7),
    0 0 22px rgba(0,0,0,0.5);
}

.hero-overlay__btn {
  display: inline-block;
  background-color: #2bb5fc;
  color: #fff;
  padding: 11px 38px;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-decoration: none;
  text-transform: uppercase;
  transition: background 0.25s ease, transform 0.2s ease;
  box-shadow: 0 4px 14px rgba(43,181,252,0.45);
}
.hero-overlay__btn:hover {
  background-color: #1a9ee0;
  transform: translateY(-2px);
}

@media (max-width: 900px) {
  .hero-overlay--left,
  .hero-overlay--center {
    align-items: flex-start;
    justify-content: center;
    padding-top: 18%;
  }
  .hero-overlay--left .hero-overlay__content,
  .hero-overlay--center .hero-overlay__content {
    padding-left: 5%;
    padding-right: 5%;
    text-align: center;
    max-width: 100%;
  }
}
`;

content = content.trimEnd() + '\n' + overlay;
writeFileSync('src/app/globals.css', content);
console.log('CSS cleaned. Total bytes: ' + content.length);
