import { InferType } from "yup"
import { useSignInSchema } from "../lib/validations/schemas/signIn.schema"
import { useSignUpSchema } from "../lib/validations/schemas/signUp.schema"

export type SignInSchema = InferType<typeof useSignInSchema>
export type SignUpSchema = InferType<typeof useSignUpSchema>