<template>
  <div class="bg-dark p-6">
    <div class="flex p-4 space-x-4">
      <div class="flex-grow bg-bgDashboard1">
        <div class="flex text-center items-center justify-between">
          <div>
            <icon
              name="users-line"
              size="110px"
              class="text-white opacity-10"
              style="margin-left: 8px"
            />
          </div>
          <div class="mr-4">
            <p class="text-white">{{ totalEmployee }}</p>
            <p class="text-white">Total Employees</p>
          </div>
        </div>

  
          <div
            class="w-full bg-bgDashboard12 flex text-center items-center justify-between"
          >
            <span class="p-4 text-white opacity-90">VIEW MORE</span>
            <icon
              name="circle-arrow-right"
              size="20px"
              class="text-white opacity-90 mr-4"
              style="margin-left: 8px"
            />
          </div>
 
      </div>
      <div class="flex-grow ">
        <div class="flex-grow bg-bgDashboard2">
          <div class="flex text-center items-center justify-between">
            <div>
              <icon
                name="briefcase"
                size="110px"
                class="text-white opacity-10"
                style="margin-left: 8px"
              />
            </div>
            <div class="mr-4">
              <p class="text-white">{{ totalDepartment }}</p>
              <p class="text-white">Total Departments</p>
            </div>
          </div>
     
           <div class="w-full bg-bgDashboard21 flex text-center items-center justify-between">
            <span class="p-4 text-white opacity-90"> VIEW MORE</span>
            <icon
              name="circle-arrow-right"
              size="20px"
              class="text-white opacity-90 mr-4"
              style="margin-left: 8px"
            />
           </div>
     
        </div>
      </div>
      <div class="flex-grow">
        <div class="flex-grow bg-bgDashboard2">
          <div class="flex text-center items-center justify-between">
            <div>
              <icon
                name="briefcase"
                size="110px"
                class="text-white opacity-10"
                style="margin-left: 8px"
              />
            </div>
            <div class="mr-4">
              <p class="text-white">{{ totalAwards }}</p>
              <p class="text-white">Total Awards</p>
            </div>
          </div>
     
           <div class="w-full bg-bgDashboard21 flex text-center items-center justify-between">
            <span class="p-4 text-white opacity-90"> VIEW MORE</span>
            <icon
              name="circle-arrow-right"
              size="20px"
              class="text-white opacity-90 mr-4"
              style="margin-left: 8px"
            />
           </div>
      
        </div>
      </div>
      <div class="flex-grow ">
        <div class="flex-grow bg-bgDashboard2">
          <div class="flex text-center items-center justify-between">
            <div>
              <icon
                name="briefcase"
                size="110px"
                class="text-white opacity-10"
                style="margin-left: 8px"
              />
            </div>
            <div class="mr-4">
              <p class="text-white">{{ totalDepartment }}</p>
              <p class="text-white">Total Departments</p>
            </div>
          </div>
       
           <div class="w-full bg-bgDashboard21 flex text-center items-center justify-between">
            <span class="p-4 text-white opacity-90"> VIEW MORE</span>
            <icon
              name="circle-arrow-right"
              size="20px"
              class="text-white opacity-90 mr-4"
              style="margin-left: 8px"
            />
           </div>
      
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4 p-4">
          <div class="col-6 bg-white mr-4 place-self-auto">
            <div class="mb-4 flex justify-between">
              <div
                class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
              >
                <span class="inline-flex items-center text-white">
                  <icon name="chess-queen" size="15px" style="margin-right: 8px" />
                  {{ $filters.formatMonth(currentMonth) }} Birthdays
                </span>
              </div>
            </div>
            <div class="overflow-x-auto">
              <div class="flex space-x-4">
                <div class="w-full">
                  <table class="w-full min-w-max mb-2">
                    <tbody>
                      <tr v-for="(data,index) in birthdays" :key="index" class="bg-dashboardbg p-4">
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                         <span class="font-bold">{{data.full_name}}</span> <span>has birthday on</span><span class="font-bold ml-1">{{ $filters.formatDateWithMonth(data.date_of_birth) }}</span>
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                       
                        </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Section -->
          <div class="col-6 bg-white">
            <div class="mb-4 flex justify-between">
              <div
                class="bg-customCyan hover:bg-hoverCyan p-2 w-full cursor-pointer"
              >
                <span class="inline-flex items-center text-white">
                  <icon name="trophy" size="15px" style="margin-right: 8px" />
                 Awards
                </span>
              </div>
            </div>
            <div class="overflow-x-auto">
              <div class="flex space-x-4">
                <div class="w-full">
                  <table class="w-full min-w-max mb-2">
                    <tbody>
                      <tr v-for="(data,index) in awards.data" :key="index" class="bg-dashboardbg p-4">
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                          <div class="flex justify-between">
                            <div>
                              <span class="font-bold">{{data.employee.full_name}}</span> <span>{{data.award_name}}</span><span class="font-bold ml-1">{{ $filters.formatDateWithMonth(data.date_of_birth) }}</span>
                            </div>
                            <div>
                                    <span>{{data.month}} {{data.year}}</span>
                            </div>
                          </div>
                        
                        </td>
                        <td class="border-b border-slate-300 pl-4 text-sm h-10">
                       
                        </td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
     
           <div class="w-full bg-white flex text-center  items-center justify-end ">
            <span class="p-2 text-rightActiveColor opacity-90"> See all records</span>
            <icon
              name="circle-arrow-right"
              size="20px"
              class="text-black opacity-90 mr-4"
              style="margin-left: 8px"
            />
           </div>
      
          </div>
        </div>
  </div>
</template>
<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const totalEmployee = ref("");
const totalDepartment=ref('');
const totalAwards=ref('');
const birthdays=ref([]);
const awards=ref([]);
const currentMonth = new Date().getMonth() + 1;
const fetchDataList = async () => {
  try {
    const token = window.localStorage.getItem("token");
    if (!token) {
      console.log("Authentication Token is missing");
      return;
    }
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await axios.get("staff/v1/erp/dashboard/get/info", config);
    totalEmployee.value = response.data.totalEmployee;
    totalDepartment.value = response.data.totalDepartment;
    totalAwards.value = response.data.totalAwards;
    birthdays.value= response.data.birthdays;
    awards.value=response.data.awards;
  } catch (error) {
    console.error("Error Fetching data:", error);
  }
};

onMounted(fetchDataList);
</script>