export type UserData = {
  fullName: string;
  email: string;
  avatar: string;
};

export type AuthFormValues = {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type Member = {
  id: string;
  email: string;
  role: "owner" | "manager" | "member";
  createdAt: Date;
};

export type MemberDbResponse = {
  user_id: string;
  email: string;
  role: string;
  created_at: string;
};

// Type for the database view result
export type UserClinicRole = {
  clinic_id: string;
  clinic_name: string;
  role: string;
};
