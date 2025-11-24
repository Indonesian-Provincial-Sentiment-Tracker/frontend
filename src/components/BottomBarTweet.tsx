import { useQuery } from '@tanstack/react-query';
import { Tweet } from '../types/sentiment';
import { HiExternalLink } from 'react-icons/hi';
import { getButtomBarTweetService } from '../services/bottomBarTweetService';

interface ButtomBarProps {
  id: string | boolean;
}

const getSentimentInfo = (sentimentId: number) => {
  const sentiments = {
    1: {
      label: 'Positive',
      icon: '😊',
      color: 'text-green-600 bg-green-50',
    },
    2: {
      label: 'Neutral',
      icon: '😐',
      color: 'text-gray-600 bg-gray-50',
    },
    3: {
      label: 'Negative',
      icon: '😞',
      color: 'text-red-600 bg-red-50',
    },
  };
  return sentiments[sentimentId as keyof typeof sentiments] || sentiments[2];
};

export default function ButtomBarTweet({ id }: ButtomBarProps) {
  const { data, isLoading, error } = useQuery<Tweet>({
    queryKey: ['sidebarData', id],
    queryFn: () => getButtomBarTweetService(id),
    enabled: !!id && typeof id === 'string',
  });

  if (!id || typeof id !== 'string') {
    return null;
  }

  if (isLoading) {
    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white z-950 w-[650px] border-2 border-gray-200 rounded-lg p-6 flex items-center justify-center max-md:w-[calc(100%-2rem)] max-md:max-w-[500px] max-sm:bottom-2 max-sm:p-4">
        <p className="max-sm:text-sm">Memuat data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white z-950 w-[650px] border-2 border-gray-200 rounded-lg p-6 max-md:w-[calc(100%-2rem)] max-md:max-w-[500px] max-sm:bottom-2 max-sm:p-4">
        <p className="text-gray-900 font-medium max-sm:text-sm">Failed to load tweet data</p>
      </div>
    );
  }

  const sentimentInfo = getSentimentInfo(data.sentiment_id);
  const formattedDate = new Date(data.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white z-950 w-[650px] border-2 border-gray-200 rounded-lg shadow-lg max-md:w-[calc(100%-2rem)] max-md:max-w-[500px] max-sm:bottom-2">
      <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between max-md:px-4 max-md:py-3 max-sm:px-3 max-sm:py-2">
        <div className="flex items-center gap-3 max-sm:gap-2">
          <span className="text-2xl max-sm:text-xl">{sentimentInfo.icon}</span>
          <div>
            <span className="text-sm font-semibold text-gray-900 max-sm:text-xs">
              Tweet Details
            </span>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1 rounded max-sm:px-2 ${sentimentInfo.color}`}
        >
          <span className="text-[10px] font-medium max-sm:text-[9px]">{sentimentInfo.label}</span>
        </div>
      </div>

      <div className="px-5 py-4 max-md:px-4 max-md:py-3 max-sm:px-3 max-sm:py-2">
        <div className="flex justify-between px-2 max-sm:px-1 max-sm:flex-col max-sm:gap-1">
          <p className="text-xs text-gray-900 font-semibold max-sm:text-[11px]">@{data.username}</p>
          <p className="text-xs text-gray-900 font-semibold max-sm:text-[11px] max-sm:text-gray-600">
            {formattedDate}
          </p>
        </div>
        <p className="text-gray-700 text-sm leading-relaxed p-2 pb-3 max-sm:text-xs max-sm:p-1 max-sm:pb-2">
          {data.tweet}
        </p>

        <div className="mb-4 border border-gray-200 rounded-lg p-3 max-sm:p-2 max-sm:mb-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-600 uppercase tracking-wider max-sm:text-[9px]">
              Sentiment Score
            </span>
            <span className="text-xs font-bold text-gray-900 max-sm:text-[11px]">
              {data.sentiment_score}
            </span>
          </div>
        </div>
        <a
          href={data.tweet_url}
          target="_blank"
          className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 text-xs max-sm:py-2 max-sm:px-3 max-sm:text-[11px]"
        >
          <span>View Original Tweet</span>
          <HiExternalLink className="text-base max-sm:text-sm" />
        </a>
      </div>
    </div>
  );
}
