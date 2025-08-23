import { InferType } from "yup"
import { useSignInSchema } from "../lib/validations/schemas/signIn.schema"

export type SignInSchema = InferType<typeof useSignInSchema>