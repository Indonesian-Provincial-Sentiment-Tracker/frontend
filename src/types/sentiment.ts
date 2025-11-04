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

export type DateInfo =
  | { date: string }
  | { from_date: string; to_date: string }
  | { month: string; year: string };

export type SentimentData = DateInfo & {
  state_data: StateData[];
  topics: Topic[];
  sentiments: Sentiments;
};

export type StateDetailData = DateInfo & {
  state_id: string;
  sentiments: Sentiments;
  topics: Topic[];
};

export interface ClickInfo {
  stateId: string;
}

export interface SentimentResponse {
  data: SentimentData;
  error: boolean;
}

export interface Tweet {
  tweet_id: string;
  date: string;
  state_id: string;
  tweet: string;
  username: string;
  tweet_url: string;
  sentiment_id: number;
  sentiment_score: number;
}

export type TweetsData = DateInfo & {
  state_id: string;
  tweets: Tweet[];
};

export interface TweetsResponse {
  current_page: number;
  data: TweetsData;
  error: boolean;
  has_next: boolean;
  message: string;
  total: number;
  total_page: number;
}
