import { BadRequestError, ConflictError, handleApiError, NetworkError } from "../lib/api-errors.ts"
import { UpdateUserSchema } from "../types/forms.ts"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import userService from "../services/UserService.ts"
import { useNavigate } from "react-router-dom"
import { updateUserSchema } from "../lib/validations/schemas/user.schema.ts"

export const useUpdateForm = (id: string) => {
  const schema = updateUserSchema;
  const navigate = useNavigate();


  const form = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: '',
      nome: '',
    }
  })

  const onSubmit = async (data: UpdateUserSchema) => {
    const formData = {
      email: data.email,
      nome: data.nome,
    }

    const userID = id ? id : window.location.href.split("/users/").pop();

    if(!userID){
        throw new Error("User ID not found");
    }

    try {
        console.log("Updating user:", userID, formData);
      const response = await userService.update(userID, formData);

      if (!response) {
        throw new Error("No response from server");
      }

      form.reset()

      navigate("/users", { replace: true });

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