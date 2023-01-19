<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { getLogs, searchLogs } from '~~/js/requests'
    import { useUserStore } from '~~/store/UserStore'

    let response = ref(null)
    let logs = ref(null)
    onBeforeMount(async () => {
        await getHistory('', true)
    })

    async function getHistory(search, orderByDateDesc) {
        if (useUserStore().roles.includes('ADMIN')) {
            if (search === null || search === undefined) {
                search = ''
            }
            if (orderByDateDesc === null || orderByDateDesc === undefined) {
                orderByDateDesc = true
            }
            try {
                response.value = await searchLogs(search, orderByDateDesc)
                logs.value = response.value.data
            } catch (error) { 
                toastr.error("Could not retrieve history")
            }
        }
        else {
            try {
                response.value = await getLogs() 
                logs.value = response.value.data
            }
            catch (error) {
                toastr.error("Could not retrieve history")
            }
        }
    }
</script>
<template>
    <div>
        <NuxtLayout name="default">
            <HistoryMenu v-if="useUserStore().roles.includes('ADMIN')" @search="getHistory" />
            <div v-if="logs === null || logs.length === 0" class="py-48 text-5xl text-center font-josefin-slab font-bold text-gray-300">
                No history is recorded.
            </div>
            <div class="py-36" v-if="logs !== null">
                <Log v-for="log in logs" :log="log"/>
            </div>
        </NuxtLayout>
    </div>
    
</template>
