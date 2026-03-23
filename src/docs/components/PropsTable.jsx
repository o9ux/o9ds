export default function PropsTable({ props }) {
  return (
    <div className="mt-4 overflow-x-auto border border-border">
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-border bg-surface-raised">
            <th className="whitespace-nowrap px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Prop</th>
            <th className="whitespace-nowrap px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Type</th>
            <th className="whitespace-nowrap px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Default</th>
            <th className="px-4 py-3 font-bold tracking-wider uppercase text-text-tertiary">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {props.map((prop) => (
            <tr key={prop.name} className="hover:bg-surface-overlay/50 transition-colors">
              <td className="whitespace-nowrap px-4 py-3">
                <code className="bg-surface-overlay px-1.5 py-0.5 text-xs font-medium text-text border border-border">
                  {prop.name}
                </code>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <code className="text-xs text-text-secondary">{prop.type}</code>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <code className="text-xs text-text-tertiary">{prop.default}</code>
              </td>
              <td className="px-4 py-3 text-text-secondary leading-relaxed">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
