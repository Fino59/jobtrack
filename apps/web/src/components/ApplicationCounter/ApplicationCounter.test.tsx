import userEvent from '@testing-library/user-event';
import ApplicationCounter from '.';
import { render, screen } from '@testing-library/react';


test('increments the counter when Increase is clicked', async () => {
    const user = userEvent.setup();

    render(<ApplicationCounter />);

    const button = screen.getByRole('button', {
        name: 'Increase',
    });

    // Initial value
    expect(
        screen.getByText('Count: 0')
    ).toBeInTheDocument();

    await user.click(button);

    // Initial value
    expect(
        screen.getByText('Count: 1')
    ).toBeInTheDocument();
    
    await user.click(button);

    // Initial value
    expect(
        screen.getByText('Count: 2')
    ).toBeInTheDocument();
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

