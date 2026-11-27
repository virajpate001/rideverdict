'use client';
import { track } from '@/lib/analytics';

const used = new Set();
const once = () => {
  const k = window.location.pathname;
  if (!used.has(k)) { used.add(k); track('calculator_use', { tool: k }); }
};

export default function Field({ label, value, onChange, step = 1 }) {
  return (
    <label className="field">{label}
      <input type="number" inputMode="decimal" min="0" step={step} value={value}
        onChange={(e) => { once(); onChange(Number(e.target.value)); }} />
    </label>
  );
}
export const inr = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);