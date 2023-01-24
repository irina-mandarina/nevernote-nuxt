<script setup>
    defineProps({
        logs: Array
    })
</script>
<template>
    <div class="py-36" v-if="logs !== null">
        <Log v-for="log in logs" :log="log"/>
    </div>
</template>