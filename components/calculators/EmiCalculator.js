'use client';
import { useState } from 'react';
import Field, { inr } from '../Field';

export default function EmiCalculator() {
  const [price, setPrice] = useState(200000);
  const [down, setDown] = useState(40000);
  const [rate, setRate] = useState(9.5);
  const [years, setYears] = useState(3);

  const P = Math.max(price - down, 0), r = rate / 1200, n = years * 12;
  const emi = !n ? 0 : r === 0 ? P / n : (P * r * (1 + r) ** n) / ((1 + r) ** n - 1);
  const total = emi * n;

  return (
    <div className="calc">
      <div className="form">
        <Field label="Bike on-road price (₹)" value={price} onChange={setPrice} step={1000} />
        <Field label="Down payment (₹)" value={down} onChange={setDown} step={1000} />
        <Field label="Interest rate (% per year)" value={rate} onChange={setRate} step={0.1} />
        <Field label="Loan tenure (years)" value={years} onChange={setYears} />
      </div>
      <div className="result">
        Monthly EMI<strong>{inr(emi)}</strong>
        <p>Loan amount: {inr(P)}</p>
        <p>Total interest: {inr(total - P)}</p>
        <p>Total payable: {inr(total)}</p>
      </div>
    </div>
  );
}