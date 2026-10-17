import { useState, type FormEvent } from 'react';

const inputClasses =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800';

const buttonClasses =
  'rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800';

export default function ApplicationForm() {
  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!companyName.trim() || !position.trim()) {
      return;
    }

    setIsSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div className="space-y-1">
        <label htmlFor="company-name" className="block text-sm font-medium text-slate-900">
          Company Name
        </label>
        <input
          id="company-name"
          name="companyName"
          type="text"
          required
          value={companyName}
          onChange={(event) => {
            setCompanyName(event.target.value);
            setIsSubmitted(false);
          }}
          className={inputClasses}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="position" className="block text-sm font-medium text-slate-900">
          Position
        </label>
        <input
          id="position"
          name="position"
          type="text"
          required
          value={position}
          onChange={(event) => {
            setPosition(event.target.value);
            setIsSubmitted(false);
          }}
          className={inputClasses}
        />
      </div>

      <button type="submit" className={buttonClasses}>
        Add Application
      </button>

      {isSubmitted && (
        <p role="status" className="text-sm font-medium text-emerald-700">
          Application added successfully!
        </p>
      )}
    </form>
  );
}
