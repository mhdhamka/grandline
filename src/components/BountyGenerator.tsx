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
  TrendingUp
} from 'lucide-react';
import { BountyProgressionChart } from './BountyProgressionChart.tsx';
import { MangaPanel } from './MangaPanel.tsx';

const PRESET_AVATARS = [
  { name: 'Straw Hat', url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80' },
  { name: 'Swordsman', url: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80' },
  { name: 'Navigator', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80' },
  { name: 'Black Leg', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80' },
  { name: 'Devil Child', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80' },
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
    // In browser environment, simple canvas snapshot or trigger print
    const element = posterRef.current;
    if (!element) return;

    // We can draw to an offscreen canvas and export PNG
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 860;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background parchment
    ctx.fillStyle = '#e8d5b5';
    ctx.fillRect(0, 0, 600, 860);

    // Border
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 10;
    ctx.strokeRect(16, 16, 568, 828);

    // Header WANTED
    ctx.fillStyle = '#2b1810';
    ctx.font = 'bold 80px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('WANTED', 300, 110);

    // Picture frame
    ctx.strokeStyle = '#3e2723';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 140, 480, 360);

    // Load photo
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = photoUrl;
    img.onload = () => {
      ctx.drawImage(img, 62, 142, 476, 356);

      // DEAD OR ALIVE
      ctx.fillStyle = '#2b1810';
      ctx.font = 'bold 36px "Cinzel", Georgia, serif';
      ctx.fillText(condition, 300, 560);

      // NAME
      ctx.font = 'bold 44px "Cinzel", Georgia, serif';
      ctx.fillText(pirateName.toUpperCase(), 300, 640);

      // BOUNTY
      ctx.font = 'bold 34px "Space Mono", monospace';
      ctx.fillText(`฿ ${bountyAmount} -`, 300, 710);

      // Marine Footer
      ctx.font = 'italic 12px serif';
      ctx.fillText('MARINE HEADQUARTERS // KONO SAKUHIN HA FICTION DETHUNODE', 300, 780);

      // Trigger download
      const link = document.createElement('a');
      link.download = `wanted_${pirateName.replace(/\s+/g, '_').toLowerCase()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    // If image fails to load or cross-origin blocks offscreen canvas
    img.onerror = () => {
      // Fallback: fill gray
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
    <div className="space-y-6">
      {/* Top Banner using MangaPanel */}
      <MangaPanel
        title="WANTED POSTER GENERATOR"
        jpTitle="手配書ジェネレーター"
        badge="MARINE HQ CIPHER"
        badgeColor="red"
        sfx="DON!!"
        headerAction={
          <button
            onClick={handleDownload}
            className="px-4 py-2.5 bg-[#ffd700] hover:bg-[#ffe566] text-black font-heading font-black text-xs tracking-wider flex items-center space-x-2 border-2 border-black comic-shadow transition-all self-start md:self-auto cursor-pointer uppercase"
          >
            <Download className="w-4 h-4" />
            <span>EXPORT POSTER (PNG)</span>
          </button>
        }
        statusTags={[
          { label: 'CURRENCY', value: 'BERRIES (฿)', color: 'gold' },
          { label: 'STIPULATION', value: condition, color: 'red' },
          { label: 'TARGET', value: pirateName || 'UNKNOWN', color: 'slate' },
        ]}
        footerNote="CIPHER POL AIGIS 0 // WORLD GOVERNMENT PROPAGANDA PRESS"
        padding="sm"
      >
        <p className="text-xs sm:text-sm font-heading text-slate-300">
          Construct authentic, high-resolution World Government Wanted Posters complete with custom bounty figures in Berries, Dead or Alive stipulations, and PNG export capability.
        </p>
      </MangaPanel>

      {/* Editor & Live Preview Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Editor */}
        <div className="lg:col-span-6 space-y-4">
          <MangaPanel
            title="MARINE POSTER METADATA INPUT"
            jpTitle="手配書作成"
            badge="GOVERNMENT INTAKE"
            badgeColor="gold"
            statusTags={[
              { label: 'Target Bounty', value: `฿ ${bountyAmount}`, color: 'gold' },
              { label: 'Stipulation', value: condition, color: 'red' },
            ]}
            footerNote="INPUT VALIDATED FOR IMMEDIATE BROADCAST"
          >
            <div className="space-y-4">
              {/* Pirate Name */}
              <div>
                <label className="text-xs font-heading font-bold text-slate-300 block mb-1 uppercase">PIRATE OR CRIMINAL NAME:</label>
                <input
                  type="text"
                  value={pirateName}
                  onChange={(e) => setPirateName(e.target.value)}
                  placeholder="e.g. MONKEY D. LUFFY"
                  className="w-full px-3 py-2 bg-[#0e141d] border-2 border-black text-sm text-white focus:outline-none focus:border-[#ffd700] font-heading font-bold comic-shadow-sm uppercase"
                />
              </div>

              {/* Bounty in Berries */}
              <div>
                <label className="text-xs font-heading font-bold text-slate-300 block mb-1 uppercase">BOUNTY SUM (BERRIES):</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[#ffd700] font-black text-base">฿</span>
                  <input
                    type="text"
                    value={bountyAmount}
                    onChange={(e) => setBountyAmount(e.target.value)}
                    placeholder="3,000,000,000"
                    className="w-full pl-8 pr-3 py-2 bg-[#0e141d] border-2 border-black text-sm text-white focus:outline-none focus:border-[#ffd700] font-mono font-black comic-shadow-sm"
                  />
                </div>

                {/* Quick bounty presets */}
                <div className="flex flex-wrap gap-1.5 mt-2">
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
                <label className="text-xs font-heading font-bold text-slate-300 block mb-1 uppercase">STIPULATION STAMP:</label>
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
                <label className="text-xs font-heading font-bold text-slate-300 block mb-1 uppercase">PORTRAIT SELECTION:</label>
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
                    className="px-3 py-2 bg-[#0e141d] hover:bg-[#182130] text-xs font-heading font-bold text-white border-2 border-black flex items-center space-x-1.5 transition-all cursor-pointer comic-shadow-sm uppercase"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#ffd700]" />
                    <span>Upload Custom Image</span>
                  </button>
                </div>

                {/* Preset avatar thumbnails */}
                <span className="text-[11px] font-heading font-bold text-slate-400 block mb-1.5 uppercase">OR CHOOSE ICONIC MUGSHOT:</span>
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
            title="LIVE WANTED POSTER STAND"
            jpTitle="手配書展示"
            badge="ACTIVE REWARD"
            badgeColor="red"
            statusTags={[
              { label: 'Rendering', value: '2D High-Res Canvas', color: 'slate' },
              { label: 'Verification', value: 'VALID ISSUANCE', color: 'green' },
            ]}
            footerNote="MARINE NOTICE: REPORT SIGHTINGS TO NEAREST BASE IMMEDIATELY"
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
              <div className="absolute top-2 right-2 text-[10px] font-mono opacity-40">MARINE HQ</div>

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

              {/* Marine Fine Print */}
              <div className="text-center mt-4 text-[7px] font-serif text-[#553b26] leading-tight border-t border-[#362010]/30 pt-2 uppercase">
                KONO SAKUHIN HA FICTION DETHUNODE JITSUZAISURU JINBUTSU DANTAI SONOTA NO SOSHIKI TO WA ISSAI KANKEI ARIMASEN // MARINE HEADQUARTERS
              </div>
            </div>
          </MangaPanel>
        </div>
      </div>

      {/* Chronological Bounty Growth Analytics using Recharts */}
      <BountyProgressionChart
        initialCharacterId="luffy"
        onApplyToPoster={(data) => {
          setPirateName(data.name);
          setBountyAmount(data.bounty);
          setCondition(data.condition);
          if (data.photoUrl) {
            setPhotoUrl(data.photoUrl);
          }
          // Scroll smoothly to the wanted poster preview
          posterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }}
      />
    </div>
  );
};
