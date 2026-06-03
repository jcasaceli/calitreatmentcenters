/* E-E-A-T pages for californiatreatmentcenters.com */
const PHONE = '213-321-6518', TEL = '2133216518', BRAND = 'California Treatment Centers';

const cta = `
<section class="verify-section" id="verify-section" style="background:var(--sky)">
  <div class="container" style="text-align:center">
    <div class="section-label">Free &amp; Confidential</div>
    <h2>Verify Your Insurance — Free, No Obligation</h2>
    <p class="section-sub" style="margin:0 auto 2rem">We're in-network with most major insurers and confirm your benefits, usually within a few hours.</p>
    <a href="tel:${TEL}" class="btn-primary">Call ${PHONE}</a>
  </div>
</section>`;

module.exports = [
  {
    id: 'p-medical-director', slug: 'medical-director', navLabel: 'Medical Director',
    title: 'Medical Director — Bradley Tourtlotte, MD | ' + BRAND,
    desc: 'Meet our Medical Director, Bradley Tourtlotte, MD — a physician with 35+ years of experience providing medical oversight of detox and addiction treatment.',
    html: `
<section><div class="container">
  <div class="section-label">Clinical Leadership</div>
  <h1>Meet Our Medical Director</h1>
  <p class="section-sub">Medical care is led by a licensed physician, so every detox and treatment plan is overseen with safety and clinical rigor.</p>
  <h2>Bradley Tourtlotte, MD</h2>
  <p><strong>Role:</strong> Medical Director</p>
  <p><strong>Degree:</strong> Doctor of Medicine (MD), Eastern Virginia Medical School</p>
  <p><strong>Experience:</strong> 35+ years in clinical medicine</p>
  <h3>About Dr. Tourtlotte</h3>
  <p>Dr. Bradley Tourtlotte is a licensed physician with more than 35 years of clinical experience. As Medical Director, he provides medical oversight of care — helping ensure that medically supervised detox and addiction treatment are delivered safely and in line with established clinical standards. His role includes guiding medical protocols for withdrawal management and supporting the appropriate use of medication-assisted treatment.</p>
  <p style="color:var(--muted);font-size:.92rem;margin-top:1.5rem">Provider record: National Provider Identifier (NPI) 1902955859.</p>
</div></section>${cta}`
  },
  {
    id: 'p-clinical-team', slug: 'clinical-team', navLabel: 'Our Team',
    title: 'Our Clinical & Leadership Team | ' + BRAND,
    desc: 'Meet the leadership and clinical team behind ' + BRAND + ' — experienced behavioral-health professionals committed to evidence-based, compassionate care.',
    html: `
<section><div class="container">
  <div class="section-label">Our People</div>
  <h1>Our Clinical &amp; Leadership Team</h1>
  <p class="section-sub">Our programs are led by experienced behavioral-health professionals dedicated to evidence-based, compassionate, whole-person care.</p>
  <div class="card-grid-4">
    <div class="card"><h3>Joseph Casaceli</h3><p><strong>Founder &amp; Owner</strong></p><p>Joseph leads the organization with a deep commitment to integrity and healing, bringing several years of experience across substance-use and mental-health treatment settings. He emphasizes evidence-based practices, holistic care, and a culture of respect and empowerment for every client.</p></div>
    <div class="card"><h3>Alexandra Hicks</h3><p><strong>Clinical Director</strong></p><p>Alexandra leads integrated clinical programming, with extensive experience supporting teens, young adults, couples, and families. Her clinical strengths include dialectical behavior therapy (DBT), trauma-focused CBT, and person-centered approaches.</p></div>
    <div class="card"><h3>Devon Thomas</h3><p><strong>Team Member</strong></p><p>Devon is committed to expanding access to care, improving client outcomes, and fostering a supportive community where every person has the opportunity to reclaim their life and hope.</p></div>
  </div>
</div></section>${cta}`
  },
  {
    id: 'p-editorial', slug: 'editorial-policy', navLabel: 'Editorial &amp; Review Policy',
    title: 'Editorial & Medical Review Policy | ' + BRAND,
    desc: 'How ' + BRAND + ' researches, writes, sources and reviews its addiction-treatment content for accuracy. Our standards and update process.',
    html: `
<section><div class="container">
  <div class="section-label">Our Standards</div>
  <h1>Editorial &amp; Medical Review Policy</h1>
  <p class="section-sub">Addiction and insurance information affects real decisions. This page explains how we research, write, source and review everything we publish.</p>
  <h2>Our commitment to accuracy</h2>
  <p>Every page is written to be accurate, current and genuinely useful to people seeking treatment in California and their families. We explain treatment and insurance in plain language, without exaggeration or scare tactics.</p>
  <h2>How our content is created</h2>
  <ul>
    <li><strong>Researched from credible sources</strong> — clinical and coverage information draws on recognized authorities such as SAMHSA, NIDA, ASAM and California's health agencies (see our <a href="/references">References &amp; Sources</a>).</li>
    <li><strong>Reviewed before publishing</strong> by our clinical and admissions team for accuracy.</li>
    <li><strong>Updated regularly</strong> as guidelines, programs and insurance details change.</li>
  </ul>
  <h2>What this content is — and isn't</h2>
  <p>This information is for general education. It is <strong>not medical advice</strong> and is not a substitute for a professional clinical assessment. It is also not a guarantee of insurance coverage — your benefits depend on your specific plan, which we verify at no cost.</p>
  <h2>Corrections</h2>
  <p>If you believe anything here is inaccurate, please tell us so we can review and correct it. Call <a href="tel:${TEL}">${PHONE}</a>.</p>
  <p style="color:var(--muted);font-size:.92rem;margin-top:2rem">Last reviewed: June 2026.</p>
</div></section>${cta}`
  },
  {
    id: 'p-references', slug: 'references', navLabel: 'References &amp; Sources',
    title: 'References & Sources | ' + BRAND,
    desc: 'Authoritative sources behind our addiction-treatment content — SAMHSA, NIDA, NIAAA, ASAM, and California health agencies.',
    html: `
<section><div class="container">
  <div class="section-label">Authority &amp; Sources</div>
  <h1>References &amp; Sources</h1>
  <p class="section-sub">Our clinical and coverage information is grounded in government and recognized clinical sources. You can consult any of them directly.</p>
  <h2>Clinical &amp; treatment information</h2>
  <ul>
    <li><strong>SAMHSA</strong> — national authority on substance use treatment; National Helpline 1-800-662-HELP (4357). <a href="https://www.samhsa.gov/" target="_blank" rel="noopener">samhsa.gov</a></li>
    <li><strong>NIDA</strong> — research on addiction and evidence-based treatment. <a href="https://nida.nih.gov/" target="_blank" rel="noopener">nida.nih.gov</a></li>
    <li><strong>NIAAA</strong> — research on alcohol use and treatment. <a href="https://www.niaaa.nih.gov/" target="_blank" rel="noopener">niaaa.nih.gov</a></li>
    <li><strong>ASAM</strong> — the ASAM Criteria for levels of care. <a href="https://www.asam.org/" target="_blank" rel="noopener">asam.org</a></li>
  </ul>
  <h2>California health agencies</h2>
  <ul>
    <li><strong>California Department of Health Care Services (DHCS)</strong> — oversees substance use disorder services and licensing in California. <a href="https://www.dhcs.ca.gov/" target="_blank" rel="noopener">dhcs.ca.gov</a></li>
  </ul>
  <h2>Privacy &amp; legal protections</h2>
  <ul>
    <li><strong>42 CFR Part 2</strong> — federal confidentiality rules for substance use records. <a href="https://www.samhsa.gov/about-us/who-we-are/laws-regulations/confidentiality-regulations-faqs" target="_blank" rel="noopener">SAMHSA</a></li>
    <li><strong>HIPAA</strong> — federal privacy protections. <a href="https://www.hhs.gov/hipaa/" target="_blank" rel="noopener">hhs.gov/hipaa</a></li>
  </ul>
  <h2>Crisis support</h2>
  <ul><li><strong>988 Suicide &amp; Crisis Lifeline</strong> — free, confidential, 24/7 — call or text 988. <a href="https://988lifeline.org/" target="_blank" rel="noopener">988lifeline.org</a></li></ul>
</div></section>${cta}`
  }
];
