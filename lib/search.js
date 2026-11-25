export const norm = (s = '') => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
export const words = (s = '') => norm(s).split(/[^a-z0-9]+/).filter(Boolean);
const compact = (s = '') => norm(s).replace(/[^a-z0-9]/g, '');

// Bounded Levenshtein distance (typo tolerance)
function lev(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

export function prepare(items) {
  return items.map((it) => ({
    ...it,
    _t: norm(it.t),
    _tw: words(it.t),
    _g: (it.g || []).map(norm),
    _gw: words((it.g || []).join(' ')),
    _c: norm(it.c || ''),
    _s: norm(it.s || ''),
    _k: compact(`${it.t} ${(it.g || []).join(' ')}`),
  }));
}

function scoreToken(it, tok, fuzzy) {
  let s = 0;
  if (it._t.startsWith(tok)) s = 100;
  else if (it._tw.some((w) => w.startsWith(tok))) s = 80;
  else if (it._t.includes(tok)) s = 60;
  else if (it._g.includes(tok) || it._gw.some((w) => w.startsWith(tok))) s = 50;
  else if (it._c.includes(tok)) s = 30;
  else if (it._s.includes(tok)) s = 20;
  else if (fuzzy && tok.length >= 4) {
    const max = tok.length >= 8 ? 2 : 1;
    const pool = [...it._tw, ...it._gw];
    if (pool.some((w) => lev(tok, w, max) <= max || lev(tok, w.slice(0, tok.length), max) <= max)) s = 10;
  }
  return s;
}

export function search(items, q) {
  const toks = words(q);
  const qc = compact(q);
  if (!toks.length) return { items: [], fuzzy: false };

  const run = (fuzzy) => {
    const out = [];
    for (const it of items) {
      let total = 0, ok = true;
      for (const t of toks) {
        const s = scoreToken(it, t, fuzzy);
        if (!s) { ok = false; break; }
        total += s;
      }
      if (!ok && qc.length >= 3 && it._k.includes(qc)) { ok = true; total = 55; } // "duke390" ↔ "Duke 390"
      if (ok) out.push([total + (it.k === 'post' && it.f ? 3 : 0), it]);
    }
    return out.sort((a, b) => b[0] - a[0]).map((x) => x[1]); // stable → newest first on ties
  };

  const exact = run(false);
  return exact.length ? { items: exact, fuzzy: false } : { items: run(true), fuzzy: true };
}

let promise;
export function loadIndex() {
  promise ??= fetch(`/search-index.json?v=${process.env.NEXT_PUBLIC_BUILD || ''}`)
    .then((r) => { if (!r.ok) throw new Error('index'); return r.json(); })
    .then((d) => prepare(d.items))
    .catch((e) => { promise = null; throw e; });
  return promise;
}