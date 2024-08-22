<template>
  <div class="container mx-auto">
    <div class="font-bold text-black mt-40">
      <div class="erp-login">
        <div class="login-page bg-white w-96" >
        
          <div class="flex items-left justify-left space-x-4 mt-5">
            <span v-bind:class="[ activetab === '1' ? 'active-margin' : '' ]">
                <h5 
                v-on:click="activetab='1'" v-bind:class="[ activetab === '1' ? 'active' : '' ]"
                class="p-2 cursor-pointer">
                Student
                </h5>
           </span>
           <span v-bind:class="[ activetab === '2' ? 'active-margin' : '' ]">
                <h5 
                v-on:click="activetab='2'" v-bind:class="[ activetab === '2' ? 'active' : '' ]"
                style="margin-left: 10px;" class="p-2 cursor-pointer">
                Admin
                </h5>
              </span>
           
          </div>
          <form @submit.prevent="loginMethod(1)" class="login-border p-4" v-if="activetab==1">
            <div class="erp-form ">
              <div class="flex">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="userName" class="ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
              </div>
              
              <div class="mt-4 flex">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" class="ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
              </div>
            </div>
            <div class="text-center">
              <button class="bg-orange-500 mx-auto w-36 h-10 text-white" type="submit">Login</button>
            </div>
            <div class="text-center">
              <router-link :to="{name:'Registration'}"> <button class="bg-orange-500 mx-auto w-36 h-10 mt-4 text-white" type="submit">Registration</button></router-link>
             
            </div>
          </form>
          <form @submit.prevent="loginMethod(2)" class="border p-4" v-if="activetab==2">
            <div class="erp-form ">
              <div class="flex">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="userName" class="ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
              </div>
             
              <div class="mt-4 flex">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" class="ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
              </div>
            </div>
            <div class="text-center">
              <button class="bg-orange-500 mx-auto w-36 h-10 text-white" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, inject, ref } from 'vue';
import { useGlobalStore } from '@/store/global'; 
import { useToast } from 'vue-toastification'; 
import { useRouter } from 'vue-router';
import axios from 'axios';

const globalStore = useGlobalStore();
const baseUrl = inject('$baseUrl');
const toast = useToast();
const router = useRouter();
const activetab=ref('1');

const globalData = computed(() => {
  const storedData = sessionStorage.getItem("globalData");
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return globalStore.globalData;
  }
});

onMounted(() => {
  const storedData = sessionStorage.getItem("globalData");
  if (!storedData) {
    globalStore.fetchGlobalData().then(() => {
      sessionStorage.setItem("globalData", JSON.stringify(globalStore.globalData));
    });
  }
});


const userName = ref('');
const password = ref('');



const loginMethod = async (dataId) => {
  try {
    const formData = new FormData();
    formData.append('dataId', dataId);

    formData.append("userName", userName.value);
    formData.append("password", password.value);

    const res = await axios.post("/staff/v1/login", formData);
    let msg = res.data.message;
    let errMsg = res.data.errMsg;

    if (res.data.status) {
      toast.success(msg);
      const token = res.data.token;
      localStorage.setItem('token', token);
      if(dataId == 2){
        router.push({ name: "QuizeList" });
      }
      if(dataId == 1){
        router.push({ name: "DashboardEmployee" });
      }

    } else {
      toast.error(errMsg);
    }
  } catch (error) {
    console.error("Error occurred during login:", error);
  }
};

</script>

<style scoped>
.login-page {
  padding: 10px;
  margin: 60px auto;

  border-top: solid 2px #FB4506; 
}
.login-page img {
  height: 45px;
  width: 140px;
}
.erp-form {
  padding: 20px;
}
.active{
  background: #fff;
  padding: 7px 15px 9px;
  border: solid 1px #eee;
    border-top: solid 2px #72c02c;
    border-bottom: none !important; /* Example border-bottom style */
}
.login-border{
  padding: 10px 16px;
  border: solid 1px #eee;
}
.active-margin{
  margin-bottom: -1px;
}
</style>
