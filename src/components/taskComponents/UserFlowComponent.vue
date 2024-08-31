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

            <div class="droppable w-full bg-[#d7cde9] relative overflow-hidden" id="wrapper">
                <div class="z-10 left-[10px] top-[calc(50%-100px)] absolute w-[100px] h-[200px] bg-[#ffffffcc] rounded-xl border-2 border-white"
                    id="menu">
                </div>
                <div class="droppable w-[10000%] bg-[url('/point.svg')]  bg-repeat h-[10000%] absolute left-[-4955%] top-[-4955%] bg-[#d7cde9] flex justify-center items-center"
                    id="workBlock" draggable="true">
                    <div class="w-12 h-12 bg-[#2C50CC] absolute left-[50%] top-[50%]" draggable="true"></div>
                </div>
            </div>
        </div>
        <button class=" px-8 h-12 bg-[#2C50CC] text-white rounded-xl">Проверить</button>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import AnswerComponent from '../AnswerComponent.vue';
const idRoom = ref('room2432523521');
const nameRoom = ref('Проект интернет-магазин');
const typeRoom = ref('User Flow');
const discriptionRoom = ref('Контекст: Необходимо описать User Flow магазина');
const peopleInTheRoom = ref(['Евгений К.', 'Василий Н.']);


onMounted(() => {
    const wrapper = document.getElementById('wrapper');
    const workBlock = document.getElementById('workBlock');


    const x = ref(0);
    const y = ref(0);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const scale = ref(1);


    const sizeWorkBlock = workBlock.getBoundingClientRect();

    workBlock.addEventListener('mousewheel', (event) => {
        event.preventDefault();
        if (event.wheelDelta > 0) {
            scale.value = scale.value * 1.5;
            workBlock.style.transform = workBlock.style.WebkitTransform = workBlock.style.MsTransform = 'scale(' + scale.value + ')';
        }
        if (event.wheelDelta < 0) {
            scale.value = scale.value / 1.5;
            workBlock.style.transform = workBlock.style.WebkitTransform = workBlock.style.MsTransform = 'scale(' + scale.value + ')';
        }
    })

    document.addEventListener('mousedown', (event) => {
        if (event.target === workBlock) {
            event.preventDefault();
            x.value = event.clientX;
            y.value = event.clientY;
            offsetX.value = workBlock.offsetLeft;
            offsetY.value = workBlock.offsetTop;
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', stop);
        }
        if (workBlock.contains(event.target) && event.target !== workBlock) {
            moveChild(event)
        }
    })

    function moveChild(event) {
        const childElement = event.target;

        childElement.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text', event.target.id);
        });

        childElement.addEventListener('dragend', (event) => {
            event.preventDefault();
        });

        workBlock.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        workBlock.addEventListener('drop', (event) => {
            const scaledSizeWorkBlock = workBlock.getBoundingClientRect();
            const x = event.clientX - scaledSizeWorkBlock.left - childElement.offsetWidth / 2;
            const y = event.clientY - scaledSizeWorkBlock.top - childElement.offsetHeight / 2;
            childElement.style.top = `${y}px`;
            childElement.style.left = `${x}px`;


            console.log(x, y)
            console.log('rect ' + sizeWorkBlock.left, sizeWorkBlock.top)
            console.log('client ' + event.clientX, event.clientY)
        });
    }

    function move(event) {
        event.target.style.cursor = 'grabbing';
        const newX = event.clientX - x.value;
        const newY = event.clientY - y.value;
        event.target.style.left = `${offsetX.value + newX}px`;
        event.target.style.top = `${offsetY.value + newY}px`;
    }

    function stopChild() {
        document.removeEventListener('mousemove', moveChild);
        document.removeEventListener('mouseup', stopChild);
        workBlock.style.cursor = 'default';
    }
    function stop() {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', stop);
        workBlock.style.cursor = 'default';
    }
})
</script>

<style scoped>
#condition {
    clip-path: polygon(50% 10%, 100% 50%, 50% 90%, 0% 50%);
}

#start {
    border-radius: 50%;
}

#array {
    clip-path: polygon(30% 49%, 60% 49%, 60% 40%, 75% 50%, 60% 60%, 60% 51%, 30% 51%);
}
</style>