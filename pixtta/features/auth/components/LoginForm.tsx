import { loginAction } from "../actions/login.action";

interface LoginFormProps {
  errorMessage?: string;
}

/**
 * Formulario de acceso al panel administrativo.
 * No necesita ser Client Component: el error se recibe por searchParams
 * y el envío se maneja con una Server Action.
 */
export function LoginForm({ errorMessage }: LoginFormProps): React.JSX.Element {
  return (
    <form
      action={loginAction}
      className="w-full max-w-sm rounded-lg border border-neutral-200 p-8"
    >
      <h1 className="mb-1 text-xl font-bold text-neutral-900">Panel administrativo</h1>
      <p className="mb-6 text-sm text-neutral-500">Pixtta</p>

      {errorMessage && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
        Correo
      </label>
      <input
        name="email"
        type="email"
        required
        className="mb-4 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
      />

      <label className="mb-1 block text-xs uppercase tracking-wide text-neutral-500">
        Contraseña
      </label>
      <input
        name="password"
        type="password"
        required
        className="mb-6 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
      />

      <button
        type="submit"
        className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white"
      >
        Ingresar
      </button>
    </form>
  );
}
