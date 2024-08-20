<template>
    <div class="w-full h-full bg-gray-100 p-12 flex gap-8 flex-col justify-start items-center">

        <div class="flex w-full justify-between items-center text-[#3C3C3C]">
            <span class="flex gap-2">
                <span>{{ idRoom }}</span>
                <span>></span>
                <span>{{ typeRoom }}</span>
            </span>
            <span>
                <span v-for="person in peopleInTheRoom" :key="person">{{ person }}, </span>
            </span>
        </div>

        <span class="w-full font-bold text-2xl">{{ nameRoom }}</span>
        <div id="textareas"
            class="flex gap-3 w-full 
        [&>pre>textarea]:resize-none [&>div>textarea]:resize-none [&>pre>textarea]:rounded-lg [&>div>textarea]:rounded-lg [&>pre>textarea]:p-4 [&>div>textarea]:p-4 ">
            <div class="flex flex-col gap-3 w-2/5">
                <textarea name="" id="task" cols="30" rows="10"></textarea>
                <textarea name="" id="result" cols="30" rows="10"></textarea>
            </div>
            <code>
                <textarea name="" id="code" cols="30" rows="10" class="hljs w-full resize-none">
                </textarea>
            </code>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';


const idRoom = ref('room2432523521');
const nameRoom = ref('Проект интернет-магазин');
const typeRoom = ref('Code');
const peopleInTheRoom = ref(['Евгений К.', 'Василий Н.']);


onMounted(() => {

});


</script>

<style scoped></style>