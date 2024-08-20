<template>
    <div
        class="w-full  flex flex-col justify-start items-center gap-3 [&>input]:border-b [&>input]:px-4 [&>input]:outline-none [&>input]:h-[50px]
        [&>input]:w-full [&>select]:w-full [&>select]:h-[50px] [&>select]:border-b [&>select]:px-4 [&>select]:outline-none [&>select]:text-[#999]">
        <input type="text" id="nameRoom" placeholder="Название комнаты">
        <select name="" id="typeLanguage">
            <option value="js">JS</option>
            <option value="python">Python</option>
        </select>
        <input type="text" placeholder="Результат задачи ( [1,2,3] || 1 || etc. )" id="resultCode">
        <textarea name="" id="" cols="30" rows="10" class="w-full h-[100px] px-4 text-[#999] outline-none border-b"
            placeholder="Вопрос к задаче"></textarea>
        <div
            class="flex flex-col gap-3 justify-center items-start w-full mb-12 py-3 border px-4 text-[#999] outline-none">
            <div class="flex gap-3">
                <input type="checkbox" id="inputData" name="inputData" @change="openInputData = !openInputData">
                <label for="inputData">Входные данные (отметить если нужны)</label>
            </div>
            <input type="text" placeholder="Входные данные ( [1,2,3] || 1 || 'abc' )" v-if="openInputData"
                class="w-full h-[50px] px-4 text-[#999] outline-none animate-[openInputData_0.5s_ease-in-out]"
                id="inputDataValue">
        </div>
    </div>
</template>



<script setup>
import { ref } from 'vue';
const openInputData = ref(false);
</script>