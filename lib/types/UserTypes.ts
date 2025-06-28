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
