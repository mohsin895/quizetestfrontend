<template>
    <div class="loyel-erp-department mt-10 ml-10 mr-10 bg-white p-6">
      <div class="card w-full">
        <div class="p-2 mb-4">
          <div class="bg-customCyan hover:bg-hoverCyan p-2 w-48 cursor-pointer" @click="openModal">
            <span class="inline-flex items-center text-white">
              Add New Quize
              <icon name="plus" size="15px" style="margin-left: 8px" />
            </span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="border-collapse border border-slate-400 w-full min-w-max">
          <thead>
            <tr>
              <th class="border border-slate-300 h-10">Sr No.</th>
              <th class="border border-slate-300">Quize Name</th>
          
              <th class="border border-slate-300">Quize Marks</th>
              <!-- <th class="border border-slate-300">Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dataInfo, index) in dataList" :key="dataInfo.id">
              <td class="border border-slate-300 pl-4 h-16 text-sm">{{ index + 1 }}</td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.quize_name }}
              </td>
           
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.total_marks_info.totalMarks }}
              </td>
              <!-- <td class="border border-slate-300 pl-4 text-sm">
               
              </td> -->
              <td class="border border-slate-300 pl-4">
                <span class="inline-flex items-center">
                    <router-link
                          :to="{
                            name: 'QuestionList',
                            params: { dataId: dataInfo.id },
                          }"
                        
                        >
                    <span class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purpoleCus hover:bg-purpoleCusHover text-white">
              Add Queston
              <icon name="plus" size="15px" style="margin-left: 8px" />
            </span>
            </router-link>
                  <span class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purpoleCus hover:bg-purpoleCusHover text-white" @click="openModalEdit(dataInfo)">
                    <icon name="pencil" size="15px" style="margin-right: 10px" />
                    View/Edit
                  </span>
                  <span class="p-2 cursor-pointer inline-flex items-center text-xs bg-red-500 ml-4 hover:bg-red-700 text-white" @click="openModalDelete(dataInfo)">
                    <icon name="trash" size="15px" class="mr-2" />
                    Delete
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
  
      <!-- Modal Backdrop -->
      <div v-if="isModalOpen" ref="modalBackdrop" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start max-h-screen overflow-y-auto justify-center pt-20" @click="handleBackdropClick">
        <!-- Modal -->
        <div class="bg-white shadow-lg w-full max-w-lg " @click.stop>
          <div class="flex justify-between items-center p-6 mb-4 border-b border-gray-200 modal-header">
            <h2 class="text-xl inline-flex items-center font-semibold">
              <span v-if="editMode"> <icon name="pencil" size="15px" style="margin-right: 8px" /></span><span v-else> <icon name="plus" size="15px" style="margin-right: 8px" /></span>
              {{ editMode ? 'Edit Quize' : 'Add New Quize' }}
            </h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200">
              &times;
            </button>
          </div>
          <form @submit.prevent="submitForm">
            <div class="pl-6 pr-6 modal-body">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="quizeName">
                  <span :class="{ 'text-red-500': nameError }">Quize Name</span>
                </label>
                <input
                  v-model="quizeName"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Quize Name"
                  :style="{ border: nameError ? '1px solid red' : '1px solid #CED4DA' }"
                  @keyup="formValidation('quizeName')"
                />
                <div class="text-red-500 text-xs mt-1">{{ nameErrorMessage }}</div>
              </div>
              <!-- <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="quizeTime">
                  <span :class="{ 'text-red-500': timeError }">Quize Time(minutes)</span>
                </label>
                <input
                  v-model="quizeTime"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Quize Time"
                  :style="{ border: timeError ? '1px solid red' : '1px solid #CED4DA' }"
                  @keyup="formValidation('quizeTime')"
                />
                <div class="text-red-500 text-xs mt-1">{{ timeErrorMessage }}</div>
              </div> -->
              <!-- <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="quizeMark">
                  <span :class="{ 'text-red-500': markError }">Quize Mark</span>
                </label>
                <input
                  v-model="quizeMark"
                  type="text"
                  class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  placeholder="Quize Mark"
                  :style="{ border: markError ? '1px solid red' : '1px solid #CED4DA' }"
                  @keyup="formValidation('quizeMark')"
                />
                <div class="text-red-500 text-xs mt-1">{{ markErrorMessage }}</div>
              </div> -->
            
            </div>
  
            <div class="border-t border-gray-200 modal-footer">
              <div class="p-6 flex items-end justify-end space-x-4">
                <button @click="closeModal" class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right" type="button">
                  Cancel
                </button>
                <button class="bg-customCyan hover:bg-hoverCyan text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline text-right" type="submit">
                  <span class="inline-flex items-center text-white">
                    <span v-if="editMode"> <icon name="pencil" size="15px" style="margin-right: 8px" /></span><span v-else> <icon name="check" size="15px" style="margin-right: 8px" /></span>
                   
                    {{ editMode ? 'Update' : 'Submit' }}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  
      <!-- Delete Modal -->
      <div v-if="isModalOpenDelete" ref="modalBackdrop" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center pt-20" @click="handleBackdropClick">
        <!-- Modal -->
        <div class="bg-white shadow-lg w-full max-w-2xl " @click.stop>
          <div class="flex justify-between items-center p-6 mb-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold">Confirmation</h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200">
              &times;
            </button>
          </div>
          <form @submit.prevent="deleteInfo">
            <div class="modal-body p-6">
              <span>
                Are you sure you want to delete this department:
                <span class="font-bold">{{ departmentName }}?</span>
              </span>
              <div class="bg-deleteColor p-4 border-l-8 border-borderColor">
                <span class="font-bold ">Note:</span> All the
                <span class="font-bold">employees</span> associated with this department will also be deleted.
              </div>
            </div>
            <div class="border-t border-gray-200">
              <div class="flex items-end justify-end space-x-4 p-6">
                <button @click="closeModal" class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right" type="button">
                  Cancel
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline" type="submit">
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  <!-- Designation Delete -->
      <div v-if="isModalOpenDeleteQuize" ref="modalBackdropQuize" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center pt-20" @click="handleBackdropClickQuize">
        <!-- Modal -->
        <div class="bg-white shadow-lg w-full max-w-2xl" @click.stop>
          <div class="flex justify-between items-center p-6 mb-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold">Confirmation</h2>
            <button @click="closeModalQuizeList" class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200">
              &times;
            </button>
          </div>
          <form @submit.prevent="deleteInfoDesignation">
            <div class="modal-body p-6">
              <span>
                Are you sure you want to delete this Designation:
                <span class="font-bold">{{ designation }}?</span>
                <input type="text" v-model="designationId" />
              </span>
              <div class="bg-deleteColor p-4 border-l-8 border-borderColor">
                <span class="font-bold ">Note:</span> All the
                <span class="font-bold">employees</span> associated with this Designation will also be deleted.
              </div>
            </div>
            <div class="border-t border-gray-200">
              <div class="flex items-end justify-end space-x-4 p-6">
                <button @click="closeModalQuizeList" class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right" type="button">
                  Cancel
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4  focus:outline-none focus:shadow-outline" type="submit">
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref, onMounted } from 'vue';
  import { useToast } from 'vue-toastification';
  
  const toast = useToast();
  const isModalOpen = ref(false);
  const isModalOpenDelete = ref(false);
  const modalBackdrop = ref(null);
  const isModalOpenDeleteQuize =ref(false);
  const modalBackdropQuize = ref(null);
  const quizeName = ref('');
  const quizeTime = ref('');
  const dataList = ref([]);
  const dataId = ref(null);

  const editMode = ref(false);
  const nameError = ref(false);
  const nameErrorMessage = ref('');
 
  
  function openModal() {
    editMode.value = false;
    isModalOpen.value = true;
  }
  
  function openModalEdit(dataInfo) {
    editMode.value = true;
    dataId.value = dataInfo.id;
    quizeName.value = dataInfo.quize_name;
  
    isModalOpen.value = true;
  }
  
  function openModalDelete(dataInfo) {
    dataId.value = dataInfo.id;
    quizeName.value = dataInfo.quize_name;
   
    isModalOpenDelete.value = true;
  }
  

  function closeModal() {
    isModalOpen.value = false;
    isModalOpenDelete.value = false;
   
    quizeName.value = '';
    quizeTime.value = '';
  
    dataId.value = null;
    editMode.value = false;
    nameError.value = false;
    nameErrorMessage.value = '';
    
  }
  
   function closeModalQuizeList(){
    isModalOpenDeleteQuize.value=false;
   }
  
  function handleBackdropClick(event) {
    if (event.target === modalBackdrop.value) {
      closeModal();
    }
  }
  
  function handleBackdropClickQuize(event) {
    if (event.target === modalBackdropQuize.value) {
      closeModalQuizeList();
    }
  }

  
  const fetchDataList = async () => {
    try {
      const token = window.localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token is missing.');
        return;
      }
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      const response = await axios.get('/staff/v1/quize/get/list', config);
      dataList.value = response.data;
    } catch (error) {
      console.error('Error fetching Quize data:', error);
    }
  };
  
  function validateName() {
    if (!quizeName.value || quizeName.value.length === 0) {
      nameError.value = true;
      nameErrorMessage.value = 'Quize Name Field cannot be empty';
      return false;
    } else {
      nameError.value = false;
      nameErrorMessage.value = '';
      return true;
    }
  }
  
  function formValidation(fieldName) {
    if (fieldName === 'submit') {
      const isNameValid = validateName();
      // const isTimeValid = validateTime();
     
      return isNameValid  ;
    } else if (fieldName === 'quizeName') {
      validateName();
    }
    // else if (fieldName === 'quizeTime') {
    //     validateTime();
    // }
  }
  
  async function submitForm() {
   
    if (formValidation('submit')) {
  
   
        const token = window.localStorage.getItem('token');
        if (!token) {
          console.error('Authentication token is missing.');
          return;
        }
        const config = {
          headers: {
            Authorization: 'Bearer ' + token
          }
        };
        const payload = {
          quizeName: quizeName.value,
        
          dataId: dataId.value || null
        };
        const response = await axios.post('/staff/v1/quize/insert/update', payload, config);
        if (response.data.msgFlag) {
          toast.success(response.data.msg);
          await fetchDataList();
          closeModal();
        } else {
          toast.error(response.data.errMsg);
        }
      
    }
  }
  
  async function deleteInfo() {
  
      const token = window.localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token is missing.');
        return;
      }
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      const payload = {
        dataId: dataId.value || null
      };
      const response = await axios.post('/staff/v1/quize/delete', payload, config);
      if (response.data.msgFlag) {
        toast.success(response.data.msg);
        await fetchDataList();
        closeModal();
      } else {
        toast.error(response.data.errMsg);
      }
   
  }
  
  
  onMounted(fetchDataList);
  </script>
  
  <style scoped>
  .helper-text-product-add {
    color: red;
  }
  </style>
  