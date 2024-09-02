import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { ChangeEvent } from "react";
import Cloudinary from "@/axios/cloudinary";

/**
 * Merges Tailwind classes and conditionally applies class names.
 * @param inputs - A list of class values to be merged.
 * @returns A single merged class string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number according to the specified locale and formatting options.
 * @param num - The number to format.
 * @param locale - The locale string to use for formatting (e.g., 'en-US').
 * @param options - Additional formatting options for Intl.NumberFormat.
 * @returns A formatted number as a string with two decimal places.
 */
export const formatNumber = (
  num: number,
  locale?: string,
  options?: Intl.NumberFormatOptions
): string => {
  try {
    const formatted = new Intl.NumberFormat(locale, options).format(num);
    return Number(formatted).toFixed(2);
  } catch (error) {
    return num.toString();
  }
};

/**
 * Checks if the input is a number.
 * @param input - The string to check.
 * @returns True if the input consists only of digits, false otherwise.
 */
export function isNumber(input: string): boolean {
  return /^\d+$/.test(input);
}

/**
 * Checks if the input contains only non-digit characters.
 * @param input - The string to check.
 * @returns True if the input contains only non-digit characters, false otherwise.
 */
export function isText(input: string): boolean {
  return /^\D+$/.test(input);
}

/**
 * Pauses execution for a specified amount of time.
 * @param ms - The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time.
 */
export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Handles the file upload process for an input field.
 * @param event - The change event triggered when a file is selected.
 */
export const handleUpload = async (
  event: ChangeEvent<HTMLInputElement>,
)  => {
  const inputElement = event.target;
  const files = inputElement.files;

  if (files && files.length > 0) {
    const selectedFile = files[0];

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`
    );

    try {
      const response = await Cloudinary.post("/auto/upload", formData);
      const { secure_url } = response.data;
      return secure_url;
    } catch (error: any) {
      throw new Error(`Image upload failed: ${error.message}`)
    }
  }
};


/**
 * Extracts the minimum and maximum numbers from a string containing ranges.
 * If no valid numbers are found, returns `undefined` for both min and max.
 * @param rangeString - The string containing numerical ranges, e.g., "$1 - $10,$20 - $30,$30 - $40,$50 +".
 * @returns An object containing the minimum and maximum values found in the string, or `undefined` for both if no values are found.
 */
export function extractMinMax(rangeString: string): { min?: number, max?: number } {
  // Split the string into an array of ranges
  const ranges = rangeString?.split(',');

  // Initialize variables to store the minimum and maximum values
  let min: number | undefined = Infinity;
  let max: number | undefined = -Infinity;

  // Iterate through each range
  ranges?.forEach(range => {
      // Extract numbers using a regular expression
      const numbers = range?.match(/\d+/g)?.map(Number) || [];

      // Update min and max values
      if (numbers.length > 0) {
          const localMin = Math.min(...numbers);
          const localMax = Math.max(...numbers);

          if (localMin < (min as number)) min = localMin;
          if (localMax > (max as number)) max = localMax;
      }
  });

  // If no valid min or max was found, return undefined for both
  if (min === Infinity) min = undefined;
  if (max === -Infinity) max = undefined;

  // Return the extracted min and max values
  return { min, max };
}
