<template>
    <div class="layout bg-white">
      <nav-bar />
      <div class="erp-body flex min-h-screen container  pt-11 pb-10">
        <div class="right-side hidden md:block bg-bodyColor w-1/3" >
          <header-page />
        </div>
        <div class="left-side bg-bodyColor  w-full">
          <RouterView />
        </div>
      </div>
   
    </div>
  </template>
  
  <script setup>
  import HeaderPage from '@/layout/EmployeeRightbar.vue';

  import NavBar from '@/layout/EmployeeNavbar.vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter(); // Correctly call useRouter
  
  const token = localStorage.getItem("token");
  if (!token) {
    router.push({ name: 'login' }).catch(err => {
      console.error(err);
    });
  }
  </script>
  
  <style scoped>
   @media(min-width:1200px){
    .container{
      width: 1180px;
      margin: auto;
    }
  }

  @media(min-width:992px){
    .container{
      width: 980px;
      margin: auto;
    }
  }
  /* Your styles here */
  </style>
  