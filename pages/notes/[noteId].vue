<script setup>
    import { getNote } from '~~/js/requests'
    import { onBeforeMount } from 'vue'
    
    const route = useRoute()
    let response = ref(null)
    let note = ref(null)
    onBeforeMount(async () => {
        try {
            response.value = await getNote(route.params.noteId)
            if (response.value.status === 200) {
                note.value = response.value.data
            }
        } catch (error) { 
            if (error.response.status === 403) {
                note.value = {title: "403 Forbidden", content: "You do not have access to this note."}
            }
            else
                note.value = {title: "Not found"}
        }
    })
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <NoteBox class="mx-40 my-40" v-if="note !== undefined && note !== null" :note="note" />
        </NuxtLayout>
    </div>
</template>