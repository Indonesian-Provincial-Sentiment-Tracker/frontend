import { useState, useEffect } from 'react';
import SentimentMap from '../components/SentimentMap/SentimentMap';
import SentimentStats from '../components/SentimentStats/SentimentStats';
import TopicsList from '../components/TopicsList/TopicsList';
import DateDisplay from '../components/DateDisplay/DateDisplay';
import Sidebar from '../components/Sidebar/Sidebar';
import { useSentimentData } from '../hooks/useSentimentData';
import { initializeProvinceMap } from '../utils/sentiment';
import type { ClickInfo } from '../types/sentiment';
import Icon from '../assets/images/icon.svg';
import styles from './Home.module.css';

export default function Home() {
  const [clicked, setClicked] = useState<ClickInfo | null>(null);
  const { data, loading, error } = useSentimentData();

  useEffect(() => {
    if (data?.stateData) {
      initializeProvinceMap(data.stateData);
    }
  }, [data]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <img src={Icon} alt="icon" />
            <h1 className={styles.title}>Indonesia Sentiment Map</h1>
          </div>
        </div>
        <div className={styles.loadingState}>
          <p>Loading sentiment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <img src={Icon} alt="icon" />
            <h1 className={styles.title}>Indonesia Sentiment Map</h1>
          </div>
        </div>
        <div className={styles.errorState}>
          <p>Error loading data: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={Icon} alt="icon" />
          <h1 className={styles.title}>Indonesia Sentiment Map</h1>
        </div>
      </div>

      <div className={`${styles.topRight} ${clicked ? styles.shifted : ''}`}>
        <DateDisplay datas={data} />
        <SentimentStats datas={data} />
      </div>

      <div className={styles.topicsList}>
        <TopicsList datas={data} />
      </div>

      <div className={styles.mapContainer}>
        <SentimentMap onProvinceClick={setClicked} />
      </div>

      <Sidebar clicked={clicked} onClose={() => setClicked(null)} />
    </div>
  );
}
