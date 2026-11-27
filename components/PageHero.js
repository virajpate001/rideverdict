export default function PageHero({ eyebrow, lines, children }) {
  return (
    <section className="page-top" style={{ paddingBottom: 'clamp(40px,6vw,72px)' }}>
      <div className="container">
        {eyebrow && <p className="eyebrow intro">{eyebrow}</p>}
        <h1 className="display intro-lines">
          {lines.map((l, i) => <span className="line" key={i}><span>{l}</span></span>)}
        </h1>
        {children && <p className="lead intro" style={{ marginTop: 28, '--d': '.25s' }}>{children}</p>}
      </div>
    </section>
  );
}