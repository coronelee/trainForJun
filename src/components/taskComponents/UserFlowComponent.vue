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
                class="w-1/5 flex flex-col relative justify-start gap-4 py-12 items-center [&>button]:bg-[#2C50CC] [&>button]:px-8 [&>button]:py-4 [&>button]:w-24 [&>button]:h-24   [&>button]:flex [&>button]:justify-center [&>button]:items-center  [&>button]:text-white">


                <!-- <div v-for="i in items" :key="i" :id="i.id" draggable="true" class="draggable w-24 h-24 bg-[#2C50CC]">
                    <input type="text" :value="i.name" disabled class="w-full bg-transparent text-center">
                </div> -->

                <button id="start">
                    Start/finish
                </button>
                <button id="action">
                    Action
                </button>
                <button id="condition">
                    Condition
                </button>

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
import AnswerComponent from '../AnswerComponent.vue';
const idRoom = ref('room2432523521');
const newId = ref(0);
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


let zone = ref(null)
const selectItem = ref(null);
onMounted(() => {
    const menuItems = document.getElementById('menuItems');
    const workPlace = document.getElementById('workPlace');
    const buttonStart = document.getElementById('start');
    const buttonAction = document.getElementById('action');
    const buttonCondition = document.getElementById('condition');

    // Create the items
    const itemStart = document.createElement('div');
    itemStart.classList.add('w-24', 'h-24', 'bg-[#2C50CC]', 'flex', 'justify-center', 'items-center', 'text-white');
    itemStart.draggable = 'true';
    itemStart.innerText = 'start/finish';

    const itemCondition = document.createElement('div');
    itemCondition.classList.add('w-24', 'h-24', 'bg-[#2C50CC]', 'flex', 'justify-center', 'items-center', 'text-white');
    itemCondition.draggable = 'true';
    itemCondition.innerText = 'condition';

    const itemAction = document.createElement('div');
    itemAction.classList.add('w-24', 'h-24', 'bg-[#2C50CC]', 'flex', 'justify-center', 'items-center', 'text-white', 'rounded-full');
    itemAction.draggable = 'true';
    itemAction.innerText = 'action';

    // Add event listeners to the buttons
    buttonStart.addEventListener('click', (e) => {
        selectItem.value = 'start';
        workPlace.appendChild(itemStart);
    });

    buttonAction.addEventListener('click', (e) => {
        selectItem.value = 'action';
        workPlace.appendChild(itemAction);
    });

    buttonCondition.addEventListener('click', (e) => {
        selectItem.value = 'condition';
        workPlace.appendChild(itemCondition);
        itemCondition.id = 'condition';

    });

    workPlace.addEventListener('drag', (e) => {
        e.preventDefault();
        const rect = workPlace.getBoundingClientRect();
        e.target.style.position = 'absolute';
        const maxX = rect.width - e.target.offsetWidth;
        const maxY = rect.height - e.target.offsetHeight;
        e.target.style.top = `${Math.min(Math.max(e.clientY - rect.top - e.target.offsetHeight / 2, 0), maxY)}px`;
        e.target.style.left = `${Math.min(Math.max(e.clientX - rect.left - e.target.offsetWidth / 2, 0), maxX)}px`;
    }
    );

    workPlace.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    // workPlace.addEventListener('dragstart', (e) => {
    //     const target = e.target;
    //     if (target.classList.contains('draggable')) {
    //         e.dataTransfer.setData('text', target.id);
    //     }
    //     console.log(target)
    // });

    // workPlace.addEventListener('dragover', (e) => {
    //     e.preventDefault();
    // });




    // const itemsMenu = ref(menuItems.childNodes);

    // watch(itemsMenu, (e) => {
    //     console.log(e);
    // })

    // console.log(itemsMenu.value)



    // menuItems.addEventListener('dragstart', (e) => {
    //     const target = e.target;
    //     if (target.classList.contains('draggable')) {
    //         e.dataTransfer.setData('text', target.id);
    //     }
    // });

    // workPlace.addEventListener('dragover', (e) => {
    //     e.preventDefault();
    // });

    // workPlace.addEventListener('drop', (e) => {
    //     e.preventDefault();
    //     const draggableId = e.dataTransfer.getData('text');
    //     const draggable = document.getElementById(draggableId);
    //     const rect = workPlace.getBoundingClientRect();

    //     const action = document.createElement('div');
    //     action.classList.add('w-24', 'h-24', 'bg-[#2C50CC]', 'flex', 'justify-center', 'items-center', 'text-white');
    //     action.innerText = 'action';
    //     action.draggable = 'true';

    //     const condition = document.createElement('div');
    //     condition.classList.add('w-24', 'h-24', 'bg-[#2C50CC]', 'flex', 'justify-center', 'items-center', 'text-white');
    //     condition.draggable = 'true';
    //     condition.innerText = 'condition';

    //     const start = document.createElement('div');
    //     start.classList.add('w-24', 'h-24', 'bg-[#2C50CC]', 'flex', 'justify-center', 'items-center', 'text-white', 'rounded-full');
    //     start.draggable = 'true';
    //     start.innerText = 'start/finish';

    //     console.log(zone.value)
    //     if (zone.value == null) {
    //         draggable.style.position = 'absolute';
    //         draggable.style.top = `${e.clientY - rect.top - draggable.offsetHeight / 2}px`;
    //         draggable.style.left = `${e.clientX - rect.left - draggable.offsetWidth / 2}px`;
    //         workPlace.appendChild(draggable);

    //         menuItems.appendChild(draggable.cloneNode(true));
    //         console.log(1)
    //     }
    //     if (zone.value == 'action') {
    //         action.style.position = 'absolute';
    //         action.style.top = `${e.clientY - rect.top - action.offsetHeight / 2}px`;
    //         action.style.left = `${e.clientX - rect.left - action.offsetWidth / 2}px`;
    //         workPlace.appendChild(action);
    //         console.log(2)

    //     }
    //     if (zone.value == 'condition') {
    //         condition.style.position = 'absolute';
    //         condition.style.top = `${e.clientY - rect.top - condition.offsetHeight / 2}px`;
    //         condition.style.left = `${e.clientX - rect.left - condition.offsetWidth / 2}px`;
    //         workPlace.appendChild(condition);
    //         console.log(3)

    //     }
    //     if (zone.value == 'start') {
    //         console.log(start);
    //         start.style.position = 'absolute';
    //         start.style.top = `${e.clientY - rect.top - start.offsetHeight / 2}px`;
    //         start.style.left = `${e.clientX - rect.left - start.offsetWidth / 2}px`;
    //         workPlace.appendChild(start);
    //         console.log(4)

    //         // menuItems.appendChild(start);
    //     }

    //     // restoreMenuItems();

    //     if (zone.value != 'action' && zone.value != 'condition' && zone.value != 'start') {

    //         for (let i = 0; i < itemsMenu.value.length; i++) {
    //             // console.log(itemsMenu.value[i].id)
    //         }


    //         // menuItems.appendChild(action);


    //         // workPlace.appendChild(condition);


    //         // workPlace.appendChild(start);
    //     }
    // });

    // workPlace.addEventListener('dragover', (e) => {
    //     e.preventDefault();
    // });


    //     workPlace.addEventListener('dragstart', (e) => {
    //         e.dataTransfer.setData('text', e.target.id);
    //         zone.value = e.target.id
    //         console.log(zone.value)
    //     })


    //     menuItems.addEventListener('dragstart', (e) => {
    //         const target = e.target;
    //         if (target.classList.contains('draggable')) {
    //             e.dataTransfer.setData('text', target.id);
    //         }
    //         zone.value = target.parentElement.id
    //         // console.log(zone.value)

    //     });
    //     workPlace.addEventListener('dragover', (e) => {
    //         e.preventDefault();

    //     });
    //     workPlace.addEventListener('drop', (e) => {
    //         e.preventDefault();
    //         const draggableId = e.dataTransfer.getData('text');
    //         const draggable = document.getElementById(draggableId);

    //         workPlace.appendChild(draggable);

    //         const target = e.target;
    //         zone.value = target.id
    //         // console.log(zone.value)

    //         const rect = workPlace.getBoundingClientRect();
    //         draggable.style.top = `${e.clientY - rect.top - draggable.offsetHeight / 2}px`;
    //         draggable.style.left = `${e.clientX - rect.left - draggable.offsetHeight / 2}px`;
    //         draggable.style.position = 'absolute';

    //         draggable.addEventListener('dragstart', (e) => {
    //             e.dataTransfer.setData('text', draggable.id);
    //             // console.log(e.dataTransfer.getData('text'));
    //         });

    //         draggable.addEventListener('dragover', (e) => {
    //             e.preventDefault();
    //         });

    //         draggable.addEventListener('mousedown', (e) => {
    //             draggable.removeEventListener('dragover', (e) => {
    //                 e.preventDefault();
    //             })
    //             // const inputChild = draggable.childNodes[0];
    //             // inputChild.classList.remove('border-b', 'border-white', 'bg-[#ffffff33]')
    //             // inputChild.disabled = true
    //             if (e.button === 2) {
    //                 const modalWindow = document.createElement('div');
    //                 modalWindow.id = 'modalWindow';
    //                 modalWindow.classList.add('absolute', 'top-full', 'left-full', 'w-24', 'h-24', 'bg-red-500', 'z-10');
    //                 modalWindow.innerHTML = ``

    //                 const buttonDeleteModal = document.createElement('button');
    //                 buttonDeleteModal.id = 'buttonDeleteModal';
    //                 buttonDeleteModal.classList.add('top-0', 'left-0', 'w-24', 'h-12', 'bg-red-100', 'z-10', 'hover:bg-red-300');
    //                 buttonDeleteModal.innerHTML = `delete`

    //                 const buttonEditModal = document.createElement('button');
    //                 buttonEditModal.id = 'buttonDeleteModal';
    //                 buttonEditModal.classList.add('top-0', 'left-0', 'w-24', 'h-12', 'bg-red-100', 'z-10', 'hover:bg-red-300');
    //                 buttonEditModal.innerHTML = `edit`

    //                 draggable.appendChild(modalWindow)
    //                 modalWindow.appendChild(buttonDeleteModal)
    //                 modalWindow.appendChild(buttonEditModal)

    //                 buttonEditModal.addEventListener('mousedown', (e) => {
    //                     const editSizeDraggble = document.createElement('div');
    //                     editSizeDraggble.id = 'editSizeDraggble';
    //                     editSizeDraggble.classList.add('absolute', 'bg-white', 'top-[calc(100%-0px)]', 'left-[calc(100%-0px)]', 'w-4', 'h-4', 'z-15', 'bg-[url(/diagonalArrow.svg)]', 'bg-no-repeat', 'bg-center', 'bg-cover');
    //                     draggable.appendChild(editSizeDraggble)

    //                     const inputChild = draggable.childNodes[0];
    //                     inputChild.disabled = false
    //                     inputChild.classList.add('border-b', 'border-white', 'bg-[#ffffff33]')

    //                     draggable.removeChild(modalWindow);

    //                     editSizeDraggble.addEventListener('mousedown', (e) => {
    //                         const oldCoord = [e.clientX, e.clientY];
    //                         const oldSize = [draggable.offsetWidth, draggable.offsetHeight];
    //                         const handleMouseMove = (e) => {
    //                             draggable.style.width = `${e.clientX - oldCoord[0] + oldSize[0]}px`;
    //                             draggable.style.height = `${e.clientY - oldCoord[1] + oldSize[1]}px`;
    //                             draggable.style.position = 'absolute';
    //                             // console.log('client' + e.clientX, e.clientY, 'old' + oldCoord[0], oldCoord[1], 'draggable' + draggable.offsetWidth, draggable.offsetHeight);
    //                             console.log(e.clientX, oldCoord[0], oldSize[0])
    //                         };

    //                         const handleMouseUp = () => {
    //                             editSizeDraggble.removeEventListener('mousemove', handleMouseMove);
    //                             editSizeDraggble.removeEventListener('mouseup', handleMouseUp);
    //                         };

    //                         editSizeDraggble.addEventListener('mousemove', handleMouseMove);
    //                         editSizeDraggble.addEventListener('mouseup', handleMouseUp);
    //                     });
    //                 })
    //                 buttonDeleteModal.addEventListener('mousedown', (e) => {
    //                     draggable.removeChild(modalWindow);
    //                     workPlace.removeChild(draggable);
    //                 })
    //             }
    //         })

    //         draggable.addEventListener('drop', (e) => {
    //             e.preventDefault();
    //             const rect = workPlace.getBoundingClientRect();
    //             draggable.style.top = `${e.clientY - rect.top - draggable.offsetHeight / 2}px`;
    //             draggable.style.left = `${e.clientX - rect.left - draggable.offsetHeight / 2}px`;
    //             workPlace.removeChild(draggable);
    //         });
    //         restoreMenuItems()
    //     });
    // });


    // function restoreMenuItems() {
    //     const menuItems = document.getElementById('menuItems');
    //     const workPlace = document.getElementById('workPlace');
    //     const draggableElements = workPlace.querySelectorAll('.draggable');

    //     draggableElements.forEach((element) => {
    //         const menuItem = menuItems.querySelector(`#${element.id}`);

    //         console.log(element.parentElement.id)
    //         if (!menuItem) {
    //             const newMenuItem = element.cloneNode(true); // --- создаем копию элемента
    //             menu.appendChild(newMenuItem); // --- добавляем копию элемента в workPlace
    //         }
});

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