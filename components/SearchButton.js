'use client';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { loadIndex } from '@/lib/search';

const SearchModal = dynamic(() => import('./SearchModal'), { ssr: false });

export default function SearchButton() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // stays mounted after first open (exit animation)
  const btn = useRef(null);

  const show = useCallback(() => { setMounted(true); setOpen(true); }, []);
  const hide = useCallback(() => { setOpen(false); btn.current?.focus(); }, []);
  const warm = () => loadIndex().catch(() => {});

  useEffect(() => {
    const onKey = (e) => {
      const typing = e.target.closest?.('input,textarea,select,[contenteditable="true"]');
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setMounted(true);
        setOpen((o) => !o);
      } else if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-search', show); // any element can call: window.dispatchEvent(new Event('open-search'))
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-search', show);
    };
  }, [show]);

  return (
    <>
      <button
        ref={btn}
        className="icon-btn"
        aria-label="Search"
        aria-haspopup="dialog"
        title="Search (Ctrl K)"
        onClick={show}
        onPointerEnter={warm}
        onFocus={warm}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
        </svg>
      </button>
      {mounted && <SearchModal open={open} onClose={hide} />}
    </>
  );
}