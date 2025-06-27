import * as yup from "yup";

export const favoriteListSchema = yup.object({
  title: yup
    .string()
    .min(3, "O título deve ter no mínimo 3 caracteres")
    .required("O título é obrigatório"),
  description: yup
    .string()
    .max(200, "A descrição deve ter no máximo 200 caracteres"),
});

export type FavoriteListData = yup.InferType<typeof favoriteListSchema>;
