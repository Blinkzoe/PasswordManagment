import { chromium } from 'playwright';
import { descifrar } from './crypto';
import { generarCodigo2FA } from './security2fa';
import { CuentaExterna } from '../types';

export async function ejecutarLoginControlado(cuenta: CuentaExterna) {
  // Desciframos la credencial en tiempo de ejecución
  const passwordReal = descifrar(cuenta.passwordCifrado);
  const tokenActual = generarCodigo2FA(cuenta.semillaTOTP);

  console.log(`🔑 Generando acceso seguro para ${cuenta.plataforma}. Código OTP: ${tokenActual}`);

  const browser = await chromium.launch({ headless: false, slowMo: 400 });
  const page = await browser.newPage();
  
  await page.goto(cuenta.urlLogin, { waitUntil: 'domcontentloaded' });

  // NOTA: Ajustar selectores dependiendo la plataforma (Facebook en este ejemplo)
  await page.fill('#email', cuenta.usuario);
  await page.fill('#pass', passwordReal);
  await page.click('button[name="login"]');

  // Esperar el input de verificación de dos pasos de Facebook corporativo
  try {
    // Reemplazar por el selector exacto de Facebook para el código 2FA
    await page.waitForSelector('input[type="text"]', { timeout: 5000 });
    await page.fill('input[type="text"]', tokenActual);
    // await page.click('#botondeconfirmar');
    console.log("✨ Credenciales y 2FA inyectados limpia y ciegamente.");
  } catch (e) {
    console.log("No se solicitó el 2FA en esta sesión.");
  }

  // Mantenemos sesión un momento para validar visualmente
  await page.waitForTimeout(5000);
  await browser.close();
}