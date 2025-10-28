import type { GeoJSON as GeoJSONType, Feature } from 'geojson';
import { PROVINCE_TO_STATE_ID } from '../constants/sentiment';
import { normalizeProvinceName } from '../utils/geo';

const PRIMARY_LOCAL = '/indonesia-provinsi.json';
const REMOTE =
  'https://raw.githubusercontent.com/ardian28/GeoJson-Indonesia-38-Provinsi/main/Provinsi/INDONESIA_Provinsi_2022_38.geojson';

function hasUsableNames(gj: unknown): boolean {
  const geojson = gj as { features?: Array<{ properties?: Record<string, unknown> }> };
  return !!(
    geojson?.features?.[0]?.properties &&
    ('NAME_1' in geojson.features[0].properties ||
      'name' in geojson.features[0].properties ||
      'Provinsi' in geojson.features[0].properties ||
      'PROVINSI' in geojson.features[0].properties)
  );
}

function addStateId(gj: GeoJSONType): GeoJSONType {
  if (gj.type !== 'FeatureCollection') return gj;

  const enrichedFeatures = gj.features.map((feature: Feature) => {
    const provinceName = normalizeProvinceName(feature.properties);
    const stateId = provinceName ? PROVINCE_TO_STATE_ID[provinceName] : undefined;

    return {
      ...feature,
      properties: {
        ...feature.properties,
        state_id: stateId,
      },
    };
  });

  return {
    ...gj,
    features: enrichedFeatures,
  };
}

async function tryLoad(url: string): Promise<GeoJSONType | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const gj = await res.json();
    const ok = Array.isArray(gj?.features) && gj.features.length > 0 && hasUsableNames(gj);
    return ok ? addStateId(gj as GeoJSONType) : null;
  } catch {
    return null;
  }
}

export async function loadProvincesGeoJSON(): Promise<GeoJSONType | null> {
  return (await tryLoad(PRIMARY_LOCAL)) || (await tryLoad(REMOTE));
}
