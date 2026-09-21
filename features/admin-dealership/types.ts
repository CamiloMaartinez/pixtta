/** Estado devuelto por las Server Actions del admin del concesionario, para useActionState. */
export interface DealershipFormState {
  error?: string;
  success?: boolean;
  fieldErrors?: Record<string, string[] | undefined>;
}
