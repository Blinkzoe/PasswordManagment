// src/types/index.ts

export interface CuentaExterna {
  id: string;          // Ej: 'facebook_marketing'
  plataforma: string;  // Ej: 'Facebook'
  urlLogin: string;
  usuario: string;
  passwordCifrado: string; // Almacenado de forma segura
  semillaTOTP: string;     // Clave base32 para el 2FA
}

export interface PermisoAcceso {
  usuarioPortal: string; // Empleado logueado en tu portal
  cuentaId: string;      // ID de la CuentaExterna
  tieneAcceso: boolean;
}