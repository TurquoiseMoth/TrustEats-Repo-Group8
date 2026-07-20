export const VERIFICATION_STATUS = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
  FLAGGED: "flagged",
} as const;

export const VERIFICATION_STATUS_LABELS: Record<string, string> = {
  pending: "Pending Review",
  verified: "Verified",
  rejected: "Rejected",
  flagged: "Flagged",
};

export const VERIFICATION_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  verified: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  flagged: "bg-orange-100 text-orange-800",
};
