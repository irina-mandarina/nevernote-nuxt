<script setup>
    import { computed } from 'vue'
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from '~~/store/UserStore'

    const emit = defineEmits(['closeNote']);

    const notesStore = useNotesStore()
    const userStore = useUserStore()
    const username = computed(() => userStore.username).value
    const id = computed(() => notesStore.bigNoteId).value
    
    let note = computed(() => notesStore.notes.filter((note) => id === note.id)[0])
    console.log(note.value)

    let newTitle = ref(null)
    let newContent = ref(null)
    let editingBigNote = ref(false)

    function allowEdit() {
        console.log(note.value.content)
        newTitle.value = note.value.title
        newContent.value = note.value.content
        notesStore.fillEditing()
        editingBigNote.value = true
    }

    function saveChanges() {
        editingBigNote.value = false

        let editedNote = {
            id,
            title: newTitle.value,
            deadline: note.value.deadline,
            privacy: note.value.privacy,
            content: newContent.value,
            date: note.value.date
        }
        notesStore.editNote(editedNote)
    }

    function cancelEdit() {
        editingBigNote.value = false
    }

    function closeNote() {
        if (editingBigNote.value === true) {
            cancelEdit(id)
        } 
        emit('closeNote', id)
    }
</script>

<template>
    <div :id="'big-note' + id" class="w-1/2 h-fit absolute bg-gray-900 rounded-3xl p-8 mx-auto mt-24 sticky shadow-lg text-white">
        <!-- Side menu -->
        <div>
            <div class="relative w-fit float-right">
                <button @click="closeNote()"
                    class="flex p-0 m-0 mr-1 bg-transparent text-rose-600 duration-700 hover:text-red-900 float-right border-0 text-sm focus:outline-0 focus:border-0"
                    >
                    x 
                </button>
                <br />
                <button @click="notesStore.togglePrivacy()"
                    class="flex p-0 m-0 mt-1 bg-transparent text-fuchsia-800 duration-700 hover:text-violet-900 float-right border-0 text-sm focus:outline-0 focus:border-0"
                    >
                    <i v-if="note.privacy === 'PRIVATE'" class="fa fa-lock" aria-hidden="true"></i>
                    <i v-if="note.privacy === 'PUBLIC'" class="fa fa-unlock" aria-hidden="true"></i>
                </button>
                <br />
                <button @click="allowEdit()" class="flex p-0 m-0 mt-2 bg-transparent float-right border-0 text-sm focus:outline-0 focus:border-0">
                    <i class="fa fa-pencil stroke-1 hover:stroke-2 duration-500 text-fuchsia-900 hover:text-violet-900"></i>
                </button>
            </div>
            <div class="relative w-fit float-left">
                <button @click="notesStore.completeTask(id)" v-if="(note.deadline !== undefined && note.deadline !== null)" class="bg-gray-700 rounded-full float-right mt-2 w-5 h-5 text-center hover:bg-gray-600 duration-300 focus:outline-0 focus:border-0">
                    <i v-if="note.completed" class="fa fa-check text-xs text-indigo-300 bold p-1 align-middle" aria-hidden="true"></i>
                </button>
            </div>
        </div>

        <div v-if="!editingBigNote" :id="'big-notebox'+id" >
            <h3 class="py-4 break-words font-frank text-center text-gray-400">  {{ note.title }}  </h3>
            <p class="pb-2 text-xs float-left italic text-violet-800 flex w-full ml-0 mb-2">
                {{ note.date }}
            </p>
            <p class="break-words text-left text-gray-400 w-full align-middle line-clamp overflow-hidden"> 
                {{ note.content }}
            </p>
        </div>
        
        <div v-if="editingBigNote" v-bind:id="'big-editbox'+id" >
            <input v-model="newTitle" type="text" placeholder="Title" class="break-words mx-auto font-frank rounded-md text-md text-gray-300 text-center py-2 my-2 bg-gray-700 focus:outline-none">
            <textarea v-model="newContent" class="mx-auto flex rounded-md w-full tracking-wide text-sm italic text-gray-200 p-3 bg-gray-700 focus:outline-none" type="text" placeholder="Content"></textarea>
            
            <button @click="saveChanges(id, date)" class="button mt-4 mb-4 bg-indigo-800 rounded-xl px-4 py-2 mx-auto flex text-gray-300">
                Save changes
            </button>
            <button @click="cancelEdit(id)" class="button mt-4 mb-4 bg-indigo-800 rounded-xl px-4 py-2 mx-auto flex text-gray-300">
                Cancel
            </button>
        </div>
    </div> 
</template>