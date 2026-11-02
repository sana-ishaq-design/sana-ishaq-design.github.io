import { useEffect, useState } from 'react';

type Preference = 'system' | 'light' | 'dark';
const valid = (value: string | null): value is Preference => value === 'system' || value === 'light' || value === 'dark';

export default function ThemePreference() {
  const [preference, setPreference] = useState<Preference>('system');
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const current = document.documentElement.dataset.preference ?? null;
    if (valid(current)) setPreference(current);
    setReady(true);
  }, []);

  function changePreference(value: Preference) {
    setPreference(value);
    document.documentElement.dataset.preference = value;
    try { localStorage.setItem('portfolio-review-theme', value); } catch { /* In-memory preference still works. */ }
  }

  return <div className="theme-preference">
    <label htmlFor="theme-preference">Appearance</label>
    <select id="theme-preference" value={preference} disabled={!ready} onChange={event => changePreference(event.target.value as Preference)}>
      <option value="system">System</option>
      <option value="light">First Light</option>
      <option value="dark">Juniper Dusk</option>
    </select>
  </div>;
}
