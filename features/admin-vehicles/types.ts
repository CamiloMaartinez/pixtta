/** Estado devuelto por las Server Actions de creación/edición, para useActionState. */
export interface VehicleFormState {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
}
