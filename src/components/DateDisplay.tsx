import { useMemo } from 'react';
import { DateInfo } from '../types/sentiment';

export default function DateDisplay({ date }: DateInfo) {
  const formattedDate = useMemo(() => {
    if (!date) return 'N/A';
    const dateManipulate = new Date(date);
    if (isNaN(dateManipulate.getTime())) return 'N/A';
    return dateManipulate.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }, [date]);

  return (
    <div className="bg-white/95 rounded-lg px-3.5 py-2 shadow-sm backdrop-blur-[10px] flex items-center gap-1.5">
      <span className="text-[11px] text-gray-600">Data per:</span>
      <span className="text-[11px] font-semibold text-gray-800">{formattedDate}</span>
    </div>
  );
}
