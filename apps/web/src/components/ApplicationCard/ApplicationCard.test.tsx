import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationCard from '.';

test('renders the company name and position', () => {
    render(<ApplicationCard id='' company="OpenAI" position="Frontend Developer" status='applied' onDelete={() => {}} />)

    const companyName = screen.getByText('OpenAI');
    const positionName = screen.getByText('Frontend Developer');

    expect(companyName).toBeInTheDocument();
    expect(positionName).toBeInTheDocument();
})

test('calls onDelete when the Delete button is clicked', async () => {
    const mockOnDelete = jest.fn();
    const user = userEvent.setup();

    render(
        <ApplicationCard 
            id='app-123' 
            company="OpenAI" 
            position="Frontend Developer" 
            status="offer"
            onDelete={mockOnDelete} 
        />
    )

    const deleteButton = screen.getByRole('button', {
        name: 'Delete',
    });

    expect(mockOnDelete).not.toHaveBeenCalled();

    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenNthCalledWith(1, 'app-123');
});

test('does not render next-step actions when status is offer', () => {
    render(
        <ApplicationCard
            id='app-123'
            company="OpenAI"
            position="Frontend Developer"
            status="offer"
            onDelete={jest.fn()}
        />
    )

    const companyName = screen.getByText('OpenAI');
    const positionName = screen.getByText('Frontend Developer');

    expect(companyName).toBeInTheDocument();
    expect(positionName).toBeInTheDocument();

    const applyButton = screen.queryByRole('button', {
        name: 'Apply',
    });
    const scheduleButton = screen.queryByRole('button', {
        name: 'Schedule Interview',
    });
    const markAsOfferButton = screen.queryByRole('button', {
        name: 'Mark as Offer',
    });

    expect(applyButton).not.toBeInTheDocument();
    expect(scheduleButton).not.toBeInTheDocument();
    expect(markAsOfferButton).not.toBeInTheDocument();
});

test.each([
    ['wishlist', 'Apply'],
    ['applied', 'Schedule Interview'],
    ['interviewing', 'Mark as Offer'],
] as const)(
    'renders the %s action when status is %s',
    (status, expectedButton) => {
        render(
            <ApplicationCard
                id='app-123'
                company="OpenAI"
                position="Frontend Developer"
                status={status}
                onDelete={jest.fn()}
            />
        )

        const screenButton = screen.getByRole('button', {
            name: expectedButton,
        });        

        expect(screenButton).toBeInTheDocument();
    }
);

test.each([
    ['wishlist', 'Apply'],
    ['applied', 'Schedule Interview'],
    ['interviewing', 'Mark as Offer'],
] as const)(
    'correct renders the action button',
    (status, expectedButton) => {
        render(
            <ApplicationCard
                id='app-123'
                company="OpenAI"
                position="Frontend Developer"
                status={status}
                onDelete={jest.fn()}
            />
        )

        const screenButton = screen.getByRole('button', {
            name: expectedButton,
        });        

        expect(screenButton).toBeInTheDocument();
    }
);

test.each([
    ['wishlist', 'Apply', 'applied'],
    ['applied', 'Schedule Interview', 'interviewing'],
    ['interviewing', 'Mark as Offer', 'offer'],
] as const)(
    'calls onStatusChange when clicking the action for %s status',
    async (status, expectedButton, expectedNextStatus) => {
        const user = userEvent.setup();
        const mockOnStatusChange = jest.fn();        

        render(
            <ApplicationCard
                id='app-123'
                company="OpenAI"
                position="Frontend Developer"
                status={status}
                onDelete={jest.fn()}
                onStatusChange={mockOnStatusChange}
            />
        )

        const screenButton = screen.getByRole('button', {
            name: expectedButton,
        });

        await user.click(screenButton);

        expect(mockOnStatusChange).toHaveBeenCalledWith(
            'app-123',
            expectedNextStatus
        );

        expect(mockOnStatusChange).toHaveBeenCalledTimes(1);
    }
)

test('test for optional callback', async () => {
    const user = userEvent.setup();

    render(
        <ApplicationCard
            id='app-123'
            company="OpenAI"
            position="Frontend Developer"
            status="wishlist"
            onDelete={jest.fn()}
        />
    )

    const applyButton = screen.getByRole('button', {
        name: 'Apply',
    });

    expect(applyButton).toBeInTheDocument();

    await user.click(applyButton);
});