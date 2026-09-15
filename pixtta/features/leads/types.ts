/** Estado devuelto por las Server Actions de leads, para useActionState. */
export interface LeadFormState {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  success?: boolean;
}
