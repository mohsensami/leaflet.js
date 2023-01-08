<template>
  {{ route.params.id }}
</template>

<script setup lang=ts>
import axios from "axios";
import { useRoute } from "vue-router";
const route = useRoute();

function getProduct() {
  axios
    .get(`https://fakestoreapi.com/products/${route.params.id}`)
    .then(function (response) {
      // item.value = response.data;
      // console.log(item.value);
    })
    .catch(function (error) {
      // console.log(error);
    });
}
</script>

<style>
</style>