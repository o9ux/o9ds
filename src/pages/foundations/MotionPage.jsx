import { useState, useRef, useCallback } from 'react';
import PageHeader from '@/docs/components/PageHeader';
import CodeBlock from '@/docs/components/CodeBlock';
import DoDont from '@/docs/components/DoDont';
import O9Icon from '@/components/O9Icon';
import Switch from '@/components/inputs/Switch';

/* ── Click Effect icons ───────────────────────────────────────────── */
import starSvg from '@/assets/icons/o9con-star.svg?raw';
import heartSvg from '@/assets/icons/o9con-heart.svg?raw';
import homeSvg from '@/assets/icons/o9con-home.svg?raw';
import searchSvg from '@/assets/icons/o9con-search.svg?raw';
import notificationSvg from '@/assets/icons/o9con-notification.svg?raw';
import playCircleSvg from '@/assets/icons/o9con-play-circle.svg?raw';
import cloudDownloadSvg from '@/assets/icons/o9con-cloud-download.svg?raw';
import bookmarkSvg from '@/assets/icons/o9con-bookmark.svg?raw';
import uploadSvg from '@/assets/icons/o9con-upload.svg?raw';
import lockSvg from '@/assets/icons/o9con-lock.svg?raw';
import addAttachmentSvg from '@/assets/icons/o9con-add-attachment.svg?raw';
import shareSvg from '@/assets/icons/o9con-share.svg?raw';
import plusSvg from '@/assets/icons/o9con-plus.svg?raw';

/* ── Loading Effect icons ─────────────────────────────────────────── */
import fetchSvg from '@/assets/icons/o9con-fetch.svg?raw';
import pdfDownloadSvg from '@/assets/icons/o9con-pdf-download.svg?raw';
import downloadSvg from '@/assets/icons/o9con-download.svg?raw';

/* ── Hover / Loop Effect icons ────────────────────────────────────── */
import envelopeOSvg from '@/assets/icons/o9con-envelope-o.svg?raw';
import cogSvg from '@/assets/icons/o9con-cog.svg?raw';
import spinnerSvg from '@/assets/icons/o9con-spinner.svg?raw';
import lightbulbGlowSvg from '@/assets/icons/o9con-lightbulb-glow.svg?raw';
import bellOSvg from '@/assets/icons/o9con-bell-o.svg?raw';
import targetSvg from '@/assets/icons/o9con-target.svg?raw';
import cameraRetroSvg from '@/assets/icons/o9con-camera-retro.svg?raw';
import boltSvg from '@/assets/icons/o9con-bolt.svg?raw';
import mapPinSvg from '@/assets/icons/o9con-map-pin.svg?raw';
import fileImageOSvg from '@/assets/icons/o9con-file-image-o.svg?raw';
import mobileSvg from '@/assets/icons/o9con-mobile.svg?raw';
import angleDoubleDownSvg from '@/assets/icons/o9con-angle-double-down.svg?raw';
import cloudUploadSvg from '@/assets/icons/o9con-cloud-upload.svg?raw';
import arrowLeftSvg from '@/assets/icons/o9con-arrow-left.svg?raw';
import arrowRightSvg from '@/assets/icons/o9con-arrow-right.svg?raw';
import arrowsAltOSvg from '@/assets/icons/o9con-arrows-alt-o.svg?raw';
import shrinkCornersSvg from '@/assets/icons/o9con-shrink-corners.svg?raw';
import compassSvg from '@/assets/icons/o9con-compass.svg?raw';
import futbolOSvg from '@/assets/icons/o9con-futbol-o.svg?raw';
import arrowRightUpSvg from '@/assets/icons/o9con-arrow-right-up.svg?raw';
import o9CircleSvg from '@/assets/icons/o9con-o9-circle.svg?raw';
import longArrowLeftSvg from '@/assets/icons/o9con-long-arrow-left.svg?raw';
import longArrowRightSvg from '@/assets/icons/o9con-long-arrow-right.svg?raw';
import longArrowUpSvg from '@/assets/icons/o9con-long-arrow-up.svg?raw';
import longArrowDownSvg from '@/assets/icons/o9con-long-arrow-down.svg?raw';
import refreshSvg from '@/assets/icons/o9con-refresh.svg?raw';
import upDownSvg from '@/assets/icons/o9con-up-down.svg?raw';
import leftRightSvg from '@/assets/icons/o9con-left-right.svg?raw';

/* ── Duration token data ────────────────────────────────────────────── */
const durationTokens = [
  { name: 'short',   cssVar: '--o9ds-motion-duration-short',   value: '0.2s', useCase: 'Instant feedback, toggles, ripples' },
  { name: 'normal',  cssVar: '--o9ds-motion-duration-normal',  value: '0.4s', useCase: 'Micro-interactions, button feedback, quick transitions' },
  { name: 'long',    cssVar: '--o9ds-motion-duration-long',    value: '0.6s', useCase: 'Click effects, standard element transitions' },
  { name: 'xlong',   cssVar: '--o9ds-motion-duration-xlong',   value: '0.8s', useCase: 'Expanded click effects, complex transitions' },
  { name: 'xxlong',  cssVar: '--o9ds-motion-duration-xxlong',  value: '1.2s', useCase: 'Hover/loop effects, attention animations' },
  { name: 'xxxlong', cssVar: '--o9ds-motion-duration-xxxlong', value: '1.8s', useCase: 'Slow ambient loops, loading indicators, color cycling' },
];

/* ── Easing token data ──────────────────────────────────────────────── */
const easingTokens = [
  { name: 'none',   cssVar: '--o9ds-motion-ease-none',   value: 'linear', description: 'Constant speed, no acceleration', useCase: 'Continuous rotation, progress bars, linear slides' },
  { name: 'out',    cssVar: '--o9ds-motion-ease-out',    value: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', description: 'Decelerating exit', useCase: 'Elements exiting view, fade outs, ring expansions' },
  { name: 'in-out', cssVar: '--o9ds-motion-ease-in-out', value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)', description: 'Smooth start & end', useCase: 'Scale effects, position changes, ripple effects' },
  { name: 'ripple', cssVar: '--o9ds-motion-ease-ripple', value: 'cubic-bezier(0.2, 0.6, 0.35, 1)', description: 'Quick start, gentle settle', useCase: 'Bounce, elastic, organic movement, natural-feeling motion' },
];

/* ── Click effect data ──────────────────────────────────────────────── */
const clickEffects = [
  { id: 1,  name: 'Ripple Ring',       className: 'o9-click-ripple-ring',   description: 'Double expanding ring ripple',  icon: starSvg },
  { id: 2,  name: 'Border Burst',      className: 'o9-click-border-burst',  description: 'Expanding border circle',       icon: heartSvg },
  { id: 3,  name: 'Inset Fill',        className: 'o9-click-inset-fill',    description: 'Inward fill then fade',         icon: homeSvg },
  { id: 4,  name: 'Background Fade',   className: 'o9-click-bg-fade',       description: 'Slow background fill expand',   icon: searchSvg },
  { id: 5,  name: 'Scale Pulse',       className: 'o9-click-scale-pulse',   description: 'Background scale pulse',        icon: notificationSvg },
  { id: 6,  name: 'Scale Fill',        className: 'o9-click-scale-fill',    description: 'Background scale + fill',       icon: playCircleSvg },
  { id: 7,  name: 'Ring Out',          className: 'o9-click-ring-out',      description: 'Fast ring expansion',           icon: cloudDownloadSvg },
  { id: 8,  name: 'Linear Burst',      className: 'o9-click-linear-burst',  description: 'Linear ring burst',             icon: bookmarkSvg },
  { id: 9,  name: 'Slow Ring',         className: 'o9-click-slow-ring',     description: 'Gradual ring expansion',        icon: uploadSvg },
  { id: 10, name: 'Quick Flash',       className: 'o9-click-quick-flash',   description: 'Fast circle flash',             icon: lockSvg },
  { id: 11, name: 'Glow Ring',         className: 'o9-click-glow-ring',     description: 'Glowing ring expansion',        icon: addAttachmentSvg },
  { id: 12, name: 'Double Ring',       className: 'o9-click-double-ring',   description: 'Two staggered rings',           icon: shareSvg },
  { id: 13, name: 'Directional Slide', className: 'o9-click-dir-slide',     description: 'Left-right slide effect',       icon: plusSvg, extra: 'o9-click-dir-slide-left' },
];

/* ── Hover/Loop effect data ─────────────────────────────────────────── */
const animEffects = [
  { name: 'Gelatine',          slug: 'gelatine',          category: 'Transform', icon: envelopeOSvg },
  { name: 'Spin',              slug: 'spin',              category: 'Rotation',  icon: cogSvg },
  { name: 'Pulse',             slug: 'pulse',             category: 'Scale',     icon: heartSvg },
  { name: 'Elastic Spin',      slug: 'elastic-spin',      category: 'Rotation',  icon: spinnerSvg },
  { name: 'Flash',             slug: 'flash',             category: 'Opacity',   icon: lightbulbGlowSvg },
  { name: 'Notify',            slug: 'notify',            category: 'Transform', icon: bellOSvg },
  { name: 'Grow',              slug: 'grow',              category: 'Scale',     icon: targetSvg },
  { name: 'Fade In',           slug: 'fade-in',           category: 'Opacity',   icon: cameraRetroSvg },
  { name: 'Fade Out',          slug: 'fade-out',          category: 'Opacity',   icon: boltSvg },
  { name: 'Bounce',            slug: 'bounce',            category: 'Position',  icon: mapPinSvg },
  { name: 'Shake',             slug: 'shake',             category: 'Position',  icon: searchSvg },
  { name: 'Swing',             slug: 'swing',             category: 'Rotation',  icon: fileImageOSvg },
  { name: 'Wobble',            slug: 'wobble',            category: 'Transform', icon: mobileSvg },
  { name: 'Fade In Down',      slug: 'fade-in-down',      category: 'Position',  icon: angleDoubleDownSvg },
  { name: 'Fade In Up',        slug: 'fade-in-up',        category: 'Position',  icon: cloudUploadSvg },
  { name: 'Fade In Left',      slug: 'fade-in-left',      category: 'Position',  icon: arrowLeftSvg },
  { name: 'Fade In Right',     slug: 'fade-in-right',     category: 'Position',  icon: arrowRightSvg },
  { name: 'Fade Out Down',     slug: 'fade-out-down',     category: 'Position',  icon: downloadSvg },
  { name: 'Fade Out Up',       slug: 'fade-out-up',       category: 'Position',  icon: starSvg },
  { name: 'Fade Out Left',     slug: 'fade-out-left',     category: 'Position',  icon: lockSvg },
  { name: 'Fade Out Right',    slug: 'fade-out-right',    category: 'Position',  icon: shareSvg },
  { name: 'Bounce In',         slug: 'bounce-in',         category: 'Scale',     icon: arrowsAltOSvg },
  { name: 'Bounce Out',        slug: 'bounce-out',        category: 'Scale',     icon: shrinkCornersSvg },
  { name: 'Roll In',           slug: 'roll-in',           category: 'Transform', icon: compassSvg },
  { name: 'Roll Out',          slug: 'roll-out',          category: 'Transform', icon: futbolOSvg },
  { name: 'Launch',            slug: 'launch',            category: 'Transform', icon: arrowRightUpSvg },
  { name: 'Color Transition',  slug: 'color-transition',  category: 'Color',     icon: o9CircleSvg },
  { name: 'Bounce Left',       slug: 'bounce-left',       category: 'Position',  icon: longArrowLeftSvg },
  { name: 'Bounce Right',      slug: 'bounce-right',      category: 'Position',  icon: longArrowRightSvg },
  { name: 'Bounce Up',         slug: 'bounce-up',         category: 'Position',  icon: longArrowUpSvg },
  { name: 'Bounce Down',       slug: 'bounce-down',       category: 'Position',  icon: longArrowDownSvg },
  { name: 'Screw',             slug: 'screw',             category: 'Rotation',  icon: cogSvg },
  { name: 'Reload',            slug: 'reload',            category: 'Rotation',  icon: refreshSvg },
  { name: 'Flip Vertical',     slug: 'flip-vertical',     category: 'Rotation',  icon: upDownSvg },
  { name: 'Flip Horizontal',   slug: 'flip-horizontal',   category: 'Rotation',  icon: leftRightSvg },
];

/* ── Loading effect data ────────────────────────────────────────────── */
const loadingEffects = [
  { id: 1, name: 'Counter Spin',     className: 'o9-loading-counter-spin',      description: 'Two-ring counter-spin',     icon: fetchSvg },
  { id: 2, name: 'Progress Spin',    className: 'o9-loading-progress-spin',     description: 'Progress bar + spin',       icon: pdfDownloadSvg },
  { id: 3, name: 'Staggered Pulse',  className: 'o9-loading-staggered-pulse',   description: 'Two-ring staggered pulse',  icon: downloadSvg },
];

/* ── Reusable helpers ───────────────────────────────────────────────── */
function SectionHeader({ id, title, description }) {
  return (
    <div className="mb-6">
      <h2 id={id} className="text-xl font-black tracking-tight text-text mb-1 uppercase">{title}</h2>
      {description && <p className="text-sm text-text-tertiary">{description}</p>}
    </div>
  );
}

function CopyBtn({ value }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="text-xs px-2 py-0.5 bg-surface-overlay border border-border text-text-tertiary hover:text-text hover:border-border-hover transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

/* ── Click Effect Demo Card ─────────────────────────────────────────── */
function ClickEffectCard({ effect, iconSvg }) {
  const ref = useRef(null);

  const handleClick = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    /* Remove and re-add active class to replay the animation */
    el.classList.remove('o9-click--active');
    /* Force browser reflow before re-adding */
    void el.offsetWidth;
    el.classList.add('o9-click--active');

    const onEnd = () => {
      el.classList.remove('o9-click--active');
      el.removeEventListener('animationend', onEnd);
    };
    el.addEventListener('animationend', onEnd);

    /* Fallback: remove after 2s if animationend doesn't fire */
    setTimeout(() => el.classList.remove('o9-click--active'), 2000);
  }, []);

  const classes = [effect.className];
  if (effect.extra) classes.push(effect.extra);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        ref={ref}
        onClick={handleClick}
        className={`w-16 h-16 flex items-center justify-center cursor-pointer bg-surface-overlay border border-border hover:border-border-hover transition-colors ${classes.join(' ')}`}
        title={`Click to play: ${effect.name}`}
      >
        <span className="inline-flex items-center justify-center text-[24px] text-text">
          <O9Icon svg={iconSvg} />
        </span>
      </button>
      <div className="text-center">
        <p className="text-xs font-medium text-text">{effect.name}</p>
        <p className="text-[10px] text-text-tertiary mt-0.5">.{effect.className}</p>
      </div>
    </div>
  );
}

/* ── Loading Effect Demo Card ───────────────────────────────────────── */
function LoadingEffectCard({ effect, iconSvg }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  const toggleLoading = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (active) {
      el.classList.remove('o9-click--active');
      setActive(false);
    } else {
      el.classList.add('o9-click--active');
      setActive(true);
      /* Auto-stop after 6s */
      setTimeout(() => {
        el.classList.remove('o9-click--active');
        setActive(false);
      }, 6000);
    }
  }, [active]);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        ref={ref}
        onClick={toggleLoading}
        className={`w-16 h-16 flex items-center justify-center cursor-pointer bg-surface-overlay border border-border hover:border-border-hover transition-colors ${effect.className}`}
        title={`Click to toggle: ${effect.name}`}
      >
        <span className="inline-flex items-center justify-center text-[24px] text-text">
          <O9Icon svg={iconSvg} />
        </span>
      </button>
      <div className="text-center">
        <p className="text-xs font-medium text-text">{effect.name}</p>
        <p className="text-[10px] text-text-tertiary mt-0.5">{active ? 'Click to stop' : 'Click to start'}</p>
      </div>
    </div>
  );
}

/* ── Hover Effect Demo Card ─────────────────────────────────────────── */
function HoverEffectCard({ effect, iconSvg, iconOnly }) {
  const animClass = `o9-anim-${effect.slug}`;
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-16 h-16 flex items-center justify-center bg-surface-overlay border border-border cursor-default ${iconOnly ? '' : animClass}`}
        title={`Hover to see: ${effect.name}`}
      >
        <span className={`inline-flex items-center justify-center text-[24px] text-text ${iconOnly ? animClass : ''}`}>
          <O9Icon svg={iconSvg} />
        </span>
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-text">{effect.name}</p>
        <p className="text-[10px] text-text-tertiary mt-0.5">{effect.category}</p>
      </div>
    </div>
  );
}

/* ── Loop Effect Demo Card ──────────────────────────────────────────── */
function LoopEffectCard({ effect, iconSvg, paused, iconOnly }) {
  const loopClass = paused ? '' : `o9-anim-${effect.slug}-loop`;
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-16 h-16 flex items-center justify-center bg-surface-overlay border border-border ${iconOnly ? '' : loopClass}`}
        style={paused ? { animationPlayState: 'paused' } : undefined}
        title={effect.name}
      >
        <span
          className={`inline-flex items-center justify-center text-[24px] text-text ${iconOnly ? loopClass : ''}`}
          style={paused && iconOnly ? { animationPlayState: 'paused' } : undefined}
        >
          <O9Icon svg={iconSvg} />
        </span>
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-text">{effect.name}</p>
        <p className="text-[10px] text-text-tertiary mt-0.5">{effect.category}</p>
      </div>
    </div>
  );
}

/* ── Category filter chip ───────────────────────────────────────────── */
function CategoryChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1 border transition-colors ${
        active
          ? 'bg-interactive text-on-interactive border-interactive'
          : 'bg-transparent text-text-secondary border-border hover:border-border-hover'
      }`}
    >
      {label}
    </button>
  );
}


/* ════════════════════════════════════════════════════════════════════
   MOTION PAGE
   ════════════════════════════════════════════════════════════════════ */
export default function MotionPage() {
  const [copiedToken, setCopiedToken] = useState(null);
  const [hoverCategory, setHoverCategory] = useState('All');
  const [loopCategory, setLoopCategory] = useState('All');
  const [loopsPaused, setLoopsPaused] = useState(false);
  const [hoverIconOnly, setHoverIconOnly] = useState(false);
  const [loopIconOnly, setLoopIconOnly] = useState(false);

  function handleCopy(text, id) {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 1500);
  }

  const categories = ['All', 'Transform', 'Rotation', 'Scale', 'Position', 'Opacity', 'Color'];
  const filteredHoverEffects = hoverCategory === 'All'
    ? animEffects
    : animEffects.filter((e) => e.category === hoverCategory);
  const filteredLoopEffects = loopCategory === 'All'
    ? animEffects
    : animEffects.filter((e) => e.category === loopCategory);

  return (
    <article>
      <PageHeader
        title="Motion"
        description="Animation tokens and effects that bring the o9ds UI to life. Duration and easing primitives provide consistent timing, while click, hover, and looping effect utility classes can be applied to any DOM element."
        badge="Foundation"
      />

      {/* ── Section 1: Duration Tokens ────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="duration-tokens"
          title="Duration Tokens"
          description="Six duration primitives control animation speed across the system. Use CSS variables directly or Tailwind utility classes."
        />

        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface-raised border-b border-border">
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-44">Token</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-20">Value</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5 w-48">Preview</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Use Case</th>
                <th className="text-right text-text-tertiary font-normal px-4 py-2.5 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {durationTokens.map((token, i) => (
                <tr
                  key={token.name}
                  className={`border-b border-border last:border-0 ${i % 2 === 0 ? '' : 'bg-surface-raised/30'}`}
                >
                  <td className="px-4 py-3 align-middle">
                    <button
                      onClick={() => handleCopy(`var(${token.cssVar})`, token.name)}
                      className="text-left group"
                    >
                      <span className="font-mono text-xs text-text group-hover:text-primary transition-colors">
                        {token.name}
                      </span>
                      <span className="block text-[10px] text-text-tertiary mt-0.5">
                        {copiedToken === token.name ? 'Copied!' : token.cssVar}
                      </span>
                    </button>
                  </td>
                  <td className="px-4 py-3 align-middle font-mono text-xs text-text">
                    {token.value}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <div className="w-full h-2 bg-surface-sunken overflow-hidden">
                      <div
                        className="h-full bg-interactive animate-[durationPreview_ease-in-out_infinite_alternate]"
                        style={{
                          width: '100%',
                          animation: `durationPreview ${token.value} ease-in-out infinite alternate`,
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-text-secondary">
                    {token.useCase}
                  </td>
                  <td className="px-4 py-3 align-middle text-right">
                    <CopyBtn value={`var(${token.cssVar})`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Inline keyframes for the duration preview bar */}
        <style>{`
          @keyframes durationPreview {
            from { transform: scaleX(0); transform-origin: left; }
            to   { transform: scaleX(1); transform-origin: left; }
          }
        `}</style>
      </section>

      {/* ── Section 2: Easing Tokens ──────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="easing-tokens"
          title="Easing Tokens"
          description="Four easing curves define how animations accelerate and decelerate. Each maps to a CSS timing function."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {easingTokens.map((token) => (
            <div key={token.name} className="border border-border p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-mono text-sm text-text font-medium">{token.name}</span>
                  <p className="text-[10px] text-text-tertiary mt-0.5">{token.description}</p>
                </div>
                <CopyBtn value={`var(${token.cssVar})`} />
              </div>

              {/* Easing preview: a dot that animates back and forth */}
              <div className="relative h-8 bg-surface-sunken mb-3 overflow-hidden">
                <div
                  className="absolute w-3 h-3 rounded-full bg-interactive"
                  style={{
                    animation: `easingSlide 1.5s ${token.value} infinite alternate`,
                    top: 'calc(50% - 6px)',
                    left: '4px',
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <code className="text-[10px] text-text-tertiary font-mono">{token.value}</code>
                <span className="text-[10px] text-text-tertiary">{token.useCase}</span>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes easingSlide {
            from { transform: translateX(0); }
            to   { transform: translateX(calc(100% + 100px)); }
          }
        `}</style>
      </section>

      {/* ── Section 3: Click Effects ──────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="click-effects"
          title="Click Effects"
          description="13 click-triggered effects using CSS pseudo-elements. Click each icon to preview. Apply .o9-click-{name} to any element and toggle .o9-click--active on click."
        />

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-6">
          {clickEffects.map((effect) => (
            <ClickEffectCard
              key={effect.id}
              effect={effect}
              iconSvg={effect.icon}
            />
          ))}
        </div>

        {/* Usage example */}
        <div className="mt-8">
          <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">Usage</p>
          <CodeBlock code={`<!-- HTML — add effect class to any element -->
<button class="o9-click-ripple-ring">Click me</button>

<!-- JS — toggle active class on click -->
<script>
  el.addEventListener('click', () => {
    el.classList.remove('o9-click--active');
    void el.offsetWidth; // force reflow
    el.classList.add('o9-click--active');
  });
  el.addEventListener('animationend', () => {
    el.classList.remove('o9-click--active');
  });
</script>`} language="jsx" />
        </div>
      </section>

      {/* ── Section 4: Loading Effects ────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="loading-effects"
          title="Loading Effects"
          description="3 loading indicator effects with continuous animation. Click to toggle on/off. Apply .o9-loading-{name} and toggle .o9-click--active."
        />

        <div className="grid grid-cols-3 sm:grid-cols-3 gap-8 max-w-xs">
          {loadingEffects.map((effect) => (
            <LoadingEffectCard
              key={effect.id}
              effect={effect}
              iconSvg={effect.icon}
            />
          ))}
        </div>
      </section>

      {/* ── Section 5: Hover Effects ──────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="hover-effects"
          title="Hover Effects"
          description="35 hover-triggered animations. Hover over each icon to preview. Apply .o9-anim-{name} to any element."
        />

        {/* Category filter + Icon Only toggle */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                active={hoverCategory === cat}
                onClick={() => setHoverCategory(cat)}
              />
            ))}
          </div>
          <div className="ml-auto">
            <Switch
              id="sw-hover-icon-only"
              size="sm"
              label="Only Icon"
              checked={hoverIconOnly}
              onChange={(e) => setHoverIconOnly(e.target.checked)}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-6">
          {filteredHoverEffects.map((effect) => (
            <HoverEffectCard
              key={effect.slug}
              effect={effect}
              iconSvg={effect.icon}
              iconOnly={hoverIconOnly}
            />
          ))}
        </div>

        {/* Usage example */}
        <div className="mt-8">
          <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">Usage</p>
          <CodeBlock code={`<!-- Add animation class to any element — animates on hover -->
<div class="o9-anim-gelatine">Hover me</div>
<button class="o9-anim-pulse">Pulse on hover</button>
<span class="o9-anim-bounce">Bouncy text</span>`} language="jsx" />
        </div>
      </section>

      {/* ── Section 6: Looping Effects ────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="looping-effects"
          title="Looping Effects"
          description="35 continuously animating effects. Apply .o9-anim-{name}-loop to any element for infinite animation."
        />

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                active={loopCategory === cat}
                onClick={() => setLoopCategory(cat)}
              />
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Switch
              id="sw-loop-icon-only"
              size="sm"
              label="Only Icon"
              checked={loopIconOnly}
              onChange={(e) => setLoopIconOnly(e.target.checked)}
            />
            <button
              onClick={() => setLoopsPaused(!loopsPaused)}
              className="text-xs px-3 py-1.5 border border-border bg-surface-overlay text-text hover:border-border-hover transition-colors flex items-center gap-1.5"
            >
              {loopsPaused ? '▶ Resume All' : '⏸ Pause All'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-6">
          {filteredLoopEffects.map((effect) => (
            <LoopEffectCard
              key={effect.slug}
              effect={effect}
              iconSvg={effect.icon}
              paused={loopsPaused}
              iconOnly={loopIconOnly}
            />
          ))}
        </div>

        {/* Usage example */}
        <div className="mt-8">
          <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">Usage</p>
          <CodeBlock code={`<!-- Infinite loop animation — append -loop suffix -->
<div class="o9-anim-spin-loop">Always spinning</div>
<span class="o9-anim-pulse-loop">Pulsing indicator</span>
<button class="o9-anim-notify-loop">Attention!</button>`} language="jsx" />
        </div>
      </section>

      {/* ── Section: Speed Modifiers ──────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="speed-modifiers"
          title="Speed Modifiers"
          description="Apply .o9-anim-fast or .o9-anim-slow alongside any animation class to override its default duration."
        />

        <div className="grid grid-cols-3 gap-8 max-w-md mb-6">
          {['pulse', 'bounce', 'spin'].map((slug) => (
            <div key={slug} className="flex flex-col items-center gap-4">
              <p className="text-xs font-medium text-text capitalize">{slug}</p>
              <div className="flex flex-col items-center gap-3">
                <div className={`w-12 h-12 flex items-center justify-center bg-surface-overlay border border-border o9-anim-${slug}-loop o9-anim-fast`} title="Fast">
                  <span className="text-[10px] text-text-tertiary">Fast</span>
                </div>
                <div className={`w-12 h-12 flex items-center justify-center bg-surface-overlay border border-border o9-anim-${slug}-loop`} title="Default">
                  <span className="text-[10px] text-text-tertiary">Default</span>
                </div>
                <div className={`w-12 h-12 flex items-center justify-center bg-surface-overlay border border-border o9-anim-${slug}-loop o9-anim-slow`} title="Slow">
                  <span className="text-[10px] text-text-tertiary">Slow</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">Usage</p>
          <CodeBlock code={`<!-- Default speed -->
<div class="o9-anim-pulse-loop">Pulsing</div>

<!-- Fast (0.6s) -->
<div class="o9-anim-pulse-loop o9-anim-fast">Fast pulsing</div>

<!-- Slow (1.8s) -->
<div class="o9-anim-pulse-loop o9-anim-slow">Slow pulsing</div>

<!-- Works with hover mode too -->
<div class="o9-anim-gelatine o9-anim-fast">Quick hover</div>`} language="jsx" />
        </div>
      </section>

      {/* ── Section 7: Token Reference ────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="token-reference"
          title="Token Reference"
          description="All motion CSS custom properties available for use in any component or custom CSS."
        />

        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface-raised border-b border-border">
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Category</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">CSS Variable</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2.5">Value</th>
                <th className="text-right text-text-tertiary font-normal px-4 py-2.5 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {durationTokens.map((t, i) => (
                <tr key={t.cssVar} className={`border-b border-border ${i % 2 ? 'bg-surface-raised/30' : ''}`}>
                  <td className="px-4 py-2 text-xs text-text-secondary">{i === 0 ? 'Duration' : ''}</td>
                  <td className="px-4 py-2 font-mono text-xs text-text">{t.cssVar}</td>
                  <td className="px-4 py-2 font-mono text-xs text-text-secondary">{t.value}</td>
                  <td className="px-4 py-2 text-right"><CopyBtn value={`var(${t.cssVar})`} /></td>
                </tr>
              ))}
              {easingTokens.map((t, i) => (
                <tr key={t.cssVar} className={`border-b border-border ${(i + durationTokens.length) % 2 ? 'bg-surface-raised/30' : ''}`}>
                  <td className="px-4 py-2 text-xs text-text-secondary">{i === 0 ? 'Easing' : ''}</td>
                  <td className="px-4 py-2 font-mono text-xs text-text">{t.cssVar}</td>
                  <td className="px-4 py-2 font-mono text-xs text-text-secondary">{t.value}</td>
                  <td className="px-4 py-2 text-right"><CopyBtn value={`var(${t.cssVar})`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 8: Effect Class Reference ─────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="effect-class-reference"
          title="Effect Class Reference"
          description="Complete list of all CSS utility classes. These work on any DOM element — not limited to icons or buttons."
        />

        {/* Click Effects table */}
        <h3 className="text-sm font-semibold text-text mb-3 mt-6">Click Effects</h3>
        <div className="border border-border overflow-hidden mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface-raised border-b border-border">
                <th className="text-left text-text-tertiary font-normal px-4 py-2 w-48">Class</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2">Description</th>
                <th className="text-right text-text-tertiary font-normal px-4 py-2 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {clickEffects.map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-2 font-mono text-xs text-text">.{e.className}</td>
                  <td className="px-4 py-2 text-xs text-text-secondary">{e.description}</td>
                  <td className="px-4 py-2 text-right"><CopyBtn value={e.className} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Hover Effects table */}
        <h3 className="text-sm font-semibold text-text mb-3">Hover Effects</h3>
        <div className="border border-border overflow-hidden mb-6">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface-raised border-b border-border">
                <th className="text-left text-text-tertiary font-normal px-4 py-2 w-48">Class</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2 w-24">Category</th>
                <th className="text-right text-text-tertiary font-normal px-4 py-2 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {animEffects.map((e) => (
                <tr key={e.slug} className="border-b border-border last:border-0">
                  <td className="px-4 py-1.5 font-mono text-xs text-text">.o9-anim-{e.slug}</td>
                  <td className="px-4 py-1.5 text-xs text-text-secondary">{e.category}</td>
                  <td className="px-4 py-1.5 text-right"><CopyBtn value={`o9-anim-${e.slug}`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Loop Effects table */}
        <h3 className="text-sm font-semibold text-text mb-3">Loop Effects</h3>
        <div className="border border-border overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-surface-raised border-b border-border">
                <th className="text-left text-text-tertiary font-normal px-4 py-2 w-48">Class</th>
                <th className="text-left text-text-tertiary font-normal px-4 py-2 w-24">Category</th>
                <th className="text-right text-text-tertiary font-normal px-4 py-2 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {animEffects.map((e) => (
                <tr key={e.slug} className="border-b border-border last:border-0">
                  <td className="px-4 py-1.5 font-mono text-xs text-text">.o9-anim-{e.slug}-loop</td>
                  <td className="px-4 py-1.5 text-xs text-text-secondary">{e.category}</td>
                  <td className="px-4 py-1.5 text-right"><CopyBtn value={`o9-anim-${e.slug}-loop`} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Section 9: Usage Guidelines ───────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          id="usage-guidelines"
          title="Usage Guidelines"
          description="Best practices for using motion effects in the o9ds design system."
        />

        <DoDont
          doItems={[
            'Use duration tokens for consistent timing across components',
            'Apply click effects to interactive elements (buttons, cards)',
            'Use hover effects for subtle feedback on hover-capable devices',
            'Use loop effects sparingly for loading or attention states',
            <>Respect <code className="font-mono text-text-tertiary">prefers-reduced-motion</code> media query</>,
          ]}
          dontItems={[
            'Do not use looping effects on large areas — they can be distracting',
            'Do not apply multiple motion classes to the same element',
            'Do not use motion effects for critical information delivery',
            'Do not hard-code timing values — always use tokens',
            'Do not use effects that conflict with the element\'s transform',
          ]}
        />

        {/* Reduced motion support */}
        <div className="mt-6">
          <p className="text-xs text-text-tertiary font-medium uppercase tracking-wide mb-2">Accessibility: Reduced Motion</p>
          <CodeBlock code={`/* Add to your global CSS to respect user preferences */
@media (prefers-reduced-motion: reduce) {
  [class*="o9-anim-"],
  [class*="o9-click-"],
  [class*="o9-loading-"] {
    animation: none !important;
    transition: none !important;
  }
}`} language="css" />
        </div>
      </section>
    </article>
  );
}
