import Link from 'next/link';

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '#product' },
      { label: 'Solutions', href: '#solutions' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Architecture', href: '/docs' },
      { label: 'Package guide', href: '/docs' },
      { label: 'API starter', href: '/docs' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#resources' },
      { label: 'Support', href: '#resources' },
      { label: 'Contact', href: '#resources' },
    ],
  },
];

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border/70 bg-background/70 pt-16 pb-10 text-text-secondary">
      <div className="brand-container grid gap-14 pb-14 lg:grid-cols-[1.4fr_2fr]">
        <div className="space-y-5">
          <p className="text-2xl font-black tracking-tight text-text-primary">
            Platform <span className="text-primary">Template</span>
          </p>
          <p className="max-w-sm text-base leading-relaxed text-text-secondary">
            Production-ready starter for web and edge APIs with reusable feature packages and token-first styling.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-text-secondary/75">{column.title}</p>
              <ul className="space-y-3 text-sm text-text-secondary">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="brand-container flex flex-col gap-4 border-t border-border/70 pt-8 text-sm text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>(c) {year} Platform Template. Built for fast multi-product delivery.</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/docs" className="transition-colors hover:text-primary">
            Documentation
          </Link>
          <Link href="/dashboard" className="transition-colors hover:text-primary">
            Dashboard starter
          </Link>
        </div>
      </div>
    </footer>
  );
}
