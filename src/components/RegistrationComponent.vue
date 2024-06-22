<template>
    <div class="w-full h-full bg-gray-100 flex justify-center items-center min-[500px]:py-24">
        <div
            class="h-full max-[500px]:w-full w-[450px] relative bg-white min-[500px]:rounded-3xl min-[500px]:drop-shadow-lg flex flex-col gap-3 items-center justify-center">
            <b class="text-2xl">Вход или регистрация</b>
            <span class="text-base">{{ sendCodeValue ? 'Введите последние 4 цифры' : 'На этот номер поступит звонок'
                }}</span>
            <div class="flex gap-2 w-[300px] justify-between" v-if="!sendCodeValue">
                <input type="text" value="+7"
                    class="border bg-transparent border-gray-200 px-4 py-2 rounded-xl w-[62px] h-[50px] text-center outline-none"
                    disabled>
                <input type="text" ref="phoneInput" placeholder="Номер телефона"
                    class="border bg-transparent border-gray-200 px-4 py-2 rounded-xl  h-[50px] text-left outline-none">
            </div>
            <div class="flex gap-2  [&>input]:w-[50px] [&>input]:h-[50px] juctify-center items-center [&>input]:border-b [&>input]:border-gray-900 [&>input]:outline-none [&>input]:text-center"
                v-if="sendCodeValue">
                <input type="text" inputmode="numeric" id="code1" @input="nextInput(2)" @keyup.delete="prevInput()"
                    placeholder="•" maxlength="1">
                <input type="text" inputmode="numeric" id="code2" @input="nextInput(3)" @keyup.delete="prevInput(1)"
                    placeholder="•" maxlength="1">
                <input type="text" inputmode="numeric" id="code3" @input="nextInput(4)" @keyup.delete="prevInput(2)"
                    placeholder="•" maxlength="1">
                <input type="text" inputmode="numeric" id="code4" @input="nextInput('enter')"
                    @keyup.delete="prevInput(3)" placeholder="•" maxlength="1">
            </div>
            <button class="bg-[#2c50cc] text-white text-base w-[300px] h-[50px] font-bold rounded-lg"
                @click="sendCode">{{ sendCodeValue ? 'Войти' : 'Позвонить'
                }}</button>
            <div class="flex w-[300px] justify-between items-center [&>hr]:w-full gap-3 [&>hr]:h-[5px]">
                <hr>
                <span class="text-base w-full whitespace-nowrap">Войдите с помощью</span>
                <hr>
            </div>
            <div class="flex gap-3 flex-col w-[300px] items-center justify-center
             [&>button]:w-full [&>button]:h-[50px] [&>button]:rounded-lg [&>button]:text-base 
             [&>button]:border  [&>button]:transition-all [&>button]:duration-1000 [&>button:hover]:text-white
             [&>button]:flex [&>button]:justify-center [&>button]:items-center [&>button]:gap-2
             [&>button>img]:w-[20px] ">
                <button class="border-black hover:bg-black"><img src="/social/google.svg" alt="">Google</button>
                <button class="border-[#0077ff] hover:bg-[#0077ff]"><img src="/social/vk.svg" alt="">VK</button>
                <button class="border-[#34a7e4] hover:bg-[#34a7e4]" @click="onTelegramAuth()"><img src="/social/tg.svg"
                        alt="">Telegram</button>
            </div>
            <a class="absolute bottom-5 right-1/2 translate-x-1/2 whitespace-nowrap text-[#6d6d6d] underline"
                href="#/">Пользовательское соглашение </a>
        </div>
    </div>
</template>


<script setup>
import { onMounted, ref } from 'vue';
import IMask from 'imask';
const phoneInput = ref(null);
const sendCodeValue = ref(false);

onMounted(() => {
    const mask = IMask(phoneInput.value, {
        mask: '(000) 000-00-00'
    });
});

const sendCode = () => {
    sendCodeValue.value = !sendCodeValue.value;
}

const nextInput = (value) => {
    if (value === 'enter') {
        alert('tipa code sent');
        document.location.href = '#/home';
        return;
    }
    const element = document.getElementById(`code${value}`);
    if (element) {
        element.focus();
    }
}

const prevInput = (value) => {
    const element = document.getElementById(`code${value}`);
    if (element) {
        element.focus();
    }
}
</script>