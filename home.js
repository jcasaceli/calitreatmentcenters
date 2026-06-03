/* Home page content for californiatreatmentcenters.com */
const PHONE = '213-321-6518', TEL = '2133216518';

module.exports = {
  title: 'California Drug & Alcohol Rehab | Detox, Residential & Outpatient | California Treatment Centers',
  desc: 'California Treatment Centers offers detox, residential, outpatient, sober living & sober companionship across California. In-network with most major insurers. Call ' + PHONE + '.',
  faq: [
    { q: 'Do you take insurance for rehab?', a: 'Yes. We are in-network with most major insurers, including Cigna, Aetna, Blue Cross Blue Shield, Magellan, Kaiser and more. We verify your specific benefits for free before you start, so you know your coverage up front.' },
    { q: 'What levels of care do you offer?', a: 'We offer the full continuum of care: medical detox, residential (inpatient) treatment, partial hospitalization (PHP), intensive outpatient (IOP), standard outpatient, sober living, and sober companionship — so we can match the right level of support to each person.' },
    { q: 'Where in California are you located?', a: 'We have multiple locations across California and serve clients statewide. Call us and we will connect you with the most appropriate program and location for your needs.' },
    { q: 'Is treatment confidential?', a: 'Yes. Your care is protected under HIPAA, and substance use records have extra protection under federal law (42 CFR Part 2). We never share your information without your consent.' },
    { q: 'How fast can I start?', a: 'Often the same day or next day. Call ' + PHONE + ' for a free, confidential assessment and benefits check — we will walk you through your options and next steps.' }
  ],
  html: `
<section class="hero" aria-label="Hero">
  <div class="hero-grid">
    <div class="hero-content">
      <div class="hero-badge">🌅 Multiple Locations Across California</div>
      <h1>Drug &amp; Alcohol Treatment That Meets You Where You Are</h1>
      <p class="hero-sub">California Treatment Centers provides medically supervised detox, residential, and outpatient care across California — with sober living and sober companionship to support every step of recovery. We're in-network with most major insurers, and we'll verify your benefits for free.</p>
      <div class="hero-btns">
        <a href="tel:${TEL}" class="btn-primary">Call ${PHONE}</a>
        <a href="#verify-section" class="btn-secondary" onclick="scrollSec('verify-section');return false;">Verify Insurance Free</a>
      </div>
      <img src="/images/hero-recovery.svg" alt="Calm California sunrise representing a fresh start in addiction recovery with California Treatment Centers" width="1200" height="420" loading="eager" style="width:100%;height:auto;border-radius:14px;margin-top:1.6rem"/>
    </div>
    <div class="hero-card">
      <h3 style="margin-bottom:.6rem">Free Benefits Check</h3>
      <p style="color:var(--muted);font-size:.92rem;margin-bottom:1rem">In-network with most major insurers. Find out what your plan covers — confidentially, at no cost.</p>
      <form onsubmit="return false">
        <div class="form-group"><label>Your Name</label><input type="text" required/></div>
        <div class="form-group"><label>Phone</label><input type="tel" required/></div>
        <div class="form-group"><label>Insurance Provider</label>
          <select><option value="">— Select —</option><option>Cigna</option><option>Aetna</option><option>Blue Cross Blue Shield</option><option>Magellan</option><option>Kaiser Permanente</option><option>Anthem</option><option>Health Net</option><option>UnitedHealthcare</option><option>Humana</option><option>Other / Not sure</option></select>
        </div>
        <button type="submit" class="submit-btn">Verify My Benefits →</button>
        <p class="form-disclaimer">🔒 HIPAA &amp; 42 CFR Part 2 compliant. Never sold or shared.</p>
      </form>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-label">In-Network With Most Major Insurers</div>
    <h2>Your Insurance Likely Covers Treatment</h2>
    <p class="section-sub">We work with most major insurance providers and verify your benefits for free — so cost never stands between you and care.</p>
    <div class="card-grid-4">
      <div class="card"><h3>Cigna</h3><p>In-network coverage for detox, residential and outpatient care.</p></div>
      <div class="card"><h3>Aetna</h3><p>Coverage for medically necessary addiction and mental health treatment.</p></div>
      <div class="card"><h3>Blue Cross Blue Shield</h3><p>Detox, inpatient and outpatient rehab benefits for members.</p></div>
      <div class="card"><h3>Magellan</h3><p>Behavioral health coverage for substance use treatment.</p></div>
      <div class="card"><h3>Kaiser Permanente</h3><p>Addiction treatment under behavioral health benefits.</p></div>
      <div class="card"><h3>Anthem</h3><p>In-network options for the full continuum of care.</p></div>
      <div class="card"><h3>Health Net</h3><p>Coverage for detox and rehab across California.</p></div>
      <div class="card"><h3>UnitedHealthcare</h3><p>Behavioral health and addiction treatment benefits.</p></div>
    </div>
    <p style="margin-top:1.4rem"><a href="/verify-insurance" class="btn-primary">Check Your Coverage</a></p>
  </div>
</section>

<section style="background:var(--gray)">
  <div class="container">
    <div class="section-label">All Levels of Care</div>
    <h2>A Complete Continuum of Recovery</h2>
    <p class="section-sub">From medical stabilization to long-term support, we offer every level of care under one trusted team.</p>
    <div class="card-grid-4">
      <a class="card" href="/medical-detox"><h3 style="color:var(--blue)">Medical Detox</h3><p>24/7 medically supervised withdrawal management.</p></a>
      <a class="card" href="/residential-treatment"><h3 style="color:var(--blue)">Residential</h3><p>Immersive inpatient care in a structured setting.</p></a>
      <a class="card" href="/partial-hospitalization-php"><h3 style="color:var(--blue)">PHP</h3><p>Full-day structured treatment with evenings at home or housing.</p></a>
      <a class="card" href="/intensive-outpatient-iop"><h3 style="color:var(--blue)">IOP</h3><p>Flexible intensive outpatient that fits around work and family.</p></a>
      <a class="card" href="/outpatient-treatment"><h3 style="color:var(--blue)">Outpatient</h3><p>Ongoing therapy and relapse-prevention support.</p></a>
      <a class="card" href="/sober-living"><h3 style="color:var(--blue)">Sober Living</h3><p>Safe, substance-free housing during recovery.</p></a>
      <a class="card" href="/sober-companionship"><h3 style="color:var(--blue)">Sober Companionship</h3><p>One-on-one support during transitions and high-risk moments.</p></a>
      <a class="card" href="/medication-assisted-treatment"><h3 style="color:var(--blue)">MAT</h3><p>Evidence-based medication support for opioid and alcohol use.</p></a>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-label">What We Treat</div>
    <h2>Specialized, Evidence-Based Care</h2>
    <p class="section-sub">We treat the full range of substance use and co-occurring mental health conditions.</p>
    <div class="card-grid-4">
      <a class="card" href="/alcohol-rehab"><h3 style="color:var(--blue)">Alcohol</h3></a>
      <a class="card" href="/opioid-rehab"><h3 style="color:var(--blue)">Opioids &amp; Heroin</h3></a>
      <a class="card" href="/fentanyl-rehab"><h3 style="color:var(--blue)">Fentanyl</h3></a>
      <a class="card" href="/cocaine-rehab"><h3 style="color:var(--blue)">Cocaine</h3></a>
      <a class="card" href="/meth-rehab"><h3 style="color:var(--blue)">Methamphetamine</h3></a>
      <a class="card" href="/benzodiazepine-rehab"><h3 style="color:var(--blue)">Benzodiazepines</h3></a>
      <a class="card" href="/prescription-drug-rehab"><h3 style="color:var(--blue)">Prescription Drugs</h3></a>
      <a class="card" href="/dual-diagnosis-treatment"><h3 style="color:var(--blue)">Dual Diagnosis</h3></a>
    </div>
  </div>
</section>

<section style="background:var(--navy);color:#fff">
  <div class="container">
    <div class="section-label" style="color:var(--gold-light)">Why California Treatment Centers</div>
    <h2 style="color:#fff">Trusted, Compassionate, Statewide</h2>
    <div class="card-grid-4" style="margin-top:1.5rem">
      <div class="card" style="background:rgba(255,255,255,.06);border:none;color:#fff"><h3>Multiple Locations</h3><p style="color:rgba(255,255,255,.8)">Programs across California, serving clients statewide.</p></div>
      <div class="card" style="background:rgba(255,255,255,.06);border:none;color:#fff"><h3>Medical Leadership</h3><p style="color:rgba(255,255,255,.8)">Care overseen by our Medical Director, Bradley Tourtlotte, MD.</p></div>
      <div class="card" style="background:rgba(255,255,255,.06);border:none;color:#fff"><h3>In-Network</h3><p style="color:rgba(255,255,255,.8)">We work with most major insurers and verify benefits free.</p></div>
      <div class="card" style="background:rgba(255,255,255,.06);border:none;color:#fff"><h3>Whole-Person Care</h3><p style="color:rgba(255,255,255,.8)">Detox through sober living, plus co-occurring mental health treatment.</p></div>
    </div>
  </div>
</section>`
};
