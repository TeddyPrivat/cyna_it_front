// import axios from 'axios'

export function getPayloadFromToken(token: string): any {
  try {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    const decoded = atob(padded);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Erreur de décodage JWT', error);
    return null;
  }
}