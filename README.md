# 🕌 Quran Reels Generator | مُولّد ريلز القرآن الكريم

<div align="center">

![Quran Reels Generator](https://img.shields.io/badge/Quran-Reels%20Generator-gold?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2Q0YTg1MyIgZD0iTTEyIDJMMyA3djEwbDkgNSA5LTVWN2wtOS01eiIvPjwvc3ZnPg==)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**A professional Quran Reels generator with beautiful nature backgrounds, multiple reciters, and downloadable MP4/WebM videos in 9:16 format.**

**مُولّد ريلز قرآنية احترافي مع خلفيات طبيعية جميلة، قراء متعددين، وإمكانية تحميل الريلز بصيغة MP4/WebM بمقاس 9:16.**

[🚀 Live Demo](https://islamic-reels.vercel.app/) · [📖 Documentation](#features) · [🐛 Report Bug](../../issues) · [💡 Request Feature](../../issues)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎙️ Reciters](#️-reciters)
- [🎬 Backgrounds](#-backgrounds)
- [🌍 Languages](#-languages)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
- [📱 How to Use](#-how-to-use)
- [🔗 Pexels API Integration](#-pexels-api-integration)
- [📸 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Credits](#-credits)

---

## ✨ Features

### 🎬 Reel Generation
- **9:16 Portrait Format** — Perfect for Instagram Reels, TikTok, YouTube Shorts
- **3 Quality Levels** — Light (540×960), Medium (720×1280), High (1080×1920)
- **MP4 & WebM Export** — Auto-detects browser support for best format
- **Canvas-based Rendering** — Smooth animated backgrounds rendered frame-by-frame
- **Audio Integration** — Quran recitation audio synced with video using Web Audio API

### 🎙️ 42 Reciters
- World-renowned Quran reciters from multiple countries
- Audio sourced from [everyayah.com](https://everyayah.com/)
- Continuous playback across selected ayahs
- Audio preloading for seamless transitions

### 📖 Full Quran Support
- All **114 Surahs** with accurate ayah counts
- **Uthmani Script** text fetched from [Quran API](https://api.alquran.cloud/)
- Select any range of ayahs (from X to Y)
- Smart search by surah name (Arabic/English) or number

### 🎨 Beautiful Backgrounds
- **6 Animated Canvas Backgrounds**: Ocean waves, Golden sunset, Green forest, Deep space, Aurora borealis, Clouds
- **Pexels API Integration**: Search and use millions of free HD photos & videos
- **Custom URL Support**: Use any image or video URL as background
- All backgrounds rendered at 9:16 aspect ratio

### 🌍 Multi-Language Support
- **12 Languages**: Arabic, English, French, Spanish, German, Turkish, Urdu, Indonesian, Malay, Chinese, Russian, Portuguese
- RTL support for Arabic and Urdu
- Complete UI translation

### 🎨 Professional UI/UX
- **Islamic-themed splash screen** with animated geometric patterns
- **Glassmorphism** design with elegant golden accents
- **Smooth animations** and transitions throughout
- **Responsive design** — works on desktop and mobile
- **Floating navigation buttons** — always accessible while scrolling
- **Step-by-step wizard** (4 steps) for easy reel creation

---

## 🎙️ Reciters

<details>
<summary><b>Click to see all 42 reciters</b></summary>

| # | Reciter | Country | Style |
|---|---------|---------|-------|
| 1 | Mishary Rashid Alafasy | 🇰🇼 Kuwait | Murattal |
| 2 | Abdul Basit Abdul Samad | 🇪🇬 Egypt | Murattal |
| 3 | Abdul Basit (Mujawwad) | 🇪🇬 Egypt | Mujawwad |
| 4 | Abdul Basit (Warsh) | 🇪🇬 Egypt | Warsh |
| 5 | Mahmoud Khalil Al-Hussary | 🇪🇬 Egypt | Murattal |
| 6 | Al-Hussary (Mu'allim) | 🇪🇬 Egypt | Teaching |
| 7 | Mohamed Siddiq Al-Minshawi | 🇪🇬 Egypt | Murattal |
| 8 | Al-Minshawi (Mujawwad) | 🇪🇬 Egypt | Mujawwad |
| 9 | Mahmoud Ali Al-Banna | 🇪🇬 Egypt | Murattal |
| 10 | Mustafa Ismail | 🇪🇬 Egypt | Murattal |
| 11 | Ahmed Neana | 🇪🇬 Egypt | Murattal |
| 12 | Abdur-Rahman as-Sudais | 🇸🇦 Saudi Arabia | Murattal |
| 13 | Saud Al-Shuraim | 🇸🇦 Saudi Arabia | Murattal |
| 14 | Maher Al-Muaiqly | 🇸🇦 Saudi Arabia | Murattal |
| 15 | Hani Ar-Rifai | 🇸🇦 Saudi Arabia | Murattal |
| 16 | Abu Bakr Al-Shatri | 🇸🇦 Saudi Arabia | Murattal |
| 17 | Muhammad Ayyub | 🇸🇦 Saudi Arabia | Murattal |
| 18 | Yasser Al-Dosari | 🇸🇦 Saudi Arabia | Murattal |
| 19 | Ali Al-Hudhaify | 🇸🇦 Saudi Arabia | Murattal |
| 20 | Ahmad Al-Ajmi | 🇸🇦 Saudi Arabia | Murattal |
| 21 | Nasser Al-Qatami | 🇸🇦 Saudi Arabia | Murattal |
| 22 | Mohammad Jibreel | 🇪🇬 Egypt | Murattal |
| 23 | Saad Al-Ghamdi | 🇸🇦 Saudi Arabia | Murattal |
| 24 | Salah Bukhatir | 🇦🇪 UAE | Murattal |
| 25 | Mohammad Al-Tablawi | 🇪🇬 Egypt | Murattal |
| 26 | Abdullah Basfar | 🇸🇦 Saudi Arabia | Murattal |
| 27 | Salah Al-Budair | 🇸🇦 Saudi Arabia | Murattal |
| 28 | Abdullah Al-Matrood | 🇸🇦 Saudi Arabia | Murattal |
| 29 | Khaled Al-Qahtani | 🇸🇦 Saudi Arabia | Murattal |
| 30 | Fares Abbad | 🇸🇦 Saudi Arabia | Murattal |
| 31 | Ibrahim Al-Akhdar | 🇸🇦 Saudi Arabia | Murattal |
| 32 | Ayman Sowaid | 🇸🇦 Saudi Arabia | Murattal |
| 33 | Ali Jaber | 🇸🇦 Saudi Arabia | Murattal |
| 34 | AbdulMuhsin Al-Qasim | 🇸🇦 Saudi Arabia | Murattal |
| 35 | Nabil Ar-Rifai | 🇸🇦 Saudi Arabia | Murattal |
| 36 | Sahl Yasin | 🇸🇦 Saudi Arabia | Murattal |
| 37 | Muhammad Al-Luhaidan | 🇸🇦 Saudi Arabia | Murattal |
| 38 | Khalifa Al-Tunaiji | 🇦🇪 UAE | Murattal |
| 39 | Karim Mansouri | 🇮🇷 Iran | Murattal |
| 40 | Shahryar Parhizgar | 🇮🇷 Iran | Murattal |
| 41 | Abdur-Rashid Sufi (Warsh) | 🇱🇾 Libya | Warsh |
| 42 | Fatih Seferagic | 🇧🇦 Bosnia | Murattal |

</details>

---

## 🎬 Backgrounds

### Canvas Animated Backgrounds (Built-in)

| Background | Description |
|-----------|-------------|
| 🌊 **Ocean Waves** | Animated multi-layer ocean waves with moon reflection |
| 🌅 **Golden Sunset** | Glowing sun with mountains, clouds, and birds |
| 🌿 **Green Forest** | Layered trees with light rays and fireflies |
| 🪐 **Deep Space** | Nebulae, galaxies, and 500+ twinkling stars |
| 🌌 **Aurora Borealis** | Dancing aurora with snow-capped mountains |
| ☁️ **Above Clouds** | Sea of white clouds at sunrise |

### Pexels Integration
- Search millions of free **photos** and **videos** from [Pexels](https://www.pexels.com/)
- Auto-filters for **portrait orientation** (9:16)
- 20 suggested search keywords (nature, ocean, sunset, forest, stars, rain, etc.)
- Browse and load more results

### Custom Backgrounds
- Paste any **image URL** or **video URL**
- Supports direct links from any source

---

## 🌍 Languages

| Language | Code | Direction |
|----------|------|-----------|
| 🇸🇦 العربية (Arabic) | `ar` | RTL |
| 🇬🇧 English | `en` | LTR |
| 🇫🇷 Français (French) | `fr` | LTR |
| 🇪🇸 Español (Spanish) | `es` | LTR |
| 🇩🇪 Deutsch (German) | `de` | LTR |
| 🇹🇷 Türkçe (Turkish) | `tr` | LTR |
| 🇵🇰 اردو (Urdu) | `ur` | RTL |
| 🇮🇩 Bahasa Indonesia | `id` | LTR |
| 🇲🇾 Bahasa Melayu (Malay) | `ms` | LTR |
| 🇨🇳 中文 (Chinese) | `zh` | LTR |
| 🇷🇺 Русский (Russian) | `ru` | LTR |
| 🇧🇷 Português (Portuguese) | `pt` | LTR |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI Component Framework |
| **TypeScript 5** | Type Safety |
| **Vite 6** | Build Tool & Dev Server |
| **Tailwind CSS 4** | Utility-first Styling |
| **Canvas API** | Background rendering & video generation |
| **MediaRecorder API** | Video recording from canvas |
| **Web Audio API** | Audio processing & mixing |
| **Pexels API** | Free stock photos & videos |
| **Quran API** | Ayah text (Uthmani script) |
| **EveryAyah.com** | Audio recitations |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/quran-reels-generator.git

# Navigate to project directory
cd quran-reels-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## 📱 How to Use

### Step 1: Choose a Reciter 🎙️
- Browse through 42 world-renowned Quran reciters
- Use the search bar to find a specific reciter
- Click on a reciter card to select them

### Step 2: Choose a Surah 📖
- Browse all 114 surahs or search by name/number
- Select your desired surah
- Adjust the ayah range using the slider (from X to Y)

### Step 3: Choose a Background 🎨
- **Canvas Tab**: Select from 6 animated backgrounds
- **Pexels Tab**: Search for free HD nature photos/videos
- **Custom Tab**: Paste any image or video URL
- Each background is previewed in 9:16 format

### Step 4: Preview & Generate 🎬
1. **Preview** your reel with live audio playback
2. Select **quality level** (Light / Medium / High)
3. Click **"Generate Reel"** to start recording
4. Wait for the progress bar to complete
5. **Preview** the generated video
6. Click **"Download"** to save the reel to your device

---

## 🔗 Pexels API Integration

This app comes with a built-in Pexels API key for fetching free stock photos and videos. The integration includes:

- **Photo Search**: Returns portrait-oriented (9:16) photos
- **Video Search**: Returns portrait-oriented videos with optimal quality
- **Pagination**: Load more results as needed
- **20 Quick Search Keywords**: Pre-defined nature-related search terms

### API Endpoints Used:
- `GET https://api.pexels.com/v1/search` — Photo search
- `GET https://api.pexels.com/videos/search` — Video search

> **Note**: The included API key has rate limits. For heavy usage, get your own free key at [pexels.com/api](https://www.pexels.com/api/).

---

## 📁 Project Structure

```
quran-reels-generator/
├── public/
├── src/
│   ├── App.tsx          # Main application component
│   ├── i18n.ts          # Multi-language translations (12 languages)
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles & animations
├── index.html           # HTML template
├── package.json         # Dependencies & scripts
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

---

## 🔧 Configuration

### Video Quality Settings

| Quality | Resolution | FPS | Bitrate | ~File Size |
|---------|-----------|-----|---------|------------|
| ⚡ Light | 540×960 | 20 | 600 Kbps | ~2 MB |
| ⚖️ Medium | 720×1280 | 24 | 1.2 Mbps | ~5 MB |
| 💎 High | 1080×1920 | 30 | 2.5 Mbps | ~10 MB |

### Browser Compatibility

| Browser | MP4 | WebM | Notes |
|---------|-----|------|-------|
| Chrome 121+ | ✅ | ✅ | Best support |
| Firefox | ❌ | ✅ | WebM only |
| Safari 17+ | ✅ | ❌ | MP4 only |
| Edge 121+ | ✅ | ✅ | Same as Chrome |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Ideas for Contribution
- [ ] Add more animated canvas backgrounds
- [ ] Add translation text overlay option
- [ ] Add audio effects (echo, reverb)
- [ ] Add social media direct sharing
- [ ] Add batch reel generation
- [ ] Add background music option
- [ ] Add text animation effects
- [ ] Add watermark customization

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

### APIs & Services
- **[EveryAyah.com](https://everyayah.com/)** — Quran audio recitations
- **[Al Quran Cloud API](https://alquran.cloud/api)** — Quran text (Uthmani script)
- **[Pexels API](https://www.pexels.com/api/)** — Free stock photos & videos
- **[Unsplash](https://unsplash.com/)** — Background preview images

### Fonts
- **[Amiri Quran](https://fonts.google.com/specimen/Amiri)** — Arabic Quranic text
- **[Cairo](https://fonts.google.com/specimen/Cairo)** — Arabic UI text

### Developer
- **Essam Fathy** (عصام فتحي) — Development & Design

---

## 📣 Sadaqah Jariyah | صدقة جارية

> This project is developed as **Sadaqah Jariyah** (ongoing charity). May Allah accept it and make it beneficial for the Muslim Ummah.
> 
> هذا المشروع تم تطويره كـ **صدقة جارية**. نسأل الله أن يتقبله وأن يجعله نافعاً للأمة الإسلامية.

---

<div align="center">

**⭐ If you find this project useful, please give it a star! ⭐**

**إذا أعجبك المشروع، لا تنسَ نجمة ⭐**

Made with ❤️ for the Muslim Ummah

</div>
