<script setup>
    import { useNotesStore } from '~~/store/NotesStore'
    import { onBeforeMount } from 'vue'
    
    const notesStore = useNotesStore()
    const route = useRoute()
    let note = ref(null)
    let status = ref(null)
    onBeforeMount(async () => {
        try {
            note, status = await getNote(route.params.noteId)
        } catch (error) { 
            if (error.response.status === 403) {
            note = {title: "403 Forbidden", content: "You do not have access to this note."}
        }
        else note = {title: "Not found"}
        }
        if (status === 200) {
            // if (response.note.username === LSGetLogged()) {
            //   this.editing.set(response.note.id, false)
            // }
            note.value = response.data
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