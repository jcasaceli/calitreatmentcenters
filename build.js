/* ===================================================================
   build.js — Static site generator for californiatreatmentcenters.com
   -------------------------------------------------------------------
   Self-contained generator (no SPA source). Builds one real, indexable
   HTML page per entry in content/*.json + the homepage + E-E-A-T pages,
   plus a Locations hub, a Guides hub, sitemap.xml and robots.txt.

   Each page: own URL, <title>, meta description, canonical, OpenGraph,
   Organization + (optional Local) + WebPage + Physician + FAQ JSON-LD,
   decorative imagery with descriptive alt text.

   Run:  node build.js
   =================================================================== */

const fs = require('fs');
const path = require('path');

const ORIGIN = 'https://californiatreatmentcenters.com';
const BRAND = 'California Treatment Centers';
const PHONE = '213-321-6518';
const TEL = '2133216518';
const EMAIL = 'support@alumniaidservices.com';
/* Social profiles — CONFIRM these exact URLs with the owner.
   Used in the footer + Organization `sameAs` schema. */
const SOCIAL = [
  { name: 'Instagram', url: 'https://www.instagram.com/californiatreatment',
    icon: '<path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-.9 0-1.4.2-1.7.3-.4.2-.7.4-1 .7-.3.3-.5.6-.7 1-.1.3-.3.8-.3 1.7-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 .9.2 1.4.3 1.7.2.4.4.7.7 1 .3.3.6.5 1 .7.3.1.8.3 1.7.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.4 1-.7.3-.3.5-.6.7-1 .1-.3.3-.8.3-1.7.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-.9-.2-1.4-.3-1.7-.2-.4-.4-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.8-.3-1.7-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 8a3.1 3.1 0 100-6.2 3.1 3.1 0 000 6.2zm6.3-8.2a1.1 1.1 0 11-2.3 0 1.1 1.1 0 012.3 0z"/>' },
  { name: 'Facebook', url: 'https://www.facebook.com/californiatreatmentcenters',
    icon: '<path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0022 12z"/>' }
];
const OUT = __dirname;
const styles = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

/* ---- Real locations (edit locations.js with real addresses) ----- */
let LOCATIONS = [];
try { LOCATIONS = require('./locations.js').filter(l => !l.placeholder); } catch (e) {}

/* ---- Home + E-E-A-T --------------------------------------------- */
const HOME = require('./home.js');
const EEAT = require('./eeat-content.js');

/* ---- Content pages from content/*.json -------------------------- */
const CONTENT = [];
const contentDir = path.join(__dirname, 'content');
if (fs.existsSync(contentDir)) {
  fs.readdirSync(contentDir).filter(f => f.endsWith('.json')).sort().forEach(f => {
    try {
      JSON.parse(fs.readFileSync(path.join(contentDir, f), 'utf8'))
        .forEach(p => { p.id = p.id || ('c-' + p.slug); CONTENT.push(p); });
    } catch (e) { console.warn('!! bad JSON', f, '-', e.message); }
  });
}
const byCat = c => CONTENT.filter(p => p.category === c);
const LEVELS = byCat('level'), TREAT = byCat('treatment'), INS = byCat('insurance'),
      CITIES = byCat('location'), ARTICLES = byCat('article'), BLOG = byCat('blog');
const BLOG_HUB = { id: 'p-blog', slug: 'blog', navLabel: 'Blog',
  title: 'Addiction & Recovery Blog | ' + BRAND,
  desc: 'Expert, sourced articles on addiction, detox, treatment and recovery in California — citing NIDA, SAMHSA and other authorities. Call ' + PHONE + '.' };

const LOC_HUB = { id: 'p-locations', slug: 'california-rehab-locations', navLabel: 'All Locations',
  title: 'Drug & Alcohol Rehab Locations Across California | ' + BRAND,
  desc: 'Find ' + BRAND + ' addiction treatment serving cities across California — detox, residential, outpatient and sober living. In-network with most insurers. Call ' + PHONE + '.' };
const GUIDE_HUB = { id: 'p-guides', slug: 'addiction-treatment-guides', navLabel: 'Guides',
  title: 'Addiction Treatment Guides & Resources | ' + BRAND,
  desc: 'Plain-language guides to detox, levels of care, insurance and choosing rehab in California. Free, confidential help. Call ' + PHONE + '.' };
const SITEMAP_PAGE = { id: 'p-sitemap', slug: 'site-map',
  title: 'Site Map — All Pages | ' + BRAND,
  desc: 'Browse every page on californiatreatmentcenters.com — levels of care, treatments, insurance, California locations and guides.' };

/* ---- Slug map --------------------------------------------------- */
const slugMap = { 'p-home': '/' };
[].concat(EEAT, CONTENT).forEach(p => { slugMap[p.id] = '/' + p.slug; });
if (CITIES.length) slugMap[LOC_HUB.id] = '/' + LOC_HUB.slug;
if (ARTICLES.length) slugMap[GUIDE_HUB.id] = '/' + GUIDE_HUB.slug;
slugMap[SITEMAP_PAGE.id] = '/' + SITEMAP_PAGE.slug;

/* ---- helpers ---------------------------------------------------- */
function esc(s){ return String(s)
  .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g,'&amp;')
  .replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function stripTags(s){ return String(s).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim(); }

/* ---- Schema ----------------------------------------------------- */
const ORG_ID = ORIGIN + '/#organization';
const REVIEWER_ID = ORIGIN + '/#dr-tourtlotte';

const orgBase = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'MedicalOrganization'],
  '@id': ORG_ID,
  name: BRAND,
  url: ORIGIN + '/',
  telephone: '+1' + TEL,
  email: EMAIL,
  medicalSpecialty: 'Addiction Medicine',
  description: 'Drug and alcohol addiction treatment across California — detox, residential, PHP, IOP, sober living and sober companionship. In-network with most major insurers.',
  areaServed: { '@type': 'State', name: 'California' },
  founder: { '@type': 'Person', name: 'Joseph Casaceli' },
  availableService: ['Medical Detox','Residential Treatment','Partial Hospitalization','Intensive Outpatient','Sober Living','Sober Companionship','Medication-Assisted Treatment','Dual Diagnosis Treatment']
    .map(s => ({ '@type': 'MedicalProcedure', name: s })),
  contactPoint: [{ '@type': 'ContactPoint', telephone: '+1' + TEL, contactType: 'admissions', areaServed: 'US', availableLanguage: 'English' }],
  sameAs: SOCIAL.map(s => s.url)
};
if (LOCATIONS.length) {
  orgBase.location = LOCATIONS.map(l => ({
    '@type': 'MedicalClinic', name: l.name || (BRAND + ' — ' + l.city),
    address: { '@type': 'PostalAddress', streetAddress: l.street, addressLocality: l.city,
      addressRegion: 'CA', postalCode: l.zip, addressCountry: 'US' },
    telephone: '+1' + TEL
  }));
}
const ORG_LD = '<script type="application/ld+json">\n' + JSON.stringify(orgBase, null, 2) + '\n</script>';

const REVIEWER_LD = '<script type="application/ld+json">\n' + JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Person', '@id': REVIEWER_ID,
  name: 'Bradley Tourtlotte, MD', honorificSuffix: 'MD', jobTitle: 'Medical Director',
  url: ORIGIN + '/medical-director',
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Eastern Virginia Medical School' },
  identifier: { '@type': 'PropertyValue', propertyID: 'NPI', value: '1902955859' },
  worksFor: { '@id': ORG_ID }
}, null, 2) + '\n</script>';

function pageLd(meta, url){
  return '<script type="application/ld+json">\n' + JSON.stringify({
    '@context':'https://schema.org','@type':'MedicalWebPage',
    name: meta.title, description: meta.desc, url, inLanguage:'en-US',
    isPartOf:{ '@type':'WebSite', name: BRAND, url: ORIGIN+'/' },
    about:{ '@type':'MedicalCondition', name:'Substance Use Disorder' },
    publisher:{ '@id': ORG_ID }, lastReviewed:'2026-06-03',
    reviewedBy:{ '@id': REVIEWER_ID }
  }, null, 2) + '\n</script>';
}
function faqLd(faq){
  if(!faq||!faq.length) return '';
  return '<script type="application/ld+json">\n' + JSON.stringify({
    '@context':'https://schema.org','@type':'FAQPage',
    mainEntity: faq.map(f=>({ '@type':'Question', name: stripTags(f.q),
      acceptedAnswer:{ '@type':'Answer', text: stripTags(f.a) } }))
  }, null, 2) + '\n</script>';
}

/* ---- Decorative imagery (generic gradient panels, honest alt) --- */
/* Never claims to be a specific facility. img files generated below. */
const CAT_IMG = {
  level: 'images/california-drug-alcohol-rehab.svg',
  treatment: 'images/california-drug-alcohol-rehab.svg',
  insurance: 'images/california-rehab-insurance-coverage.svg',
  location: 'images/california-rehab-near-you.svg',
  article: 'images/california-rehab-near-you.svg'
};
function heroImg(meta){
  const src = meta.hero || CAT_IMG[meta.category] || 'images/california-drug-alcohol-rehab.svg';
  const kw = meta.h1 || meta.title || BRAND;
  // keyword-rich alt text reflecting each page's target search intent
  const alt = meta.heroAlt || (kw + ' | ' + BRAND);
  return `<img src="/${src}" alt="${esc(alt)}" title="${esc(kw)}" width="1200" height="420" loading="eager" style="width:100%;height:auto;border-radius:16px;margin:1.2rem 0 1.6rem"/>`;
}

/* ---- Shared chrome ---------------------------------------------- */
const crisisBar = `<div class="crisis-bar">If you or someone you know is in crisis, call or text <a href="tel:988">988</a> (Suicide &amp; Crisis Lifeline) &middot; Free, Confidential, 24/7</div>`;

function dd(items){ return items.map(p=>`        <a href="/${p.slug}">${p.navLabel||p.title}</a>`).join('\n'); }
function buildNav(){
  const insLinks = INS.slice().map(p=>`        <a href="/${p.slug}">${p.navLabel||p.title}</a>`).join('\n');
  // group cities for the wide Locations dropdown (first ~12 in nav; rest via hub)
  const navCities = CITIES.slice(0, 12);
  const cityCols = [];
  for(let i=0;i<navCities.length;i+=4) cityCols.push(navCities.slice(i,i+4));
  const cityColsHtml = cityCols.map(col =>
    `      <div class="dropdown-col">\n${col.map(p=>`        <a href="/${p.slug}">${p.navLabel||p.title}</a>`).join('\n')}\n      </div>`).join('\n');
  return `<nav aria-label="Main navigation">
  <div class="nav-inner">
    <a href="/" class="logo">California <span>Treatment Centers</span></a>
    <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <ul class="nav-menu">
      <li><span>Levels of Care <span class="arrow">&#9660;</span></span>
        <div class="dropdown">\n${dd(LEVELS)}\n        </div></li>
      <li><span>What We Treat <span class="arrow">&#9660;</span></span>
        <div class="dropdown">\n${dd(TREAT)}\n        </div></li>
      <li><span>Insurance <span class="arrow">&#9660;</span></span>
        <div class="dropdown">\n${insLinks}\n        </div></li>
      <li><span>Locations <span class="arrow">&#9660;</span></span>
        <div class="dropdown wide">\n${cityColsHtml}\n      <div class="dropdown-col"><div class="dropdown-col-title">More</div>\n        <a href="/${LOC_HUB.slug}">All California Locations</a></div>\n        </div></li>
      <li><a href="/${GUIDE_HUB.slug}">Guides</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li><span>About <span class="arrow">&#9660;</span></span>
        <div class="dropdown">\n${dd(EEAT)}\n        </div></li>
      <li><a href="tel:${TEL}" class="nav-cta">Call ${PHONE}</a></li>
    </ul>
  </div>
</nav>`;
}
function buildMobile(){
  const sec = (t, items)=>`  <div class="mob-section-title">${t}</div>\n`+items.map(p=>`  <a href="/${p.slug}">${p.navLabel||p.title}</a>`).join('\n')+'\n';
  return `<div class="mobile-menu" id="mobileMenu">
${sec('Levels of Care', LEVELS)}${sec('What We Treat', TREAT)}${sec('Insurance', INS)}  <div class="mob-section-title">Locations</div>
  <a href="/${LOC_HUB.slug}">All California Locations</a>
${CITIES.slice(0,12).map(p=>`  <a href="/${p.slug}">${p.navLabel||p.title}</a>`).join('\n')}
  <div class="mob-section-title">More</div>
  <a href="/${GUIDE_HUB.slug}">Guides</a>
${EEAT.map(p=>`  <a href="/${p.slug}">${p.navLabel||p.title}</a>`).join('\n')}
  <a href="mailto:${EMAIL}">&#9993; ${EMAIL}</a>
  <a href="tel:${TEL}" class="mobile-cta">&#128222; ${PHONE}</a>
</div>`;
}
function buildFooter(){
  return `<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="/" class="logo">California <span style="color:var(--gold-light)">Treatment Centers</span></a>
      <p style="margin-top:.8rem;color:rgba(255,255,255,.7);font-size:.9rem">Drug &amp; alcohol addiction treatment across California — detox, residential, outpatient, sober living and sober companionship. In-network with most major insurers.</p>
      <p style="margin-top:.8rem"><a href="tel:${TEL}" style="color:var(--gold-light);font-weight:700">${PHONE}</a></p>
      <div style="margin-top:1rem;display:flex;gap:.6rem">
        ${SOCIAL.map(s=>`<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.name}" title="${s.name}" style="display:inline-flex;width:38px;height:38px;align-items:center;justify-content:center;background:rgba(255,255,255,.1);border-radius:8px"><svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" aria-hidden="true">${s.icon}</svg></a>`).join('\n        ')}
      </div>
    </div>
    <div>
      <h4 style="color:#fff;margin-bottom:.6rem">Levels of Care</h4>
      ${LEVELS.map(p=>`<a href="/${p.slug}" style="display:block;color:rgba(255,255,255,.75);padding:.2rem 0;font-size:.9rem">${p.navLabel||p.title}</a>`).join('\n      ')}
    </div>
    <div>
      <h4 style="color:#fff;margin-bottom:.6rem">What We Treat</h4>
      ${TREAT.map(p=>`<a href="/${p.slug}" style="display:block;color:rgba(255,255,255,.75);padding:.2rem 0;font-size:.9rem">${p.navLabel||p.title}</a>`).join('\n      ')}
    </div>
    <div>
      <h4 style="color:#fff;margin-bottom:.6rem">Insurance</h4>
      ${INS.map(p=>`<a href="/${p.slug}" style="display:block;color:rgba(255,255,255,.75);padding:.2rem 0;font-size:.9rem">${p.navLabel||p.title}</a>`).join('\n      ')}
    </div>
  </div>
  <div style="padding:1.6rem 5% 0;border-top:1px solid rgba(255,255,255,.1);margin-top:1.6rem">
    <h4 style="color:#fff;margin-bottom:.7rem">Areas We Serve Across California</h4>
    <div style="columns:5;-webkit-columns:5;column-gap:1.2rem">
      ${CITIES.map(p=>`<a href="/${p.slug}" style="display:block;color:rgba(255,255,255,.6);padding:.16rem 0;font-size:.82rem;break-inside:avoid">${p.navLabel||p.title}</a>`).join('\n      ')}
      <a href="/${LOC_HUB.slug}" style="display:block;color:var(--gold-light);padding:.16rem 0;font-size:.82rem;font-weight:700;break-inside:avoid">All Locations &rarr;</a>
    </div>
  </div>
  <div class="footer-grid" style="padding-top:1.6rem;border-top:1px solid rgba(255,255,255,.1);margin-top:1.6rem">
    <div>
      <h4 style="color:#fff;margin-bottom:.6rem">Guides</h4>
      ${ARTICLES.map(p=>`<a href="/${p.slug}" style="display:block;color:rgba(255,255,255,.7);padding:.18rem 0;font-size:.85rem">${p.navLabel||p.title}</a>`).join('\n      ')}
      <a href="/${GUIDE_HUB.slug}" style="display:block;color:var(--gold-light);padding:.18rem 0;font-size:.85rem;font-weight:700">All Guides &rarr;</a>
    </div>
    <div>
      <h4 style="color:#fff;margin-bottom:.6rem">From the Blog</h4>
      ${BLOG.slice(0,8).map(p=>`<a href="/blog/${p.slug}" style="display:block;color:rgba(255,255,255,.7);padding:.18rem 0;font-size:.85rem">${esc((p.title||'').slice(0,42))}</a>`).join('\n      ')}
      <a href="/blog/" style="display:block;color:var(--gold-light);padding:.18rem 0;font-size:.85rem;font-weight:700">All Posts &rarr;</a>
    </div>
    <div>
      <h4 style="color:#fff;margin-bottom:.6rem">Company</h4>
      ${EEAT.map(p=>`<a href="/${p.slug}" style="display:block;color:rgba(255,255,255,.7);padding:.18rem 0;font-size:.85rem">${p.navLabel||p.title}</a>`).join('\n      ')}
      <a href="/verify-insurance" style="display:block;color:rgba(255,255,255,.7);padding:.18rem 0;font-size:.85rem">Verify Insurance</a>
      <a href="/${SITEMAP_PAGE.slug}" style="display:block;color:rgba(255,255,255,.7);padding:.18rem 0;font-size:.85rem">Site Map</a>
    </div>
  </div>
  <div style="text-align:center;color:rgba(255,255,255,.5);font-size:.82rem;padding:1.5rem 5% 0;border-top:1px solid rgba(255,255,255,.1);margin-top:1.5rem">
    &copy; 2026 ${BRAND}. All rights reserved. Owner: Joseph Casaceli. &middot; This site is for general information and is not medical advice. If you are in crisis, call or text 988.
  </div>
</footer>`;
}

const pageScript = `<script>
function closeMob(){var mm=document.getElementById('mobileMenu'),hb=document.getElementById('hamburger');if(mm)mm.classList.remove('open');if(hb){hb.classList.remove('open');hb.setAttribute('aria-expanded','false');}document.body.style.overflow='';}
function scrollSec(c){var el=document.getElementById(c)||document.querySelector('.'+c);if(el){window.scrollTo({top:el.getBoundingClientRect().top+window.pageYOffset-80,behavior:'smooth'});}}
document.addEventListener('DOMContentLoaded',function(){
  var hb=document.getElementById('hamburger'),mm=document.getElementById('mobileMenu');
  if(hb&&mm){hb.addEventListener('click',function(){var o=mm.classList.toggle('open');hb.classList.toggle('open',o);hb.setAttribute('aria-expanded',String(o));document.body.style.overflow=o?'hidden':'';});}
  window.addEventListener('resize',function(){if(window.innerWidth>768)closeMob();});
  document.addEventListener('click',function(e){var q=e.target.closest('.faq-q');if(!q)return;var it=q.parentElement,open=it.classList.contains('open');var pg=it.closest('.faq-list')||document;var os=pg.querySelectorAll('.faq-item.open');for(var i=0;i<os.length;i++)os[i].classList.remove('open');if(!open)it.classList.add('open');});
  document.addEventListener('submit',function(e){
    if(e.target.tagName!=='FORM')return;
    e.preventDefault();
    var form=e.target, b=form.querySelector('.submit-btn');
    try{
      var body=new URLSearchParams(new FormData(form));
      if(!body.has('form-name'))body.append('form-name', form.getAttribute('name')||'benefits-verification');
      fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:body.toString()}).catch(function(){});
    }catch(err){}
    if(b){b.textContent='Submitted! We will call you shortly.';b.style.background='var(--green)';b.disabled=true;}
  });
});
</script>
<!-- Tawk.to live chat -->
<script type="text/javascript">
var Tawk_API=Tawk_API||{},Tawk_LoadStart=new Date();
(function(){var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];s1.async=true;s1.src='https://embed.tawk.to/6a1de5415ce10b1c305094a2/default';s1.charset='UTF-8';s1.setAttribute('crossorigin','*');s0.parentNode.insertBefore(s1,s0);})();
</script>`;

const NAV = buildNav(), MOBILE = buildMobile(), FOOTER = buildFooter();

const ctaBlock = `
<section class="verify-section" id="verify-section" style="background:var(--sky)">
  <div class="container" style="text-align:center">
    <div class="section-label">Free &amp; Confidential</div>
    <h2>Verify Your Insurance — Free, No Obligation</h2>
    <p class="section-sub" style="margin:0 auto 2rem">We're in-network with most major insurers. We confirm your benefits and report back, usually within a few hours. HIPAA &amp; 42 CFR Part 2 protected.</p>
    <a href="tel:${TEL}" class="btn-primary">Call ${PHONE}</a>
  </div>
</section>`;
const reviewByline = `<p class="review-byline" style="color:var(--muted);font-size:.9rem;border-left:3px solid var(--blue);padding-left:.8rem;margin:.2rem 0 1.5rem">Medically reviewed by <a href="/medical-director" style="color:var(--blue);font-weight:600">Bradley Tourtlotte, MD</a> &middot; Written by the <a href="/clinical-team" style="color:var(--blue);font-weight:600">${BRAND} clinical team</a> &middot; Last reviewed June 2026</p>`;
function faqSection(faq){
  if(!faq||!faq.length) return '';
  return `\n<section class="faq-bg" id="faq-section"><div class="container"><div class="section-label">Frequently Asked Questions</div><h2>Frequently Asked Questions</h2><div class="faq-list">\n`+
    faq.map(f=>`  <div class="faq-item"><div class="faq-q" aria-expanded="false">${f.q} <span class="faq-arrow">▾</span></div><div class="faq-a">${f.a}</div></div>`).join('\n')+
    `\n</div></div></section>`;
}

/* ---- Page renderer ---------------------------------------------- */
function renderPage(meta, innerHTML, extraSchema){
  const url = meta.slug==='' || meta.slug==null ? ORIGIN+'/' : ORIGIN+'/'+meta.slug;
  const schemas = [ORG_LD, pageLd(meta,url)].concat(extraSchema||[]).filter(Boolean).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.desc)}"/>
<meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large"/>
<link rel="canonical" href="${url}"/>
<link rel="icon" href="/favicon.ico" sizes="32x32"/>
<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"/>
<link rel="icon" type="image/png" sizes="256x256" href="/favicon-256.png"/>
<link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${url}"/>
<meta property="og:title" content="${esc(meta.title)}"/>
<meta property="og:description" content="${esc(meta.desc)}"/>
<meta property="og:site_name" content="${BRAND}"/>
<meta property="og:locale" content="en_US"/>
<meta property="og:image" content="${ORIGIN}/og-image.png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="${esc(meta.title)}"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${esc(meta.title)}"/>
<meta name="twitter:description" content="${esc(meta.desc)}"/>
<meta name="twitter:image" content="${ORIGIN}/og-image.png"/>
${schemas}
<style>\n${styles}\n</style>
</head>
<body>
${crisisBar}
${NAV}
${MOBILE}
${innerHTML}
${FOOTER}
${pageScript}
</body>
</html>
`;
}

/* ---- Content page inner ----------------------------------------- */
function contentInner(meta){
  const isGuide = meta.category==='article'||meta.category==='level'||meta.category==='insurance'||meta.category==='treatment';
  return `<section><div class="container">`+
    (meta.eyebrow?`<div class="section-label">${meta.eyebrow}</div>`:'')+
    `<h1>${meta.h1||meta.title}</h1>`+
    (isGuide?reviewByline:'')+ heroImg(meta) +
    `</div></section>`+
    `<section style="padding-top:0"><div class="container">\n${meta.bodyHtml}\n</div></section>`+
    faqSection(meta.faq)+ctaBlock;
}

/* =================================================================== */
let count=0;
const write=(f,html)=>{ fs.writeFileSync(path.join(OUT,f),html); count++; };

/* Home */
write('index.html', renderPage({slug:'',title:HOME.title,desc:HOME.desc}, HOME.html, [faqLd(HOME.faq)]));

/* E-E-A-T */
EEAT.forEach(m=> write(m.slug+'.html', renderPage(m, m.html, m.id==='p-medical-director'?[REVIEWER_LD]:[])));

/* Content pages */
CONTENT.filter(m=>m.category!=='blog').forEach(m=> {
  const crumb = '<script type="application/ld+json">\n' + JSON.stringify({
    '@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[
      {'@type':'ListItem',position:1,name:'Home',item:ORIGIN+'/'},
      {'@type':'ListItem',position:2,name:stripTags(m.h1||m.title).split('|')[0].trim(),item:ORIGIN+'/'+m.slug}
    ]}, null, 2) + '\n</script>';
  write(m.slug+'.html', renderPage(m, contentInner(m), [faqLd(m.faq), crumb]));
});

/* Locations hub */
if(CITIES.length){
  const cards = CITIES.map(p=>`      <a class="card" href="/${p.slug}" style="display:block"><h3 style="color:var(--blue)">${p.navLabel||p.h1||p.title}</h3><p style="color:var(--muted);font-size:.9rem">${esc(p.desc)}</p></a>`).join('\n');
  const inner=`<section><div class="container"><div class="section-label">Locations</div><h1>Drug &amp; Alcohol Rehab Across California</h1><p class="section-sub">${BRAND} serves communities throughout California with detox, residential, outpatient, sober living and sober companionship. In-network with most major insurers.</p>${heroImg({})}<div class="card-grid-4">\n${cards}\n</div></div></section>`+ctaBlock;
  write(LOC_HUB.slug+'.html', renderPage(LOC_HUB, inner));
}
/* Guides hub */
if(ARTICLES.length){
  const cards = ARTICLES.map(p=>`      <a class="card" href="/${p.slug}" style="display:block"><h3 style="color:var(--blue)">${p.navLabel||p.h1||p.title}</h3><p style="color:var(--muted);font-size:.9rem">${esc(p.desc)}</p></a>`).join('\n');
  const inner=`<section><div class="container"><div class="section-label">Resources</div><h1>Addiction Treatment Guides &amp; Resources</h1><p class="section-sub">Plain-language guides to detox, levels of care, insurance and choosing the right treatment in California.</p><div class="card-grid-4">\n${cards}\n</div></div></section>`+ctaBlock;
  write(GUIDE_HUB.slug+'.html', renderPage(GUIDE_HUB, inner));
}

/* Blog — dated, sourced posts with Article schema, at /blog/<slug> */
if (BLOG.length) {
  fs.mkdirSync(path.join(OUT,'blog'), { recursive: true });
  const D = ['2026-06-01','2026-06-02','2026-06-03','2026-06-04','2026-06-05','2026-06-06','2026-06-07','2026-06-08','2026-06-09','2026-06-10','2026-06-11','2026-06-12'];
  BLOG.forEach((p,i)=>{ p.date = p.date || D[Math.min(D.length-1, Math.round(i*(D.length-1)/Math.max(1,BLOG.length-1)))]; });
  const sorted = BLOG.slice().sort((a,b)=> a.date<b.date?1:-1);
  BLOG.forEach(p=>{
    const url = ORIGIN + '/blog/' + p.slug;
    const author = p.author || (BRAND + ' Editorial Team');
    const byline = `<p class="review-byline" style="color:var(--muted);font-size:.9rem;border-left:3px solid var(--gold);padding-left:.8rem;margin:.2rem 0 1.5rem">By ${esc(author)} &middot; Published ${p.date} &middot; Medically reviewed by <a href="/medical-director" style="color:var(--gold);font-weight:600">Bradley Tourtlotte, MD</a></p>`;
    const sources = (p.sources&&p.sources.length) ? `<section style="padding-top:0"><div class="container" style="max-width:780px"><h2>Sources &amp; References</h2><ul>${p.sources.map(s=>`<li style="margin:.3rem 0"><a href="${s.url}" target="_blank" rel="noopener">${esc(s.name)}</a></li>`).join('')}</ul></div></section>` : '';
    const inner = `<section><div class="container" style="max-width:820px"><div class="section-label">Blog</div><h1>${esc(p.h1||p.title)}</h1>${byline}</div></section>` +
      `<section style="padding-top:0"><div class="container" style="max-width:820px">\n${p.bodyHtml}\n</div></section>` +
      faqSection(p.faq) + sources + ctaBlock;
    const articleLd = '<script type="application/ld+json">\n' + JSON.stringify({
      '@context':'https://schema.org','@type':'BlogPosting', headline:p.title, description:p.desc,
      datePublished:p.date, dateModified:p.date, inLanguage:'en-US',
      author:{'@type':'Organization', name:author}, publisher:{'@id':ORG_ID},
      image:ORIGIN+'/og-image.png', mainEntityOfPage:url, reviewedBy:{'@id':REVIEWER_ID}
    }, null, 2) + '\n</script>';
    write('blog/'+p.slug+'.html', renderPage({slug:'blog/'+p.slug, title:p.title, desc:p.desc}, inner, [articleLd, faqLd(p.faq)]));
  });
  const items = sorted.map(p=>`<a class="card" href="/blog/${p.slug}" style="display:block"><p style="color:var(--muted);font-size:.78rem;margin-bottom:.3rem">${p.date}</p><h3 style="color:var(--blue)">${esc(p.title)}</h3><p style="color:var(--muted);font-size:.9rem">${esc(p.desc)}</p></a>`).join('\n');
  const hubInner = `<section><div class="container"><div class="section-label">Blog</div><h1>Addiction &amp; Recovery Blog</h1><p class="section-sub">Expert, sourced articles on addiction, treatment and recovery — reviewed by our medical director.</p><div class="card-grid-4">\n${items}\n</div></div></section>` + ctaBlock;
  write('blog/index.html', renderPage({slug:'blog/', title:BLOG_HUB.title, desc:BLOG_HUB.desc}, hubInner));
}

/* HTML site map — internal-linking hub to aid crawl/discovery */
{
  const li = items => '<ul style="columns:2;-webkit-columns:2;list-style:none;padding:0;margin:.5rem 0 2.2rem">' +
    items.map(p=>`<li style="padding:.32rem 0;break-inside:avoid"><a href="/${p.slug}" style="color:var(--blue);font-weight:500">${esc((p.navLabel||p.h1||p.title).replace(/<[^>]+>/g,'').split('|')[0].trim())}</a></li>`).join('') + '</ul>';
  const inner = `<section><div class="container"><div class="section-label">Site Map</div><h1>Browse All Pages</h1>` +
    `<p class="section-sub">Every page on ${BRAND.toLowerCase().replace(/ /g,'')}.com, in one place.</p>` +
    (LEVELS.length?`<h2>Levels of Care</h2>${li(LEVELS)}`:'') +
    (TREAT.length?`<h2>What We Treat</h2>${li(TREAT)}`:'') +
    (INS.length?`<h2>Insurance</h2>${li(INS)}`:'') +
    (CITIES.length?`<h2>California Locations</h2>${li(CITIES.concat([{slug:LOC_HUB.slug,navLabel:'All Locations'}]))}`:'') +
    (ARTICLES.length?`<h2>Guides</h2>${li(ARTICLES.concat([{slug:GUIDE_HUB.slug,navLabel:'All Guides'}]))}`:'') +
    (BLOG.length?`<h2>Blog</h2><ul style="columns:2;-webkit-columns:2;list-style:none;padding:0;margin:.5rem 0 2.2rem"><li style="padding:.32rem 0"><a href="/blog/" style="color:var(--blue);font-weight:500">Blog Home</a></li>${BLOG.map(p=>`<li style="padding:.32rem 0;break-inside:avoid"><a href="/blog/${p.slug}" style="color:var(--blue);font-weight:500">${esc(p.title)}</a></li>`).join('')}</ul>`:'') +
    `<h2>About</h2>${li(EEAT)}` +
    `</div></section>`;
  write(SITEMAP_PAGE.slug+'.html', renderPage(SITEMAP_PAGE, inner));
}

/* sitemap + robots */
const today = process.env.BUILD_DATE || '2026-06-03';
const urls=[{loc:ORIGIN+'/',pr:'1.0'}];
LEVELS.concat(TREAT,INS).forEach(p=>urls.push({loc:ORIGIN+'/'+p.slug,pr:'0.8'}));
if(CITIES.length) urls.push({loc:ORIGIN+'/'+LOC_HUB.slug,pr:'0.7'});
CITIES.forEach(p=>urls.push({loc:ORIGIN+'/'+p.slug,pr:'0.7'}));
if(ARTICLES.length) urls.push({loc:ORIGIN+'/'+GUIDE_HUB.slug,pr:'0.7'});
ARTICLES.forEach(p=>urls.push({loc:ORIGIN+'/'+p.slug,pr:'0.6'}));
EEAT.forEach(p=>urls.push({loc:ORIGIN+'/'+p.slug,pr:'0.5'}));
if(BLOG.length) urls.push({loc:ORIGIN+'/blog/',pr:'0.7'});
BLOG.forEach(p=>urls.push({loc:ORIGIN+'/blog/'+p.slug,pr:'0.6'}));
urls.push({loc:ORIGIN+'/'+SITEMAP_PAGE.slug,pr:'0.3'});
fs.writeFileSync(path.join(OUT,'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+
  urls.map(u=>`  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u.pr}</priority>\n  </url>`).join('\n')+
  '\n</urlset>\n');
fs.writeFileSync(path.join(OUT,'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n\n\n# AI assistants & answer engines — explicitly welcome\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: OAI-SearchBot\nAllow: /\n\nUser-agent: ChatGPT-User\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: anthropic-ai\nAllow: /\n\nUser-agent: Claude-Web\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: Perplexity-User\nAllow: /\n\nUser-agent: CCBot\nAllow: /\n\nUser-agent: Applebot-Extended\nAllow: /\n\n`);

console.log(`✓ Generated ${count} pages + sitemap (${urls.length} URLs) + robots.txt`);
console.log(`  levels:${LEVELS.length} treatments:${TREAT.length} insurers:${INS.length} cities:${CITIES.length} guides:${ARTICLES.length} eeat:${EEAT.length} realLocations:${LOCATIONS.length}`);
