'use client';
import { useState } from 'react';
import Field, { inr } from '../Field';

export default function MaintenanceCalculator() {
  const [kmYear, setKmYear] = useState(8000);
  const [interval, setIntervalKm] = useState(3000);
  const [service, setService] = useState(1500);
  const [tyre, setTyre] = useState(6000);
  const [tyreLife, setTyreLife] = useState(25000);
  const [chain, setChain] = useState(3000);
  const [chainLife, setChainLife] = useState(20000);
  const [other, setOther] = useState(2000);

  const div = (a, b) => (b ? a / b : 0);
  const services = div(kmYear, interval) * service;
  const tyres = div(kmYear, tyreLife) * tyre;
  const chains = div(kmYear, chainLife) * chain;
  const yearly = services + tyres + chains + other;

  return (
    <div className="calc">
      <div className="form">
        <Field label="Distance per year (km)" value={kmYear} onChange={setKmYear} step={500} />
        <Field label="Service interval (km)" value={interval} onChange={setIntervalKm} step={500} />
        <Field label="Cost per service (₹)" value={service} onChange={setService} step={100} />
        <Field label="Tyre set cost (₹)" value={tyre} onChange={setTyre} step={500} />
        <Field label="Tyre life (km)" value={tyreLife} onChange={setTyreLife} step={1000} />
        <Field label="Chain-sprocket kit cost (₹)" value={chain} onChange={setChain} step={500} />
        <Field label="Chain kit life (km)" value={chainLife} onChange={setChainLife} step={1000} />
        <Field label="Other yearly costs (₹)" value={other} onChange={setOther} step={500} />
      </div>
      <div className="result">
        Estimated yearly maintenance<strong>{inr(yearly)}</strong>
        <p>Servicing: {inr(services)}</p>
        <p>Tyres: {inr(tyres)}</p>
        <p>Chain kit: {inr(chains)}</p>
        <p>Per km: ₹{kmYear ? (yearly / kmYear).toFixed(2) : 0}</p>
      </div>
    </div>
  );
}