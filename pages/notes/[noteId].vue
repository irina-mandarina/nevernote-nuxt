<script setup>
    import { getNote } from '~~/js/requests'
    import { onBeforeMount } from 'vue'
    
    const route = useRoute()
    let note = ref(null)
    let status = ref(null)
    onBeforeMount(async () => {
        try {
            note.value, status.value = await getNote(route.params.noteId)
        } catch (error) { 
            if (error.response.status === 403) {
            note.value = {title: "403 Forbidden", content: "You do not have access to this note."}
        }
        else note.value = {title: "Not found"}
        }
        if (status.value === 200) {
            if (note.username === LSGetLogged()) {
              notesStore.editing.set(note.id, false)
            }
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