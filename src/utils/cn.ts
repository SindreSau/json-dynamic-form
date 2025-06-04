import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Concatenates and merges a list of CSS class values into a single string.
 *
 * This function accepts an arbitrary number of class values (which can be strings,
 * arrays, or objects with conditional class names), combines them using `clsx`,
 * and then merges any conflicting Tailwind CSS classes using `twMerge`.
 *
 * @param inputs - A list of class values to combine.
 * @returns A string of merged CSS class names.
 */
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export { cn };
export default cn;
