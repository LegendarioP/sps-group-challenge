import * as yup from "yup";


export const useSignUpSchema = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required()
  })