<script setup>
    import { useNotesStore } from '~~/store/NotesStore'
    
    const route = useRoute()
    const notesStore = useNotesStore()
    const note = ref( await notesStore.getNote(route.params.noteId))
    console.log(note.value)
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <!-- <NoteBox :id="note.id" :title="note.title" :content="note.content" :date="note.date" :deadline="note.deadline" :completed="note.completed" :privacy="note.privacy"/> -->
        </NuxtLayout>
    </div>
</template>