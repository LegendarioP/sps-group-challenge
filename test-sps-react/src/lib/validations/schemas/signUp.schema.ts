import * as yup from "yup";


export const useSignUpSchema = yup.object({
    nome: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup.string().required("Senha é obrigatória"),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required("Confirmação de senha é obrigatória")
  })