export const toastMessages = {
  // Success
  "check-email": "Cadastro realizado! Verifique seu e-mail.",

  // Generic errors
  "confirmation-failed":
    "Não foi possível confirmar o e-mail. Tente novamente ou solicite outro link.",
  "token-expired": "O link de confirmação expirou. Peça um novo.",

  // Auth/Login errors
  "invalid-credentials": "Email ou senha inválidos.",
  "email-not-confirmed": "Email não confirmado. Por favor, verifique sua caixa de entrada.",

  // Forgot password flow
  "missing-email": "Digite seu e-mail antes de solicitar a troca de senha.",
  "reset-link-sent": "Link de redefinição enviado! Verifique seu e-mail.",
  "password-updated": "Senha atualizada com sucesso!",

  // Generic errors for password flows
  "reset-password-error": "Não foi possível enviar o link de redefinição. Tente novamente.",
  "update-password-error": "Não foi possível atualizar a senha. Tente novamente.",
} as const;

export type ToastMessageKey = keyof typeof toastMessages;
