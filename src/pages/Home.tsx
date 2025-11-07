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
  const [option, setOption] = useState<{
    date?: string | false;
    from_date?: string | false;
    to_date?: string | false;
    month?: string | false;
    year?: string | false;
  }>({
    date: false,
    from_date: false,
    to_date: false,
    month: false,
    year: false,
  });
  const [filter, setFilter] = useState<'latest' | 'daily' | 'weekly' | 'monthly'>('latest');
  const { data, isLoading, error } = useQuery({
    queryKey: ['sentimentData', option],
    queryFn: () => getHomeService(filter, option),
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
      <div className="z-850 bg-white absolute top-18 left-5 w-64 px-4 py-2.5 rounded-md">
        <div>
          <span className="inline-block w-3 h-3 bg-yellow-300 mr-2 rounded-full"></span>
          Netral
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-green-500 mr-2 rounded-full"></span>
          Positif
        </div>
        <div>
          <span className="inline-block w-3 h-3 bg-red-500 mr-2 rounded-full"></span>
          Negatif
        </div>
      </div>

      <div
        className={`absolute top-5 right-5 z-800 flex flex-col items-end gap-2.5 transition-[right] duration-300 ease-out ${clicked ? 'right-[420px]' : ''}`}
      >
        <DateDisplay
          datas={data || null}
          filter={filter}
          setFilter={setFilter}
          setOption={setOption}
        />
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
          filter={filter}
          option={option}
          setClickedBottomBar={setClickedBottomBar}
        />
      )}
      {clickedBottomBar && <ButtomBarTweet id={clickedBottomBar} />}
    </div>
  );
}
