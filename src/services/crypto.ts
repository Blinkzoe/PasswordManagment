import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'clavesecretade32caracteres_minimo!'; // Debe ser de 32 bytes
const IV_LENGTH = 16; 

export function cifrar(texto: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(texto, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function descifrar(textoCifrado: string): string {
  const partes = textoCifrado.split(':');
  const iv = Buffer.from(partes.shift()!, 'hex');
  const textoEncriptado = Buffer.from(partes.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(textoEncriptado, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}