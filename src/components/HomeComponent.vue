<template>
    <div class="w-full min-h-full bg-gray-100 p-12 flex gap-8 flex-col justify-start items-center ">
        <div class="w-full h-[40px] flex justify-between  [&>div]:gap-3.5 [&>div>*]:items-center ">
            <div class="flex">
                <span class="flex items-center gap-2 bg-[#f8f9fb] px-3 py-1 rounded-xl">
                    <img src="/account.svg" alt="" class="w-[12px]">
                    {{ name }}
                </span>
                <span class="underline text-[#999] hidden md:flex ">
                    Изменить профиль
                </span>
            </div>
            <div
                class="hidden md:flex [&>button]:border [&>button]:rounded-xl [&>button]:px-3 [&>button]:py-1 [&>button]:transition [&>button]:duration-500 ">
                <button class="border-[#05f] hover:text-white hover:bg-[#05f]  bg-[#f8f9fb] text-[#05f]">
                    Свободный режим
                </button>
                <button class="bg-[#05f] text-white hover:border-[#05f] hover:bg-[#f8f9fb] hover:text-[#05f] ">
                    Создать задачу
                </button>
            </div>
            <div
                class="flex md:hidden [&>button]:border [&>button]:rounded-xl [&>button]:px-3 [&>button]:py-1 [&>button]:transition [&>button]:duration-500 ">
                <button class="border-[#05f] hover:text-white hover:bg-[#05f]  bg-[#f8f9fb] text-[#05f]  [&:hover>svg>path]:stroke-[#fff] [&:hover>svg>path]:transition &[&:hover>svg>g>path]:duration-500">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
                            fill="#05f" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                            fill="#05f" />
                    </svg>
                </button>
                <button id="addTask"
                    class="bg-[#05f] text-white hover:border-[#05f] hover:bg-[#f8f9fb] hover:text-[#05f] [&:hover>svg>g>path]:stroke-[#05f] [&:hover>svg>g>path]:transition &[&:hover>svg>g>path]:duration-500">
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                        <g id="SVGRepo_iconCarrier">
                            <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </g>
                    </svg>
                </button>
            </div>
        </div>
        <span class="text-5xl w-full">Список задач</span>
        <div class="flex justify-center w-full flex-wrap  gap-8">
            <AnswerComponent name="Задача Intern SA [ERD]" type="ER-Diagramm" time="2 часа назад" />
            <AnswerComponent name="Задача Intern SA [ERD]" type="ER-Diagramm" time="2 часа назад" />
            <AnswerComponent name="Задача Intern SA [ERD]" type="ER-Diagramm" time="2 часа назад" />
            <AnswerComponent name="Задача Intern SA [ERD]" type="ER-Diagramm" time="2 часа назад" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import AnswerComponent from "./AnswerComponent.vue";
const name = ref('Bogomdan K.');


</script>