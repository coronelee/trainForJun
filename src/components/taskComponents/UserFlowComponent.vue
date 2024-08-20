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
                <div class="draggable rounded-full w-24 h-24 bg-[#2C50CC] absolute" id="start" draggable="true"
                    style="top: 0; left: 0;">
                    <span>start/finish</span>
                </div>
                <div class="draggable w-24 h-16 bg-[#2C50CC] absolute" id="action" draggable="true"
                    style="top: 100px; left: 0;">
                    <span>action</span>
                </div>
                <div class="draggable w-24 h-24 bg-[#2C50CC] absolute" id="rhombus" draggable="true"
                    style="top: 200px; left: 0;">
                    <span>condition</span>
                </div>
                <!-- <div class="w-48 h-24 bg-[#2C50CC] " id="array">
                </div> -->
            </div>
            <div class="droppable w-4/5 relative" id="workPlace">

            </div>
        </div>
        <button class=" px-8 h-12 bg-[#2C50CC] text-white rounded-xl">Проверить</button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
const idRoom = ref('room2432523521');
const nameRoom = ref('Проект интернет-магазин');
const typeRoom = ref('User Flow');
const discriptionRoom = ref('Контекст: Необходимо описать User Flow магазина');
const peopleInTheRoom = ref(['Евгений К.', 'Василий Н.']);

onMounted(() => {
    const menuItems = document.getElementById('menuItems');
    const workPlace = document.getElementById('workPlace');

    menuItems.addEventListener('dragstart', (e) => {
        const target = e.target;
        if (target.classList.contains('draggable')) {
            e.dataTransfer.setData('text', target.id);
            e.dataTransfer.setData('offsetX', e.offsetX);
            e.dataTransfer.setData('offsetY', e.offsetY);
        }
    });

    workPlace.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    workPlace.addEventListener('drop', (e) => {
        e.preventDefault();
        const target = e.target;
        const draggableId = e.dataTransfer.getData('text');
        const offsetX = parseInt(e.dataTransfer.getData('offsetX'));
        const offsetY = parseInt(e.dataTransfer.getData('offsetY'));

        const draggable = document.getElementById(draggableId).cloneNode(true);
        draggable.classList.add('draggable');
        workPlace.appendChild(draggable);

        const workPlaceRect = workPlace.getBoundingClientRect();
        const draggableRect = draggable.getBoundingClientRect();

        draggable.style.top = `${e.clientY - workPlaceRect.top - offsetY}px`;
        draggable.style.left = `${e.clientX - workPlaceRect.left - offsetX}px`;

        draggable.style.position = 'absolute';
        draggable.style.cursor = 'move';
        // document.addEventListener('mouseup', () => {
        //     document.removeEventListener('mousemove', () => { });
        //     draggable.style.cursor = 'default';
        //     draggable.style.top = `${draggable.offsetTop}px`; // фиксируем позицию элемента
        //     draggable.style.left = `${draggable.offsetLeft}px`; // фиксируем позицию элемента
        // });
        draggable.addEventListener('mousedown', (e) => {
            const rect = draggable.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);

            document.addEventListener('mousemove', (e) => {
                const newX = e.clientX - x;
                const newY = e.clientY - y;

                if (newX >= 0 && newX <= workPlaceRect.width - rect.width) {
                    draggable.style.left = `${newX}px`;
                }

                if (newY >= 0 && newY <= workPlaceRect.height - rect.height) {
                    draggable.style.top = `${newY}px`;
                }
            });
        });

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', () => { });
            draggable.style.cursor = 'default';
        });
    });
});

</script>

<style scoped>
#rhombus {
    clip-path: polygon(50% 10%, 100% 50%, 50% 90%, 0% 50%);
}

#array {
    clip-path: polygon(30% 49%, 60% 49%, 60% 40%, 75% 50%, 60% 60%, 60% 51%, 30% 51%);
}
</style>