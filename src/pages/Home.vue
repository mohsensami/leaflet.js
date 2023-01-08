<template>
  <div class="container py-8">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div class="flex flex-col justify-between gap-4 bg-white shadow-md" v-for="(product, index) in products" :key="index">
        <div class="flex justify-center relative">
          <div class="flex gap-1 items-center absolute left-0 text-sm p-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
            <span>{{ product.rating.rate }}</span>
          </div>
          <router-link :to="{ name: 'single', params: { id: product.id } }">
            <img class="pt-4 w-36 md:w-64 px-4" :src="product.image" :alt="product.title" />
          </router-link>
        </div>
        <div class="flex flex-col gap-4 p-3">
          <router-link :to="{ name: 'single', params: { id: product.id } }"
            ><h3 class="text-lg text-bold relative">{{ product.title.slice(0, 20) }}</h3></router-link>
          <div class="absolute left-0 -top-6 text-sm">
            Count: <span :class="{ 'text-red-500': product.rating.count < 100, 'text-green-500': product.rating.count > 200 }">{{ product.rating.count }}</span>
          </div>
          <div class="flex flex-col gap-2 sm:flex-row justify-between">
            <span>Category: {{ product.category }}</span>
            <span class="text-red-500">{{ product.price }} $</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
const products = ref<any>([]);
const loading = ref(true);

const getProducts = async () => {
  await axios
    .get("https://fakestoreapi.com/products")
    .then(function (response) {
      products.value = response.data;
      loading.value = false;
    })
    .catch(function (error) {
      console.log(error);
    });
};

onMounted(async () => {
  try {
    getProducts();
  } catch (error) {}
});
</script>

<style>
</style>