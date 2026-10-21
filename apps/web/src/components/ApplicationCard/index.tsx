type ApplicationCardProps = {
  company: string;
  position: string;
  onDelete: () => void;
};

export default function ApplicationCard({
  company,
  position,
  onDelete,
}: ApplicationCardProps) {
  return (
    <article className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-900">{company}</h2>
        <p className="text-sm text-slate-600">{position}</p>
      </div>
      <button
        type="button"
        className="rounded-md px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-700"
        onClick={onDelete}
      >
        Delete
      </button>
    </article>
  );
}
