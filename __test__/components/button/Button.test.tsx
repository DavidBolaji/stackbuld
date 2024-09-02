import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/button/button";

jest.mock("@/components/loader/loader", () => () => <div>Loading...</div>);

// Test suite for Button component
describe("Button Component", () => {
  it("renders button with children", () => {
    render(<Button loading={false}>Click Me</Button>);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders Loader when loading is true", () => {
    render(<Button loading={true}>Click Me</Button>);
    const loaderElement = screen.getByText(/loading.../i);
    expect(loaderElement).toBeInTheDocument();
  });

  it("does not render Loader when loading is false", () => {
    render(<Button loading={false}>Click Me</Button>);
    const loaderElement = screen.queryByText(/loading.../i);
    expect(loaderElement).not.toBeInTheDocument();
  });

  it("applies additional classNames passed via props", () => {
    render(
      <Button loading={false} className="custom-class">
        Click Me
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveClass("custom-class");
  });

  it("handles disabled state correctly", () => {
    render(
      <Button loading={false} disabled>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeDisabled();
  });

  it("triggers onClick event when clicked", () => {
    const handleClick = jest.fn();
    render(
      <Button loading={false} onClick={handleClick}>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
