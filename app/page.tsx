import LoanMetrics from "./components/LoanMetrics"

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to the Loan Application System</h1>
      <p>Use the navigation menu to apply for a loan or view existing applications.</p>
      <h2 className="text-2xl font-semibold mt-8">Loan Application Metrics</h2>
      <LoanMetrics />
    </div>
  )
}

