'use client';
import { useState } from 'react';
import site from '@/content/site.json';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    const data = Object.fromEntries(new FormData(e.target));
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: site.web3formsKey, subject: 'New message from RideVerdict', ...data }),
      });
      const j = await r.json();
      setStatus(j.success ? 'sent' : 'error');
      if (j.success) e.target.reset();
    } catch { setStatus('error'); }
  }
  return (
    <form className="form" onSubmit={submit}>
      <label className="field">Name<input name="name" required /></label>
      <label className="field">Email<input type="email" name="email" required /></label>
      <label className="field">Message<textarea name="message" rows="5" required /></label>
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
      <button className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send Message'}</button>
      {status === 'sent' && <p>✅ Thanks! We’ll get back to you soon.</p>}
      {status === 'error' && <p>Something went wrong. Please email {site.email}.</p>}
    </form>
  );
}