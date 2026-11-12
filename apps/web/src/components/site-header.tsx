import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="brand" aria-label="Reading Platform home">
          <span className="brand-mark" aria-hidden="true">✳</span>
          <span>reading<span className="brand-dot">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#how-it-works">How it works</a>
          <a href="#stories">Stories</a>
        </nav>
        <div className="header-actions">
          <a className="header-signin" href="#reading-space">My reading space</a>
          <a className="button button-small button-dark" href="#reading-space">Get started <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </header>
  );
}
