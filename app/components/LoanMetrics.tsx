import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueries } from "@tanstack/react-query";
import { getLoanApplications, LoanApplication } from "@/lib/api";
import { computeMetric } from "@/lib/utils";

export default function LoanMetrics() {
  const STATUSES = ["PENDING", "APPROVED", "REJECTED"];
  const metrics = useQueries({
    queries: STATUSES.map((status) => ({
      queryKey: [`${status.toLocaleLowerCase()}Loans`],
      queryFn: () => getLoanApplications({ status }),
      select: computeMetric(status),
    })),
  });

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 border-yellow-500",
    APPROVED: "bg-green-100 border-green-500",
    REJECTED: "bg-red-100 border-red-500",
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <Card
          key={metric.data?.status}
          className={`border-l-4 ${
            statusColors[metric.data?.status as string]
          }`}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.data?.status[0]}
              {metric.data?.status.slice(1).toLocaleLowerCase()} Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.data?.count}</div>
            <p className="text-xs text-muted-foreground">
              Total Value: ${metric.data?.totalValue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
