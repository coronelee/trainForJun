<template>
    <header class="w-full h-[75px] flex justify-between items-center px-12 max-[600px]:px-5 border-b border-gray-300">
        <img src="/logo.png" alt="" class="h-[75px]">
        <div class="flex gap-10 font-bold max-[600px]:hidden">
            <button>Контакты</button><button>Поддержка</button><button>О нас</button>
        </div>
        <div class="flex flex-col  gap-1 font-bold min-[600px]:hidden [&>div]:w-[40px] [&>div]:h-[3px] [&>div]:bg-[#2c50cc]"
            @click="openHamburger">
            <svg class="ham hamRotate hamAnim" viewBox="0 0 100 100" width="80" onclick="this.classList.toggle('active')">
                <path class="line top"
                    d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
                <path class="line middle" d="m 30,50 h 40" />
                <path class="line bottom"
                    d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
            </svg>
        </div>
    </header>
</template>

<script setup>

const props = defineProps({
    openHamburger: Function
})


</script>


<style scoped>
.ham {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: transform 400ms;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.hamRotate.active {
    transform: rotate(45deg);
}

.hamRotate180.active {
    transform: rotate(180deg);
}

.line {
    fill: none;
    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
    stroke: #000;
    stroke-width: 5.5;
    stroke-linecap: round;
}

.hamAnim .top {
    stroke-dasharray: 40 139;
}

.hamAnim .bottom {
    stroke-dasharray: 40 180;
}

.hamAnim.active .top {
    stroke-dashoffset: -98px;
}

.hamAnim.active .bottom {
    stroke-dashoffset: -138px;
}
</style>