import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .required("O nome é obrigatório"),
  email: yup
    .string()
    .email("O e-mail deve ser um endereço válido")
    .required("O e-mail é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
    .required("A confirmação de senha é obrigatória"),
});

export type RegisterData = yup.InferType<typeof registerSchema>;
