import { BadRequestError, ConflictError, handleApiError, NetworkError } from "../lib/api-errors.ts"
import { SignUpSchema } from "../types/forms.ts"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSignUpSchema } from "../lib/validations/schemas/signUp.schema.ts"
import { JwtManager } from "../utils/jwtManager.ts"
import userService from "../services/UserService.ts"

export const useRegisterForm = () => {
  const schema = useSignUpSchema;
  const jwt = new JwtManager();
  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: '',
      nome: '',
      password: '',
      confirmPassword: '',
    }
  })

  const onSubmit = async (data: SignUpSchema) => {
    const formData = {
      email: data.email,
      nome: data.nome,
      password: data.password
    }

    try {
      const response = await userService.create(formData);

      if (!response) {
        throw new Error("No response from server");
      }
      console.log(response);

      jwt.setToken(response.token);

      form.reset()

    } catch (error) {
      try {
        handleApiError(error)
      } catch (apiError) {
        if (apiError instanceof ConflictError) {
          form.setError('email', {
            message: "Email já existe"
          })
        } else if (apiError instanceof BadRequestError) {
          form.setError('root', {
            message: "Dados inválidos"
          })
        } else if (apiError instanceof NetworkError) {
          form.setError('root', {
            message: "Erro de conexão"
          })
        } else {
          form.setError('root', {
            message: "Erro interno do servidor"
          })
        }
      }
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    loading: form.formState.isSubmitting,
    errors: form.formState.errors
  }
}