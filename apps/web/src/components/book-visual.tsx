export function BookVisual({ variant = "hero" }: { variant?: "hero" | "small" }) {
  return (
    <div className={`book-scene book-scene-${variant}`} aria-hidden="true">
      <div className="scene-sun" />
      <div className="scene-orbit scene-orbit-one" />
      <div className="scene-orbit scene-orbit-two" />
      <div className="scene-book scene-book-back"><span className="scene-book-lines" /></div>
      <div className="scene-book scene-book-front"><span className="scene-book-label">A LITTLE<br />MORE<br />STORY</span><span className="scene-book-decoration">✳</span></div>
      <div className="scene-caption">A new chapter awaits</div>
    </div>
  );
}
