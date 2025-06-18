import api from '@/services/api'

export async function fetchUser(id: number) {
  try {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur", error);
    return null;
  }
}
