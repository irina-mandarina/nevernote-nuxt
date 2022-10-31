<script setup>
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from '~~/store/UserStore'
    
    const notesStore = useNotesStore()
    const userStore = useUserStore()

    onMounted(() => {
        let username = computed(() => userStore.username).value
        console.log(username)
        notesStore.getNotes(username) // await??
        userStore.getUserDetails(username)
    })

    const notes = notesStore.notes
    let name = computed(() => userStore.name)
</script>

<template>
    <div class="w-full h-full fixed bg-gray-800 text-indigo-900 pattern-grid-lg">
        <div class="text-center my-24">
            <p class="text-gray-300 font-serif font-medium text-5xl">Wellcome, {{ name }}!</p>
        </div>

        <NoteAdder />
        <NoteBox v-for="note in notes" :id="note.id" :title="note.title" :content="note.content" :date="note.date" />
        
        <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
    </div>
</template>