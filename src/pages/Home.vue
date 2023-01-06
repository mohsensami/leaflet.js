<template>
  <div class="container py-8">
    <div class="grid grid-cols-4 gap-4">
        <div class="flex flex-col gap-4 bg-white p-4" v-for="(product, index) in products" :key="index">
            <div class="flex justify-center"><img width="250" :src="product.image" alt="{{product.title}"></div>
            <h3 class="text-lg text-bold">{{product.title}}</h3>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
const products = ref<any>([]);
const loading = ref(true);


const getProducts = async() => {
  await axios
    .get('https://fakestoreapi.com/products')
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
      } catch (error) {
        
      }
    });


</script>

<style>

</style>