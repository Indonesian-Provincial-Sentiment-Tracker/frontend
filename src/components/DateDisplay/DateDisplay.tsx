import React from 'react';
import styles from './DateDisplay.module.css';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

type PresetDate =
  | 'ALL_TIME'
  | 'TODAY'
  | 'YESTERDAY'
  | 'LAST_7_DAYS'
  | 'LAST_30_DAYS'
  | 'THIS_MONTH'
  | 'LAST_MONTH'
  | 'CUSTOM';

const presetOptions: { label: string; value: PresetDate }[] = [
  { label: 'Hari ini', value: 'TODAY' },
  { label: 'Kemarin', value: 'YESTERDAY' },
  { label: '7 hari terakhir', value: 'LAST_7_DAYS' },
  { label: '30 hari terakhir', value: 'LAST_30_DAYS' },
  { label: 'Bulan ini', value: 'THIS_MONTH' },
  { label: 'Bulan lalu', value: 'LAST_MONTH' },
  { label: 'Pilih tanggal tertentu', value: 'CUSTOM' },
];

function rangeForPreset(preset: PresetDate): DateRange | undefined {
  const now = new Date();
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

  switch (preset) {
    case 'ALL_TIME':
      return undefined;
    case 'TODAY': {
      const d = startOfDay(now);
      return { from: d, to: endOfDay(d) };
    }
    case 'YESTERDAY': {
      const d = new Date(now);
      d.setDate(d.getDate() - 1);
      const s = startOfDay(d);
      return { from: s, to: endOfDay(s) };
    }
    case 'LAST_7_DAYS': {
      const to = endOfDay(now);
      const from = new Date(now);
      from.setDate(from.getDate() - 6);
      return { from: startOfDay(from), to };
    }
    case 'LAST_30_DAYS': {
      const to = endOfDay(now);
      const from = new Date(now);
      from.setDate(from.getDate() - 29);
      return { from: startOfDay(from), to };
    }
    case 'THIS_MONTH': {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      const to = endOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0));
      return { from, to };
    }
    case 'LAST_MONTH': {
      const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const to = endOfDay(new Date(now.getFullYear(), now.getMonth(), 0));
      return { from, to };
    }
    default:
      return undefined;
  }
}

function formatRangeLabel(range?: DateRange): string {
  if (!range || !range.from) return 'Today';
  if (!range.to) return 'Pilih tanggal tertentu';
  return `${format(range.from, 'dd MMM yyyy')} - ${format(range.to, 'dd MMM yyyy')}`;
}

export default function DateDisplay({ datas }: { datas: any }) {
  const initialDateString = datas?.date;
  const initialDate = initialDateString ? new Date(initialDateString) : undefined;

  const [open, setOpen] = React.useState(false);
  const [preset, setPreset] = React.useState<PresetDate>('ALL_TIME');
  const [range, setRange] = React.useState<DateRange | undefined>(
    initialDate ? { from: initialDate, to: initialDate } : undefined
  );

  const label = preset === 'CUSTOM' ? formatRangeLabel(range) : formatRangeLabel(rangeForPreset(preset));

  const handlePresetChange = (p: PresetDate) => {
    setPreset(p);
    if (p === 'CUSTOM') {
      setOpen(true);
      return;
    }
    setRange(rangeForPreset(p));
    setOpen(false);
  };

  const applyCustom = () => {
    setPreset('CUSTOM');
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.label}>Per Tanggal:</span>
        <button className={styles.dropdownTrigger} onClick={() => setOpen((s) => !s)} aria-haspopup="dialog" aria-expanded={open}>
          <span className={styles.date}>{label}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={styles.chevron}>
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
        {open && (
          <div className={styles.dropdownPanel} role="dialog">
            <div className={styles.presetRow}>
              <label htmlFor="preset" className={styles.presetLabel}>Preset</label>
              <select id="preset" className={styles.presetSelect} value={preset} onChange={(e) => handlePresetChange(e.target.value as PresetDate)}>
                {presetOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {preset === 'CUSTOM' && (
              <div className={styles.calendarContainer}>
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  numberOfMonths={2}
                  captionLayout="dropdown"
                  defaultMonth={range?.from}
                />
                <div className={styles.footerRow}>
                  <button className={styles.secondaryButton} onClick={() => setOpen(false)}>Tutup</button>
                  <button className={styles.primaryButton} onClick={applyCustom}>Terapkan</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
