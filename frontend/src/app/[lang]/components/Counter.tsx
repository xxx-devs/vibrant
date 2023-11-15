'use client';

import { useState } from 'react';
import { useTranslation } from '@/app/i18n/useTranslation.client';

export default function Counter() {
  const [count, setCount] = useState(0);
  const t = useTranslation();

  return (
    <p>
      This compoment is rendered on client:
      <button onClick={() => setCount((n) => n - 1)}>{t((d) => d.counter.decrement)}</button>
      {count}
      <button onClick={() => setCount((n) => n + 1)}>{t((d) => d.counter.increment)}</button>
    </p>
  );
}
