<template>
    <div class="w-3/12 h-auto bg-white rounded-xl p-3 flex flex-col">
        <div class="w-full h-[200px]"></div>
        <span class="text-2xl">{{ type }}</span>
        <div class="w-full flex justify-between items-center">
            <b class="text-2xl">{{ name }}</b>
            <span class="text-[#999] text-base">{{ time }}</span>
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