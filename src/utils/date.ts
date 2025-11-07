import type { DateInfo } from '../types/sentiment';

export function formatSingleDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return 'N/A';
  return d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function getWeekRange(date: Date): { from: Date; to: Date } {
  const dayOfWeek = date.getDay();

  const daysToSunday = dayOfWeek === 0 ? 0 : dayOfWeek;

  const from = new Date(date);
  from.setDate(date.getDate() - daysToSunday);
  from.setHours(0, 0, 0, 0);

  const to = new Date(from);
  to.setDate(from.getDate() + 7);
  to.setHours(23, 59, 59, 999);

  return { from, to };
}

export function formatWeekDisplay(from: Date, to: Date): string {
  const fromStr = from.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  });
  const toStr = to.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return `${fromStr} - ${toStr}`;
}

export function formatDateDisplay(dateData: DateInfo | null | undefined): string {
  if (!dateData) return 'N/A';

  if ('date' in dateData) {
    return formatSingleDate(dateData.date);
  }

  if ('from_date' in dateData && 'to_date' in dateData) {
    const from = formatSingleDate(dateData.from_date);
    const to = formatSingleDate(dateData.to_date);
    if (from === 'N/A' || to === 'N/A') return 'N/A';
    return `${from} - ${to}`;
  }

  if ('month' in dateData && 'year' in dateData) {
    const monthNum = Number(dateData.month);
    const yearNum = Number(dateData.year);
    if (Number.isNaN(monthNum) || Number.isNaN(yearNum)) return 'N/A';
    const d = new Date(yearNum, monthNum - 1, 1);
    return d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  }

  return 'N/A';
}
