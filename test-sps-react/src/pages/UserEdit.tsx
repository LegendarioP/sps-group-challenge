import React from "react";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { useUpdateForm } from "../hooks/useUpdateForm.ts";

export function userLoader({ params }: LoaderFunctionArgs) {
  const user = {
    id: params?.userId ?? "",
  };
  return { user };
}

const EditUser: React.FC = () => {
  const { user } = useLoaderData() as ReturnType<typeof userLoader>;
  const { form, onSubmit, loading, errors } = useUpdateForm(user.id);

  return (
    <div>
      <p>Edição de Usuário </p>
      <div>
        <form onSubmit={onSubmit}>
          <label>Nome:</label>
          <input type="text"
            {...form.register("nome")} 
          />
          {errors.nome && <p style={{ color: 'red' }}>{errors.nome.message}</p>}

          <br />
          <br />
          <label>Email:</label>
          <input type="email"
            {...form.register("email")} 
          />
          <br />
          <br />
          <button 
            type="submit"
            disabled={!form.formState.isValid || loading}
          >Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;