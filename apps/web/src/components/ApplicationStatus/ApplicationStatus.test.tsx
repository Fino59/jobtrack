
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplicationStatus from '.';

test.each([
    ['applied', 'Applied'],
    ['interviewing', 'Interviewing'],
    ['offer', 'Offer'],
] as const)(
    'displays %s status as %s',
    (status, label) => {
        render(<ApplicationStatus status={status} />);

        expect(
            screen.getByText(label)
        ).toBeInTheDocument();
    }
);


test('displays Applied but not Rejected when status is applied', () => {
    render(<ApplicationStatus status="applied" />);

    expect(screen.getByText('Applied')).toBeInTheDocument();

    expect(screen.queryByText('Rejected')).not.toBeInTheDocument();
});