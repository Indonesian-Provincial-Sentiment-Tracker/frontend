import type { StateData } from '../types/sentiment';

let PROVINCE_SENTIMENT_MAP: Record<string, StateData> = {};

export function initializeProvinceMap(stateData: StateData[] | null | undefined) {
  PROVINCE_SENTIMENT_MAP = {};

  if (!stateData || stateData.length === 0) {
    return;
  }

  stateData.forEach((state) => {
    PROVINCE_SENTIMENT_MAP[state.state_id] = state;
  });
}

export function getProvinceDataById(stateId: string): StateData | undefined {
  return PROVINCE_SENTIMENT_MAP[stateId];
}
