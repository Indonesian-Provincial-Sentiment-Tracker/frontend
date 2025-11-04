import { useMemo } from 'react';
import type { SentimentData } from '../types/sentiment';
import { formatDateDisplay } from '../utils/date';

interface DateDisplayProps {
  datas: SentimentData | null;
}

export default function DateDisplay({ datas }: DateDisplayProps) {
  const formattedDate = useMemo(() => formatDateDisplay(datas), [datas]);

  return (
    <div className="bg-white/95 rounded-lg px-3.5 py-2 shadow-sm backdrop-blur-[10px] flex items-center gap-1.5">
      <span className="text-[11px] text-gray-600">Data per:</span>
      <span className="text-[11px] font-semibold text-gray-800">{formattedDate}</span>
    </div>
  );
}
