
<template>
    <div class="bg-black page-header  fixed">
      <div
        class="header-body text-white flex justify-between items-center pl-16 pr-16 text-center container"
      >
        <div class="ml-10"></div>
        <div class="mr-10">
          <div class="wrapper">
            <ul class="main-menu">
              <li
                id="menu-item-6"
                class="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-4 current_page_item menu-item-6"
              >
              <router-link :to="{name:'DashboardEmployee'}">Home</router-link>
              </li>
             
  
              <li
                id="menu-item-15"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-15"
              >
                <a href="#">My Account</a>
                <ul class="sub-menu">
                  <li
                    id="menu-item-78"
                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-78"
                  >
                    <a href="#" @click="openModal">Change Password</a>
                  </li>
                  <li
                    id="menu-item-78"
                    class="menu-item menu-item-type-post_type menu-item-object-page menu-item-78"
                  >
                    <a href="#" @click.prevent="logout()">Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
      v-if="isModalOpen"
      ref="modalBackdrop"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start max-h-screen overflow-y-auto justify-center pt-20"
      @click="handleBackdropClick"
    >
      <!-- Modal -->
      <div class="bg-white shadow-2xl w-full max-w-3xl" @click.stop>
        <div
          class="flex justify-between items-center p-6 mb-4 border-b border-gray-200 modal-header"
        >
          <h2 class="text-xl inline-flex items-center font-semibold">
           
            Change Password
          </h2>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200"
          >
            &times;
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="pl-6 pr-6 ">
              <div class="flex">
                <label for="password" class="w-1/5">New Password:</label>
                <div class="flex-grow">
                <input type="password" id="password" v-model="password"  :style="{
                        border: passwordError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('password')" class="min-w-96 ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
                      <div class="text-red-500 text-xs mt-1 ml-2">
                      {{ passwordErrorMessage }}
                    </div>
                    </div>
              </div>
              
              <div class="flex mt-4">
                <label for="conPassword" class="w-1/5">Confirm Password:</label>
                <div class="flex-grow">
                <input type="tpasswordime" id="conPassword"  :style="{
                        border: conPasswordError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="formValidation('conPassword')" v-model="conPassword" class="min-w-96 ml-2 h-9 pl-2 text-black border focus:outline-none focus:ring focus:border-loginFocus" />
                      <div class="text-red-500 text-xs mt-1 ml-2">
                      {{ conPasswordErrorMessage }}
                    </div>
                    </div>
              </div>
             
            </div>

          <div class="border-t border-gray-200 modal-footer">
            <div class="p-6 flex items-end justify-end space-x-4">
              <button
                @click="closeModal"
                class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right"
                type="button"
              >
                Cancel
              </button>
              <button
                class="bg-customCyan hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right"
                type="submit"
              >
                <span class="inline-flex items-center text-white">
                 
                    <icon name="check" size="15px" style="margin-right: 8px"
                  />

               Chnage Password
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useToast } from 'vue-toastification';
  
  const toast = useToast();
const router = useRouter();
const isModalOpen = ref(false);
const modalBackdrop = ref(null);
const passwordError = ref(false);
const conPasswordError = ref(false);
const passwordErrorMessage=ref("");
const conPasswordErrorMessage=ref("");
const password= ref("");
const conPassword= ref("");


function openModal() {

  isModalOpen.value = true;
}



function closeModal() {
  isModalOpen.value = false;
  
  passwordError.value = false;
  conPasswordError.value = false;
  passwordErrorMessage.value=" ";
  conPasswordErrorMessage.value="";
  password.value="";
  conPassword.value="";

}

function handleBackdropClick(event) {
  if (event.target === modalBackdrop.value) {
    closeModal();
  }
}
function validateNewPassword() {
    if (!conPassword.value || conPassword.value.length === 0) {
      conPasswordError.value = true;
      conPasswordErrorMessage.value = "Confirm Password  Field cannot be empty";
      return false;
    }else if(conPassword.value !== password.value){
      conPasswordError.value = true;
      conPasswordErrorMessage.value = "Password and Confirm Password do not match";
      return false;
    }
     else {
      conPasswordError.value = false;
      conPasswordErrorMessage.value = "";
      return true;
    }

  
  }
  function validatePassword() {
    if (!password.value || password.value.length === 0) {
      passwordError.value = true;
      passwordErrorMessage.value = "Password Field cannot be empty";
      return false;
    }else if (!password.value || password.value.length < 6) {
      passwordErrorMessage.value = 'Password must be at least 6 character';
   
      return false;
        }  else {
      passwordError.value = false;
      passwordErrorMessage.value = "";
      return true;
    }
  }
  
  function formValidation(fieldName) {
    if (fieldName === "submit") {
      const isStartTimeValid = validatePassword();
      const isEndTimeValid = validateNewPassword();
      return isStartTimeValid && isEndTimeValid;
    } else if (fieldName === "password") {
      validatePassword();
    }else if (fieldName === "conPassword") {
      validateNewPassword();
    }
  }
  
  async function submitForm() {
    if (formValidation("submit")) {
      try {
        const token = window.localStorage.getItem("token");
        if (!token) {
          console.error("Authentication token is missing.");
          return;
        }
        const config = {
          headers: {
            Authorization: "Bearer " + token,
          },
        };
        const payload = {
          password: password.value,
          conPassword: conPassword.value,
         
     
        };
        const response = await axios.post(
          "/employee/v1/erp/update/password",
          payload,
          config
        );
        if (response.data.msgFlag) {
          toast.success(response.data.msg);
          
          closeModal();
        } else {
          toast.error(response.data.errMsg);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("An error occurred while submitting the form.");
      }
    }
  }
  const logout = () => {
    localStorage.removeItem("token");
    router.push({ name: "login" });
  };
  </script>
  
  <style scoped>
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
  .right-nav {
    margin-top: 46px;
  }
  .wrapper {
    width: 100%;
  
    text-align: center;
  }
  .main-menu {
    text-align: left;
    display: inline-block;
  }
  .main-menu a,
  .main-menu a:hover {
    text-decoration: none;
  }
  .main-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .main-menu li {
    display: block;
    padding: 0;
    position: relative;
    vertical-align: top;
  }
  
  .main-menu > li > a {
    display: block;
    padding: 0.75em 1.25em;
  }
  .main-menu ul.sub-menu {
    position: relative;
    padding: 0;
  }
  .main-menu ul.sub-menu li {
    display: block;
  }
  .main-menu ul.sub-menu a {
    background-color: #666;
    color: #fff;
    padding: 0.75em 1.25em;
    display: block;
  }
  
  .main-menu li {
    display: inline-block;
  }
  .main-menu > li > a {
    display: block;
  }
  .main-menu > li > a:hover {
    background-color: #f0f0f0;
    color: #039;
  }
  
  .main-menu > li:hover ul.sub-menu,
  .main-menu > li:focus ul.sub-menu {
    visibility: visible;
    opacity: 1;
  }
  .main-menu > li.menu-item-has-children {
    padding-right: 1.5em;
    overflow: hidden;
  }
  .main-menu > li.menu-item-has-children a {
    padding: 0.75em 0.7em 0.7em 1.25em;
  }
  .main-menu > li.menu-item-has-children:hover a {
    background-color: #666;
    color: #fff;
  }
  
  .main-menu > li.menu-item-has-children:after {
    content: "";
    position: absolute;
    right: 0.5em;
    top: 1.2em;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 5px 0 5px;
    border-color: #007bff transparent transparent;
  }
  
  .main-menu > li.menu-item-has-children:hover,
  .main-menu > li.menu-item-has-children:focus {
    overflow: visible;
    background-color: #666;
  }
  
  .main-menu ul.sub-menu {
    width: 12em;
    position: absolute; /*top:100%;*/
    top: 0;
    z-index: 900;
    padding-top: 3em;
  }
  .main-menu ul.sub-menu li {
    opacity: 0;
  }
  
  .main-menu > li.menu-item-has-children:hover ul.sub-menu,
  .main-menu > li.menu-item-has-children:focus ul.sub-menu {
    top: 100%;
    padding-top: 0;
  }
  
  .main-menu > li.menu-item-has-children:hover ul.sub-menu li,
  .main-menu > li.menu-item-has-children:focus ul.sub-menu li {
    opacity: 1;
  }
  
  .main-menu ul.sub-menu li {
    display: block;
  }
  .main-menu ul.sub-menu a {
    display: block;
  }
  .main-menu ul.sub-menu a:hover {
    background-color: #999;
  }
  
  a,
  .sub-menu,
  .menu-item {
    -webkit-transition: all 0.3s ease-out;
    -moz-transition: all 0.3s ease-out;
    -ms-transition: all 0.3s ease-out;
    -o-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
  }
  @media(min-width:1200px){
    .container{
      width: 1170px;
      margin: auto;
    }
  }
  </style>