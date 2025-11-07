import { useQuery } from '@tanstack/react-query';
import { IoClose } from 'react-icons/io5';
import { useState, useEffect, useMemo, type Dispatch, type SetStateAction } from 'react';
import { getProvinceDataById } from '../utils/sentiment';
import { formatDateDisplay } from '../utils/date';
import { formatPercentage, formatScore } from '../utils/sentimentPercentage';
import type { StateDetailData, TweetsResponse } from '../types/sentiment';
import { getSidebarService } from '../services/sidebarService';
import Pagination from './Pagination';

interface SidebarProps {
  clicked: string | boolean;
  onClose: () => void;
  filter: 'latest' | 'daily' | 'weekly' | 'monthly';
  option: {
    date?: string | false;
    from_date?: string | false;
    to_date?: string | false;
    month?: string | false;
    year?: string | false;
  };
  setClickedBottomBar: Dispatch<SetStateAction<boolean | string>>;
}

export default function Sidebar({
  clicked,
  onClose,
  filter,
  option,
  setClickedBottomBar,
}: SidebarProps) {
  const [activeTab, setActiveTab] = useState({
    name: 'state',
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, activeTab.name, option]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['sidebarData', clicked, activeTab, filter, option, currentPage],
    queryFn: () => getSidebarService(clicked, activeTab.name, filter, option, currentPage),
    enabled: !!clicked && typeof clicked === 'string',
  });

  const provinceInfo = useMemo(
    () => (clicked && typeof clicked === 'string' ? getProvinceDataById(clicked) : null),
    [clicked]
  );
  const stateData = activeTab.name === 'state' ? (data as StateDetailData | undefined) : undefined;
  const tweetsData = activeTab.name === 'tweets' ? (data as TweetsResponse | undefined) : undefined;
  const dateDisplay = useMemo(() => {
    if (activeTab.name === 'state') {
      return formatDateDisplay(stateData);
    } else if (activeTab.name === 'tweets' && tweetsData?.data) {
      return formatDateDisplay(tweetsData.data);
    }
    return '';
  }, [activeTab.name, stateData, tweetsData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClickedBottomBar(false);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-900 animate-[fadeIn_0.2s_ease-in-out]"
        onClick={() => {
          setClickedBottomBar(false);
          onClose();
        }}
      />
      <div className="fixed top-0 right-0 w-[400px] h-screen bg-white shadow-[-2px_0_8px_rgba(0,0,0,0.15)] z-1000 flex flex-col animate-[slideIn_0.3s_ease-out] max-md:w-full max-md:max-w-[400px]">
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <h2 className="m-0 text-lg font-semibold text-gray-900">
            {provinceInfo?.state_name || 'Detail Provinsi'}
          </h2>
          <button
            className="bg-transparent border-none text-2xl leading-none text-gray-500 cursor-pointer p-1 w-8 h-8 flex items-center justify-center rounded transition-colors hover:bg-gray-100"
            onClick={onClose}
          >
            <IoClose />
          </button>
        </div>

        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex gap-2">
            <button
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab.name === 'state'
                  ? 'bg-[#F05454] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab({ name: 'state' })}
            >
              Sentiment
            </button>
            <button
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                activeTab.name === 'tweets'
                  ? 'bg-[#F05454] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab({ name: 'tweets' })}
            >
              Tweets
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-gray-500">Memuat data...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-red-500">Gagal memuat data</p>
            </div>
          ) : activeTab.name === 'state' && stateData ? (
            <div className="flex flex-col gap-6">
              <div className="border-b border-gray-200 pb-3">
                <p className="text-xs text-gray-500 m-0">Data per {dateDisplay}</p>
              </div>
              {stateData.sentiments && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-semibold text-gray-900 m-0 uppercase tracking-wide">
                    Analisis Sentimen
                  </h3>
                  <div className="flex gap-2">
                    <div className="flex-1 border border-gray-200 rounded-lg p-2 flex flex-col items-center gap-1">
                      <span className="text-2xl">😊</span>
                      <span className="text-[10px] text-gray-600 font-medium">Positive</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPercentage(stateData.sentiments.positive_percentage)}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {formatScore(stateData.sentiments.positive_score)}
                      </span>
                    </div>
                    <div className="flex-1 border border-gray-200 rounded-lg p-2 flex flex-col items-center gap-1">
                      <span className="text-2xl">😐</span>
                      <span className="text-[10px] text-gray-600 font-medium">Neutral</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPercentage(stateData.sentiments.neutral_percentage)}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {formatScore(stateData.sentiments.neutral_score)}
                      </span>
                    </div>
                    <div className="flex-1 border border-gray-200 rounded-lg p-2 flex flex-col items-center gap-1">
                      <span className="text-2xl">😞</span>
                      <span className="text-[10px] text-gray-600 font-medium">Negative</span>
                      <span className="text-lg font-bold text-gray-900">
                        {formatPercentage(stateData.sentiments.negative_percentage)}
                      </span>
                      <span className="text-[9px] text-gray-500">
                        {formatScore(stateData.sentiments.negative_score)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {stateData.topics && stateData.topics.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-semibold text-gray-900 m-0 uppercase tracking-wide">
                    Trending Topics
                  </h3>
                  <div className="flex flex-col gap-3">
                    {stateData.topics.map((topic, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-3">
                          <span className="bg-gray-900 text-white text-xs font-bold rounded w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <h4 className="text-sm font-medium text-gray-900 m-0 leading-relaxed">
                            {topic.topic}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {topic.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : activeTab.name === 'tweets' && tweetsData ? (
            <div className="flex flex-col gap-6">
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                <p className="text-xs text-gray-500 m-0">Data per {dateDisplay}</p>
                <p className="text-xs text-gray-600 font-medium m-0">{tweetsData.total} tweets</p>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-gray-500">Memuat tweets...</p>
                </div>
              ) : tweetsData.data.tweets && tweetsData.data.tweets.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {tweetsData.data.tweets.map((tweet) => {
                    const sentimentEmoji =
                      tweet.sentiment_id === 1 ? '😊' : tweet.sentiment_id === 2 ? '😐' : '😞';
                    const sentimentLabel =
                      tweet.sentiment_id === 1
                        ? 'Positive'
                        : tweet.sentiment_id === 2
                          ? 'Neutral'
                          : 'Negative';
                    const sentimentColor =
                      tweet.sentiment_id === 1
                        ? 'text-green-600 bg-green-50'
                        : tweet.sentiment_id === 2
                          ? 'text-gray-600 bg-gray-50'
                          : 'text-red-600 bg-red-50';

                    return (
                      <div
                        key={tweet.tweet_id}
                        className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300 transition-colors"
                        onClick={() => setClickedBottomBar(tweet.tweet_id)}
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <span className="text-xl shrink-0">{sentimentEmoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-semibold text-gray-900">
                                @{tweet.username}
                              </span>
                              <span
                                className={`text-[10px] font-medium px-2 py-0.5 rounded ${sentimentColor}`}
                              >
                                {sentimentLabel}
                              </span>
                            </div>
                            <p className="text-xs text-gray-700 leading-relaxed m-0 mb-2">
                              {tweet.tweet}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-gray-500">
                                Score: {formatScore(tweet.sentiment_score)}
                              </span>
                              <a
                                href={tweet.tweet_url}
                                target="_blank"
                                className="text-[10px] text-blue-600 hover:text-blue-800 hover:underline"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Lihat Tweet
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-gray-500">Tidak ada tweet tersedia</p>
                </div>
              )}
              <Pagination
                currentPage={tweetsData.current_page}
                totalPage={tweetsData.total_page}
                hasNext={tweetsData.has_next}
                onPageChange={setCurrentPage}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
