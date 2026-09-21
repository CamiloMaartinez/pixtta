/** Estado devuelto por las Server Actions de los formularios de leads. */
export interface LeadFormState {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  success?: boolean;
}