const errorTranslation = (error: string) => {
  switch (error) {
    case "Invalid login credentials":
      return "Email ou senha inválidos";
    case "Email not confirmed":
      return "Email não confirmado. Por favor, verifique sua caixa de entrada.";
    default:
      return error;
  }
};

export default errorTranslation;
