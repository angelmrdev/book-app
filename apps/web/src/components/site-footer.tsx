import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-inner">
        <div>
          <Link href="/" className="brand footer-brand">reading<span className="brand-dot">.</span></Link>
          <p>Your reading partner. A place for every story.</p>
        </div>
        <div className="footer-links" aria-label="Footer navigation">
          <a href="#discover">Discover</a>
          <a href="#how-it-works">About the platform</a>
          <a href="mailto:hello@example.invalid" aria-disabled="true" className="placeholder-link" tabIndex={-1}>Contact (coming soon)</a>
        </div>
      </div>
      <div className="site-container footer-bottom">© Reading Platform · Working brand and preview content</div>
    </footer>
  );
}
