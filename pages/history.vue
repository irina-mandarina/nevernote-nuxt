<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { getLogs } from '~~/js/requests'

    let response = ref(null)
    let logs = ref(null)
    onBeforeMount(async () => {
        try {
            response.value = await getLogs()
        } catch (error) { 
            toastr.error("Could not retrieve history")
        }
        if (response.value.status === 200) {
            logs.value = response.value.data
        }
    })
</script>
<template>
    <div>
        <NuxtLayout name="default">
            <HistoryMenu />
            <div class="py-12">
            </div>
            <div v-if="logs !== null" v-for="log in logs">
                <Log :log="log"/>
            </div>
        </NuxtLayout>
    </div>
    
</template>
