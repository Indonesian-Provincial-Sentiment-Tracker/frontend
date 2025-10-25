export type FeatureProps = Record<string, any>;

export function normalizeProvinceName(props: FeatureProps): string {
  const candidateKeys = ['name', 'NAME_1', 'provinsi', 'Provinsi', 'PROVINSI'];
  let raw: string | undefined;
  for (const key of candidateKeys) {
    const value = props?.[key];
    if (typeof value === 'string' && value.trim()) {
      raw = value;
      break;
    }
  }
  if (!raw) {
    const firstString = Object.values(props || {}).find(v => typeof v === 'string') as string | undefined;
    raw = firstString || 'UNKNOWN';
  }
  const upper = raw.trim().toUpperCase().replace(/\s+/g, ' ');
  if (upper.includes('DAERAH KHUSUS IBUKOTA')) return 'DKI JAKARTA';
  if (upper === 'D.K.I. JAKARTA' || upper === 'DKI') return 'DKI JAKARTA';
  if (upper.includes('DAERAH ISTIMEWA YOGYAKARTA') || upper === 'YOGYAKARTA') return 'DI YOGYAKARTA';
  if (upper.includes('BANGKA') && upper.includes('BELITUNG')) return 'KEPULAUAN BANGKA BELITUNG';
  return upper;
}

export function colorForPercentage(score?: number): string {
  if (score == null || Number.isNaN(score)) return '#cccccc';
  const s = Math.max(0, Math.min(100, score));
  if (s > 75) return '#43a047';
  if (s > 50) return '#fdd835';
  return '#e53935';
}
