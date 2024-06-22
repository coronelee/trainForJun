<template>
    <div class="w-[420px] h-auto bg-white rounded-xl p-3 flex flex-col">
        <div class="w-full h-[200px]"></div>
        <span class="text-2xl  max-[1350px]:w-full max-[1350px]:text-center">{{ type }}</span>
        <div class="w-full flex justify-between items-center ">
            <b class="text-2xl  max-[1350px]:w-full max-[1350px]:text-center">{{ name }}</b>
            <span class="text-[#999] text-base max-[1350px]:hidden">{{ time }}</span>
        </div>
    </div>
</template>

<script setup>

defineProps({
    name: String,
    type: String,
    time: String
})

</script>