import * as yup from 'yup';
export const updateUserSchema = yup.object({
  email: yup.string().email("Email inválido").optional(),
  nome: yup.string().min(2,"Nome muito curto").max(100, "Nome muito longo").optional(),
});