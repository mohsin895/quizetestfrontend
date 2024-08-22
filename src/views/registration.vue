<template>
    <div class="container mx-auto">
      <div class="font-bold text-black mt-40">
        <div class="erp-login">
          <div class="login-page bg-white w-2/5" >
          
            <div class="flex items-left justify-left space-x-4 mt-5">
            
             
            </div>
            <form @submit.prevent="loginMethod(1)" class="login-border p-4" >
              <div class="erp-form ">
                <div class="flex">
                  <label for="username">First Name:</label>
                  <input type="text" id="username"  :style="{
                          border: fNameError
                            ? '1px solid red'
                            : '1px solid #CED4DA',
                        }"
                        @keyup="formValidation('fName')" v-model="fName" class="ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
                      
                </div>
                <div class="text-red-500 text-xs mt-1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     {{ fNameErrorMessage }}
                      </div>
                <div class="flex mt-2">
                  <label for="username">Last Name:</label>
                  <input type="text" id="username"  :style="{
                          border: lNameError
                            ? '1px solid red'
                            : '1px solid #CED4DA',
                        }"
                        @keyup="formValidation('lName')" v-model="lName" class="ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
                </div>
                <div class="text-red-500 text-xs mt-1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     {{ lNameErrorMessage }}
                      </div>
                <div class="flex mt-2">
                  <label for="username">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                  <input type="email" id="username"  :style="{
                          border: userNameError
                            ? '1px solid red'
                            : '1px solid #CED4DA',
                        }"
                        @keyup="formValidation('userName')" v-model="userName" class="ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
                </div>
                <div class="text-red-500 text-xs mt-1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     {{ userNameErrorMessage }}
                      </div>
                <div class="mt-4 flex">
                  <label for="password">Password:&nbsp;&nbsp;</label>
                  <input type="password" id="password"  :style="{
                          border: passwordError
                            ? '1px solid red'
                            : '1px solid #CED4DA',
                        }"
                        @keyup="formValidation('password')" v-model="password" class="ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
                </div>
                <div class="text-red-500 text-xs mt-1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     {{ passwordErrorMessage }}
                      </div>
              </div>
              <div class="text-center">
                <button class="bg-orange-500 mx-auto w-36 h-10 text-white" type="submit">Reqistration</button>
              </div>
            </form>
            <div class="text-center">
              <router-link :to="{name:'login'}"> <button class="bg-orange-500 mx-auto w-36 h-10 mt-4 text-white" type="submit">back</button></router-link>
             
            </div>
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
  
  const fName = ref('');
  const lName = ref('');
  const userName = ref('');
  const password = ref('');
  
  const lNameError = ref(false);
const lNameErrorMessage = ref("");
const fNameError = ref(false);
const fNameErrorMessage = ref("");
const userNameError = ref(false);
const userNameErrorMessage = ref("");
const passwordError = ref(false);
const passwordErrorMessage = ref("");


function validateFName() {
  if (!fName.value || fName.value.length === 0) {
    fNameError.value = true;
    fNameErrorMessage.value = " First Name Field cannot be empty";
    return false;
  } else {
    fNameError.value = false;
    fNameErrorMessage.value = "";
    return true;
  }
}
function validateLName() {
  if (!lName.value || lName.value.length === 0) {
    lNameError.value = true;
    lNameErrorMessage.value = " Last Name Field cannot be empty";
    return false;
  } else {
    lNameError.value = false;
    lNameErrorMessage.value = "";
    return true;
  }
}


function validateUserName() {
  if (!userName.value || userName.value.length === 0) {
    userNameError.value = true;
    userNameErrorMessage.value = " Email Field cannot be empty";
    return false;
  } else {
    userNameError.value = false;
    userNameErrorMessage.value = "";
    return true;
  }
}

function validatePassword() {
  if (!password.value || password.value.length === 0) {
    passwordError.value = true;
    passwordErrorMessage.value = " Password Field cannot be empty";
    return false;
  } else {
    passwordError.value = false;
    passwordErrorMessage.value = "";
    return true;
  }
}

function formValidation(fieldName) {
  if (fieldName === "submit") {
    const isFNameValid = validateFName();
    const isLNameValid = validateLName();
    const isUserNameValid = validateUserName();
    const isPasswordValid = validatePassword();
    return isFNameValid && isLNameValid && isUserNameValid && isPasswordValid;
  } else if (fieldName === "fName") {
    validateFName();
  } else if (fieldName === "lName") {
    validateLName();
  }
  else if (fieldName === "userName") {
    validateUserName();
  }
  else if (fieldName === "password") {
    validatePassword();
  }
}

  
  const loginMethod = async (dataId) => {
    if (formValidation("submit")) {
      const formData = new FormData();
      formData.append('dataId', dataId);
      formData.append("fName", fName.value);
      formData.append("lName", lName.value);
      formData.append("userName", userName.value);
      formData.append("password", password.value);
  
      const res = await axios.post("/staff/v1/user/registration", formData);
      let msg = res.data.errMsgFlag;
      let errMsg = res.data.errMsg;
      router.push({ name: "login" });
      if (msg==false) {
        toast.success(res.data.msg);
   
  
      } else {
        toast.error(errMsg);
      }
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
  