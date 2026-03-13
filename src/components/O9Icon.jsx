/**
 * O9Icon — renders an o9con SVG icon inline, inheriting currentColor.
 *
 * Import the SVG with Vite's `?raw` suffix to get the raw string,
 * then pass it to this component. The fill color is replaced with
 * `currentColor` and the SVG resizes to fill its container.
 *
 * Usage:
 *   import closeSvg from '@/assets/icons/o9con-close.svg?raw';
 *   <O9Icon svg={closeSvg} />
 *
 * Sizing:  The element renders at 1em × 1em by default.  The button
 * components' [&>*] selectors override this to the correct o9con token size.
 */
export default function O9Icon({ svg, className }) {
  const processed = svg
    .replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"')
    .replace(/width="\d+"/, 'width="100%"')
    .replace(/height="\d+"/, 'height="100%"');

  return (
    <span
      aria-hidden="true"
      className={`block w-[1em] h-[1em] ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: processed }}
    />
  );
}
