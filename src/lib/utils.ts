import {
  type ClassValue,
  clsx,
} from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function firstLastLetter(fullName?: string) {
  if (!fullName) return "";
  const nameParts = fullName.split(" ");

  if (nameParts.length === 1) {
    return nameParts[0].charAt(0);
  } else {
    return nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0);
  }
}

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
