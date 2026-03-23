import { useState } from 'react';
import PageHeader from '@/docs/components/PageHeader';
import CodeBlock from '@/docs/components/CodeBlock';

// Sizes match the Figma illustration size tokens (o9ds-illus-96/124/224)
const SIZES = { sm: 96, md: 124, lg: 224 };

// Per-theme color palette
function pal(dark) {
  return {
    bg:      dark ? '#1E1E1E' : '#F2F2F2',
    base:    dark ? '#2C2C2C' : '#E6E6E6',
    mid:     dark ? '#3E3E3E' : '#D4D4D4',
    stroke:  dark ? '#5A5A5A' : '#BABABA',
    dim:     dark ? '#7A7A7A' : '#9E9E9E',
    surface: dark ? '#0A0A0A' : '#FFFFFF',
    yellow:  '#FFC33A',
    blue:    '#4A9EFF',
    green:   '#52C97E',
    red:     '#F05E5E',
  };
}

// 14 inline SVG illustration scene functions — all 124×124 viewBox
const scenes = {

  'no-notifications': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Bell body */}
        <path
          d="M62 34 C50 34 42 44 42 56 L42 72 L36 78 L36 82 L88 82 L88 78 L82 72 L82 56 C82 44 74 34 62 34Z"
          fill={c.mid} stroke={c.stroke} strokeWidth="2"
        />
        {/* Bell clapper */}
        <path d="M55 82 C55 86.5 58.2 90 62 90 C65.8 90 69 86.5 69 82"
          stroke={c.stroke} strokeWidth="2" fill="none" />
        {/* Bell top cap */}
        <circle cx="62" cy="34" r="3.5" fill={c.stroke} />
        {/* Diagonal slash */}
        <line x1="38" y1="38" x2="86" y2="86" stroke={c.dim} strokeWidth="2.5" strokeLinecap="round" />
      </>
    );
  },

  'no-tasks': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Clipboard body */}
        <rect x="38" y="36" width="48" height="58" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        {/* Clipboard clip */}
        <rect x="52" y="29" width="20" height="13" fill={c.base} stroke={c.stroke} strokeWidth="2" />
        {/* Empty checkbox row 1 */}
        <rect x="46" y="52" width="9" height="9" stroke={c.dim} strokeWidth="1.5" fill="none" />
        <line x1="61" y1="56.5" x2="78" y2="56.5" stroke={c.dim} strokeWidth="1.5" />
        {/* Empty checkbox row 2 */}
        <rect x="46" y="66" width="9" height="9" stroke={c.dim} strokeWidth="1.5" fill="none" />
        <line x1="61" y1="70.5" x2="78" y2="70.5" stroke={c.dim} strokeWidth="1.5" />
        {/* Empty checkbox row 3 */}
        <rect x="46" y="80" width="9" height="9" stroke={c.dim} strokeWidth="1.5" fill="none" />
        <line x1="61" y1="84.5" x2="73" y2="84.5" stroke={c.dim} strokeWidth="1.5" />
      </>
    );
  },

  'no-slides': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Presentation board */}
        <rect x="26" y="36" width="72" height="48" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        {/* Inner slide area */}
        <rect x="32" y="42" width="60" height="36" fill={c.base} />
        {/* Stand */}
        <line x1="62" y1="84" x2="62" y2="96" stroke={c.stroke} strokeWidth="2" />
        <line x1="49" y1="96" x2="75" y2="96" stroke={c.stroke} strokeWidth="2" />
        {/* Empty slide dots */}
        <circle cx="48" cy="60" r="4" fill={c.mid} opacity="0.5" />
        <circle cx="62" cy="60" r="4" fill={c.mid} opacity="0.5" />
        <circle cx="76" cy="60" r="4" fill={c.mid} opacity="0.5" />
        {/* Horizontal dashes */}
        <line x1="36" y1="68" x2="88" y2="68" stroke={c.dim} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.5" />
      </>
    );
  },

  'no-results-found': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Document */}
        <rect x="34" y="28" width="44" height="56" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        {/* Document fold corner */}
        <path d="M66 28 L78 28 L78 40 L66 40Z" fill={c.base} stroke={c.stroke} strokeWidth="2" />
        <path d="M66 28 L66 40 L78 40" fill="none" stroke={c.stroke} strokeWidth="2" />
        {/* Content lines */}
        <line x1="42" y1="48" x2="68" y2="48" stroke={c.dim} strokeWidth="1.5" />
        <line x1="42" y1="56" x2="70" y2="56" stroke={c.dim} strokeWidth="1.5" />
        <line x1="42" y1="64" x2="60" y2="64" stroke={c.dim} strokeWidth="1.5" />
        {/* Magnifying glass */}
        <circle cx="76" cy="78" r="14" fill={c.base} stroke={c.stroke} strokeWidth="2.5" />
        <line x1="86" y1="88" x2="96" y2="98" stroke={c.stroke} strokeWidth="3" strokeLinecap="round" />
        {/* X in lens */}
        <line x1="70" y1="72" x2="82" y2="84" stroke={c.dim} strokeWidth="2" strokeLinecap="round" />
        <line x1="82" y1="72" x2="70" y2="84" stroke={c.dim} strokeWidth="2" strokeLinecap="round" />
      </>
    );
  },

  'no-report': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Axes */}
        <path d="M32 90 L32 34" stroke={c.stroke} strokeWidth="2" strokeLinecap="square" />
        <path d="M32 90 L92 90" stroke={c.stroke} strokeWidth="2" strokeLinecap="square" />
        {/* Dashed empty bars */}
        <rect x="38" y="62" width="14" height="28" fill="none" stroke={c.dim} strokeWidth="1.5" strokeDasharray="3,2" />
        <rect x="58" y="46" width="14" height="44" fill="none" stroke={c.dim} strokeWidth="1.5" strokeDasharray="3,2" />
        <rect x="78" y="70" width="14" height="20" fill="none" stroke={c.dim} strokeWidth="1.5" strokeDasharray="3,2" />
        {/* Top question dots */}
        <circle cx="45" cy="57" r="3" fill={c.dim} opacity="0.45" />
        <circle cx="65" cy="41" r="3" fill={c.dim} opacity="0.45" />
        <circle cx="85" cy="65" r="3" fill={c.dim} opacity="0.45" />
      </>
    );
  },

  'no-post': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Document */}
        <rect x="30" y="28" width="50" height="66" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        {/* Header block */}
        <rect x="36" y="36" width="38" height="8" fill={c.base} />
        {/* Content lines */}
        <line x1="36" y1="52" x2="72" y2="52" stroke={c.dim} strokeWidth="1.5" />
        <line x1="36" y1="60" x2="72" y2="60" stroke={c.dim} strokeWidth="1.5" />
        <line x1="36" y1="68" x2="60" y2="68" stroke={c.dim} strokeWidth="1.5" />
        {/* Pencil */}
        <path d="M72 68 L84 56 L90 62 L78 74Z" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        <line x1="82" y1="58" x2="88" y2="64" stroke={c.stroke} strokeWidth="1.5" />
        <path d="M72 68 L70 76 L78 74Z" fill={c.stroke} />
      </>
    );
  },

  'no-form-configured': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Form field rows */}
        <rect x="28" y="32" width="68" height="14" fill={c.base} stroke={c.stroke} strokeWidth="1.5" />
        <rect x="28" y="52" width="68" height="14" fill={c.base} stroke={c.stroke} strokeWidth="1.5" />
        <rect x="28" y="72" width="68" height="14" fill={c.base} stroke={c.stroke} strokeWidth="1.5" />
        {/* Field placeholder lines */}
        <line x1="38" y1="39" x2="60" y2="39" stroke={c.dim} strokeWidth="1.5" strokeDasharray="3,2" />
        <line x1="38" y1="59" x2="58" y2="59" stroke={c.dim} strokeWidth="1.5" strokeDasharray="3,2" />
        <line x1="38" y1="79" x2="55" y2="79" stroke={c.dim} strokeWidth="1.5" strokeDasharray="3,2" />
        {/* Warning triangle */}
        <path d="M62 90 L74 108 L50 108Z" fill={c.yellow} opacity="0.85" />
        <line x1="62" y1="96" x2="62" y2="103" stroke={c.bg} strokeWidth="2" strokeLinecap="round" />
        <circle cx="62" cy="106" r="1.5" fill={c.bg} />
      </>
    );
  },

  'no-filters-found': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Funnel shape */}
        <path d="M26 34 L98 34 L76 58 L76 90 L48 80 L48 58Z"
          fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        {/* Dashed empty result lines */}
        <line x1="52" y1="66" x2="72" y2="66" stroke={c.dim} strokeWidth="1.5" strokeDasharray="3,2" />
        <line x1="55" y1="74" x2="69" y2="74" stroke={c.dim} strokeWidth="1.5" strokeDasharray="3,2" />
        {/* Empty dots above */}
        <circle cx="40" cy="34" r="2.5" fill={c.dim} opacity="0.35" />
        <circle cx="62" cy="28" r="2.5" fill={c.dim} opacity="0.35" />
        <circle cx="84" cy="34" r="2.5" fill={c.dim} opacity="0.35" />
      </>
    );
  },

  'no-filter-results': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Funnel shape */}
        <path d="M26 34 L98 34 L76 58 L76 90 L48 80 L48 58Z"
          fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        {/* Red X badge */}
        <circle cx="85" cy="85" r="16" fill={c.red} />
        <line x1="78" y1="78" x2="92" y2="92" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="92" y1="78" x2="78" y2="92" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </>
    );
  },

  'server-error': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Server rack — 3 units */}
        <rect x="30" y="32" width="64" height="16" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        <rect x="30" y="52" width="64" height="16" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        <rect x="30" y="72" width="64" height="16" fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        {/* Status LEDs */}
        <circle cx="42" cy="40" r="3.5" fill={c.green} />
        <circle cx="42" cy="60" r="3.5" fill={c.green} />
        <circle cx="42" cy="80" r="3.5" fill={c.red} />
        {/* Rack divider lines */}
        <line x1="52" y1="34" x2="52" y2="46" stroke={c.stroke} strokeWidth="1" opacity="0.5" />
        <line x1="52" y1="54" x2="52" y2="66" stroke={c.stroke} strokeWidth="1" opacity="0.5" />
        <line x1="52" y1="74" x2="52" y2="86" stroke={c.stroke} strokeWidth="1" opacity="0.5" />
        {/* Warning badge */}
        <circle cx="84" cy="36" r="14" fill={c.yellow} />
        <line x1="84" y1="30" x2="84" y2="38" stroke={c.bg} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="84" cy="41.5" r="2" fill={c.bg} />
      </>
    );
  },

  'restricted-access': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Shield */}
        <path d="M62 26 L88 38 L88 62 C88 78 76 90 62 96 C48 90 36 78 36 62 L36 38Z"
          fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        {/* Lock body */}
        <rect x="50" y="62" width="24" height="20" fill={c.stroke} />
        {/* Lock shackle */}
        <path d="M54 62 L54 54 C54 48 70 48 70 54 L70 62"
          stroke={c.stroke} strokeWidth="3" fill="none" strokeLinejoin="round" />
        {/* Keyhole */}
        <circle cx="62" cy="70" r="4" fill={c.bg} />
        <rect x="60" y="72" width="4" height="6" fill={c.bg} />
      </>
    );
  },

  'settings': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Gear body using a rounded polygon path */}
        <path
          d="M74 56 L80 52 L72 44 L68 48 C66 47 64 46 62 46 C60 46 58 47 56 48 L52 44 L44 52 L50 56 C49 58 48 60 48 62 C48 64 49 66 50 68 L44 72 L52 80 L56 76 C58 77 60 78 62 78 C64 78 66 77 68 76 L72 80 L80 72 L74 68 C75 66 76 64 76 62 C76 60 75 58 74 56Z"
          fill={c.mid} stroke={c.stroke} strokeWidth="2"
        />
        {/* Center hole */}
        <circle cx="62" cy="62" r="10" fill={c.bg} stroke={c.stroke} strokeWidth="2" />
        {/* Sparkle top-right */}
        <path d="M90 34 L92 28 L94 34 L100 36 L94 38 L92 44 L90 38 L84 36Z"
          fill={c.yellow} opacity="0.8" />
      </>
    );
  },

  'help': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Speech bubble */}
        <path d="M24 34 L100 34 L100 80 L72 80 L62 96 L52 80 L24 80Z"
          fill={c.mid} stroke={c.stroke} strokeWidth="2" />
        {/* Question mark stem curve */}
        <path d="M54 52 C54 44 62 40 70 44 C78 48 76 58 68 62 L62 66"
          stroke={c.dim} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Question mark dot */}
        <circle cx="62" cy="72" r="3.5" fill={c.dim} />
      </>
    );
  },

  'favorites': (dark) => {
    const c = pal(dark);
    return (
      <>
        <circle cx="62" cy="62" r="62" fill={c.bg} />
        {/* Large central star */}
        <path d="M62 32 L67 50 L86 50 L71 61 L77 80 L62 69 L47 80 L53 61 L38 50 L57 50Z"
          fill={c.yellow} opacity="0.9" />
        {/* Small star top-right */}
        <path d="M90 38 L92 32 L94 38 L100 40 L94 42 L92 48 L90 42 L84 40Z"
          fill={c.yellow} opacity="0.5" />
        {/* Small star bottom-left */}
        <path d="M28 72 L29.5 67 L31 72 L36 73.5 L31 75 L29.5 80 L28 75 L23 73.5Z"
          fill={c.yellow} opacity="0.35" />
        {/* Heart at bottom */}
        <path d="M62 92 C57 87 47 83 47 76 C47 71 52 68 56 71 C58.5 72.5 61 75 62 77 C63 75 65.5 72.5 68 71 C72 68 77 71 77 76 C77 83 67 87 62 92Z"
          fill={c.red} opacity="0.65" />
      </>
    );
  },
};

// Illustration metadata
const illustrationData = [
  { name: 'no-notifications',   label: 'No Notifications',   description: 'Nothing to notify about right now',     category: 'Empty States' },
  { name: 'no-tasks',           label: 'No Tasks',           description: 'Your task list is empty',               category: 'Empty States' },
  { name: 'no-slides',          label: 'No Slides',          description: 'No presentation slides yet',            category: 'Empty States' },
  { name: 'no-results-found',   label: 'No Results Found',   description: 'Search returned no matches',            category: 'Empty States' },
  { name: 'no-report',          label: 'No Report',          description: 'No report data available',              category: 'Empty States' },
  { name: 'no-post',            label: 'No Post',            description: 'No posts created yet',                  category: 'Empty States' },
  { name: 'no-form-configured', label: 'No Form Configured', description: 'This form has not been set up',         category: 'Empty States' },
  { name: 'no-filters-found',   label: 'No Filters Found',   description: 'No filters match your search',          category: 'Empty States' },
  { name: 'no-filter-results',  label: 'No Filter Results',  description: 'Active filters return no results',      category: 'Empty States' },
  { name: 'favorites',          label: 'Favorites',          description: 'No favorites added yet',                category: 'Empty States' },
  { name: 'server-error',       label: 'Server Error',       description: 'Something went wrong on the server',    category: 'Error States' },
  { name: 'restricted-access',  label: 'Restricted Access',  description: "You don't have permission to view this", category: 'Error States' },
  { name: 'settings',           label: 'Settings',           description: 'Configuration and settings overview',   category: 'System & Help' },
  { name: 'help',               label: 'Help',               description: 'Help center and support resources',     category: 'System & Help' },
];

const CATEGORIES = ['Empty States', 'Error States', 'System & Help'];

function IllustrationTile({ illus, darkMode, size }) {
  const [copied, setCopied] = useState(false);
  const px = SIZES[size];
  const sceneFn = scenes[illus.name];

  const handleCopy = () => {
    navigator.clipboard?.writeText(`o9illus-${illus.name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      title={`o9illus-${illus.name}`}
      className="group flex flex-col items-center gap-3 border border-border p-4 hover:border-white hover:bg-surface-overlay transition-colors"
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 124 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {sceneFn ? sceneFn(darkMode) : (
          <circle cx="62" cy="62" r="62" fill={pal(darkMode).bg} />
        )}
      </svg>

      <div className="text-center w-full">
        <p className={`text-[9px] font-mono truncate w-full transition-colors ${copied ? 'text-green-400' : 'text-text-tertiary group-hover:text-text-secondary'}`}>
          {copied ? 'copied!' : `o9illus-${illus.name}`}
        </p>
        <p className="text-[10px] text-text-secondary mt-0.5 truncate">{illus.label}</p>
      </div>
    </button>
  );
}

export default function IllustrationsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [size, setSize] = useState('md');
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? illustrationData.filter(
        (i) =>
          i.name.includes(query.toLowerCase()) ||
          i.label.toLowerCase().includes(query.toLowerCase()) ||
          i.description.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  return (
    <article>
      <PageHeader
        title="Illustrations"
        description="The o9illus library provides contextual illustrations for empty states, error pages, onboarding, and system states. Every illustration ships in light and dark variants across three sizes."
        status="beta"
        category="Foundation"
      />

      {/* Controls */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search illustrations…"
            className="w-full border border-border bg-surface-sunken px-4 py-2.5 text-sm text-text outline-none placeholder:text-text-disabled focus:border-white transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-white"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          )}
        </div>

        {/* Dark / Light toggle */}
        <div className="flex border border-border">
          <button
            onClick={() => setDarkMode(true)}
            className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${darkMode ? 'bg-white text-black' : 'text-text-secondary hover:text-white'}`}
          >
            Dark
          </button>
          <button
            onClick={() => setDarkMode(false)}
            className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${!darkMode ? 'bg-white text-black' : 'text-text-secondary hover:text-white'}`}
          >
            Light
          </button>
        </div>

        {/* Size toggle */}
        <div className="flex border border-border">
          {[['sm', 'S — 96px'], ['md', 'M — 124px'], ['lg', 'L — 224px']].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSize(key)}
              className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${size === key ? 'bg-white text-black' : 'text-text-secondary hover:text-white'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Search results */}
      {filtered && (
        <section className="mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-text-tertiary mb-4 border-b border-border pb-2">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {filtered.map((illus) => (
              <IllustrationTile key={illus.name} illus={illus} darkMode={darkMode} size={size} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="border border-border p-10 text-center text-sm text-text-tertiary">
              No illustrations found for &quot;{query}&quot;
            </div>
          )}
        </section>
      )}

      {/* Category grids */}
      {!filtered &&
        CATEGORIES.map((cat) => {
          const items = illustrationData.filter((i) => i.category === cat);
          return (
            <section key={cat} className="mb-12">
              <h2
                id={cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                className="mb-4 text-xs font-bold tracking-widest uppercase text-text-tertiary border-b border-border pb-2"
              >
                {cat}
                <span className="ml-2 font-normal opacity-50">({items.length})</span>
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {items.map((illus) => (
                  <IllustrationTile key={illus.name} illus={illus} darkMode={darkMode} size={size} />
                ))}
              </div>
            </section>
          );
        })}

      {/* ── Illustration Size Tokens ─────────────────────────────────── */}
      <section className="mb-12">
        <h2 id="illustration-size-tokens" className="text-xl font-black tracking-tight text-text mb-1 uppercase">
          Illustration Size Tokens
        </h2>
        <p className="text-sm text-text-secondary mb-6">
          Three size stops for the o9illus library, always square aspect ratio. Token prefix{' '}
          <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">o9ds-illus-</code>{' '}
          distinguishes these from icon tokens. Base font/root size = 16px.
        </p>

        {/* Visual size demo */}
        <div className="flex flex-wrap items-end gap-8 p-5 mb-5 bg-surface-raised border border-border">
          {[
            { token: 'o9ds-illus-96',  px: 96,  label: 'sm', isMed: false },
            { token: 'o9ds-illus-124', px: 124, label: 'md', isMed: true  },
            { token: 'o9ds-illus-224', px: 224, label: 'lg', isMed: false },
          ].map(({ token, px, label, isMed }) => (
            <div key={token} className="flex flex-col items-center gap-2">
              <svg
                width={px / 2} height={px / 2}
                viewBox="0 0 124 124" fill="none"
                className={isMed ? 'text-primary' : 'text-text-secondary'}
              >
                <circle cx="62" cy="62" r="62" fill="currentColor" opacity="0.08" />
                <circle cx="62" cy="62" r="62" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                <rect x="32" y="42" width="60" height="40" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
                <circle cx="44" cy="54" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
                <path d="M32 70l14-10 10 8 12-12 12 14" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5" />
              </svg>
              <span className={`font-mono text-[10px] ${isMed ? 'text-primary' : 'text-text-tertiary'}`}>
                {px}px
              </span>
              <span className={`text-[9px] uppercase tracking-wide ${isMed ? 'text-primary' : 'text-text-tertiary'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Token table */}
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface-raised border-b border-border">
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Token</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-20">Size key</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-20">px</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-24">rem</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-36">Tailwind</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Use Case</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'o9ds-illus-96',  cssVar: '--o9ds-illus-96',  sizeKey: 'sm', px: '96px',  rem: '6rem',    tw: 'size-illus-96',  use: 'Compact slot — card thumbnail, tooltip art' },
                { name: 'o9ds-illus-124', cssVar: '--o9ds-illus-124', sizeKey: 'md', px: '124px', rem: '7.75rem', tw: 'size-illus-124', use: 'Standard — card body, section callout', isMed: true },
                { name: 'o9ds-illus-224', cssVar: '--o9ds-illus-224', sizeKey: 'lg', px: '224px', rem: '14rem',   tw: 'size-illus-224', use: 'Hero — empty state, onboarding feature' },
              ].map((row, i) => (
                <tr key={row.name} className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-surface-raised/30'}`}>
                  <td className="px-4 py-3 align-middle">
                    <span className="font-mono text-xs text-text">{row.name}</span>
                    <span className="block font-mono text-xs text-text-tertiary mt-0.5">{row.cssVar}</span>
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <code className="font-mono text-xs px-1.5 py-0.5 bg-surface-overlay border border-border text-text">{row.sizeKey}</code>
                    {row.isMed && <span className="ml-1.5 text-[9px] px-1 py-0.5 bg-primary text-on-primary uppercase tracking-wide">default</span>}
                  </td>
                  <td className="px-4 py-3 align-middle"><code className="font-mono text-xs text-text">{row.px}</code></td>
                  <td className="px-4 py-3 align-middle"><code className="font-mono text-xs text-text">{row.rem}</code></td>
                  <td className="px-4 py-3 align-middle">
                    <code className="font-mono text-xs px-1.5 py-0.5 bg-surface-overlay border border-border text-text">{row.tw}</code>
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-text-secondary leading-relaxed">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Naming Convention */}
      <section className="mb-12">
        <h2 id="naming" className="text-xl font-black tracking-tight text-text mb-4 uppercase">
          Naming Convention
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          All illustrations follow the{' '}
          <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">
            o9illus-[description]
          </code>{' '}
          pattern. Multi-word descriptions use hyphens. Click any tile to copy the illustration token name.
        </p>
        <CodeBlock
          code={`// Illustration naming examples
o9illus-no-notifications     // Empty state — no alerts
o9illus-no-results-found     // Search returned nothing
o9illus-no-form-configured   // Setup required
o9illus-server-error         // 500 / internal error
o9illus-restricted-access    // 403 / forbidden
o9illus-help                 // Help center entry`}
          language="javascript"
        />
      </section>

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-4 uppercase">
          Usage
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Illustrations ship as named React components accepting{' '}
          <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">size</code> and{' '}
          <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">darkMode</code> props.
          Use them in empty state layouts, error boundaries, and onboarding flows.
        </p>
        <CodeBlock
          code={`import { NoNotifications } from '@o9ds/illustrations';

function EmptyFeed() {
  return (
    <div className="flex flex-col items-center gap-4 py-20">
      <NoNotifications size="md" darkMode />
      <h3 className="text-lg font-semibold">All caught up</h3>
      <p className="text-text-secondary text-sm">
        No notifications right now. Check back later.
      </p>
    </div>
  );
}`}
        />
      </section>

      {/* Props table */}
      <section className="mb-12">
        <h2 id="props" className="text-xl font-black tracking-tight text-text mb-4 uppercase">
          Props
        </h2>
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-raised">
                {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase text-text-tertiary">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3"><code className="text-xs border border-border bg-surface-overlay px-1.5 py-0.5 text-white">size</code></td>
                <td className="px-4 py-3 text-text-secondary font-mono text-xs">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</td>
                <td className="px-4 py-3 text-text-tertiary font-mono text-xs">&apos;md&apos;</td>
                <td className="px-4 py-3 text-text-secondary text-xs">sm = 96px · md = 124px (default) · lg = 224px. All within circular frame.</td>
              </tr>
              <tr>
                <td className="px-4 py-3"><code className="text-xs border border-border bg-surface-overlay px-1.5 py-0.5 text-white">darkMode</code></td>
                <td className="px-4 py-3 text-text-secondary font-mono text-xs">boolean</td>
                <td className="px-4 py-3 text-text-tertiary font-mono text-xs">false</td>
                <td className="px-4 py-3 text-text-secondary text-xs">Switches to dark variant. Scene bg changes from #F2F2F2 to #1E1E1E.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
