<template>
    <div class="panier-page">
        <h1 class="panier-title">Votre Panier</h1>
        <div v-if="cartItems.length === 0" class="empty-cart">
            <p>Votre panier est vide.</p>
            <router-link to="/" class="btn btn-primary">Continuer vos achats</router-link>
        </div>
        <div v-else>
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix Unitaire</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cartItems" :key="item.id">
                        <td class="product-info">
                            <img :src="item.image" alt="" class="product-img" />
                            <span>{{ item.name }}</span>
                        </td>
                        <td>
                            <input type="number" v-model.number="item.quantity" min="1" class="qty-input" @change="updateQuantity(item)" />
                        </td>
                        <td>{{ formatPrice(item.price) }}</td>
                        <td>{{ formatPrice(item.price * item.quantity) }}</td>
                        <td>
                            <button class="btn btn-danger" @click="removeItem(item.id)">Supprimer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="cart-summary">
                <span>Total :</span>
                <span class="cart-total">{{ formatPrice(cartTotal) }}</span>
            </div>
            <div class="cart-actions">
                <router-link to="/checkout" class="btn btn-success">Passer à la caisse</router-link>
                <router-link to="/" class="btn btn-secondary">Continuer vos achats</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const cartItems = ref([])

const user = ref(null)

async function fetchUser() {
    // Supposons que l'API utilisateur retourne l'utilisateur connecté à /api/user
    const { data } = await axios.get('/api/user')
    user.value = data
}

async function fetchCart() {
    if (user.value && user.value.id) {
        const { data } = await axios.get(`/api/carte/${user.value.id}`)
        cartItems.value = data.items || []
    }
}

onMounted(async () => {
    await fetchUser()
    await fetchCart()
})

const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function formatPrice(price) {
    return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

function updateQuantity(item) {
    if (item.quantity < 1) item.quantity = 1
    // Mettre à jour le panier dans le store ou l'API ici si besoin
}

function removeItem(id) {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
    // Mettre à jour le panier dans le store ou l'API ici si besoin
}

</script>

<style scoped>
.panier-page {
    max-width: 900px;
    margin: 2rem auto;
    padding: 2rem;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.panier-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #2c3e50;
    text-align: center;
}
.empty-cart {
    text-align: center;
    padding: 2rem 0;
}
.cart-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
}
.cart-table th, .cart-table td {
    padding: 1rem;
    border-bottom: 1px solid #eee;
    text-align: left;
}
.product-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.product-img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #eee;
}
.qty-input {
    width: 60px;
    padding: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.cart-summary {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    gap: 1rem;
}
.cart-total {
    font-weight: bold;
    color: #27ae60;
}
.cart-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}
.btn {
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    font-weight: 500;
    transition: background 0.2s;
}
.btn-primary {
    background: #2980b9;
    color: #fff;
}
.btn-success {
    background: #27ae60;
    color: #fff;
}
.btn-secondary {
    background: #bdc3c7;
    color: #2c3e50;
}
.btn-danger {
    background: #e74c3c;
    color: #fff;
}
.btn:hover {
    opacity: 0.9;
}
</style>