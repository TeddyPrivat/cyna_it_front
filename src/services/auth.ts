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
