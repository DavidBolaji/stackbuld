import React from "react";
import { render, screen } from "@testing-library/react";
import { Empty } from "@/components/Empty/empty"; 



jest.mock("@/components/Empty/empty", () => {
  // Import the original module
  const originalModule = jest.requireActual("@/components/Empty/empty");

  return {
    ...originalModule, // Spread the original module
    generateNumber: jest
      .fn()
  };
});


describe("Empty Component", () => {
  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers to control setInterval
    jest.clearAllMocks(); // Clear any previous mocks
    jest.clearAllTimers(); // Clear any previous timers
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders without crashing and displays the initial elements", () => {
    const linkElement = <a href="/create">Create Product</a>;

    render(<Empty link={linkElement} />);

    // Check that the bucket icon is rendered
    const bucketIcon = screen.getByTestId("bucket-icon");
    expect(bucketIcon).toBeInTheDocument();

    // // Check that the link is rendered
    const link = screen.getByRole("link", { name: /create product/i });
    expect(link).toBeInTheDocument();
  });
});
