import { render, screen, fireEvent, act } from '@testing-library/react';
import { Formik, Form } from 'formik';
import StyledInput from '@/components/input/styled-input'; // Adjust the import path as necessary

// Define types for form values and errors
interface FormValues {
    testInput: string;
  }
  
  interface FormErrors {
    testInput?: string;
  }
  
  const MockStyledInput = ({ name }: { name: keyof FormValues }) => {
    return (
      <Formik
        initialValues={{ [name]: '' }}
        validate={(values: FormValues) => {
          const errors: FormErrors = {};
          if (!values[name]) {
            errors[name] = 'Required';
          }
          return errors;
        }}
        onSubmit={() => {}}
      >
        <Form>
          <StyledInput name={name} />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );
  };
  
  describe('StyledInput', () => {
    test('renders input field', () => {
      render(<MockStyledInput name="testInput" />);
      
      // Check if input field is in the document
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('rounded-lg bg-[#fafafa] placeholder:font-medium border px-2 text-md outline-none focus:border-orange-500 font-bold h-10 w-full');
    });
  
    test('displays error message when input is empty', async () => {
      render(<MockStyledInput name="testInput" />);
  
      // Wrap the click event in act
      await act(async () => {
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);
      });
  
      // Check for error message
      const errorMessage = await screen.findByText('Required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-red-600 text-sm ml-1');
    });
  
    test('does not display error message when input is filled', async () => {
      render(<MockStyledInput name="testInput" />);
  
      const input = screen.getByRole('textbox');
  
      // Wrap the change event and click event in act
      await act(async () => {
        fireEvent.change(input, { target: { value: 'Some value' } });
  
        const submitButton = screen.getByRole('button', { name: /submit/i });
        fireEvent.click(submitButton);
      });
  
      // Check that the error message is not in the document
      const errorMessage = screen.queryByText('Required');
      expect(errorMessage).not.toBeInTheDocument();
    });
  });