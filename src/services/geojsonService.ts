import type { GeoJSON as GeoJSONType } from 'geojson';

const PRIMARY_LOCAL = '/indonesia-provinsi.json';
const REMOTE = 'https://raw.githubusercontent.com/ardian28/GeoJson-Indonesia-38-Provinsi/main/Provinsi/INDONESIA_Provinsi_2022_38.geojson';

function hasUsableNames(gj: any): boolean {
  return !!(gj?.features?.[0]?.properties && (
    'NAME_1' in gj.features[0].properties ||
    'name' in gj.features[0].properties ||
    'Provinsi' in gj.features[0].properties ||
    'PROVINSI' in gj.features[0].properties
  ));
}

async function tryLoad(url: string): Promise<GeoJSONType | null> {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const gj = await res.json();
    const ok = Array.isArray(gj?.features) && gj.features.length > 0 && hasUsableNames(gj);
    return ok ? (gj as GeoJSONType) : null;
  } catch {
    return null;
  }
}

export async function loadProvincesGeoJSON(): Promise<GeoJSONType | null> {
  return (
    (await tryLoad(PRIMARY_LOCAL)) ||
    (await tryLoad(REMOTE))
  );
}
