'use client';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { loadIndex, search, norm, words } from '@/lib/search';
import { formatDate } from '@/lib/utils';

/* ---------- icons ---------- */
const I = (p) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p} />
);
const SearchIcon = () => <I width="22" height="22"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></I>;
const ClockIcon = () => <I><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></I>;
const HashIcon = () => <I><path d="M5 9h14M5 15h14M10 4 8 20M16 4l-2 16" /></I>;
const ToolIcon = () => <I><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2" /></I>;
const DocIcon = () => <I><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5M10 13h6M10 17h6" /></I>;
const EnterIcon = () => <I width="18" height="18"><path d="M20 5v7a3 3 0 0 1-3 3H5M9 11l-4 4 4 4" /></I>;
const XIcon = () => <I width="16" height="16"><path d="M6 6l12 12M18 6 6 18" /></I>;

/* ---------- helpers ---------- */
const KEY = 'rv-recent';
const readRecent = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const writeRecent = (a) => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch {} };

function Hl({ text, q }) {
  const toks = words(q).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (!toks.length) return text;
  return text.split(new RegExp(`(${toks.join('|')})`, 'gi')).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

function Row({ row, i, cur, q, onPick, onHover }) {
  const Icon = { category: HashIcon, tool: ToolIcon, recent: ClockIcon }[row.k] || DocIcon;
  const sub = row.k === 'post' ? `${row.c} · ${formatDate(row.d)}` : row.k === 'recent' ? 'Recently opened' : row.s;
  return (
    <li
      id={`sm-opt-${i}`}
      role="option"
      aria-selected={cur === i}
      className="sm-opt"
      onMouseMove={() => cur !== i && onHover(i)}
      onClick={() => onPick(row)}
    >
      <span className="sm-thumb">
        {row.i ? <img src={row.i} alt="" width="52" height="52" loading="lazy" /> : <Icon />}
      </span>
      <span className="sm-txt">
        <span className="sm-title"><Hl text={row.t} q={q} /></span>
        <span className="sm-sub">{sub}</span>
      </span>
      <span className="sm-go"><EnterIcon /></span>
    </li>
  );
}

/* ---------- modal ---------- */
export default function SearchModal({ open, onClose }) {
  const router = useRouter();
  const calm = useReducedMotion();
  const inputRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const [items, setItems] = useState(null);
  const [failed, setFailed] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(-1);
  const [recents, setRecents] = useState([]);

  // Lifecycle: load index, lock scroll, focus input, Esc to close
  useEffect(() => {
    if (!open) return;
    setQ(''); setActive(-1); setFailed(false); setRecents(readRecent());
    loadIndex().then(setItems).catch(() => setFailed(true));
    document.documentElement.classList.add('search-open');
    window.__lenis?.stop();
    const f = requestAnimationFrame(() => inputRef.current?.focus());
    const onEsc = (e) => e.key === 'Escape' && closeRef.current();
    window.addEventListener('keydown', onEsc);
    return () => {
      cancelAnimationFrame(f);
      window.removeEventListener('keydown', onEsc);
      document.documentElement.classList.remove('search-open');
      window.__lenis?.start();
    };
  }, [open]);

  /* ---- data ---- */
  const { tags, popular, tools, cats } = useMemo(() => {
    if (!items) return { tags: [], popular: [], tools: [], cats: [] };
    const posts = items.filter((i) => i.k === 'post');
    const count = {};
    posts.forEach((p) => (p.g || []).forEach((t) => { count[t] = (count[t] || 0) + 1; }));
    return {
      tags: Object.keys(count).sort((a, b) => count[b] - count[a]),
      popular: [...posts].sort((a, b) => (b.f ? 1 : 0) - (a.f ? 1 : 0)).slice(0, 4),
      tools: items.filter((i) => i.k === 'tool'),
      cats: items.filter((i) => i.k === 'category'),
    };
  }, [items]);

  const searching = q.trim().length > 0;
  const res = useMemo(() => (items && searching ? search(items, q) : { items: [], fuzzy: false }), [items, q, searching]);
  const none = searching && !!items && res.items.length === 0;

  const sections = useMemo(() => {
    if (!items) return [];
    if (searching && !none) {
      const by = (k) => res.items.filter((r) => r.k === k);
      return [
        { title: 'Articles', rows: by('post').slice(0, 6) },
        { title: 'Topics', rows: by('category').slice(0, 3) },
        { title: 'Tools', rows: by('tool').slice(0, 3) },
      ].filter((s) => s.rows.length);
    }
    if (none) return [{ title: 'Popular reads', rows: popular }];
    return [
      { title: 'Recent', rows: recents.map((r) => ({ ...r, k: 'recent' })), clear: true },
      { title: 'Popular reads', rows: popular },
      { title: 'Free tools', rows: tools },
    ].filter((s) => s.rows.length);
  }, [items, searching, none, res, popular, tools, recents]);

  const flat = useMemo(() => sections.flatMap((s) => s.rows), [sections]);
  const cur = none ? -1 : Math.min(active, flat.length - 1);

  // Inline autocomplete (ghost text): tags first (short), then top article titles
  const ghostFull = useMemo(() => {
    if (!items || q.trim().length < 2) return '';
    const nq = norm(q);
    const cands = [...tags, ...res.items.filter((r) => r.k === 'post').slice(0, 5).map((r) => r.t)];
    return cands.find((c) => c.length > q.length && norm(c).startsWith(nq)) || '';
  }, [items, q, tags, res]);

  useEffect(() => {
    if (cur >= 0) document.getElementById(`sm-opt-${cur}`)?.scrollIntoView({ block: 'nearest' });
  }, [cur]);

  /* ---- actions ---- */
  const go = (url) => { closeRef.current(); router.push(url); };
  const pick = (row) => {
    writeRecent([{ t: row.t, u: row.u, i: row.i || '' }, ...readRecent().filter((r) => r.u !== row.u)].slice(0, 5));
    go(row.u);
  };
  const type = (v) => { setQ(v); setActive(v.trim() ? 0 : -1); inputRef.current?.focus(); };
  const clearRecents = () => { writeRecent([]); setRecents([]); };

  const onKey = (e) => {
    const n = flat.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); if (n) setActive((cur + 1) % n); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (n) setActive(cur <= 0 ? n - 1 : cur - 1); }
    else if (e.key === 'Enter') { if (flat[cur]) { e.preventDefault(); pick(flat[cur]); } }
    else if (e.key === 'Tab') { e.preventDefault(); if (ghostFull) type(ghostFull); }
    else if (e.key === 'ArrowRight' && ghostFull && e.currentTarget.selectionStart === q.length) { e.preventDefault(); type(ghostFull); }
    else if (e.key === 'Escape' && q) { e.preventDefault(); e.stopPropagation(); type(''); } // 1st Esc clears, 2nd closes
  };

  const status = !items ? '' : searching ? `${res.items.length} result${res.items.length === 1 ? '' : 's'}` : `${items.filter((i) => i.k === 'post').length} articles`;
  const t = calm ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

  let n = 0; // running option index across sections
  const ghostRest = ghostFull ? ghostFull.slice(q.length) : '';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div key="sm" className="sm-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={t}>
          <div className="sm-backdrop" onMouseDown={() => closeRef.current()} />
          <motion.div
            className="sm"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ y: -18, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -12, scale: 0.98 }}
            transition={t}
          >
            {/* input row */}
            <div className="sm-field">
              <span style={{ color: 'var(--accent)', display: 'flex' }}><SearchIcon /></span>
              <div className="sm-input-wrap">
                <div className="sm-ghost" aria-hidden="true">{q}<em>{ghostRest}</em></div>
                <input
                  ref={inputRef}
                  className="sm-input"
                  type="text"
                  role="combobox"
                  aria-expanded={flat.length > 0}
                  aria-controls="sm-list"
                  aria-activedescendant={cur >= 0 ? `sm-opt-${cur}` : undefined}
                  aria-autocomplete="both"
                  aria-label="Search RideVerdict"
                  placeholder="Search bikes, reviews, guides…"
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setActive(e.target.value.trim() ? 0 : -1); }}
                  onKeyDown={onKey}
                  autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} enterKeyHint="search"
                />
              </div>
              {ghostFull && <button type="button" tabIndex={-1} className="sm-tab" onClick={() => type(ghostFull)}>Tab</button>}
              {q && <button type="button" tabIndex={-1} className="sm-x" aria-label="Clear search" onClick={() => type('')}><XIcon /></button>}
              <kbd className="esc">Esc</kbd>
              <button type="button" tabIndex={-1} className="sm-close" onClick={() => closeRef.current()}>Close</button>
            </div>

            {/* body */}
            <div className="sm-body" data-lenis-prevent>
              {!items && !failed && <><div className="sk" /><div className="sk" /><div className="sk" /></>}
              {failed && <div className="sm-empty"><strong>Search is unavailable right now</strong>Please try again in a moment.</div>}

              {items && !searching && tags.length > 0 && (
                <>
                  <div className="sm-sec"><span>Trending searches</span></div>
                  <div className="sm-chips">
                    {tags.slice(0, 6).map((tag) => (
                      <button key={tag} type="button" tabIndex={-1} className="sm-chip" onClick={() => type(tag)}>{tag}</button>
                    ))}
                  </div>
                </>
              )}

              {none && (
                <div className="sm-empty">
                  <strong>No results for “{q.trim()}”</strong>
                  Try a different keyword, or explore a topic:
                  <div className="sm-chips" style={{ justifyContent: 'center', marginTop: 16 }}>
                    {cats.map((c) => <button key={c.u} type="button" tabIndex={-1} className="sm-chip" onClick={() => go(c.u)}>{c.t}</button>)}
                  </div>
                </div>
              )}

              {searching && res.fuzzy && !none && <p className="sm-note">Showing close matches for “{q.trim()}”</p>}

              <ul id="sm-list" role="listbox" aria-label="Search results" className="sm-list">
                {sections.map((s) => (
                  <Fragment key={s.title}>
                    <li role="presentation" className="sm-sec">
                      <span>{s.title}</span>
                      {s.clear && <button type="button" tabIndex={-1} onClick={clearRecents}>Clear</button>}
                    </li>
                    {s.rows.map((row) => {
                      const i = n++;
                      return <Row key={`${s.title}-${row.u}`} row={row} i={i} cur={cur} q={q} onPick={pick} onHover={setActive} />;
                    })}
                  </Fragment>
                ))}
              </ul>
            </div>

            <div className="sm-foot">
              <div className="hints">
                <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
                <span><kbd>↵</kbd> Open</span>
                <span><kbd>Tab</kbd> Autocomplete</span>
              </div>
              <span aria-hidden="true">{status}</span>
            </div>
            <p className="sr-only" aria-live="polite">{searching ? status : ''}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}