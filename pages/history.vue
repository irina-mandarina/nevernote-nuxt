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
            <div v-if="logs === null" class="py-12">
                No history is recorded.
            </div>
            <div class="py-20" v-if="logs !== null">
                <Log v-for="log in logs" :log="log"/>
            </div>
        </NuxtLayout>
    </div>
    
</template>
