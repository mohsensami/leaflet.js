<template>
<LoadingComponent v-if="loading" />
  <div v-else class="container py-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-white p-8">
      <div>
        <img class="pt-4 px-4" :src="product.image" :alt="product.title" />
      </div>
      <div class="flex flex-col gap-4 relative">
        <div class="flex gap-1 items-center absolute right-0 top-8 text-sm p-1 bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
          <!-- <span>{{ product.rating.rate }}</span> -->
        </div>
        <h1 class="text-2xl py-4 mt-4 pr-12 leading-9">{{ product.title }}</h1>
        <p class="leading-9 text-justify">{{ product.description }}</p>
        <p>Category: {{ product.category }}</p>
        <p class="text-green-500 text-2xl">{{ product.price }} $</p>
      </div>
    </div>
  </div>
</template>

<script setup lang=ts>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import LoadingComponent from '../components/LoadingComponent.vue'

const route = useRoute();

const product = ref<any>([]);
const loading = ref(true);

const getProduct = async () => {
  await axios
    .get(`https://fakestoreapi.com/products/${route.params.id}`)
    .then(function (response) {
      product.value = response.data;
      loading.value = false;
      // console.log(item.value);
    })
    .catch(function (error) {
      // console.log(error);
    });
};

onMounted(async () => {
  try {
    getProduct();
  } catch (error) {}
});
</script>

<style>
</style>