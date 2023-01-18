<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { searchLogs } from '~~/js/requests'
    import { useUserStore } from '~~/store/UserStore'

    let response = ref(null)
    let logs = ref(null)
    onBeforeMount(async () => {
        await searchHistory('', true)
    })

    async function searchHistory(search, orderByDateDesc) {
        if (search === null || search === undefined) {
            search = ''
        }
        if (orderByDateDesc === null || orderByDateDesc === undefined) {
            console.log(orderByDateDesc)
            orderByDateDesc = true
        }
        try {
            response.value = await searchLogs(search, orderByDateDesc)
        } catch (error) { 
            toastr.error("Could not retrieve history")
        }
        if (response.value.status === 200) {
            logs.value = response.value.data
        }
    }
</script>
<template>
    <div>
        <NuxtLayout name="default">
            <HistoryMenu @search="searchHistory(search, orderByDateDesc)" v-if="useUserStore().roles.includes('ADMIN')" />
            <div class="py-12">
            </div>
            <div v-if="logs !== null" v-for="log in logs">
                <Log :log="log"/>
            </div>
        </NuxtLayout>
    </div>
    
</template>
