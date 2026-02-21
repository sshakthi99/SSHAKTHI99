import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { 
  Wifi, 
  WifiOff, 
  Cast, 
  Menu, 
  Radio, 
  Maximize, 
  Volume2, 
  VolumeX, 
  ChevronLeft,
  Tv,
  Zap,
  Activity,
  Globe,
  Search,
  Settings,
  Signal,
  Cpu,
  Clock,
  Lock,
  ShieldCheck
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// --- Configuration & Data ---

const LANGUAGES = [
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'North', color: 'from-orange-500 to-yellow-600' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা', region: 'East', color: 'from-red-500 to-pink-600' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు', region: 'South', color: 'from-blue-500 to-cyan-600' },
  { id: 'mr', name: 'Marathi', native: 'मराठी', region: 'West', color: 'from-orange-600 to-red-700' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'South', color: 'from-yellow-500 to-orange-600' },
  { id: 'ur', name: 'Urdu', native: 'اُردُو', region: 'North', color: 'from-green-500 to-emerald-700' },
  { id: 'gu', name: 'Gujarati', native: 'ગુજરાતી', region: 'West', color: 'from-pink-500 to-rose-600' },
  { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'South', color: 'from-red-500 to-orange-600' },
  { id: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', region: 'East', color: 'from-purple-500 to-indigo-600' },
  { id: 'ml', name: 'Malayalam', native: 'മലയാളം', region: 'South', color: 'from-green-400 to-teal-600' },
  { id: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', region: 'North', color: 'from-orange-400 to-amber-600' },
  { id: 'as', name: 'Assamese', native: 'অসমীয়া', region: 'East', color: 'from-teal-500 to-emerald-700' },
];

const MOCK_CHANNELS = {
  hi: [{ name: 'DD National', type: 'Public' }, { name: 'Star Plus Sim', type: 'Drama' }, { name: 'Sony TV Sim', type: 'Variety' }, { name: 'Aaj Tak', type: 'News' }],
  bn: [{ name: 'DD Bangla', type: 'Public' }, { name: 'Star Jalsha Sim', type: 'Drama' }, { name: 'Zee Bangla Sim', type: 'Drama' }],
  te: [{ name: 'DD Yadagiri', type: 'Public' }, { name: 'ETV Sim', type: 'Drama' }, { name: 'Gemini TV Sim', type: 'Variety' }],
  ta: [{ name: 'DD Podhigai', type: 'Public' }, { name: 'Sun TV Sim', type: 'Drama' }, { name: 'Vijay TV Sim', type: 'Variety' }],
  default: [{ name: 'State Broadcast', type: 'Public' }, { name: 'Regional News', type: 'News' }, { name: 'Music Hits', type: 'Music' }]
};

// --- Components ---

const App = () => {
  const [view, setView] = useState<'home' | 'tv'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [currentChannel, setCurrentChannel] = useState<any>(null);
  const [isTuning, setIsTuning] = useState(false);
  const [signalStrength, setSignalStrength] = useState(92);

  const handleLanguageSelect = (langId: string) => {
    setSelectedLanguage(langId);
    const channels = MOCK_CHANNELS[langId as keyof typeof MOCK_CHANNELS] || MOCK_CHANNELS.default;
    setCurrentChannel(channels[0]);
    setIsTuning(true);
    setView('tv');
    
    // Simulate satellite link establishing
    setTimeout(() => setIsTuning(false), 2500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSignalStrength(prev => Math.min(100, Math.max(20, prev + (Math.random() * 8 - 4))));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden font-tech selection:bg-green-500 selection:text-black">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(20,20,20,1)_0%,_rgba(0,0,0,1)_100%)]"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      {/* Dynamic Scanline Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/5 p-4 flex justify-between items-center transition-all">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setView('home')}>
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="w-10 h-10 rounded border border-green-500/50 bg-black flex items-center justify-center relative overflow-hidden">
               <Radio className="text-green-500 w-6 h-6 animate-pulse" />
               <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-500/50 animate-[scanline_2s_linear_infinite]"></div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-[0.2em] leading-none">
              BOGI <span className="text-green-500">LIVE</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Orbital Link v2.5</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="hidden sm:flex flex-col items-end">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/5 bg-white/5">
                <div className={`w-1.5 h-1.5 rounded-full ${signalStrength > 70 ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : signalStrength > 40 ? 'bg-yellow-500' : 'bg-red-500 animate-ping'}`}></div>
                <span className="text-[10px] font-mono text-gray-400">SAT-STRENGTH: {Math.floor(signalStrength)}%</span>
              </div>
           </div>
           <div className="flex items-center gap-2 px-3 py-1 bg-green-900/10 text-green-500 rounded border border-green-500/20 text-[10px] font-bold tracking-tighter">
             <ShieldCheck size={12} />
             <span>ENCRYPTED LINK</span>
           </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto min-h-screen relative z-10">
        {view === 'home' ? (
          <HomePage onLanguageSelect={handleLanguageSelect} />
        ) : (
          <TVInterface 
            language={selectedLanguage} 
            channel={currentChannel} 
            isTuning={isTuning}
            signalStrength={signalStrength}
            onBack={() => setView('home')}
            onChannelChange={(ch) => {
              setCurrentChannel(ch);
              setIsTuning(true);
              setTimeout(() => setIsTuning(false), 1500);
            }}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="fixed bottom-4 left-0 right-0 pointer-events-none opacity-20 text-center text-[10px] tracking-[0.5em] font-mono">
        BOGI LIVE BROADCAST CORP • NO INTERNET REQUIRED • SECURE SAT-LINK ACTIVE
      </footer>
    </div>
  );
};

const HomePage = ({ onLanguageSelect }: { onLanguageSelect: (id: string) => void }) => {
  const [filter, setFilter] = useState<'All' | 'North' | 'South' | 'East' | 'West'>('All');
  
  const filteredLangs = filter === 'All' 
    ? LANGUAGES 
    : LANGUAGES.filter(l => l.region === filter);

  return (
    <div className="animate-[fade-in_0.5s_ease-out]">
      <div className="text-center py-6 mb-8 space-y-4">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600">
          SELECT BROADCAST
        </h2>
        <p className="text-gray-500 font-mono text-sm max-w-lg mx-auto uppercase tracking-widest">
          Scanning planetary regions for active frequencies...
        </p>
      </div>

      {/* Regional Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {['All', 'North', 'South', 'East', 'West'].map((reg) => (
          <button
            key={reg}
            onClick={() => setFilter(reg as any)}
            className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${
              filter === reg 
              ? 'bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]' 
              : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
            }`}
          >
            {reg.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredLangs.map((lang) => (
          <button
            key={lang.id}
            onClick={() => onLanguageSelect(lang.id)}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 hover:border-green-500/50 transition-all duration-500 hover:scale-[1.02] bg-white/[0.02]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${lang.color} opacity-5 group-hover:opacity-20 transition-opacity`}></div>
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <span className="text-4xl md:text-5xl font-bold opacity-20 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-2">
                {lang.native}
              </span>
              <div className="space-y-1">
                <span className="block text-xs font-mono text-green-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  <Lock size={10} /> Frequency Locked
                </span>
                <span className="block text-lg font-bold tracking-[0.1em] uppercase group-hover:text-green-400 transition-colors">
                  {lang.name}
                </span>
              </div>
            </div>
            
            {/* Corner Decorative Elements */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-green-500/40 transition-colors"></div>
            <div className="absolute bottom-4 right-4 flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
               {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-white/40 rounded-full"></div>)}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const TVInterface = ({ 
  language, 
  channel, 
  onBack,
  onChannelChange,
  isTuning,
  signalStrength
}: { 
  language: string | null, 
  channel: any,
  onBack: () => void,
  onChannelChange: (ch: any) => void,
  isTuning: boolean,
  signalStrength: number
}) => {
  const [volume, setVolume] = useState(50);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [aiThinking, setAiThinking] = useState(false);

  const channels = MOCK_CHANNELS[language as keyof typeof MOCK_CHANNELS] || MOCK_CHANNELS.default;

  // AI Program Guide Fetcher
  useEffect(() => {
    if (!channel || !language || isTuning) return;

    const fetchProgramGuide = async () => {
      setAiThinking(true);
      try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
          setSchedule([{ time: '00:00', title: 'System Offline', desc: 'Satellite data requires key.' }]);
          return;
        }

        const ai = new GoogleGenAI({ apiKey });
        const langName = LANGUAGES.find(l => l.id === language)?.name || 'Indian';
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `Generate a fictional 3-item TV schedule for a ${langName} channel named "${channel.name}". 
          Respond with valid JSON: [{"time": "string", "title": "string", "desc": "string"}]. 
          Items should be: Now Playing, Next, and Later. Make the shows sound regional and authentic.`,
          config: { responseMimeType: "application/json" }
        });

        const data = JSON.parse(response.text);
        setSchedule(data);
      } catch (e) {
        setSchedule([{ time: 'N/A', title: 'Encrypted Link', desc: 'Data packets dropped.' }]);
      } finally {
        setAiThinking(false);
      }
    };

    fetchProgramGuide();
  }, [channel, language, isTuning]);

  const videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; 

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Video Content Area */}
      <div className="flex-1 flex flex-col gap-6">
        <button 
          onClick={onBack}
          className="group flex items-center gap-3 text-gray-500 hover:text-green-500 transition-all w-fit px-4 py-2 border border-white/5 rounded-full bg-white/[0.02]"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Signal Browser</span>
        </button>

        {/* TV Container */}
        <div className="relative aspect-video bg-black rounded-3xl overflow-hidden border-4 border-gray-900 shadow-2xl scanline group">
          
          {/* Signal Quality Filters */}
          <div className="absolute inset-0 z-10 pointer-events-none transition-all duration-1000"
               style={{ 
                 backdropFilter: `blur(${signalStrength < 40 ? (40 - signalStrength)/5 : 0}px)`,
                 opacity: signalStrength < 30 ? 0.3 : 1
               }}>
            
            {/* Tuning Overlay */}
            {isTuning && (
              <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center space-y-4">
                 <div className="w-20 h-20 border-t-2 border-green-500 rounded-full animate-spin"></div>
                 <div className="font-mono text-green-500 animate-pulse tracking-[0.5em] text-xs uppercase">
                    Syncing Sat-Link...
                 </div>
                 <div className="text-[10px] text-gray-600 font-mono">
                   LAT: {(Math.random() * 90).toFixed(4)}N / LON: {(Math.random() * 180).toFixed(4)}E
                 </div>
              </div>
            )}

            {/* Main Video Stream */}
            <video 
              src={videoSrc}
              autoPlay 
              loop 
              muted={volume === 0}
              className={`w-full h-full object-cover grayscale-[0.2] contrast-[1.1] transition-opacity ${isTuning ? 'opacity-0' : 'opacity-100'}`}
            />
          </div>
          
          {/* HUD UI Layer */}
          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between pointer-events-none">
            {/* Top Bar */}
            <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-4">
                 <div className="px-3 py-1 bg-red-600 rounded text-[10px] font-black italic tracking-widest animate-pulse">LIVE FEED</div>
                 <div className="px-3 py-1 bg-black/60 backdrop-blur rounded text-[10px] font-mono border border-white/10 uppercase tracking-widest">
                    Ch. {Math.floor(Math.random() * 900) + 100}
                 </div>
              </div>
              <div className="text-right font-mono text-[10px] text-white/40">
                 REC: {new Date().toLocaleTimeString()}
              </div>
            </div>

            {/* Channel Big Info */}
            <div className={`transition-all duration-500 ${isTuning ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`}>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                {channel.name}
              </h2>
              <div className="flex items-center gap-3 text-green-500 font-mono text-xs mt-2 drop-shadow-lg bg-black/30 w-fit px-3 py-1 rounded-full border border-green-500/20">
                <Lock size={12} className="animate-pulse" />
                <span className="tracking-[0.3em] font-bold">ENCRYPTION ACTIVE</span>
              </div>
            </div>

            {/* Bottom Controls UI (Visible on Hover) */}
            <div className="flex items-end justify-between opacity-0 group-hover:opacity-100 transition-all pointer-events-auto bg-gradient-to-t from-black/80 to-transparent -mx-8 -mb-8 p-8">
               <div className="flex-1 max-w-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <span className="text-cyan-400 font-bold text-[10px] tracking-widest uppercase">Orbital Telemetry</span>
                  </div>
                  <p className="text-white/90 text-sm font-medium leading-relaxed italic">
                    "{schedule[0]?.title || 'Direct-link buffer loading...'}" - {schedule[0]?.desc || ''}
                  </p>
               </div>
               
               <div className="flex items-center gap-4">
                 <button onClick={() => setVolume(v => v === 0 ? 50 : 0)} className="p-3 rounded-full bg-white/10 hover:bg-green-500 hover:text-black transition-all backdrop-blur">
                   {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                 </button>
                 <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all backdrop-blur">
                   <Maximize size={20} />
                 </button>
               </div>
            </div>
          </div>
        </div>

        {/* Technical Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {[
             { label: 'Security', val: 'AES-256 ACTIVE', icon: Lock },
             { label: 'Resolution', val: signalStrength > 60 ? '1080p Ultra' : '720p Std', icon: Tv },
             { label: 'Orbital Slot', val: 'EUTEL-36B', icon: Globe },
             { label: 'Downlink', val: `${(11 + Math.random()).toFixed(2)} GHz`, icon: Radio },
           ].map((stat, i) => (
             <div key={i} className="px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-3">
               <stat.icon size={16} className={`${stat.label === 'Security' ? 'text-green-500' : 'text-gray-600'}`} />
               <div>
                 <div className="text-[9px] uppercase tracking-widest text-gray-500">{stat.label}</div>
                 <div className={`text-xs font-bold ${stat.label === 'Security' ? 'text-green-400' : 'text-gray-300'}`}>{stat.val}</div>
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Sidebar Channel & Guide */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        {/* AI Program Guide */}
        <div className="bg-gradient-to-b from-white/[0.05] to-transparent rounded-3xl border border-white/10 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black tracking-[0.3em] uppercase text-green-500 flex items-center gap-2">
              <Clock size={14} /> AI Schedule
            </h3>
            {aiThinking && <Activity size={14} className="text-cyan-500 animate-spin" />}
          </div>
          
          <div className="space-y-6">
             {schedule.map((item, i) => (
               <div key={i} className={`relative pl-6 border-l transition-all duration-700 ${i === 0 ? 'border-green-500' : 'border-white/10 opacity-50'}`}>
                  {i === 0 && <div className="absolute -left-1.5 top-0 w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]"></div>}
                  <div className="text-[10px] font-mono text-gray-500 mb-1">{item.time}</div>
                  <div className="font-bold text-sm mb-1">{item.title}</div>
                  <div className="text-[11px] text-gray-400 line-clamp-2 leading-tight">{item.desc}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Channel Selection */}
        <div className="flex-1 bg-white/[0.02] rounded-3xl border border-white/5 p-6 flex flex-col">
           <h3 className="text-xs font-black tracking-[0.3em] uppercase text-gray-500 mb-6 px-2">Satellite Band</h3>
           <div className="space-y-2 overflow-y-auto pr-2 max-h-[300px] hide-scrollbar">
             {channels.map((ch: any, idx: number) => (
               <button
                 key={idx}
                 disabled={isTuning}
                 onClick={() => onChannelChange(ch)}
                 className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all group ${
                   channel.name === ch.name 
                   ? 'bg-green-500/10 border border-green-500/30 ring-1 ring-green-500/20' 
                   : 'bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] grayscale hover:grayscale-0'
                 }`}
               >
                 <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                      channel.name === ch.name ? 'bg-green-500 text-black shadow-lg shadow-green-500/20 scale-110' : 'bg-gray-800 text-gray-500'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className={`font-bold text-sm ${channel.name === ch.name ? 'text-green-400' : 'text-gray-300'}`}>{ch.name}</div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">{ch.type}</div>
                    </div>
                 </div>
                 {channel.name === ch.name && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></div>}
               </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);