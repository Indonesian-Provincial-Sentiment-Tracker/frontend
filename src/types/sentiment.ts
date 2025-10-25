export type ProvinceSentiment = Record<string, number>; // key: normalized province name (uppercase), value: 0..100

export interface ClickInfo {
  lat: number;
  lng: number;
  name: string;
  score?: number;
}
