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
    const firstString = Object.values(props || {}).find((v) => typeof v === 'string') as
      | string
      | undefined;
    raw = firstString || 'UNKNOWN';
  }
  const upper = raw.trim().toUpperCase().replace(/\s+/g, ' ');

  if (
    upper.includes('DAERAH KHUSUS IBUKOTA') ||
    upper === 'D.K.I. JAKARTA' ||
    upper === 'DKI JAKARTA' ||
    upper === 'DKI'
  ) {
    return 'JAKARTA';
  }
  if (upper.includes('DAERAH ISTIMEWA YOGYAKARTA') || upper === 'DI YOGYAKARTA') {
    return 'YOGYAKARTA';
  }
  if (upper.includes('BANGKA') && upper.includes('BELITUNG')) {
    return 'KEPULAUAN BANGKA BELITUNG';
  }

  return upper;
}

export function colorForSentimentId(sentimentId?: number): string {
  if (sentimentId == null) return '#cccccc';

  switch (sentimentId) {
    case 1:
      return '#43a047';
    case 2:
      return '#fdd835';
    case 3:
      return '#e53935';
    default:
      return '#cccccc';
  }
}