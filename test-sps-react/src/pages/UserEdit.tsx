import React from "react";
import { useLoaderData, LoaderFunctionArgs } from "react-router-dom";

export function userLoader({ params }: LoaderFunctionArgs) {
  const user = {
    id: params?.userId ?? "",
    name: "teste",
    email: "teste@gmail.com",
  };
  return { user };
}

const EditUser: React.FC = () => {
  const { user } = useLoaderData() as { user: { id: string; name: string; email: string } };

  return (
    <div>
      <p>Edição de Usuário</p>
      <div>
        <form>
          <label>Nome:</label>
          <input type="text" value={user.name} readOnly />
          <br />
          <br />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;