"use client";

interface DeleteEntryButtonProps {
  action: (formData: FormData) => Promise<void>;
  id: string;
  label: string;
}

/**
 * Botón de eliminar genérico con confirmación, reutilizado para
 * marcas y categorías (mismo patrón que DeleteVehicleButton).
 */
export function DeleteEntryButton({ action, id, label }: DeleteEntryButtonProps): React.JSX.Element {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        const confirmed = window.confirm(`¿Eliminar "${label}"?`);
        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="font-body text-xs font-medium uppercase tracking-wide text-ignition hover:underline"
      >
        Eliminar
      </button>
    </form>
  );
}