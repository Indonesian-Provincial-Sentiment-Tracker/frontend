export interface ClickInfo {
  stateId: string;
}

export interface StateData {
  state_id: string;
  state_name: string;
  most_sentiment_id: number;
  most_sentiment_percentage: number;
}

export interface Topic {
  topic: string;
  keywords: string[];
}

export interface Sentiments {
  positive_score: number;
  neutral_score: number;
  negative_score: number;
  positive_percentage: number;
  neutral_percentage: number;
  negative_percentage: number;
}

export interface SentimentData {
  date: string;
  state_data: StateData[];
  topics: Topic[];
  sentiments: Sentiments;
}

export interface SentimentResponse {
  data: SentimentData;
  error: boolean;
}
