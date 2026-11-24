export default function Field({ label, value, onChange, step = 1 }) {
  return (
    <label className="field">{label}
      <input type="number" inputMode="decimal" min="0" step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}
export const inr = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0);