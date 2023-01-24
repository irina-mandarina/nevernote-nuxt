<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { searchLogs } from '~~/js/requests'

    let response = ref(null)
    let logs = ref(null)
    let search = ref('')
    let order = ref('')
    let pageNumber = ref(1)
    let pageSize = ref(50)
    onBeforeMount(async () => {
        await getHistory('', order.value)
    })

    async function getHistory(searchArg, orderArg, pageNumberArg, pageSizeArg) {
        if (searchArg === null || searchArg === undefined) {
            searchArg = ''
        }
        else {
            search.value = searchArg
        }
        if (orderArg === null || orderArg === undefined) {
            orderArg = ''
        }
        else {
            order.value = orderArg
        }
        if (pageNumberArg !== null && pageNumberArg !== undefined) {
            pageNumber.value = pageNumberArg
        }
        if (pageSizeArg === null && pageSizeArg !== undefined) {
            pageSize.value = pageSizeArg
        }
        try {
            response.value = await searchLogs(search.value, order.value, pageNumber.value, pageSize.value)
            logs.value = response.value.data
        } catch (error) { 
            toastr.error("Could not retrieve history")
        }
    }

    async function nextPage() {
        try {
            response.value = await searchLogs(search.value, order.value, pageNumber.value + 1, pageSize.value)
            logs.value = response.value.data
        } catch (error) { 
            toastr.error("Could not retrieve history")
        }
    }
    async function previousPage() {
        if (pageNumber.value !== 1) {
            try {
                response.value = await searchLogs(search.value, order.value, pageNumber.value--, pageSize.value)
                logs.value = response.value.data
            } catch (error) { 
                toastr.error("Could not retrieve history")
            }
        }
    }
    async function setPageSize(pageSizeArg) {
        pageSize.value = pageSizeArg
        try {
            response.value = await searchLogs(search.value, order.value, pageNumber.value, pageSize.value)
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
            <LogList :logs="logs" />
            <Paginator :page-number="pageNumber" :pageSize="pageSize"
            @next-page="nextPage"
            @previous-page="previousPage"
            @set-page-size="setPageSize" />
        </NuxtLayout>
    </div>
    
</template>
