<template>
  <div class="container">
    <div class="is-flex is-flex-direction-column is-align-items-center">
      <div class="column is-half">
        <div class="card mt-5" v-for="user in users" :key="user.id">
          <div class="card-content">
            <div class="content">
              {{ user.firstname }} {{ user.lastname }}
            </div>
            <footer class="card-footer">
              {{ user.email }}
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}

const users = ref<User[]>()

onMounted(async () => {
  try {
    const token = localStorage.getItem('jwt')
    const res = await axios.get('http://localhost:8000/api/users',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    users.value = res.data
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error)
  }
})
</script>

<style scoped>

</style>
