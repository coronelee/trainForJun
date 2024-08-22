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

                    <input type="text" :value="i.name" disabled class="w-full bg-transparent text-center">

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


let zone = ref(null)

onMounted(() => {
    const menuItems = document.getElementById('menuItems');
    const workPlace = document.getElementById('workPlace');

    menuItems.addEventListener('dragstart', (e) => {
        const target = e.target;
        if (target.classList.contains('draggable')) {
            e.dataTransfer.setData('text', target.id);
        }
        zone.value = target.parentElement.id
        // console.log(zone.value)

    });

    workPlace.addEventListener('dragover', (e) => {
        e.preventDefault();

    });

    workPlace.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggableId = e.dataTransfer.getData('text');
        const draggable = document.getElementById(draggableId);

        workPlace.appendChild(draggable);

        const target = e.target;
        zone.value = target.id
        // console.log(zone.value)

        const rect = workPlace.getBoundingClientRect();
        draggable.style.top = `${e.clientY - rect.top - draggable.offsetHeight / 2}px`;
        draggable.style.left = `${e.clientX - rect.left - draggable.offsetHeight / 2}px`;
        draggable.style.position = 'absolute';

        draggable.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', draggable.id);
            // console.log(e.dataTransfer.getData('text'));
        });

        draggable.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        draggable.addEventListener('mousedown', (e) => {
            draggable.removeEventListener('dragover', (e) => { })
            const inputChild = draggable.childNodes[0];
            inputChild.classList.remove('border-b', 'border-white', 'bg-[#ffffff33]')
            inputChild.disabled = true
            if (e.button === 2) {
                const modalWindow = document.createElement('div');
                modalWindow.id = 'modalWindow';
                modalWindow.classList.add('absolute', 'top-full', 'left-full', 'w-24', 'h-24', 'bg-red-500', 'z-10');
                modalWindow.innerHTML = ``

                const buttonDeleteModal = document.createElement('button');
                buttonDeleteModal.id = 'buttonDeleteModal';
                buttonDeleteModal.classList.add('top-0', 'left-0', 'w-24', 'h-12', 'bg-red-100', 'z-10', 'hover:bg-red-300');
                buttonDeleteModal.innerHTML = `delete`

                const buttonEditModal = document.createElement('button');
                buttonEditModal.id = 'buttonDeleteModal';
                buttonEditModal.classList.add('top-0', 'left-0', 'w-24', 'h-12', 'bg-red-100', 'z-10', 'hover:bg-red-300');
                buttonEditModal.innerHTML = `edit`

                draggable.appendChild(modalWindow)
                modalWindow.appendChild(buttonDeleteModal)
                modalWindow.appendChild(buttonEditModal)

                buttonEditModal.addEventListener('click', (e) => {


                    const editSizeDraggble = document.createElement('div');
                    editSizeDraggble.id = 'editSizeDraggble';
                    editSizeDraggble.classList.add('absolute', 'top-full', 'left-full', 'w-4', 'h-4', 'bg-white', 'z-10');
                    draggable.appendChild(editSizeDraggble)

                    const inputChild = draggable.childNodes[0];
                    inputChild.disabled = false
                    inputChild.classList.add('border-b', 'border-white', 'bg-[#ffffff33]')

                    draggable.removeChild(modalWindow);

                    editSizeDraggble.addEventListener('mousedown', (e) => {
                        const oldCoord = [e.clientX, e.clientY];
                        const oldSize = [draggable.offsetWidth, draggable.offsetHeight];
                        const handleMouseMove = (e) => {
                            draggable.style.width = `${e.clientX - oldCoord[0] + oldSize[0]}px`;
                            draggable.style.height = `${e.clientY - oldCoord[1] + oldSize[1]}px`;
                            draggable.style.position = 'absolute';
                            // console.log('client' + e.clientX, e.clientY, 'old' + oldCoord[0], oldCoord[1], 'draggable' + draggable.offsetWidth, draggable.offsetHeight);
                            console.log(e.clientX, oldCoord[0], oldSize[0])
                        };

                        const handleMouseUp = () => {
                            editSizeDraggble.removeEventListener('mousemove', handleMouseMove);
                            editSizeDraggble.removeEventListener('mouseup', handleMouseUp);
                        };

                        editSizeDraggble.addEventListener('mousemove', handleMouseMove);
                        editSizeDraggble.addEventListener('mouseup', handleMouseUp);
                    });
                })
                buttonDeleteModal.addEventListener('mousedown', (e) => {
                    draggable.removeChild(modalWindow);
                    workPlace.removeChild(draggable);
                })
            }
        })

        draggable.addEventListener('drop', (e) => {
            e.preventDefault();
            const rect = workPlace.getBoundingClientRect();
            draggable.style.top = `${e.clientY - rect.top - draggable.offsetHeight / 2}px`;
            draggable.style.left = `${e.clientX - rect.left - draggable.offsetHeight / 2}px`;
            workPlace.removeChild(draggable);
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
        const workPlaceItems = workPlace.querySelectorAll('.droppable');

        console.log(element.parentElement.id)
        if (!menuItem) {
            const newMenuItem = element.cloneNode(true);
            newMenuItem.style.top = '';
            newMenuItem.style.left = '';
            newMenuItem.style.position = '';
            // workPlace.removeChild(newMenuItem);
            menuItems.appendChild(newMenuItem);
        }

        workPlaceItems.forEach((workPlaceItem) => {
            if (workPlaceItem.contains(element)) {
                workPlaceItem.removeChild(element);
            }
        });
    });
}

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