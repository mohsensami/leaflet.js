<template>
  <LoadingComponent v-if="loading" />

  <div v-else class="container py-8">
    <div class="flex justify-between items-center">
      <div class="flex justify-start space-x-2 my-4">
        <a @click.prevent="gridColumn = 3" href="">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="19px" height="19px" viewBox="0 0 19 19" enable-background="new 0 0 19 19" xml:space="preserve">
            <rect width="5" height="5"></rect>
            <rect x="7" width="5" height="5"></rect>
            <rect x="14" width="5" height="5"></rect>
            <rect y="7" width="5" height="5"></rect>
            <rect x="7" y="7" width="5" height="5"></rect>
            <rect x="14" y="7" width="5" height="5"></rect>
            <rect y="14" width="5" height="5"></rect>
            <rect x="7" y="14" width="5" height="5"></rect>
            <rect x="14" y="14" width="5" height="5"></rect>
          </svg>
        </a>

        <a @click.prevent="gridColumn = 4" href="">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="19px" height="19px" viewBox="0 0 19 19" enable-background="new 0 0 19 19" xml:space="preserve">
            <rect width="4" height="4"></rect>
            <rect x="5" width="4" height="4"></rect>
            <rect x="10" width="4" height="4"></rect>
            <rect x="15" width="4" height="4"></rect>
            <rect y="5" width="4" height="4"></rect>
            <rect x="5" y="5" width="4" height="4"></rect>
            <rect x="10" y="5" width="4" height="4"></rect>
            <rect x="15" y="5" width="4" height="4"></rect>
            <rect y="15" width="4" height="4"></rect>
            <rect x="5" y="15" width="4" height="4"></rect>
            <rect x="10" y="15" width="4" height="4"></rect>
            <rect x="15" y="15" width="4" height="4"></rect>
            <rect y="10" width="4" height="4"></rect>
            <rect x="5" y="10" width="4" height="4"></rect>
            <rect x="10" y="10" width="4" height="4"></rect>
            <rect x="15" y="10" width="4" height="4"></rect>
          </svg>
        </a>
      </div>
      <div>
        <select @change="changeLimits($event)" class="form-select form-select-sm appearance-none block w-32 px-2 py-1 text-sm font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
          <option :selected="products.length == 4" value="4">4</option>
          <option :selected="products.length == 8" value="8">8</option>
          <option :selected="products.length == 12" value="12">12</option>
          <option :selected="products.length == 16" value="16">16</option>
          <option :selected="products.length == 20" value="20">20</option>
        </select>
      </div>
    </div>
    <div :class="gridColumn == 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'" class="grid grid-cols-2 gap-4">
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
            ><h3 class="text-lg text-bold relative">{{ product.title.slice(0, 20) }}</h3></router-link
          >
          <div class="absolute left-0 -top-6 text-sm">
            Count: <span :class="{ 'text-red-500': product.rating.count < 100, 'text-green-500': product.rating.count > 200 }">{{ product.rating.count }}</span>
          </div>
          <div class="flex flex-col gap-2 sm:flex-row justify-between">
            <span
              >Category: <router-link :to="{ name: 'category', params: { slug: product.category } }">{{ product.category }}</router-link></span
            >
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

import LoadingComponent from "../components/LoadingComponent.vue";

const products = ref<any>([]);
const loading = ref(true);

const gridColumn = ref(4);

const getProducts = async (limit: any = 20) => {
  loading.value = true;
  await axios
    .get(`https://fakestoreapi.com/products?limit=${limit}`)
    .then(function (response) {
      products.value = response.data;
      loading.value = false;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const changeLimits = (event: any) => {
  getProducts(event.target.value);
  // console.log(event.target.value);
};

onMounted(async () => {
  try {
    getProducts();
  } catch (error) {}
});
</script>

<style>
</style>