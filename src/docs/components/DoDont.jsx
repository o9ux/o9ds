export default function DoDont({ doItems = [], dontItems = [] }) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {/* Do */}
      <div className="border border-green-500/40 bg-green-500/5 p-5">
        <div className="mb-3 flex items-center gap-2 border-b border-green-500/20 pb-3">
          <span className="flex h-5 w-5 items-center justify-center bg-green-500 text-xs font-black text-black">
            ✓
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-green-400">Do</span>
        </div>
        <ul className="space-y-2">
          {doItems.map((item, i) => (
            <li key={i} className="text-xs leading-relaxed text-text-secondary flex gap-2">
              <span className="text-green-500 shrink-0 mt-px">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Don't */}
      <div className="border border-red-500/40 bg-red-500/5 p-5">
        <div className="mb-3 flex items-center gap-2 border-b border-red-500/20 pb-3">
          <span className="flex h-5 w-5 items-center justify-center bg-red-500 text-xs font-black text-white">
            ✕
          </span>
          <span className="text-xs font-bold tracking-widest uppercase text-red-400">Don't</span>
        </div>
        <ul className="space-y-2">
          {dontItems.map((item, i) => (
            <li key={i} className="text-xs leading-relaxed text-text-secondary flex gap-2">
              <span className="text-red-500 shrink-0 mt-px">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
