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

test('Verify if inputs is working', async () => {
    render(<ApplicationForm />)
    
    const user = userEvent.setup();

    const companyInput = screen.getByLabelText('Company Name')
    const positionInput = screen.getByLabelText('Position')

    expect(companyInput).toBeInTheDocument();
    expect(positionInput).toBeInTheDocument();

    await user.type(companyInput, 'OpenAI');

    expect(companyInput).toHaveValue('OpenAI');
    
    await user.type(positionInput, 'Frontend Developer')

    expect(positionInput).toHaveValue('Frontend Developer');
})