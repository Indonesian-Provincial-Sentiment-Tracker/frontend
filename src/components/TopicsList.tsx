import { SentimentData } from '../types/sentiment';

export default function TopicsList({ datas }: { datas: SentimentData | null }) {
  if (!datas || !datas.topics || datas.topics.length === 0) {
    return (
      <div className="bg-white/95 rounded-lg px-4 py-3 shadow-sm backdrop-blur-[10px] max-h-[350px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-sm hover:[&::-webkit-scrollbar-thumb]:bg-black/30">
        <h3 className="m-0 mb-3 text-sm font-semibold text-gray-800">Trending Topics</h3>
        <div className="text-xs text-gray-400 text-center py-5">Tidak ada data topics</div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 rounded-lg px-4 py-3 shadow-sm backdrop-blur-[10px] max-h-[350px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/20 [&::-webkit-scrollbar-thumb]:rounded-sm hover:[&::-webkit-scrollbar-thumb]:bg-black/30">
      <h3 className="m-0 mb-3 text-sm font-semibold text-gray-800">Trending Topics</h3>
      <div className="flex flex-col gap-2.5">
        {datas.topics.map((topic, index) => (
          <div
            key={index}
            className="flex flex-col gap-1.5 pb-2.5 border-b border-gray-100 last:border-b-0 last:pb-0"
          >
            <div className="text-xs font-medium text-gray-800 leading-[1.4]">
              {topic?.topic || 'N/A'}
            </div>
            <div className="flex flex-wrap gap-1">
              {(topic?.keywords || []).map((keyword, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
