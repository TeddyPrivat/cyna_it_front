<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import api from '@/services/api'
import type { User } from '@/types/User.ts'

const users = ref<User[]>([]);
const activeDropdown = ref<number | null>(null);
const allRoles : string[] = ["ROLE_ADMIN", "ROLE_USER"];
const searchedInput = ref<string>("");

const filteredInput = computed(() => {
  return users.value.filter(user => {
    return user.email.toLowerCase().includes(searchedInput.value.trim().toLowerCase()) ||
      user.firstname.toLowerCase().includes(searchedInput.value.trim().toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchedInput.value.trim().toLowerCase())
  });
})
function toggleDropdown(userId: number){
  activeDropdown.value = activeDropdown.value === userId ? null : userId;
}

async function assignRole(user: User, role: string) {
  user.roles = [role];
  activeDropdown.value = null;
  try{
    await api.put(`/api/users/role/${user.id}`, { role: user.roles });
    console.log(`Le rôle de l'utilisateur ${user.id} a bien changé.`);
  }catch(error){
    console.error("Le changement de rôle n'a pas pu se faire.", error);
  }
}
onMounted(async () => {
  const response = await api.get<User[]>('/api/users');
  users.value = response.data;
  console.log(users);
});
</script>

<template>
  <section class="section">
    <div class="container is-fluid">
      <div class="is-flex is-justify-content-center">
          <div class="control has-icons-left">
            <input class="input" type="search" placeholder="Rechercher un utilisateur..." v-model="searchedInput"/>
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </div>
      </div>
      <div class="columns is-centered">
        <div class="column is-12">
          <div class="table-container mt-5">
            <table class="table is-fullwidth is-striped is-hoverable is-bordered">
              <thead>
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in filteredInput" :key="user.id">
                <td>{{ user.lastname }}</td>
                <td>{{ user.firstname }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <span class="tag is-info is-light">
                      {{ user.roles[0]}}
                    </span>
                </td>
                <td>
                  <div class="dropdown is-left" :class="{ 'is-active': activeDropdown === user.id }">
                    <div class="dropdown-trigger">
                      <button
                        class="button is-small"
                        @click="toggleDropdown(user.id)"
                        aria-haspopup="true"
                        aria-controls="dropdown-menu"
                      >
                        <span>Sélectionner un rôle</span>
                        <span class="icon is-small">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                          </span>
                      </button>
                    </div>
                    <div class="dropdown-menu" id="dropdown-menu" role="menu">
                      <div class="dropdown-content">
                        <a
                          v-for="role in allRoles"
                          :key="role"
                          class="dropdown-item"
                          @click="assignRole(user, role)"
                        >
                          {{ role.replace('ROLE_', '') }}
                        </a>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.dropdown-menu {
  z-index: 1000;
}
.table-container {
  overflow: visible;
}
</style>
