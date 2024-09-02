import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Formik } from "formik";
import Uploadcomponent from "@/components/form/upload-component/upload-component";
import { handleUpload } from "@/libs/helpers";

// Mock the handleUpload function
jest.mock("@/libs/helpers", () => ({
  handleUpload: jest.fn(),
}));

function convertToNextImageUrl(originalUrl: string, width = 3840, quality = 75) {
  // Encode the original URL
  const encodedUrl = encodeURIComponent(originalUrl); 
  // Construct the Next.js optimized image URL
  return `/_next/image?url=${encodedUrl}&w=${width}&q=${quality}`;
}


describe("Uploadcomponent", () => {
  const setup = () => {
    const utils = render(
      <Formik
        initialValues={{ img: "" }}
        onSubmit={() => {}}
      >
        <Uploadcomponent name="img" />
      </Formik>
    );
    return {
      ...utils,
    };
  };

  it("renders the upload component and allows image upload", async () => {
    setup();
    
    // Check if the image is rendered correctly
    const imgElement = screen.getByRole("img", { hidden: true });
    expect(imgElement).toBeInTheDocument();

    // Mock the URL returned by the handleUpload function
    (handleUpload as jest.Mock).mockResolvedValueOnce("http://example.com/image.jpg");

    // Simulate the click to open file upload dialog
    const labelElement = imgElement.closest('label');
    if (labelElement) {
      fireEvent.click(labelElement); // Click on the label that contains the image
    }

    // Simulate file selection
    const fileInput = screen.getByTestId("hidden-input"); // Input type="file" is hidden
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    
    // Fire change event on the file input
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check if handleUpload was called
    await waitFor(() => {
      expect(handleUpload).toHaveBeenCalled();
    });

    // Check if the img src has been updated correctly
    expect(imgElement).toHaveAttribute("src", convertToNextImageUrl("http://example.com/image.jpg"));
  });

  it("displays the loader while submitting", async () => {
    setup();

    // Mock handleUpload to simulate a delay
    (handleUpload as jest.Mock).mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve("http://example.com/image.jpg"), 1000)));

    // Simulate the click to open file upload dialog
    const imgElement = screen.getByRole("img", { hidden: true });

    const labelElement = imgElement.closest('label');
    if (labelElement) {
      fireEvent.click(labelElement); // Click on the label that contains the image
    }

    // Simulate file selection
    const fileInput = screen.getByTestId("hidden-input"); 
    const file = new File(["dummy content"], "example.png", { type: "image/png" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check if loader is displayed
    expect(screen.getByTestId("loader")).toBeInTheDocument();

    // Wait for the upload to finish and loader to disappear
    await waitFor(() => {
      expect(screen.queryByText(/loader/i)).not.toBeInTheDocument();
    });
  });
});