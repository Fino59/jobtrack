import { useEffect, useState } from 'react';

export type Application = {
  id: string;
  company: string;
  position: string;
};

type ApplicationListProps = {
  fetchApplications: () => Promise<Application[]>;
};

export default function ApplicationList({
  fetchApplications,
}: ApplicationListProps) {
  const [applications, setApplications] = useState<Application[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchApplications().then(setApplications).catch(() => setHasError(true));
  }, [fetchApplications]);

  if (hasError) {
    return <p>Unable to load applications.</p>;
  }

  if (applications === null) {
    return <p>Loading applications...</p>;
  }

  if (applications.length === 0) {
    return <p>No applications found.</p>;
  }

  return (
    <section aria-label="Applications" className="space-y-3">
      {applications.map((application) => (
        <article key={application.id}>
          <h2>{application.company}</h2>
          <p>{application.position}</p>
        </article>
      ))}
    </section>
  );
}
