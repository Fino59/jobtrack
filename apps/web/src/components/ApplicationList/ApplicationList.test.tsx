import { render, screen } from '@testing-library/react';
import ApplicationList, { Application } from '.';

const applications: Application[] = [
    {
        id: "app-001",
        company: "OpenAI",
        position: "Frontend Developer",
    },
    {
        id: "app-002",
        company: "GitHub",
        position: "Software Engineer",
    },
    // {
    //     id: "app-003",
    //     company: "Initech",
    //     position: "UI/UX Designer",
    // },
];

test('shows loading state while fetching', async () => {
    const fetchApplications = jest.fn(() => new Promise<Application[]>(() => { }));

    render(<ApplicationList fetchApplications={fetchApplications} />);

    expect(screen.getByText('Loading applications...')).toBeInTheDocument();
})

test('renders the list of applications', async () => {
    const fetchApplications = jest.fn().mockResolvedValue(applications);

    render(<ApplicationList fetchApplications={fetchApplications} />);

    expect(
        await screen.findByText('OpenAI')
    ).toBeInTheDocument();
    expect(
        await screen.findByText('Frontend Developer')
    ).toBeInTheDocument();
    expect(
        await screen.findByText('GitHub')
    ).toBeInTheDocument();
    expect(
        await screen.findByText('Software Engineer')
    ).toBeInTheDocument();

    expect(fetchApplications).toHaveBeenCalledTimes(1);

    expect(
        screen.queryByText('Loading applications...')
    ).not.toBeInTheDocument();
});

test('shows empty state when there are no applications', async () => {
    const fetchApplications = jest.fn().mockResolvedValue([]);

    render(<ApplicationList fetchApplications={fetchApplications} />);

    expect(await screen.findByText('No applications found.')).toBeInTheDocument();
});

test('displays an error message when fetching applications fails', async () => {
    const fetchApplications = jest
        .fn()
        .mockRejectedValue(new Error('Network error'));

    render(<ApplicationList fetchApplications={fetchApplications} />);

    expect(await screen.findByText('Unable to load applications.')).toBeInTheDocument();
});