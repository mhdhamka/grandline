import React from 'react';

export type MangaPanelVariant = 'default' | 'paper' | 'red' | 'gold' | 'blue' | 'terminal';
export type MangaPanelPadding = 'none' | 'sm' | 'md' | 'lg';
export type MangaBadgeColor = 'red' | 'gold' | 'blue' | 'black' | 'green' | 'purple' | 'cyan' | 'slate';

export interface MangaStatusTag {
  label: string;
  value?: string | number;
  color?: MangaBadgeColor;
  icon?: React.ReactNode;
}

export interface MangaPanelProps {
  id?: string;
  children: React.ReactNode;

  /* --- Header Slot & Title Header Props --- */
  header?: React.ReactNode;
  title?: React.ReactNode;
  jpTitle?: string;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  badgeColor?: MangaBadgeColor;
  sfx?: string;
  icon?: React.ReactNode;
  headerAction?: React.ReactNode;

  /* --- Footer Slot & Status Tags Props --- */
  footer?: React.ReactNode;
  statusTags?: (MangaStatusTag | string)[];
  footerNote?: React.ReactNode;
  footerAction?: React.ReactNode;

  /* --- Visual & Layout Props --- */
  variant?: MangaPanelVariant;
  padding?: MangaPanelPadding;
  showCorners?: boolean;
  showScreentone?: boolean;
  noHover?: boolean;
  className?: string;
  bodyClassName?: string;
  onClick?: () => void;
}

const BADGE_COLOR_MAP: Record<MangaBadgeColor, string> = {
  red: 'bg-[#dc0f0d] text-white border-2 border-black shadow-[2px_2px_0px_#000]',
  gold: 'bg-[#ffd700] text-black border-2 border-black shadow-[2px_2px_0px_#000]',
  blue: 'bg-[#0b44c8] text-white border-2 border-black shadow-[2px_2px_0px_#000]',
  black: 'bg-black text-white border-2 border-black shadow-[2px_2px_0px_#000]',
  green: 'bg-emerald-700 text-white border-2 border-black shadow-[2px_2px_0px_#000]',
  purple: 'bg-purple-800 text-white border-2 border-black shadow-[2px_2px_0px_#000]',
  cyan: 'bg-[#00f2ff] text-black border-2 border-black shadow-[2px_2px_0px_#000]',
  slate: 'bg-slate-800 text-slate-200 border-2 border-black shadow-[2px_2px_0px_#000]',
};

const VARIANT_CLASS_MAP: Record<MangaPanelVariant, string> = {
  default: 'bg-white text-black border-3 border-black shadow-[4px_4px_0px_#000]',
  paper: 'bg-[#f4efe6] text-black border-3 border-black shadow-[4px_4px_0px_#000]',
  red: 'bg-[#dc0f0d] text-white border-3 border-black shadow-[4px_4px_0px_#000]',
  gold: 'bg-[#ffd700] text-black border-3 border-black shadow-[4px_4px_0px_#000]',
  blue: 'bg-[#0b44c8] text-white border-3 border-black shadow-[4px_4px_0px_#000]',
  terminal: 'bg-black text-cyan-100 border-3 border-black shadow-[4px_4px_0px_#000]',
};

const PADDING_CLASS_MAP: Record<MangaPanelPadding, string> = {
  none: 'p-0',
  sm: 'p-3 sm:p-4',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-7',
};

export const MangaPanel: React.FC<MangaPanelProps> = ({
  id,
  children,
  header,
  title,
  jpTitle,
  subtitle,
  badge,
  badgeColor = 'red',
  sfx,
  icon,
  headerAction,
  footer,
  statusTags,
  footerNote,
  footerAction,
  variant = 'default',
  padding = 'md',
  showCorners = true,
  showScreentone = false,
  noHover = false,
  className = '',
  bodyClassName = '',
  onClick,
}) => {
  const isPaper = variant === 'paper' || variant === 'default';

  const hasHeader = Boolean(
    header || title || jpTitle || subtitle || badge || sfx || icon || headerAction
  );

  const hasFooter = Boolean(
    footer || (statusTags && statusTags.length > 0) || footerNote || footerAction
  );

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative overflow-hidden transition-all duration-200 ${
        VARIANT_CLASS_MAP[variant]
      } ${!noHover ? 'hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000]' : ''} ${
        onClick ? 'cursor-pointer active:translate-x-1 active:translate-y-1' : ''
      } ${className}`}
    >
      {/* Corner Brackets */}
      {showCorners && (
        <>
          <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-black z-20 pointer-events-none" aria-hidden="true" />
          <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-black z-20 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-black z-20 pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-black z-20 pointer-events-none" aria-hidden="true" />
        </>
      )}

      {/* Screentone Dot Texture */}
      {showScreentone && (
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:6px_6px] z-0"
          aria-hidden="true"
        />
      )}

      {/* HEADER SLOT */}
      {hasHeader && (
        <div
          className={`relative z-10 border-b-2 border-black px-4 py-3 sm:px-5 sm:py-3.5 ${
            isPaper ? 'bg-white' : 'bg-black/10'
          }`}
        >
          {header ? (
            header
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center flex-wrap gap-2.5 min-w-0">
                {badge && (
                  <span
                    className={`px-2 py-0.5 text-[10px] font-heading font-black tracking-wider uppercase comic-shadow-sm shrink-0 ${BADGE_COLOR_MAP[badgeColor]}`}
                  >
                    {badge}
                  </span>
                )}

                {icon && <span className="shrink-0 text-current">{icon}</span>}

                {title && (
                  <div className="flex items-baseline gap-2 min-w-0 flex-wrap">
                    <h2 className="text-base sm:text-lg lg:text-xl font-manga tracking-wide uppercase font-black truncate">
                      {title}
                    </h2>
                    {jpTitle && (
                      <span className="text-xs font-jp text-[#dc0f0d] font-bold shrink-0">
                        {jpTitle}
                      </span>
                    )}
                  </div>
                )}

                {subtitle && (
                  <span
                    className={`text-xs font-heading font-medium truncate ${
                      isPaper ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {subtitle}
                  </span>
                )}
              </div>

              {(sfx || headerAction) && (
                <div className="flex items-center space-x-2.5 shrink-0 self-end sm:self-auto">
                  {sfx && (
                    <span className="manga-sfx text-xs sm:text-sm tracking-wider px-2 py-0.5 bg-[#dc0f0d] text-white border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
                      {sfx}
                    </span>
                  )}
                  {headerAction}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* BODY CONTENT */}
      <div className={`relative z-10 ${PADDING_CLASS_MAP[padding]} ${bodyClassName}`}>
        {children}
      </div>

      {/* FOOTER SLOT */}
      {hasFooter && (
        <div
          className={`relative z-10 border-t-2 border-black px-4 py-2.5 sm:px-5 sm:py-3 ${
            isPaper ? 'bg-[#faf8f5]' : 'bg-black/10'
          }`}
        >
          {footer ? (
            footer
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center flex-wrap gap-2">
                {statusTags &&
                  statusTags.map((tag, idx) => {
                    if (typeof tag === 'string') {
                      return (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-white text-black border border-black text-[11px] font-heading font-bold comic-shadow-sm flex items-center space-x-1 uppercase"
                        >
                          <span>{tag}</span>
                        </span>
                      );
                    }

                    const tagColorClass = tag.color
                      ? BADGE_COLOR_MAP[tag.color]
                      : 'bg-white text-black border border-black shadow-[2px_2px_0px_#000]';

                    return (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 text-[11px] font-heading font-bold flex items-center space-x-1.5 uppercase ${tagColorClass}`}
                      >
                        {tag.icon && <span className="shrink-0">{tag.icon}</span>}
                        <span>{tag.label}</span>
                        {tag.value !== undefined && (
                          <span className="font-mono font-black ml-1">
                            {tag.value}
                          </span>
                        )}
                      </span>
                    );
                  })}

                {footerNote && (
                  <span
                    className={`text-[11px] font-mono ${
                      isPaper ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {footerNote}
                  </span>
                )}
              </div>

              {footerAction && (
                <div className="shrink-0 self-end sm:self-auto">{footerAction}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MangaPanel;