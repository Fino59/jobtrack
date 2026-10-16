export type ApplicationStatusValue =
  | 'wishlist'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected';

type ApplicationStatusProps = {
  status: ApplicationStatusValue;
};

const statusDetails: Record<
  ApplicationStatusValue,
  { label: string; colorClasses: string }
> = {
  wishlist: {
    label: 'Wishlist',
    colorClasses: 'bg-slate-100 text-slate-800',
  },
  applied: {
    label: 'Applied',
    colorClasses: 'bg-blue-100 text-blue-800',
  },
  interviewing: {
    label: 'Interviewing',
    colorClasses: 'bg-amber-100 text-amber-900',
  },
  offer: {
    label: 'Offer',
    colorClasses: 'bg-emerald-100 text-emerald-800',
  },
  rejected: {
    label: 'Rejected',
    colorClasses: 'bg-rose-100 text-rose-800',
  },
};

export default function ApplicationStatus({ status }: ApplicationStatusProps) {
  const { label, colorClasses } = statusDetails[status];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-sm font-medium ${colorClasses}`}
    >
      {label}
    </span>
  );
}
