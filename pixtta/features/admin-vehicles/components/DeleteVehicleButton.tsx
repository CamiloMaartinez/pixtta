"use client";

import { deleteVehicleAction } from "../actions/delete-vehicle.action";

interface DeleteVehicleButtonProps {
  vehicleId: string;
  vehicleLabel: string;
}

export function DeleteVehicleButton({
  vehicleId,
  vehicleLabel,
}: DeleteVehicleButtonProps): React.JSX.Element {
  return (
    <form
      action={deleteVehicleAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          `¿Eliminar "${vehicleLabel}"? Esta acción no se puede deshacer.`
        );
        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={vehicleId} />
      <button type="submit" className="text-xs font-medium text-red-600 underline">
        Eliminar
      </button>
    </form>
  );
}
