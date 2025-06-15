// services/auth.ts
import axios from 'axios';

export async function login(username: string, password: string) {
  // console.log("username", username)
  // console.log("password", password)
  const response = await axios.post('http://localhost:8000/api/login_check', {
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
