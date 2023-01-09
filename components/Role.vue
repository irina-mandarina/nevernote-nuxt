<script setup>
    defineProps({
        role: String,
        owned: Boolean
    })
</script>

<template>
    <div class="flex mx-auto justify-evenly">
        <div v-if="!owned" @click="$emit('addRole', role)"
            class="rounded-full shadow-lg py-2 px-3 overflow-hidden bg-gray-800 shadow-inner m-3">
            {{ role }}
        </div>
        <div v-if="owned" @click="$emit('removeRole', role)"
            class="rounded-full shadow-lg py-2 px-3 overflow-hidden bg-violet-800 shadow-inner m-3">
            {{ role }}
        </div>
    </div>
</template>