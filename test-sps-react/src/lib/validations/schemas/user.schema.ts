import * as yup from 'yup';
export const updateUserSchema = yup.object({
  email: yup.string().email().optional(),
  nome: yup.string().min(2).max(100).optional(),
});