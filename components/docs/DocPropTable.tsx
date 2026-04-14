import { cn, FONT, WEIGHT, BORDER, RADIUS } from '@/lib/ui'

export interface PropDef {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface DocPropTableProps {
  props: PropDef[]
}

export function DocPropTable({ props }: DocPropTableProps) {
  if (props.length === 0) return null

  return (
    <div className={cn(BORDER.default, RADIUS.lg, 'overflow-hidden')}>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b-[0.5px] border-b-[var(--n400)] bg-[var(--n50)]">
            <th className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] px-3 py-2')}>Prop</th>
            <th className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] px-3 py-2')}>Type</th>
            <th className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] px-3 py-2')}>Default</th>
            <th className={cn(FONT.body, 'text-[11px] font-[550] text-[var(--n600)] px-3 py-2')}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={cn(
                i < props.length - 1 && 'border-b-[0.5px] border-b-[var(--n200)]',
              )}
            >
              <td className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)] px-3 py-2 align-top whitespace-nowrap')}>
                {prop.name}
                {prop.required && <span className="text-[var(--negative)] ml-0.5">*</span>}
              </td>
              <td className={cn(FONT.body, 'text-[13px] font-[450] text-[var(--n800)] px-3 py-2 align-top')}>
                <code className="text-[12px] bg-[var(--n200)] px-1 py-0.5 rounded-[4px]">
                  {prop.type}
                </code>
              </td>
              <td className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n600)] px-3 py-2 align-top tabular-nums')}>
                {prop.default ?? '—'}
              </td>
              <td className={cn(FONT.body, 'text-[13px] font-[400] text-[var(--n800)] px-3 py-2 align-top')}>
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
