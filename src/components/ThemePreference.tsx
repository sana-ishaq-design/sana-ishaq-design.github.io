import { useEffect, useState } from 'react';

type Preference = 'system' | 'light' | 'dark';
const valid = (value: string | null): value is Preference => value === 'system' || value === 'light' || value === 'dark';

export default function ThemePreference() {
  const [preference, setPreference] = useState<Preference>('system');
  const [systemDark, setSystemDark] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const current = document.documentElement.dataset.preference ?? null;
    if (valid(current)) setPreference(current);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(media.matches);
    const updateSystem = () => setSystemDark(media.matches);
    media.addEventListener('change', updateSystem);
    setReady(true);
    return () => media.removeEventListener('change', updateSystem);
  }, []);

  function changePreference(value: Preference) {
    setPreference(value);
    document.documentElement.dataset.preference = value;
    try { localStorage.setItem('portfolio-review-theme', value); } catch { /* In-memory preference still works. */ }
  }

  const dark = preference === 'dark' || (preference === 'system' && systemDark);
  const label = ready ? `Switch to ${dark ? 'light' : 'dark'} mode` : 'Theme switching requires JavaScript';
  return <button id="theme-preference" className="theme-toggle" type="button" disabled={!ready}
    aria-label={label} title={label} onClick={() => changePreference(dark ? 'light' : 'dark')}>
    <svg className="theme-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" /></svg>
    <svg className="theme-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  </button>;
}
