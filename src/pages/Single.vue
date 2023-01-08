<template>
  {{ product }}
</template>

<script setup lang=ts>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const product = ref<any>([]);

const getProduct = async () => {
  await axios
    .get(`https://fakestoreapi.com/products/${route.params.id}`)
    .then(function (response) {
      product.value = response.data;
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