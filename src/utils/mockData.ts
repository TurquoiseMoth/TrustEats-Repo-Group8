export interface Notification {
  id: string;
  type: 'alert' | 'warning' | 'info';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  // ── Derived from V00013: Milo verified in Enugu (2026-07-27 10:11)
  {
    id: '1',
    type: 'info',
    title: 'Milo Verified Successfully',
    message: 'Your scan of Milo (Nestle) in Enugu was verified as genuine. NAFDAC No. 04-3456.',
    createdAt: '2 hours ago',
    read: false,
  },
  // ── Derived from V00139: Failed Power Oil scan in Lagos (2026-07-27 00:29)
  {
    id: '2',
    type: 'warning',
    title: 'Verification Failed — Power Oil',
    message: 'A QR scan of Power Oil (Dansa) in Lagos could not be verified. The product may be unregistered or the code is damaged.',
    createdAt: '12 hours ago',
    read: false,
  },
  // ── Derived from V00123: Counterfeit Peak Milk in Enugu (2026-07-26)
  {
    id: '3',
    type: 'alert',
    title: 'Counterfeit Peak Milk Detected',
    message: 'A counterfeit Peak Milk product was scanned in Enugu. Avoid purchasing from unverified sources. NAFDAC No. 03-9012.',
    createdAt: 'Yesterday',
    read: false,
  },
  // ── Derived from V00007: Peak Milk verified in Rivers (2026-07-23)
  {
    id: '4',
    type: 'info',
    title: 'Peak Milk Verified in Rivers',
    message: 'Peak Milk (FrieslandCampina) scanned via QR in Rivers State was confirmed genuine by NAFDAC.',
    createdAt: '4 days ago',
    read: true,
  },
  // ── Derived from V00048: Counterfeit Power Oil in Rivers (2026-07-22)
  {
    id: '5',
    type: 'alert',
    title: 'Counterfeit Power Oil Alert — Rivers',
    message: 'A counterfeit batch of Power Oil (Dansa) was detected via QR scan in Rivers State. Report to NAFDAC if purchased.',
    createdAt: '5 days ago',
    read: true,
  },
  // ── Derived from V00070: Peak Milk genuine in Kano (2026-07-24)
  {
    id: '6',
    type: 'info',
    title: 'Peak Milk Verified in Kano',
    message: 'Your QR scan of Peak Milk in Kano returned a genuine result. Product is safe and NAFDAC-approved.',
    createdAt: '3 days ago',
    read: true,
  },
  // ── Derived from V00004: Failed Power Oil scan in Enugu (2026-07-18)
  {
    id: '7',
    type: 'warning',
    title: 'Verification Failed — Power Oil (Enugu)',
    message: 'Manual entry of Power Oil NAFDAC number in Enugu returned no match. Double-check the number or report a suspicious product.',
    createdAt: '9 days ago',
    read: true,
  },
];

// ── Verification Records ───────────────────────────────────────────────────────

export interface VerificationRecord {
  id: string;
  userId: string;
  state: string;
  device: 'Android' | 'iOS' | 'Web';
  product: string;
  manufacturer: string;
  scanDate: string;
  method: 'QR' | 'Manual';
  result: 'Genuine' | 'Failed' | 'Counterfeit';
  timeSec: number;
}

/** Static product metadata keyed by product name */
export const PRODUCT_META: Record<string, { nafdac: string; mfg: string; exp: string; image: string }> = {
  'Indomie': {
    nafdac: '01-1234',
    mfg: '15/01/2026',
    exp: '15/01/2027',
    image: '/assets/products/gino-pepper-and-onion-paste-product-image.png',
  },
  'Power Oil': {
    nafdac: '02-5678',
    mfg: '10/03/2026',
    exp: '10/03/2028',
    image: '/assets/products/sunharvest-vegetable-oil-product-image.png',
  },
  'Peak Milk': {
    nafdac: '03-9012',
    mfg: '20/02/2026',
    exp: '20/02/2027',
    image: '/assets/products/farm-milk-bottle-product-image.png',
  },
  'Milo': {
    nafdac: '04-3456',
    mfg: '05/04/2026',
    exp: '05/04/2027',
    image: '/assets/products/golden-morn-cereal-product-image.png',
  },
};

/**
 * 20 representative records sampled from the full 1,500-row dataset.
 * Covers all 4 products, all 3 result types (Genuine / Failed / Counterfeit),
 * and a spread of states, devices and scan methods.
 */
export const MOCK_VERIFICATIONS: VerificationRecord[] = [
  { id: 'V00001', userId: 'U0193', state: 'Oyo',    device: 'Android', product: 'Indomie',   manufacturer: 'Dufil',            scanDate: '2026-08-01 23:56', method: 'Manual', result: 'Genuine',     timeSec: 1 },
  { id: 'V00004', userId: 'U0050', state: 'Enugu',  device: 'iOS',     product: 'Power Oil', manufacturer: 'Dansa',            scanDate: '2026-07-18 20:49', method: 'Manual', result: 'Failed',      timeSec: 3 },
  { id: 'V00007', userId: 'U0006', state: 'Rivers', device: 'iOS',     product: 'Peak Milk', manufacturer: 'FrieslandCampina', scanDate: '2026-07-23 02:28', method: 'QR',     result: 'Genuine',     timeSec: 7 },
  { id: 'V00013', userId: 'U0317', state: 'Enugu',  device: 'iOS',     product: 'Milo',      manufacturer: 'Nestle',           scanDate: '2026-07-27 10:11', method: 'Manual', result: 'Genuine',     timeSec: 5 },
  { id: 'V00023', userId: 'U0282', state: 'Enugu',  device: 'iOS',     product: 'Indomie',   manufacturer: 'Dufil',            scanDate: '2026-08-11 13:21', method: 'Manual', result: 'Counterfeit', timeSec: 3 },
  { id: 'V00031', userId: 'U0065', state: 'Enugu',  device: 'Android', product: 'Milo',      manufacturer: 'Nestle',           scanDate: '2026-08-06 08:44', method: 'QR',     result: 'Counterfeit', timeSec: 1 },
  { id: 'V00034', userId: 'U0165', state: 'Lagos',  device: 'Android', product: 'Peak Milk', manufacturer: 'FrieslandCampina', scanDate: '2026-07-22 07:34', method: 'Manual', result: 'Genuine',     timeSec: 3 },
  { id: 'V00048', userId: 'U0300', state: 'Rivers', device: 'Android', product: 'Power Oil', manufacturer: 'Dansa',            scanDate: '2026-07-22 17:22', method: 'QR',     result: 'Counterfeit', timeSec: 3 },
  { id: 'V00055', userId: 'U0020', state: 'Lagos',  device: 'iOS',     product: 'Power Oil', manufacturer: 'Dansa',            scanDate: '2026-08-01 19:15', method: 'QR',     result: 'Failed',      timeSec: 5 },
  { id: 'V00066', userId: 'U0107', state: 'Lagos',  device: 'Android', product: 'Indomie',   manufacturer: 'Dufil',            scanDate: '2026-07-15 21:19', method: 'Manual', result: 'Failed',      timeSec: 5 },
  { id: 'V00070', userId: 'U0392', state: 'Kano',   device: 'Android', product: 'Peak Milk', manufacturer: 'FrieslandCampina', scanDate: '2026-07-24 14:58', method: 'QR',     result: 'Genuine',     timeSec: 2 },
  { id: 'V00080', userId: 'U0193', state: 'Oyo',    device: 'Android', product: 'Power Oil', manufacturer: 'Dansa',            scanDate: '2026-07-15 13:49', method: 'QR',     result: 'Failed',      timeSec: 6 },
  { id: 'V00082', userId: 'U0360', state: 'Lagos',  device: 'Android', product: 'Milo',      manufacturer: 'Nestle',           scanDate: '2026-07-14 17:19', method: 'Manual', result: 'Failed',      timeSec: 4 },
  { id: 'V00100', userId: 'U0236', state: 'Kano',   device: 'iOS',     product: 'Milo',      manufacturer: 'Nestle',           scanDate: '2026-07-28 05:01', method: 'QR',     result: 'Genuine',     timeSec: 7 },
  { id: 'V00119', userId: 'U0013', state: 'Kano',   device: 'iOS',     product: 'Indomie',   manufacturer: 'Dufil',            scanDate: '2026-08-08 16:41', method: 'QR',     result: 'Failed',      timeSec: 6 },
  { id: 'V00123', userId: 'U0037', state: 'Enugu',  device: 'Android', product: 'Peak Milk', manufacturer: 'FrieslandCampina', scanDate: '2026-07-26 09:59', method: 'QR',     result: 'Counterfeit', timeSec: 6 },
  { id: 'V00139', userId: 'U0017', state: 'Lagos',  device: 'Android', product: 'Power Oil', manufacturer: 'Dansa',            scanDate: '2026-07-27 00:29', method: 'QR',     result: 'Failed',      timeSec: 4 },
  { id: 'V00182', userId: 'U0001', state: 'Lagos',  device: 'Android', product: 'Peak Milk', manufacturer: 'FrieslandCampina', scanDate: '2026-07-11 18:49', method: 'QR',     result: 'Genuine',     timeSec: 7 },
  { id: 'V00208', userId: 'U0337', state: 'Abuja',  device: 'iOS',     product: 'Power Oil', manufacturer: 'Dansa',            scanDate: '2026-08-05 07:24', method: 'QR',     result: 'Counterfeit', timeSec: 7 },
  { id: 'V00223', userId: 'U0080', state: 'Lagos',  device: 'Android', product: 'Milo',      manufacturer: 'Nestle',           scanDate: '2026-08-03 22:23', method: 'QR',     result: 'Counterfeit', timeSec: 6 },
];

