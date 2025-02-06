import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getLoanMetrics, type LoanStatus } from "../actions"

export default async function LoanMetrics() {
  const metrics = await getLoanMetrics()

  const statusColors: Record<LoanStatus, string> = {
    Pending: "bg-yellow-100 border-yellow-500",
    Approved: "bg-green-100 border-green-500",
    Rejected: "bg-red-100 border-red-500",
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {(Object.keys(metrics) as LoanStatus[]).map((status) => (
        <Card key={status} className={`border-l-4 ${statusColors[status]}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{status} Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics[status].count}</div>
            <p className="text-xs text-muted-foreground">Total Value: ${metrics[status].totalValue.toFixed(2)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

