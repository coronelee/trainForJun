<template>
    <div class="w-full h-full bg-gray-100 p-12 flex gap-8 flex-col justify-start items-start ">
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
        <div class="h-full w-full flex gap-8 [&>div]:h-full [&>div]:border [&>div]:rounded-xl ">
            <div id="menuItems"
                class="w-1/5 flex flex-col relative justify-start gap-4 py-12 items-center [&>div]:flex [&>div]:justify-center [&>div]:items-center  [&>div]:text-white">


                <div v-for="i in items" :key="i" :id="i.id" draggable="true" class="draggable w-24 h-24 bg-[#2C50CC]">
                    <span>
                        {{ i.name }}
                    </span>
                </div>

                <!-- <div class="w-48 h-24 bg-[#2C50CC] " id="array">
                </div> -->
            </div>
            <div class="droppable w-4/5 relative overflow-hidden [&>div]:flex [&>div]:justify-center [&>div]:items-center  [&>div]:text-white"
                id="workPlace">

            </div>
        </div>
        <button class=" px-8 h-12 bg-[#2C50CC] text-white rounded-xl">Проверить</button>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
const idRoom = ref('room2432523521');
const nameRoom = ref('Проект интернет-магазин');
const typeRoom = ref('User Flow');
const discriptionRoom = ref('Контекст: Необходимо описать User Flow магазина');
const peopleInTheRoom = ref(['Евгений К.', 'Василий Н.']);
const items = ref([
    {
        id: 'start',
        name: 'start/finish',
    },
    {
        id: 'action',
        name: 'action',
    },
    {
        id: 'condition',
        name: 'condition',
    }
]);



onMounted(() => {
    const menuItems = document.getElementById('menuItems');
    const workPlace = document.getElementById('workPlace');

    menuItems.addEventListener('dragstart', (e) => {
        const target = e.target;
        if (target.classList.contains('draggable')) {
            e.dataTransfer.setData('text', target.id);
        }
    });

    workPlace.addEventListener('dragover', (e) => {
        e.preventDefault();

    });

    workPlace.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggableId = e.dataTransfer.getData('text');
        const draggable = document.getElementById(draggableId);

        // Переместить объект в блок workPlace
        workPlace.appendChild(draggable);

        // Позиционировать объект относительно родительского элемента
        const rect = workPlace.getBoundingClientRect();
        draggable.style.top = `${e.clientY - rect.top - draggable.offsetHeight / 2}px`;
        draggable.style.left = `${e.clientX - rect.left - draggable.offsetHeight / 2}px`;
        draggable.style.position = 'absolute';

        // Добавить обработчики событий для перемещенного элемента
        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', draggable.id);
        });

        draggable.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        draggable.addEventListener('drop', (e) => {
            e.preventDefault();
            const rect = workPlace.getBoundingClientRect();
            draggable.style.top = `${e.clientY - rect.top - draggable.offsetHeight / 2}px`;
            draggable.style.left = `${e.clientX - rect.left - draggable.offsetHeight / 2}px`;
        });
        restoreMenuItems()

    });
});


function restoreMenuItems() {
    const menuItems = document.getElementById('menuItems');
    const workPlace = document.getElementById('workPlace');
    const draggableElements = workPlace.querySelectorAll('.draggable');

    draggableElements.forEach((element) => {
        const menuItem = menuItems.querySelector(`#${element.id}`);
        if (!menuItem) {
            const newMenuItem = element.cloneNode(true);
            newMenuItem.style.top = '';
            newMenuItem.style.left = '';
            newMenuItem.style.position = '';
            menuItems.appendChild(newMenuItem);
        }
    });
}
</script>

<style scoped>
#condition {
    clip-path: polygon(50% 10%, 100% 50%, 50% 90%, 0% 50%);
}

#start {
    clip-path: circle(50% at 50% 50%);
}

#array {
    clip-path: polygon(30% 49%, 60% 49%, 60% 40%, 75% 50%, 60% 60%, 60% 51%, 30% 51%);
}
</style>