<template>
    <div class="w-full h-full bg-gray-100 p-12 flex gap-8 flex-col justify-start items-center ">
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
        <div class="flex flex-col gap-2">
            <span class="w-full font-bold text-2xl">{{ nameRoom }}</span>
            <span class="w-full text-base">{{ discriptionRoom }}</span>
        </div>
        <div
            class="w-full h-[500px] flex gap-8 [&>div]:border [&>div]:border-[#3C3C3C] [&>div]:w-1/5 [&>div]:h-full [&>div]:gap-4 [&>div]:rounded-2xl [&>div]:flex [&>div]:flex-col [&>div]:justify-start [&>div]:items-center [&>div]:border-[#999] [&>div]:p-4 [&>div]:font-bold">
            <div id="notDistributed" class="droppable">
                <span>Не распределено</span>

                <div draggable="true" v-for="i in draggbleElements"
                    class="draggable rounded-3xl  shadow-[0_0_5px_1px_rgba(0,0,0,0.15)] px-4 py-2 flex justify-center items-center text-center"
                    :id="i.id" :key="i">
                    <span>{{ i.text }}</span>
                </div>


            </div>
            <div id="inWork" class="droppable">
                <span>В работе</span>
            </div>
            <div id="inTest" class="droppable">
                <span>Тестирование</span>
            </div>
            <div id="done" class="droppable">
                <span>Выполнено</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const idRoom = ref('room2432523521');
const nameRoom = ref('Проект интернет-магазин');
const typeRoom = ref('Task management');
const discriptionRoom = ref('Контекст: Сегодня 1 марта, пятница, на следующей неделе 8 марта. Необходимо добавить новую функцию с продажей тюльпанов в нашем интернет-магазине до праздника. Бэкендеру необходимо 16 часов на задачу, фронтедеру необходимо 16 часов на эту задачу, тестировщику необходимо 8 часов на задачу. Но бэкендер может написать юнит тесты и тогда вероятность бага составляет 15%, но он это сделает за 4 часа. Как вы распределите задачи в данной ситуации?');
const peopleInTheRoom = ref(['Евгений К.', 'Василий Н.']);

const draggbleElements = ref(

    [
        {
            id: 1,
            text: 'Сделать таблицы БД для продажи цветов'
        },
        {
            id: 2,
            text: 'Сделать API для продажи цветов'
        },
        {
            id: 3,
            text: 'Сделать отображение продажи цветов'
        },
        {
            id: 4,
            text: 'Протестировать продажу цветов'
        }
    ]
);

onMounted(() => {

    const inWork = document.getElementById('inWork');
    const notDistributed = document.getElementById('notDistributed');
    const inTest = document.getElementById('inTest');
    const done = document.getElementById('done');

    const elements = document.querySelectorAll('.draggable');
    const blocks = document.querySelectorAll('.droppable');

    elements.forEach((element) => {
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', element.id);
        });
    });

    blocks.forEach((block) => {
        block.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        block.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text');
            const element = document.getElementById(data);
            block.appendChild(element);
        });
    });
});



</script>