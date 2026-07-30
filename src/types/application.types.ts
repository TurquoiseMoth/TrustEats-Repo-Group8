export type ApplicationStatus = "submitted" | "approved" | "rejected" | "pending";

export interface Application {
  id: string;
  organization: string;
  type: string;
  submittedDate: string;
  status: ApplicationStatus;
}

export interface DashboardStats {
  totalCompanies: number;
  verifiedCount: number;
  pendingCount: number;
  rejectedCount: number;
}

export interface MonthlyApplicationData {
  month: string;
  submitted: number;
  approved: number;
}