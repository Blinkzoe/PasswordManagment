import { authenticator } from 'otplib';

export function generarCodigo2FA(semillaBase32: string): string {
  try {
    return authenticator.generate(semillaBase32);
  } catch (error) {
    throw new Error('Error generando el token de seguridad TOTP.');
  }
}