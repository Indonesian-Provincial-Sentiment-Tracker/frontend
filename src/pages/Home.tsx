import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { MdInbox, MdErrorOutline } from 'react-icons/md';
import { IoWarning, IoInformationCircle, IoCloseCircle } from 'react-icons/io5';
import {
  SentimentMap,
  SentimentStats,
  TopicsList,
  DateDisplay,
  Sidebar,
  ButtomBarTweet,
  HeaderLogo,
} from '../components';

import { initializeProvinceMap } from '../utils/sentiment';
import { getHomeService } from '../services/homeService';
import { notificationService } from '../services/notificationService';

interface NotificationProps {
  event_type: string;
  value: string;
}

export default function Home() {
  const [clicked, setClicked] = useState<string | boolean>(false);
  const [selected, setSelected] = useState<Date>(new Date());
  const [selectedWeek, setSelectedWeek] = useState<Date>(new Date());
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
  const [notificationData, setNotificationData] = useState<NotificationProps | null>(null);
  const [filter, setFilter] = useState<{
    name: 'latest' | 'daily' | 'weekly' | 'monthly';
    key: number;
  }>({ name: 'latest', key: 0 });
  const [uniqueKey, setUniqueKey] = useState(0);
  const filterRef = useRef(filter.name);
  const optionRef = useRef(option.date);

  useEffect(() => {
    filterRef.current = filter.name;
  }, [filter.name]);

  useEffect(() => {
    optionRef.current = option.date;
  }, [option.date]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['sentimentData', option, uniqueKey, filter.key],
    queryFn: () => getHomeService(filter.name, option),
  });

  useEffect(() => {
    const cleanup = notificationService(
      setNotificationData,
      setUniqueKey,
      () => filterRef.current,
      () => optionRef.current || false
    );
    return cleanup;
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setNotificationData(null);
    }, 5000);

    return () => {
      clearTimeout(timerId);
    };
  }, [notificationData]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <HeaderLogo />
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Memuat data...</p>
        </div>
      </div>
    );
  }

  const isNoData =
    (error as { response?: { data?: { message?: string } } })?.response?.data?.message ===
    'sql: no rows in result set';

  if (isNoData) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <HeaderLogo />
        <div className="absolute top-5 right-5 z-800">
          <DateDisplay
            datas={null}
            filter={filter}
            setFilter={setFilter}
            setOption={setOption}
            selected={selected}
            setSelected={setSelected}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
          />
        </div>
        <div className="flex flex-col items-center gap-4 text-center">
          <MdInbox className="w-16 h-16 text-gray-400" />
          <div>
            <p className="text-gray-800 font-medium mb-1">Data tidak tersedia</p>
            <p className="text-sm text-gray-500">Coba dengan filter lain</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <HeaderLogo />
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <MdErrorOutline className="w-16 h-16 text-red-500" />
          <div>
            <p className="text-gray-800 font-medium mb-1">Terjadi kesalahan</p>
            <p className="text-sm text-gray-500">{error.message}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  initializeProvinceMap(data.state_data);

  return (
    <div className="h-screen w-full relative">
      <HeaderLogo />
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

      {notificationData && (
        <div
          className={`w-72 min-h-24 bg-white/30 backdrop-blur-lg z-950 absolute top-4 left-1/2 -translate-x-1/2 rounded shadow-sm p-3 flex flex-col animate-[slideDown_0.4s_ease-out,fadeIn_0.3s_ease-in] ${
            notificationData.event_type === 'Info'
              ? 'shadow-green-500/40'
              : notificationData.event_type === 'Warning'
                ? 'shadow-yellow-500/40'
                : 'shadow-red-500/40'
          }`}
        >
          <div className="flex items-center gap-1">
            {notificationData.event_type === 'Info' ? (
              <IoInformationCircle className="w-5 h-5 text-green-500" />
            ) : notificationData.event_type === 'Warning' ? (
              <IoWarning className="w-5 h-5 text-yellow-500" />
            ) : (
              <IoCloseCircle className="w-5 h-5 text-red-500" />
            )}
            <p>{notificationData.event_type}</p>
          </div>
          <div className="flex-1 flex items-center">
            <p className="w-full wrap-break-word font-semibold">{notificationData.value}</p>
          </div>
        </div>
      )}

      <div
        className={`absolute top-5 right-5 z-800 flex flex-col items-end gap-2.5 transition-[right] duration-300 ease-out ${clicked ? 'right-[420px]' : ''}`}
      >
        <DateDisplay
          datas={data || null}
          filter={filter}
          setFilter={setFilter}
          setOption={setOption}
          selected={selected}
          setSelected={setSelected}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
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
