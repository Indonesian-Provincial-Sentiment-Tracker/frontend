import { useState, useEffect } from 'react';
import { fetchSentimentData } from '../services/sentimentDataService';
import type { StateData, Topic, Sentiments } from '../types/sentiment';

export interface SentimentData {
  date: string;
  stateData: StateData[];
  topics: Topic[];
  sentiments: Sentiments;
}

export function useSentimentData() {
  const [data, setData] = useState<SentimentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function loadData() {
    try {
      setLoading(true);
      const response = await fetchSentimentData();

      if (!response || !response.data) {
        setError(new Error('Failed to fetch sentiment data'));
        setData(null);
        return;
      }

      setData({
        date: response.data.date || '',
        stateData: response.data.state_data || [],
        topics: response.data.topics || [],
        sentiments: response.data.sentiments || {
          positive_score: 0,
          neutral_score: 0,
          negative_score: 0,
          positive_percentage: 0,
          neutral_percentage: 0,
          negative_percentage: 0,
        },
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, error };
}
