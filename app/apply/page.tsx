"use client";

import LoanApplicationForm from "../components/LoanApplicationForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ApplyPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Apply for a Loan</h1>
        <LoanApplicationForm />
      </div>
    </QueryClientProvider>
  );
}
