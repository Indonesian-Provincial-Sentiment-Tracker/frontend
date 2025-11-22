import { useState } from 'react';
import { SentimentData } from '../types/sentiment';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function TopicsList({ datas }: { datas: SentimentData | null }) {
  const [open, setOpen] = useState(true);
  if (!datas || !datas.topics || datas.topics.length === 0) {
    return (
      <div className="bg-white/95 rounded-lg px-4 py-3 shadow-sm backdrop-blur-[10px] max-h-[350px] overflow-y-auto">
        <h3 className="m-0 mb-3 text-sm font-semibold text-gray-800">Trending Topics</h3>
        <div className="text-xs text-gray-400 text-center py-5">Tidak ada data topics</div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 rounded-lg px-4 py-3 shadow-sm backdrop-blur-[10px] max-h-[350px] overflow-y-auto max-md:px-3 max-md:py-2 max-md:max-h-[250px] max-sm:max-h-[200px]">
      <h3 className="m-0 mb-3 text-sm font-semibold text-gray-800 max-sm:text-xs max-sm:mb-2 flex items-center justify-between">
        <span>Trending Topics</span>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden ml-2 p-1 text-gray-600 hover:text-gray-800"
        >
          {open ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>
      </h3>

      <div className={`${open ? 'block' : 'hidden'} md:block`}>
        <div className="flex flex-col gap-2.5 max-sm:gap-2">
          {datas.topics.map((topic, index) => (
            <div
              key={index}
              className="flex flex-col gap-1.5 pb-2.5 border-b border-gray-100 last:border-b-0 last:pb-0 max-sm:gap-1 max-sm:pb-2"
            >
              <div className="text-xs font-medium text-gray-800 leading-[1.4] max-sm:text-[11px]">
                {topic?.topic || 'N/A'}
              </div>
              <div className="flex flex-wrap gap-1 max-sm:gap-0.5">
                {(topic?.keywords || []).map((keyword, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded max-sm:text-[9px] max-sm:px-1"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
