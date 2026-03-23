import { useState, useMemo } from 'react';
import PageHeader from '@/docs/components/PageHeader';
import CodeBlock from '@/docs/components/CodeBlock';
import Slider from '@/components/inputs/Slider';

// ─── Load all o9con SVG icon files as URL strings ───────────────────────────
// Note: import.meta.glob does not support @ alias — use relative path from this file
// or the absolute path from Vite root (/src/...).
const _svgUrls = import.meta.glob(
  '/src/assets/icons/*.svg',
  { eager: true, query: '?url', import: 'default' }
);

// Build name → URL map  (strip leading path and o9con- prefix)
// Vite's ?url import returns percent-encoded data URIs in dev mode
// (e.g.  data:image/svg+xml,%3csvg …).  CSS mask-image silently rejects
// that encoding in most browsers, so we convert to base64 data URIs
// which are universally supported for mask-image.
const ICON_URLS = {};
for (const [path, url] of Object.entries(_svgUrls)) {
  const match = path.match(/\/o9con-(.+)\.svg$/);
  if (match) {
    if (url.startsWith('data:image/svg+xml,')) {
      try {
        const svgText = decodeURIComponent(url.slice('data:image/svg+xml,'.length));
        ICON_URLS[match[1]] = 'data:image/svg+xml;base64,' + btoa(svgText);
      } catch {
        ICON_URLS[match[1]] = url; // fallback — use original
      }
    } else {
      ICON_URLS[match[1]] = url;
    }
  }
}

const ALL_ICONS = Object.keys(ICON_URLS).sort();

// ─── Category definitions ────────────────────────────────────────────────────
// Icons appear in the FIRST matching category; anything unmatched → Misc.
const CATEGORY_DEFS = [
  {
    id: 'arrows',
    label: 'Arrows & Directions',
    description: 'Directional arrows, chevrons, carets, angles, and navigation pointers.',
    icons: [
      'angle-double-down','angle-double-left','angle-double-right','angle-double-up',
      'angle-down','angle-left','angle-right','angle-up',
      'arrow-circle-down','arrow-circle-left','arrow-circle-o-down','arrow-circle-o-left',
      'arrow-circle-o-right','arrow-circle-o-up','arrow-circle-right','arrow-circle-up',
      'arrow-down','arrow-left','arrow-left-down','arrow-left-up',
      'arrow-right','arrow-right-down','arrow-right-up','arrow-up',
      'arrows','arrows-alt','arrows-alt-o','arrows-h','arrows-o','arrows-v',
      'caret-collapse-all','caret-collapsed','caret-down','caret-down-outline',
      'caret-expand-all','caret-expanded','caret-left','caret-left-outline',
      'caret-right','caret-right-outline','caret-scroll-h','caret-scroll-v',
      'caret-square-o-down','caret-square-o-left','caret-square-o-right','caret-square-o-up',
      'caret-unfold-h','caret-unfold-v','caret-up','caret-up-outline',
      'chevron','chevron-circle-down','chevron-circle-left','chevron-circle-right',
      'chevron-circle-up','chevron-down','chevron-left','chevron-right','chevron-up',
      'left-right','level-down','level-up','location-arrow',
      'long-arrow-down','long-arrow-left','long-arrow-right','long-arrow-up',
      'swipe-right','up-down',
      'turn-down-left','turn-down-right','turn-left-down','turn-left-up',
      'turn-right-down','turn-right-up','turn-up-left','turn-up-right',
    ],
  },
  {
    id: 'actions',
    label: 'Actions & Operations',
    description: 'Core user actions — create, edit, delete, copy, search, filter, sort, and more.',
    icons: [
      'add-attachment','add-book','add-data-node','add-favorite','add-pipeline',
      'add-presentation','add-textbox','add-view',
      'advance-filter','advance-filter-filled',
      'archive','archive-alt','bin','bin-alt','bulk-edit',
      'change-orientation-horizontal','change-orientation-vertical',
      'clear','close','cloud-download','cloud-upload',
      'collapse-down','collapse-up',
      'compress','compress-alt','copy','crop','cut',
      'dash','dedent','delist','download','drag-handle','duplicate',
      'edit-cell','edit-column','edit-properties','edit-row',
      'eraser','exchange','exclude','execute','execute-api',
      'expand','expand-alt','expand-group','expand-nodes','export',
      'favorite-download','fetch',
      'filter','filter-bold','filter-check','filter-ext','filter-filled-o',
      'filter-lock','filter-remove','filter-template-filled','filter-template-filled-1',
      'filter-template-outline','filter-template-outline-1','filled-filter','find-replace',
      'folder-add','folder-add-alt','generate','grid-filter',
      'hide-trace','indent','insert','insert-circle','insert-square',
      'lock-filter','magic','measure-filter','merge-git','merge-up',
      'minus','minus-circle','minus-circle-o','minus-plus','minus-square','minus-square-o',
      'move-to-right','no-edit',
      'object-group','object-ungroup','omni-direction-alt','open-new','open-same','output-alt',
      'pencil','pencil-square','pencil-square-o','pivot',
      'plus','plus-circle','plus-circle-o','plus-filled','plus-minus','plus-minus-alt',
      'plus-square','plus-square-o','populate','print-configuration',
      'publish','publish-in','pull-data','push-data','push-pin','push-pinned',
      're-run','recycle','refresh','regenerate','rename',
      'repeat','repeat-all','repeat-alt','repeat-one','repeat-one-alt',
      'reset-to-factory-settings','respread','respread-alt',
      'retweet','retweet-alt',
      'rotate-90','rotate-left','rotate-right',
      'save-as','search','search-airflow','search-logs','search-task',
      'select-all','select-area','select-check','setting-edit',
      'share','share-all-filled','share-alt','share-alt-filled','share-alt-square',
      'share-circle','share-square','share-square-o',
      'shuffle','sign-in','sign-out','sliders','split-up','switch',
      'sort-12-up','sort-21-up','sort-alpha-asc','sort-alpha-desc',
      'sort-amount-asc','sort-amount-desc','sort-asc-up','sort-az-up',
      'sort-dsc-up','sort-numeric-asc','sort-numeric-desc','sort-za-up',
      'terminate-execution','transform','unfreeze','unlink','untagged','upload',
      'wrench','zoom-in','zoom-out',
    ],
  },
  {
    id: 'charts',
    label: 'Charts & Analytics',
    description: 'All chart types, KPI visualizations, and data analytics icons.',
    icons: [
      'area-chart','area-chart-alt','area-chart-xy',
      'bar-chart','bar-chart-h','bar-chart-o','bar-chart-v',
      'bell-curve','bubble-chart','chart-progress',
      'combo-chart','combo-chart-alt',
      'dashboard','dashboard-alt','deviation','doughnut-chart',
      'falling','gauge-chart','heatmap',
      'lead-time','line-chart','line-chart-alt','loss',
      'lower-limit','maslow-pyramid','max-val','min-val',
      'multibar-chart','normal-distribution','performance-monitor',
      'pie-chart','pie-chart-alt','profit','profit-flag',
      'rising','scatter-plot','stacked-bar-h','stacked-bar-v',
      'trend-down','trend-up','upper-limit','waterfall-chart',
    ],
  },
  {
    id: 'communication',
    label: 'Communication',
    description: 'Email, messaging, calls, notifications, and audio/volume controls.',
    icons: [
      'at','bell-o','bell-slash','bullhorn',
      'call','call-alt','missed-call','no-call',
      'comment','comment-add','comment-add-alt','comment-check','comment-copy',
      'comment-cross','comment-empty','comment-help','comment-help-alt',
      'comment-line','comment-new','comment-o','comment-quote','comment-text',
      'commenting','commenting-alt','commenting-o',
      'comments','comments-alt','comments-o',
      'envelope','envelope-o','envelope-open-o','envelope-square',
      'fax','headphones','inbox',
      'mail-new','mail-o9','mail-reply','mail-reply-all','mail-write',
      'microphone','microphone-slash','mute','no-video','notification',
      'paper-plane','paper-plane-filled','paper-plane-land','paper-plane-o','paper-plane-send',
      'paperclip','phone-book','phone-square',
      'rss','rss-square','signal','signal-alt',
      'support-ticket','survey','voicemode','volume-control-phone',
      'volume-down','volume-high','volume-low','volume-mid','volume-mute','volume-up',
      'wifi',
    ],
  },
  {
    id: 'data',
    label: 'Data & Engineering',
    description: 'Databases, pipelines, cloud services, data formats, and engineering tools.',
    icons: [
      'avro','azure-blobstore','big-query','big-query-ds',
      'blockchain','client-side','code','code-editor','code-fork',
      'compare-git','conditonal-transformer','config-block','csv',
      'cube','cube-node','cubes',
      'data-management','database','database-admin','database-alt',
      'database-encryption','database-protection','database-search',
      'deltalake-node','deltalake-share','deltalake-write',
      'ELK','event-flow','event-hub',
      'flow-chart','gcp-gcs','hive','hive-sql',
      'interval-partitioned-dimension',
      'jhub','join','json','kafka','kafka-alt','logical-group',
      'measure-alias','measure-tools',
      'parquet','pipeline','pipeline-alt','pipeline-group',
      'process','pull-request','pyspark','python','python-filled',
      'redshift','sftp',
      'snowflake','snowflake-ds','spark-cluster','spark-sql','sql',
      'stack','staging-api','terminal','tree-structure',
      'webhook','webhook-o',
    ],
  },
  {
    id: 'files',
    label: 'Files & Documents',
    description: 'Files, folders, books, spreadsheets, and document types.',
    icons: [
      'book','book-download','book-excel','book-help','book-x',
      'clipboard','excel',
      'file','file-add','file-archive-o','file-bookmark','file-cabinet',
      'file-code-o','file-excel-o','file-favorite','file-image-o','file-music-o',
      'file-o','file-pdf-o','file-powerpoint-o','file-script','file-setting',
      'file-stats','file-text-o','file-video-o','file-word-o',
      'files','files-copy','files-o',
      'floppy-o','folder','folder-open',
      'page','page-break','page-number','pagegroup',
      'pdf-download','presentation',
    ],
  },
  {
    id: 'media',
    label: 'Media & Playback',
    description: 'Video/audio player controls, recording, streaming, and media content.',
    icons: [
      'backward','eject','eject-circle','eject-square',
      'fast-backward','fast-forward','fast-forward-circle','fast-forward-square',
      'film','forward',
      'music','next','next-circle','next-square',
      'pause','pause-circle','pause-square',
      'play','play-circle','play-circle-fill-1','play-square',
      'prev','prev-circle','prev-square',
      'record','record-circle','record-square',
      'resume','resume-circle','resume-square',
      'rewind-circle','rewind-square','speaker',
      'stop','stop-circle','stop-square',
      'video','video-rec',
    ],
  },
  {
    id: 'navigation',
    label: 'Navigation & Layout',
    description: 'Application layout, nav structure, panels, grids, trees, and window controls.',
    icons: [
      'apps','bars','carousel','carousel-alt',
      'circle-o-notch','collapse-group','column-header','columns',
      'contextual-help',
      'ellipsis-h','ellipsis-v',
      'expand-group','expand-nodes',
      'external-link','external-link-square',
      'focus-center','focus-center-alt','focus-lock',
      'full-screen','full-screen-alt','full-screen-exit',
      'grid','grid-alt',
      'h-square','hashtag','hashtag-alt','header',
      'home','home-alt','i-cursor',
      'layout','left-pane-o',
      'list','list-alt','list-ol','list-ul',
      'monitor-view',
      'network-collapse','network-expand','network-node','network-nodes',
      'pane','right-pane-o',
      'show-view','shrink-corners','shrink-nodes',
      'table','table-column','table-row',
      'th-large','th-list','tile-layout',
      'toggle-off','toggle-on',
      'tree-view','tree-view-reverse',
      'window-close','window-maximize','window-minimize','window-restore',
    ],
  },
  {
    id: 'people',
    label: 'People & Users',
    description: 'User profiles, groups, personas, gestures, and human interaction.',
    icons: [
      'address-book','address-card',
      'child','child-alt','designer','diversity',
      'doctor-female','doctor-male','drivers-license',
      'female','female-alt','female-o',
      'group','groups',
      'hand-clap','hand-lizard-o','hand-o-down','hand-o-left','hand-o-right',
      'hand-o-up','hand-paper-o','hand-peace-o','hand-pointer-o',
      'hand-rock-o','hand-scissors-o','hand-spock-o','handshake-o',
      'id-badge','id-card',
      'male','male-alt','male-o','member-specific-attribute','mouse-pointer',
      'rotate-user','street-view',
      'user','user-edit','user-management','user-plus',
      'user-setting','user-times','users-alt',
    ],
  },
  {
    id: 'status',
    label: 'Status & Feedback',
    description: 'State indicators — success, error, warning, progress, ratings, and sentiment.',
    icons: [
      'asterisk','asterisk-alt','asterisk-o',
      'ban','blocker-action','blocker-action-alt','blocker-action-filled','blocker-action-filled-alt',
      'certificate','check','check-circle','check-circle-o',
      'check-square','check-square-o','check-square-o-alt',
      'circle-o-notch',
      'crown','cross-filled',
      'dot-circle-o',
      'error','error-alt',
      'exclamation','exclamation-circle','exclamation-circle-filled',
      'exclamation-triangle','exclamation-triangle-filled',
      'flag','flag-checkered','flag-edge','flag-o','flag-triangle',
      'frown',
      'info','info-circle','info-circle-filled',
      'meh','not-started','nullify','on-hold','online',
      'partial-completed','pending','priority-edge','progress',
      'question','question-circle','radio-checked','resolved',
      'smile','spinner','star','star-half-o','star-o','states',
      'thumbs-down','thumbs-down-filled','thumbs-up','thumbs-up-filled',
      'ticket','ticket-add',
      'times-circle','times-circle-o','times-square','times-square-o',
      'trophy',
    ],
  },
  {
    id: 'calendar',
    label: 'Calendar & Time',
    description: 'Dates, scheduling, clocks, timelines, and time-based controls.',
    icons: [
      'calendar','calendar-check-o','calendar-date','calendar-date-selected',
      'calendar-end','calendar-end-alt','calendar-minus-o','calendar-o',
      'calendar-plus-o','calendar-progress','calendar-range','calendar-start',
      'calendar-times-o','calendar-warning','calendar-warning-alt',
      'clock-o','datetime','hourglass','hourglass-end','hourglass-o','hourglass-start',
      'stop-watch','timeline','timeline-h','timeline-v',
    ],
  },
  {
    id: 'security',
    label: 'Security & Access',
    description: 'Authentication, encryption, locks, keys, and access control.',
    icons: [
      'database-encryption','database-protection','encrypted','external-tenant',
      'key','key-alt',
      'lock','lock-alt','lock-filled','lock-hole','lock-open','lock-open-alt','lock-open-two',
      'shield','unlock-full','unlocked-filled','user-secret',
    ],
  },
  {
    id: 'devices',
    label: 'Devices & Technology',
    description: 'Hardware, screens, phones, peripherals, and connectivity.',
    icons: [
      '3d-model','antenna','barcode',
      'battery','battery-empty','battery-half','battery-quarter','battery-three-quarters',
      'bluetooth','bluetooth-b',
      'camera','camera-retro','cellular-network',
      'desktop','desktop-alt','desktop-cloud','desktop-cog','desktop-cog-add','desktop-heart',
      'edge','edge-alt',
      'gamepad','hdd-o','keyboard-o','laptop','microchip',
      'mobile','mobile-alt','monitor','power-off','printer',
      'qrcode','tablet','telephone','usb','video-camera',
    ],
  },
  {
    id: 'commerce',
    label: 'Commerce & Finance',
    description: 'Shopping, payments, currencies, delivery, and financial operations.',
    icons: [
      'add-to-bag-filled','add-to-bag-outline',
      'balance-scale','bank','btc','cart-arrow-down','cart-plus',
      'cc','cc-o','clear-bag','cny','credit-card','credit-card-alt',
      'delivery','delivery-store',
      'dollar','eur','gbp','ils','inr','krw',
      'money','open-parcel','packing',
      'rub','shopping-bag','shopping-basket','shopping-cart',
      'shopping-goods','shopping-location',
      'store','store-cart','supplier','supply',
      'try','unpacking','viacoin','warehouse',
    ],
  },
  {
    id: 'transport',
    label: 'Transportation',
    description: 'Vehicles, transit modes, shipping, and logistics.',
    icons: [
      'airport-tower','ambulance','anchor','automobile',
      'bicycle','bus','cab','delivery-truck',
      'fighter-jet','motorcycle','plane','road',
      'ship','shipment-tracker','space-shuttle',
      'subway','taxi','train','truck',
    ],
  },
  {
    id: 'geography',
    label: 'Geography & Maps',
    description: 'Maps, locations, markers, and geographic navigation.',
    icons: [
      'compass','geo-marker','geo-marker-o','globe',
      'map','map-marker','map-pin','map-signs',
    ],
  },
  {
    id: 'typography',
    label: 'Typography & Design',
    description: 'Text formatting, alignment, type tools, color, and visual design utilities.',
    icons: [
      'adjust','align-center','align-justify','align-left','align-right',
      'alphabet-p','alphabet-p-filled','alphabet-s','alphabet-s-filled',
      'background-color','bold','color','crop',
      'decrease-font','drawing-compass','eyedropper',
      'font','font-color',
      'header','height','increase-font','italic','length',
      'marker-dashedline','marker-dottedline','marker-solidline','marker-splitline',
      'paint-brush','paragraph','quote-left','quote-right',
      'ruler','size','strikethrough','subscript','superscript',
      'text','text-height','text-width','tint','underline','width',
    ],
  },
  {
    id: 'shapes',
    label: 'Shapes',
    description: 'Geometric primitives and basic form elements.',
    icons: [
      'basicshape-circle','basicshape-hexagon','basicshape-pentagon',
      'basicshape-rhombus','basicshape-square','basicshape-triangle',
      'circle','circle-filled','circle-o','circle-outline','circle-shape','circle-thin',
      'diamond','diamond-filled','diamond-outline','diamond-shape',
      'hexagon-shape','left-angled-triangle','right-angled-triangle',
      'semi-circle',
      'square','square-filled','square-o','square-outline','square-square-o',
      'triangle-shape',
    ],
  },
  {
    id: 'ai',
    label: 'AI & Intelligence',
    description: 'Artificial intelligence, generative AI, and smart feature indicators.',
    icons: [
      'genai','genai-filled','lightbulb-glow','sparkle',
    ],
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    description: 'Inclusive design and assistive technology icons.',
    icons: [
      'american-sign-language-interpreting','assistive-listening-systems',
      'blind','braille','deaf','low-vision',
      'universal-access','wheelchair','wheelchair-alt',
    ],
  },
  {
    id: 'platform',
    label: 'Platform & System',
    description: 'o9 platform operations, tenant management, system config, and app infrastructure.',
    icons: [
      'cog','cogs','components',
      'control-room','control-tower',
      'create-scene','create-tag','create-task',
      'desktop-cog','desktop-cog-add',
      'factory-setting','hierarchy','history',
      'inline-form','input-alt',
      'master-planner','material-planner','mind-map',
      'non-cyclic','o9-circle','o9-logo',
      'old','play-presentation','plug',
      'puzzle-piece','report-config',
      'scenario','solution',
      'tasks','template',
      'tenant','tenant-active','tenant-backup','tenant-inactive','tenant-operation','tenant-restore',
      'tools','triageroom',
      'view-favorites','view-report','view-trace',
    ],
  },
  {
    id: 'brands',
    label: 'Brands & Social',
    description: 'Social platform and brand logo icons.',
    icons: [
      'bandcamp','empire','gg','gg-circle',
      'slack','stack-exchange','stack-overflow','superpowers',
    ],
  },
];

// ─── Build final category list (filter to existing icons) ───────────────────
const _assigned = new Set();
CATEGORY_DEFS.forEach(cat => cat.icons.forEach(n => _assigned.add(n)));
const _unassigned = ALL_ICONS.filter(n => !_assigned.has(n)).sort();

const CATEGORIES = [
  ...CATEGORY_DEFS.map(cat => ({
    ...cat,
    icons: cat.icons.filter(n => ICON_URLS[n]),
  })).filter(cat => cat.icons.length > 0),
  ...(_unassigned.length > 0
    ? [{ id: 'misc', label: 'Miscellaneous', description: 'Additional utility, object, and symbol icons.', icons: _unassigned }]
    : []),
];

// ─── Size stops (matching o9con token system from icons.css) ─────────────────
const SIZE_STOPS = [16, 20, 24, 32, 40, 48, 56, 64, 72, 80];

// ─── IconTile ────────────────────────────────────────────────────────────────
// Uses CSS mask-image so icons inherit currentColor from semantic text tokens.
// Dark mode: text-text-secondary = #E5E5E5 (secondary white)
// Light mode: text-text-secondary = #303030 (secondary black)
function IconTile({ name, copied, onCopy, size = 20 }) {
  const url = ICON_URLS[name];
  if (!url) return null;
  const isCopied = copied === name;
  return (
    <button
      onClick={() => onCopy(name)}
      title={`Click to copy: o9con-${name}`}
      className={`group flex flex-col items-center gap-2 border border-border p-3 hover:border-white hover:bg-surface-overlay transition-colors cursor-pointer ${
        isCopied ? 'text-success' : 'text-text-secondary hover:text-text'
      }`}
    >
      <span
        aria-hidden="true"
        style={{
          display: 'block',
          width: size,
          height: size,
          backgroundColor: 'currentColor',
          maskImage: `url(${url})`,
          WebkitMaskImage: `url(${url})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />
      <span className={`text-[9px] font-mono truncate w-full text-center leading-tight transition-colors ${
        isCopied ? 'text-success' : 'text-text-tertiary group-hover:text-text-secondary'
      }`}>
        {isCopied ? 'copied!' : name}
      </span>
    </button>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function IconsPage() {
  const [query, setQuery]           = useState('');
  const [activeCat, setActiveCat]   = useState('all');
  const [copied, setCopied]         = useState(null);
  const [iconSize, setIconSize]     = useState(20);

  const handleCopy = (name) => {
    navigator.clipboard?.writeText(`o9con-${name}`);
    setCopied(name);
    setTimeout(() => setCopied(null), 1500);
  };

  const filteredIcons = useMemo(() => {
    let icons = activeCat === 'all'
      ? ALL_ICONS
      : (CATEGORIES.find(c => c.id === activeCat)?.icons ?? []);
    if (query.trim()) {
      const q = query.toLowerCase();
      icons = icons.filter(n => n.toLowerCase().includes(q));
    }
    return icons;
  }, [query, activeCat]);

  const isFiltered = query.trim() !== '' || activeCat !== 'all';

  return (
    <article>
      <PageHeader
        title="Icons"
        description="The o9con icon library — 1000+ SVG icons for the o9 platform. Click any icon to copy its name to the clipboard."
        category="Foundation"
      />

      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-8 text-sm text-text-secondary">
        <span><strong className="text-text font-semibold">{ALL_ICONS.length}</strong> icons</span>
        <span className="text-border">·</span>
        <span><strong className="text-text font-semibold">{CATEGORIES.length}</strong> categories</span>
        <span className="text-border">·</span>
        <span>Prefix: <code className="text-xs border border-border bg-surface-overlay px-1.5 py-0.5 text-text">o9con-*</code></span>
        <span className="text-border">·</span>
        <span>Default size: <code className="text-xs border border-border bg-surface-overlay px-1.5 py-0.5 text-text">20px</code></span>
      </div>

      {/* ── Search & Category Filter ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Search input */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled pointer-events-none"
            width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <circle cx="7" cy="7" r="4.5" /><path d="M11 11l2.5 2.5" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search 1000+ icons…"
            className="w-full border border-border bg-surface-sunken pl-9 pr-9 py-2.5 text-sm text-text outline-none placeholder:text-text-disabled focus:border-white transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-white"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M2 2l8 8M10 2L2 10" />
              </svg>
            </button>
          )}
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCat('all')}
            className={`px-2.5 py-1 text-xs border transition-colors ${
              activeCat === 'all'
                ? 'border-white bg-surface-overlay text-text'
                : 'border-border text-text-tertiary hover:border-border-hover hover:text-text-secondary'
            }`}
          >
            All <span className="ml-1 opacity-60">{ALL_ICONS.length}</span>
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-2.5 py-1 text-xs border transition-colors ${
                activeCat === cat.id
                  ? 'border-white bg-surface-overlay text-text'
                  : 'border-border text-text-tertiary hover:border-border-hover hover:text-text-secondary'
              }`}
            >
              {cat.label} <span className="ml-1 opacity-60">{cat.icons.length}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Icon Size Control ─────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-8 px-4 py-3 border border-border bg-surface-raised">
        <span className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary shrink-0">Size</span>
        <Slider
          size="sm"
          min={0}
          max={SIZE_STOPS.length - 1}
          step={1}
          value={SIZE_STOPS.indexOf(iconSize)}
          onChange={e => setIconSize(SIZE_STOPS[Number(e.target.value)])}
          showButtons={false}
          tooltipFormat={(i) => `${SIZE_STOPS[i]}px`}
          className="flex-1"
        />
        <code className="text-xs font-mono text-text tabular-nums shrink-0 border border-border bg-surface-overlay px-2 py-1">
          o9con-{iconSize} · {iconSize}px
        </code>
        {iconSize !== 20 && (
          <button
            onClick={() => setIconSize(20)}
            className="text-[10px] text-text-tertiary hover:text-text transition-colors shrink-0"
            title="Reset to default (20px)"
          >
            Reset
          </button>
        )}
      </div>

      {/* ── Icon Grid (filtered / search) ───────────────────────────────── */}
      {isFiltered ? (
        <section className="mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-text-tertiary mb-4">
            {filteredIcons.length} icon{filteredIcons.length !== 1 ? 's' : ''}
            {query ? ` matching "${query}"` : ''}
            {activeCat !== 'all' ? ` in ${CATEGORIES.find(c => c.id === activeCat)?.label}` : ''}
          </p>
          {filteredIcons.length > 0 ? (
            <div
              className="gap-1.5"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(80, iconSize + 32)}px, 1fr))`,
              }}
            >
              {filteredIcons.map(name => (
                <IconTile key={name} name={name} copied={copied} onCopy={handleCopy} size={iconSize} />
              ))}
            </div>
          ) : (
            <div className="border border-border p-10 text-center text-sm text-text-tertiary">
              No icons found for "<span className="text-text">{query}</span>"
            </div>
          )}
        </section>
      ) : (
        /* ── Categorized grid ─────────────────────────────────────────── */
        CATEGORIES.map(cat => (
          <section key={cat.id} className="mb-10">
            <div className="flex items-baseline gap-3 border-b border-border pb-2 mb-4">
              <h2
                id={cat.id}
                className="text-xs font-bold tracking-widest uppercase text-text-tertiary"
              >
                {cat.label}
              </h2>
              <span className="text-xs text-text-disabled">{cat.icons.length}</span>
            </div>
            {cat.description && (
              <p className="text-xs text-text-tertiary mb-3">{cat.description}</p>
            )}
            <div
              className="gap-1.5"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(${Math.max(80, iconSize + 32)}px, 1fr))`,
              }}
            >
              {cat.icons.map(name => (
                <IconTile key={name} name={name} copied={copied} onCopy={handleCopy} size={iconSize} />
              ))}
            </div>
          </section>
        ))
      )}

      {/* ── Icon Size Tokens ─────────────────────────────────────────────── */}
      <section className="mb-12 mt-4">
        <h2 id="icon-size-tokens" className="text-xl font-black tracking-tight text-text mb-1 uppercase">
          Icon Size Tokens
        </h2>
        <p className="text-sm text-text-secondary mb-6">
          Eleven size stops on a 16px base. Tokens named{' '}
          <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">--o9con-{'{px}'}</code>.
          Sizes 14–32 px are UI icons (inline controls). Sizes 40–80 px are pictograms (feature art, empty states).
          Default is <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">o9con-20</code>.
        </p>

        {/* Visual size demo */}
        <div className="flex flex-wrap items-end gap-x-5 gap-y-4 p-5 mb-2 bg-surface-raised border border-border">
          {[14,16,20,24,32,40,48,56,64,72,80].map(px => {
            const isDefault = px === 20;
            const iconName = 'arrow-right';
            const url = ICON_URLS[iconName];
            return (
              <div key={px} className="flex flex-col items-center gap-1.5">
                {url ? (
                  <span
                    aria-hidden="true"
                    className={isDefault ? 'text-primary' : 'text-text-secondary'}
                    style={{
                      display: 'block',
                      width: px,
                      height: px,
                      backgroundColor: 'currentColor',
                      maskImage: `url(${url})`,
                      WebkitMaskImage: `url(${url})`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                    }}
                  />
                ) : (
                  <svg width={px} height={px} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75"
                    className={isDefault ? 'text-primary' : 'text-text-secondary'}>
                    <path d="M3 5h14M6 10h8M9 15h2" />
                  </svg>
                )}
                <span className={`font-mono text-[10px] ${isDefault ? 'text-primary' : 'text-text-tertiary'}`}>
                  {px}px
                </span>
                {isDefault && (
                  <span className="text-[8px] text-text-tertiary tracking-wide uppercase">default</span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex gap-6 mb-5 px-1">
          <span className="text-[10px] text-text-tertiary">← UI icons (14–32 px)</span>
          <span className="text-[10px] text-text-tertiary">Pictograms (40–80 px) →</span>
        </div>

        {/* Token table */}
        <div className="border border-border overflow-hidden mb-5">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface-raised border-b border-border">
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Token</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-20">px</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-24">rem</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-36">Tailwind</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-surface-sunken border-b border-border">
                <td colSpan={5} className="px-4 py-1.5">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary">
                    UI Icons — inline controls &amp; navigation
                  </span>
                </td>
              </tr>
              {[
                { name:'o9con-14', cssVar:'--o9con-14', px:'14px', rem:'0.875rem', tw:'size-icon-14', use:'Dense tables, compact list rows, inline metadata' },
                { name:'o9con-16', cssVar:'--o9con-16', px:'16px', rem:'1rem',     tw:'size-icon-16', use:'Small button icons, chip labels, breadcrumbs' },
                { name:'o9con-20', cssVar:'--o9con-20', px:'20px', rem:'1.25rem',  tw:'size-icon-20', use:'Default — toolbars, navigation, action menus', isDefault:true },
                { name:'o9con-24', cssVar:'--o9con-24', px:'24px', rem:'1.5rem',   tw:'size-icon-24', use:'Section headings, card actions, prominent UI' },
                { name:'o9con-32', cssVar:'--o9con-32', px:'32px', rem:'2rem',     tw:'size-icon-32', use:'Feature headers, step indicators' },
              ].map((row, i) => (
                <tr key={row.name} className={`border-b border-border ${i % 2 === 0 ? '' : 'bg-surface-raised/30'}`}>
                  <td className="px-4 py-3 align-top">
                    <span className="font-mono text-xs text-text">{row.name}</span>
                    {row.isDefault && (
                      <span className="ml-2 text-[9px] px-1.5 py-0.5 bg-primary text-on-primary uppercase tracking-wide">default</span>
                    )}
                    <span className="block font-mono text-xs text-text-tertiary mt-0.5">{row.cssVar}</span>
                  </td>
                  <td className="px-4 py-3 align-top"><code className="font-mono text-xs text-text">{row.px}</code></td>
                  <td className="px-4 py-3 align-top"><code className="font-mono text-xs text-text">{row.rem}</code></td>
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-xs px-1.5 py-0.5 bg-surface-overlay border border-border text-text block w-fit">{row.tw}</code>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-text-secondary leading-relaxed">{row.use}</td>
                </tr>
              ))}
              <tr className="bg-surface-sunken border-b border-border">
                <td colSpan={5} className="px-4 py-1.5">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-text-tertiary">
                    Pictograms — feature art &amp; empty states
                  </span>
                </td>
              </tr>
              {[
                { name:'o9con-40', cssVar:'--o9con-40', px:'40px', rem:'2.5rem', tw:'size-icon-40', use:'Large list-row icons, wizard step indicators' },
                { name:'o9con-48', cssVar:'--o9con-48', px:'48px', rem:'3rem',   tw:'size-icon-48', use:'Category / type icons in card headers' },
                { name:'o9con-56', cssVar:'--o9con-56', px:'56px', rem:'3.5rem', tw:'size-icon-56', use:'Onboarding step icons, feature callouts' },
                { name:'o9con-64', cssVar:'--o9con-64', px:'64px', rem:'4rem',   tw:'size-icon-64', use:'Empty-state context icons, section art' },
                { name:'o9con-72', cssVar:'--o9con-72', px:'72px', rem:'4.5rem', tw:'size-icon-72', use:'Modal / dialog hero icons' },
                { name:'o9con-80', cssVar:'--o9con-80', px:'80px', rem:'5rem',   tw:'size-icon-80', use:'Max size — landing page feature icons' },
              ].map((row, i) => (
                <tr key={row.name} className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-surface-raised/30'}`}>
                  <td className="px-4 py-3 align-top">
                    <span className="font-mono text-xs text-text">{row.name}</span>
                    <span className="block font-mono text-xs text-text-tertiary mt-0.5">{row.cssVar}</span>
                  </td>
                  <td className="px-4 py-3 align-top"><code className="font-mono text-xs text-text">{row.px}</code></td>
                  <td className="px-4 py-3 align-top"><code className="font-mono text-xs text-text">{row.rem}</code></td>
                  <td className="px-4 py-3 align-top">
                    <code className="font-mono text-xs px-1.5 py-0.5 bg-surface-overlay border border-border text-text block w-fit">{row.tw}</code>
                  </td>
                  <td className="px-4 py-3 align-top text-xs text-text-secondary leading-relaxed">{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Naming Convention ────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 id="naming" className="text-xl font-black tracking-tight text-text mb-4 uppercase">
          Naming Convention
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          All icons follow the <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">o9con-[name]</code> pattern.
          Multi-word names use hyphens. Variants use suffixes: <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">-alt</code>, <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">-o</code> (outline), <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">-filled</code>.
        </p>
        <CodeBlock code={`o9con-arrow-right          // Directional arrow
o9con-sort-alpha-asc       // Alphabetical sort ascending
o9con-mail-reply-all       // Reply all action
o9con-bar-chart-h          // Horizontal bar chart
o9con-database-protection  // Database security
o9con-filter-template-filled  // Filled filter template variant`} language="javascript" />
      </section>

      {/* ── Usage ────────────────────────────────────────────────────────── */}
      <section className="mb-12">
        <h2 id="usage" className="text-xl font-black tracking-tight text-text mb-4 uppercase">
          Usage
        </h2>
        <p className="text-sm text-text-secondary mb-4">
          Import SVGs as URL strings (Vite), apply via <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">mask-image</code> for color control,
          or use as <code className="border border-border bg-surface-overlay px-1.5 py-0.5 text-xs text-white">&lt;img&gt;</code> tags. Reference size tokens via Tailwind utilities.
        </p>
        <CodeBlock code={`// 1. Import as URL (Vite)
import arrowRight from '@/assets/icons/o9con-arrow-right.svg';

// 2a. Mask-image (inherits currentColor — best for theming)
<span
  style={{
    width: 'var(--o9con-20)',
    height: 'var(--o9con-20)',
    backgroundColor: 'currentColor',
    maskImage: \`url(\${arrowRight})\`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
  }}
/>

// 2b. <img> tag (simple, no color control)
<img src={arrowRight} className="size-icon-20" alt="" aria-hidden="true" />

// 3. Tailwind size utilities
<span className="size-icon-20 ..." />   // 20px — default
<span className="size-icon-24 ..." />   // 24px — card actions
<span className="size-icon-64 ..." />   // 64px — empty state pictogram`} />
      </section>
    </article>
  );
}
