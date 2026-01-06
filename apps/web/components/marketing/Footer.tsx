import Link from 'next/link';

const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '#overview' },
      { label: 'Integrations', href: '#solutions' },
      { label: 'API docs', href: '#resources' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '#resources' },
      { label: 'Case studies', href: '#overview' },
      { label: 'Support', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#solutions' },
      { label: 'Careers', href: '#resources' },
      { label: 'Contact', href: '#pricing' },
    ],
  },
];

export function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">Connected SaaS</p>
          <p className="text-lg font-semibold text-foreground">Platform Template</p>
          <p className="text-sm text-muted-foreground">
            Built for teams that ship with shared tokens, consistent styling, and a mobile-first marketing plus app surface.
          </p>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-6 md:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-2 text-sm">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-muted-foreground">
                {column.title}
              </p>
              <div className="flex flex-col gap-1">
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground transition hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-[0.55rem] uppercase tracking-[0.4em] text-muted-foreground md:px-6">
        <p>&copy; {year} Platform Template. All rights reserved.</p>
      </div>
    </footer>
  );
}
