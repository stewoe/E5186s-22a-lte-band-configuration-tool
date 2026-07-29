(async () => {
  // ===== LTE bands (hex bitmask) =====
  const ALL  = '7FFFFFFFFFFFFFFF';   // no lock, carrier aggregation active
  const B1   = '1';                  // 2100 MHz
  const B3   = '4';                  // 1800 MHz
  const B7   = '40';                 // 2600 MHz
  const B8   = '80';                 //  900 MHz
  const B20  = '80000';              //  800 MHz
  const B28  = '8000000';            //  700 MHz
  const B32  = '80000000';           // 1500 MHz (downlink only, SDL)
  const B38  = '2000000000';         // 2600 MHz TDD
  const B40  = '8000000000';         // 2300 MHz TDD

  // ===== Network mode =====
  const AUTO     = '00';             // 2G/3G/4G
  const LTE_ONLY = '03';

  // Combine bands:  mix(B3, B7)
  const mix = (...bands) =>
    bands.reduce((acc, b) => acc | BigInt('0x' + b), 0n).toString(16).toUpperCase();

  // ================== EDIT HERE ==================
  const MODE     = AUTO;
  const LTE_BAND = ALL;
  // Examples:
  //   const MODE = LTE_ONLY; const LTE_BAND = B7;
  //   const MODE = LTE_ONLY; const LTE_BAND = mix(B3, B7);
  // ===============================================

  const xml = await (await fetch('/api/webserver/SesTokInfo')).text();
  const token = new DOMParser().parseFromString(xml, 'text/xml')
    .getElementsByTagName('TokInfo')[0].textContent.trim();

  const res = await fetch('/api/net/net-mode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/xml',
      '__RequestVerificationToken': token,
      'X-Requested-With': 'XMLHttpRequest'
    },
    body: `<?xml version="1.0" encoding="UTF-8"?>
<request>
    <NetworkMode>${MODE}</NetworkMode>
    <NetworkBand>3FFFFFFF</NetworkBand>
    <LTEBand>${LTE_BAND}</LTEBand>
</request>`
  });
  console.log('applied:', MODE, LTE_BAND, '->', await res.text());
})();
