import { getLoanApplications } from "../actions"
import LoanApplicationTable from "../components/LoanApplicationTable"

export default async function ApplicationsPage() {
  const applications = await getLoanApplications()

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Loan Applications</h1>
      <LoanApplicationTable applications={applications} />
    </div>
  )
}

