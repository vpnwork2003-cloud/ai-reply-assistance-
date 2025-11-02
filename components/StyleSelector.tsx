
import React from 'react';
import type { ReplyStyle } from '../types';

interface StyleSelectorProps {
  styles: ReplyStyle[];
  selectedStyle: ReplyStyle;
  onSelectStyle: (style: ReplyStyle) => void;
  disabled: boolean;
}

const colorClasses = {
  sky: {
    bg: 'bg-sky-500',
    ring: 'ring-sky-400',
    text: 'text-sky-300',
    hoverBg: 'hover:bg-sky-900/50',
  },
  slate: {
    bg: 'bg-slate-500',
    ring: 'ring-slate-400',
    text: 'text-slate-300',
    hoverBg: 'hover:bg-slate-700/50',
  },
  rose: {
    bg: 'bg-rose-500',
    ring: 'ring-rose-400',
    text: 'text-rose-300',
    hoverBg: 'hover:bg-rose-900/50',
  },
  red: {
    bg: 'bg-red-500',
    ring: 'ring-red-400',
    text: 'text-red-300',
    hoverBg: 'hover:bg-red-900/50',
  },
  amber: {
    bg: 'bg-amber-500',
    ring: 'ring-amber-400',
    text: 'text-amber-300',
    hoverBg: 'hover:bg-amber-900/50',
  },
  emerald: {
    bg: 'bg-emerald-500',
    ring: 'ring-emerald-400',
    text: 'text-emerald-300',
    hoverBg: 'hover:bg-emerald-900/50',
  },
  gray: {
    bg: 'bg-gray-500',
    ring: 'ring-gray-400',
    text: 'text-gray-300',
    hoverBg: 'hover:bg-gray-700/50',
  },
  teal: {
    bg: 'bg-teal-500',
    ring: 'ring-teal-400',
    text: 'text-teal-300',
    hoverBg: 'hover:bg-teal-900/50',
  },
  orange: {
    bg: 'bg-orange-500',
    ring: 'ring-orange-400',
    text: 'text-orange-300',
    hoverBg: 'hover:bg-orange-900/50',
  },
  pink: {
    bg: 'bg-pink-500',
    ring: 'ring-pink-400',
    text: 'text-pink-300',
    hoverBg: 'hover:bg-pink-900/50',
  },
};

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle, disabled }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Choose Reply Style</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {styles.map((style) => {
          const isSelected = style.code === selectedStyle.code;
          const colors = colorClasses[style.color as keyof typeof colorClasses] || colorClasses.slate;

          return (
            <button
              key={style.code}
              onClick={() => onSelectStyle(style)}
              disabled={disabled}
              className={`text-left p-2 rounded-md border transition-all duration-200 ${
                isSelected
                  ? `${colors.bg} text-white ring-2 ${colors.ring} border-transparent shadow-lg`
                  : `bg-slate-800/50 border-slate-700 ${colors.hoverBg} hover:border-slate-500 disabled:opacity-50`
              }`}
            >
              <span className={`font-bold text-sm ${isSelected ? 'text-white' : colors.text}`}>
                {style.code}
              </span>
              <span className="block text-xs font-medium text-slate-200">
                {style.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;
