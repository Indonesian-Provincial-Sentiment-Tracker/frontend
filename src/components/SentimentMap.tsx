import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import L, { LeafletMouseEvent, Layer } from 'leaflet';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import type { GeoJSON as GeoJSONType } from 'geojson';
import { normalizeProvinceName, colorForSentimentId } from '../utils/geo';
import { getProvinceDataById } from '../utils/sentiment';
import { loadProvincesGeoJSON } from '../services/geojsonService';
import type { ClickInfo } from '../types/sentiment';

interface SentimentMapProps {
  // eslint-disable-next-line no-unused-vars
  onProvinceClick: (info: ClickInfo) => void;
}

export default function SentimentMap({ onProvinceClick }: SentimentMapProps) {
  const { data, isLoading, error } = useQuery<GeoJSONType | null, Error>({
    queryKey: ['geoJSON'],
    queryFn: loadProvincesGeoJSON,
    staleTime: 1000 * 60 * 60,
    retry: 1,
  });

  const [hoverInfo, setHoverInfo] = useState<{
    name: string;
    score?: number;
    sentimentId?: number;
    x: number;
    y: number;
  } | null>(null);

  const styleFn = useCallback((feature?: Feature<Geometry, GeoJsonProperties>) => {
    const stateId = feature?.properties?.state_id;
    const provinceData = stateId ? getProvinceDataById(stateId) : undefined;

    return {
      color: '#ffffff',
      weight: 1,
      fillColor: colorForSentimentId(provinceData?.most_sentiment_id),
      fillOpacity: 0.8,
    };
  }, []);

  const onEachFeature = useCallback(
    (feature: Feature, layer: Layer) => {
      layer.on('click', () => {
        const stateId = feature?.properties?.state_id;

        if (stateId) {
          onProvinceClick({
            stateId: stateId,
          });
        }
      });

      layer.on('mouseover', (e: LeafletMouseEvent) => {
        (layer as L.Path).setStyle({ weight: 2 });
        const name = normalizeProvinceName(feature?.properties || {});
        const stateId = feature?.properties?.state_id;
        const provinceData = stateId ? getProvinceDataById(stateId) : undefined;
        setHoverInfo({
          name,
          score: provinceData?.most_sentiment_percentage,
          sentimentId: provinceData?.most_sentiment_id,
          x: e.originalEvent.clientX,
          y: e.originalEvent.clientY,
        });
      });

      layer.on('mousemove', (e: LeafletMouseEvent) => {
        setHoverInfo((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            x: e.originalEvent.clientX,
            y: e.originalEvent.clientY,
          };
        });
      });

      layer.on('mouseout', () => {
        (layer as L.Path).setStyle({ weight: 1 });
        setHoverInfo(null);
      });
    },
    [onProvinceClick]
  );

  const center = useMemo(() => ({ lat: -2.5, lng: 118 }), []);

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <div className="flex items-center justify-center w-full h-full min-h-[400px] text-sm text-blue-600 bg-white/95 rounded-lg">
          Memuat peta...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full">
        <div className="flex items-center justify-center w-full h-full min-h-[400px] text-sm text-red-600 bg-white/95 rounded-lg">
          Gagal memuat data peta. Silakan refresh halaman.
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-full">
        <div className="flex items-center justify-center w-full h-full min-h-[400px] text-sm text-gray-600 bg-white/95 rounded-lg">
          Tidak ada data peta tersedia
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <MapContainer
        center={center}
        zoom={5}
        className="w-full h-full"
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={data} style={styleFn} onEachFeature={onEachFeature} />
      </MapContainer>
      {hoverInfo && (
        <div
          className="fixed bg-white/95 border border-gray-200 rounded-lg shadow-md px-3 py-2 z-850 text-[13px] pointer-events-none min-w-[150px]"
          style={{
            left: `${hoverInfo.x + 10}px`,
            top: `${hoverInfo.y + 10}px`,
          }}
        >
          <div>
            <b>{hoverInfo.name}</b>
          </div>
          <div>Sentimen: {hoverInfo.score != null ? `${hoverInfo.score.toFixed(2)}%` : 'N/A'}</div>
        </div>
      )}
    </div>
  );
}
