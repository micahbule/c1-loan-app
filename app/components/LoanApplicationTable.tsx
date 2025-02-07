"use client";

import { useState } from "react";
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
import EditLoanApplicationDialog from "./EditLoanApplicationDialog";
import {
  getLoanApplications,
  updateLoanApplication,
  deleteLoanApplication,
  LoanApplication,
} from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function LoanApplicationTable() {
  const queryClient = useQueryClient();
  const { data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: () => getLoanApplications(),
    initialData: [],
  });

  const [editingApplication, setEditingApplication] =
    useState<LoanApplication | null>(null);

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteLoanApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });

  const handleDelete = async (id: string) => {
    deleteMutation.mutate(id);
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: Pick<LoanApplication, "id" | "status">) =>
      updateLoanApplication(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
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
                  onValueChange={(value: string) =>
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
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => {
                    setEditingApplication(application);
                  }}
                >
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
