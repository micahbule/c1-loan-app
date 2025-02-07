import { LoanApplication } from "./api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const computeMetric = (status: string) => (data: LoanApplication[]) => ({
  status,
  count: data.length,
  totalValue: data.reduce((total, loan) => (total += loan.requestedAmount), 0),
});
