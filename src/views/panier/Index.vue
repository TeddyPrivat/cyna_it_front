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
                            <button class="btn btn-danger isResponsive" @click="removeItem(item.id)">Supprimer</button>
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

<script setup lang="ts">
import { ref, computed, onMounted, type Ref } from 'vue'
import api from '@/services/api'
import { useUserStore } from '@/stores/user.ts'

interface CartItem {
    id: number
    product?: {
        imgUrl?: string
        title: string
        price: number
    } | null
    service?: {
        img_url?: string
        title: string
        price: number
    } | null
    image: string
    name: string
    price: number
    quantity: number
}

const cartItems: Ref<CartItem[]> = ref([])

const userStore = useUserStore()

async function fetchCart(): Promise<void> {
    console.log('Fetching cart for user:', userStore.user.id)
    const { data } = await api.get<CartItem[]>(`/api/cart/${userStore.user.id}`)

    if (!Array.isArray(data) || data.length === 0) {
        console.error('No items found in cart data:', data)
        cartItems.value = []
        return
    }

    const items = data

    items.forEach(item => {
        if (item.product) {
            item.image = item.product.imgUrl || '/default-product-image.jpg'
            item.name = item.product.title
            item.price = item.product.price
        } else if (item.service) {
            item.image = item.service.img_url || '/default-service-image.jpg'
            item.name = item.service.title
            item.price = item.service.price
        } else {
            item.image = '/default-product-image.jpg'
            item.name = 'Article inconnu'
            item.price = 0
        }
    })

    cartItems.value = items
    console.log('Cart items fetched:', cartItems.value)
}

onMounted(async () => {
    await userStore.initializeUser()
    console.log('User in cart:', userStore.user.id)
    await fetchCart()
})

const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function formatPrice(price: number): string {
    return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

function updateQuantity(item: CartItem): void {
    if (item.quantity < 1) item.quantity = 1
    // TODO: update backend or store
}

function removeItem(id: number): void {
    cartItems.value = cartItems.value.filter(item => item.id !== id)
    // TODO: update backend or store
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