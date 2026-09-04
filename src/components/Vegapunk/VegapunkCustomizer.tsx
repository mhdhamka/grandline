import React from 'react';
import { Sliders } from 'lucide-react';
import { MangaBubbleShape, MangaBubbleVariant } from '../MangaBubble.tsx';
import { sound } from '../../utils/audio.ts';

interface VegapunkCustomizerProps {
  bubbleShape: MangaBubbleShape;
  bubbleVariant: MangaBubbleVariant;
  onChangeShape: (shape: MangaBubbleShape) => void;
  onChangeVariant: (variant: MangaBubbleVariant) => void;
}

const SHAPES: MangaBubbleShape[] = ['round', 'square', 'thought', 'shout', 'whisper', 'electric'];
const VARIANTS: MangaBubbleVariant[] = ['paper', 'terminal', 'bounty', 'dark', 'red'];

export const VegapunkCustomizer: React.FC<VegapunkCustomizerProps> = ({
  bubbleShape,
  bubbleVariant,
  onChangeShape,
  onChangeVariant,
}) => {
  return (
    <div className="bg-[#05080a] border border-[#00f2ff]/20 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
      <div className="flex items-center space-x-2 text-white font-bold">
        <Sliders className="w-4 h-4 text-[#00f2ff]" />
        <span>MangaBubble Customizer:</span>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-1.5">
          <span className="text-[#00f2ff]/70">Shape:</span>
          {SHAPES.map((shp) => (
            <button
              key={shp}
              onClick={() => { sound.playClick(800); onChangeShape(shp); }}
              className={`px-2 py-0.5 uppercase text-[10px] border cursor-pointer ${
                bubbleShape === shp 
                  ? 'bg-[#00f2ff] text-black border-[#00f2ff] font-bold' 
                  : 'bg-transparent text-[#00f2ff]/60 border-[#00f2ff]/30 hover:text-[#00f2ff]'
              }`}
            >
              {shp}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1.5">
          <span className="text-[#00f2ff]/70">Style:</span>
          {VARIANTS.map((v) => (
            <button
              key={v}
              onClick={() => { sound.playClick(900); onChangeVariant(v); }}
              className={`px-2 py-0.5 uppercase text-[10px] border cursor-pointer ${
                bubbleVariant === v 
                  ? 'bg-[#00f2ff] text-black border-[#00f2ff] font-bold' 
                  : 'bg-transparent text-[#00f2ff]/60 border-[#00f2ff]/30 hover:text-[#00f2ff]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};