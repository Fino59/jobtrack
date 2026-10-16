import { useState } from 'react';

const buttonClasses =
  'rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800 disabled:cursor-not-allowed disabled:opacity-50';

export default function ApplicationCounter() {
  const [count, setCount] = useState(0);

  return (
    <section aria-label="Application counter" className="space-y-3">
      <p aria-live="polite" className="text-lg font-semibold text-slate-900">
        Count: {count}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={buttonClasses}
          onClick={() => setCount((current) => current + 1)}
        >
          Increase
        </button>
        <button
          type="button"
          className={buttonClasses}
          onClick={() => setCount((current) => Math.max(0, current - 1))}
          disabled={count === 0}
        >
          Decrease
        </button>
        <button
          type="button"
          className={buttonClasses}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </section>
  );
}
