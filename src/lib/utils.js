import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const API_URL = import.meta.env.VITE_API_URL
const CURRENT_TERM = import.meta.env.VITE_CURRENT_TERM

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function chunkArray(array) {
  const newArray = []
  if (array.length === 0) return [[]]

  for (let i = 0; i < array.length; i += 8) {
    newArray.push(array.slice(i, i + 8));
  }

  return newArray
}

export const fetchSection = async crn => {
  const response = await fetch(`${API_URL}/terms/${CURRENT_TERM}/classes/${crn}`);
  return response.json();
}