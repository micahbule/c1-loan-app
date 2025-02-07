import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const client = axios.create({
  baseURL: API_URL,
});

export type LoanApplication = CreateLoanApplication & {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateLoanApplication = {
  applicantName: string;
  requestedAmount: number;
};

type UpdateLoanApplication = Partial<LoanApplication>;

type LoanQueryParams = {
  status: string;
};

export async function createLoanApplication(payload: CreateLoanApplication) {
  const response = await client.post<LoanApplication>("/loans", payload);
  return response.data;
}

export async function getLoanApplications(query?: LoanQueryParams) {
  let finalUrl = "/loans";

  if (query) {
    finalUrl += `?${new URLSearchParams(query).toString()}`;
  }

  const response = await client.get<LoanApplication[]>(finalUrl);
  return response.data;
}

export async function updateLoanApplication(
  id: string,
  payload: UpdateLoanApplication
) {
  const response = await client.patch<LoanApplication>(`/loans/${id}`, payload);
  return response.data;
}

export async function deleteLoanApplication(id: string) {
  await client.delete(`/loans/${id}`);
}
