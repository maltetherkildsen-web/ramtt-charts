import { cn, FONT } from '@/lib/ui'
import { COMPONENT_DOCS } from '@/lib/docs/registry'
import Link from 'next/link'

export default function ComponentsIndexPage() {
  const components = Object.values(COMPONENT_DOCS).filter(c => c.category === 'components')

  return (
    <div className="space-y-8">
      <div>
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Components
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)] mt-2')}>
          {components.length} UI components built with zero dependencies. Every component uses
          Satoshi, 0.5px borders, and the warm neutral token scale.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {components.map((comp) => (
          <Link key={comp.slug} href={`/components/${comp.slug}`} className="group">
            <div className={cn(
              'bg-[var(--n50)]',
              'border-[0.5px] border-[var(--n400)]',
              'rounded-[12px] p-4',
              'transition-[background-color] duration-150',
              'group-hover:bg-white',
            )}>
              <div className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)]')}>
                {comp.name}
              </div>
              <div className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)] mt-1 line-clamp-2')}>
                {comp.description}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
