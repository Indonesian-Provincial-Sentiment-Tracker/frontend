export function formatPercentage(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return 'N/A';
  return `${value.toFixed(1)}%`;
}

export function formatScore(value: number | null | undefined): string {
  if (value == null || isNaN(value)) return 'N/A';
  return value.toFixed(2);
}
