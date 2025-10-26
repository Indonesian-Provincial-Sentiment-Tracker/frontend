/* eslint-disable no-unused-vars */
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useCallback, useMemo, useState } from 'react';
import L, { LeafletMouseEvent, Layer } from 'leaflet';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { useGeoJSON } from '../../hooks/useGeoJSON';
import { normalizeProvinceName, colorForSentimentId } from '../../utils/geo';
import { getProvinceData } from '../../utils/sentiment';
import type { ClickInfo } from '../../types/sentiment';
import styles from './SentimentMap.module.css';

interface SentimentMapProps {
  onProvinceClick: (info: ClickInfo) => void;
}

export default function SentimentMap({ onProvinceClick }: SentimentMapProps) {
  const { data, loading, error } = useGeoJSON();
  const [hoverInfo, setHoverInfo] = useState<{
    name: string;
    score?: number;
    sentimentId?: number;
    x: number;
    y: number;
  } | null>(null);

  const styleFn = useCallback((feature?: Feature<Geometry, GeoJsonProperties>) => {
    const name = normalizeProvinceName(feature?.properties || {});
    const provinceData = getProvinceData(name);

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
        const name = normalizeProvinceName(feature?.properties || {});
        const provinceData = getProvinceData(name);

        if (provinceData?.state_id) {
          onProvinceClick({
            stateId: provinceData.state_id,
          });
        }
      });

      layer.on('mouseover', (e: LeafletMouseEvent) => {
        (layer as L.Path).setStyle({ weight: 2 });
        const name = normalizeProvinceName(feature?.properties || {});
        const provinceData = getProvinceData(name);
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

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>Memuat peta...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>Gagal memuat data peta. Silakan refresh halaman.</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.container}>
        <div className={styles.noDataState}>Tidak ada data peta tersedia</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <MapContainer
        center={center}
        zoom={5}
        className={styles.container}
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
          className={styles.tooltip}
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
