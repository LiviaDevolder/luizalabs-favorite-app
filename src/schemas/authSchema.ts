import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .email('O e-mail deve ser um endereço válido')
    .required('O e-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export type LoginCredentials = yup.InferType<typeof loginSchema>;
