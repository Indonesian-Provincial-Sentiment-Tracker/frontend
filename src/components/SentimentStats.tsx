import { useState } from 'react';
import Tooltip from './Tooltip';
import { SentimentData } from '../types/sentiment';
import { formatPercentage, formatScore } from '../utils/sentimentPercentage';

export default function SentimentStats({ datas }: { datas: SentimentData | null }) {
  const [showTooltip, setShowTooltip] = useState({
    positive: false,
    neutral: false,
    negative: false,
  });

  if (!datas || !datas.sentiments) {
    return (
      <div className="bg-white/95 rounded-lg px-4 py-3 shadow-sm backdrop-blur-[10px] flex gap-5">
        <div className="text-xs text-gray-400 text-center">Tidak ada data sentimen</div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 rounded-lg px-4 py-3 shadow-sm backdrop-blur-[10px] flex gap-5 max-md:gap-3 max-md:px-3 max-md:py-2 max-sm:gap-2 max-sm:px-2">
      <div className="flex flex-col gap-1 max-sm:gap-0.5">
        <span className="text-xs text-gray-600 text-center font-medium max-sm:text-[10px]">
          Positive
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-gray-800 mx-auto max-sm:text-xs">
            {formatPercentage(datas.sentiments.positive_percentage)}
          </span>
          <div
            className="text-[10px] font-medium text-gray-500 flex items-center justify-center gap-0.5 cursor-pointer max-sm:text-[8px]"
            onMouseEnter={() => setShowTooltip((prev) => ({ ...prev, positive: true }))}
            onMouseLeave={() => setShowTooltip((prev) => ({ ...prev, positive: false }))}
          >
            <span>Score: {formatScore(datas.sentiments.positive_score)}</span>
            <Tooltip showTooltip={showTooltip.positive} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 max-sm:gap-0.5">
        <span className="text-xs text-gray-600 text-center font-medium max-sm:text-[10px]">
          Neutral
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-gray-800 mx-auto max-sm:text-xs">
            {formatPercentage(datas.sentiments.neutral_percentage)}
          </span>
          <div
            className="text-[10px] font-medium text-gray-500 flex items-center justify-center gap-0.5 cursor-pointer max-sm:text-[8px]"
            onMouseEnter={() => setShowTooltip((prev) => ({ ...prev, neutral: true }))}
            onMouseLeave={() => setShowTooltip((prev) => ({ ...prev, neutral: false }))}
          >
            <span>Score: {formatScore(datas.sentiments.neutral_score)}</span>
            <Tooltip showTooltip={showTooltip.neutral} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 max-sm:gap-0.5">
        <span className="text-xs text-gray-600 text-center font-medium max-sm:text-[10px]">
          Negative
        </span>
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-bold text-gray-800 mx-auto max-sm:text-xs">
            {formatPercentage(datas.sentiments.negative_percentage)}
          </span>
          <div
            className="text-[10px] font-medium text-gray-500 flex items-center justify-center gap-0.5 cursor-pointer max-sm:text-[8px]"
            onMouseEnter={() => setShowTooltip((prev) => ({ ...prev, negative: true }))}
            onMouseLeave={() => setShowTooltip((prev) => ({ ...prev, negative: false }))}
          >
            <span>Score: {formatScore(datas.sentiments.negative_score)}</span>
            <Tooltip showTooltip={showTooltip.negative} />
          </div>
        </div>
      </div>
    </div>
  );
}
