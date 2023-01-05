<script setup>
    import { computed } from 'vue'
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from '~~/store/UserStore'
    
    const notesStore = useNotesStore()
    const userStore = useUserStore()
    let notes = computed(() => notesStore.notes)
    let name = computed(() => userStore.name)
    let loggedUserPermissions = ref(["GET", "PUT", "POST"])

    onMounted(() => {
        let username = computed(() => userStore.username).value
        notesStore.getNotes(username)
        userStore.getUserDetails(username)
    })

    function showNote(id) {
        notesStore.bigNoteId = id
    }

    function closeNote(id) {
        notesStore.bigNoteId = -1
    }

    function allowEdit(id) {
        notesStore.editing = id
    }

    function saveChanges(editedNote) {
        notesStore.editing = null
        notesStore.editNote(editedNote)
    }

    function cancelEdit(id) {
        notesStore.editing = null
    }

    function completeTask(id) {
        notesStore.completeTask(id)
    }
 
    function toggleNoteBoxPrivacy(id) {
        notesStore.togglePrivacy(id)
    }

    function deleteNote(id) {
        notesStore.deleteNote(id)
    }

</script>

<template>
    <div v-if="notesStore.bigNoteId >= 0" id="big-note-bg" class="display-single-note-bg w-full h-full">
        <BigNoteBox @close-note="closeNote"/>
    </div>

    <div id="notelist" class="w-full h-full bg-gray-800 text-indigo-900 pattern-grid-lg" 
        :class="{
            'pointer-events-none': notesStore.bigNoteId >= 0
        }"
    >
        <div class="text-center py-24">
            <p class="text-gray-300 font-frank font-medium text-5xl">Wellcome, {{ name }}!</p>
        </div>

        <div class="flex flex-wrap justify-evenly">
            <NoteAdder v-if="userStore.roles.includes('USER')" />
            <NoteBox v-for="note in notes"
                :note="note" :logged-user-permissions="loggedUserPermissions" :editing="notesStore.editing === note.id"
                @show-note="showNote" @allow-edit="allowEdit" @save-changes="saveChanges" @cancel-edit="cancelEdit" 
                @complete-task="completeTask" @toggle-note-box-privacy="toggleNoteBoxPrivacy" @delete-note="deleteNote" />
        </div>
    </div>
</template>

<style> 
    .display-single-note-bg {
        position: fixed;
        top: 0;
        background-color: rgba(0, 0, 0, 0.536);
    }
</style>