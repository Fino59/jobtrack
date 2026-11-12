import { useRef, useState, type SubmitEvent } from 'react';

export type SearchApplication = {
  id: string;
  company: string;
  position: string;
};

export type ApplicationSearchProps = {
  onSearch: (query: string) => Promise<SearchApplication[]>;
};

const inputClasses =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800';

const buttonClasses =
  'rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800 disabled:cursor-not-allowed disabled:opacity-60';

export default function ApplicationSearch({ onSearch }: ApplicationSearchProps) {
  const [query, setQuery] = useState('');
  const [applications, setApplications] = useState<SearchApplication[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasError, setHasError] = useState(false);
  const requestPending = useRef(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (requestPending.current) return;

    requestPending.current = true;
    setIsSearching(true);
    setHasError(false);
    setApplications(null);

    try {
      setApplications(await onSearch(query));
    } catch {
      setHasError(true);
    } finally {
      requestPending.current = false;
      setIsSearching(false);
    }
  }

  return (
    <section aria-label="Application search" className="space-y-4">
      <form onSubmit={handleSubmit} className="flex max-w-xl items-end gap-2">
        <div className="flex-1 space-y-1">
          <label htmlFor="application-search" className="block text-sm font-medium text-slate-900">
            Search applications
          </label>
          <input
            id="application-search"
            name="query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className={inputClasses}
          />
        </div>
        <button type="submit" disabled={isSearching} className={buttonClasses}>
          Search
        </button>
      </form>

      <div aria-live="polite" aria-busy={isSearching}>
        {isSearching && <p role="status">Searching...</p>}
        {!isSearching && hasError && <p role="alert">Unable to search applications.</p>}
        {!isSearching && !hasError && applications?.length === 0 && (
          <p role="status">No applications found.</p>
        )}
        {!isSearching && !hasError && applications && applications.length > 0 && (
          <ul aria-label="Search results" className="space-y-3">
            {applications.map((application) => (
              <li key={application.id}>
                <article>
                  <h2 className="font-medium text-slate-900">{application.company}</h2>
                  <p>{application.position}</p>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
