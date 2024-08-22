<template>
    

       
  <div class="right-nav w-52 text-white  mt-5 " >
 
  <ul>
    <!-- <li class="h-10 py-2 border-b-2 border-gray-500 " :class="{ 'bg-rightActiveColor': $route.name === 'Dashboard', 'hover:bg-rightHoverColor': $route.name !== 'Dashboard' }">
    <span class="ml-4">
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
    </span>
</li> -->
<li class="h-10 py-2 border-b-2 border-gray-500" :class="{ 'bg-rightActiveColor': $route.name === 'QuizeList', 'hover:bg-rightHoverColor': $route.name !== 'QuizeList' }">
    <span class="ml-4">
        <router-link :to="{ name: 'QuizeList' }">Quize</router-link>
    </span>
</li>






  </ul>

 
  </div>
       
   
</template>

<style scoped>
.active-li {
    background-color: blue; /* Change background color to highlight */
}
.page-header {
    width: 100%;
    padding: 0 20px 0 20px;
    margin: 0;
    border: 0px;
    padding: 0px;
    box-shadow: none;
    height: 46px;
    min-height: 46px;
    filter: none;
    background-image: none;
}


    </style>
