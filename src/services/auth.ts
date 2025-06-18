import type { ForgotPasswordResponse } from '@/types/auth';
import api from '@/services/api';


export async function login(username: string, password: string) {
  // console.log("username", username)
  // console.log("password", password)
  const response = await api.post('/api/login_check', {
    username,
    password,
  });
  return response.data.token;
}
export async function signup(
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  confirmPassword: string,
  adress: string = 'chez moi'
) {
  const response = await fetch('http://127.0.0.1:8000/api/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      confirm_password: confirmPassword,
      firstname,
      lastname,
      adress,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Signup failed');
  }

  return await response.json();
}

export async function forgetPassword(email: string): Promise<ForgotPasswordResponse> {

  const response = await fetch(`http://localhost:8000/api/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const text = await response.text();
  let data;

  try {
    data = await JSON.parse(text);
  } catch {
    throw new Error('Réponse invalide du serveur');
  }

  if (!response.ok) {
    throw new Error(data.error || 'Erreur inconnue');
  }

  return data;
}

