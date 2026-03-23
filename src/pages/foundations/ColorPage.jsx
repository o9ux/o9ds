import { useState } from 'react';
import PageHeader from '@/docs/components/PageHeader';

/* ─── helpers ──────────────────────────────────────────────── */

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 140;
}

function useCopy() {
  const [copied, setCopied] = useState(null);
  const copy = (val) => {
    navigator.clipboard.writeText(val).then(() => {
      setCopied(val);
      setTimeout(() => setCopied(null), 1500);
    });
  };
  return { copied, copy };
}

/* ─── swatch components ─────────────────────────────────────── */

function Swatch({ label, token, hex, description, size = 'md' }) {
  const { copied, copy } = useCopy();
  const light = isLight(hex);
  const swatchH = size === 'lg' ? 'h-24' : size === 'sm' ? 'h-12' : 'h-16';

  return (
    <div
      className="group border border-border overflow-hidden cursor-pointer transition-all hover:border-border-hover"
      title={`Click to copy token`}
      onClick={() => copy(token)}
    >
      {/* Color well */}
      <div
        className={`${swatchH} w-full flex items-end p-2 border-b border-border`}
        style={{ backgroundColor: hex }}
      >
        {copied === token && (
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 ml-auto"
            style={{
              backgroundColor: light ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.55)',
              color: light ? '#fff' : '#000',
            }}
          >
            Copied!
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="p-3 bg-surface-raised">
        <p className="text-xs font-bold text-text leading-tight">{label}</p>
        <p className="text-[11px] font-mono text-text-tertiary mt-0.5 uppercase tracking-wider">{hex}</p>
        <p className="text-[10px] font-mono text-text-disabled mt-1 truncate leading-tight">{token}</p>
        {description && (
          <p className="text-[10px] text-text-tertiary mt-1 leading-snug">{description}</p>
        )}
      </div>
    </div>
  );
}

function SemanticSwatch({ label, token, hex, maps, description }) {
  const { copied, copy } = useCopy();
  const light = isLight(hex);

  return (
    <div
      className="group border border-border overflow-hidden cursor-pointer hover:border-border-hover transition-all flex"
      onClick={() => copy(token)}
      title="Click to copy token"
    >
      {/* Color strip */}
      <div
        className="w-12 shrink-0 flex items-center justify-center"
        style={{ backgroundColor: hex }}
      >
        {copied === token && (
          <span
            className="text-[9px] rotate-90 whitespace-nowrap font-mono"
            style={{ color: light ? '#000' : '#fff' }}
          >
            ✓
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex-1 p-3 bg-surface-raised border-l border-border min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-[11px] font-mono font-bold text-text truncate">{token}</p>
          <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-wider shrink-0">
            {hex}
          </span>
        </div>
        <p className="text-[11px] text-text-secondary mt-0.5 leading-snug">{label}</p>
        {maps && (
          <p className="text-[10px] font-mono text-text-disabled mt-1 truncate">↳ {maps}</p>
        )}
        {description && (
          <p className="text-[10px] text-text-tertiary mt-1 leading-snug">{description}</p>
        )}
      </div>
    </div>
  );
}

/* ─── branding strip ────────────────────────────────────────── */

function BrandingStrip({ name, stops }) {
  const [copiedHex, setCopiedHex] = useState(null);

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1400);
    });
  };

  return (
    <div className="flex items-stretch min-w-0 group/row">
      {/* Family label */}
      <div className="w-[76px] shrink-0 flex items-center pr-3">
        <span className="text-[11px] font-bold text-text leading-tight truncate">{name}</span>
      </div>

      {/* Color ramp */}
      <div className="flex flex-1 overflow-x-auto gap-[1px]">
        {stops.map(({ stop, hex, token }) => {
          const isAccent = stop === 'Accent';
          const light = isLight(hex);
          const isCopied = copiedHex === hex;

          return (
            <button
              key={stop}
              onClick={() => handleCopy(hex)}
              title={`${token}\n${hex}`}
              className="flex-1 min-w-[44px] cursor-pointer group/swatch"
            >
              {/* Color cell */}
              <div
                className={`h-11 w-full relative flex items-center justify-center transition-all group-hover/swatch:scale-y-110 origin-bottom ${
                  isAccent ? 'ring-1 ring-white/40 ring-inset' : ''
                }`}
                style={{ backgroundColor: hex }}
              >
                {isCopied && (
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: light ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)' }}
                  >
                    ✓
                  </span>
                )}
              </div>
              {/* Stop info */}
              <div className="py-1.5 text-center">
                <span className={`text-[8.5px] font-bold block tracking-wide uppercase ${isAccent ? 'text-text' : 'text-text-tertiary'}`}>
                  {stop}
                </span>
                <span className="text-[8px] font-mono text-text-disabled block mt-0.5 uppercase tracking-tight">
                  {hex.replace('#', '')}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── section wrapper ───────────────────────────────────────── */

function Section({ id, title, subtitle, children }) {
  return (
    <section className="mb-14">
      <div className="mb-5">
        <h2 id={id} className="text-base font-black tracking-widest uppercase text-text">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-text-tertiary mt-1 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function SubSection({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xs font-bold tracking-widest uppercase text-text-tertiary mb-3 border-b border-border pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ─── data ──────────────────────────────────────────────────── */

const neutral = [
  { label: 'Off Black',    token: '--color-global-black',    hex: '#010101', description: 'Off Black Accent' },
  { label: 'Gray 10',      token: '--color-global-gray-10',  hex: '#121212', description: 'Off Black L1' },
  { label: 'Gray 09',      token: '--color-global-gray-09',  hex: '#202020', description: 'Off Black L3' },
  { label: 'Gray 08',      token: '--color-global-gray-08',  hex: '#303030', description: 'Off Black L4' },
  { label: 'Gray 07',      token: '--color-global-gray-07',  hex: '#4C4C4C', description: 'Off Black L5' },
  { label: 'Gray 06',      token: '--color-global-gray-06',  hex: '#666666', description: 'Off Black L6' },
  { label: 'Gray 05',      token: '--color-global-gray-05',  hex: '#808080', description: 'Off White L5' },
  { label: 'Gray 04',      token: '--color-global-gray-04',  hex: '#B2B2B2', description: 'Off White L4' },
  { label: 'Gray 03',      token: '--color-global-gray-03',  hex: '#CCCCCC', description: 'Off White L3' },
  { label: 'Gray 02',      token: '--color-global-gray-02',  hex: '#E5E5E5', description: 'Off White L2' },
  { label: 'Gray 01',      token: '--color-global-gray-01',  hex: '#F2F2F2', description: 'Off White L1' },
  { label: 'Pure White',   token: '--color-global-white',    hex: '#FFFFFF', description: 'White' },
];

const feedbackBluish = [
  { label: 'Shock D1',     token: '--color-global-bluish-10', hex: '#002ED2' },
  { label: 'Shock Accent', token: '--color-global-bluish-09', hex: '#0037FF' },
  { label: 'Shock L3',     token: '--color-global-bluish-08', hex: '#8AA3FF' },
  { label: 'Shock L4',     token: '--color-global-bluish-07', hex: '#B8C7FF' },
];

const feedbackGreenish = [
  { label: 'Grass D2',     token: '--color-global-greenish-10', hex: '#0C7951' },
  { label: 'Grass L1',     token: '--color-global-greenish-09', hex: '#2FE09D' },
];

const feedbackReddish = [
  { label: 'Scarlet D3',   token: '--color-global-redish-11', hex: '#660914' },
  { label: 'Sienna D2',    token: '--color-global-redish-10', hex: '#931D07' },
  { label: 'Scarlet D1',   token: '--color-global-redish-09', hex: '#BC1227' },
  { label: 'Sienna Accent',token: '--color-global-redish-08', hex: '#D9311B' },
  { label: 'Sienna L1',    token: '--color-global-redish-07', hex: '#EB5436' },
  { label: 'Sienna L2',    token: '--color-global-redish-06', hex: '#F07A62' },
];

const feedbackOrangish = [
  { label: 'Ocra D2',      token: '--color-global-orangish-10', hex: '#926200' },
  { label: 'Ocra D1',      token: '--color-global-orangish-08', hex: '#D25F0C' },
  { label: 'Ocra Accent',  token: '--color-global-orangish-07', hex: '#E39600' },
  { label: 'Sun L2',       token: '--color-global-orangish-09', hex: '#FFEF5C' },
];

const themeOnyxBlack = [
  { label: 'Onyx 11',  token: '--color-global-onyxblack-11', hex: '#303030' },
  { label: 'Onyx 10',  token: '--color-global-onyxblack-10', hex: '#111111' },
  { label: 'Onyx 09',  token: '--color-global-onyxblack-09', hex: '#424242' },
  { label: 'Onyx 08',  token: '--color-global-onyxblack-08', hex: '#CCCCCC' },
  { label: 'Onyx 07',  token: '--color-global-onyxblack-07', hex: '#E5E5E5' },
  { label: 'Onyx 06',  token: '--color-global-onyxblack-06', hex: '#F2F2F2' },
];

const themeForestGreen = [
  { label: 'Forest 11', token: '--color-global-forestgreen-11', hex: '#2A5C44' },
  { label: 'Forest 10', token: '--color-global-forestgreen-10', hex: '#3A684E' },
  { label: 'Forest 09', token: '--color-global-forestgreen-09', hex: '#2E8B57' },
  { label: 'Forest 08', token: '--color-global-forestgreen-08', hex: '#BFE2CB' },
  { label: 'Forest 07', token: '--color-global-forestgreen-07', hex: '#E5F3EA' },
  { label: 'Forest 06', token: '--color-global-forestgreen-06', hex: '#EEF7F1' },
];

const themeSkyBlue = [
  { label: 'Sky 11',   token: '--color-global-skyblue-11', hex: '#204DA5' },
  { label: 'Sky 10',   token: '--color-global-skyblue-10', hex: '#2758BA' },
  { label: 'Sky 09',   token: '--color-global-skyblue-09', hex: '#3D6DCC' },
  { label: 'Sky 08',   token: '--color-global-skyblue-08', hex: '#BBDDFF' },
  { label: 'Sky 07',   token: '--color-global-skyblue-07', hex: '#E3F2FF' },
  { label: 'Sky 06',   token: '--color-global-skyblue-06', hex: '#EFF8FF' },
];

const themeMidnightIndigo = [
  { label: 'Midnight 11', token: '--color-global-midnightindigo-11', hex: '#1E344D' },
  { label: 'Midnight 10', token: '--color-global-midnightindigo-10', hex: '#041E3A' },
  { label: 'Midnight 09', token: '--color-global-midnightindigo-09', hex: '#2A4058' },
  { label: 'Midnight 08', token: '--color-global-midnightindigo-08', hex: '#C3D6EB' },
  { label: 'Midnight 07', token: '--color-global-midnightindigo-07', hex: '#E4EEFF' },
  { label: 'Midnight 06', token: '--color-global-midnightindigo-06', hex: '#F0F5FF' },
];

const utilityColors = [
  { label: 'Indigo Accent',  token: '--color-global-purple-dark',  hex: '#7433CC' },
  { label: 'Indigo L2',      token: '--color-global-purple-light', hex: '#A67DDE' },
  { label: 'Deep Forest',    token: '--color-global-green-dark',   hex: '#073725' },
];

/* ─── branding palette data ─────────────────────────────────── */

const brandingPalette = [
  {
    name: 'Plum',
    stops: [
      { stop: 'D5', hex: '#1A0010', token: '--color-global-plum-d5' },
      { stop: 'D4', hex: '#390023', token: '--color-global-plum-d4' },
      { stop: 'D3', hex: '#580036', token: '--color-global-plum-d3' },
      { stop: 'D2', hex: '#770049', token: '--color-global-plum-d2' },
      { stop: 'D1', hex: '#96005C', token: '--color-global-plum-d1' },
      { stop: 'Accent', hex: '#B60071', token: '--color-global-plum-accent' },
      { stop: 'L1', hex: '#C52E88', token: '--color-global-plum-l1' },
      { stop: 'L2', hex: '#D45CA9', token: '--color-global-plum-l2' },
      { stop: 'L3', hex: '#E38ABF', token: '--color-global-plum-l3' },
      { stop: 'L4', hex: '#F2B8D9', token: '--color-global-plum-l4' },
      { stop: 'L5', hex: '#FFE5F5', token: '--color-global-plum-l5' },
    ],
  },
  {
    name: 'Scarlet',
    stops: [
      { stop: 'D5', hex: '#1A0003', token: '--color-global-scarlet-d5' },
      { stop: 'D4', hex: '#48060E', token: '--color-global-scarlet-d4' },
      { stop: 'D3', hex: '#660914', token: '--color-global-scarlet-d3' },
      { stop: 'D2', hex: '#931020', token: '--color-global-scarlet-d2' },
      { stop: 'D1', hex: '#BC1227', token: '--color-global-scarlet-d1' },
      { stop: 'Accent', hex: '#FF1E39', token: '--color-global-scarlet-accent' },
      { stop: 'L1', hex: '#FF465C', token: '--color-global-scarlet-l1' },
      { stop: 'L2', hex: '#FF6E7F', token: '--color-global-scarlet-l2' },
      { stop: 'L3', hex: '#FF96A2', token: '--color-global-scarlet-l3' },
      { stop: 'L4', hex: '#FFBEC5', token: '--color-global-scarlet-l4' },
      { stop: 'L5', hex: '#FFE5E8', token: '--color-global-scarlet-l5' },
    ],
  },
  {
    name: 'Sienna',
    stops: [
      { stop: 'D5', hex: '#180501', token: '--color-global-sienna-d5' },
      { stop: 'D4', hex: '#410D03', token: '--color-global-sienna-d4' },
      { stop: 'D3', hex: '#6A1505', token: '--color-global-sienna-d3' },
      { stop: 'D2', hex: '#931D07', token: '--color-global-sienna-d2' },
      { stop: 'D1', hex: '#BC2509', token: '--color-global-sienna-d1' },
      { stop: 'Accent', hex: '#E62E0A', token: '--color-global-sienna-accent' },
      { stop: 'L1', hex: '#EB5436', token: '--color-global-sienna-l1' },
      { stop: 'L2', hex: '#F07A62', token: '--color-global-sienna-l2' },
      { stop: 'L3', hex: '#F5A08E', token: '--color-global-sienna-l3' },
      { stop: 'L4', hex: '#FAC6BA', token: '--color-global-sienna-l4' },
      { stop: 'L5', hex: '#FFE4E0', token: '--color-global-sienna-l5' },
    ],
  },
  {
    name: 'Juice',
    stops: [
      { stop: 'D5', hex: '#1A0B00', token: '--color-global-juice-d5' },
      { stop: 'D4', hex: '#482003', token: '--color-global-juice-d4' },
      { stop: 'D3', hex: '#763506', token: '--color-global-juice-d3' },
      { stop: 'D2', hex: '#A44A09', token: '--color-global-juice-d2' },
      { stop: 'D1', hex: '#D25F0C', token: '--color-global-juice-d1' },
      { stop: 'Accent', hex: '#FF7311', token: '--color-global-juice-accent' },
      { stop: 'L1', hex: '#FF8C38', token: '--color-global-juice-l1' },
      { stop: 'L2', hex: '#FFA565', token: '--color-global-juice-l2' },
      { stop: 'L3', hex: '#FFBE8F', token: '--color-global-juice-l3' },
      { stop: 'L4', hex: '#FFD7B9', token: '--color-global-juice-l4' },
      { stop: 'L5', hex: '#FFECDF', token: '--color-global-juice-l5' },
    ],
  },
  {
    name: 'Ocra',
    stops: [
      { stop: 'D5', hex: '#1A1100', token: '--color-global-ocra-d5' },
      { stop: 'D4', hex: '#422C00', token: '--color-global-ocra-d4' },
      { stop: 'D3', hex: '#7B4700', token: '--color-global-ocra-d3' },
      { stop: 'D2', hex: '#926200', token: '--color-global-ocra-d2' },
      { stop: 'D1', hex: '#BA7D00', token: '--color-global-ocra-d1' },
      { stop: 'Accent', hex: '#E39600', token: '--color-global-ocra-accent' },
      { stop: 'L1', hex: '#E9A92E', token: '--color-global-ocra-l1' },
      { stop: 'L2', hex: '#EFBC5C', token: '--color-global-ocra-l2' },
      { stop: 'L3', hex: '#F5CF8A', token: '--color-global-ocra-l3' },
      { stop: 'L4', hex: '#FBECB8', token: '--color-global-ocra-l4' },
      { stop: 'L5', hex: '#FFFDE6', token: '--color-global-ocra-l5' },
    ],
  },
  {
    name: 'Sun',
    stops: [
      { stop: 'D5', hex: '#1A1700', token: '--color-global-sun-d5' },
      { stop: 'D4', hex: '#484000', token: '--color-global-sun-d4' },
      { stop: 'D3', hex: '#766900', token: '--color-global-sun-d3' },
      { stop: 'D2', hex: '#A49200', token: '--color-global-sun-d2' },
      { stop: 'D1', hex: '#D2BB00', token: '--color-global-sun-d1' },
      { stop: 'Accent', hex: '#FFE500', token: '--color-global-sun-accent' },
      { stop: 'L1', hex: '#FFEA2E', token: '--color-global-sun-l1' },
      { stop: 'L2', hex: '#FFEF5C', token: '--color-global-sun-l2' },
      { stop: 'L3', hex: '#FFF48A', token: '--color-global-sun-l3' },
      { stop: 'L4', hex: '#FFF9B8', token: '--color-global-sun-l4' },
      { stop: 'L5', hex: '#FFFFE5', token: '--color-global-sun-l5' },
    ],
  },
  {
    name: 'Lavender',
    stops: [
      { stop: 'D5', hex: '#090218', token: '--color-global-lavender-d5' },
      { stop: 'D4', hex: '#17053F', token: '--color-global-lavender-d4' },
      { stop: 'D3', hex: '#250866', token: '--color-global-lavender-d3' },
      { stop: 'D2', hex: '#330B8D', token: '--color-global-lavender-d2' },
      { stop: 'D1', hex: '#410EB4', token: '--color-global-lavender-d1' },
      { stop: 'Accent', hex: '#5111DA', token: '--color-global-lavender-accent' },
      { stop: 'L1', hex: '#673CE1', token: '--color-global-lavender-l1' },
      { stop: 'L2', hex: '#8168E5', token: '--color-global-lavender-l2' },
      { stop: 'L3', hex: '#9B8DEE', token: '--color-global-lavender-l3' },
      { stop: 'L4', hex: '#B3B1F2', token: '--color-global-lavender-l4' },
      { stop: 'L5', hex: '#E2E1FF', token: '--color-global-lavender-l5' },
    ],
  },
  {
    name: 'Indigo',
    stops: [
      { stop: 'D5', hex: '#0B0514', token: '--color-global-indigo-d5' },
      { stop: 'D4', hex: '#200E39', token: '--color-global-indigo-d4' },
      { stop: 'D3', hex: '#35175E', token: '--color-global-indigo-d3' },
      { stop: 'D2', hex: '#4A2083', token: '--color-global-indigo-d2' },
      { stop: 'D1', hex: '#5F29A8', token: '--color-global-indigo-d1' },
      { stop: 'Accent', hex: '#7433CC', token: '--color-global-indigo-accent' },
      { stop: 'L1', hex: '#8D58D5', token: '--color-global-indigo-l1' },
      { stop: 'L2', hex: '#A67DDE', token: '--color-global-indigo-l2' },
      { stop: 'L3', hex: '#BFA2E7', token: '--color-global-indigo-l3' },
      { stop: 'L4', hex: '#D8C7F0', token: '--color-global-indigo-l4' },
      { stop: 'L5', hex: '#EEE6F8', token: '--color-global-indigo-l5' },
    ],
  },
  {
    name: 'Grass',
    stops: [
      { stop: 'D5', hex: '#001A10', token: '--color-global-grass-d5' },
      { stop: 'D4', hex: '#073725', token: '--color-global-grass-d4' },
      { stop: 'D3', hex: '#015132', token: '--color-global-grass-d3' },
      { stop: 'D2', hex: '#00804F', token: '--color-global-grass-d2' },
      { stop: 'D1', hex: '#00A264', token: '--color-global-grass-d1' },
      { stop: 'Accent', hex: '#00C278', token: '--color-global-grass-accent' },
      { stop: 'L1', hex: '#2FE09D', token: '--color-global-grass-l1' },
      { stop: 'L2', hex: '#89E6C3', token: '--color-global-grass-l2' },
      { stop: 'L3', hex: '#AEECD4', token: '--color-global-grass-l3' },
      { stop: 'L4', hex: '#CBF9E7', token: '--color-global-grass-l4' },
      { stop: 'L5', hex: '#DDF8EE', token: '--color-global-grass-l5' },
    ],
  },
  {
    name: 'Leaf',
    stops: [
      { stop: 'D5', hex: '#001905', token: '--color-global-leaf-d5' },
      { stop: 'D4', hex: '#0D3818', token: '--color-global-leaf-d4' },
      { stop: 'D3', hex: '#186622', token: '--color-global-leaf-d3' },
      { stop: 'D2', hex: '#1E8A38', token: '--color-global-leaf-d2' },
      { stop: 'D1', hex: '#26A644', token: '--color-global-leaf-d1' },
      { stop: 'Accent', hex: '#2EC653', token: '--color-global-leaf-accent' },
      { stop: 'L1', hex: '#4AD66D', token: '--color-global-leaf-l1' },
      { stop: 'L2', hex: '#6EDE8A', token: '--color-global-leaf-l2' },
      { stop: 'L3', hex: '#92E6A7', token: '--color-global-leaf-l3' },
      { stop: 'L4', hex: '#C0F0CA', token: '--color-global-leaf-l4' },
      { stop: 'L5', hex: '#E1F3E4', token: '--color-global-leaf-l5' },
    ],
  },
  {
    name: 'Glacier',
    stops: [
      { stop: 'D5', hex: '#001119', token: '--color-global-glacier-d5' },
      { stop: 'D4', hex: '#002436', token: '--color-global-glacier-d4' },
      { stop: 'D3', hex: '#003753', token: '--color-global-glacier-d3' },
      { stop: 'D2', hex: '#004A70', token: '--color-global-glacier-d2' },
      { stop: 'D1', hex: '#005D8D', token: '--color-global-glacier-d1' },
      { stop: 'Accent', hex: '#0172AA', token: '--color-global-glacier-accent' },
      { stop: 'L1', hex: '#2F8CBB', token: '--color-global-glacier-l1' },
      { stop: 'L2', hex: '#50A6CC', token: '--color-global-glacier-l2' },
      { stop: 'L3', hex: '#8BC0DD', token: '--color-global-glacier-l3' },
      { stop: 'L4', hex: '#BAD8EB', token: '--color-global-glacier-l4' },
      { stop: 'L5', hex: '#E3F0F7', token: '--color-global-glacier-l5' },
    ],
  },
  {
    name: 'Shock',
    stops: [
      { stop: 'D5', hex: '#00061A', token: '--color-global-shock-d5' },
      { stop: 'D4', hex: '#001048', token: '--color-global-shock-d4' },
      { stop: 'D3', hex: '#001A76', token: '--color-global-shock-d3' },
      { stop: 'D2', hex: '#0024A4', token: '--color-global-shock-d2' },
      { stop: 'D1', hex: '#002ED2', token: '--color-global-shock-d1' },
      { stop: 'Accent', hex: '#0037FF', token: '--color-global-shock-accent' },
      { stop: 'L1', hex: '#2E5BFF', token: '--color-global-shock-l1' },
      { stop: 'L2', hex: '#5C7FFF', token: '--color-global-shock-l2' },
      { stop: 'L3', hex: '#8AA3FF', token: '--color-global-shock-l3' },
      { stop: 'L4', hex: '#B8C7FF', token: '--color-global-shock-l4' },
      { stop: 'L5', hex: '#E1E8FF', token: '--color-global-shock-l5' },
    ],
  },
  {
    name: 'o9 Gray',
    stops: [
      { stop: 'Off Blk', hex: '#010101', token: '--color-global-o9gray-off-black' },
      { stop: 'D5',      hex: '#191919', token: '--color-global-o9gray-d5' },
      { stop: 'D4',      hex: '#303030', token: '--color-global-o9gray-d4' },
      { stop: 'D3',      hex: '#4C4C4C', token: '--color-global-o9gray-d3' },
      { stop: 'D2',      hex: '#666666', token: '--color-global-o9gray-d2' },
      { stop: 'D1',      hex: '#808080', token: '--color-global-o9gray-d1' },
      { stop: 'Accent',  hex: '#B2B2B2', token: '--color-global-o9gray-accent' },
      { stop: 'L1',      hex: '#CCCCCC', token: '--color-global-o9gray-l1' },
      { stop: 'L2',      hex: '#E5E5E5', token: '--color-global-o9gray-l2' },
      { stop: 'L3',      hex: '#F2F2F2', token: '--color-global-o9gray-l3' },
      { stop: 'Off Wht', hex: '#FFFFFF', token: '--color-global-o9gray-off-white' },
    ],
  },
];

/* Semantic Surface */
const semanticSurface = [
  { label: 'App Body Background',        token: '--color-s-base',      hex: '#0A0A0A', maps: '--color-global-black',    description: 'Outermost app background, never elevated' },
  { label: 'Header / Sidebar / Tiles',   token: '--color-s-layer-01',  hex: '#121212', maps: '--color-global-gray-10',  description: 'First elevation — navigation chrome, tile layout' },
  { label: 'Cards / Panels / Gen AI',    token: '--color-s-layer-02',  hex: '#1A1A1A', maps: '(interpolated)',           description: 'Second elevation — cards, data panels' },
  { label: 'Windows / Dialogs / Popover',token: '--color-s-layer-03',  hex: '#202020', maps: '--color-global-gray-09',  description: 'Third elevation — floating surfaces' },
  { label: 'Inputs / Search Bars',       token: '--color-s-layer-04',  hex: '#2A2A2A', maps: '(interpolated)',           description: 'Fourth elevation — form controls' },
  { label: 'Secondary Buttons / Chips',  token: '--color-s-layer-05',  hex: '#303030', maps: '--color-global-gray-08',  description: 'Fifth elevation — interactive chip surfaces' },
  { label: 'Dropdowns / Context Menus',  token: '--color-s-layer-06',  hex: '#404040', maps: '(interpolated)',           description: 'Sixth elevation — floating menus' },
  { label: 'Primary / Theme Active',     token: '--color-s-theme',     hex: '#FFFFFF', maps: '--color-global-white',    description: 'Primary button bg, active theme surface' },
  { label: 'Brand Mark Background',      token: '--color-s-brand',     hex: '#010101', maps: '--color-global-black',    description: 'Logo / brand identity background' },
];

/* Semantic Border */
const semanticBorder = [
  { label: 'Divider',          token: '--color-b-divider',       hex: '#303030', maps: '--color-global-gray-08',    description: 'Separators, chip outlines, tile borders' },
  { label: 'Base',             token: '--color-b-base',          hex: '#202020', maps: '--color-global-gray-09',    description: 'Matches dialog/window surface' },
  { label: 'Subtle',           token: '--color-b-subtle',        hex: '#121212', maps: '--color-global-gray-10',    description: 'Barely-visible divider on elevated bg' },
  { label: 'Dark / Strong',    token: '--color-b-dark',          hex: '#666666', maps: '--color-global-gray-06',    description: 'High contrast, strong borders' },
  { label: 'Separator',        token: '--color-b-separator',     hex: '#4C4C4C', maps: '--color-global-gray-07',    description: 'Group / section visual separators' },
  { label: 'Theme',            token: '--color-b-theme',         hex: '#FFFFFF', maps: '--color-global-white',      description: 'Theme-tinted border (primary focus outline)' },
  { label: 'Inverse',          token: '--color-b-inverse',       hex: '#FFFFFF', maps: '--color-global-white',      description: 'Inverse context border' },
  { label: 'Hover',            token: '--color-b-hover',         hex: '#4C4C4C', maps: '--color-global-gray-07',    description: 'Border on interactive hover state' },
  { label: 'Focus Ring',       token: '--color-b-theme-focus',   hex: '#FFFFFF', maps: '--color-global-white',      description: 'Keyboard focus ring' },
  { label: 'Form Field',       token: '--color-b-form',          hex: '#303030', maps: '--color-global-gray-08',    description: 'Default form input border' },
  { label: 'Active Tab / Chip',token: '--color-b-theme-hover-2', hex: '#E5E5E5', maps: '--color-global-gray-02',    description: 'Selected / active tab, chip outlines' },
  { label: 'Disabled',         token: '--color-b-disabled',      hex: '#666666', maps: '--color-global-gray-06',    description: 'Disabled field border' },
  { label: 'Error',            token: '--color-b-negative',      hex: '#D9311B', maps: '--color-global-redish-08',   description: 'Error / danger state border' },
  { label: 'Warning',          token: '--color-b-warning',       hex: '#D25F0C', maps: '--color-global-orangish-08', description: 'Warning state border' },
  { label: 'Success',          token: '--color-b-positive',      hex: '#00804F', maps: '--color-global-grass-d2',    description: 'Positive / success state border' },
  { label: 'Info',             token: '--color-b-info-light',    hex: '#0037FF', maps: '--color-global-bluish-09',   description: 'Informational state border' },
  { label: 'Utility Purple',   token: '--color-b-utility-purple',hex: '#7433CC', maps: '--color-global-purple-dark', description: 'Utility / tag accent border' },
];

/* Semantic Text */
const semanticText = [
  { label: 'Primary Text',      token: '--color-t-primary',        hex: '#FFFFFF', maps: '--color-global-white',       description: 'Body copy, headings — max contrast' },
  { label: 'Secondary Text',    token: '--color-t-secondary',      hex: '#E5E5E5', maps: '--color-global-gray-02',     description: 'Supporting labels, descriptors' },
  { label: 'Tertiary / Muted',  token: '--color-t-tertiary',       hex: '#B2B2B2', maps: '--color-global-gray-04',     description: 'De-emphasized metadata' },
  { label: 'Placeholder',       token: '--color-t-placeholder',    hex: '#808080', maps: '--color-global-gray-05',     description: 'Form input placeholder text' },
  { label: 'Disabled',          token: '--color-t-disabled',       hex: '#B2B2B2', maps: '--color-global-gray-04',     description: 'Non-interactive / locked text' },
  { label: 'Inverse',           token: '--color-t-inverse',        hex: '#010101', maps: '--color-global-black',       description: 'Text on white / light backgrounds' },
  { label: 'Theme Active',      token: '--color-t-theme',          hex: '#FFFFFF', maps: '--color-global-white',       description: 'Theme-colored interactive text' },
  { label: 'Black Static',      token: '--color-t-black-static',   hex: '#202020', maps: '--color-global-gray-09',     description: 'Always-dark text (e.g. tooltips on light bg)' },
  { label: 'Form Label',        token: '--color-t-form-label',     hex: '#E5E5E5', maps: '--color-global-gray-02',     description: 'Form field label text' },
  { label: 'Form Helper',       token: '--color-t-form-value',     hex: '#808080', maps: '--color-global-gray-05',     description: 'Form field description / helper text' },
  { label: 'Error / Danger',    token: '--color-t-negative',       hex: '#D9311B', maps: '--color-global-redish-08',   description: 'Error messages, validation failures' },
  { label: 'Warning',           token: '--color-t-warning',        hex: '#D25F0C', maps: '--color-global-orangish-08', description: 'Caution alerts, warning states' },
  { label: 'Success / Positive',token: '--color-t-positive',       hex: '#00804F', maps: '--color-global-grass-d2',    description: 'Success confirmations, positive states' },
  { label: 'Info',              token: '--color-t-info-light',     hex: '#0037FF', maps: '--color-global-bluish-09',   description: 'Informational callouts' },
  { label: 'Utility Purple',    token: '--color-t-utility-purple', hex: '#7433CC', maps: '--color-global-purple-dark', description: 'Utility accent text' },
];

/* ─── tab button ─────────────────────────────────────────────── */

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-bold tracking-widest uppercase border-b-2 transition-colors ${
        active
          ? 'border-white text-text'
          : 'border-transparent text-text-tertiary hover:text-text-secondary hover:border-border-hover'
      }`}
    >
      {children}
    </button>
  );
}

/* ─── main page ─────────────────────────────────────────────── */

export default function ColorPage() {
  const [semanticTab, setSemanticTab] = useState('surface');

  const semanticTabData = {
    surface: semanticSurface,
    border: semanticBorder,
    text: semanticText,
  };

  return (
    <article>
      <PageHeader
        title="Color"
        description="The o9ds color system is built on a two-tier token architecture: global primitive tokens define the raw palette; semantic tokens map those primitives to intentional UI roles. Components always consume semantic tokens, never primitives directly."
        category="Foundation"
      />

      {/* ── Architecture callout ───────────────────────────── */}
      <div className="mb-12 border border-border bg-surface-raised p-5 grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
        {[
          {
            step: '01',
            title: 'Global Primitives',
            body: 'Raw hex values — neutral scale, feedback families, and theme palettes. Token names: --color-global-*',
          },
          {
            step: '02',
            title: 'Semantic Tokens',
            body: 'Role-based aliases for surfaces, borders, and text. Token names: --color-s-*, --color-b-*, --color-t-*',
          },
          {
            step: '03',
            title: 'Component Aliases',
            body: 'Tailwind @theme utilities consumed in JSX. Token names: --color-surface, --color-text, --color-border …',
          },
        ].map(({ step, title, body }) => (
          <div key={step} className="bg-surface-raised p-5">
            <span className="text-[10px] font-mono font-black tracking-widest text-text-disabled block mb-2">
              TIER {step}
            </span>
            <p className="text-sm font-bold text-text mb-1">{title}</p>
            <p className="text-xs text-text-tertiary leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* ── 1. Neutral Scale ───────────────────────────────── */}
      <Section
        id="neutral"
        title="Neutral Scale"
        subtitle="12-stop monochrome ramp from Off-Black (#010101) to Pure White (#FFFFFF). The backbone of all dark-mode surfaces, borders, and text."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {neutral.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </div>
      </Section>

      {/* ── 2. Branding Palette ────────────────────────────── */}
      <Section
        id="branding"
        title="Branding Palette"
        subtitle="The complete o9ds color spectrum — 13 hue families (12 chromatic + neutral gray), each spanning 11 stops from darkest (D5) through the semantic accent to lightest (L5). Hover over any swatch to see its token name; click to copy the hex value. These primitives underpin all semantic and component tokens."
      >
        {/* Stop legend */}
        <div className="flex items-center mb-3 ml-[76px] gap-[1px] overflow-x-auto">
          {['D5','D4','D3','D2','D1','Accent','L1','L2','L3','L4','L5'].map((s) => (
            <div key={s} className={`flex-1 min-w-[44px] text-center text-[8.5px] font-bold tracking-wide uppercase pb-1 border-b ${s === 'Accent' ? 'text-text border-white/60' : 'text-text-disabled border-border'}`}>
              {s}
            </div>
          ))}
        </div>

        <div className="border border-border bg-surface-raised p-4 divide-y divide-border">
          {brandingPalette.map((family) => (
            <div key={family.name} className="py-2 first:pt-0 last:pb-0">
              <BrandingStrip name={family.name} stops={family.stops} />
            </div>
          ))}
        </div>

        {/* Reference note */}
        <p className="text-[11px] text-text-disabled mt-3 leading-relaxed">
          ↑ Reference palette from the o9ds Foundation Library. Use semantic tokens (
          <code className="font-mono text-text-tertiary">--color-global-*</code>) as primitives
          only — never consume them directly in components.
        </p>
      </Section>

      {/* ── 4. Feedback Palette ────────────────────────────── */}
      <Section
        id="feedback"
        title="Feedback Palette"
        subtitle="Status and feedback colors for success, error, warning, and info states. Each family spans dark-to-light for light and dark mode usage."
      >
        <SubSection title="Bluish — Shock (Info)">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {feedbackBluish.map((s) => <Swatch key={s.token} {...s} />)}
          </div>
        </SubSection>

        <SubSection title="Greenish — Grass (Success)">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {feedbackGreenish.map((s) => <Swatch key={s.token} {...s} />)}
          </div>
        </SubSection>

        <SubSection title="Reddish — Scarlet / Sienna (Error)">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {feedbackReddish.map((s) => <Swatch key={s.token} {...s} />)}
          </div>
        </SubSection>

        <SubSection title="Orangish — Sun / Ocra (Warning)">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {feedbackOrangish.map((s) => <Swatch key={s.token} {...s} />)}
          </div>
        </SubSection>
      </Section>

      {/* ── 5. Brand Theme Palettes ────────────────────────── */}
      <Section
        id="themes"
        title="Brand Theme Palettes"
        subtitle="o9ds ships four brand-accent themes. Each is a 6-stop ramp with a primary dark accent and a light tint range for backgrounds and tints."
      >
        <SubSection title="Onyx-Black (Default)">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {themeOnyxBlack.map((s) => <Swatch key={s.token} {...s} size="sm" />)}
          </div>
        </SubSection>

        <SubSection title="Forest-Green">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {themeForestGreen.map((s) => <Swatch key={s.token} {...s} size="sm" />)}
          </div>
        </SubSection>

        <SubSection title="Sky-Blue">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {themeSkyBlue.map((s) => <Swatch key={s.token} {...s} size="sm" />)}
          </div>
        </SubSection>

        <SubSection title="Midnight-Indigo">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {themeMidnightIndigo.map((s) => <Swatch key={s.token} {...s} size="sm" />)}
          </div>
        </SubSection>
      </Section>

      {/* ── 6. Utility ─────────────────────────────────────── */}
      <Section
        id="utility"
        title="Utility Colors"
        subtitle="Accent colors used for tags, badges, charts, and non-semantic UI elements."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {utilityColors.map((s) => <Swatch key={s.token} {...s} />)}
        </div>
      </Section>

      {/* ── 7. Semantic Tokens ─────────────────────────────── */}
      <Section
        id="semantic"
        title="Semantic Tokens"
        subtitle="Role-based tokens that components consume. Each token maps to a global primitive and carries intent. Click any row to copy the token name."
      >
        {/* Tabs */}
        <div className="border-b border-border mb-6 flex gap-0">
          <TabButton active={semanticTab === 'surface'} onClick={() => setSemanticTab('surface')}>
            Surface
          </TabButton>
          <TabButton active={semanticTab === 'border'} onClick={() => setSemanticTab('border')}>
            Border
          </TabButton>
          <TabButton active={semanticTab === 'text'} onClick={() => setSemanticTab('text')}>
            Text
          </TabButton>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 text-[10px] text-text-disabled font-mono">
          <span>COLOR</span>
          <span>TOKEN</span>
          <span>HEX</span>
          <span>MAPS TO</span>
          <span>DESCRIPTION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {semanticTabData[semanticTab].map((s) => (
            <SemanticSwatch key={s.token} {...s} />
          ))}
        </div>
      </Section>

      {/* ── 8. Component Aliases reference ─────────────────── */}
      <Section
        id="aliases"
        title="Component Aliases (Tailwind Utilities)"
        subtitle="These tokens live inside @theme and generate Tailwind utility classes. Use these in JSX — never reference global or semantic tokens directly in components."
      >
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                {['Tailwind Class', 'CSS Token', 'Value', 'Role'].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-bold tracking-widest uppercase text-text-tertiary">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { cls: 'bg-surface',          token: '--color-surface',          val: '#121212', role: 'Main app background' },
                { cls: 'bg-surface-raised',   token: '--color-surface-raised',   val: '#1A1A1A', role: 'Card / panel bg' },
                { cls: 'bg-surface-overlay',  token: '--color-surface-overlay',  val: '#202020', role: 'Dialog / popover bg' },
                { cls: 'bg-surface-input',    token: '--color-surface-input',    val: '#2A2A2A', role: 'Form input bg' },
                { cls: 'bg-surface-chip',     token: '--color-surface-chip',     val: '#303030', role: 'Chip / secondary btn bg' },
                { cls: 'bg-surface-menu',     token: '--color-surface-menu',     val: '#404040', role: 'Dropdown / menu bg' },
                { cls: 'bg-primary',          token: '--color-primary',          val: '#FFFFFF', role: 'Primary button bg' },
                { cls: 'text-text',           token: '--color-text',             val: '#FFFFFF', role: 'Primary body text' },
                { cls: 'text-text-secondary', token: '--color-text-secondary',   val: '#E5E5E5', role: 'Secondary text' },
                { cls: 'text-text-tertiary',  token: '--color-text-tertiary',    val: '#B2B2B2', role: 'Muted / metadata text' },
                { cls: 'text-text-disabled',  token: '--color-text-disabled',    val: '#B2B2B2', role: 'Disabled text' },
                { cls: 'text-text-inverse',   token: '--color-text-inverse',     val: '#010101', role: 'Text on white bg' },
                { cls: 'border-border',       token: '--color-border',           val: '#303030', role: 'Default border / divider' },
                { cls: 'border-border-hover', token: '--color-border-hover',     val: '#4C4C4C', role: 'Hover border' },
                { cls: 'border-border-focus', token: '--color-border-focus',     val: '#FFFFFF', role: 'Focus ring' },
                { cls: 'text-danger',         token: '--color-danger',           val: '#D9311B', role: 'Error / danger' },
                { cls: 'text-success',        token: '--color-success',          val: '#00804F', role: 'Success / positive' },
                { cls: 'text-warning',        token: '--color-warning',          val: '#D25F0C', role: 'Warning' },
                { cls: 'text-info',           token: '--color-info',             val: '#0037FF', role: 'Informational' },
              ].map((row, i) => (
                <tr key={row.cls} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-surface-sunken/30' : ''}`}>
                  <td className="px-4 py-2.5">
                    <code className="text-[11px] font-mono text-utility-purple">{row.cls}</code>
                  </td>
                  <td className="px-4 py-2.5">
                    <code className="text-[11px] font-mono text-text-tertiary">{row.token}</code>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-4 h-4 shrink-0 border border-border inline-block"
                        style={{ backgroundColor: row.val }}
                      />
                      <code className="text-[11px] font-mono text-text-secondary">{row.val}</code>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-[11px] text-text-tertiary">{row.role}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </article>
  );
}
