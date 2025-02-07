"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  deleteLoanApplication,
  type LoanApplication,
  type LoanStatus,
} from "@/app/actions";
import EditLoanApplicationDialog from "./EditLoanApplicationDialog";
import { getLoanApplications, updateLoanApplication } from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function LoanApplicationTable() {
  const queryClient = useQueryClient();
  const { data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getLoanApplications(),
    initialData: [],
  });

  const router = useRouter();
  const [editingApplication, setEditingApplication] =
    useState<LoanApplication | null>(null);

  const handleDelete = async (id: string) => {
    await deleteLoanApplication(id);
    router.refresh();
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateLoanApplication(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });

  const handleStatusChange = async (id: string, newStatus: LoanStatus) => {
    const application = applications.find((app) => app.id === id);
    if (application) {
      updateMutation.mutate({ id, status: newStatus });
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A list of loan applications</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant Name</TableHead>
            <TableHead>Requested Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.applicantName}</TableCell>
              <TableCell>${application.requestedAmount.toFixed(2)}</TableCell>
              <TableCell>
                <Select
                  defaultValue={application.status}
                  onValueChange={(value: LoanStatus) =>
                    handleStatusChange(application.id, value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => {}}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(application.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingApplication && (
        <EditLoanApplicationDialog
          application={editingApplication}
          onClose={() => setEditingApplication(null)}
        />
      )}
    </>
  );
}
