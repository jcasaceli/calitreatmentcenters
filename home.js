/* Home page content for californiatreatmentcenters.com — luxury editorial layout */
const PHONE = '213-321-6518', TEL = '2133216518';

module.exports = {
  title: 'Luxury Drug & Alcohol Rehab in California | Detox, Residential & Outpatient | California Treatment Centers',
  desc: 'Discreet, physician-led drug & alcohol treatment across California — detox, residential, outpatient, sober living. In-network with most major insurers. Call ' + PHONE + '.',
  faq: [
    { q: 'Do you take insurance for rehab?', a: 'Yes. We are in-network with most major insurers, including Cigna, Aetna, Blue Cross Blue Shield, Magellan, Kaiser and more. We verify your specific benefits for free before you start.' },
    { q: 'What levels of care do you offer?', a: 'The full continuum: medical detox, residential (inpatient) treatment, partial hospitalization (PHP), intensive outpatient (IOP), standard outpatient, sober living, and sober companionship.' },
    { q: 'Where in California are you located?', a: 'We have multiple locations across California and serve clients statewide. Call us and we will match you to the right program and location for your needs.' },
    { q: 'Is treatment confidential?', a: 'Yes. Your care is protected under HIPAA, and substance use records have additional protection under federal law (42 CFR Part 2). We never share your information without your consent.' },
    { q: 'How quickly can I start?', a: 'Often the same day or next day. Call ' + PHONE + ' for a free, confidential assessment and benefits check.' }
  ],
  html: `
<!-- ░░ FULL-BLEED HERO ░░ -->
<section class="lux-hero">
  <div class="lux-hero-inner">
    <p class="lux-eyebrow">Luxury Addiction Treatment · California</p>
    <h1 class="lux-display">Luxury Drug &amp; Alcohol Treatment in California</h1>
    <p class="lux-lead">Discreet, physician-led detox, residential, and outpatient care across California — delivered with the privacy, comfort, and clinical excellence recovery deserves. In-network with most major insurers.</p>
    <div class="lux-cta-row">
      <a href="tel:${TEL}" class="btn-primary">Call ${PHONE}</a>
      <a href="#verify-section" class="btn-ghost" onclick="scrollSec('verify-section');return false;">Verify Insurance</a>
    </div>
  </div>
</section>

<!-- ░░ TRUST STRIP ░░ -->
<div class="lux-trust"><b>Confidential</b> care<span class="sep">&bull;</span>HIPAA &amp; 42 CFR Part 2 protected<span class="sep">&bull;</span><b>In-network</b> with most major insurers<span class="sep">&bull;</span>Multiple California locations</div>

<!-- ░░ BAND 1 — A Higher Standard ░░ -->
<div class="lux-band">
  <div class="lux-text">
    <p class="lux-eyebrow">A Higher Standard of Care</p>
    <h2>Recovery in a Setting Worthy of It</h2>
    <p>At California Treatment Centers, healing happens in calm, comfortable surroundings with a team that treats every client with dignity. Our physician-led programs pair evidence-based medicine with genuine, individualized attention — so you can focus entirely on getting well.</p>
    <p>From your first call to life after treatment, you are guided by people who understand recovery. This is general information and not medical advice; severe alcohol or benzodiazepine withdrawal requires medical supervision.</p>
    <a href="/medical-detox" class="btn-ghost-dark">Explore Our Programs</a>
  </div>
  <div class="lux-img"><img src="/images/california-rehab-near-you.svg" alt="Calm, private luxury drug and alcohol recovery setting in California | California Treatment Centers" loading="lazy" width="800" height="600"/></div>
</div>

<!-- ░░ LEVELS OF CARE — editorial list ░░ -->
<section><div class="container">
  <p class="lux-eyebrow">The Full Continuum</p>
  <h2>Levels of Care</h2>
  <div class="lux-list">
    <a href="/medical-detox"><span class="lux-svc">Medical Detox</span><span class="lux-svc-desc">24/7 physician-supervised withdrawal management.</span><span class="lux-arrow">&rarr;</span></a>
    <a href="/residential-treatment"><span class="lux-svc">Residential Treatment</span><span class="lux-svc-desc">Immersive inpatient care in a structured, private setting.</span><span class="lux-arrow">&rarr;</span></a>
    <a href="/partial-hospitalization-php"><span class="lux-svc">Partial Hospitalization</span><span class="lux-svc-desc">Full-day structured treatment with evenings in housing.</span><span class="lux-arrow">&rarr;</span></a>
    <a href="/intensive-outpatient-iop"><span class="lux-svc">Intensive Outpatient</span><span class="lux-svc-desc">Flexible, intensive care that fits around work and family.</span><span class="lux-arrow">&rarr;</span></a>
    <a href="/outpatient-treatment"><span class="lux-svc">Outpatient</span><span class="lux-svc-desc">Ongoing therapy and relapse-prevention support.</span><span class="lux-arrow">&rarr;</span></a>
    <a href="/sober-living"><span class="lux-svc">Sober Living</span><span class="lux-svc-desc">Safe, substance-free residences during recovery.</span><span class="lux-arrow">&rarr;</span></a>
    <a href="/sober-companionship"><span class="lux-svc">Sober Companionship</span><span class="lux-svc-desc">One-on-one support through transitions and high-risk moments.</span><span class="lux-arrow">&rarr;</span></a>
    <a href="/medication-assisted-treatment"><span class="lux-svc">Medication-Assisted Treatment</span><span class="lux-svc-desc">Evidence-based medication support for opioid and alcohol use.</span><span class="lux-arrow">&rarr;</span></a>
  </div>
</div></section>

<!-- ░░ BAND 2 (reverse) — What We Treat ░░ -->
<div class="lux-band reverse">
  <div class="lux-img"><img src="/images/california-drug-alcohol-rehab.svg" alt="Evidence-based treatment for alcohol, opioid, and substance use disorders in California | California Treatment Centers" loading="lazy" width="800" height="600"/></div>
  <div class="lux-text right">
    <p class="lux-eyebrow">What We Treat</p>
    <h2>Specialized, Evidence-Based Treatment</h2>
    <p>We treat the full range of substance use and co-occurring mental health conditions — with individualized plans built around each person's history, health, and goals.</p>
    <div class="lux-list">
      <a href="/alcohol-rehab"><span class="lux-svc">Alcohol</span><span class="lux-arrow">&rarr;</span></a>
      <a href="/opioid-rehab"><span class="lux-svc">Opioids &amp; Heroin</span><span class="lux-arrow">&rarr;</span></a>
      <a href="/fentanyl-rehab"><span class="lux-svc">Fentanyl</span><span class="lux-arrow">&rarr;</span></a>
      <a href="/cocaine-rehab"><span class="lux-svc">Cocaine</span><span class="lux-arrow">&rarr;</span></a>
      <a href="/dual-diagnosis-treatment"><span class="lux-svc">Dual Diagnosis</span><span class="lux-arrow">&rarr;</span></a>
    </div>
  </div>
</div>

<!-- ░░ DARK FEATURE BAND — Why Us ░░ -->
<section class="lux-dark"><div class="container">
  <p class="lux-eyebrow">Why California Treatment Centers</p>
  <h2 style="color:#fff">Premium Care, Without Compromise</h2>
  <div class="lux-features">
    <div><span class="num">01</span><h3>Statewide</h3><p>Multiple California locations, serving clients across the state.</p></div>
    <div><span class="num">02</span><h3>Physician-Led</h3><p>Care overseen by our Medical Director, Bradley Tourtlotte, MD.</p></div>
    <div><span class="num">03</span><h3>In-Network</h3><p>We work with most major insurers and verify benefits free.</p></div>
    <div><span class="num">04</span><h3>Whole-Person</h3><p>Detox through sober living, plus co-occurring mental health care.</p></div>
  </div>
</div></section>

<!-- ░░ INSURANCE ░░ -->
<section><div class="container">
  <p class="lux-eyebrow">In-Network With Most Major Insurers</p>
  <h2>Your Insurance Likely Covers Treatment</h2>
  <p class="section-sub">We work with most major insurance providers and verify your benefits for free — so cost never stands between you and care.</p>
  <div class="lux-insurers">
    <span>Cigna</span><span>Aetna</span><span>Blue Cross Blue Shield</span><span>Magellan</span><span>Kaiser Permanente</span><span>Anthem</span><span>Health Net</span><span>UnitedHealthcare</span><span>Humana</span>
  </div>
  <p style="margin-top:2rem"><a href="/verify-insurance" class="btn-primary">Check Your Coverage</a></p>
</div></section>

<!-- ░░ VERIFY / CONTACT ░░ -->
<section class="verify-section" id="verify-section" style="background:var(--gray)"><div class="container">
  <div style="max-width:560px">
    <p class="lux-eyebrow">Free &amp; Confidential</p>
    <h2>Verify Your Benefits</h2>
    <p class="section-sub">Tell us a little and we'll confirm your coverage — usually within a few hours. HIPAA &amp; 42 CFR Part 2 protected; never sold or shared.</p>
    <form onsubmit="return false">
      <div class="form-group"><label>Your Name</label><input type="text" required/></div>
      <div class="form-group"><label>Phone</label><input type="tel" required/></div>
      <div class="form-group"><label>Insurance Provider</label>
        <select><option value="">— Select —</option><option>Cigna</option><option>Aetna</option><option>Blue Cross Blue Shield</option><option>Magellan</option><option>Kaiser Permanente</option><option>Anthem</option><option>Health Net</option><option>UnitedHealthcare</option><option>Humana</option><option>Other / Not sure</option></select>
      </div>
      <button type="submit" class="submit-btn">Verify My Benefits</button>
      <p class="form-disclaimer" style="margin-top:1rem;color:var(--muted);font-size:.85rem">🔒 Or call <a href="tel:${TEL}" style="color:var(--gold);font-weight:700">${PHONE}</a> — available 24/7.</p>
    </form>
  </div>
</div></section>`
};
