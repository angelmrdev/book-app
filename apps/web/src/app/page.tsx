import { BookVisual } from "@/components/book-visual";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const features = [
  { number: "01", icon: "◫", title: "Keep your books together", description: "One personal space for what you're reading, what you've finished and everything on your wishlist." },
  { number: "02", icon: "◷", title: "Make progress your own", description: "Follow your reading journey with sessions, progress and meaningful insights as you go." },
  { number: "03", icon: "✳", title: "Find what comes next", description: "Explore books, curated collections and stories that spark your curiosity." },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="site-container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> YOUR READING PARTNER</div>
              <h1 id="hero-title">Every book is part of <em>your story.</em></h1>
              <p className="hero-lede">A thoughtful space to discover books, build your library and enjoy every chapter of your reading journey.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#reading-space">Start your reading journey <span aria-hidden="true">↗</span></a>
                <a className="text-link" href="#discover">Explore the platform <span aria-hidden="true">↓</span></a>
              </div>
              <div className="hero-footnote"><span className="mini-star" aria-hidden="true">✳</span> For curious minds and book lovers everywhere.</div>
            </div>
            <BookVisual />
          </div>
        </section>

        <section id="reading-space" className="reading-section" aria-labelledby="reading-title">
          <div className="site-container reading-grid">
            <div className="reading-intro">
              <span className="section-kicker">01 / YOUR SPACE</span>
              <h2 id="reading-title">Your books.<br /><em>Your pace.</em></h2>
              <p>Your reading life deserves a home. Keep track of your books, revisit your favorites and see how far you’ve come.</p>
              <div className="availability-note"><span className="note-dot" /> Personal library and accounts are coming soon.</div>
            </div>
            <div className="dashboard-preview" aria-label="Illustrative preview of the future reading dashboard">
              <div className="preview-top"><span className="preview-overline">A LOOK AHEAD</span><span className="preview-pill">Concept preview</span></div>
              <h3>My reading space</h3>
              <div className="preview-stats">
                <div><strong>12</strong><span>Books read</span></div>
                <div><strong>03</strong><span>Reading now</span></div>
                <div><strong>08</strong><span>Want to read</span></div>
              </div>
              <div className="preview-book-row">
                <div className="preview-book-cover"><span>THE<br />NEXT<br />PAGE</span></div>
                <div className="preview-book-content"><span className="preview-overline">CURRENTLY READING</span><strong>Your next favorite book</strong><span>Every page counts.</span><div className="progress-track"><span /></div><small>Example progress · 64%</small></div>
              </div>
              <p className="preview-disclaimer">Illustrative sample data — not a live tracker.</p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="features-section" aria-labelledby="features-title">
          <div className="site-container">
            <div className="section-heading"><div><span className="section-kicker">02 / MADE FOR READERS</span><h2 id="features-title">A better way to <em>read along.</em></h2></div><p>Everything you need to make reading a little more personal, in one beautiful place.</p></div>
            <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.number}><div className="feature-card-top"><span className="feature-icon" aria-hidden="true">{feature.icon}</span><span className="feature-number">{feature.number}</span></div><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
          </div>
        </section>

        <section id="discover" className="discover-section" aria-labelledby="discover-title">
          <div className="site-container discover-grid">
            <div className="discover-art"><BookVisual variant="small" /></div>
            <div className="discover-copy"><span className="section-kicker">03 / DISCOVER MORE</span><h2 id="discover-title">There&apos;s always <em>another story.</em></h2><p>From thoughtful reading guides to handpicked collections, we&apos;re creating a space where your next great read is never far away.</p><span className="coming-soon-label">BOOK DISCOVERY & EDITORIAL · COMING SOON</span></div>
          </div>
        </section>

        <section id="stories" className="closing-section"><div className="site-container closing-inner"><span className="section-kicker">A PLACE TO BELONG</span><h2>For the love of <em>reading.</em></h2><p>Whether you&apos;re starting your first book or your hundredth, your reading story belongs here.</p><a className="button button-dark" href="#main-content">Back to the beginning <span aria-hidden="true">↑</span></a></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
