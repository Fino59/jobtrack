import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationSearch, { SearchApplication } from '.';

const applications: SearchApplication[] = [
    {
        id: 'app-001',
        company: 'OpenAI',
        position: 'Frontend Developer',
    },
    {
        id: 'app-002',
        company: 'GitHub',
        position: 'Software Engineer',
    },
];

test('verify if search works', async () => {
    const submitSearch = jest.fn(() => new Promise<SearchApplication[]>(() => { }))

    render(<ApplicationSearch onSearch={submitSearch} />)

    const user = userEvent.setup();

    const searchInput = screen.getByLabelText('Search applications');
    const searchButton = screen.getByRole('button', {
        name: 'Search',
    });


    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();

    await user.type(searchInput, 'OpenAI');

    await user.click(searchButton);

    expect(submitSearch).toHaveBeenCalledWith('OpenAI');

    expect(submitSearch).toHaveBeenCalledTimes(1);
})

test('displays searching status while searching', async () => {
    const submitSearch = jest.fn(() => new Promise<SearchApplication[]>(() => { }))

    render(<ApplicationSearch onSearch={submitSearch} />)

    const user = userEvent.setup();

    const searchInput = screen.getByLabelText('Search applications');
    const searchButton = screen.getByRole('button', {
        name: 'Search',
    });

    await user.type(searchInput, 'OpenAI');

    await user.click(searchButton);

    expect(submitSearch).toHaveBeenCalledWith('OpenAI');

    expect(submitSearch).toHaveBeenCalledTimes(1);

    expect(
        screen.getByText('Searching...')
    ).toBeInTheDocument();

    expect(searchButton).toBeDisabled();
})

test('displays results when search', async () => {
    const submitSearch = jest.fn().mockResolvedValue(applications);

    render(<ApplicationSearch onSearch={submitSearch} />)

    const user = userEvent.setup();

    const searchInput = screen.getByLabelText('Search applications');
    const searchButton = screen.getByRole('button', {
        name: 'Search',
    });

    await user.type(searchInput, 'developer');

    await user.click(searchButton);

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

    expect(submitSearch).toHaveBeenCalledTimes(1);

    expect(
        screen.queryByText('Searching...')
    ).not.toBeInTheDocument();
})

test('shows correct message when there are no applications', async () => {
    const submitSearch = jest.fn().mockResolvedValue([]);

    render(<ApplicationSearch onSearch={submitSearch} />)

    const user = userEvent.setup();

    const searchInput = screen.getByLabelText('Search applications');

    const searchButton = screen.getByRole('button', {
        name: 'Search',
    });

    await user.type(searchInput, 'Nonexistent Company');
    
    await user.click(searchButton);

    expect(submitSearch).toHaveBeenCalledWith('Nonexistent Company');

    expect(submitSearch).toHaveBeenCalledTimes(1);

    expect(await screen.findByText('No applications found.')).toBeInTheDocument();

    expect(
        screen.queryByText('Searching...')
    ).not.toBeInTheDocument();
});

test('displays an error message when searching applications fails', async () => {
    const submitSearch = jest
        .fn()
        .mockRejectedValue(new Error('Network error'));

    render(<ApplicationSearch onSearch={submitSearch} />)

    const user = userEvent.setup();

    const searchInput = screen.getByLabelText('Search applications');
    const searchButton = screen.getByRole('button', {
        name: 'Search',
    });

    await user.type(searchInput, 'OpenAI');
    await user.click(searchButton);

    expect(submitSearch).toHaveBeenCalledWith('OpenAI');
    expect(await screen.findByText('Unable to search applications.')).toBeInTheDocument();

    expect(
        screen.queryByText('Searching...')
    ).not.toBeInTheDocument();

    expect(searchButton).toBeEnabled();
});