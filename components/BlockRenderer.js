import { cld, inline, slugify } from '@/lib/utils';

const addIds = (html) =>
  html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/g, (m, a, t) => `<h2${a} id="${slugify(t)}">${t}</h2>`);

const Html = ({ t, tag: Tag = 'span' }) => <Tag dangerouslySetInnerHTML={{ __html: inline(t) }} />;

export default function BlockRenderer({ blocks }) {
  return blocks.map((b, i) => {
    switch (b.type) {
      case 'h2': return <h2 key={i} id={slugify(b.text)}>{b.text}</h2>;
      case 'h3': return <h3 key={i} id={slugify(b.text)}>{b.text}</h3>;
      case 'p': return <Html key={i} tag="p" t={b.text} />;
      case 'ul': return <ul key={i}>{b.items.map((t, j) => <Html key={j} tag="li" t={t} />)}</ul>;
      case 'ol': return <ol key={i}>{b.items.map((t, j) => <Html key={j} tag="li" t={t} />)}</ol>;
      case 'quote': return <blockquote key={i}>{b.text}</blockquote>;
      case 'callout': return <div key={i} className="callout"><Html t={b.text} /></div>;
      case 'image':
        return (
          <figure key={i}>
            <img src={cld(b.url, 900)} alt={b.alt || ''} loading="lazy" />
            {b.caption && <figcaption>{b.caption}</figcaption>}
          </figure>
        );
      case 'table':
        return (
          <div key={i} className="table-wrap">
            <table>
              <thead><tr>{b.headers.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
              <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}>{c}</td>)}</tr>)}</tbody>
            </table>
          </div>
        );
      case 'prosCons':
        return (
          <div key={i} className="pc">
            <div><h4>👍 Pros</h4><ul>{b.pros.map((t, j) => <li key={j}>{t}</li>)}</ul></div>
            <div><h4>👎 Cons</h4><ul>{b.cons.map((t, j) => <li key={j}>{t}</li>)}</ul></div>
          </div>
        );
      case 'faq':
        return (
          <section key={i}>
            <h2 id="faqs">FAQs</h2>
            {b.items.map((f, j) => <details key={j}><summary>{f.q}</summary><p>{f.a}</p></details>)}
          </section>
        );
      case 'html': return <div key={i} dangerouslySetInnerHTML={{ __html: addIds(b.html) }} />;
      default: return null;
    }
  });
}