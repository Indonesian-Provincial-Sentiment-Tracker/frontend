import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet';
import { useCallback, useMemo, useState } from 'react';
import L, { LeafletMouseEvent, Layer } from 'leaflet';
import { useGeoJSON } from '../../hooks/useGeoJSON';
import { normalizeProvinceName, colorForPercentage } from '../../utils/geo';
import { DUMMY_SENTIMENT } from '../../constants/sentiment';
import type { ClickInfo } from '../../types/sentiment';
import styles from './SentimentMap.module.css';

export default function SentimentMap() {
  const { data } = useGeoJSON();
  const [clicked, setClicked] = useState<ClickInfo | null>(null);
  const [hoverInfo, setHoverInfo] = useState<{ name: string; score?: number } | null>(null);

  const styleFn = useCallback((feature: any) => {
    const name = normalizeProvinceName(feature?.properties || {});
    const score = DUMMY_SENTIMENT[name];
    return {
      color: '#ffffff',
      weight: 1,
      fillColor: colorForPercentage(score),
      fillOpacity: 0.8
    };
  }, []);

  const onEachFeature = useCallback((feature: any, layer: Layer) => {
    layer.on('click', (e: LeafletMouseEvent) => {
      const name = normalizeProvinceName(feature?.properties || {});
      const score = DUMMY_SENTIMENT[name];
      setClicked({ lat: e.latlng.lat, lng: e.latlng.lng, name, score });
    });
    layer.on('mouseover', () => {
      (layer as L.Path).setStyle({ weight: 2 });
      const name = normalizeProvinceName(feature?.properties || {});
      const score = DUMMY_SENTIMENT[name];
      setHoverInfo({ name, score });
    });
    layer.on('mouseout', () => {
      (layer as L.Path).setStyle({ weight: 1 });
      setHoverInfo(null);
    });
  }, []);

  const center = useMemo(() => ({ lat: -2.5, lng: 118 }), []);

  return (
    <div className={styles.container}>
      <MapContainer center={center} zoom={5} className={styles.container}>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data && (
          <GeoJSON data={data as any} style={styleFn as any} onEachFeature={onEachFeature as any} />
        )}
        <div className={styles.overlay}>
          {hoverInfo ? (
            <>
              <div><b>{hoverInfo.name}</b></div>
              <div>Sentimen: {hoverInfo.score != null ? `${Math.round(hoverInfo.score)}%` : 'N/A'}</div>
            </>
          ) : (
            <>
              <div><b>Sentimen</b></div>
              <div>Hover to province</div>
            </>
          )}
        </div>
        {clicked && (
          <Popup position={[clicked.lat, clicked.lng]} eventHandlers={{ remove: () => setClicked(null) }}>
            <div className={styles.popupContent}>
              <div><b>{clicked.name}</b></div>
              <div>Sentimen: {clicked.score != null ? `${Math.round(clicked.score)}%` : 'N/A'}</div>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}

