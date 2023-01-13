<script setup>
    import { getNote, getPermissions, deleteNote, editNote } from '~~/js/requests'
    import { onBeforeMount } from 'vue'
    import { useNotesStore } from '~~/store/NotesStore'
    
    const notesStore = useNotesStore()
    const route = useRoute()
    let response = ref(null)
    let note = ref(null)
    let editing = ref(false)
    let loggedUserPermissions = ref([])

    onBeforeMount(() => {
        requestToGetNote()
    })

    async function requestToGetNote() {
        try {
            response.value = await getNote(route.params.noteId)
            if (response.value.status === 200) {
                note.value = response.value.data
            }

            try {
                const permissions = await getPermissions(note.value.id)
                for (let i = 0; i < permissions.data.length; i++) {
                    loggedUserPermissions.value.push(permissions.data[i].permissionType)
                }
            }
            catch (error) {
                console.log(error)
                toastr.error("Could not get permissions for note")
            }

        } catch (error) { 
            if (error.response.status === 403) {
                note.value = {title: "403 Forbidden", content: "You do not have access to this note."}
            }
            else
                note.value = {title: "Not found"}
        }
    }

    async function requestToDeleteNote() {
        try {
            const response = await deleteNote(note.value.id)
            requestToGetNote()
            loggedUserPermissions.value = []
        }
        catch (error) {
            console.log(error)
            toastr.error("Could not delete note.")
        }
    }

    function completeTask(id) {
        notesStore.completeTask(id)
    }
 
    async function toggleNoteBoxPrivacy(id) {
        notesStore.togglePrivacy(id)
    }

    function startEditing() {
        editing.value = true
    }

    async function saveChanges(editedNote) {
        console.log(24)
        try {
            const response = await editNote(editedNote.id, editedNote.title, editedNote.content)
            console.log(response.data)
            requestToGetNote()
            editing.value = false
        }
        catch (error) {
            toastr.error('Could not save changes to note')

        }
    }

    function cancelEdit() {
        editing.value = false
    }
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <div v-if="note !== undefined && note !== null" class="flex">
                <NoteBox class="mx-40 my-60 w-1/2" :note="note" :logged-user-permissions="loggedUserPermissions" :editing="editing"
                    @allow-edit="startEditing" @delete-note="requestToDeleteNote" @cancel-edit="cancelEdit"
                    @save-changes="saveChanges" @complete-task="completeTask" @toggle-note-box-privacy="toggleNoteBoxPrivacy"
                />
                <NoteMenu v-if="loggedUserPermissions !== null && loggedUserPermissions.length !== 0" class="w-1/3" :id="note.id" :editing="editing"
                    @allow-edit="startEditing" @delete-note="requestToDeleteNote" @cancel-edit="cancelEdit"
                />
            </div>
        </NuxtLayout>
    </div>
</template>