/* ===================================================================
   locations.js — REAL physical locations (for LocalBusiness schema)
   -------------------------------------------------------------------
   Replace these PLACEHOLDERS with your real California facilities, then
   set placeholder:false. build.js ONLY emits location schema for
   entries with placeholder:false — so no fake address ever ships.

   Real Name/Address/Phone is what powers legitimate "near me" / local
   pack ranking. Add one object per real facility.
   =================================================================== */
module.exports = [
  { placeholder: true, name: 'California Treatment Centers — [City]', street: '[Street address]', city: '[City]', zip: '[ZIP]' },
  { placeholder: true, name: 'California Treatment Centers — [City]', street: '[Street address]', city: '[City]', zip: '[ZIP]' }
  // Example of a completed entry (set placeholder:false to publish):
  // { placeholder: false, name: 'California Treatment Centers — Roseville', street: '123 Main St', city: 'Roseville', zip: '95661' },
];
