import { useMemo } from 'react';
import dummyData from '../data/dummy.json';
import type { StateData } from '../types/sentiment';

export interface SentimentData {
  date: string;
  stateData: StateData[];
  topics: Array<{
    topic: string;
    keywords: string[];
  }>;
  sentiments: {
    positive_score: number;
    neutral_score: number;
    negative_score: number;
    positive_percentage: number;
    neutral_percentage: number;
    negative_percentage: number;
  };
}

export function useSentimentData() {
  const data = useMemo<SentimentData | null>(() => {
    try {
      if (!dummyData?.data) {
        return null;
      }

      return {
        date: dummyData.data.date || '',
        stateData: dummyData.data.state_data || [],
        topics: dummyData.data.topics || [],
        sentiments: dummyData.data.sentiments || {
          positive_score: 0,
          neutral_score: 0,
          negative_score: 0,
          positive_percentage: 0,
          neutral_percentage: 0,
          negative_percentage: 0,
        },
      };
    } catch {
      return null;
    }
  }, []);

  return data;
}
