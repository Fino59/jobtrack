export type ApplicationCardStatus =
  | 'wishlist'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected';

type ApplicationCardProps = {
  id: string;
  company: string;
  position: string;
  status: ApplicationCardStatus;
  onDelete: (id: string) => void;
  onStatusChange?: (id: string, newStatus: string) => void;
};

const nextStepDetails: Partial<
  Record<ApplicationCardStatus, { label: string; status: string }>
> = {
  wishlist: { label: 'Apply', status: 'applied' },
  applied: { label: 'Schedule Interview', status: 'interviewing' },
  interviewing: { label: 'Mark as Offer', status: 'offer' },
};

export default function ApplicationCard({
  id,
  company,
  position,
  status,
  onDelete,
  onStatusChange,
}: ApplicationCardProps) {
  const nextStep = nextStepDetails[status];

  return (
    <article className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900">{company}</h2>
        <p className="text-sm text-slate-600">{position}</p>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        {nextStep && (
          <button
            type="button"
            className="rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
            onClick={() => onStatusChange?.(id, nextStep.status)}
          >
            {nextStep.label}
          </button>
        )}
        <button
          type="button"
          className="rounded-md px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
