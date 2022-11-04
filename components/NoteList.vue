<script setup>
    import { computed } from 'vue'
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from '~~/store/UserStore'
    
    const notesStore = useNotesStore()
    const userStore = useUserStore()
    let notes = computed(() => notesStore.notes)
    let name = computed(() => userStore.name)

    onMounted(() => {
        let username = computed(() => userStore.username).value
        notesStore.getNotes(username) // await??
        userStore.getUserDetails(username)
    })

    function showNote(id) {
        // document.querySelector("#notelist").classList.add('pointer-events-none')
        // document.querySelector("#big-note-bg").classList.remove('hidden')
        // document.querySelector("#big-note-bg").classList.add('display-single-note-bg')
        // document.querySelector("#big-note-bg").classList.add('block')
        notesStore.bigNoteId = id
        console.log(notesStore.bigNoteId)
        // console.log(id)
    }

    function closeNote(id) {
        // document.querySelector("#notelist").classList.remove('pointer-events-none')
        // document.querySelector("#big-note-bg").classList.add('hidden')
        // document.querySelector("#big-note-bg").classList.remove('display-single-note-bg')
        // document.querySelector("#big-note-bg").classList.remove('block')
        notesStore.bigNoteId = -1
        console.log(notesStore.bigNoteId)
        // console.log(id)
    }

</script>

<template>
    <div id="big-note-bg" class="hidden display-single-note-bg w-full h-full">
        <BigNoteBox v-if="notesStore.bigNoteId >= 0" @close-note="closeNote"/>
    </div>

    <div id="notelist" class="w-full h-full bg-gray-800 text-indigo-900 pattern-grid-lg">
        <div class="text-center py-24">
            <p class="text-gray-300 font-frank font-medium text-5xl">Wellcome, {{ name }}!</p>
        </div>

        <NoteAdder />
        <div>
        <NoteBox v-for="note in notes" :id="note.id" :title="note.title" :content="note.content" :date="note.date" @show-note="showNote" />
    </div>
    </div>
</template>

<style> 
    .display-single-note-bg {
        position: fixed;
        z-index: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.536);
    }
</style>