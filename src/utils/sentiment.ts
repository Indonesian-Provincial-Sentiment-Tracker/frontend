import type { StateData } from '../types/sentiment';

let PROVINCE_SENTIMENT_MAP: Record<string, StateData> = {};

export function initializeProvinceMap(stateData: StateData[] | null | undefined) {
  PROVINCE_SENTIMENT_MAP = {};

  if (!stateData || stateData.length === 0) {
    return;
  }

  stateData.forEach((state) => {
    const normalizedName = state.state_name.trim().toUpperCase();
    PROVINCE_SENTIMENT_MAP[normalizedName] = state;
  });
}

export function getProvinceData(provinceName: string): StateData | undefined {
  const normalized = provinceName.trim().toUpperCase();
  return PROVINCE_SENTIMENT_MAP[normalized];
}
