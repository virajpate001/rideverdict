'use client';
import { useState } from 'react';
import Field, { inr } from '../Field';

export default function FuelCalculator() {
  const [km, setKm] = useState(1000);
  const [mileage, setMileage] = useState(40);
  const [price, setPrice] = useState(105);

  const monthly = mileage ? (km / mileage) * price : 0;
  return (
    <div className="calc">
      <div className="form">
        <Field label="Distance per month (km)" value={km} onChange={setKm} step={50} />
        <Field label="Mileage (km/l)" value={mileage} onChange={setMileage} />
        <Field label="Petrol price (₹/litre)" value={price} onChange={setPrice} step={0.5} />
      </div>
      <div className="result">
        Monthly fuel cost<strong>{inr(monthly)}</strong>
        <p>Yearly: {inr(monthly * 12)}</p>
        <p>Cost per km: ₹{km ? (monthly / km).toFixed(2) : 0}</p>
        <p>Litres per month: {mileage ? (km / mileage).toFixed(1) : 0}</p>
      </div>
    </div>
  );
}