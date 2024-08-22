<template>
  <div class="loyel-erp-department mt-10 ml-10 mr-10 bg-white p-6">
    <div class="card w-full">
      <div class="p-2 mb-4">
        <div
          class="bg-customCyan hover:bg-hoverCyan p-2 w-48 cursor-pointer"
          @click="openModal"
        >
          <span class="inline-flex items-center text-white">
            Add New Question
            <icon name="plus" size="15px" style="margin-left: 8px" />
          </span>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="border-collapse border border-slate-400 w-full min-w-max">
          <thead>
            <tr>
              <th class="border border-slate-300 h-10">Sr No.</th>
              <th class="border border-slate-300">Question Name</th>
              <th class="border border-slate-300">Question Option</th>
              <th class="border border-slate-300">Question Marks</th>
              <th class="border border-slate-300">Currect Answer</th>
              <th class="border border-slate-300">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(dataInfo, index) in dataList" :key="dataInfo.id">
              <td class="border border-slate-300 pl-4 h-16 text-sm">
                {{ index + 1 }}
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.question_name }}
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                <ul>
                  <li
                    v-for="(question, idx) in dataInfo.question_info"
                    :key="question.id"
                  >
                    {{ idx + 1 }}. {{ question.question_option }}
                  </li>
                </ul>
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                {{ dataInfo.question_marks }}
              </td>
              <td class="border border-slate-300 pl-4 text-sm">
                <ul>
                  <li
                    v-for="(answer, idx) in dataInfo.answer_info"
                    :key="answer.id"
                  >
                    {{ idx + 1 }}.
                    <span v-if=" answer.question_attribute_info != null"> {{ answer.question_attribute_info.question_option }}</span>
                   
                  </li>
                </ul>
              </td>
              <td class="border border-slate-300 pl-4">
                <span class="inline-flex items-center">
                  <span
                    class="p-2 cursor-pointer mr-6 inline-flex items-center text-xs bg-purpoleCus hover:bg-purpoleCusHover text-white"
                    @click="openModalEdit(dataInfo)"
                  >
                    <icon
                      name="pencil"
                      size="15px"
                      style="margin-right: 10px"
                    />
                    View/Edit
                  </span>
                  <span
                    class="p-2 cursor-pointer inline-flex items-center text-xs bg-red-500 ml-4 hover:bg-red-700 text-white"
                    @click="openModalDelete(dataInfo)"
                  >
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
    <div
      v-if="isModalOpen"
      ref="modalBackdrop"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start max-h-screen overflow-y-auto justify-center pt-20"
      @click="handleBackdropClick"
    >
      <!-- Modal -->
      <div class="bg-white shadow-lg w-full max-w-4xl" @click.stop>
        <div
          class="flex justify-between items-center p-6 mb-4 border-b border-gray-200 modal-header"
        >
          <h2 class="text-xl inline-flex items-center font-semibold">
            <span v-if="editMode">
              <icon name="pencil" size="15px" style="margin-right: 8px" /></span
            ><span v-else>
              <icon name="plus" size="15px" style="margin-right: 8px"
            /></span>
            {{ editMode ? "Edit Question" : "Add New Question" }}
          </h2>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200"
          >
            &times;
          </button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="pl-6 pr-6 modal-body">
            <div class="flex flex-col md:flex-row">
              <div class="basis-3/4 mr-4">
                <div class="border-solid p-2">
                  <!-- Permanent Address Section -->
                  <div class="flex flex-col sm:flex-row gap-4 text-center mb-4">
                    <div class="w-full sm:w-3/12">Question Name</div>
                    <div class="flex-grow">
                      <textarea
                        id="questionName"
                        v-model="questionName"
                        :style="{
                          border: nameError
                            ? '1px solid red'
                            : '1px solid #CED4DA',
                        }"
                        @keyup="formValidation('questionName')"
                        rows="2"
                        type="text"
                        class="block w-full pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
                    
                  </div>
                  <div class="text-red-500 text-xs ml-40">
                    {{ nameErrorMessage }}
                  </div>
                </div>
                <!-- Image Section -->
              </div>

              <!-- Right Section -->
              <div class="basis-1/4">
                <div class="border-solid p-2">
                  <!-- Employee ID Section -->
                  <div class="flex flex-col sm:flex-row gap-4 mb-4">
                    <div class="w-full sm:w-3/12 flex items-center">
                      Marks<span class="text-3xl text-red-500 mt-2 ml-2"
                        >*</span
                      >
                    </div>
                    <div class="flex-grow">
                      <input
                        type="text"
                        v-model="marks"
                        :style="{
                          border: marksError
                            ? '1px solid red'
                            : '1px solid #CED4DA',
                        }"
                        @keyup="formValidation('marks')"
                        class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        @input="validateInput($event)"
                        placeholder="marks"
                      />
                      <div class="text-red-500 text-xs mt-1">
                        {{ marksErrorMessage }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <table class="w-full mt-6">
              <thead>
                <tr>
                  <th class="text-start">Question Number</th>
                  <th class="text-start">
                    <span :class="{ 'text-red-500': designationError }"
                      >Option</span
                    >
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(field, index) in fields" :key="index" class="mb-4">
                  <td>
                    <input
                      v-model="field.number"
                      type="text"
                      class="disabled appearance-none border w-16 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                    />
                  </td>
                  <td class="col-span-4">
                    <textarea
                      v-model="field.option"
                      type="text"
                      class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                      :placeholder="'Option # ' + (index + 1)"
                      :style="{
                        border: optionError
                          ? '1px solid red'
                          : '1px solid #CED4DA',
                      }"
                      @keyup="validateOption(index)"
                    ></textarea>
                    <input v-model="field.optionId" type="hidden" />

                    <div v-if="field.error" class="text-red-500 text-xs mt-1">
                      {{ field.error }}
                    </div>
                  </td>
                  <td>
                    <span v-if="editMode">
                      <button
                        v-if="index === 0"
                        @click="addField"
                        type="button"
                        class="bg-customCyan 500 ml-4 mt-4 hover:bg-hoverCyan text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Add Field
                          <icon
                            name="plus"
                            size="15px"
                            style="margin-left: 8px"
                        /></span>
                      </button>
                      <button
                        v-else-if="!field.optionId"
                        @click="removeField(index)"
                        type="button"
                        class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Remove
                          <icon
                            name="minus"
                            size="15px"
                            style="margin-left: 8px"
                          />
                        </span>
                      </button>
                      <button
                        v-else
                        @click="openModalDeleteDesignation(field)"
                        type="button"
                        class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Delete
                          <icon
                            name="trash"
                            size="15px"
                            style="margin-left: 8px"
                          />
                        </span>
                      </button>
                    </span>
                    <span v-else>
                      <button
                        v-if="index === 0"
                        @click="addField"
                        type="button"
                        class="bg-customCyan 500 ml-4 mt-4 hover:bg-hoverCyan text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Add Field
                          <icon
                            name="plus"
                            size="15px"
                            style="margin-left: 8px"
                        /></span>
                      </button>
                      <button
                        v-else
                        @click="removeField(index)"
                        type="button"
                        class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Remove
                          <icon
                            name="minus"
                            size="15px"
                            style="margin-left: 8px"
                        /></span>
                      </button>
                    </span>
                    <div v-if="field.error" class="text-red-500 text-xs mt-1">
                      &nbsp;
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
   
            <table class="mt-6">
              <thead>
                <tr>
                  <th class="text-start mr-4">Answer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
  <tr v-for="(field, index) in fieldsAnswer" :key="index" class="mb-4">
    <td>
      <input
        v-model="field.answer"
        type="text"
        class="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
        :placeholder="'Answer Number # ' + (index + 1)"
        :style="{
          border: field.error1 ? '1px solid red' : '1px solid #CED4DA',
        }"
        @keyup="validateAnswer(index)"
      />
      <div v-if="field.error1" class="text-red-500 text-xs mt-1">
        {{ field.error1 }}
      </div>
    </td>
    <td>
      <span v-if="editMode">
        <button
          v-if="index === 0"
          @click="addFieldAnswer"
          type="button"
          class="bg-customCyan 500 ml-4 mt-4 hover:bg-hoverCyan text-white font-bold py-2 px-4 mb-4"
        >
          <span class="inline-flex items-center text-white">
            Add Field
            <icon name="plus" size="15px" style="margin-left: 8px" />
          </span>
        </button>
        <button
          v-else-if="!field.designationId"
          @click="removeFieldAnswer(index)"
          type="button"
          class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 mb-4"
        >
          <span class="inline-flex items-center text-white">
            Remove
            <icon name="minus" size="15px" style="margin-left: 8px" />
          </span>
        </button>
        <button
          v-else
          @click="openModalDeleteDesignation(field)"
          type="button"
          class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 mb-4"
        >
          <span class="inline-flex items-center text-white">
            Delete
            <icon name="trash" size="15px" style="margin-left: 8px" />
          </span>
        </button>
      </span>
      <span v-else>
                      <button
                        v-if="index === 0"
                        @click="addFieldAnswer"
                        type="button"
                        class="bg-customCyan 500 ml-4 mt-4 hover:bg-hoverCyan text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Add Field
                          <icon
                            name="plus"
                            size="15px"
                            style="margin-left: 8px"
                        /></span>
                      </button>
                      <button
                        v-else
                        @click="removeFieldAnswer(index)"
                        type="button"
                        class="bg-red-500 ml-4 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 mb-4"
                      >
                        <span class="inline-flex items-center text-white">
                          Remove
                          <icon
                            name="minus"
                            size="15px"
                            style="margin-left: 8px"
                        /></span>
                      </button>
                    </span>
    </td>
  </tr>
</tbody>

            </table>
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
                  <span v-if="editMode">
                    <icon
                      name="pencil"
                      size="15px"
                      style="margin-right: 8px" /></span
                  ><span v-else>
                    <icon name="check" size="15px" style="margin-right: 8px"
                  /></span>

                  {{ editMode ? "Update" : "Submit" }}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      v-if="isModalOpenDelete"
      ref="modalBackdrop"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center pt-20"
      @click="handleBackdropClick"
    >
      <!-- Modal -->
      <div class="bg-white shadow-lg w-full max-w-2xl" @click.stop>
        <div
          class="flex justify-between items-center p-6 mb-4 border-b border-gray-200"
        >
          <h2 class="text-xl font-semibold">Confirmation</h2>
          <button
            @click="closeModal"
            class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200"
          >
            &times;
          </button>
        </div>
        <form @submit.prevent="deleteInfo">
          <div class="modal-body p-6">
            <span>
              Are you sure you want to delete this Question:
             
            </span>
            <div class="bg-deleteColor p-4 border-l-8 border-borderColor">
              <span class="font-bold">Note:</span> All 
              <span class="font-bold">Information</span> associated with this
              Question will also be deleted.
            </div>
          </div>
          <div class="border-t border-gray-200">
            <div class="flex items-end justify-end space-x-4 p-6">
              <button
                @click="closeModal"
                class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right"
                type="button"
              >
                Cancel
              </button>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <!-- Designation Delete -->
    <div
      v-if="isModalOpenDeleteDesignation"
      ref="modalBackdropDesignation"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center pt-20"
      @click="handleBackdropClickDesignation"
    >
      <!-- Modal -->
      <div class="bg-white shadow-lg w-full max-w-2xl" @click.stop>
        <div
          class="flex justify-between items-center p-6 mb-4 border-b border-gray-200"
        >
          <h2 class="text-xl font-semibold">Confirmation</h2>
          <button
            @click="closeModalDesignation"
            class="text-gray-500 hover:text-gray-700 px-2.5 bg-slate-200"
          >
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
              <span class="font-bold">Note:</span> All the
              <span class="font-bold">employees</span> associated with this
              Designation will also be deleted.
            </div>
          </div>
          <div class="border-t border-gray-200">
            <div class="flex items-end justify-end space-x-4 p-6">
              <button
                @click="closeModalDesignation"
                class="bg-white-500 hover:bg-black hover:text-white text-black font-bold py-2 px-4 border border-black focus:outline-none focus:shadow-outline text-right"
                type="button"
              >
                Cancel
              </button>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="submit"
              >
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
import axios from "axios";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import { useRoute, useRouter } from "vue-router";
const toast = useToast();
const route = useRoute();
const isModalOpen = ref(false);
const isModalOpenDelete = ref(false);
const modalBackdrop = ref(null);
const isModalOpenDeleteDesignation = ref(false);
const modalBackdropDesignation = ref(null);
const questionName = ref("");
const marks = ref("");
const fieldsAnswer = ref([{ answer: "", error1: "" }]);
const fields = ref([{ number: "1", option: "", optionId: "", error: "" }]);
const dataList = ref([]);
const quizeDetailsId = ref(route.params.dataId);
const dataId = ref(null);
const questinId=ref(null);
const editMode = ref(false);
const nameError = ref(false);
const nameErrorMessage = ref("");
const marksError = ref(false);
const marksErrorMessage = ref("");
const answerError = ref(false);
const optionError = ref(false);

function openModal() {
  editMode.value = false;
  isModalOpen.value = true;
}

function openModalEdit(dataInfo) {
  editMode.value = true;
  questinId.value = dataInfo.id;
  questionName.value = dataInfo.question_name;
  marks.value = dataInfo.question_marks;
  fields.value = dataInfo.question_info.map((question) => ({
    option: question.question_option,
    number :question.question_number,
    optionId: question.id,
  }));
  fieldsAnswer.value = dataInfo.answer_info.map((answer) => ({
    answer: answer.answer,
  
  }));
  isModalOpen.value = true;
}

function openModalDelete(dataInfo) {
  dataId.value = dataInfo.id;

  isModalOpenDelete.value = true;
}

function openModalDeleteDesignation(dataInfo) {

  designationId.value = dataInfo.designationId;
  designation.value = dataInfo.designation;
  isModalOpenDeleteDesignation.value = true;
}
function closeModal() {
  isModalOpen.value = false;
  isModalOpenDelete.value = false;

  questionName.value = "";
  marks.value = "";
  fields.value = [
    {  optionNo: "", optionId: "", error: "" },
  ];
  fieldsAnswer.value = [
    { answer: "",  error: "" },
  ];
  dataId.value = null;
  editMode.value = false;
  nameError.value = false;
  designationError.value = false;
  nameErrorMessage.value = "";
}

function closeModalDesignation() {
  isModalOpenDeleteDesignation.value = false;
}

function handleBackdropClick(event) {
  if (event.target === modalBackdrop.value) {
    closeModal();
  }
}

function handleBackdropClickDesignation(event) {
  if (event.target === modalBackdropDesignation.value) {
    closeModalDesignation();
  }
}
//   function addField() {
//     fields.value.push({ designation: '',optionNo:'', designationId: '' });
//   }
function addField() {
  fields.value.push({
    number: fields.value.length + 1,
    option: "",
    optionId: "",
    error: false,
  });
}
function removeField(index) {
  fields.value.splice(index, 1);
}
function addFieldAnswer() {
  fieldsAnswer.value.push({
    answer: "",
    optionId: "",
    error: false,
  });
}
function removeFieldAnswer(index) {
  fieldsAnswer.value.splice(index, 1);
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
    const response = await axios.get("/staff/v1/question/get/list", {
      params: { dataId: quizeDetailsId.value },
      headers: config.headers,
    });
    dataList.value = response.data;
  } catch (error) {
    console.error("Error fetching department data:", error);
  }
};

function validateName() {
  if (!questionName.value || questionName.value.length === 0) {
    nameError.value = true;
    nameErrorMessage.value = "Question Name Field cannot be empty";
    return false;
  } else {
    nameError.value = false;
    nameErrorMessage.value = "";
    return true;
  }
}
function validateMarks() {
  if (!marks.value || marks.value.length === 0) {
    marksError.value = true;
    marksErrorMessage.value = "Question Marks Field cannot be empty";
    return false;
  } else {
    marksError.value = false;
    marksErrorMessage.value = "";
    return true;
  }
}
function validateAnswer(index) {
  if (
    !fieldsAnswer.value[index].answer ||
    fieldsAnswer.value[index].answer.length === 0
  ) {
    fieldsAnswer.value[index].error = "Answer cannot be empty";
    answerError.value = true;
  } else {
    answerError.value = false;
    fieldsAnswer.value[index].error = "";
  }
}


function validateOption(index) {
  if (
    !fields.value[index].option ||
    fields.value[index].option.trim().length === 0
  ) {
    fields.value[index].error = "Option cannot be empty";
    optionError.value = true;
  } else {
    optionError.value = false;
    fields.value[index].error = "";
  }
}
function formValidation(fieldName) {
  if (fieldName === "submit") {
    const isNameValid = validateName();

    const isMarksValid = validateMarks();
    return isNameValid && isMarksValid;
  } else if (fieldName === "questionName") {
    validateName();
  } else if (fieldName === "marks") {
    validateMarks();
  }
}

async function submitForm() {
  let isValid = true;

  fields.value.forEach((field, index) => {
    validateOption(index);
    if (field.error) {
      isValid = false;
    }
  });

  fieldsAnswer.value.forEach((field, index) => {
    validateAnswer(index);
    if (field.error1) {
      isValid = false;
    }
  });
  if (formValidation("submit") && isValid) {
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
      questionName: questionName.value,
      marks: marks.value,
      numbers: fields.value.map((field) => field.number),
      options: fields.value.map((field) => field.option),
      optionId: fields.value.map((field) => field.optionId),
      answers: fieldsAnswer.value.map((field) => field.answer),
      dataId: dataId.value || null,
      quizeDetailsId: quizeDetailsId.value,
      questinId:questinId.value,
    };
    const response = await axios.post(
      "/staff/v1/question/insert/update",
      payload,
      config
    );
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
      dataId: dataId.value || null,
    };
    const response = await axios.post(
      "/staff/v1/question/delete",
      payload,
      config
    );
    if (response.data.msgFlag) {
      toast.success(response.data.msg);
      await fetchDataList();
      closeModal();
    } else {
      toast.error(response.data.errMsg);
    }
  
}

async function deleteInfoDesignation() {
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
      dataId: designationId.value || null,
    };
    const response = await axios.post(
      "/staff/v1/question/option/delete",
      payload,
      config
    );
    if (response.data.msgFlag) {
      toast.success(response.data.msg);

      fields.value = fields.value.filter(
        (field) => field.designationId !== designationId.value
      );
      await fetchDataList();
      closeModalDesignation();
    } else {
      toast.error(response.data.errMsg);
    }
  } catch (error) {
    console.error("Error deleting Question:", error);
    toast.error("An error occurred while deleting the Question.");
  }
}

function validateInput(event) {
  const value = event.target.value;

  if (value.trim() === "") {
    return;
  }

  if (/[A-Za-z]/.test(value)) {
    alert("please write only number");
    setTimeout(() => {
      event.target.value = "";
    });
    return;
  }
}
onMounted(fetchDataList);
</script>

<style scoped>
.helper-text-product-add {
  color: red;
}
</style>
