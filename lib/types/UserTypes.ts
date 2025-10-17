export type UserData = {
  userId: string;
  fullName: string;
  email: string;
  avatar: string;
  activeCompanyId: string | null;
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
  role: "owner" | "admin" | "user";
  createdAt: Date;
};
