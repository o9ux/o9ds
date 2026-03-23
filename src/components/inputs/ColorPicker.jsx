import { forwardRef, useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';
import Label from '@/components/inputs/Label';
import O9Icon from '@/components/O9Icon';

import cubeSvg from '@/assets/icons/o9con-cube.svg?raw';
import fontSvg from '@/assets/icons/o9con-font.svg?raw';
import colorSvg from '@/assets/icons/o9con-color.svg?raw';
import backgroundColorSvg from '@/assets/icons/o9con-background-color.svg?raw';
import banSvg from '@/assets/icons/o9con-ban.svg?raw';
import angleDownSvg from '@/assets/icons/o9con-angle-down.svg?raw';
import angleUpSvg from '@/assets/icons/o9con-angle-up.svg?raw';

/**
 * ColorPicker — icon-only dropdown button that opens a color selection panel.
 *
 * Features:
 *  - Icon-only trigger styled like DropdownButton tertiary variant
 *  - Four icon variants: icon (cube), font, background (color), element (background-color)
 *  - No-color state with red ban icon
 *  - Portal-based dropdown panel with two tabs
 *  - Brand Palette tab: 13 hue families × 11 stops swatch grid
 *  - Custom tab: HSV spectrum picker, hue slider, hex/rgb inputs, opacity
 *  - Three sizes: sm (24px), md (32px), lg (36px)
 *  - Optional Label component
 */

/* ── Color utility functions ── */

function hexToRgb(hex) {
  if (!hex) return { r: 0, g: 0, b: 0 };
  let h = hex.replace('#', '');
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function rgbToHex(r, g, b) {
  const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase();
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0, s = max === 0 ? 0 : d / max, v = max;
  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function hsvToRgb(h, s, v) {
  h /= 360; s /= 100; v /= 100;
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function hexToHsv(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsv(r, g, b);
}

function hsvToHex(h, s, v) {
  const { r, g, b } = hsvToRgb(h, s, v);
  return rgbToHex(r, g, b);
}

/** Relative luminance check — returns true if the color is light */
function isLightColor(hex) {
  if (!hex) return false;
  const { r, g, b } = hexToRgb(hex);
  return (0.299 * r + 0.587 * g + 0.114 * b) > 140;
}

/* ── Variant icon map ── */
const variantIcons = {
  icon: cubeSvg,
  font: fontSvg,
  background: colorSvg,
  element: backgroundColorSvg,
};

/* ── Brand palette data ── */
const BRAND_FAMILIES = [
  'plum', 'scarlet', 'sienna', 'juice', 'ocra', 'sun',
  'lavender', 'indigo', 'grass', 'leaf', 'glacier', 'shock', 'o9gray',
];

const BRAND_STOPS = ['d5', 'd4', 'd3', 'd2', 'd1', 'accent', 'l1', 'l2', 'l3', 'l4', 'l5'];
const O9GRAY_STOPS = ['off-black', 'd5', 'd4', 'd3', 'd2', 'd1', 'accent', 'l1', 'l2', 'l3', 'off-white'];

/* ── Size styles (matching DropdownButton icon-only tertiary) ── */
const sizeStyles = { sm: 'h-6', md: 'h-8', lg: 'h-9' };
const iconSizeStyles = {
  sm: '[&_span]:w-4 [&_span]:h-4',
  md: '[&_span]:w-5 [&_span]:h-5',
  lg: '[&_span]:w-6 [&_span]:h-6',
};
const colorBarH = { sm: 2, md: 3, lg: 4 };

/* ── Inline SVG icons ── */
const CheckIcon = ({ light }) => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke={light ? '#000' : '#fff'} strokeWidth="2.5">
    <path d="M3 7l3 3 5-5" />
  </svg>
);

/* ── Resolve brand palette colors from CSS custom properties ── */
function resolveBrandPalette() {
  const style = getComputedStyle(document.documentElement);
  const palette = [];
  for (const family of BRAND_FAMILIES) {
    const stops = family === 'o9gray' ? O9GRAY_STOPS : BRAND_STOPS;
    const row = stops.map((stop) => {
      const prop = `--color-global-${family}-${stop}`;
      const val = style.getPropertyValue(prop).trim();
      return { family, stop, hex: val ? val.toUpperCase() : '' };
    });
    palette.push({ family, colors: row });
  }
  return palette;
}

/* ── Family display labels ── */
const FAMILY_LABELS = {
  plum: 'Plum', scarlet: 'Scarlet', sienna: 'Sienna', juice: 'Juice',
  ocra: 'Ocra', sun: 'Sun', lavender: 'Lavender', indigo: 'Indigo',
  grass: 'Grass', leaf: 'Leaf', glacier: 'Glacier', shock: 'Shock', o9gray: 'Gray',
};

/* ── Component ── */

const ColorPicker = forwardRef(function ColorPicker(
  {
    variant = 'background',
    size = 'md',
    value: controlledValue,
    opacity: controlledOpacity,
    onChange,
    showOpacity = true,
    label,
    required = false,
    optional = false,
    disabled = false,
    className,
    id,
    ...rest
  },
  ref
) {
  const inputId = id || (label ? `cp-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  /* ── Controlled / uncontrolled ── */
  const [internalValue, setInternalValue] = useState('');
  const [internalOpacity, setInternalOpacity] = useState(100);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const opacity = controlledOpacity !== undefined ? controlledOpacity : internalOpacity;

  /* ── Dropdown state ── */
  const [isOpen, setIsOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  /* ── Panel state ── */
  const [activeTab, setActiveTab] = useState('brand');
  const [hsv, setHsv] = useState({ h: 0, s: 100, v: 100 });
  const [inputMode, setInputMode] = useState('hex');
  const [hexInput, setHexInput] = useState('');

  /* ── Refs ── */
  const containerRef = useRef(null);
  const spectrumRef = useRef(null);
  const dropdownId = useRef(`cp-${Math.random().toString(36).slice(2, 8)}`).current;

  /* ── Brand palette cache ── */
  const [brandPalette, setBrandPalette] = useState(null);
  useEffect(() => {
    if (isOpen && !brandPalette) {
      setBrandPalette(resolveBrandPalette());
    }
  }, [isOpen, brandPalette]);

  /* ── Sync HSV + hex input from value ── */
  useEffect(() => {
    if (value) {
      setHsv(hexToHsv(value));
      setHexInput(value);
    } else {
      setHexInput('');
    }
  }, [value]);

  /* ── Central update function ── */
  const emitChange = useCallback((hex, opacityVal) => {
    const upperHex = hex ? hex.toUpperCase() : '';
    if (!isControlled) setInternalValue(upperHex);
    if (controlledOpacity === undefined) setInternalOpacity(opacityVal ?? opacity);
    onChange?.(upperHex, opacityVal ?? opacity);
    if (upperHex) {
      setHsv(hexToHsv(upperHex));
      setHexInput(upperHex);
    }
  }, [isControlled, controlledOpacity, opacity, onChange]);

  /* ── Handlers ── */
  const handleNoColor = () => {
    emitChange('', opacity);
  };

  const handleBrandSelect = (hex) => {
    emitChange(hex, opacity);
  };

  const handleHsvChange = useCallback((h, s, v) => {
    const newHsv = { h, s, v };
    setHsv(newHsv);
    const hex = hsvToHex(h, s, v);
    emitChange(hex, opacity);
  }, [emitChange, opacity]);

  const handleHexInputChange = (str) => {
    setHexInput(str);
    // Validate and emit on valid 7-char hex
    const clean = str.startsWith('#') ? str : `#${str}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(clean)) {
      emitChange(clean, opacity);
    }
  };

  const handleHexInputBlur = () => {
    // On blur, revert to current value if input is invalid
    setHexInput(value || '');
  };

  const handleRgbChange = (channel, val) => {
    const rgb = hexToRgb(value || '#000000');
    rgb[channel] = val;
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    emitChange(hex, opacity);
  };

  const handleOpacityChange = (val) => {
    const clamped = Math.max(0, Math.min(100, Math.round(val)));
    if (controlledOpacity === undefined) setInternalOpacity(clamped);
    onChange?.(value, clamped);
  };

  /* ── Portal positioning (same as SelectDropdown) ── */
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const updatePosition = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMenuPos({ top: rect.bottom + 4, left: rect.left });
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  /* ── Click-outside detection ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (containerRef.current?.contains(e.target)) return;
      if (e.target.closest(`[data-dropdown-id="${dropdownId}"]`)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, dropdownId]);

  /* ── Escape key ── */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        containerRef.current?.querySelector('button')?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen]);

  /* ── Spectrum area mouse interaction ── */
  const handleSpectrumInteraction = useCallback((clientX, clientY) => {
    const el = spectrumRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    handleHsvChange(hsv.h, Math.round(x * 100), Math.round((1 - y) * 100));
  }, [hsv.h, handleHsvChange]);

  const handleSpectrumMouseDown = useCallback((e) => {
    e.preventDefault();
    handleSpectrumInteraction(e.clientX, e.clientY);
    const onMove = (me) => handleSpectrumInteraction(me.clientX, me.clientY);
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [handleSpectrumInteraction]);

  /* ── Derived values ── */
  const rgb = useMemo(() => hexToRgb(value || '#000000'), [value]);

  return (
    <div className={cn('inline-flex flex-col gap-1', className)} {...rest}>
      {/* ── Label ── */}
      {label && (
        <Label
          htmlFor={inputId}
          size={size}
          required={required}
          optional={optional}
          disabled={disabled}
        >
          {label}
        </Label>
      )}

      {/* ── Trigger button ── */}
      <div ref={containerRef} data-dropdown-id={dropdownId} className="inline-flex">
        <button
          ref={ref}
          id={inputId}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          className={cn(
            'inline-flex items-center font-medium leading-none',
            'transition-colors duration-100 focus-visible:outline-none',
            'disabled:opacity-35 disabled:pointer-events-none cursor-pointer select-none',
            'bg-transparent text-text border border-transparent',
            'hover:bg-interactive-muted active:bg-interactive-muted-hover',
            'focus-visible:ring-1 focus-visible:ring-interactive-border/50',
            sizeStyles[size]
          )}
        >
          {/* Icon zone */}
          <span className={cn('inline-flex items-center flex-col gap-0.5 pl-1.5', iconSizeStyles[size])}>
            {value ? (
              <>
                <O9Icon svg={variantIcons[variant] || variantIcons.background} />
                <span
                  className="w-full rounded-sm"
                  style={{ height: colorBarH[size], backgroundColor: value }}
                />
              </>
            ) : (
              <span className="text-danger">
                <O9Icon svg={banSvg} />
              </span>
            )}
          </span>

          {/* Arrow zone */}
          <span className="shrink-0 flex items-center justify-center px-1 [&_span]:!w-3 [&_span]:!h-3">
            <O9Icon svg={isOpen ? angleUpSvg : angleDownSvg} />
          </span>
        </button>
      </div>

      {/* ── Portal dropdown panel ── */}
      {isOpen && !disabled && createPortal(
        <div
          data-dropdown-id={dropdownId}
          className="bg-surface-raised border border-border shadow-down"
          style={{
            position: 'fixed',
            top: `${menuPos.top}px`,
            left: `${menuPos.left}px`,
            zIndex: 9999,
            width: 280,
          }}
        >
          {/* No Color button */}
          <button
            type="button"
            onClick={handleNoColor}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors cursor-pointer',
              'hover:bg-interactive-subtle',
              !value && 'bg-interactive-subtle'
            )}
          >
            <span className="text-danger [&_span]:!w-3.5 [&_span]:!h-3.5">
              <O9Icon svg={banSvg} />
            </span>
            <span className="flex-1 text-text-secondary text-left">No Color</span>
            {!value && (
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" className="text-text">
                <path d="M3 7l3 3 5-5" />
              </svg>
            )}
          </button>

          <div className="border-t border-border" />

          {/* Tab bar */}
          <div className="flex border-b border-border">
            {['brand', 'custom'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'flex-1 px-3 py-2 text-xs font-medium transition-colors cursor-pointer',
                  activeTab === tab
                    ? 'text-text border-b-2 border-interactive'
                    : 'text-text-tertiary hover:text-text-secondary'
                )}
              >
                {tab === 'brand' ? 'Brand Palette' : 'Custom'}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'brand' ? (
            /* ── Brand Palette tab ── */
            <div className="p-2 max-h-72 overflow-y-auto">
              {brandPalette?.map(({ family, colors }) => (
                <div key={family} className="flex items-center gap-1 mb-0.5">
                  <span className="w-10 shrink-0 text-[9px] font-medium text-text-tertiary truncate leading-none">
                    {FAMILY_LABELS[family]}
                  </span>
                  <div className="flex gap-px flex-1">
                    {colors.map(({ hex, stop }) => {
                      if (!hex) return null;
                      const isSelected = hex.toUpperCase() === value?.toUpperCase();
                      return (
                        <button
                          key={`${family}-${stop}`}
                          type="button"
                          title={`${FAMILY_LABELS[family]} ${stop}`}
                          onClick={() => handleBrandSelect(hex)}
                          className={cn(
                            'w-[18px] h-[18px] shrink-0 cursor-pointer transition-shadow relative',
                            'hover:ring-1 hover:ring-interactive-border hover:z-10',
                            isSelected && 'ring-2 ring-interactive-border z-10'
                          )}
                          style={{ backgroundColor: hex }}
                        >
                          {isSelected && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <CheckIcon light={isLightColor(hex)} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── Custom tab ── */
            <div className="p-3 flex flex-col gap-3">
              {/* Spectrum area (saturation-value) */}
              <div
                ref={spectrumRef}
                className="relative w-full h-36 cursor-crosshair select-none rounded-sm overflow-hidden"
                style={{ backgroundColor: `hsl(${hsv.h}, 100%, 50%)` }}
                onMouseDown={handleSpectrumMouseDown}
              >
                {/* White → transparent overlay (saturation) */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #fff, transparent)' }} />
                {/* Transparent → black overlay (value) */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #000)' }} />
                {/* Selection cursor */}
                <div
                  className="absolute w-3.5 h-3.5 border-2 border-white rounded-circle shadow-md pointer-events-none"
                  style={{
                    left: `${hsv.s}%`,
                    top: `${100 - hsv.v}%`,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)',
                  }}
                />
              </div>

              {/* Hue slider */}
              <div className="relative w-full h-5">
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={1}
                  value={hsv.h}
                  onChange={(e) => handleHsvChange(Number(e.target.value), hsv.s, hsv.v)}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                  style={{ height: 20 }}
                />
                {/* Rainbow gradient track */}
                <div
                  className="absolute left-1 right-1 h-2.5 top-1/2 -translate-y-1/2 rounded-sm"
                  style={{
                    background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
                  }}
                />
                {/* Thumb */}
                <div
                  className="absolute w-2.5 h-4 bg-white border border-border-strong shadow-sm pointer-events-none rounded-sm"
                  style={{
                    left: `calc(4px + ${(hsv.h / 360) * 100}% * (1 - 8px / 100%))`,
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              </div>

              {/* Color preview + HEX/RGB inputs */}
              <div className="flex items-center gap-2">
                {/* Color preview swatch */}
                <div
                  className="w-8 h-8 shrink-0 border border-border rounded-sm"
                  style={{ backgroundColor: value || 'transparent' }}
                />

                {/* Input mode toggle */}
                <button
                  type="button"
                  onClick={() => setInputMode(inputMode === 'hex' ? 'rgb' : 'hex')}
                  className="text-[10px] font-bold uppercase text-text-tertiary hover:text-text transition-colors cursor-pointer shrink-0 w-6"
                >
                  {inputMode === 'hex' ? 'HEX' : 'RGB'}
                </button>

                {inputMode === 'hex' ? (
                  /* HEX input */
                  <input
                    type="text"
                    value={hexInput}
                    onChange={(e) => handleHexInputChange(e.target.value)}
                    onBlur={handleHexInputBlur}
                    placeholder="#000000"
                    maxLength={7}
                    className="flex-1 h-7 px-2 text-xs bg-surface-input border-b border-border-hover text-text placeholder:text-text-placeholder focus:border-interactive-border outline-none font-mono"
                  />
                ) : (
                  /* RGB inputs */
                  <div className="flex gap-1 flex-1">
                    {['r', 'g', 'b'].map((ch) => (
                      <input
                        key={ch}
                        type="number"
                        min={0}
                        max={255}
                        value={rgb[ch]}
                        onChange={(e) => handleRgbChange(ch, Number(e.target.value))}
                        className="w-full h-7 px-1.5 text-xs bg-surface-input border-b border-border-hover text-text text-center outline-none focus:border-interactive-border tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        placeholder={ch.toUpperCase()}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Opacity slider + input */}
              {showOpacity && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase text-text-tertiary shrink-0 w-6">A</span>

                  {/* Opacity slider */}
                  <div className="relative flex-1 h-5">
                    <input
                      type="range"
                      min={0}
                      max={100}
                      step={1}
                      value={opacity}
                      onChange={(e) => handleOpacityChange(Number(e.target.value))}
                      className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
                      style={{ height: 20 }}
                    />
                    {/* Checkerboard + gradient track */}
                    <div className="absolute left-1 right-1 h-2.5 top-1/2 -translate-y-1/2 rounded-sm overflow-hidden">
                      {/* Checkerboard */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: 'repeating-conic-gradient(#e0e0e0 0% 25%, transparent 0% 50%)',
                          backgroundSize: '8px 8px',
                        }}
                      />
                      {/* Color gradient */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to right, transparent, ${value || '#000'})`,
                        }}
                      />
                    </div>
                    {/* Thumb */}
                    <div
                      className="absolute w-2.5 h-4 bg-white border border-border-strong shadow-sm pointer-events-none rounded-sm"
                      style={{
                        left: `calc(4px + ${opacity}% * (1 - 8px / 100%))`,
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  </div>

                  {/* Opacity number input */}
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={opacity}
                    onChange={(e) => handleOpacityChange(Number(e.target.value))}
                    className="w-12 h-7 px-1.5 text-xs bg-surface-input border-b border-border-hover text-text text-center outline-none focus:border-interactive-border tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-[10px] text-text-tertiary">%</span>
                </div>
              )}
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
});

export default ColorPicker;
