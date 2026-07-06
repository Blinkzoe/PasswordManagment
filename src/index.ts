// src/index.ts
import { CuentaExterna, PermisoAcceso } from './types';
import { ejecutarLoginControlado } from './services/automation';
import { cifrar } from './services/crypto';

// 1. Datos simulados (Idealmente vendrían de data/database.json)
const passwordPruebaCifrado = cifrar('MiPasswordSecretoDeFacebook123');

const cuentaFacebookCorp: CuentaExterna = {
  id: 'fb_marketing_mx',
  plataforma: 'Facebook',
  urlLogin: 'https://www.facebook.com/',
  usuario: 'marketing@empresa.com',
  passwordCifrado: passwordPruebaCifrado,
  semillaTOTP: 'JBSWY3DPEHPK3PXP' // Reemplazar por tu semilla Base32 real de FB
};

const tablaPermisos: PermisoAcceso[] = [
  { usuarioPortal: 'orlando_dev', cuentaId: 'fb_marketing_mx', tieneAcceso: true },
  { usuarioPortal: 'empleado_antiguo', cuentaId: 'fb_marketing_mx', tieneAcceso: false }
];

// 2. Función controladora
async function solicitarAccesoApp(usuarioPortal: string, cuentaId: string) {
  const permiso = tablaPermisos.find(p => p.usuarioPortal === usuarioPortal && p.cuentaId === cuentaId);

  if (!permiso || !permiso.tieneAcceso) {
    console.error(`🛑 Acceso Denegado de inmediato para el usuario: ${usuarioPortal}`);
    return;
  }

  // Si pasa la regla de negocio del portal, se detona el bot
  await ejecutarLoginControlado(cuentaFacebookCorp);
}

// --- EJECUCIÓN DE PRUEBA ---
// Cambia a 'empleado_antiguo' para probar cómo el sistema bloquea el flujo sin tocar la cuenta real
solicitarAccesoApp('orlando_dev', 'fb_marketing_mx');