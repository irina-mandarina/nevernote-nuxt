<script setup>
    const props = defineProps({
        log: Object
    })

</script>
<template>
    <div v-if="log !== null || log !== undefined"
        class="flex w-2/3 rounded-lg bg-gray-600 p-4 mb-4 text-md text-gray-300 mx-auto duration-300 hover:border-gray-500 border-2 border-gray-600">
        <span class="w-1/2">
            <span v-if="log.timestamp !== undefined" class="w-1/4 px-2">
                {{ log.timestamp }}
            </span>
            <span v-if="log.method !== undefined" class="w-1/4 px-2">
                {{ log.method }}
            </span>
            <span v-if="log.path !== undefined" class="w-1/4 px-2">
                {{ log.path }}
            </span>
        </span>
        <span v-if="log.message !== undefined" class="w-1/2 px-2">
            {{ log.message }}
        </span>
    </div>
</template>