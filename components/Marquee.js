export default function Marquee({ items, speed = 40 }) {
  const row = (hidden) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  );
  return (
    <div className="marquee" style={{ '--speed': `${speed}s` }}>
      <div className="marquee-track">{row(false)}{row(true)}</div>
    </div>
  );
}