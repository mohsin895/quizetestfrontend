<template>
  <div class="loyel-erp-award mt-10 ml-10 mr-10 bg-white p-6">
    <div class="card w-full">
      <div class="overflow-x-auto">
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
                    @click="submitForm(dataInfo, option)"
                  />
                  {{ option.question_option }}<br />
                </div>
              </li>
            </ul>
          </tbody>
        </table>
       <router-link :to="{name:'AnswerSheet'}"><span>Next</span></router-link> 
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

async function submitForm(dataInfo, option) {
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
    answer: option.question_number,
    optionId: option.id,
    question: dataInfo.id,
    dataId: dataId.value || null,
  };
  const response = await axios.post(
    "/employee/v1/quize/submit/answer",
    payload,
    config
  );

  await fetchDataList();
}

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
};
onBeforeMount(fetchAllData);
</script>

<style scoped>
.helper-text-product-add {
  color: red;
}
</style>
