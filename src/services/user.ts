import axios from 'axios';

export async function fetchUser(id: number, token: string) {
  try {
    const response = await axios.get(`http://localhost:8000/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur", error);
    return null;
  }
}
