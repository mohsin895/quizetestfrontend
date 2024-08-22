<template>
  <div class="bg-dark">
    <div class="sm:ml-2 sm:mr-2 md:ml-1 md:mr-1">
      <div class="card w-full bg-profilebgColor mt-5">
        <div class="grid  p-4">
          <div class="col-12 bg-white mr-4 place-self-auto">
            <div class="mb-4 flex justify-between">
              <div
                class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
              >
                <span class="inline-flex items-center text-white">
                  <icon name="user" size="15px" style="margin-right: 8px" />
                 Quize List
                </span>
              </div>
            </div>
            <div class="overflow-x-auto">
              <div class="flex space-x-4">
                <div class="w-full">
                  <table class="w-full min-w-max">
                    <thead>
            <tr>
              <th class="border border-slate-300 h-10">Sr No.</th>
              <th class="border border-slate-300">Quize Name</th>
             
              <th class="border border-slate-300">Quize Marks</th>
              <th class="border border-slate-300">Quize Time</th>
              <th class="border border-slate-300">Action</th>
            </tr>
          </thead>
                    <tbody>
                      <tr v-for="(quizeInfo,index) in quizeList" :key="index">
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                     {{++ index}}
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                      {{quizeInfo.quize_name}}
                        </td>
                       
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                          {{ quizeInfo.total_marks_info.totalMarks }}
                        </td>
                      
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                      {{quizeInfo.quize_time}}
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                          <router-link
                          :to="{
                            name: 'UserQuestionList',
                            params: { dataId: quizeInfo.id },
                          }"
                        
                        >   Start</router-link>
                        </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section -->
          
        </div>
     
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const quizeList =ref([]);
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
    const response = await axios.get("/employee/v1/quize/get/list", config);
    quizeList.value = response.data;
    
  } catch (error) {
    console.error("Error fetching leave data:", error);
  }
};

onMounted(fetchDataList);
</script>
  
<style scoped>
.alert-blocks:first-child {
    margin-top: 15px;
}


.alert-blocks {
    margin: 0 15px 5px;
    background: #f7f7f7;
    padding: 10px 10px 13px;
}

.color-blue {
    color: #3498db;
}

b, strong {
    font-weight: 700;
}
.color-red {
    color: #e74c3c;
}
.alert-blocks-success {
    background: #e1febc;
}
.alert-blocks-info {
    background: #e0f3fe;
}
.alert-blocks-error {
    background: #fee0e0;
}
.color-green {
    color: #4765a0;
}
.alert-blocks strong small {
    color: #a3a3a3;
    font-weight: 200;
    margin-top: 3px;
}

.pull-right {
    float: right;
}
.pull-right {
    float: right !important;
}
small, .small {
    font-size: 85%;
}
/* Your styles here */
</style>