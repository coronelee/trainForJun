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
                <div
                    class="z-10 overflow-hidden left-[30px] drop-shadow-2xl  top-[calc(50%-200px)] absolute w-[200px] h-[400px] bg-[#ffffff] rounded-xl  flex flex-col justify-start items-center gap-2">
                    <div id="menu"
                        class="w-full border-b border-[#e6e6e6] h-[50px] flex [&>button>img]:w-6  [&>button>span]:text-[10px] [&>button]:w-1/4 [&>button]:flex [&>button]:flex-col [&>button]:justify-center [&>button]:items-center">
                        <button @click="menuState = 1">
                            <img src="/menuShapes.svg" alt="">
                            <span>Shapes</span>
                        </button>
                        <button @click="menuState = 2">
                            <img src="/menuStickers.svg" alt="">
                            <span>Stickers</span>
                        </button>
                        <button disabled>
                            <img src="/menuShapes.svg" alt="">
                            <span>Shapes</span>
                        </button>
                        <button disabled>
                            <img src="/menuStickers.svg" alt="">
                            <span>Stickers</span>
                        </button>
                    </div>

                    <div v-if="menuState === 1"
                        class="flex flex-wrap gap-2 w-full p-1 justify-center items-start   [&>div]:h-12 [&>div]:rounded-xs [&>div]:border [&>div]:border-[#e6e6e6]">
                        <div class="w-24" @click="createElement('rectangle')"></div>
                        <div class="w-12" @click="createElement('square')"></div>
                        <div class="w-12 rounded-full" @click="createElement('circle')"></div>
                    </div>
                    <div v-if="menuState === 2">
                        stickers
                    </div>
                </div>
                <div class="droppable scale-1 w-[10000%] bg-[url('/point.svg')]  bg-repeat h-[10000%] absolute left-[-4955%] top-[-4955%] bg-white flex justify-center items-center"
                    id="workBlock" draggable="true">

                </div>
            </div>
        </div>
        <button class=" px-8 h-12 bg-[#2C50CC] text-white rounded-xl ">Проверить</button>
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
const menuState = ref(1);

const createElement = (element) => {
    const el = document.createElement('div');
    el.style.height = '100px';
    el.style.width = '100px';
    el.style.backgroundColor = 'white';
    el.style.border = '1px solid black';
    el.style.borderRadius = '5px';
    el.style.position = 'absolute';
    el.id = Math.round(Math.random() * 1000);


    if (element === 'circle') {
        el.style.borderRadius = '50%';
        workBlock.appendChild(el);
    }
    if (element === 'square') {
        workBlock.appendChild(el);
    }
    if (element === 'rectangle') {
        el.style.width = '150px';
        workBlock.appendChild(el);
    }
}
onMounted(() => {
    const workBlock = document.getElementById('workBlock');


    const x = ref(0);
    const y = ref(0);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const scale = ref(1);



    workBlock.addEventListener('mousewheel', (event) => {
        event.preventDefault();
        if (event.wheelDelta > 0) {
            if (scale.value >= 1.5) return
            scale.value = scale.value + 0.1;
            workBlock.style.transform = workBlock.style.WebkitTransform = workBlock.style.MsTransform = 'scale(' + scale.value + ')';
        }
        if (event.wheelDelta < 0) {
            if (scale.value <= 0.5) return
            scale.value = scale.value - 0.1;
            workBlock.style.transform = workBlock.style.WebkitTransform = workBlock.style.MsTransform = 'scale(' + scale.value + ')';

        }
    })
    const childElements = workBlock.getElementsByTagName('div');

    // childElements.forEach((child) => {
    //     child.addEventListener('mousedown', (event) => {
    //         console.log('contextmenu')

    //         if (event.which === 3) {
    //             console.log('contextmenu')
    //         }
    //     });
    // });
    // for (var i = 0; i < childElements.length; i++) {
    //     (function (index) {
    //         childElements[index].addEventListener("click", function () {
    //             console.log("you clicked region number " + index);
    //         })
    //     })(i);
    // }

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

            console.log(...childElements)
        }
    })



    function moveChild(event) {
        const childElement = event.target;

        if (workBlock.contains(childElement) && childElement !== workBlock) {
            childElement.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text', event.target);
            });

            childElement.addEventListener('dragend', (event) => {
                event.preventDefault();
            });

            workBlock.addEventListener('dragover', (event) => {
                event.preventDefault();
            });

            workBlock.addEventListener('drop', (event) => {
                const scaledSizeWorkBlock = workBlock.getBoundingClientRect();
                const transform = window.getComputedStyle(workBlock).transform;

                let scaleInfo = [];
                let temp = "";

                for (let i = 0; i < transform.length; i++) {
                    if (transform[i] === "(") {
                        continue;
                    } else if (transform[i] === ")") {
                        break;
                    } else if (transform[i] === ",") {
                        scaleInfo.push(temp);
                        temp = "";
                    } else {
                        temp += transform[i];
                    }
                }
                scaleInfo.push(temp);

                if (scaleInfo.length === 6) {
                    const x = (event.clientX - scaledSizeWorkBlock.left - childElement.offsetWidth / 2) / scaleInfo[0].replace("matrix", "");
                    const y = (event.clientY - scaledSizeWorkBlock.top - childElement.offsetHeight / 2) / scaleInfo[3];
                    childElement.style.top = `${y}px`;
                    childElement.style.left = `${x}px`;
                } else {
                    const x = (event.clientX - scaledSizeWorkBlock.left - childElement.offsetWidth / 2);
                    const y = (event.clientY - scaledSizeWorkBlock.top - childElement.offsetHeight / 2);
                    childElement.style.top = `${y}px`;
                    childElement.style.left = `${x}px`;
                }
            });
        }
    }

    function move(event) {
        event.target.style.cursor = 'grabbing';
        const newX = event.clientX - x.value;
        const newY = event.clientY - y.value;
        event.target.style.left = `${offsetX.value + newX}px`;
        event.target.style.top = `${offsetY.value + newY}px`;
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