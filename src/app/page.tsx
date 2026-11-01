export default function SmokeTestPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <p className="text-overline text-primary">Learn · Develop · Lead</p>
      <h1 className="text-display-xl mt-2 text-ink">
        Build Business Skills for Real <span className="text-accent-strong">Career Growth.</span>
      </h1>
      <p className="text-body-lg mt-3 text-ink-muted">Foundation smoke test — tokens, fonts, utilities.</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-md bg-primary px-5 py-3 text-label text-on-dark shadow-sm">Primary</span>
        <span className="rounded-md bg-accent px-5 py-3 text-label text-ink">Accent</span>
        <span className="rounded-pill bg-primary-50 px-5 py-3 text-label text-primary">Pill</span>
        <span className="rounded-lg bg-navy-900 px-5 py-3 text-label text-on-dark shadow-lg">Navy</span>
      </div>
    </main>
  );
}
