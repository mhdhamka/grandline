import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { Copy, Check, Volume2, Radio } from 'lucide-react';
import { sound } from '../../utils/audio.ts';

export type MangaBubbleShape = 'round' | 'square' | 'shout' | 'thought' | 'electric';
export type MangaBubbleVariant = 'paper' | 'dark' | 'red' | 'gold' | 'terminal';
export type MangaBubbleTail = 'bottom-left' | 'bottom-right' | 'left' | 'right' | 'top-left' | 'top-right' | 'none';
export type MangaBubbleFont = 'comic' | 'manga' | 'heading' | 'mono' | 'jp' | 'shout';
export type MangaBubbleSize = 'sm' | 'md' | 'lg';

export interface MangaBubbleProps {
  /** Text content or quote (can also use children) */
  quote?: string;
  children?: React.ReactNode;
  /** Shape of the speech balloon */
  shape?: MangaBubbleShape;
  /** Color theme and texture */
  variant?: MangaBubbleVariant;
  /** Dedicated Vegapunk satellite terminal mode toggle */
  isTerminal?: boolean;
  /** Vegapunk satellite designation tag (e.g. "PUNK-01 SHAKA", "PUNK-02 LILITH") */
  satelliteDesignation?: string;
  /** Transmission frequency or channel (e.g. "142.85 MHz LABOPHASE") */
  satelliteFrequency?: string;
  /** Direction and position of the speech pointer tail */
  tailPosition?: MangaBubbleTail;
  /** Primary typography style */
  fontStyle?: MangaBubbleFont;
  /** Scale / padding size of the bubble */
  size?: MangaBubbleSize;
  /** Name of the speaking character or AI */
  speaker?: string;
  /** Sub-title or epithet (e.g. "Straw Hat", "Genius Scientist") */
  epithet?: string;
  /** Avatar thumbnail URL */
  avatarUrl?: string;
  /** Avatar placement */
  avatarPosition?: 'left' | 'right' | 'top';
  /** Manga Sound Effect badge (e.g. "DON!!", "ドドン!!", "QUAPAPAPA!") */
  sfx?: string;
  /** Chapter or timestamp citation */
  citation?: string;
  /** Whether to render markdown formatted text */
  isMarkdown?: boolean;
  /** Whether to show a quick copy action button */
  showCopyButton?: boolean;
  /** Whether to show an audio play button */
  showAudioButton?: boolean;
  /** Custom handler when audio play is triggered */
  onAudioPlay?: () => void;
  /** Custom click handler */
  onClick?: () => void;
  /** Additional container classes */
  className?: string;
}

export const MangaBubble: React.FC<MangaBubbleProps> = ({
  quote,
  children,
  shape = 'round',
  variant = 'paper',
  isTerminal = false,
  satelliteDesignation = 'PUNK-01 SHAKA',
  satelliteFrequency = '142.85 MHz LABOPHASE',
  tailPosition = 'bottom-left',
  fontStyle = 'comic',
  size = 'md',
  speaker,
  epithet,
  avatarUrl,
  avatarPosition = 'left',
  sfx,
  citation,
  isMarkdown = false,
  showCopyButton = false,
  showAudioButton = false,
  onAudioPlay,
  onClick,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  // If isTerminal flag is true, force terminal theme
  const effectiveVariant: MangaBubbleVariant = isTerminal ? 'terminal' : variant;
  const effectiveShape: MangaBubbleShape = isTerminal ? 'square' : shape;
  const effectiveFont: MangaBubbleFont = isTerminal ? 'mono' : fontStyle;

  // Determine text content for copy / audio
  const textContent = quote || (typeof children === 'string' ? children : '');

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!textContent) return;
    sound.playClick(900);
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAudioPlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAudioPlay) {
      onAudioPlay();
    } else {
      sound.playBountyChime();
    }
  };

  // 1. Variant Color Configurations
  const getVariantStyles = () => {
    switch (effectiveVariant) {
      case 'paper':
        return {
          bg: 'bg-[#faf8f5]',
          text: 'text-[#10141c]',
          border: 'border-black',
          shadow: 'shadow-[4px_4px_0px_#000000]',
          stroke: '#000000',
          fill: '#faf8f5',
          accent: 'text-[#dc0f0d]',
          headerBg: 'bg-[#f0ece1]',
          badgeBg: 'bg-[#dc0f0d] text-white',
        };
      case 'dark':
        return {
          bg: 'bg-[#141b27]',
          text: 'text-slate-100',
          border: 'border-black',
          shadow: 'shadow-[4px_4px_0px_#000000]',
          stroke: '#000000',
          fill: '#141b27',
          accent: 'text-[#ffd700]',
          headerBg: 'bg-[#0e141e]',
          badgeBg: 'bg-[#ffd700] text-black',
        };
      case 'red':
        return {
          bg: 'bg-[#dc0f0d]',
          text: 'text-white',
          border: 'border-black',
          shadow: 'shadow-[4px_4px_0px_#000000]',
          stroke: '#000000',
          fill: '#dc0f0d',
          accent: 'text-[#ffd700]',
          headerBg: 'bg-[#b00c0a]',
          badgeBg: 'bg-black text-[#ffd700]',
        };
      case 'gold':
        return {
          bg: 'bg-[#ffd700]',
          text: 'text-black',
          border: 'border-black',
          shadow: 'shadow-[4px_4px_0px_#000000]',
          stroke: '#000000',
          fill: '#ffd700',
          accent: 'text-[#dc0f0d]',
          headerBg: 'bg-[#e6c200]',
          badgeBg: 'bg-black text-white',
        };
      case 'terminal':
        return {
          bg: 'bg-[#061219]',
          text: 'text-cyan-100',
          border: 'border-[#00f2ff]',
          shadow: 'shadow-[0_0_20px_rgba(0,242,255,0.25),4px_4px_0px_#000000]',
          stroke: '#00f2ff',
          fill: '#061219',
          accent: 'text-[#00f2ff]',
          headerBg: 'bg-[#03090d]',
          badgeBg: 'bg-[#00f2ff] text-black',
        };
      default:
        return {
          bg: 'bg-[#faf8f5]',
          text: 'text-[#10141c]',
          border: 'border-black',
          shadow: 'shadow-[4px_4px_0px_#000000]',
          stroke: '#000000',
          fill: '#faf8f5',
          accent: 'text-[#dc0f0d]',
          headerBg: 'bg-[#f0ece1]',
          badgeBg: 'bg-[#dc0f0d] text-white',
        };
    }
  };

  const vStyles = getVariantStyles();

  // 2. Font Class Mapping
  const getFontClass = () => {
    switch (effectiveFont) {
      case 'comic':
        return 'font-comic font-bold';
      case 'manga':
        return 'font-manga uppercase tracking-wide';
      case 'heading':
        return 'font-heading font-bold';
      case 'mono':
        return 'font-mono text-xs sm:text-sm';
      case 'jp':
        return 'font-jp font-bold';
      case 'shout':
        return 'font-shout text-lg uppercase tracking-wider leading-none';
      default:
        return 'font-comic font-bold';
    }
  };

  // 3. Size Scale
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          padding: 'px-3 py-2 sm:px-4 sm:py-2.5',
          textSize: 'text-xs sm:text-sm',
          avatarSize: 'w-7 h-7',
        };
      case 'lg':
        return {
          padding: 'px-5 py-4 sm:px-7 sm:py-5',
          textSize: 'text-base sm:text-lg',
          avatarSize: 'w-12 h-12',
        };
      case 'md':
      default:
        return {
          padding: 'px-4 py-3 sm:px-5 sm:py-3.5',
          textSize: 'text-sm sm:text-base',
          avatarSize: 'w-9 h-9',
        };
    }
  };

  const sStyles = getSizeStyles();

  // 4. Shape Framing & Radii
  const getShapeClasses = () => {
    if (isTerminal) {
      return 'rounded-none border-2 border-[#00f2ff] relative';
    }
    switch (effectiveShape) {
      case 'round':
        return 'rounded-[26px] border-3';
      case 'square':
        return 'rounded-sm border-3';
      case 'thought':
        return 'rounded-[32px] border-3 border-dashed';
      case 'shout':
        return 'rounded-none border-4';
      case 'electric':
        return 'rounded-md border-3';
      default:
        return 'rounded-[26px] border-3';
    }
  };

  // 5. SVG Speech Bubble Contour Overlay for classic manga styles
  const renderSvgBorderAccents = () => {
    if (isTerminal) {
      return (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
          preserveAspectRatio="none"
        >
          <path d="M 0 10 L 0 0 L 10 0" stroke="#00f2ff" strokeWidth="2.5" fill="none" />
          <path d="M calc(100% - 10px) 0 L 100% 0 L 100% 10" stroke="#00f2ff" strokeWidth="2.5" fill="none" />
          <path d="M 0 calc(100% - 10px) L 0 100% L 10 100%" stroke="#00f2ff" strokeWidth="2.5" fill="none" />
          <path d="M calc(100% - 10px) 100% L 100% 100% L 100% calc(100% - 10px)" stroke="#00f2ff" strokeWidth="2.5" fill="none" />
          <line x1="20" y1="0" x2="60" y2="0" stroke="#ffd700" strokeWidth="2" />
        </svg>
      );
    }

    if (effectiveShape === 'shout') {
      return (
        <div className="absolute inset-0 pointer-events-none -m-1.5 overflow-visible z-0">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <polygon points="-4,15 0,8 -6,0 8,0 15,-4" fill="#000000" />
            <polygon points="calc(100% - 15px),-4 calc(100% - 8px),0 calc(100% + 6px),0 100%,8 calc(100% + 4px),15" fill="#000000" />
          </svg>
        </div>
      );
    }

    return null;
  };

  // 6. Speech Tail SVG Rendering
  const renderTail = () => {
    if (tailPosition === 'none' || effectiveShape === 'thought') return null;

    const strokeColor = effectiveVariant === 'terminal' ? '#00f2ff' : '#000000';
    const strokeWidth = effectiveShape === 'shout' ? 3.5 : 3;

    switch (tailPosition) {
      case 'bottom-left':
        return (
          <div className="absolute -bottom-[14px] left-6 z-20 pointer-events-none">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="overflow-visible">
              <path d="M0 0 L6 15 L18 0 Z" fill={vStyles.fill} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
              <path d="M0 0 L18 0" stroke={vStyles.fill} strokeWidth={strokeWidth + 2} />
            </svg>
          </div>
        );
      case 'bottom-right':
        return (
          <div className="absolute -bottom-[14px] right-6 z-20 pointer-events-none">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="overflow-visible">
              <path d="M6 0 L18 15 L24 0 Z" fill={vStyles.fill} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
              <path d="M6 0 L24 0" stroke={vStyles.fill} strokeWidth={strokeWidth + 2} />
            </svg>
          </div>
        );
      case 'left':
        return (
          <div className="absolute top-1/2 -translate-y-1/2 -left-[14px] z-20 pointer-events-none">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="overflow-visible">
              <path d="M16 4 L1 12 L16 20 Z" fill={vStyles.fill} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
              <path d="M16 4 L16 20" stroke={vStyles.fill} strokeWidth={strokeWidth + 2} />
            </svg>
          </div>
        );
      case 'right':
        return (
          <div className="absolute top-1/2 -translate-y-1/2 -right-[14px] z-20 pointer-events-none">
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="overflow-visible">
              <path d="M0 4 L15 12 L0 20 Z" fill={vStyles.fill} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
              <path d="M0 4 L0 20" stroke={vStyles.fill} strokeWidth={strokeWidth + 2} />
            </svg>
          </div>
        );
      case 'top-left':
        return (
          <div className="absolute -top-[14px] left-6 z-20 pointer-events-none">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="overflow-visible">
              <path d="M0 16 L6 1 L18 16 Z" fill={vStyles.fill} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
              <path d="M0 16 L18 16" stroke={vStyles.fill} strokeWidth={strokeWidth + 2} />
            </svg>
          </div>
        );
      case 'top-right':
        return (
          <div className="absolute -top-[14px] right-6 z-20 pointer-events-none">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="overflow-visible">
              <path d="M6 16 L18 1 L24 16 Z" fill={vStyles.fill} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
              <path d="M6 16 L24 16" stroke={vStyles.fill} strokeWidth={strokeWidth + 2} />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  // 7. Thought Bubble Circles Trail
  const renderThoughtTrail = () => {
    if (effectiveShape !== 'thought' || tailPosition === 'none') return null;

    const isRight = tailPosition.includes('right');
    const isTop = tailPosition.includes('top');
    const strokeColor = effectiveVariant === 'terminal' ? '#00f2ff' : '#000000';

    return (
      <div className={`absolute pointer-events-none flex flex-col items-center z-10 ${isTop ? '-top-5' : '-bottom-5'} ${isRight ? 'right-6' : 'left-6'}`}>
        <div className={`w-3 h-3 rounded-full border-2 ${vStyles.bg} ${isTop ? 'mb-1' : 'mt-1'}`} style={{ borderColor: strokeColor }} />
        <div className={`w-2 h-2 rounded-full border-2 ${vStyles.bg}`} style={{ borderColor: strokeColor }} />
      </div>
    );
  };

  const avatarEl = avatarUrl ? (
    <div className={`${sStyles.avatarSize} shrink-0 border-2 border-black overflow-hidden shadow-[2px_2px_0px_#000] bg-black`}>
      <img src={avatarUrl} alt={speaker || 'Character'} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
    </div>
  ) : isTerminal ? (
    <div className="w-7 h-7 shrink-0 bg-[#00f2ff]/20 border border-[#00f2ff] flex items-center justify-center text-[#00f2ff]">
      <Radio className="w-4 h-4 animate-pulse" />
    </div>
  ) : null;

  return (
    <div onClick={onClick} className={`relative inline-block max-w-full group ${onClick ? 'cursor-pointer' : ''} ${className}`}>
      {sfx && (
        <div className="absolute -top-3.5 -right-3 z-30 pointer-events-none transform rotate-6 animate-pulse">
          <span className="manga-sfx text-sm sm:text-base px-2 py-0.5 bg-[#dc0f0d] text-white border-2 border-black shadow-[2px_2px_0px_#000] tracking-wider uppercase">
            {sfx}
          </span>
        </div>
      )}

      <div className={`relative ${vStyles.bg} ${vStyles.text} ${vStyles.border} ${vStyles.shadow} ${getShapeClasses()} transition-all duration-150 overflow-hidden`}>
        {renderSvgBorderAccents()}

        {isTerminal && (
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,242,255,0.03)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-0" />
        )}

        {effectiveVariant === 'paper' && (
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px] rounded-[inherit]" />
        )}

        {isTerminal ? (
          <div className="flex items-center justify-between border-b border-[#00f2ff]/40 px-3 py-1.5 bg-[#03090d] text-xs font-mono relative z-10">
            <div className="flex items-center space-x-2 min-w-0">
              {avatarEl}
              <div className="min-w-0 truncate">
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-black tracking-widest text-[#00f2ff] uppercase">{satelliteDesignation}</span>
                  <span className="text-[9px] px-1 bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40">SATELLITE</span>
                </div>
                <div className="text-[9px] text-cyan-300/70 font-mono truncate">{satelliteFrequency}</div>
              </div>
            </div>

            <div className="flex items-center space-x-1.5 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
              {showCopyButton && (
                <button type="button" onClick={handleCopy} className="p-1 hover:bg-[#00f2ff]/20 text-cyan-300 transition-colors cursor-pointer" title="Copy Transmission">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>
          </div>
        ) : (
          (speaker || epithet || citation || showCopyButton || showAudioButton) && (
            <div className={`flex items-center justify-between border-b-2 ${vStyles.border} px-3.5 py-1.5 gap-2 rounded-t-[inherit] ${effectiveVariant === 'paper' ? 'bg-[#f0ece1]' : 'bg-black/30'} relative z-10`}>
              <div className="flex items-center space-x-2 min-w-0">
                {avatarPosition === 'left' && avatarEl}
                <div className="min-w-0 truncate">
                  {speaker && <span className="font-manga text-xs sm:text-sm font-black tracking-wide uppercase block truncate leading-tight">{speaker}</span>}
                  {epithet && <span className="text-[10px] sm:text-[11px] font-heading font-bold opacity-75 block truncate leading-tight">{epithet}</span>}
                </div>
              </div>

              <div className="flex items-center space-x-1.5 shrink-0 text-xs">
                {citation && <span className={`text-[10px] font-mono px-1.5 py-0.5 border border-black/50 font-bold ${vStyles.badgeBg}`}>{citation}</span>}

                {showAudioButton && (
                  <button type="button" onClick={handleAudioPlay} className="p-1 hover:bg-black/10 rounded transition-colors text-current cursor-pointer" title="Play Voice Audio" aria-label="Play Voice Audio">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {showCopyButton && (
                  <button type="button" onClick={handleCopy} className="p-1 hover:bg-black/10 rounded transition-colors text-current cursor-pointer" title="Copy Dialogue" aria-label="Copy Dialogue">
                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                )}
              </div>
            </div>
          )
        )}

        <div className={`${sStyles.padding} ${sStyles.textSize} ${getFontClass()} relative z-10 leading-relaxed`}>
          {isMarkdown && typeof quote === 'string' ? (
            <div className="markdown-body select-text"><Markdown>{quote}</Markdown></div>
          ) : isMarkdown && typeof children === 'string' ? (
            <div className="markdown-body select-text"><Markdown>{children}</Markdown></div>
          ) : (
            <div className="select-text">
              {quote && <span>{quote}</span>}
              {children}
            </div>
          )}
        </div>

        {renderTail()}
        {renderThoughtTrail()}
      </div>
    </div>
  );
};

export default MangaBubble;