import { render, screen } from '@testing-library/react';
import Wrapper from '@/components/layout/wrapper'; // Adjust the import path as necessary

describe('Wrapper', () => {
  test('renders children correctly', () => {
    // Arrange: Define the children to be rendered inside the Wrapper
    const childrenText = 'Hello, World!';

    // Act: Render the Wrapper with the children
    render(<Wrapper>{childrenText}</Wrapper>);

    // Assert: Check if the children are rendered within the div
    const wrapperDiv = screen.getByTestId('wrapper-div'); // Use data-testid here
    expect(wrapperDiv).toBeInTheDocument();
    expect(wrapperDiv).toHaveClass('max-w-7xl mx-auto lg:px-0 md:px-4 px-2');
    expect(wrapperDiv).toHaveTextContent(childrenText);
  });
});
