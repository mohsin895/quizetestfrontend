<template>
    <div class="loyel-erp-award mt-10 ml-10 mr-10 bg-white p-6">
      <div class="card w-full">
        <div class="overflow-x-auto">
          <span>Total Marks: {{ totalMarks }}</span>
          <span> Yours marks: {{ marks }}</span>
          <table class="border-collapse border border-slate-400 w-full min-w-max">
            <thead></thead>
            <tbody>
              <ul>
                <li
                  v-for="(dataInfo, index) in employeeList.question_info"
                  :key="index"
                class="mb-4 ml-2">
                  <h3 class="font-bold">{{ index + 1 }}. {{ dataInfo.question_name }}</h3>
                  <div
                    v-for="(option, op) in dataInfo.question_option_info"
                    :key="op"
                    class="ml-6"
                  >
                    <input
                      type="checkbox"
                      :name="'question' + index"
                      :value="option.question_number"
                      :checked="
                        option.option_anser_info &&
                        option.question_number == option.option_anser_info.answer
                      "
                   
                    />
                    {{ option.question_option }}<br />
                  </div>
                  <span class="font-bold">Currect Answer:</span>  <span v-for="(answer,index) in dataInfo.answer_info"><spna class="font-bold">{{answer.question_attribute_info.question_number}}. &nbsp;</spna>{{ answer.question_attribute_info.question_option }}&nbsp;</span>
                </li>
              </ul>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onBeforeMount } from "vue";
  import { useToast } from "vue-toastification";
  import { useRoute, useRouter } from "vue-router";
  
  const route = useRoute();
  const toast = useToast();
  const dataId = ref(route.params.dataId);
  
  const employeeList = ref([]);
  const answerList=ref([]);
  const totalMarks=ref();
  const marks=ref();

  const fetchAnswerList = async () => {
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
      const response = await axios.get("/employee/v1/quize/answer/list", {
        params: { dataId: dataId.value },
        headers: config.headers,
      });
      totalMarks.value = response.data.totalMarks;
      marks.value = response.data.getAnserData;
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };
  const fetchDataList = async () => {
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
      const response = await axios.get("/employee/v1/quize/question/list", {
        params: { dataId: dataId.value },
        headers: config.headers,
      });
      employeeList.value = response.data;
    } catch (error) {
      console.error("Error fetching branch data:", error);
    }
  };
  const fetchAllData = async () => {
    await fetchDataList();
    await fetchAnswerList();
  };
  onBeforeMount(fetchAllData);
  </script>
  
  <style scoped>
  .helper-text-product-add {
    color: red;
  }
  </style>
  