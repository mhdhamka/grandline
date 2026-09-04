import React, { useState, useRef } from 'react';
import { sound } from '../utils/audio.ts';
import { 
  FileText, 
  Upload, 
  Download, 
  Sparkles, 
  Image as ImageIcon, 
  RefreshCw,
  Award,
  TrendingUp,
  Megaphone,
  Camera,
  Printer
} from 'lucide-react';
import { BountyProgressionChart } from './BountyProgressionChart.tsx';
import { MangaPanel } from './MangaPanel.tsx';
import { MangaBubble } from './MangaBubble.tsx';

const PRESET_AVATARS = [
  { name: 'Straw Hat', url: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2025/09/one-piece-luffy-using-gear-4-in-egghead.jpg?w=1600&h=900&fit=crop' },
  { name: 'Swordsman', url: 'https://static.wikia.nocookie.net/glad-you-came/images/a/a2/Zoro.png/revision/latest/thumbnail/width/360/height/360?cb=20230710081928' },
  { name: 'Navigator', url: 'https://static.wikia.nocookie.net/onepiece/images/6/68/Nami_Anime_Post_Timeskip_Infobox.png/revision/latest?cb=20260315214841' },
  { name: 'Black Leg', url: 'https://i.pinimg.com/736x/69/11/15/691115981b44a8d501ff486c4f966970.jpg' },
  { name: 'Devil Child', url: 'https://i.pinimg.com/originals/f7/5e/2e/f75e2e3d328f4ca8d99248271e1b6c27.jpg' },
];

export const BountyGenerator: React.FC = () => {
  const [pirateName, setPirateName] = useState<string>('MONKEY D. LUFFY');
  const [bountyAmount, setBountyAmount] = useState<string>('3,000,000,000');
  const [condition, setCondition] = useState<string>('DEAD OR ALIVE');
  const [photoUrl, setPhotoUrl] = useState<string>(PRESET_AVATARS[0].url);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
          sound.playClick();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    sound.playBountyChime();
    const element = posterRef.current;
    if (!element) return;

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 860;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#e8d5b5';
    ctx.fillRect(0, 0, 600, 860);

    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 10;
    ctx.strokeRect(16, 16, 568, 828);

    ctx.fillStyle = '#2b1810';
    ctx.font = 'bold 80px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('WANTED', 300, 110);

    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 140, 480, 360);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = photoUrl;
    img.onload = () => {
      ctx.drawImage(img, 62, 142, 476, 356);

      ctx.fillStyle = '#2b1810';
      ctx.font = 'bold 36px "Cinzel", Georgia, serif';
      ctx.fillText(condition, 300, 560);

      ctx.font = 'bold 44px "Cinzel", Georgia, serif';
      ctx.fillText(pirateName.toUpperCase(), 300, 640);

      ctx.font = 'bold 34px "Space Mono", monospace';
      ctx.fillText(`฿ ${bountyAmount} -`, 300, 710);

      ctx.font = 'italic 12px serif';
      ctx.fillText('MARINE HEADQUARTERS // GAHahaha! PRINTING NEW PROPAGANDA!', 300, 780);

      const link = document.createElement('a');
      link.download = `wanted_${pirateName.replace(/\s+/g, '_').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    img.onerror = () => {
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(62, 142, 476, 356);
      ctx.fillStyle = '#2b1810';
      ctx.font = 'bold 36px "Cinzel", Georgia, serif';
      ctx.fillText(condition, 300, 560);
      ctx.font = 'bold 44px "Cinzel", Georgia, serif';
      ctx.fillText(pirateName.toUpperCase(), 300, 640);
      ctx.font = 'bold 34px "Space Mono", monospace';
      ctx.fillText(`฿ ${bountyAmount} -`, 300, 710);

      const link = document.createElement('a');
      link.download = `wanted_${pirateName.replace(/\s+/g, '_').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  return (
    <div className="space-y-6 font-heading">
      
      {/* Morgans Style Propaganda Bureau Banner */}
      <div className="relative bg-white p-6 sm:p-8 border-[6px] border-black rounded-[2rem] shadow-[10px_10px_0px_rgba(0,0,0,0.9)] overflow-hidden">
        
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none select-none translate-x-10 translate-y-10">
          <img 
            src="../assets/images/morgan.png" 
            alt="Morgans Watermark" 
            className="w-96 h-96 object-contain filter grayscale"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-3 text-xs font-black">
              <span className="px-3 py-1 bg-black text-[#ffd700] uppercase tracking-widest rounded-full border-2 border-black flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                WORLD ECONOMIC JOURNAL
              </span>
              <span className="text-[#dc0f0d] uppercase tracking-wider bg-red-100 px-2 py-0.5 rounded-md font-extrabold border border-red-300">
                BIG NEWS EXCLUSIVE!!
              </span>
            </div>
            
            <div className="relative">
              <h1 className="font-manga text-4xl sm:text-6xl text-black tracking-tight uppercase leading-none">
                Morgans' Wanted <span className="text-[#dc0f0d]">Press Studio</span>
              </h1>
              <span className="manga-sfx absolute -top-6 left-[340px] text-4xl text-amber-500 rotate-12 hidden sm:inline-block">GAAAH!</span>
            </div>
            
            <p className="text-xs sm:text-sm font-medium text-stone-700 bg-stone-100 p-3.5 rounded-xl border-2 border-black shadow-sm max-w-2xl">
              "Fascinating! Absolutely magnificent numbers! Let the entire world know who is shaking up the Grand Line today! Print extra copies of the newspaper!" — <strong className="text-black">The Big News Morgans</strong>
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <button
              onClick={handleDownload}
              className="px-6 py-4 bg-[#ffd700] hover:bg-[#ffe566] text-black font-heading font-black text-sm tracking-wider flex items-center space-x-3 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer uppercase rounded-xl"
            >
              <Printer className="w-5 h-5 text-black" />
              <span>PRINT & EXPORT POSTER</span>
            </button>
            <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-widest">
              Verified by World Government HQ
            </span>
          </div>
        </div>
      </div>

      {/* Morgans Editorial Dialogue Bubble Callout */}
      <div className="max-w-xl mb-6">
        <div className="bg-white border-4 border-black p-4 relative shadow-[5px_5px_0px_rgba(0,0,0,0.9)]">
          {/* Optional manga panel corner brackets */}
          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-black pointer-events-none" />
          <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-black pointer-events-none" />
          <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-black pointer-events-none" />
          <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-black pointer-events-none" />

          <p className="text-xs sm:text-sm font-heading font-bold text-black leading-snug">
            “Truth? Accuracy? Pah! What matters is how thrilling the headline looks on the front page of tomorrow's paper! Make those bounties skyrocket!”
          </p>
        </div>
      </div>

      {/* Editor & Live Preview Canvas Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form Editor */}
        <div className="lg:col-span-6 space-y-4">
          <MangaPanel
            title="PROPAGANDA PRESS INTAKE"
            jpTitle="手配書作成"
            badge="BIG NEWS DESK"
            badgeColor="gold"
            statusTags={[
              { label: 'Target Bounty', value: `฿ ${bountyAmount}`, color: 'gold' },
              { label: 'Stipulation', value: condition, color: 'red' },
            ]}
            footerNote="AUTHORIZED BY THE WORLD ECONOMIC JOURNAL"
          >
            <div className="space-y-4">
              {/* Pirate Name */}
              <div>
                <label className="text-xs font-heading font-black text-slate-300 block mb-1 uppercase">PIRATE OR CRIMINAL ALIAS:</label>
                <input
                  type="text"
                  value={pirateName}
                  onChange={(e) => setPirateName(e.target.value)}
                  placeholder="e.g. MONKEY D. LUFFY"
                  className="w-full px-3 py-2.5 bg-[#0e141d] border-2 border-black text-sm text-white focus:outline-none focus:border-[#ffd700] font-heading font-bold comic-shadow-sm uppercase"
                />
              </div>

              {/* Bounty in Berries */}
              <div>
                <label className="text-xs font-heading font-black text-slate-300 block mb-1 uppercase">BOUNTY SUM (BERRIES):</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[#ffd700] font-black text-base">฿</span>
                  <input
                    type="text"
                    value={bountyAmount}
                    onChange={(e) => setBountyAmount(e.target.value)}
                    placeholder="3,000,000,000"
                    className="w-full pl-8 pr-3 py-2.5 bg-[#0e141d] border-2 border-black text-sm text-white focus:outline-none focus:border-[#ffd700] font-mono font-black comic-shadow-sm"
                  />
                </div>

                {/* Quick bounty presets */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {['30,000,000', '100,000,000', '500,000,000', '1,500,000,000', '3,000,000,000', '4,611,100,000'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => { sound.playClick(); setBountyAmount(preset); }}
                      className="px-2.5 py-1 bg-[#0e141d] hover:bg-[#dc0f0d] text-[11px] font-mono font-bold text-[#ffd700] hover:text-white border-2 border-black cursor-pointer comic-shadow-sm transition-all"
                    >
                      ฿{preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label className="text-xs font-heading font-black text-slate-300 block mb-1 uppercase">STIPULATION STAMP:</label>
                <div className="grid grid-cols-2 gap-2">
                  {['DEAD OR ALIVE', 'ONLY ALIVE (Vinsmoke Command)'].map((c) => (
                    <button
                      key={c}
                      onClick={() => { sound.playClick(); setCondition(c); }}
                      className={`py-2 px-3 text-xs font-heading font-black border-2 transition-all cursor-pointer uppercase ${
                        condition === c
                          ? 'bg-[#dc0f0d] text-white border-black comic-shadow-sm'
                          : 'bg-[#0e141d] border-black text-slate-300 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Selection / Upload */}
              <div>
                <label className="text-xs font-heading font-black text-slate-300 block mb-1 uppercase">MUGSHOT PORTRAIT:</label>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-2.5 bg-[#0e141d] hover:bg-[#182130] text-xs font-heading font-bold text-white border-2 border-black flex items-center space-x-2 transition-all cursor-pointer comic-shadow-sm uppercase"
                  >
                    <Upload className="w-4 h-4 text-[#ffd700]" />
                    <span>Upload Custom Mugshot</span>
                  </button>
                </div>

                {/* Preset avatar thumbnails */}
                <span className="text-[11px] font-heading font-bold text-slate-400 block mb-1.5 uppercase">OR SELECT AN Albatross ARCHIVE ICON:</span>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_AVATARS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => { sound.playClick(); setPhotoUrl(p.url); }}
                      className={`aspect-square overflow-hidden border-2 transition-all cursor-pointer ${
                        photoUrl === p.url ? 'border-[#ffd700] ring-2 ring-black scale-105 comic-shadow' : 'border-black opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={p.url} 
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </MangaPanel>
        </div>

        {/* Right Live Wanted Poster Stand */}
        <div className="lg:col-span-6 flex justify-center items-start">
          <MangaPanel
            title="LIVE MORGANS EDITION STAND"
            jpTitle="手配書展示"
            badge="FRONT PAGE"
            badgeColor="red"
            statusTags={[
              { label: 'Rendering', value: '2D High-Res Canvas', color: 'slate' },
              { label: 'Verification', value: 'BIG NEWS APPROVED', color: 'green' },
            ]}
            footerNote="WORLD ECONOMIC JOURNAL // SPECIAL HEADLINE CIRCULATION"
            className="w-full"
            bodyClassName="flex justify-center"
          >
            <div
              ref={posterRef}
              className="w-full max-w-[400px] bg-[#ebd8b7] text-[#2c1a0e] p-6 shadow-2xl border-[10px] border-[#362010] relative select-none font-serif"
              style={{
                backgroundImage: 'radial-gradient(#dcc29b 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            >
              {/* Vintage grunge corner marks */}
              <div className="absolute top-2 left-2 text-[10px] font-mono opacity-40">№ 849201</div>
              <div className="absolute top-2 right-2 text-[10px] font-mono opacity-40">BIG NEWS PRESS</div>

              {/* Header WANTED */}
              <div className="text-center pt-2 pb-3">
                <h2 className="text-5xl font-black tracking-widest text-[#2c1a0e] leading-none drop-shadow-sm font-serif">
                  WANTED
                </h2>
              </div>

              {/* Photo frame */}
              <div className="w-full aspect-[4/3] bg-[#806b58] border-4 border-[#362010] overflow-hidden relative shadow-inner">
                <img
                  src={photoUrl}
                  alt={pirateName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-125 sepia-[0.3]"
                />
              </div>

              {/* DEAD OR ALIVE Stamp */}
              <div className="text-center mt-4">
                <span className="inline-block text-xl font-black tracking-wider text-[#2c1a0e] px-2 py-0.5 border-y-2 border-[#362010] font-serif">
                  {condition}
                </span>
              </div>

              {/* NAME */}
              <div className="text-center mt-3">
                <h3 className="text-2xl font-black tracking-wide uppercase text-[#2c1a0e] truncate font-serif">
                  {pirateName || 'NAMELESS PIRATE'}
                </h3>
              </div>

              {/* BOUNTY VALUE */}
              <div className="text-center mt-2 flex items-center justify-center space-x-2 font-mono">
                <span className="text-2xl font-bold text-[#362010]">฿</span>
                <span className="text-2xl font-black tracking-wider text-[#2c1a0e]">
                  {bountyAmount} -
                </span>
              </div>

              {/* Marine / Morgans Fine Print */}
              <div className="text-center mt-4 text-[7px] font-serif text-[#553b26] leading-tight border-t border-[#362010]/30 pt-2 uppercase">
                GAHAHAHA! MORGANS PRESS BUREAU
              </div>
            </div>
          </MangaPanel>
        </div>
      </div>

      {/* Chronological Bounty Growth Analytics */}
      <BountyProgressionChart
        initialCharacterId="luffy"
        onApplyToPoster={(data) => {
          setPirateName(data.name);
          setBountyAmount(data.bounty);
          setCondition(data.condition);
          if (data.photoUrl) {
            setPhotoUrl(data.photoUrl);
          }
          posterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      />
    </div>
  );
};