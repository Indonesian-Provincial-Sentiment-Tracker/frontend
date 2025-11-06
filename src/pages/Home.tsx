import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  SentimentMap,
  SentimentStats,
  TopicsList,
  DateDisplay,
  Sidebar,
  ButtomBarTweet,
} from '../components';
import Icon from '../assets/icon.svg';
import { initializeProvinceMap } from '../utils/sentiment';
import { getHomeService } from '../services/homeService';

export default function Home() {
  const [clicked, setClicked] = useState<string | boolean>(false);
  const [clickedBottomBar, setClickedBottomBar] = useState<boolean | string>(false);
  const [filter, setFilter] = useState<'latest' | 'daily' | 'weekly' | 'monthly'>('latest');
  const { data, isLoading, error } = useQuery({
    queryKey: ['sentimentData', filter],
    queryFn: () => getHomeService(filter),
  });

  if (isLoading) {
    return (
      <div className="h-screen w-full relative">
        <div className="absolute top-5 left-5 px-4 py-2.5 bg-white/95 rounded-lg z-800 shadow-sm backdrop-blur-[10px]">
          <div className="flex items-center gap-2.5">
            <img src={Icon} alt="icon" className="w-7 h-7" />
            <h1 className="text-base m-0 font-semibold">Indonesia Sentiment Map</h1>
          </div>
        </div>
        <div className="flex justify-center items-center h-screen">
          <p className="text-base text-gray-800">Loading sentiment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full relative">
        <div className="absolute top-5 left-5 px-4 py-2.5 bg-white/95 rounded-lg z-800 shadow-sm backdrop-blur-[10px]">
          <div className="flex items-center gap-2.5">
            <img src={Icon} alt="icon" className="w-7 h-7" />
            <h1 className="text-base m-0 font-semibold">Indonesia Sentiment Map</h1>
          </div>
        </div>
        <div className="flex justify-center items-center h-screen">
          <p className="text-base text-gray-800">Error loading data: {error.message}</p>
        </div>
      </div>
    );
  }

  initializeProvinceMap(data.state_data);

  return (
    <div className="h-screen w-full relative">
      <div className="absolute top-5 left-5 px-4 py-2.5 bg-white/95 rounded-lg z-800 shadow-sm backdrop-blur-[10px]">
        <div className="flex items-center gap-2.5">
          <img src={Icon} alt="icon" className="w-7 h-7" />
          <h1 className="text-base m-0 font-semibold">Indonesia Sentiment Map</h1>
        </div>
      </div>

      <div
        className={`absolute top-5 right-5 z-800 flex flex-col items-end gap-2.5 transition-[right] duration-300 ease-out ${clicked ? 'right-[420px]' : ''}`}
      >
        <div className="flex items-center gap-3">
          <DateDisplay datas={data || null} />
          <div className="flex items-center gap-1 bg-white/90 px-4.5 py-1 rounded-md shadow-sm">
            {(['latest', 'daily', 'weekly', 'monthly'] as const).map((filt) => (
              <button
                key={filt}
                onClick={() => setFilter(filt)}
                className={`text-xs cursor-pointer px-2 py-1 rounded-md transition-colors duration-150 ${
                  filter === filt ? 'bg-[#F05454] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filt === 'latest' ? 'Latest' : filt.charAt(0).toUpperCase() + filt.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <SentimentStats datas={data || null} />
      </div>

      <div className="absolute bottom-5 left-5 w-[300px] z-800">
        <TopicsList datas={data || null} />
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <SentimentMap onProvinceClick={setClicked} />
      </div>

      {clicked && (
        <Sidebar
          clicked={clicked}
          onClose={() => setClicked(false)}
          filterDefault={filter}
          setClickedBottomBar={setClickedBottomBar}
        />
      )}
      {clickedBottomBar && <ButtomBarTweet id={clickedBottomBar} />}
    </div>
  );
}
