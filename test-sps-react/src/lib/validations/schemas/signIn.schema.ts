import * as yup from "yup";


export const useSignInSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
  })