/**
 * Tipos relacionados con el usuario administrador.
 * Corresponde a la tabla `admin_users` (sección 4) y al flujo de
 * autenticación (sección 5) del documento de arquitectura.
 */

export type AdminRole = "admin";

export interface AdminUser {
  id: string;
  fullName: string;
  role: AdminRole;
  createdAt: string;
}
