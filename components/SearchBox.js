'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchBox({ index }) {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const results = term ? index.filter((p) => `${p.title} ${p.excerpt}`.toLowerCase().includes(term)) : [];
  return (
    <>
      <input type="search" placeholder="Search bikes, reviews, guides…" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
      <div style={{ marginTop: 24 }}>
        {term && !results.length && <p>No results for “{q}”.</p>}
        {results.map((p) => (
          <p key={p.slug}><strong><Link href={`/${p.slug}/`}>{p.title}</Link></strong><br /><span className="meta">{p.excerpt}</span></p>
        ))}
      </div>
    </>
  );
}