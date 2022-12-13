<script setup>
    import { ref, computed, onBeforeMount, onMounted } from 'vue'
    import { LSGetLogged } from '~~/js/localStorage'
    import { useNotesStore } from '~~/store/NotesStore'

    let notesStore = useNotesStore()

    const props = defineProps({
        note: Object
    })

    let editable = ref(props.note.username === LSGetLogged())
    
    let newTitle = ref("")
    let newContent = ref("")
    let newDeadline = ref(null)

    function allowEdit() {
        if (editable.value) {
            newTitle.value = props.note.title
            newContent.value = props.note.content
            newDeadline.value = props.note.deadline
            notesStore.fillEditing()
            notesStore.editing.set(props.note.id, true)
        }
    }

    function saveChanges(id, date) {
        let editedNote = {
            id,
            title: newTitle.value,
            content: newContent.value,
            deadline: newDeadline.value,
            date
        }
        notesStore.editing.set(editedNote.id, false)
        notesStore.editNote(editedNote)
    }

    function cancelEdit(id) {
        notesStore.editing.set(id, false)
    }

    function completeTask(id) {
        if (editable.value) {
            notesStore.completeTask(id)
        }
    }

    function togglePrivacy(id) {
        if (editable.value) {
            notesStore.togglePrivacy(id)
        }
    }
</script>

<template>
    <div v-if="(note != undefined && note != null)" v-bind:id="'note' + note.id" class="inline-block w-1/4 bg-gray-900 rounded-3xl p-8 m-6 shadow-lg">
        <!-- Side menu -->
        <div>
            <div class="relative w-fit float-right">
                <button v-if="editable" @click="notesStore.deleteNote(note.id)"
                    class="flex p-0 m-0 mr-1 bg-transparent text-rose-600 duration-700 hover:text-red-900 float-right border-0 text-sm focus:outline-0 focus:border-0"
                    >
                    x 
                </button>
                <br />
                <button @click="togglePrivacy(note.id)"
                    class="flex p-0 m-0 mt-1 bg-transparent text-fuchsia-800 duration-700 hover:text-violet-900 float-right border-0 text-sm focus:outline-0 focus:border-0"
                    >
                    <i v-if="note.privacy === 'PRIVATE'" class="fa fa-lock" aria-hidden="true"></i>
                    <i v-if="note.privacy === 'PUBLIC'" class="fa fa-unlock" aria-hidden="true"></i>
                </button>
                <br />
                <button v-if="editable" @click="allowEdit(note.id, note.title, note.content)" class="flex p-0 m-0 mt-2 bg-transparent float-right border-0 text-sm focus:outline-0 focus:border-0">
                    <i class="fa fa-pencil stroke-1 hover:stroke-2 duration-500 text-fuchsia-900 hover:text-violet-900"></i>
                </button>
            </div>
            <div class="relative w-fit float-left">
                <button @click="completeTask(note.id)" v-if="(note.deadline !== undefined && note.deadline !== null)" class="bg-gray-700 rounded-full float-right mt-2 w-5 h-5 text-center hover:bg-gray-600 duration-300 focus:outline-0 focus:border-0">
                    <i v-if="note.completed" class="fa fa-check text-xs text-indigo-300 bold p-1 align-middle" aria-hidden="true"></i>
                </button>
            </div>
        </div>
        <!-- Note info -->
        <div v-if="!editable || (notesStore !== null && !notesStore.editing.get(note.id))" @click="$emit('showNote', note.id)" 
        v-bind:id="'notebox'+note.id" class="h-full">
            <h3 v-if="(note.title !== undefined)" class="py-4 break-words font-frank text-center text-gray-400">
                {{ note.title }}  
            </h3>
            <p v-if="(note.date !== undefined)" class="pb-2 text-xs float-left italic font-josefin-slab text-violet-800 flex w-full ml-0 mb-2">
                {{ note.date }}
            </p>
            <div v-if="(note.deadline !== undefined && note.deadline !== null && note.deadline.length > 0)">
                <p class="pb-2 text-sm float-left italic text-violet-800 flex w-full ml-0 mb-2">
                    Deadline: {{ note.deadline }}
                </p>
            </div>
            <p v-if="(note.content !== undefined)" class="break-words text-left text-gray-400 w-full align-middle line-clamp overflow-hidden"> 
                {{ note.content }}
            </p>
        </div>

        <!-- Edit box -->
        <div v-if="editable && notesStore !== null && notesStore.editing.get(note.id)" v-bind:id="'editbox'+note.id" >
            <input v-model="newTitle" type="text" placeholder="Title" class="break-words mx-auto font-frank rounded-md text-md text-gray-300 text-center py-2 my-2 bg-gray-700 focus:outline-none">
            <textarea v-model="newContent" class="mx-auto flex rounded-md w-full tracking-wide text-sm italic text-gray-200 p-3 bg-gray-700 focus:outline-none" type="text" placeholder="Content"></textarea>
            
            <button @click="saveChanges(note.id, note.date)" class="button mt-4 mb-4 bg-indigo-800 rounded-xl px-4 py-2 mx-auto flex text-gray-300">
                Save changes
            </button>
            <button @click="cancelEdit(note.id)" class="button mt-4 mb-4 bg-indigo-800 rounded-xl px-4 py-2 mx-auto flex text-gray-300">
                Cancel
            </button>
        </div>
    </div>
</template>

<style>
    .line-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;  
    }
</style>
