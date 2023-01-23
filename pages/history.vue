<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { searchLogs } from '~~/js/requests'

    let response = ref(null)
    let logs = ref(null)
    onBeforeMount(async () => {
        await getHistory('', true)
    })

    async function getHistory(search, order, pageNumber, pageSize) {
        if (search === null || search === undefined) {
            search = ''
        }
        if (order === null || order === undefined) {
            order = ''
        }
        if (pageNumber === null || pageNumber === undefined) {
            pageNumber = 1
        }
        if (pageSize === null || pageSize === undefined) {
            pageSize = 10
        }
        try {
            response.value = await searchLogs(search, order, pageNumber, pageSize)
            logs.value = response.value.data
        } catch (error) { 
            toastr.error("Could not retrieve history")
        }
    }
</script>
<template>
    <div>
        <NuxtLayout name="default">
            <HistoryMenu @search="getHistory" />
            <div v-if="logs === null || logs.length === 0" class="py-48 text-5xl text-center font-josefin-slab font-bold text-gray-300">
                No history is recorded.
            </div>
            <div class="py-36" v-if="logs !== null">
                <Log v-for="log in logs" :log="log"/>
            </div>
        </NuxtLayout>
    </div>
    
</template>
