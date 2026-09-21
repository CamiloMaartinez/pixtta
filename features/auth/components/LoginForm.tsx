import { loginAction } from "../actions/login.action";
import { Logo } from "@/components/ui/Logo";

interface LoginFormProps {
  errorMessage?: string;
}

export function LoginForm({ errorMessage }: LoginFormProps): React.JSX.Element {
  return (
    <form
      action={loginAction}
      className="w-full max-w-sm border border-titanium/15 bg-graphite p-8"
    >
      <Logo variant="full" height={52} priority />
      <h1 className="mt-6 font-body text-xs font-medium uppercase tracking-[0.2em] text-titanium">
        Panel administrativo
      </h1>

      {errorMessage && (
        <p className="mt-4 border border-ignition/40 px-3 py-2 font-body text-sm text-ignition">
          {errorMessage}
        </p>
      )}

      <label className="mb-1 mt-6 block font-body text-xs font-medium uppercase tracking-wide text-titanium">
        Correo
      </label>
      <input
        name="email"
        type="email"
        required
        className="mb-4 w-full border border-titanium/20 bg-carbon px-3 py-2 font-body text-sm text-alabaster outline-none focus:border-ignition"
      />

      <label className="mb-1 block font-body text-xs font-medium uppercase tracking-wide text-titanium">
        Contraseña
      </label>
      <input
        name="password"
        type="password"
        required
        className="mb-6 w-full border border-titanium/20 bg-carbon px-3 py-2 font-body text-sm text-alabaster outline-none focus:border-ignition"
      />

      <button
        type="submit"
        className="w-full border border-titanium/20 bg-ignition px-4 py-2.5 font-body text-sm font-semibold uppercase tracking-wide text-alabaster"
      >
        Ingresar
      </button>
    </form>
  );
}
