import { BadRequestError, handleApiError, NetworkError } from "../lib/api-errors.ts"
import { SignInSchema } from "../types/forms.ts"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useSignInSchema } from "../lib/validations/schemas/signIn.schema.ts"
import authService from "../services/AuthService.ts"
import { useAuth } from "../contexts/AuthContext.tsx"
import { useNavigate } from "react-router-dom"

export const useLoginForm = () => {
    const schema = useSignInSchema;
    const { login } = useAuth();
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = async (data: SignInSchema) => {
        const formData = {
            email: data.email,
            password: data.password
        }

        try {
            const response = await authService.signIn(formData);

            if (!response) {
                throw new Error("No response from server");
            }

            login(response.token, response.user);

            form.reset();

            navigate("/users", { replace: true });

        } catch (error) {
            try {
                handleApiError(error)
            } catch (apiError) {
                if (apiError instanceof BadRequestError) {
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