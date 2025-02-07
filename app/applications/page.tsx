"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoanApplicationTable from "../components/LoanApplicationTable";

const queryClient = new QueryClient();

export default function ApplicationsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Loan Applications</h1>
        <LoanApplicationTable />
      </div>
    </QueryClientProvider>
  );
}
