import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationSubmitForm from '.';

test('displays loading state while submitting the form', async () => {
    const submitForm = jest.fn(() => new Promise<void>(() => {}))

    render(<ApplicationSubmitForm onSubmit={submitForm} />)

    const user = userEvent.setup();

    const companyInput = screen.getByLabelText('Company Name');
    const positionInput = screen.getByLabelText('Position');
    const submitButton = screen.getByRole('button', {
        name: 'Submit Application',
    });

    expect(companyInput).toBeInTheDocument();
    expect(positionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await user.type(companyInput, 'OpenAI');
    await user.type(positionInput, 'Frontend Developer');

    await user.click(submitButton);

    expect(submitForm).toHaveBeenCalledTimes(1);

    expect(submitForm).toHaveBeenCalledWith({
        company: 'OpenAI',
        position: 'Frontend Developer',
    });

    expect(
        screen.getByText('Submitting...')
    ).toBeInTheDocument();

    expect(submitButton).toBeDisabled();
})