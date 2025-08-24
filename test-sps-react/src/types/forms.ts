import { InferType } from "yup"
import { useSignInSchema } from "../lib/validations/schemas/signIn.schema"
import { useSignUpSchema } from "../lib/validations/schemas/signUp.schema"
import { updateUserSchema } from "../lib/validations/schemas/user.schema"

export type SignInSchema = InferType<typeof useSignInSchema>
export type SignUpSchema = InferType<typeof useSignUpSchema>
export type UpdateUserSchema = InferType<typeof updateUserSchema>
