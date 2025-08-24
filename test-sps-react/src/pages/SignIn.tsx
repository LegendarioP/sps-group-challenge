import React from "react";
import { useLoginForm } from "../hooks/useLoginForm.ts";

export default function SignInPage() {
  const { form, onSubmit, loading, errors } = useLoginForm();

  return (
    <div>
      <h1>Página de Login</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...form.register('email')}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            {...form.register('password')}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>

        {errors.root && <p style={{ color: 'red' }}>{errors.root.message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}