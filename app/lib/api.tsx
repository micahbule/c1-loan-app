import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:3001";

const client = axios.create({
  baseURL: API_URL,
});

type LoanApplication = CreateLoanApplication & {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

type CreateLoanApplication = {
  applicantName: string;
  requestedAmount: number;
};

export async function createLoanApplication(payload: CreateLoanApplication) {
  const response = await client.post<any, AxiosResponse<LoanApplication>>(
    "/loans",
    payload
  );
  return response.data;
}

export async function getLoanApplications() {
  const response = await client.get<any, AxiosResponse<LoanApplication[]>>(
    "/loans"
  );
  return response.data;
}
