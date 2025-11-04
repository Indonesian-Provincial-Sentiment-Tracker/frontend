import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { SentimentMap, SentimentStats, TopicsList, DateDisplay, Sidebar } from '../components';
import type { ClickInfo } from '../types/sentiment';
import Icon from '../assets/icon.svg';
import { initializeProvinceMap } from '../utils/sentiment';

async function fetchSentimentData() {
  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/home`);
  return response.data.data;
}

export default function Home() {
  const [clicked, setClicked] = useState<ClickInfo | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ['sentimentData'],
    queryFn: fetchSentimentData,
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
        <DateDisplay date={data?.date || null} />
        <SentimentStats datas={data || null} />
      </div>

      <div className="absolute bottom-5 left-5 w-[300px] z-800">
        <TopicsList datas={data || null} />
      </div>

      <div className="absolute top-0 left-0 w-full h-full">
        <SentimentMap onProvinceClick={setClicked} />
      </div>

      <Sidebar clicked={clicked} onClose={() => setClicked(null)} />
    </div>
  );
}
