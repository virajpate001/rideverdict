'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MotionProvider = dynamic(() => import('./MotionProvider'), { ssr: false });
const Cursor = dynamic(() => import('./Cursor'), { ssr: false });

export default function Enhancements() {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const run = () => setGo(true);
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(run, { timeout: 1500 });
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(run, 800);
    return () => clearTimeout(t);
  }, []);
  return go ? <><MotionProvider /><Cursor /></> : null;
}