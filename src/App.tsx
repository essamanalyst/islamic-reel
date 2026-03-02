import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { T, LANGUAGES, BG_KEYS, type Lang, type LangInfo } from './i18n';

/* ═══════════════════ LANGUAGE CONTEXT ═══════════════════ */
const LangContext = createContext<{ lang: Lang; t: Record<string,string>; setLang: (l:Lang)=>void }>({
  lang: 'ar', t: T.ar, setLang: () => {}
});
const useLang = () => useContext(LangContext);

/* ═══════════════════ DATA ═══════════════════ */
const RECITERS = [
  // 🇰🇼 الكويت
  { id:'ar.alafasy', name:'مشاري العفاسي', en:'Mishary Alafasy', folder:'Alafasy_128kbps', flag:'🇰🇼' },
  // 🇪🇬 مصر
  { id:'ar.abdulbasit.m', name:'عبد الباسط عبد الصمد - مجوّد', en:'Abdul Basit Mujawwad', folder:'Abdul_Basit_Mujawwad_128kbps', flag:'🇪🇬' },
  { id:'ar.abdulbasit', name:'عبد الباسط عبد الصمد - مرتل', en:'Abdul Basit Murattal', folder:'Abdul_Basit_Murattal_192kbps', flag:'🇪🇬' },
  { id:'ar.husary', name:'محمود خليل الحصري', en:'Al-Husary', folder:'Husary_128kbps', flag:'🇪🇬' },
  { id:'ar.husary.m', name:'محمود خليل الحصري - معلم', en:'Al-Husary Muallim', folder:'Husary_Muallim_128kbps', flag:'🇪🇬' },
  { id:'ar.minshawi.m', name:'محمد صديق المنشاوي - مجوّد', en:'Minshawi Mujawwad', folder:'Minshawy_Mujawwad_192kbps', flag:'🇪🇬' },
  { id:'ar.minshawi', name:'محمد صديق المنشاوي - مرتل', en:'Minshawi Murattal', folder:'Minshawy_Murattal_128kbps', flag:'🇪🇬' },
  { id:'ar.tablawi', name:'محمد محمود الطبلاوي', en:'Al-Tablawi', folder:'Mohammad_al_Tablaway_128kbps', flag:'🇪🇬' },
  { id:'ar.jibril', name:'محمد جبريل', en:'Muhammad Jibreel', folder:'Muhammad_Jibreel_128kbps', flag:'🇪🇬' },
  { id:'ar.banna', name:'محمود علي البنا', en:'Mahmoud Ali Al-Banna', folder:'Mahmoud_Ali_Al_Banna_32kbps', flag:'🇪🇬' },
  { id:'ar.neana', name:'أحمد نعينع', en:'Ahmed Neana', folder:'Ahmed_Neana_128kbps', flag:'🇪🇬' },
  { id:'ar.abdulsamad', name:'عبد الباسط عبد الصمد - ورش', en:'Abdul Basit (Warsh)', folder:'Abdulsamad_64kbps_QuranExplorer.Com', flag:'🇪🇬' },
  { id:'ar.mustafa', name:'مصطفى إسماعيل', en:'Mustafa Ismail', folder:'Mustafa_Ismail_48kbps', flag:'🇪🇬' },
  // 🇸🇦 السعودية
  { id:'ar.sudais', name:'عبد الرحمن السديس', en:'As-Sudais', folder:'Sudais_128kbps', flag:'🇸🇦' },
  { id:'ar.shuraim', name:'سعود الشريم', en:'Ash-Shuraim', folder:'Shuraym_128kbps', flag:'🇸🇦' },
  { id:'ar.maaqli', name:'ماهر المعيقلي', en:'Maher Al-Muaiqly', folder:'MaherAlMuworiqly_128kbps', flag:'🇸🇦' },
  { id:'ar.rifai', name:'هاني الرفاعي', en:'Hani Ar-Rifai', folder:'Hani_Rifai_192kbps', flag:'🇸🇦' },
  { id:'ar.shatri', name:'أبو بكر الشاطري', en:'Abu Bakr Ash-Shatri', folder:'Abu_Bakr_Ash-Shaatree_128kbps', flag:'🇸🇦' },
  { id:'ar.ayoub', name:'محمد أيوب', en:'Muhammad Ayyoub', folder:'Muhammad_Ayyoub_128kbps', flag:'🇸🇦' },
  { id:'ar.dossari', name:'ياسر الدوسري', en:'Yasser Ad-Dossari', folder:'Yasser_Ad-Dussary_128kbps', flag:'🇸🇦' },
  { id:'ar.hudhayfi', name:'علي الحذيفي', en:'Ali Al-Hudhayfi', folder:'Hudhaify_128kbps', flag:'🇸🇦' },
  { id:'ar.ajamy', name:'أحمد بن علي العجمي', en:'Ahmed Al-Ajamy', folder:'Ahmed_ibn_Ali_al-Ajamy_128kbps_ketaballah.net', flag:'🇸🇦' },
  { id:'ar.ghamdi', name:'سعد الغامدي', en:'Saad Al-Ghamdi', folder:'Saad_Al_Ghamdi_128kbps', flag:'🇸🇦' },
  { id:'ar.qatami', name:'ناصر القطامي', en:'Nasser Al-Qatami', folder:'Nasser_Alqatami_128kbps', flag:'🇸🇦' },
  { id:'ar.budair', name:'صلاح البدير', en:'Salah Al-Budair', folder:'Salah_Al_Budair_128kbps', flag:'🇸🇦' },
  { id:'ar.basfar', name:'عبدالله بصفر', en:'Abdullah Basfar', folder:'Abdullah_Basfar_192kbps', flag:'🇸🇦' },
  { id:'ar.matrood', name:'عبدالله المطرود', en:'Abdullah Al-Matrood', folder:'Abdullah_Matrood_128kbps', flag:'🇸🇦' },
  { id:'ar.qahtani', name:'خالد القحطاني', en:'Khaled Al-Qahtani', folder:'Khaled_AlQahtani_128kbps', flag:'🇸🇦' },
  { id:'ar.fares', name:'فارس عبّاد', en:'Fares Abbad', folder:'Fares_Abbad_64kbps', flag:'🇸🇦' },
  { id:'ar.akhdar', name:'إبراهيم الأخضر', en:'Ibrahim Al-Akhdar', folder:'Ibrahim_Akhdar_32kbps', flag:'🇸🇦' },
  { id:'ar.sowaid', name:'أيمن سويد', en:'Ayman Sowaid', folder:'Ayman_Sowaid_64kbps', flag:'🇸🇦' },
  { id:'ar.jaber', name:'علي جابر', en:'Ali Jaber', folder:'Ali_Jaber_64kbps', flag:'🇸🇦' },
  { id:'ar.qasim', name:'عبد المحسن القاسم', en:'AbdulMuhsin Al-Qasim', folder:'Abdulmohsen_AlQasim_192kbps', flag:'🇸🇦' },
  { id:'ar.nabil', name:'نبيل الرفاعي', en:'Nabil Ar-Rifai', folder:'Nabil_Rifa3i_48kbps', flag:'🇸🇦' },
  { id:'ar.sahl', name:'سهل ياسين', en:'Sahl Yassin', folder:'Sahl_Yassin_128kbps', flag:'🇸🇦' },
  { id:'ar.luhaidan', name:'محمد اللحيدان', en:'Muhammad Al-Luhaidan', folder:'Muhammad_AlLuworidan_128kbps', flag:'🇸🇦' },
  // 🇦🇪 الإمارات
  { id:'ar.bukhatir', name:'صلاح بو خاطر', en:'Salah Bukhatir', folder:'Salaah_AbdulRahman_Bukhatir_128kbps', flag:'🇦🇪' },
  { id:'ar.tunaiji', name:'خليفة الطنيجي', en:'Khalifa Al-Tunaiji', folder:'Khalefa_Al_Tunaiji_64kbps', flag:'🇦🇪' },
  // 🇮🇷 إيران
  { id:'ar.mansoori', name:'كريم منصوري', en:'Karim Mansoori', folder:'Karim_Mansoori_40kbps', flag:'🇮🇷' },
  { id:'ar.parhizgar', name:'شهریار پرهیزگار', en:'Parhizgar', folder:'Parhizgar_48kbps', flag:'🇮🇷' },
  // 🇧🇦 البوسنة
  { id:'ar.alili', name:'عزيز عليلي', en:'Aziz Alili', folder:'Aziz_Alili_128kbps', flag:'🇧🇦' },
  // 🇱🇾 ليبيا
  { id:'ar.warsh', name:'عبد الرشيد صوفي - ورش', en:'Abdurrashid Sufi (Warsh)', folder:'Abdurrashid_Sufi_64kbps', flag:'🇱🇾' },
];

const SURAHS = [
  {n:1,name:'الفاتحة',en:'Al-Fatiha',a:7,t:'مكية'},{n:2,name:'البقرة',en:'Al-Baqarah',a:286,t:'مدنية'},{n:3,name:'آل عمران',en:'Aal-Imran',a:200,t:'مدنية'},{n:4,name:'النساء',en:'An-Nisa',a:176,t:'مدنية'},{n:5,name:'المائدة',en:"Al-Ma'idah",a:120,t:'مدنية'},{n:6,name:'الأنعام',en:"Al-An'am",a:165,t:'مكية'},{n:7,name:'الأعراف',en:"Al-A'raf",a:206,t:'مكية'},{n:8,name:'الأنفال',en:'Al-Anfal',a:75,t:'مدنية'},{n:9,name:'التوبة',en:'At-Tawbah',a:129,t:'مدنية'},{n:10,name:'يونس',en:'Yunus',a:109,t:'مكية'},
  {n:11,name:'هود',en:'Hud',a:123,t:'مكية'},{n:12,name:'يوسف',en:'Yusuf',a:111,t:'مكية'},{n:13,name:'الرعد',en:"Ar-Ra'd",a:43,t:'مدنية'},{n:14,name:'إبراهيم',en:'Ibrahim',a:52,t:'مكية'},{n:15,name:'الحجر',en:'Al-Hijr',a:99,t:'مكية'},{n:16,name:'النحل',en:'An-Nahl',a:128,t:'مكية'},{n:17,name:'الإسراء',en:"Al-Isra'",a:111,t:'مكية'},{n:18,name:'الكهف',en:'Al-Kahf',a:110,t:'مكية'},{n:19,name:'مريم',en:'Maryam',a:98,t:'مكية'},{n:20,name:'طه',en:'Ta-Ha',a:135,t:'مكية'},
  {n:21,name:'الأنبياء',en:"Al-Anbiya'",a:112,t:'مكية'},{n:22,name:'الحج',en:'Al-Hajj',a:78,t:'مدنية'},{n:23,name:'المؤمنون',en:"Al-Mu'minun",a:118,t:'مكية'},{n:24,name:'النور',en:'An-Nur',a:64,t:'مدنية'},{n:25,name:'الفرقان',en:'Al-Furqan',a:77,t:'مكية'},{n:26,name:'الشعراء',en:"Ash-Shu'ara'",a:227,t:'مكية'},{n:27,name:'النمل',en:'An-Naml',a:93,t:'مكية'},{n:28,name:'القصص',en:'Al-Qasas',a:88,t:'مكية'},{n:29,name:'العنكبوت',en:"Al-'Ankabut",a:69,t:'مكية'},{n:30,name:'الروم',en:'Ar-Rum',a:60,t:'مكية'},
  {n:31,name:'لقمان',en:'Luqman',a:34,t:'مكية'},{n:32,name:'السجدة',en:'As-Sajdah',a:30,t:'مكية'},{n:33,name:'الأحزاب',en:'Al-Ahzab',a:73,t:'مدنية'},{n:34,name:'سبأ',en:"Saba'",a:54,t:'مكية'},{n:35,name:'فاطر',en:'Fatir',a:45,t:'مكية'},{n:36,name:'يس',en:'Ya-Sin',a:83,t:'مكية'},{n:37,name:'الصافات',en:'As-Saffat',a:182,t:'مكية'},{n:38,name:'ص',en:'Sad',a:88,t:'مكية'},{n:39,name:'الزمر',en:'Az-Zumar',a:75,t:'مكية'},{n:40,name:'غافر',en:'Ghafir',a:85,t:'مكية'},
  {n:41,name:'فصلت',en:'Fussilat',a:54,t:'مكية'},{n:42,name:'الشورى',en:'Ash-Shura',a:53,t:'مكية'},{n:43,name:'الزخرف',en:'Az-Zukhruf',a:89,t:'مكية'},{n:44,name:'الدخان',en:'Ad-Dukhan',a:59,t:'مكية'},{n:45,name:'الجاثية',en:'Al-Jathiyah',a:37,t:'مكية'},{n:46,name:'الأحقاف',en:'Al-Ahqaf',a:35,t:'مكية'},{n:47,name:'محمد',en:'Muhammad',a:38,t:'مدنية'},{n:48,name:'الفتح',en:'Al-Fath',a:29,t:'مدنية'},{n:49,name:'الحجرات',en:'Al-Hujurat',a:18,t:'مدنية'},{n:50,name:'ق',en:'Qaf',a:45,t:'مكية'},
  {n:51,name:'الذاريات',en:'Adh-Dhariyat',a:60,t:'مكية'},{n:52,name:'الطور',en:'At-Tur',a:49,t:'مكية'},{n:53,name:'النجم',en:'An-Najm',a:62,t:'مكية'},{n:54,name:'القمر',en:'Al-Qamar',a:55,t:'مكية'},{n:55,name:'الرحمن',en:'Ar-Rahman',a:78,t:'مدنية'},{n:56,name:'الواقعة',en:"Al-Waqi'ah",a:96,t:'مكية'},{n:57,name:'الحديد',en:'Al-Hadid',a:29,t:'مدنية'},{n:58,name:'المجادلة',en:'Al-Mujadilah',a:22,t:'مدنية'},{n:59,name:'الحشر',en:'Al-Hashr',a:24,t:'مدنية'},{n:60,name:'الممتحنة',en:'Al-Mumtahanah',a:13,t:'مدنية'},
  {n:61,name:'الصف',en:'As-Saff',a:14,t:'مدنية'},{n:62,name:'الجمعة',en:"Al-Jumu'ah",a:11,t:'مدنية'},{n:63,name:'المنافقون',en:'Al-Munafiqun',a:11,t:'مدنية'},{n:64,name:'التغابن',en:'At-Taghabun',a:18,t:'مدنية'},{n:65,name:'الطلاق',en:'At-Talaq',a:12,t:'مدنية'},{n:66,name:'التحريم',en:'At-Tahrim',a:12,t:'مدنية'},{n:67,name:'الملك',en:'Al-Mulk',a:30,t:'مكية'},{n:68,name:'القلم',en:'Al-Qalam',a:52,t:'مكية'},{n:69,name:'الحاقة',en:'Al-Haqqah',a:52,t:'مكية'},{n:70,name:'المعارج',en:"Al-Ma'arij",a:44,t:'مكية'},
  {n:71,name:'نوح',en:'Nuh',a:28,t:'مكية'},{n:72,name:'الجن',en:'Al-Jinn',a:28,t:'مكية'},{n:73,name:'المزمل',en:'Al-Muzzammil',a:20,t:'مكية'},{n:74,name:'المدثر',en:'Al-Muddaththir',a:56,t:'مكية'},{n:75,name:'القيامة',en:'Al-Qiyamah',a:40,t:'مكية'},{n:76,name:'الإنسان',en:'Al-Insan',a:31,t:'مدنية'},{n:77,name:'المرسلات',en:'Al-Mursalat',a:50,t:'مكية'},{n:78,name:'النبأ',en:"An-Naba'",a:40,t:'مكية'},{n:79,name:'النازعات',en:"An-Nazi'at",a:46,t:'مكية'},{n:80,name:'عبس',en:"'Abasa",a:42,t:'مكية'},
  {n:81,name:'التكوير',en:'At-Takwir',a:29,t:'مكية'},{n:82,name:'الانفطار',en:'Al-Infitar',a:19,t:'مكية'},{n:83,name:'المطففين',en:'Al-Mutaffifin',a:36,t:'مكية'},{n:84,name:'الانشقاق',en:'Al-Inshiqaq',a:25,t:'مكية'},{n:85,name:'البروج',en:'Al-Buruj',a:22,t:'مكية'},{n:86,name:'الطارق',en:'At-Tariq',a:17,t:'مكية'},{n:87,name:'الأعلى',en:"Al-A'la",a:19,t:'مكية'},{n:88,name:'الغاشية',en:'Al-Ghashiyah',a:26,t:'مكية'},{n:89,name:'الفجر',en:'Al-Fajr',a:30,t:'مكية'},{n:90,name:'البلد',en:'Al-Balad',a:20,t:'مكية'},
  {n:91,name:'الشمس',en:'Ash-Shams',a:15,t:'مكية'},{n:92,name:'الليل',en:'Al-Layl',a:21,t:'مكية'},{n:93,name:'الضحى',en:'Ad-Duha',a:11,t:'مكية'},{n:94,name:'الشرح',en:'Ash-Sharh',a:8,t:'مكية'},{n:95,name:'التين',en:'At-Tin',a:8,t:'مكية'},{n:96,name:'العلق',en:"Al-'Alaq",a:19,t:'مكية'},{n:97,name:'القدر',en:'Al-Qadr',a:5,t:'مكية'},{n:98,name:'البينة',en:'Al-Bayyinah',a:8,t:'مدنية'},{n:99,name:'الزلزلة',en:'Az-Zalzalah',a:8,t:'مدنية'},{n:100,name:'العاديات',en:"Al-'Adiyat",a:11,t:'مكية'},
  {n:101,name:'القارعة',en:"Al-Qari'ah",a:11,t:'مكية'},{n:102,name:'التكاثر',en:'At-Takathur',a:8,t:'مكية'},{n:103,name:'العصر',en:"Al-'Asr",a:3,t:'مكية'},{n:104,name:'الهمزة',en:'Al-Humazah',a:9,t:'مكية'},{n:105,name:'الفيل',en:'Al-Fil',a:5,t:'مكية'},{n:106,name:'قريش',en:'Quraysh',a:4,t:'مكية'},{n:107,name:'الماعون',en:"Al-Ma'un",a:7,t:'مكية'},{n:108,name:'الكوثر',en:'Al-Kawthar',a:3,t:'مكية'},{n:109,name:'الكافرون',en:'Al-Kafirun',a:6,t:'مكية'},{n:110,name:'النصر',en:'An-Nasr',a:3,t:'مدنية'},
  {n:111,name:'المسد',en:'Al-Masad',a:5,t:'مكية'},{n:112,name:'الإخلاص',en:'Al-Ikhlas',a:4,t:'مكية'},{n:113,name:'الفلق',en:'Al-Falaq',a:5,t:'مكية'},{n:114,name:'الناس',en:'An-Nas',a:6,t:'مكية'},
];

interface BG { id: string; name: string; emoji: string; colors: string[]; desc: string; tag: string; img: string; }
const BACKGROUNDS: BG[] = [
  { id:'ocean', name:'أمواج المحيط', emoji:'🌊', colors:['#021a30','#0a3050','#041828'], desc:'أمواج المحيط الزرقاء الصافية', tag:'🌊 بحري',
    img:'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1080&h=1920&fit=crop&crop=entropy&q=80' },
  { id:'sunset', name:'غروب ذهبي', emoji:'🌅', colors:['#1a0a02','#3a1808','#601808'], desc:'غروب الشمس الذهبي فوق السحب', tag:'🌅 غروب',
    img:'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1080&h=1920&fit=crop&crop=entropy&q=80' },
  { id:'forest', name:'الغابة الخضراء', emoji:'🌿', colors:['#021a08','#0a3018','#041a0a'], desc:'أشعة الشمس تتسلل بين أشجار الغابة', tag:'🌿 طبيعة',
    img:'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1080&h=1920&fit=crop&crop=entropy&q=80' },
  { id:'space', name:'الفضاء العميق', emoji:'🪐', colors:['#020208','#08041a','#040210'], desc:'سديم ملون في أعماق الفضاء الكوني', tag:'🪐 فضاء',
    img:'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1080&h=1920&fit=crop&crop=entropy&q=80' },
  { id:'aurora', name:'الشفق القطبي', emoji:'🌌', colors:['#020a18','#041828','#021008'], desc:'أضواء الشفق القطبي الساحرة', tag:'🌌 قطبي',
    img:'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1080&h=1920&fit=crop&crop=entropy&q=80' },
  { id:'desert', name:'الصحراء الذهبية', emoji:'🏜️', colors:['#2a1a08','#4a2810','#1a0c02'], desc:'كثبان رملية ذهبية ممتدة للأفق', tag:'🏜️ صحراء',
    img:'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1080&h=1920&fit=crop&crop=entropy&q=80' },
  { id:'clouds', name:'فوق السحاب', emoji:'☁️', colors:['#1a2a40','#2a3a58','#0a1828'], desc:'بحر من السحب البيضاء عند الشروق', tag:'☁️ سماوي',
    img:'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1080&h=1920&fit=crop&crop=entropy&q=80' },
];

// Image cache
const imageCache: Record<string, HTMLImageElement> = {};
function loadBgImage(url: string): Promise<HTMLImageElement> {
  if (imageCache[url]) return Promise.resolve(imageCache[url]);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => { imageCache[url] = img; resolve(img); };
    img.onerror = reject;
    img.src = url;
  });
}
function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, W: number, H: number) {
  const scale = Math.max(W / img.width, H / img.height);
  const w = img.width * scale, h = img.height * scale;
  ctx.drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
}

/* ═══════════════════ CANVAS BACKGROUNDS ═══════════════════ */
// Seeded random for consistent backgrounds
function seededRandom(seed: number) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

function drawBgOcean(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  // Sky
  const sky = ctx.createLinearGradient(0,0,0,H*0.45);
  sky.addColorStop(0,'#020a18'); sky.addColorStop(0.5,'#0a2040'); sky.addColorStop(1,'#0a3050');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H*0.45);

  // Stars in sky
  const rng = seededRandom(77);
  for (let i = 0; i < 120; i++) {
    const x = rng()*W, y = rng()*H*0.4, r = rng()*1.5+0.3;
    const tw = 0.3+0.7*Math.sin(t*0.002*rng()+rng()*6);
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${tw*0.5})`; ctx.fill();
  }

  // Moon
  const mx = W*0.3, my = H*0.12;
  const mg = ctx.createRadialGradient(mx,my,20,mx,my,150);
  mg.addColorStop(0,'rgba(255,245,220,0.15)'); mg.addColorStop(1,'transparent');
  ctx.fillStyle = mg; ctx.fillRect(0,0,W,H);
  ctx.beginPath(); ctx.arc(mx,my,35,0,Math.PI*2); ctx.fillStyle = 'rgba(255,245,220,0.85)'; ctx.fill();

  // Ocean
  const ocean = ctx.createLinearGradient(0,H*0.4,0,H);
  ocean.addColorStop(0,'#0a3050'); ocean.addColorStop(0.3,'#082840'); ocean.addColorStop(1,'#041828');
  ctx.fillStyle = ocean; ctx.fillRect(0,H*0.4,W,H*0.6);

  // Waves
  for (let layer = 0; layer < 6; layer++) {
    const waveY = H*0.42 + layer*H*0.09;
    const alpha = 0.12 - layer*0.015;
    const colors = ['20,80,140','15,70,130','10,60,120','8,50,100','5,40,80','3,30,60'];
    ctx.beginPath(); ctx.moveTo(0,waveY);
    for (let x = 0; x <= W; x += 4) {
      const y = waveY + Math.sin(x*0.006+t*0.001*(layer+1)*0.5+layer*1.5)*20*(1+layer*0.3)
                + Math.sin(x*0.012+t*0.0015+layer)*8;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath();
    ctx.fillStyle = `rgba(${colors[layer]},${0.5+alpha})`; ctx.fill();
  }

  // Moon reflection on water
  const rx = mx, ry = H*0.55;
  for (let i = 0; i < 15; i++) {
    const ry2 = ry + i*12 + Math.sin(t*0.003+i)*4;
    const rw = 3 + Math.sin(t*0.002+i*0.5)*2;
    ctx.beginPath(); ctx.ellipse(rx+Math.sin(t*0.001+i)*8, ry2, 20-i*0.5, rw, 0, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,245,220,${0.12-i*0.007})`; ctx.fill();
  }
}

function drawBgSunset(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  // Sky gradient
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#1a0820'); sky.addColorStop(0.2,'#3a1040');
  sky.addColorStop(0.35,'#802020'); sky.addColorStop(0.45,'#c06020');
  sky.addColorStop(0.55,'#e09030'); sky.addColorStop(0.65,'#c06020');
  sky.addColorStop(0.8,'#401020'); sky.addColorStop(1,'#100818');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);

  // Sun
  const sunY = H*0.48 + Math.sin(t*0.0002)*5;
  const sunG = ctx.createRadialGradient(W/2,sunY,30,W/2,sunY,250);
  sunG.addColorStop(0,'rgba(255,200,80,0.9)'); sunG.addColorStop(0.2,'rgba(255,150,50,0.4)');
  sunG.addColorStop(0.5,'rgba(255,100,30,0.15)'); sunG.addColorStop(1,'transparent');
  ctx.fillStyle = sunG; ctx.fillRect(0,0,W,H);
  ctx.beginPath(); ctx.arc(W/2,sunY,50,0,Math.PI*2);
  ctx.fillStyle = 'rgba(255,220,120,0.95)'; ctx.fill();

  // Light rays
  ctx.save(); ctx.globalAlpha = 0.04;
  for (let i = 0; i < 12; i++) {
    const angle = (i/12)*Math.PI - Math.PI/2 + Math.sin(t*0.0003+i)*0.05;
    ctx.beginPath(); ctx.moveTo(W/2,sunY);
    ctx.lineTo(W/2+Math.cos(angle)*W, sunY+Math.sin(angle)*H);
    ctx.lineTo(W/2+Math.cos(angle+0.1)*W, sunY+Math.sin(angle+0.1)*H);
    ctx.closePath(); ctx.fillStyle = 'rgba(255,180,80,1)'; ctx.fill();
  }
  ctx.restore();

  // Clouds
  const rng = seededRandom(55);
  for (let i = 0; i < 8; i++) {
    const cx = rng()*W + Math.sin(t*0.0002+i)*30;
    const cy = H*0.15 + rng()*H*0.25;
    const cw = 120+rng()*200, ch = 15+rng()*20;
    const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,cw);
    const lightness = rng()>0.5 ? '255,180,120' : '200,100,60';
    cg.addColorStop(0,`rgba(${lightness},0.12)`); cg.addColorStop(1,'transparent');
    ctx.fillStyle = cg;
    ctx.save(); ctx.scale(1,ch/cw); ctx.fillRect(cx-cw,cy*cw/ch-cw,cw*2,cw*2); ctx.restore();
  }

  // Mountain silhouettes
  ctx.fillStyle = 'rgba(20,5,15,0.9)';
  ctx.beginPath(); ctx.moveTo(0,H*0.7);
  for (let x = 0; x <= W; x += 3) {
    const y = H*0.65 - Math.sin(x*0.003)*50 - Math.sin(x*0.008)*30 - Math.sin(x*0.015)*15;
    ctx.lineTo(x,y);
  }
  ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();

  ctx.fillStyle = 'rgba(15,3,10,0.95)';
  ctx.beginPath(); ctx.moveTo(0,H*0.78);
  for (let x = 0; x <= W; x += 3) {
    const y = H*0.72 - Math.sin(x*0.005+1)*35 - Math.sin(x*0.012)*20;
    ctx.lineTo(x,y);
  }
  ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();

  // Birds
  for (let i = 0; i < 5; i++) {
    const bx = (W*0.3+i*60+t*0.02+i*200)%W;
    const by = H*0.25+Math.sin(t*0.003+i*2)*20+i*15;
    ctx.strokeStyle = 'rgba(30,10,20,0.6)'; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bx-8,by); ctx.quadraticCurveTo(bx-4,by-6,bx,by);
    ctx.quadraticCurveTo(bx+4,by-6,bx+8,by);
    ctx.stroke();
  }
}

function drawBgForest(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  // Sky
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#041808'); sky.addColorStop(0.3,'#0a3018');
  sky.addColorStop(0.7,'#082810'); sky.addColorStop(1,'#021008');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);

  // Fog
  for (let i = 0; i < 4; i++) {
    const fy = H*0.5+i*H*0.12;
    const fg = ctx.createRadialGradient(W/2+Math.sin(t*0.0003+i)*100,fy,0,W/2,fy,W*0.6);
    fg.addColorStop(0,`rgba(100,140,100,${0.06-i*0.01})`); fg.addColorStop(1,'transparent');
    ctx.fillStyle = fg; ctx.fillRect(0,0,W,H);
  }

  // Light rays
  ctx.save(); ctx.globalAlpha = 0.06;
  for (let i = 0; i < 6; i++) {
    const rx = W*0.3+i*W*0.08;
    const rg = ctx.createLinearGradient(rx,0,rx+50,H);
    rg.addColorStop(0,'rgba(180,220,120,0.8)'); rg.addColorStop(0.5,'rgba(180,220,120,0.3)');
    rg.addColorStop(1,'transparent');
    ctx.fillStyle = rg;
    ctx.beginPath(); ctx.moveTo(rx,0); ctx.lineTo(rx-30+Math.sin(t*0.0005)*10,H*0.8);
    ctx.lineTo(rx+40+Math.sin(t*0.0005)*10,H*0.8); ctx.lineTo(rx+20,0); ctx.closePath(); ctx.fill();
  }
  ctx.restore();

  // Trees
  const rng = seededRandom(33);
  for (let layer = 0; layer < 4; layer++) {
    const al = 0.7 + layer*0.08;
    for (let i = 0; i < 8; i++) {
      const tx = rng()*W;
      const th = H*(0.4+layer*0.1+rng()*0.15);
      const tw = 12+layer*4+rng()*8;
      // Trunk
      ctx.fillStyle = `rgba(${30+layer*10},${20+layer*5},${10+layer*3},${al})`;
      ctx.fillRect(tx-tw*0.15,H-th,tw*0.3,th);
      // Canopy
      const leafColor = `rgba(${15+layer*15+Math.floor(rng()*20)},${40+layer*20+Math.floor(rng()*30)},${10+layer*8},${al})`;
      ctx.fillStyle = leafColor;
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        const cy = H-th+j*th*0.2;
        ctx.moveTo(tx,cy-tw*(1.2-j*0.2));
        ctx.lineTo(tx-tw*(1.5-j*0.3),cy+tw*0.3);
        ctx.lineTo(tx+tw*(1.5-j*0.3),cy+tw*0.3);
        ctx.closePath(); ctx.fill();
      }
    }
  }

  // Ground
  const ground = ctx.createLinearGradient(0,H*0.85,0,H);
  ground.addColorStop(0,'rgba(10,25,8,0.9)'); ground.addColorStop(1,'rgba(5,15,5,1)');
  ctx.fillStyle = ground; ctx.fillRect(0,H*0.85,W,H*0.15);

  // Fireflies
  for (let i = 0; i < 25; i++) {
    const fx = (seededRandom(i+100)())*W;
    const fy = H*0.3+(seededRandom(i+200)())*H*0.5;
    const fa = 0.3+0.7*Math.sin(t*0.003*(seededRandom(i+300)())+i*2);
    const fr = 2+Math.sin(t*0.002+i)*1;
    const offX = Math.sin(t*0.001+i*1.5)*15;
    const offY = Math.cos(t*0.0008+i*1.2)*10;
    ctx.beginPath(); ctx.arc(fx+offX,fy+offY,fr,0,Math.PI*2);
    ctx.fillStyle = `rgba(200,255,100,${fa*0.6})`; ctx.fill();
    ctx.beginPath(); ctx.arc(fx+offX,fy+offY,fr*5,0,Math.PI*2);
    ctx.fillStyle = `rgba(200,255,100,${fa*0.05})`; ctx.fill();
  }
}

function drawBgSpace(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  // Deep space
  ctx.fillStyle = '#020208'; ctx.fillRect(0,0,W,H);

  // Nebula clouds
  const nebulae = [
    {x:W*0.3,y:H*0.3,r:300,c1:'60,20,120',c2:'100,40,180'},
    {x:W*0.7,y:H*0.6,r:250,c1:'20,60,140',c2:'40,100,200'},
    {x:W*0.5,y:H*0.8,r:200,c1:'120,30,60',c2:'180,50,80'},
    {x:W*0.2,y:H*0.7,r:180,c1:'20,100,80',c2:'30,150,120'},
  ];
  nebulae.forEach((n,i) => {
    const ox = Math.sin(t*0.0002+i)*30, oy = Math.cos(t*0.00015+i)*20;
    const ng = ctx.createRadialGradient(n.x+ox,n.y+oy,0,n.x+ox,n.y+oy,n.r);
    ng.addColorStop(0,`rgba(${n.c2},0.12)`);
    ng.addColorStop(0.4,`rgba(${n.c1},0.06)`);
    ng.addColorStop(1,'transparent');
    ctx.fillStyle = ng; ctx.fillRect(0,0,W,H);
  });

  // Stars - many
  const rng = seededRandom(99);
  for (let i = 0; i < 500; i++) {
    const x = rng()*W, y = rng()*H;
    const r = rng()*1.8+0.2;
    const tw = 0.2+0.8*Math.sin(t*0.0015*rng()+rng()*6);
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    const col = rng();
    if (col > 0.9) ctx.fillStyle = `rgba(255,200,150,${tw*0.8})`;
    else if (col > 0.75) ctx.fillStyle = `rgba(150,180,255,${tw*0.7})`;
    else if (col > 0.6) ctx.fillStyle = `rgba(255,150,200,${tw*0.6})`;
    else ctx.fillStyle = `rgba(255,255,255,${tw*0.5})`;
    ctx.fill();
    if (r > 1.4) {
      ctx.beginPath(); ctx.arc(x,y,r*3,0,Math.PI*2);
      ctx.fillStyle = `rgba(100,120,255,${tw*0.04})`; ctx.fill();
    }
  }

  // Galaxy spiral
  const gx = W*0.6, gy = H*0.35;
  ctx.save(); ctx.translate(gx,gy); ctx.rotate(t*0.00005);
  for (let arm = 0; arm < 3; arm++) {
    for (let i = 0; i < 60; i++) {
      const angle = arm*Math.PI*2/3 + i*0.15;
      const dist = i*3;
      const px = Math.cos(angle)*dist, py = Math.sin(angle)*dist*0.6;
      const pr = 1.5-i*0.02;
      if (pr > 0) {
        ctx.beginPath(); ctx.arc(px,py,pr,0,Math.PI*2);
        ctx.fillStyle = `rgba(180,160,255,${0.3-i*0.004})`; ctx.fill();
      }
    }
  }
  ctx.restore();

  // Cosmic dust particles
  for (let i = 0; i < 20; i++) {
    const px = (seededRandom(i*7)())*W+Math.sin(t*0.0004+i)*20;
    const py = (seededRandom(i*13)())*H+Math.cos(t*0.0003+i)*15;
    ctx.beginPath(); ctx.arc(px,py,1+Math.sin(t*0.002+i)*0.5,0,Math.PI*2);
    ctx.fillStyle = `rgba(200,150,255,${0.15+0.15*Math.sin(t*0.003+i)})`; ctx.fill();
  }
}

function drawBgAurora(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  // Dark sky
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#020a14'); sky.addColorStop(0.4,'#041828'); sky.addColorStop(1,'#020810');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);

  // Stars
  const rng = seededRandom(66);
  for (let i = 0; i < 200; i++) {
    const x = rng()*W, y = rng()*H*0.6, r = rng()*1.5+0.3;
    const tw = 0.3+0.7*Math.sin(t*0.002*rng()+rng()*6);
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${tw*0.5})`; ctx.fill();
  }

  // Aurora bands
  for (let band = 0; band < 4; band++) {
    ctx.beginPath(); ctx.moveTo(0,H*0.2);
    const points: [number,number][] = [];
    for (let x = 0; x <= W; x += 6) {
      const baseY = H*(0.15+band*0.08);
      const y = baseY + Math.sin(x*0.004+t*0.0008+band*2)*60
                + Math.sin(x*0.008+t*0.0012+band)*30
                + Math.cos(x*0.002+t*0.0005)*40;
      points.push([x,y]);
      ctx.lineTo(x,y);
    }
    for (let i = points.length-1; i >= 0; i--) {
      ctx.lineTo(points[i][0], points[i][1]+80+band*20);
    }
    ctx.closePath();
    const colors = [
      `rgba(40,200,120,${0.08-band*0.015})`,
      `rgba(60,180,200,${0.06-band*0.01})`,
      `rgba(100,60,200,${0.05-band*0.008})`,
      `rgba(40,220,160,${0.04-band*0.005})`,
    ];
    ctx.fillStyle = colors[band]; ctx.fill();
  }

  // Bright aurora core
  const ag = ctx.createLinearGradient(0,H*0.15,0,H*0.4);
  ag.addColorStop(0,'transparent');
  ag.addColorStop(0.3,`rgba(40,200,120,${0.04+0.02*Math.sin(t*0.001)})`);
  ag.addColorStop(0.6,`rgba(60,180,200,${0.03+0.02*Math.sin(t*0.0012)})`);
  ag.addColorStop(1,'transparent');
  ctx.fillStyle = ag; ctx.fillRect(0,0,W,H);

  // Snowy mountains
  ctx.fillStyle = '#0a1520';
  ctx.beginPath(); ctx.moveTo(0,H*0.75);
  for (let x = 0; x <= W; x += 3) {
    const y = H*0.7 - Math.sin(x*0.004)*60 - Math.sin(x*0.01)*25 - Math.sin(x*0.02)*10;
    ctx.lineTo(x,y);
  }
  ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();

  // Snow caps
  ctx.fillStyle = 'rgba(200,210,230,0.15)';
  ctx.beginPath(); ctx.moveTo(0,H*0.75);
  for (let x = 0; x <= W; x += 3) {
    const baseY = H*0.7 - Math.sin(x*0.004)*60 - Math.sin(x*0.01)*25 - Math.sin(x*0.02)*10;
    const snowY = baseY + 8;
    ctx.lineTo(x,snowY);
  }
  for (let x = W; x >= 0; x -= 3) {
    const baseY = H*0.7 - Math.sin(x*0.004)*60 - Math.sin(x*0.01)*25 - Math.sin(x*0.02)*10;
    ctx.lineTo(x,baseY);
  }
  ctx.closePath(); ctx.fill();

  // Foreground
  ctx.fillStyle = '#050d15';
  ctx.beginPath(); ctx.moveTo(0,H*0.88);
  for (let x = 0; x <= W; x += 3) {
    ctx.lineTo(x, H*0.85 - Math.sin(x*0.006)*15 - Math.sin(x*0.015)*8);
  }
  ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();

  // Water reflection
  const ref = ctx.createLinearGradient(0,H*0.85,0,H);
  ref.addColorStop(0,'rgba(40,200,120,0.04)'); ref.addColorStop(0.5,'rgba(60,180,200,0.02)');
  ref.addColorStop(1,'transparent');
  ctx.fillStyle = ref; ctx.fillRect(0,H*0.85,W,H*0.15);
}

function drawBgDesert(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0a0818'); sky.addColorStop(0.3,'#1a1028');
  sky.addColorStop(0.5,'#3a2018'); sky.addColorStop(0.7,'#5a3010');
  sky.addColorStop(1,'#2a1808');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);
  const rng = seededRandom(88);
  for (let i = 0; i < 150; i++) {
    const x = rng()*W, y = rng()*H*0.4, r = rng()*1.2+0.3;
    const tw = 0.3+0.7*Math.sin(t*0.002*rng()+rng()*6);
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${tw*0.4})`; ctx.fill();
  }
  const mx = W*0.7, my = H*0.15;
  const mg = ctx.createRadialGradient(mx,my,25,mx,my,120);
  mg.addColorStop(0,'rgba(255,245,220,0.15)'); mg.addColorStop(1,'transparent');
  ctx.fillStyle = mg; ctx.fillRect(0,0,W,H);
  ctx.beginPath(); ctx.arc(mx,my,30,0,Math.PI*2);
  ctx.fillStyle = 'rgba(255,245,220,0.8)'; ctx.fill();
  for (let layer = 0; layer < 4; layer++) {
    ctx.beginPath(); ctx.moveTo(0,H*(0.55+layer*0.1));
    for (let x = 0; x <= W; x += 3) {
      const y = H*(0.5+layer*0.1) + Math.sin(x*0.003+layer*2+t*0.0001)*40
                + Math.sin(x*0.008+layer)*20 + Math.sin(x*0.001+t*0.00005)*60;
      ctx.lineTo(x,y);
    }
    ctx.lineTo(W,H); ctx.lineTo(0,H); ctx.closePath();
    const al = 0.6+layer*0.1;
    ctx.fillStyle = `rgba(${80+layer*30},${50+layer*15},${20+layer*8},${al})`; ctx.fill();
  }
}

function drawBgClouds(ctx: CanvasRenderingContext2D, W: number, H: number, t: number) {
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#1a2a48'); sky.addColorStop(0.3,'#2a3a60');
  sky.addColorStop(0.5,'#4a5a80'); sky.addColorStop(0.7,'#8090b0');
  sky.addColorStop(1,'#c0a880');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);
  const sg = ctx.createRadialGradient(W*0.3,H*0.7,0,W*0.3,H*0.7,300);
  sg.addColorStop(0,'rgba(255,200,120,0.15)'); sg.addColorStop(1,'transparent');
  ctx.fillStyle = sg; ctx.fillRect(0,0,W,H);
  const rng = seededRandom(44);
  for (let i = 0; i < 30; i++) {
    const cx = rng()*W + Math.sin(t*0.0001+i)*40;
    const cy = H*0.2 + rng()*H*0.6;
    const cw = 150+rng()*300, ch = 40+rng()*60;
    const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,cw);
    const bright = rng() > 0.5;
    cg.addColorStop(0,bright?'rgba(255,255,255,0.2)':'rgba(200,210,230,0.12)');
    cg.addColorStop(0.5,bright?'rgba(255,255,255,0.08)':'rgba(180,190,210,0.06)');
    cg.addColorStop(1,'transparent');
    ctx.fillStyle = cg;
    ctx.save(); ctx.scale(1,ch/cw); ctx.fillRect(cx-cw,cy*cw/ch-cw,cw*2,cw*2); ctx.restore();
  }
}

const BG_DRAW_MAP: Record<string, (ctx:CanvasRenderingContext2D,W:number,H:number,t:number)=>void> = {
  ocean: drawBgOcean, sunset: drawBgSunset,
  forest: drawBgForest, space: drawBgSpace, aurora: drawBgAurora,
  desert: drawBgDesert, clouds: drawBgClouds,
};

function audioUrl(folder: string, s: number, a: number) {
  return `https://everyayah.com/data/${folder}/${String(s).padStart(3,'0')}${String(a).padStart(3,'0')}.mp3`;
}

/* ═══════════════════ SVG ICONS ═══════════════════ */
const I = {
  play: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>,
  pause: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>,
  next: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>,
  prev: <svg fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>,
  /* dl icon removed */
  vol: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>,
  mute: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>,
  /* removed back/fwd icons */
  search: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>,
};

/* ═══════════════════ LANG SELECTOR ═══════════════════ */
function LangSelector() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGES.find((l: LangInfo) => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} className={`lang-btn ${open ? 'open' : ''}`}>
        <span className="lang-flag">{current.flag}</span>
        <span>{current.nativeName}</span>
        <span className="lang-arrow">▼</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {LANGUAGES.map((l: LangInfo) => (
            <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}
              className={`lang-option ${lang === l.code ? 'active' : ''}`}>
              <span className="lang-opt-flag">{l.flag}</span>
              <span className="lang-opt-name">{l.nativeName}</span>
              <span className="lang-opt-native">{l.name}</span>
              {lang === l.code && (
                <span className="lang-opt-check">
                  <svg className="w-2 h-2" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* BgPreview removed - using direct <img> tags now */

/* ═══════════════════ SPLASH - Islamic Animated Intro ═══════════════════ */
function Splash({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(onDone, 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  // Canvas background with Islamic geometry
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth, h = window.innerHeight;
    c.width = w * dpr; c.height = h * dpr; ctx.scale(dpr, dpr);
    let raf = 0;
    const startTime = Date.now();

    const drawIslamicGeometry = (cx: number, cy: number, radius: number, time: number, alpha: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(time * 0.0001);
      ctx.globalAlpha = alpha;

      // 8-pointed star
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const innerAngle = angle + Math.PI / 8;
        const outerX = Math.cos(angle) * radius;
        const outerY = Math.sin(angle) * radius;
        const innerX = Math.cos(innerAngle) * radius * 0.4;
        const innerY = Math.sin(innerAngle) * radius * 0.4;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(outerX, outerY);
        ctx.lineTo(innerX, innerY);
        ctx.closePath();
        ctx.strokeStyle = `rgba(212,168,83,${0.08 + 0.04 * Math.sin(time * 0.002 + i)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Concentric rings
      for (let r = 0; r < 3; r++) {
        const ringR = radius * (0.3 + r * 0.3);
        ctx.beginPath();
        ctx.arc(0, 0, ringR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,168,83,${0.04 - r * 0.01})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      ctx.restore();
    };

    const render = () => {
      const elapsed = Date.now() - startTime;
      
      // Clear
      ctx.fillStyle = '#050a18';
      ctx.fillRect(0, 0, w, h);

      // Radial glow centers
      const glow1 = ctx.createRadialGradient(w * 0.5, h * 0.35, 0, w * 0.5, h * 0.35, w * 0.5);
      glow1.addColorStop(0, 'rgba(212,168,83,0.06)');
      glow1.addColorStop(0.5, 'rgba(79,70,229,0.03)');
      glow1.addColorStop(1, 'transparent');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, w, h);

      const glow2 = ctx.createRadialGradient(w * 0.3, h * 0.7, 0, w * 0.3, h * 0.7, w * 0.4);
      glow2.addColorStop(0, 'rgba(45,212,160,0.03)');
      glow2.addColorStop(1, 'transparent');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, w, h);

      // Islamic geometric patterns in background
      const patterns = [
        { x: w * 0.15, y: h * 0.2, r: 80 },
        { x: w * 0.85, y: h * 0.15, r: 60 },
        { x: w * 0.5, y: h * 0.5, r: 150 },
        { x: w * 0.2, y: h * 0.75, r: 70 },
        { x: w * 0.8, y: h * 0.8, r: 90 },
        { x: w * 0.5, y: h * 0.15, r: 50 },
        { x: w * 0.1, y: h * 0.5, r: 40 },
        { x: w * 0.9, y: h * 0.5, r: 55 },
      ];
      patterns.forEach((p, i) => {
        const fadeIn = Math.min(1, elapsed / (800 + i * 200));
        drawIslamicGeometry(p.x, p.y, p.r, elapsed + i * 1000, fadeIn * 0.06);
      });

      // Stars
      const rng = seededRandom(42);
      for (let i = 0; i < 100; i++) {
        const x = rng() * w, y = rng() * h;
        const r = rng() * 1.2 + 0.3;
        const twinkle = 0.2 + 0.8 * Math.sin(elapsed * 0.002 * (rng() * 0.5 + 0.5) + rng() * Math.PI * 2);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.3})`;
        ctx.fill();
      }

      // Center expanding rings
      const ringAlpha = Math.min(1, elapsed / 1000);
      for (let i = 0; i < 4; i++) {
        const ringProgress = ((elapsed * 0.0003 + i * 0.25) % 1);
        const ringRadius = ringProgress * Math.min(w, h) * 0.4;
        const ringOpacity = (1 - ringProgress) * 0.06 * ringAlpha;
        ctx.beginPath();
        ctx.arc(w / 2, h * 0.4, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,168,83,${ringOpacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Floating golden particles
      for (let i = 0; i < 30; i++) {
        const px = (seededRandom(i * 7)()) * w + Math.sin(elapsed * 0.0005 + i) * 30;
        const py = ((seededRandom(i * 13)()) * h * 1.2 - elapsed * 0.015 * (seededRandom(i * 3)() * 0.5 + 0.5)) % (h * 1.1);
        const adjustedPy = py < 0 ? py + h * 1.1 : py;
        const pa = 0.1 + 0.15 * Math.sin(elapsed * 0.003 + i * 2);
        const pr = 1 + Math.sin(elapsed * 0.002 + i) * 0.5;
        ctx.beginPath();
        ctx.arc(px, adjustedPy, pr, 0, Math.PI * 2);
        const colors = ['212,168,83', '79,70,229', '45,212,160'];
        ctx.fillStyle = `rgba(${colors[i % 3]},${pa})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="splash-overlay">
      <canvas ref={canvasRef} className="absolute inset-0" style={{ width: '100%', height: '100%' }} />

      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Logo */}
        <div className={`splash-logo mb-8 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}
             style={{ transition: 'opacity 0.8s ease' }}>
          <div className="splash-logo-glow" />
          <div className="splash-logo-inner">
            <span className="relative z-10 text-5xl">📖</span>
          </div>
          {/* Decorative rings around logo */}
          {[0, 1, 2].map(i => (
            <div key={i} className="splash-ring"
                 style={{
                   inset: `${-20 - i * 15}px`,
                   animationDelay: `${i * 0.8}s`,
                   borderColor: i === 0 ? 'rgba(212,168,83,0.1)' : i === 1 ? 'rgba(79,70,229,0.06)' : 'rgba(45,212,160,0.04)',
                 }} />
          ))}
        </div>

        {/* Bismillah */}
        <div className={`mb-4 ${phase >= 1 ? 'opacity-100' : 'opacity-0'}`}
             style={{ transition: 'opacity 0.8s ease 0.2s', animation: phase >= 1 ? 'textReveal 0.8s ease 0.3s both' : 'none' }}>
          <p className="text-xl font-quran text-amber-200/40">﷽</p>
        </div>

        {/* Title */}
        <div className={`text-center ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}
             style={{ transition: 'opacity 0.6s ease' }}>
          <h1 className="text-3xl font-black font-display gradient-text mb-2"
              style={{ animation: phase >= 2 ? 'textReveal 0.8s ease both' : 'none' }}>
            {t.splashTitle}
          </h1>
          <p className="text-xs text-white/20 font-semibold tracking-wider"
             style={{ animation: phase >= 2 ? 'textReveal 0.6s ease 0.2s both' : 'none' }}>
            {t.splashSub}
          </p>
        </div>

        {/* Quranic verse */}
        <div className={`mt-8 max-w-xs text-center ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}
             style={{ transition: 'opacity 0.8s ease' }}>
          <p className="text-sm font-quran text-amber-200/20 leading-relaxed"
             style={{ animation: phase >= 3 ? 'verseFade 3s ease both' : 'none' }}>
            ﴿ إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ ﴾
          </p>
        </div>

        {/* Loading dots */}
        <div className="mt-10 flex items-center gap-2" style={{ animation: 'fadeIn 0.5s ease 1.5s both' }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} className="w-1 h-1 rounded-full"
                 style={{
                   background: i % 2 === 0 ? 'rgba(212,168,83,0.4)' : 'rgba(79,70,229,0.3)',
                   animation: `glow 1.2s ease-in-out ${i * 0.15}s infinite`,
                 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════ STEP BAR ═══════════════════ */
function StepBar({ step }: { step: number }) {
  const { t } = useLang();
  const labels = [t.step1Label, t.step2Label, t.step3Label, t.step4Label];
  const icons = ['🎙️','📖','🎬','✨'];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {labels.map((l,i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`step-circle ${i<step?'completed':i===step?'active':'inactive'}`}>
              {i<step ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : <span className="text-[10px]">{icons[i]}</span>}
            </div>
            <span className={`text-[9px] font-bold tracking-wide ${i<step?'text-emerald-400/40':i===step?'gradient-text':'text-white/15'}`}>{l}</span>
          </div>
          {i<3 && <div className={`step-line w-8 sm:w-12 md:w-20 mx-1.5 mb-5 ${i<step?'active':'inactive'}`}/>}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════ STEP 1 ═══════════════════ */
function Step1({ sel, onSel }: { sel: string; onSel: (v:string)=>void }) {
  const { lang, t } = useLang();
  const [q,setQ] = useState('');
  const list = RECITERS.filter(r => r.name.includes(q) || r.en.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="animate-fadeInUp max-w-xl mx-auto">
      <div className="section-header">
        <div className="section-icon"><span>🎙️</span></div>
        <div className="badge badge-gold mb-3">{t.step1Badge}</div>
        <h2 className="text-xl font-black font-display gradient-text">{t.step1Title}</h2>
      </div>
      <div className="relative mb-4">
        <div className={`absolute ${lang === 'ar' || lang === 'ur' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-white/20`}>{I.search}</div>
        <input className={`input-modern ${lang === 'ar' || lang === 'ur' ? 'pr-10' : 'pl-10'}`} placeholder={t.searchReciter} value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="space-y-1 max-h-[55vh] overflow-y-auto pb-4">
        {list.map((r,idx) => (
          <button key={r.id} onClick={()=>onSel(r.id)}
            className={`reciter-card w-full ${sel===r.id?'active':''}`}
            style={{animation:`fadeInUp 0.3s ease ${idx*0.02}s both`}}>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm shrink-0 transition-all ${
              sel===r.id ? 'bg-gradient-to-br from-amber-500/15 to-amber-600/10 border border-amber-500/15' : 'bg-white/[0.03] border border-white/[0.05]'
            }`}>{r.flag}</div>
            <div className="flex-1 min-w-0 text-right">
              <div className={`font-extrabold text-xs transition-colors ${sel===r.id ? 'text-amber-300' : 'text-amber-100/90'}`}>{r.name}</div>
              <div className="text-amber-100/30 text-[9px] font-semibold">{r.en}</div>
            </div>
            {sel===r.id && (
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                <svg className="w-2.5 h-2.5" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════ STEP 2 ═══════════════════ */
function Step2({ surah, from, to, onSurah, onRange }: {
  surah:number; from:number; to:number; onSurah:(n:number)=>void; onRange:(f:number,t:number)=>void;
}) {
  const { lang, t: tr } = useLang();
  const [q,setQ] = useState('');
  const s = SURAHS.find(x=>x.n===surah);
  const list = SURAHS.filter(x=>x.name.includes(q)||x.en.toLowerCase().includes(q.toLowerCase())||String(x.n)===q);
  const isRTL = lang === 'ar' || lang === 'ur';
  return (
    <div className="animate-fadeInUp max-w-xl mx-auto">
      <div className="section-header">
        <div className="section-icon"><span>📖</span></div>
        <div className="badge badge-gold mb-3">{tr.step2Badge}</div>
        <h2 className="text-xl font-black font-display gradient-text">{tr.step2Title}</h2>
      </div>
      <div className="relative mb-4">
        <div className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-white/20`}>{I.search}</div>
        <input className={`input-modern ${isRTL ? 'pr-10' : 'pl-10'}`} placeholder={tr.searchSurah} value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[28vh] overflow-y-auto pb-3 mb-6">
        {list.map(x => (
          <button key={x.n} onClick={()=>{onSurah(x.n);onRange(1,Math.min(x.a,10));}}
            className={`surah-card ${surah===x.n?'active':''}`}>
            <div className="surah-num">{x.n}</div>
            <div className="font-extrabold text-amber-200 text-xs mt-1.5">{x.name}</div>
            <div className="text-amber-100/25 text-[9px] mt-0.5 font-bold">{x.a} آية</div>
          </button>
        ))}
      </div>
      {s && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-black text-amber-200 text-lg font-display">{tr.surah} {s.name}</h3>
              <span className="text-amber-100/35 text-[10px] font-bold">{s.en} • {s.a} {tr.ayah} • {s.t === 'مكية' ? tr.meccan : tr.medinan}</span>
            </div>
            <div className="badge badge-gold">{to-from+1} {tr.ayah}</div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-amber-100/50 text-xs font-bold">{tr.fromAyah}</label>
                <span className="text-amber-300 font-black text-sm">{from}</span>
              </div>
              <input type="range" min={1} max={s.a} value={from} onChange={e=>{const v=+e.target.value;onRange(v,Math.max(v,to));}} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-amber-100/50 text-xs font-bold">{tr.toAyah}</label>
                <span className="text-amber-300 font-black text-sm">{to}</span>
              </div>
              <input type="range" min={from} max={s.a} value={to} onChange={e=>onRange(from,+e.target.value)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ BG CARD ITEM ═══════════════════ */
function BgCardItem({ bg, selected, idx, onSelect }: { bg: BG; selected: boolean; idx: number; onSelect: ()=>void }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas fallback
  useEffect(() => {
    if (!imgError) return;
    const c = canvasRef.current; if (!c) return;
    c.width = 270; c.height = 480;
    const ctx = c.getContext('2d')!;
    const draw = BG_DRAW_MAP[bg.id];
    if (!draw) return;
    let raf = 0;
    const render = () => { draw(ctx, 270, 480, Date.now()); raf = requestAnimationFrame(render); };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [bg.id, imgError]);

  return (
    <button onClick={onSelect}
      className={`bg-card ${selected?'active':''}`}
      style={{aspectRatio:'9/14', animation:`fadeInUp 0.5s ease ${idx*0.06}s both`}}>
      
      {/* Real Image */}
      {!imgError && (
        <>
          {!imgLoaded && (
            <div className="bg-card-loading" style={{background:`linear-gradient(135deg,${bg.colors[0]},${bg.colors[1]},${bg.colors[2]})`}}>
              <div className="w-5 h-5 rounded-full border-2 border-white/10 border-t-white/40 animate-spin" />
            </div>
          )}
          <img
            src={bg.img}
            alt={bg.name}
            crossOrigin="anonymous"
            loading="lazy"
            onLoad={()=>setImgLoaded(true)}
            onError={()=>setImgError(true)}
            className={`bg-card-img ${imgLoaded?'opacity-100':'opacity-0'}`}
          />
        </>
      )}

      {/* Canvas Fallback */}
      {imgError && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{width:'100%',height:'100%'}} />
      )}

      {/* HD badge if image loaded */}
      {imgLoaded && !imgError && (
        <div className="bg-card-hd">📸 HD</div>
      )}

      {/* Check mark */}
      {selected && (
        <div className="bg-check">
          <svg className="w-3 h-3" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
        </div>
      )}

      {/* Bottom Info */}
      <div className="bg-card-info">
        <div className="bg-card-tag">{bg.tag}</div>
        <div className="text-amber-100 font-extrabold text-[11px] leading-tight">{bg.name}</div>
        <div className="text-amber-100/35 text-[8px] mt-0.5 leading-snug font-semibold">{bg.desc}</div>
      </div>
    </button>
  );
}

/* ═══════════════════ PEXELS API ═══════════════════ */
const PEXELS_KEY = 'WXyOGYVU2NGcMJ7OFtmbSKVEAUECzguCggQg0CTtjnjyb5zyUrIX8VMF';
const PEXELS_SUGGESTIONS = ['nature','ocean','sunset','forest','stars','rain','mountains','clouds','desert','aurora','space','galaxy','waterfall','snow','sky','flowers','lake','river','cave','lightning'];

interface PexelsPhoto { id:number; src:{portrait:string;medium:string}; photographer:string; alt:string; }
interface PexelsVideo { id:number; image:string; video_files:{link:string;width:number;height:number;quality:string}[]; user:{name:string}; }

async function searchPexelsPhotos(query:string, page=1): Promise<{photos:PexelsPhoto[];total:number}> {
  const r = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=portrait&per_page=12&page=${page}`, {
    headers: { Authorization: PEXELS_KEY }
  });
  const d = await r.json();
  return { photos: d.photos || [], total: d.total_results || 0 };
}

async function searchPexelsVideos(query:string, page=1): Promise<{videos:PexelsVideo[];total:number}> {
  const r = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&orientation=portrait&per_page=12&page=${page}`, {
    headers: { Authorization: PEXELS_KEY }
  });
  const d = await r.json();
  return { videos: d.videos || [], total: d.total_results || 0 };
}

/* ═══════════════════ STEP 3 ═══════════════════ */
function Step3({ sel, onSel, customUrl, customType, onCustom }: {
  sel: string; onSel: (v:string)=>void;
  customUrl: string; customType: 'video'|'image'|'';
  onCustom: (url:string, type:'video'|'image'|'')=>void;
}) {
  const { t } = useLang();
  const [tab, setTab] = useState<'ready'|'custom'|'pexels'>(customUrl ? 'custom' : 'ready');
  const [urlInput, setUrlInput] = useState(customUrl);
  const [dragOver, setDragOver] = useState(false);
  const [previewOk, setPreviewOk] = useState(!!customUrl);
  const fileRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pexels state
  const [pxQuery, setPxQuery] = useState('');
  const [pxMode, setPxMode] = useState<'photo'|'video'>('photo');
  const [pxPhotos, setPxPhotos] = useState<PexelsPhoto[]>([]);
  const [pxVideos, setPxVideos] = useState<PexelsVideo[]>([]);
  const [pxLoading, setPxLoading] = useState(false);
  const [pxPage, setPxPage] = useState(1);
  const [pxTotal, setPxTotal] = useState(0);
  const [pxSelected, setPxSelected] = useState<number|null>(null);

  const doPexelsSearch = async (query: string, page = 1, mode = pxMode) => {
    if (!query.trim()) return;
    setPxLoading(true);
    try {
      if (mode === 'photo') {
        const res = await searchPexelsPhotos(query, page);
        setPxPhotos(prev => page === 1 ? res.photos : [...prev, ...res.photos]);
        setPxTotal(res.total);
      } else {
        const res = await searchPexelsVideos(query, page);
        setPxVideos(prev => page === 1 ? res.videos : [...prev, ...res.videos]);
        setPxTotal(res.total);
      }
      setPxPage(page);
    } catch (e) { console.error(e); }
    setPxLoading(false);
  };

  const selectPexelsPhoto = (photo: PexelsPhoto) => {
    setPxSelected(photo.id);
    onCustom(photo.src.portrait, 'image');
    onSel('custom');
  };

  const selectPexelsVideo = (video: PexelsVideo) => {
    setPxSelected(video.id);
    // Get best portrait quality video
    const sorted = [...video.video_files].sort((a,b) => (b.height||0) - (a.height||0));
    const best = sorted.find(v => v.height > v.width) || sorted[0];
    if (best) {
      onCustom(best.link, 'video');
      onSel('custom');
    }
  };

  const selBg = BACKGROUNDS.find(b=>b.id===sel);
  const getBgName = (bgId: string) => {
    const key = BG_KEYS[bgId];
    return key ? t[key.name] || BACKGROUNDS.find(b=>b.id===bgId)?.name || '' : '';
  };
  const getBgDesc = (bgId: string) => {
    const key = BG_KEYS[bgId];
    return key ? t[key.desc] || BACKGROUNDS.find(b=>b.id===bgId)?.desc || '' : '';
  };

  const detectType = (url: string): 'video'|'image'|'' => {
    const lower = url.toLowerCase();
    if (/\.(mp4|webm|mov|avi|mkv|ogg)/.test(lower) || lower.includes('video')) return 'video';
    if (/\.(jpg|jpeg|png|webp|gif|bmp|svg)/.test(lower) || lower.includes('image') || lower.includes('unsplash') || lower.includes('pexels')) return 'image';
    return '';
  };

  const applyUrl = (url: string) => {
    if (!url.trim()) return;
    const type = detectType(url);
    const finalType = type || 'image'; // default to image
    setPreviewOk(false);
    onCustom(url, finalType);
    onSel('custom');
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith('video') ? 'video' : 'image';
    onCustom(url, type);
    onSel('custom');
    setUrlInput(file.name);
    setPreviewOk(true);
    setTab('custom');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const clearCustom = () => {
    onCustom('', '');
    setUrlInput('');
    setPreviewOk(false);
    if (sel === 'custom') onSel('ocean');
  };

  const isCustomActive = sel === 'custom' && customUrl;

  return (
    <div className="animate-fadeInUp max-w-2xl mx-auto">
      {/* Header */}
      <div className="section-header">
        <div className="section-icon"><span>🎬</span></div>
        <div className="badge badge-gold mb-3">{t.step3Badge}</div>
        <h2 className="text-xl font-black font-display gradient-text">{t.step3Title}</h2>
        <p className="text-xs font-quran text-amber-200/20 mt-2 max-w-sm mx-auto leading-relaxed">{t.step3Verse}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button onClick={()=>setTab('ready')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-[10px] font-bold transition-all max-h-[28px] ${
            tab==='ready' ? 'bg-indigo-500/12 border border-indigo-500/25 text-indigo-300' : 'bg-white/[0.03] border border-white/[0.05] text-white/30 hover:text-white/50'
          }`}>
          {t.readyBgTab}
        </button>
        <button onClick={()=>setTab('pexels')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-[10px] font-bold transition-all max-h-[28px] ${
            tab==='pexels' ? 'bg-green-500/12 border border-green-500/25 text-green-300' : 'bg-white/[0.03] border border-white/[0.05] text-white/30 hover:text-white/50'
          }`}>
          {t.pexelsTab || '🔍 Pexels'}
        </button>
        <button onClick={()=>setTab('custom')}
          className={`flex-1 py-1.5 px-2.5 rounded-lg text-[10px] font-bold transition-all relative max-h-[28px] ${
            tab==='custom' ? 'bg-amber-500/12 border border-amber-500/25 text-amber-300' : 'bg-white/[0.03] border border-white/[0.05] text-white/30 hover:text-white/50'
          }`}>
          {t.customBgTab}
          {isCustomActive && <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
        </button>
      </div>

      {/* Pexels Tab */}
      {tab === 'pexels' && (
        <div className="space-y-3 mb-5 animate-fadeInUp">
          {/* Search */}
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔍</span>
              <div>
                <h3 className="text-amber-200 font-extrabold text-xs">Pexels</h3>
                <p className="text-amber-100/30 text-[9px] font-semibold">{t.pexelsSearch || 'Search nature photos & videos...'}</p>
              </div>
            </div>

            {/* Mode toggle */}
            <div className="flex gap-1.5 mb-2">
              <button onClick={()=>{setPxMode('photo');setPxPhotos([]);setPxVideos([]);if(pxQuery)doPexelsSearch(pxQuery,1,'photo');}}
                className={`flex-1 py-1 px-2 rounded-lg text-[9px] font-bold transition-all max-h-[26px] ${
                  pxMode==='photo' ? 'bg-cyan-500/12 border border-cyan-500/25 text-cyan-300' : 'bg-white/[0.03] border border-white/[0.05] text-white/30'
                }`}>
                {t.pexelsPhotos || '📸 Photos'}
              </button>
              <button onClick={()=>{setPxMode('video');setPxPhotos([]);setPxVideos([]);if(pxQuery)doPexelsSearch(pxQuery,1,'video');}}
                className={`flex-1 py-1 px-2 rounded-lg text-[9px] font-bold transition-all max-h-[26px] ${
                  pxMode==='video' ? 'bg-purple-500/12 border border-purple-500/25 text-purple-300' : 'bg-white/[0.03] border border-white/[0.05] text-white/30'
                }`}>
                {t.pexelsVideos || '🎬 Videos'}
              </button>
            </div>

            {/* Search input */}
            <div className="flex gap-2">
              <input className="input-modern flex-1" placeholder={t.pexelsSearch || 'Search...'} value={pxQuery}
                onChange={e=>setPxQuery(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter')doPexelsSearch(pxQuery,1);}}
                dir="ltr" />
              <button onClick={()=>doPexelsSearch(pxQuery,1)}
                className="px-2.5 py-1 rounded-lg bg-green-500/15 border border-green-500/15 text-green-300 text-[9px] font-bold hover:bg-green-500/25 transition-all shrink-0 max-h-[28px]">
                🔍
              </button>
            </div>

            {/* Suggestions */}
            <div>
              <p className="text-amber-100/25 text-[8px] font-bold mb-1.5">{t.pexelsSuggestions || 'Suggestions'}:</p>
              <div className="flex flex-wrap gap-1">
                {PEXELS_SUGGESTIONS.map(s => (
                  <button key={s} onClick={()=>{setPxQuery(s);doPexelsSearch(s,1);}}
                    className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-amber-100/40 text-[8px] font-bold hover:bg-white/[0.08] hover:text-amber-200/60 transition-all max-h-[20px]">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading */}
          {pxLoading && (
            <div className="text-center py-6">
              <div className="w-6 h-6 mx-auto rounded-full border-2 border-white/10 border-t-green-400/60 animate-spin mb-2" />
              <p className="text-amber-100/30 text-[10px] font-bold">{t.pexelsSearching || 'Searching...'}</p>
            </div>
          )}

          {/* Photo Results */}
          {!pxLoading && pxMode === 'photo' && pxPhotos.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-amber-100/30 text-[9px] font-bold">{pxTotal} {t.pexelsPhotos || 'photos'}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pxPhotos.map((photo, idx) => (
                  <button key={photo.id} onClick={()=>selectPexelsPhoto(photo)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                      pxSelected === photo.id ? 'border-green-400/50 shadow-lg shadow-green-500/10' : 'border-white/[0.06] hover:border-white/[0.12]'
                    }`}
                    style={{aspectRatio:'9/14', animation:`fadeInUp 0.4s ease ${idx*0.05}s both`}}>
                    <img src={photo.src.medium} alt={photo.alt} crossOrigin="anonymous" loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Badge */}
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[7px] font-bold border border-cyan-500/20 backdrop-blur-sm">📸 HD</span>
                    </div>
                    {/* Selected check */}
                    {pxSelected === photo.id && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                      </div>
                    )}
                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white/50 text-[7px] font-bold truncate">📷 {photo.photographer}</p>
                    </div>
                  </button>
                ))}
              </div>
              {/* Load More */}
              {pxPhotos.length < pxTotal && (
                <button onClick={()=>doPexelsSearch(pxQuery, pxPage+1)}
                  className="w-full py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-amber-100/40 text-[9px] font-bold hover:bg-white/[0.08] transition-all max-h-[28px]">
                  {t.pexelsLoadMore || 'Load more'} ↓
                </button>
              )}
            </div>
          )}

          {/* Video Results */}
          {!pxLoading && pxMode === 'video' && pxVideos.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-amber-100/30 text-[9px] font-bold">{pxTotal} {t.pexelsVideos || 'videos'}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pxVideos.map((video, idx) => (
                  <button key={video.id} onClick={()=>selectPexelsVideo(video)}
                    className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                      pxSelected === video.id ? 'border-purple-400/50 shadow-lg shadow-purple-500/10' : 'border-white/[0.06] hover:border-white/[0.12]'
                    }`}
                    style={{aspectRatio:'9/14', animation:`fadeInUp 0.4s ease ${idx*0.05}s both`}}>
                    <img src={video.image} alt="" crossOrigin="anonymous" loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Badge */}
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-[7px] font-bold border border-purple-500/20 backdrop-blur-sm">🎬 Video</span>
                    </div>
                    {/* Play icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
                        <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    {/* Selected check */}
                    {pxSelected === video.id && (
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center shadow-lg">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                      </div>
                    )}
                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white/50 text-[7px] font-bold truncate">🎥 {video.user.name}</p>
                    </div>
                  </button>
                ))}
              </div>
              {/* Load More */}
              {pxVideos.length < pxTotal && (
                <button onClick={()=>doPexelsSearch(pxQuery, pxPage+1)}
                  className="w-full py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-amber-100/40 text-[9px] font-bold hover:bg-white/[0.08] transition-all max-h-[28px]">
                  {t.pexelsLoadMore || 'Load more'} ↓
                </button>
              )}
            </div>
          )}

          {/* No Results */}
          {!pxLoading && pxQuery && ((pxMode==='photo' && pxPhotos.length===0) || (pxMode==='video' && pxVideos.length===0)) && pxPage > 0 && (
            <div className="text-center py-8">
              <span className="text-3xl mb-2 block">🔍</span>
              <p className="text-amber-100/30 text-xs font-bold">{t.pexelsNoResults || 'No results found'}</p>
            </div>
          )}

          {/* Pexels Attribution */}
          <div className="text-center">
            <p className="text-white/10 text-[8px]">Photos & Videos provided by <span className="text-green-400/30 font-bold">Pexels.com</span></p>
          </div>
        </div>
      )}

      {/* Custom URL Tab */}
      {tab === 'custom' && (
        <div className="space-y-3 mb-5 animate-fadeInUp">
          {/* URL Input */}
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔗</span>
              <div>
                <h3 className="text-amber-200 font-extrabold text-xs">{t.customBg}</h3>
                <p className="text-amber-100/30 text-[9px] font-semibold">{t.customBgDesc}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                className="input-modern flex-1"
                placeholder={t.urlPlaceholder}
                value={urlInput}
                onChange={e => setUrlInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') applyUrl(urlInput); }}
                dir="ltr"
              />
              <button onClick={() => applyUrl(urlInput)}
                className="px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/15 text-indigo-300 text-[9px] font-bold hover:bg-indigo-500/25 transition-all shrink-0 max-h-[28px]">
                ✓
              </button>
            </div>

            <p className="text-amber-100/20 text-[8px] font-semibold">{t.supportedFormats}</p>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/[0.05]" />
              <span className="text-amber-100/25 text-[9px] font-bold">{t.orText}</span>
              <div className="flex-1 h-px bg-white/[0.05]" />
            </div>

            {/* Drag & Drop / Upload */}
            <div
              className={`relative rounded-2xl border-2 border-dashed transition-all p-6 text-center cursor-pointer ${
                dragOver ? 'border-amber-400/40 bg-amber-400/[0.04]' : 'border-white/[0.06] hover:border-white/[0.12] bg-white/[0.01]'
              }`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <input ref={fileRef} type="file" className="hidden" accept="video/*,image/*"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
              <div className="text-3xl mb-2">{dragOver ? '📥' : '📁'}</div>
              <p className="text-amber-100/35 text-[10px] font-bold">{t.dragDrop}</p>
              <p className="text-amber-100/18 text-[8px] mt-1 font-semibold">{t.browseFiles}</p>
            </div>
          </div>

          {/* Custom Preview */}
          {customUrl && (
            <div className="glass-card p-3 space-y-2 animate-scaleIn">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold max-h-[18px] ${
                    customType === 'video' ? 'bg-purple-500/10 text-purple-300 border border-purple-500/15' : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/15'
                  }`}>
                    {customType === 'video' ? t.videoLabel : t.imageLabel}
                  </span>
                  <span className="text-amber-100/35 text-[9px] font-bold">{t.customPreview}</span>
                </div>
                <button onClick={clearCustom} className="text-red-400/40 hover:text-red-400 text-[8px] font-bold transition-all px-1.5 py-0.5 rounded hover:bg-red-500/5 max-h-[22px]">
                  {t.clearCustom}
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/[0.06]" style={{aspectRatio:'16/9', maxHeight:'160px'}}>
                {customType === 'video' ? (
                  <video
                    ref={videoRef}
                    src={customUrl}
                    crossOrigin="anonymous"
                    muted autoPlay loop playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoadedData={() => setPreviewOk(true)}
                    onError={() => setPreviewOk(false)}
                  />
                ) : (
                  <img
                    src={customUrl}
                    crossOrigin="anonymous"
                    className="absolute inset-0 w-full h-full object-cover"
                    onLoad={() => setPreviewOk(true)}
                    onError={() => setPreviewOk(false)}
                    alt={t.customPreview}
                  />
                )}
                {!previewOk && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <div className="text-center">
                      <div className="w-5 h-5 mx-auto rounded-full border-2 border-white/10 border-t-white/40 animate-spin mb-2" />
                      <p className="text-white/20 text-[8px]">{t.loading}...</p>
                    </div>
                  </div>
                )}
                {previewOk && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-lg bg-green-500/20 text-green-300 text-[8px] font-bold border border-green-500/20">
                      ✓ {t.ready}
                    </span>
                  </div>
                )}
              </div>

              {isCustomActive && (
                <div className="text-center">
                  <span className="text-amber-300/50 text-[9px] font-extrabold">{t.customActive}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Ready Backgrounds Tab */}
      {tab === 'ready' && (
        <>
          {/* Selected Preview Banner */}
          {selBg && sel !== 'custom' && (
            <div className="relative rounded-2xl overflow-hidden mb-5 border border-white/[0.06]" style={{height:'100px'}}>
              <img src={selBg.img} alt={getBgName(selBg.id)} crossOrigin="anonymous"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e)=>{(e.target as HTMLImageElement).style.display='none';}} />
              <div className="absolute inset-0" style={{background:`linear-gradient(135deg,${selBg.colors[0]}90,${selBg.colors[1]}60,${selBg.colors[2]}40)`}} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10" />
              <div className="absolute inset-0 z-20 flex items-center px-4 gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-2xl shrink-0">
                  {selBg.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-amber-200 font-extrabold text-sm">{getBgName(selBg.id)}</div>
                  <div className="text-amber-100/45 text-[10px] font-bold">{getBgDesc(selBg.id)}</div>
                </div>
                <div className="shrink-0">
                  <div className="badge badge-green">{t.selected}</div>
                </div>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {BACKGROUNDS.map((bg, idx) => (
              <BgCardItem key={bg.id} bg={{...bg, name: getBgName(bg.id), desc: getBgDesc(bg.id)}} selected={sel===bg.id} idx={idx} onSelect={()=>onSel(bg.id)} />
            ))}
          </div>
        </>
      )}

      {/* Hint */}
      <div className="text-center mt-4">
        <p className="text-white/10 text-[9px]">{t.step3Hint}</p>
      </div>
    </div>
  );
}

/* ═══════════════════ STEP 4: PREVIEW + GENERATE ═══════════════════ */
function Step4({ reciter, surah, from, to, bgId, customUrl, customType, onBack }: {
  reciter:string; surah:number; from:number; to:number; bgId:string; customUrl:string; customType:'video'|'image'|''; onBack:()=>void;
}) {
  const { t: tr } = useLang();
  const rec = RECITERS.find(r=>r.id===reciter)!;
  const sur = SURAHS.find(s=>s.n===surah)!;

  const [ayahs, setAyahs] = useState<string[]>([]);
  const [cur, setCur] = useState(0);
  const [play, setPlay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dlUrl, setDlUrl] = useState('');
  const [aProg, setAProg] = useState(0);
  const [totalProg, setTotalProg] = useState(0);
  const [preloadStatus, setPreloadStatus] = useState<Record<number, boolean>>({});
  const [quality, setQuality] = useState<'high'|'medium'|'low'>('medium');
  const [fileExt, setFileExt] = useState('webm');
  const [genError, setGenError] = useState('');

  const previewRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCache = useRef<Record<number, HTMLAudioElement>>({});
  const isPlayingRef = useRef(false);
  const curRef = useRef(0);
  const totalDurations = useRef<number[]>([]);

  // Fetch ayahs
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.alquran.cloud/v1/surah/${surah}?offset=${from-1}&limit=${to-from+1}`)
      .then(r=>r.json())
      .then(d=>{setAyahs(d.data.ayahs.map((x:{text:string})=>x.text));setLoading(false);})
      .catch(()=>setLoading(false));
  }, [surah,from,to]);

  // Preload all audio files
  useEffect(() => {
    if (ayahs.length === 0) return;
    audioCache.current = {};
    totalDurations.current = [];
    const preloadAll = async () => {
      for (let i = 0; i < ayahs.length; i++) {
        const ayahNum = from + i;
        const url = audioUrl(rec.folder, surah, ayahNum);
        const audio = new Audio();
        audio.crossOrigin = 'anonymous';
        audio.preload = 'auto';
        audio.src = url;
        audioCache.current[i] = audio;
        // Wait for metadata to get duration
        audio.addEventListener('loadedmetadata', () => {
          totalDurations.current[i] = audio.duration;
          setPreloadStatus(prev => ({ ...prev, [i]: true }));
        });
        audio.addEventListener('canplaythrough', () => {
          setPreloadStatus(prev => ({ ...prev, [i]: true }));
        });
        // Preload by loading
        audio.load();
      }
    };
    preloadAll();
    return () => {
      Object.values(audioCache.current).forEach(a => { a.pause(); a.src = ''; });
      audioCache.current = {};
    };
  }, [ayahs, rec.folder, surah, from]);

  // Continuous playback - play current ayah
  useEffect(() => {
    const audio = audioCache.current[cur];
    if (!audio) return;
    
    // Stop previous audio
    Object.entries(audioCache.current).forEach(([idx, a]) => {
      if (parseInt(idx) !== cur) { a.pause(); a.currentTime = 0; }
    });

    audio.muted = muted;
    
    if (play) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }

    // Track progress
    const onTimeUpdate = () => {
      if (audio.duration) {
        setAProg(audio.currentTime / audio.duration);
        // Calculate total progress across all ayahs
        const completedDur = totalDurations.current.slice(0, cur).reduce((s, d) => s + (d || 3), 0);
        const totalDur = totalDurations.current.reduce((s, d) => s + (d || 3), 0);
        const currentProg = audio.currentTime;
        setTotalProg(totalDur > 0 ? (completedDur + currentProg) / totalDur : 0);
      }
    };

    // Auto-advance to next ayah
    const onEnded = () => {
      if (cur < ayahs.length - 1) {
        const next = cur + 1;
        setCur(next);
        curRef.current = next;
        // Immediately play next (continuous)
        const nextAudio = audioCache.current[next];
        if (nextAudio && isPlayingRef.current) {
          nextAudio.muted = muted;
          nextAudio.currentTime = 0;
          nextAudio.play().catch(() => {});
        }
      } else {
        setPlay(false);
        isPlayingRef.current = false;
        setCur(0);
        curRef.current = 0;
        setTotalProg(0);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [cur, play, muted, ayahs.length]);

  // Sync muted state
  useEffect(() => {
    Object.values(audioCache.current).forEach(a => { a.muted = muted; });
  }, [muted]);

  const togglePlay = () => {
    if (play) {
      const audio = audioCache.current[cur];
      if (audio) audio.pause();
      setPlay(false);
      isPlayingRef.current = false;
    } else {
      const audio = audioCache.current[cur];
      if (audio) {
        audio.muted = muted;
        audio.play().catch(() => {});
      }
      setPlay(true);
      isPlayingRef.current = true;
    }
  };

  const goToAyah = (idx: number) => {
    // Stop current
    const currentAudio = audioCache.current[cur];
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; }
    setCur(idx);
    curRef.current = idx;
    // If playing, start new ayah immediately
    if (isPlayingRef.current) {
      const newAudio = audioCache.current[idx];
      if (newAudio) {
        newAudio.muted = muted;
        newAudio.currentTime = 0;
        newAudio.play().catch(() => {});
      }
    }
  };

  const goNext = () => { if (cur < ayahs.length - 1) goToAyah(cur + 1); };
  const goPrev = () => { if (cur > 0) goToAyah(cur - 1); };

  // Count preloaded
  const preloadedCount = Object.keys(preloadStatus).length;

  // Load background image or custom media
  const [bgImg, setBgImg] = useState<HTMLImageElement|null>(null);
  const [customVid, setCustomVid] = useState<HTMLVideoElement|null>(null);
  const [customImg, setCustomImg] = useState<HTMLImageElement|null>(null);

  useEffect(() => {
    if (bgId === 'custom' && customUrl) {
      setBgImg(null);
      if (customType === 'video') {
        const vid = document.createElement('video');
        vid.crossOrigin = 'anonymous';
        vid.muted = true;
        vid.loop = true;
        vid.playsInline = true;
        vid.src = customUrl;
        vid.play().catch(()=>{});
        vid.onloadeddata = () => setCustomVid(vid);
        vid.onerror = () => setCustomVid(null);
        setCustomImg(null);
        return () => { vid.pause(); vid.src = ''; };
      } else {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => setCustomImg(img);
        img.onerror = () => setCustomImg(null);
        img.src = customUrl;
        setCustomVid(null);
      }
    } else {
      setCustomVid(null);
      setCustomImg(null);
      const bg = BACKGROUNDS.find(b=>b.id===bgId);
      if (!bg) return;
      loadBgImage(bg.img).then(setBgImg).catch(()=>setBgImg(null));
    }
  }, [bgId, customUrl, customType]);

  // Preview canvas animation
  useEffect(() => {
    const c = previewRef.current; if (!c) return;
    const ctx = c.getContext('2d')!;
    c.width = 270; c.height = 480;
    const drawFallback = BG_DRAW_MAP[bgId];
    let raf = 0;
    const render = () => {
      // Draw background: custom or real image or canvas fallback
      if (bgId === 'custom' && customVid && customVid.readyState >= 2) {
        drawImageCover(ctx, customVid as unknown as HTMLImageElement, 270, 480);
      } else if (bgId === 'custom' && customImg) {
        drawImageCover(ctx, customImg, 270, 480);
      } else if (bgImg) {
        drawImageCover(ctx, bgImg, 270, 480);
      } else if (drawFallback) {
        drawFallback(ctx, 270, 480, Date.now());
      }
      // Dark overlay for readability
      ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(0,0,270,480);
      // Subtle animated particles overlay
      const t = Date.now();
      for (let i = 0; i < 15; i++) {
        const px = (seededRandom(i*7)())*270 + Math.sin(t*0.0005+i)*8;
        const py = (seededRandom(i*13)())*480 + Math.cos(t*0.0004+i)*6;
        const pa = 0.1 + 0.1*Math.sin(t*0.002+i);
        ctx.beginPath(); ctx.arc(px,py,1,0,Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${pa})`; ctx.fill();
      }
      // Header
      ctx.fillStyle = 'rgba(212,168,83,0.8)';
      ctx.font = '700 16px "Amiri",serif';
      ctx.textAlign = 'center';
      ctx.fillText(`سورة ${sur.name}`, 135, 50);
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.font = '500 10px "Cairo",sans-serif';
      ctx.fillText(`الآية ${from+cur}`, 135, 68);
      // Text
      if (ayahs[cur]) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.font = '700 15px "Amiri Quran","Amiri",serif';
        ctx.textAlign = 'center'; ctx.direction = 'rtl';
        const words = ayahs[cur].split(' ');
        const lines: string[] = []; let cl = '';
        for (const w of words) {
          const tl = cl ? cl+' '+w : w;
          if (ctx.measureText(tl).width > 220 && cl) { lines.push(cl); cl = w; } else cl = tl;
        }
        if (cl) lines.push(cl);
        const sy = (480 - lines.length*28)/2 + 20;
        ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 10;
        lines.forEach((l,i) => ctx.fillText(l, 135, sy+i*28));
        ctx.shadowBlur = 0;
      }
      // Reciter
      ctx.fillStyle = 'rgba(212,168,83,0.5)';
      ctx.font = '600 10px "Cairo",sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`🎙️ ${rec.name}`, 135, 455);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [bgId, bgImg, sur, rec, cur, ayahs, from]);

  // Draw text on canvas for generation (scales with resolution)
  const drawText = useCallback((ctx: CanvasRenderingContext2D, W: number, H: number, text: string, ayahN: number) => {
    const s = W / 1080; // scale factor based on width
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(0,0,W,H);

    // Decorative frame
    const m = 50*s;
    ctx.strokeStyle = 'rgba(212,168,83,0.15)'; ctx.lineWidth = 2*s;
    ctx.strokeRect(m,m,W-m*2,H-m*2);
    [[m,m],[W-m,m],[m,H-m],[W-m,H-m]].forEach(([cx,cy]) => {
      ctx.beginPath(); ctx.arc(cx,cy,18*s,0,Math.PI*2);
      ctx.strokeStyle = 'rgba(212,168,83,0.3)'; ctx.lineWidth = 1.5*s; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx,cy,6*s,0,Math.PI*2);
      ctx.fillStyle = 'rgba(212,168,83,0.2)'; ctx.fill();
    });

    // Header
    ctx.fillStyle = 'rgba(212,168,83,0.85)';
    ctx.font = `900 ${48*s}px "Amiri",serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`سورة ${sur.name}`, W/2, 160*s);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = `500 ${28*s}px "Cairo",sans-serif`;
    ctx.fillText(`الآية ${ayahN}`, W/2, 210*s);

    // Separator line
    ctx.strokeStyle = 'rgba(212,168,83,0.2)'; ctx.lineWidth = 1*s;
    ctx.beginPath(); ctx.moveTo(W*0.3,240*s); ctx.lineTo(W*0.7,240*s); ctx.stroke();

    // Quran text
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = `700 ${52*s}px "Amiri Quran","Amiri",serif`;
    ctx.textAlign = 'center'; ctx.direction = 'rtl';
    const mw = W-180*s, lh = 90*s;
    const words = text.split(' ');
    const lines: string[] = []; let cl = '';
    for (const w of words) {
      const tl = cl ? cl+' '+w : w;
      if (ctx.measureText(tl).width > mw && cl) { lines.push(cl); cl = w; } else cl = tl;
    }
    if (cl) lines.push(cl);
    const sy = (H - lines.length*lh)/2 + 50*s;
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 20*s;
    lines.forEach((l,i) => ctx.fillText(l, W/2, sy+i*lh));
    ctx.shadowBlur = 0;

    // Reciter name
    ctx.fillStyle = 'rgba(212,168,83,0.6)';
    ctx.font = `700 ${32*s}px "Cairo",sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(`🎙️ ${rec.name}`, W/2, H-140*s);

    // Basmala
    ctx.fillStyle = 'rgba(212,168,83,0.25)';
    ctx.font = `400 ${28*s}px "Amiri",serif`;
    ctx.fillText('﷽', W/2, H-90*s);
  }, [sur, rec]);

  const QUALITY_MAP = {
    high: { w: 1080, h: 1920, fps: 30, bps: 2500000, label: 'Full HD' },
    medium: { w: 720, h: 1280, fps: 24, bps: 1200000, label: 'HD' },
    low: { w: 540, h: 960, fps: 20, bps: 600000, label: 'SD' },
  };

  // Generate reel
  const generate = async () => {
    if (!canvasRef.current) return;
    setGenerating(true); setProgress(0); setDlUrl(''); setGenError('');
    
    try {
      const canvas = canvasRef.current;
      const q = QUALITY_MAP[quality];
      canvas.width = q.w; canvas.height = q.h;
      const ctx = canvas.getContext('2d')!;
      const drawBg = BG_DRAW_MAP[bgId];

      // Try to load high-res image for generation
      let genImg: HTMLImageElement|null = bgImg;
      if (!genImg && bgId !== 'custom') {
        const bg = BACKGROUNDS.find(b=>b.id===bgId);
        if (bg) { try { genImg = await loadBgImage(bg.img); } catch { genImg = null; } }
      }

      // Use custom image if available
      if (bgId === 'custom' && customImg) {
        genImg = customImg;
      }

      const aC = new AudioContext();
      const dest = aC.createMediaStreamDestination();
      const cStream = canvas.captureStream(q.fps);
      const combined = new MediaStream();
      cStream.getVideoTracks().forEach(track => combined.addTrack(track));
      dest.stream.getAudioTracks().forEach(track => combined.addTrack(track));

      // Detect best supported mime type
      let mime = 'video/webm';
      const mimeOptions = [
        'video/mp4;codecs=avc1.42E01E,mp4a.40.2',
        'video/mp4',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
      ];
      for (const m of mimeOptions) {
        if (MediaRecorder.isTypeSupported(m)) { mime = m; break; }
      }

      const detectedExt = mime.includes('mp4') ? 'mp4' : 'webm';
      setFileExt(detectedExt);

      const recorder = new MediaRecorder(combined, { mimeType: mime, videoBitsPerSecond: q.bps });
      const chunks: Blob[] = [];
      recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
      
      const recorderDone = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: mime.split(';')[0] });
          resolve(blob);
        };
      });
      
      recorder.start(200);

      const startT = Date.now();
      for (let i = 0; i < ayahs.length; i++) {
        const an = from + i;
        let dur = 4000;
        try {
          const r = await fetch(audioUrl(rec.folder, surah, an));
          if (r.ok) {
            const ab = await r.arrayBuffer();
            const buf = await aC.decodeAudioData(ab);
            const src = aC.createBufferSource();
            src.buffer = buf; src.connect(dest); src.connect(aC.destination); src.start();
            dur = buf.duration * 1000;
          }
        } catch { dur = 4000; }

        const fc = Math.ceil((dur / 1000) * q.fps);
        const frameDur = Math.round(1000 / q.fps);
        for (let f = 0; f < fc; f++) {
          const elapsed = Date.now() - startT;
          // Draw background
          if (bgId === 'custom' && customVid && customVid.readyState >= 2) {
            drawImageCover(ctx, customVid as unknown as HTMLImageElement, q.w, q.h);
          } else if (genImg) {
            drawImageCover(ctx, genImg, q.w, q.h);
          } else if (drawBg) {
            drawBg(ctx, q.w, q.h, elapsed);
          } else {
            ctx.fillStyle = '#050a18';
            ctx.fillRect(0, 0, q.w, q.h);
          }
          drawText(ctx, q.w, q.h, ayahs[i], an);
          await new Promise(resolve => setTimeout(resolve, frameDur));
        }
        setProgress(Math.round(((i + 1) / ayahs.length) * 100));
      }
      
      await new Promise(resolve => setTimeout(resolve, 300));
      recorder.stop();
      
      const blob = await recorderDone;
      const blobUrl = URL.createObjectURL(blob);
      setDlUrl(blobUrl);
      setGenerating(false);
      setProgress(100);
      aC.close();
      
    } catch (err) {
      console.error('Generate error:', err);
      setGenError(String(err));
      setGenerating(false);
    }
  };

  // Download handler - programmatic download to avoid browser blocking
  const handleDownload = () => {
    if (!dlUrl) return;
    const a = document.createElement('a');
    a.href = dlUrl;
    a.download = `quran_${sur.en}_${from}-${to}.${fileExt}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="animate-fadeInUp max-w-5xl mx-auto">
      <div className="section-header">
        <div className="section-icon"><span>✨</span></div>
        <div className="badge badge-emerald mb-3">{tr.step4Badge}</div>
        <h2 className="text-xl font-black font-display gradient-text">{tr.step4Title}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-5">
        {/* Phone Preview */}
                  <div className="flex justify-center">
          <div className="phone-mockup w-[200px]" style={{aspectRatio:'9/16.5'}}>
            <div className="relative w-full h-full overflow-hidden" style={{borderRadius:'30px'}}>
              <canvas ref={previewRef} className="absolute inset-0 w-full h-full" style={{width:'100%',height:'100%'}} />

              {/* Total Progress bar */}
              <div className="absolute bottom-16 left-3 right-3 z-10">
                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500/40 to-amber-400/30 rounded-full transition-all" style={{width:`${totalProg*100}%`}} />
                </div>
              </div>

              {/* Current Ayah Progress bar */}
              <div className="absolute bottom-14 left-3 right-3 z-10">
                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-400/70 to-amber-400/70 rounded-full transition-all" style={{width:`${aProg*100}%`}} />
                </div>
              </div>

              {/* Preload indicator */}
              {preloadedCount < ayahs.length && preloadedCount > 0 && (
                <div className="absolute top-12 left-2 z-10">
                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[7px] text-white/40">{tr.loading} {preloadedCount}/{ayahs.length}</span>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="absolute bottom-2.5 left-0 right-0 z-10">
                <div className="flex items-center justify-center gap-1.5">
                  <button onClick={goPrev} className="ctrl-btn">{I.prev}</button>
                  <button onClick={togglePlay} className="ctrl-btn-play">{play ? I.pause : I.play}</button>
                  <button onClick={goNext} className="ctrl-btn">{I.next}</button>
                  <button onClick={()=>setMuted(!muted)} className="ctrl-btn">
                    {muted ? I.mute : I.vol}
                  </button>
                </div>
              </div>

              {/* Dots */}
              {ayahs.length <= 20 && (
                <div className="absolute left-1 top-1/2 -translate-y-1/2 flex flex-col gap-0.5 z-10">
                  {ayahs.map((_,i) => (
                    <button key={i} onClick={()=>goToAyah(i)}
                      className={`w-0.5 rounded-full transition-all cursor-pointer ${i===cur?'h-2.5 bg-amber-400/80':'h-0.5 bg-white/10'}`} />
                  ))}
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                  <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Info Cards */}
          <div className="glass-card-gold p-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-base">📖</span>
                <div>
                  <div className="text-amber-100/30 text-[8px] font-extrabold uppercase tracking-wider">{tr.infoSurah.replace('📖 ','')}</div>
                  <div className="text-amber-300 font-extrabold text-xs">{sur.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">🎙️</span>
                <div>
                  <div className="text-amber-100/30 text-[8px] font-extrabold uppercase tracking-wider">{tr.infoReciter.replace('🎙️ ','')}</div>
                  <div className="text-amber-200 font-extrabold text-xs">{rec.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">📏</span>
                <div>
                  <div className="text-amber-100/30 text-[8px] font-extrabold uppercase tracking-wider">{tr.infoAyahs.replace('📏 ','')}</div>
                  <div className="text-amber-300 font-extrabold text-xs">{from} → {to} <span className="text-amber-100/25 text-[9px] font-bold">({to-from+1})</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">🎬</span>
                <div>
                  <div className="text-amber-100/30 text-[8px] font-extrabold uppercase tracking-wider">{tr.infoSize.replace('🎬 ','')}</div>
                  <div className="text-amber-200 font-extrabold text-xs">{QUALITY_MAP[quality].w}×{QUALITY_MAP[quality].h}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ayah List */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-amber-200/60 text-xs font-extrabold">{tr.ayahList}</h3>
              <span className="text-amber-100/25 text-[10px] font-bold">{cur+1}/{ayahs.length}</span>
            </div>
            <div className="max-h-[160px] overflow-y-auto space-y-1.5">
              {ayahs.map((txt,i) => (
                <button key={i} onClick={()=>goToAyah(i)}
                  className={`w-full text-right p-2.5 rounded-xl transition-all text-xs cursor-pointer flex items-start gap-2 ${
                    i===cur ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-white/[0.02] hover:bg-white/[0.04] border border-transparent'
                  }`}>
                  <span className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold ${
                    i===cur ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/[0.04] text-white/20'
                  }`}>{from+i}</span>
                  <span className="font-quran text-amber-100/70 leading-relaxed line-clamp-2 font-bold">{txt}</span>
                  {preloadStatus[i] && (
                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-green-500/50 mt-2" title="جاهز" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Selector + Generate */}
          {!generating && !dlUrl && (
            <div className="space-y-3">
              <div className="glass-card p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-amber-200/50 text-[10px] font-extrabold">{tr.qualityLabel || '📐 جودة الريل'}</span>
                  <span className="text-amber-100/20 text-[8px] font-bold">{QUALITY_MAP[quality].label} • {QUALITY_MAP[quality].w}×{QUALITY_MAP[quality].h}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {([
                    { key: 'low' as const, icon: '⚡', label: tr.qualityLow || 'خفيف', sub: '~2 MB', color: 'emerald' },
                    { key: 'medium' as const, icon: '⚖️', label: tr.qualityMed || 'متوسط', sub: '~5 MB', color: 'indigo' },
                    { key: 'high' as const, icon: '💎', label: tr.qualityHigh || 'عالي', sub: '~10 MB', color: 'amber' },
                  ]).map(opt => (
                    <button key={opt.key} onClick={() => setQuality(opt.key)}
                      className={`p-2 rounded-xl text-center transition-all border ${
                        quality === opt.key
                          ? opt.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/25 shadow-lg shadow-emerald-500/5'
                            : opt.color === 'indigo' ? 'bg-indigo-500/10 border-indigo-500/25 shadow-lg shadow-indigo-500/5'
                            : 'bg-amber-500/10 border-amber-500/25 shadow-lg shadow-amber-500/5'
                          : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'
                      }`}>
                      <div className="text-lg mb-0.5">{opt.icon}</div>
                      <div className={`text-[10px] font-extrabold ${
                        quality === opt.key
                          ? opt.color === 'emerald' ? 'text-emerald-300' : opt.color === 'indigo' ? 'text-indigo-300' : 'text-amber-300'
                          : 'text-white/40'
                      }`}>{opt.label}</div>
                      <div className="text-[8px] text-white/20 font-bold mt-0.5">{opt.sub}</div>
                      <div className="text-[7px] text-white/15 font-semibold">{QUALITY_MAP[opt.key].w}×{QUALITY_MAP[opt.key].h}</div>
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={generate} disabled={loading || ayahs.length===0} className="btn-generate disabled:opacity-30 disabled:cursor-not-allowed">
                <span>🎬</span>
                <span>{tr.generateBtn}</span>
              </button>
            </div>
          )}

          {genError && (
            <div className="glass-card p-4 text-center animate-fadeIn border border-red-500/20">
              <p className="text-red-400 text-xs font-bold mb-2">⚠️ {tr.generateError || 'حدث خطأ أثناء التوليد'}</p>
              <p className="text-white/30 text-[9px] font-mono break-all">{genError}</p>
              <button onClick={()=>setGenError('')} className="mt-3 btn-nav btn-nav-next text-[9px]">{tr.tryAgain || 'حاول مرة أخرى'}</button>
            </div>
          )}

          {generating && (
            <div className="glass-card-gold p-6 text-center animate-fadeIn space-y-4">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-white/[0.04]" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 border-r-emerald-500/30 animate-spin" style={{animationDuration:'1.5s'}} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="gradient-text font-black text-sm">{progress}%</span>
                </div>
              </div>
              <div>
                <h3 className="text-amber-200 font-extrabold text-sm">{tr.generating}</h3>
                <p className="text-amber-100/30 text-[10px] mt-1 font-bold">{tr.generatingDesc}</p>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{width:`${progress}%`}} />
              </div>
            </div>
          )}

          {dlUrl && (
            <div className="glass-card-gold p-5 text-center animate-scaleIn space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-600/10 border border-emerald-500/15 flex items-center justify-center">
                <span className="text-3xl">{tr.success}</span>
              </div>
              <h3 className="text-white font-black text-base gradient-text">{tr.successTitle}</h3>
              <video src={dlUrl} controls className="w-full rounded-xl border border-white/[0.06] max-h-[150px] bg-black" />
              <button onClick={handleDownload} className="btn-download">
                <span>{tr.downloadBtn} ({fileExt.toUpperCase()})</span>
              </button>
              <div className="flex gap-2 pt-1">
                <button onClick={()=>{setDlUrl('');setProgress(0);}} className="btn-nav btn-nav-next flex-1 text-[9px]">{tr.newGenerate}</button>
                <button onClick={onBack} className="btn-nav btn-nav-back flex-1 text-[9px]">{tr.changeSettings}</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}

/* ═══════════════════ MAIN APP ═══════════════════ */
function AppInner() {
  const { lang, t } = useLang();
  const [splash, setSplash] = useState(true);
  const [step, setStep] = useState(0);
  const [reciter, setReciter] = useState('ar.alafasy');
  const [surah, setSurah] = useState(1);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(7);
  const [bgId, setBgId] = useState('ocean');
  const [customUrl, setCustomUrl] = useState('');
  const [customType, setCustomType] = useState<'video'|'image'|''>('');

  const dir = LANGUAGES.find(l => l.code === lang)?.dir || 'rtl';

  if (splash) return <Splash onDone={()=>setSplash(false)} />;

  const canNext = () => {
    if (step===0) return !!reciter;
    if (step===1) return surah>0;
    if (step===2) return !!bgId;
    return true;
  };

  return (
    <div className="min-h-screen relative" dir={dir}>
      <div className="app-bg" />
      <div className="relative z-10">
        <header className="glass border-b border-white/[0.04] sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10 flex items-center justify-center"
                   style={{boxShadow:'0 0 20px rgba(212,168,83,0.05)'}}>
                <span className="text-base">📖</span>
              </div>
              <div>
                <h1 className="text-sm font-black font-display gradient-text leading-tight">{t.appTitle}</h1>
                <p className="text-[8px] text-amber-100/25 font-bold tracking-wider">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LangSelector />
              {step > 0 && step < 3 && (
                <button onClick={()=>setStep(s=>s-1)} className="flex items-center gap-1 text-white/20 hover:text-amber-300/50 text-[9px] cursor-pointer px-2 py-0.5 rounded-md hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/[0.05] max-h-[24px]">
                  <span>{t.back}</span>
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 py-6">
          <StepBar step={step} />
          {step===0 && <Step1 sel={reciter} onSel={setReciter} />}
          {step===1 && <Step2 surah={surah} from={from} to={to} onSurah={setSurah} onRange={(f,tt)=>{setFrom(f);setTo(tt);}} />}
          {step===2 && <Step3 sel={bgId} onSel={setBgId} customUrl={customUrl} customType={customType} onCustom={(url,type)=>{setCustomUrl(url);setCustomType(type);}} />}
          {step===3 && <Step4 reciter={reciter} surah={surah} from={from} to={to} bgId={bgId} customUrl={customUrl} customType={customType} onBack={()=>setStep(0)} />}

          {/* Floating Navigation Buttons */}
          {step < 3 && (
            <>
              {/* Next Button - Right Side */}
              <div className="floating-nav floating-nav-next">
                <button onClick={()=>setStep(s=>s+1)} disabled={!canNext()} className="floating-btn floating-btn-next disabled:opacity-20 disabled:cursor-not-allowed disabled:transform-none">
                  <svg className="floating-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {dir === 'rtl' 
                      ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
                      : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                    }
                  </svg>
                  <span className="floating-label">{step===2 ? t.preview : t.next}</span>
                </button>
              </div>

              {/* Back Button - Left Side */}
              {step > 0 && (
                <div className="floating-nav floating-nav-back">
                  <button onClick={()=>setStep(s=>s-1)} className="floating-btn floating-btn-back">
                    <svg className="floating-icon w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {dir === 'rtl'
                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7"/>
                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7"/>
                      }
                    </svg>
                    <span className="floating-label">{t.prev}</span>
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        <footer className="text-center py-10 space-y-3">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/15" />
            <span className="text-amber-400/30 text-[10px]">✦</span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/15" />
          </div>
          <p className="text-amber-300/25 text-sm font-quran tracking-wider">{t.charity}</p>
          <p className="text-white/10 text-[10px]">{t.developer} <span className="gradient-text font-bold text-[11px]">{t.devName}</span></p>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem('quran-reels-lang');
    if (saved && saved in T) return saved as Lang;
    const browserLang = navigator.language.split('-')[0];
    if (browserLang in T) return browserLang as Lang;
    return 'ar';
  });

  useEffect(() => {
    localStorage.setItem('quran-reels-lang', lang);
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, t: T[lang], setLang }}>
      <AppInner />
    </LangContext.Provider>
  );
}
