import { useEffect, useState } from 'react';
import type { GeoJSON as GeoJSONType } from 'geojson';
import { loadProvincesGeoJSON } from '../services/geojsonService';

export function useGeoJSON() {
  const [data, setData] = useState<GeoJSONType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const gj = await loadProvincesGeoJSON();
        if (!cancelled) setData(gj);
      } catch (e) {
        if (!cancelled) setError('Failed to load GeoJSON');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error } as const;
}
