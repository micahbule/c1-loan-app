"use server"

import { revalidatePath } from "next/cache"

export type LoanStatus = "Pending" | "Approved" | "Rejected"

export type LoanApplication = {
  id: string
  applicantName: string
  requestedAmount: number
  status: LoanStatus
}

let loanApplications: LoanApplication[] = []

export async function getLoanApplications() {
  return loanApplications
}

export async function addLoanApplication(applicantName: string, requestedAmount: number) {
  const newApplication: LoanApplication = {
    id: Date.now().toString(),
    applicantName,
    requestedAmount,
    status: "Pending", // Default status
  }
  loanApplications.push(newApplication)
  revalidatePath("/")
}

export async function updateLoanApplication(
  id: string,
  applicantName: string,
  requestedAmount: number,
  status: LoanStatus,
) {
  loanApplications = loanApplications.map((app) =>
    app.id === id ? { ...app, applicantName, requestedAmount, status } : app,
  )
  revalidatePath("/")
}

export async function deleteLoanApplication(id: string) {
  loanApplications = loanApplications.filter((app) => app.id !== id)
  revalidatePath("/")
}

export async function getLoanMetrics() {
  const metrics = {
    Pending: { count: 0, totalValue: 0 },
    Approved: { count: 0, totalValue: 0 },
    Rejected: { count: 0, totalValue: 0 },
  }

  loanApplications.forEach((app) => {
    metrics[app.status].count++
    metrics[app.status].totalValue += app.requestedAmount
  })

  return metrics
}

