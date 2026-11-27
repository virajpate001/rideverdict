'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import site from '@/content/site.json';
import { track } from '@/lib/analytics';

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

function makeChallenge() {
  const op = ['+', '−', '×'][rand(0, 2)];
  let a, b, answer;
  if (op === '+') { a = rand(2, 15); b = rand(2, 15); answer = a + b; }
  else if (op === '−') { a = rand(10, 25); b = rand(1, 9); answer = a - b; } // never negative
  else { a = rand(2, 9); b = rand(2, 9); answer = a * b; }
  return { text: `${a} ${op} ${b}`, answer };
}

export default function ContactForm() {
  const [challenge, setChallenge] = useState(null); // generated after mount (avoids hydration mismatch)
  const [captcha, setCaptcha] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error | captcha | fast
  const loadedAt = useRef(0);

  const refresh = useCallback(() => {
    setChallenge(makeChallenge());
    setCaptcha('');
  }, []);

  useEffect(() => {
    refresh();
    loadedAt.current = Date.now();
  }, [refresh]);

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!challenge) return;

    // 1) Math answer must be correct
    const given = captcha.trim();
    if (!/^-?\d+$/.test(given) || Number(given) !== challenge.answer) {
      setStatus('captcha');
      refresh();
      return;
    }
    // 2) Real people take more than a couple of seconds to fill a form
    if (Date.now() - loadedAt.current < 2500) {
      setStatus('fast');
      return;
    }

    setStatus('sending');
    const data = Object.fromEntries(new FormData(form)); // captcha input has no name, so it isn't sent
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: site.web3formsKey, subject: 'New message from RideVerdict', ...data }),
      });
      const j = await r.json();
      if (j.success) {
        track('generate_lead', { form: 'contact' });
        setStatus('sent');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    refresh();
  }

  return (
    <form className="form" onSubmit={submit} noValidate={false}>
      <label className="field">Name<input name="name" required autoComplete="name" /></label>
      <label className="field">Email<input type="email" name="email" required autoComplete="email" /></label>
      <label className="field">Message<textarea name="message" rows="5" required /></label>

      {/* Honeypot: hidden from people, bots tend to tick it */}
      <input type="checkbox" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {/* Math captcha */}
      <div className="captcha">
        <label htmlFor="captcha-input" className="field" style={{ display: 'block' }}>Security check</label>
        <div className="captcha-box">
          <span className="captcha-q" aria-live="polite">
            {challenge ? <>{challenge.text} <em>=</em></> : '… = '}
          </span>
          <input
            id="captcha-input"
            className="captcha-input"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Answer"
            aria-describedby="captcha-help"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            required
          />
          <button type="button" className="icon-btn captcha-refresh" onClick={refresh} aria-label="New question" title="New question">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v5h-5" />
            </svg>
          </button>
        </div>
        <small id="captcha-help" className="captcha-help">Solve the sum to prove you’re human.</small>
      </div>

      <button className="btn" disabled={status === 'sending' || !challenge}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      <div aria-live="polite">
        {status === 'sent' && <p className="form-msg ok">✅ Thanks! We’ll get back to you soon.</p>}
        {status === 'captcha' && <p className="form-msg err">That answer wasn’t right. Please try the new question.</p>}
        {status === 'fast' && <p className="form-msg err">That was quick! Please wait a moment and submit again.</p>}
        {status === 'error' && <p className="form-msg err">Something went wrong. Please email {site.email}.</p>}
      </div>
    </form>
  );
}