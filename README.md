<p align="center">
  <a href="#">
    <img src="assets/logo.png" alt="Sentiment Map ID" width="100" />
  </a>
</p>

<h2 align="center">Sentiment Map Indonesia</h2>

<p align="center">
  Aplikasi web untuk memvisualisasikan sentimen per provinsi di Indonesia menggunakan peta interaktif.
  <br/>
  <a href="#penggunaan"><strong>Lihat cara penggunaan »</strong></a>
  <br/>
  <br/>
  <a href="#instalasi">Instalasi</a>
  ·
  <a href="#fitur">Fitur</a>
  ·
  <a href="#lisensi">Lisensi</a>
</p>

---

## Daftar Isi

- [Deskripsi](#deskripsi)
- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
  - [Prasyarat](#1-prasyarat)
  - [Clone & Dependensi](#2-clone--dependensi)
  - [Jalankan Lokal](#3-jalankan-lokal)
- [Penggunaan](#penggunaan)
- [Struktur Proyek](#struktur-proyek)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)
- [Ucapan Terima Kasih](#ucapan-terima-kasih)

## Deskripsi

<p align="center">
  <img src="assets/screenshot.png" alt="Screenshot" width="720" />
  <br/>
</p>

Proyek ini menampilkan peta choropleth (warna per wilayah) untuk 38 provinsi Indonesia dengan persentase sentimen. Data sentimen saat ini berupa dummy di sisi frontend, namun arsitektur sudah dipisah agar mudah diganti dengan API backend.

## Fitur

- Peta interaktif berbasis Leaflet (pan/zoom, klik, hover)
- Choropleth: warna berdasarkan persentase sentimen
- Popup saat klik provinsi dan overlay tooltip di kanan atas saat hover
- Responsif dalam card (tidak full screen), mudah diubah tinggi/ukuran
- Struktur kode modular: components, hooks, services, utils, constants, types

## Tech Stack

<p>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=061a2b" alt="React"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/></a>
  <a href="https://leafletjs.com/"><img src="https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet"/></a>
  <a href="https://react-leaflet.js.org/"><img src="https://img.shields.io/badge/react--leaflet-4-199900?style=for-the-badge" alt="React Leaflet"/></a>
  <a href="https://eslint.org/"><img src="https://img.shields.io/badge/ESLint-9-4b32c3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint"/></a>
  <a href="https://prettier.io/"><img src="https://img.shields.io/badge/Prettier-3-f7b93e?style=for-the-badge&logo=prettier&logoColor=000" alt="Prettier"/></a>
</p>

## Instalasi

### 1) Prasyarat

- Node.js 18+ dan npm

### 2) Clone & Dependensi

```bash
git clone https://github.com/<kamu>/sentiment-map-indonesia.git
cd sentiment-map-indonesia
npm install
```

### 3) Jalankan Lokal

```bash
npm run dev
# buka URL yang ditampilkan (mis. http://localhost:5173)
```

opsional: build produksi

```bash
npm run build
npm run preview
```

## Penggunaan

1. Letakkan file GeoJSON provinsi di `public/indonesia-provinsi.json`.
   - Jika kosong atau tidak ditemukan, aplikasi fallback ke sumber publik (remote) otomatis.
2. Jalankan aplikasi, arahkan kursor ke provinsi untuk melihat tooltip sentimen; klik untuk popup detail.
3. Ubah dummy sentimen di `src/constants/sentiment.ts` (0–100). Aturan warna:
   - < 50% merah, 50–75% kuning, > 75% hijau.

## Struktur Proyek

```
frontend/
├─ public/
│  └─ indonesia-provinsi.json        # GeoJSON batas provinsi Indonesia
├─ src/
│  ├─ assets/
│  │  └─ images/                     # Aset gambar aplikasi
│  ├─ components/
│  │  ├─ DateDisplay/
│  │  │  ├─ DateDisplay.tsx          # Komponen tampilan tanggal
│  │  │  └─ DateDisplay.module.css
│  │  ├─ SentimentMap/
│  │  │  ├─ SentimentMap.tsx         # Komponen peta interaktif + overlay tooltip
│  │  │  └─ SentimentMap.module.css
│  │  ├─ SentimentStats/
│  │  │  ├─ SentimentStats.tsx       # Komponen statistik sentimen
│  │  │  └─ SentimentStats.module.css
│  │  ├─ Sidebar/
│  │  │  ├─ Sidebar.tsx              # Komponen sidebar navigasi
│  │  │  └─ Sidebar.module.css
│  │  ├─ TopicsList/
│  │  │  ├─ TopicsList.tsx           # Komponen daftar topik
│  │  │  └─ TopicsList.module.css
│  │  └─ ui/
│  │     └─ Card/
│  │        ├─ Card.tsx              # Komponen Card reusable
│  │        └─ Card.module.css
│  ├─ data/
│  │  └─ dummy.json                  # Data dummy untuk development
│  ├─ hooks/
│  │  ├─ useGeoJSON.ts               # Hook memuat data GeoJSON
│  │  └─ useSentimentData.ts         # Hook memuat data sentimen
│  ├─ pages/
│  │  ├─ Home.tsx                    # Halaman utama aplikasi
│  │  └─ Home.module.css
│  ├─ services/
│  │  └─ geojsonService.ts           # Service pemuatan GeoJSON + fallback remote
│  ├─ types/
│  │  ├─ css.d.ts                    # Type definition untuk CSS modules
│  │  └─ sentiment.ts                # Type definition untuk data sentimen
│  ├─ utils/
│  │  ├─ geo.ts                      # Utilitas GeoJSON & pewarnaan peta
│  │  └─ sentiment.ts                # Utilitas pengolahan data sentimen
│  ├─ App.tsx                        # Root component aplikasi
│  ├─ main.tsx                       # Entry point aplikasi
│  └─ index.css                      # Global styles
├─ eslint.config.js                  # Konfigurasi ESLint
├─ index.html                        # HTML template
├─ package.json                      # Dependensi & scripts
├─ tsconfig.json                     # Konfigurasi TypeScript
├─ vite.config.ts                    # Konfigurasi Vite
└─ README.md                         # Dokumentasi proyek
```

## Kontribusi

1. Fork repo dan buat branch fitur: `feat/nama-fitur`.
2. Jalankan `npm run lint` dan `npm run format` sebelum commit.
3. Buka Pull Request dengan deskripsi singkat dan screenshot jika perlu.

## Lisensi

MIT License.

## Ucapan Terima Kasih

- Dataset batas provinsi Indonesia (GeoJSON) diambil dari repositori publik: `ardian28/GeoJson-Indonesia-38-Provinsi`.
- Template struktur README terinspirasi dari komunitas open-source.
