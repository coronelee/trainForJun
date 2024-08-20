<template>
    <div
        class="absolute h-full w-full  flex justify-center items-center px-3 backdrop-blur-sm  animate-[openModal_0.5s_ease-in-out]">
        <div
            class="w-[500px]  overflow-hidden p-3 relative bg-white bg-[#05f] rounded-xl flex gap-3 flex-col justify-start items-start drop-shadow-lg ">
            <div class="w-full h-[380px] flex flex-col gap-2 justify-start items-start" v-if="!finishSelectType">
                <span class="text-2xl w-full">Создать задачу</span>
                <span class="text-base text-[#999] w-full">Выберите одну из следующий категорий для вашего
                    задания</span>
                <form
                    class="flex gap-3 flex-col mb-3 [&>span]:w-full [&>span]:flex [&>span]:gap-2 [&>span]:items-center">
                    <span>
                        <input type="radio" id="seq" name="type" value="seq" @click="selectType = 'seq'">
                        <label for="seq">
                            SEQ (последовательность)
                        </label>
                    </span>
                    <span>
                        <input type="radio" id="task" name="type" value="task" @click="selectType = 'task'">
                        <label for="task">
                            TASK (задача)
                        </label>
                    </span><span>
                        <input type="radio" id="userStory" name="type" value="userStory"
                            @click="selectType = 'userStory'">
                        <label for="userStory">
                            USER STORY (пользовательская история)
                        </label>
                    </span><span>
                        <input type="radio" id="code" name="type" value="code" @click="selectType = 'code'">
                        <label for="code">
                            CODE (код)
                        </label>
                    </span><span>
                        <input type="radio" id="userFlow" name="type" value="userFlow" @click="selectType = 'userFlow'">
                        <label for="userFlow">
                            USER FLOW (поток пользователя)
                        </label>
                    </span><span>
                        <input type="radio" id="erd" name="type" value="erd" @click="selectType = 'erd'">
                        <label for="erd">
                            ERD (схема базы данных)
                        </label>
                    </span><span>
                        <input type="radio" id="arch" name="type" value="arch" @click="selectType = 'arch'">
                        <label for="arch">
                            ARCH (архитектура)
                        </label>
                    </span>
                </form>
            </div>
            <component :is="CodeCreateComponent" v-if="finishSelectType === 'code'" />

            <div class="absolute bottom-0 left-0 bg-[#f3f5f7] h-[50px] w-full flex gap-3 justify-end px-3 items-center
            [&>button]:px-3 [&>button]:py-1 [&>button]:rounded-lg">
                <button class="bg-white" @click="modalCreateOpen">
                    Отмена
                </button>
                <button class="bg-[#05f] text-white" @click="next">
                    Далее
                </button>
            </div>

        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    modalCreateOpen: Function,
    createTask: Function,
})

import { computed, ref } from "vue";
import CodeCreateComponent from "./CodeCreateComponent.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
const selectType = ref(null);
const finishSelectType = ref(null);

const solutionTemplate = ref(null);
const selectTypeLanguage = ref(null);
const nameRoom = computed(() => {
    return mapGetters('returnNameRoom')
});
const resultTask = ref(null);



const next = () => {
    finishSelectType.value = selectType.value
    if (finishSelectType.value) {

        if (finishSelectType.value === 'code') {
            selectTypeLanguage.value = document.getElementById('typeLanguage').value
            nameRoom.value = document.getElementById('nameRoom').value
            resultTask.value = document.getElementById('resultCode').value

            let inputData = document.getElementById('inputDataValue')
            if (inputData) {
                solutionTemplate.value = 'const goodDay = (' + inputData.value + ') => {}'
            }

            if (selectTypeLanguage.value && nameRoom.value && resultTask.value) {
                document.location.href = '/code/' + nameRoom.value + '/' + selectTypeLanguage.value + '/' + resultTask.value + '/' + solutionTemplate.value
            }
        }
    }
}
</script>