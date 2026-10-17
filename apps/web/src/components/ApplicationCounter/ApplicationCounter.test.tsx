import userEvent from '@testing-library/user-event';
import ApplicationCounter from '.';
import { render, screen } from '@testing-library/react';


test('increments the counter when Increase is clicked', async () => {
    const user = userEvent.setup();

    render(<ApplicationCounter />);

    const increaseButton = screen.getByRole('button', {
        name: 'Increase',
    });

    // Initial value
    expect(
        screen.getByText('Count: 0')
    ).toBeInTheDocument();

    await user.click(increaseButton);

    // After first click
    expect(
        screen.getByText('Count: 1')
    ).toBeInTheDocument();
    
    await user.click(increaseButton);

    // After second click
    expect(
        screen.getByText('Count: 2')
    ).toBeInTheDocument();
});

test('decrements the counter when Decrease is clicked', async () => {
    const user = userEvent.setup();

    render(<ApplicationCounter />);

    const increaseButton = screen.getByRole('button', {
        name: 'Increase',
    });
    const decreaseButton = screen.getByRole('button', {
        name: 'Decrease',
    });

    // Initial value
    expect(
        screen.getByText('Count: 0')
    ).toBeInTheDocument();

    await user.click(increaseButton);

    // After first click
    expect(
        screen.getByText('Count: 1')
    ).toBeInTheDocument();
    
    expect(decreaseButton).toBeEnabled();

    await user.click(increaseButton);

    // After second click
    expect(
        screen.getByText('Count: 2')
    ).toBeInTheDocument();

    await user.click(decreaseButton);

    expect(
        screen.getByText('Count: 1')
    ).toBeInTheDocument();

    await user.click(decreaseButton);

    expect(
        screen.getByText('Count: 0')
    ).toBeInTheDocument();

    expect(decreaseButton).toBeDisabled();
});

test('resets the counter to zero when Reset is clicked', async () => {
    const user = userEvent.setup();

    render(<ApplicationCounter />);

    const resetButton = screen.getByRole('button', {
        name: 'Reset',
    });
    const increaseButton = screen.getByRole('button', {
        name: 'Increase',
    });
    const decreaseButton = screen.getByRole('button', {
        name: 'Decrease',
    });

    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    await user.click(increaseButton);

    expect(screen.getByText('Count: 1')).toBeInTheDocument();

    await user.click(increaseButton);

    expect(screen.getByText('Count: 2')).toBeInTheDocument();

    await user.click(resetButton);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    expect(decreaseButton).toBeDisabled();
});

test('does not decrement below zero', async () => {
    const user = userEvent.setup();

    render(<ApplicationCounter />);

    const decreaseButton = screen.getByRole('button', {
        name: 'Decrease',
    });

    expect(decreaseButton).toBeDisabled();

    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    await user.click(decreaseButton);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    expect(decreaseButton).toBeDisabled();
});
