import { GrCircleQuestion } from 'react-icons/gr';

interface TooltipProps {
  showTooltip: boolean;
}

export default function Tooltip({ showTooltip }: TooltipProps) {
  return (
    <div className="relative inline-flex items-center">
      <GrCircleQuestion className="w-2 h-2 text-gray-500" />
      {showTooltip && (
        <div className="absolute -bottom-[55px] right-0 bg-black text-white px-3 py-2 rounded-md text-[11px] whitespace-nowrap z-50">
          Score ini adalah tingkat kepercayaan (confidence) model dalam memprediksi sentimen
        </div>
      )}
    </div>
  );
}
