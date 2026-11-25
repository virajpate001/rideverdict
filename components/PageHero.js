export default function PageHero({ eyebrow, lines, children }) {
  return (
    <section className="page-top" style={{ paddingBottom: 'clamp(40px,6vw,72px)' }}>
      <div className="container">
        {eyebrow && <p className="eyebrow" data-reveal>{eyebrow}</p>}
        <h1 className="display" data-lines>
          {lines.map((l, i) => <span className="line" key={i}><span>{l}</span></span>)}
        </h1>
        {children && <p className="lead" data-reveal data-delay=".3" style={{ marginTop: 28 }}>{children}</p>}
      </div>
    </section>
  );
}