import { useState, type SubmitEvent } from 'react';

export type ApplicationSubmitFormProps = {
  onSubmit: (application: { company: string; position: string }) => Promise<void>;
};

const inputClasses =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800';

const buttonClasses =
  'rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800 disabled:cursor-not-allowed disabled:opacity-60';

export default function ApplicationSubmitForm({ onSubmit }: ApplicationSubmitFormProps) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [hasError, setHasError] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setHasError(false);
    setIsSubmitting(true);

    try {
      await onSubmit({ company, position });
      setMessage('Application submitted successfully!');
      setCompany('');
      setPosition('');
    } catch {
      setMessage('Unable to submit application.');
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div className="space-y-1">
        <label htmlFor="submit-company" className="block text-sm font-medium text-slate-900">
          Company Name
        </label>
        <input
          id="submit-company"
          name="company"
          type="text"
          required
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className={inputClasses}
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="submit-position" className="block text-sm font-medium text-slate-900">
          Position
        </label>
        <input
          id="submit-position"
          name="position"
          type="text"
          required
          value={position}
          onChange={(event) => setPosition(event.target.value)}
          className={inputClasses}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className={buttonClasses}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>

      {message && (
        <p
          role={hasError ? 'alert' : 'status'}
          className={`text-sm font-medium ${hasError ? 'text-red-700' : 'text-emerald-700'}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
