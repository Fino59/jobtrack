import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ApplicationForm from '.';

test('renders the company name, position, and submit button', () => { 
    render(<ApplicationForm />)

    const companyInput = screen.getByLabelText('Company Name')
    const positionInput = screen.getByLabelText('Position')
    const submitButton = screen.getByRole('button', {
        name: 'Add Application',
    });

    expect(companyInput).toBeInTheDocument();
    expect(positionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    expect(companyInput).toHaveValue('');
    expect(positionInput).toHaveValue('');
})

test('allows users to enter company name and position', async () => {
    render(<ApplicationForm />)
    
    const user = userEvent.setup();

    const companyInput = screen.getByLabelText('Company Name')
    const positionInput = screen.getByLabelText('Position')

    await user.type(companyInput, 'OpenAI');

    expect(companyInput).toHaveValue('OpenAI');
    
    await user.type(positionInput, 'Frontend Developer')

    expect(positionInput).toHaveValue('Frontend Developer');
})

test('displays a success message after submitting a valid application', async () => {
    render(<ApplicationForm />)
    const user = userEvent.setup();

    const companyInput = screen.getByLabelText('Company Name')
    const positionInput = screen.getByLabelText('Position')

    await user.type(companyInput, 'OpenAI');
    await user.type(positionInput, 'Frontend Developer')
    const submitButton = screen.getByRole('button', {
        name: 'Add Application',
    });

    await user.click(submitButton);

    const successMessage = await screen.findByText(
        'Application added successfully!'
    );

    expect(successMessage).toBeInTheDocument();
})

test('does not submit the form when required fields are empty', async () => {
    render(<ApplicationForm />)
    
    const user = userEvent.setup();

    const companyInput = screen.getByLabelText('Company Name')
    const positionInput = screen.getByLabelText('Position')

    expect(companyInput).toBeRequired();
    expect(positionInput).toBeRequired();

    const submitButton = screen.getByRole('button', {
        name: 'Add Application',
    });

    await user.click(submitButton);

    expect(
        screen.queryByText('Application added successfully!')
    ).not.toBeInTheDocument();
});

test('does not submit when the position field is empty', async () => {
    render(<ApplicationForm />)

    const user = userEvent.setup();

    const companyInput = screen.getByLabelText('Company Name')
    const positionInput = screen.getByLabelText('Position')

    await user.type(companyInput, 'OpenAI');

    expect(companyInput).toHaveValue('OpenAI');
    expect(companyInput).toBeValid();

    expect(positionInput).toHaveValue('');
    expect(positionInput).toBeInvalid();

    const submitButton = screen.getByRole('button', {
        name: 'Add Application',
    });

    await user.click(submitButton);

    expect(
        screen.queryByText('Application added successfully!')
    ).not.toBeInTheDocument();
});