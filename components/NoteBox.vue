<script setup>
    import { ref, computed } from 'vue'
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from '~~/store/UserStore'

    const notesStore = useNotesStore()
    const userStore = useUserStore()
    const username = computed(() => userStore.username).value

    let newTitle = ref("")
    let newContent = ref("")
    let newDeadline = ref(null)

    defineProps({
        id: Number,
        title: String,
        content: String,
        date: String,
        deadline: String,
        completed: Boolean
    })


    function allowEdit(id, title, content) {
        newTitle.value = title
        newContent.value = content
        newDeadline.value = deadline
        notesStore.fillEditing()
        notesStore.editing.set(id, true)
    }

    function saveChanges(id, date) {
        let editedNote = {
            id,
            title: newTitle.value,
            content: newContent.value,
            deadline: newDeadline.value,
            date
        }
        // console.log(editedNote)
        notesStore.editing.set(editedNote.id, false)
        notesStore.editNote(username, editedNote)
    }

    function cancelEdit(id) {
        notesStore.editing.set(id, false)
    }
</script>

<template>
    <div v-bind:id="'note' + id" class="inline-block w-1/4 bg-gray-900 rounded-3xl p-8 m-6 shadow-lg">
        <!-- Side menu -->
        <div class="relative w-fit float-right">
            <button @click="notesStore.deleteNote(id, username)"
                class="flex p-0 m-0 bg-transparent text-rose-600 duration-700 hover:text-red-900 float-right border-0 text-sm focus:outline-0 focus:border-0"
                >
                x
            </button>
            <br />
            <button @click="allowEdit(id, title, content)" class="flex p-0 m-0 mt-2 bg-transparent float-right border-0 text-sm focus:outline-0 focus:border-0">
                <i class="fa fa-pencil stroke-1 hover:stroke-2 duration-500 text-fuchsia-900 hover:text-violet-900"></i>
            </button>
            <br />
            <button @click="notesStore.completeTask(username, id)" v-if="(deadline !== undefined)" class="bg-gray-500 rounded-full float-right mt-2 w-5 h-5 text-center hover:bg-gray-600 duration-300 focus:outline-0 focus:border-0">
                <i v-if="completed" class="fa fa-check text-xs p-1" aria-hidden="true"></i>
            </button>
        </div>

        <!-- Note info -->
        <div v-if="!notesStore.editing.get(id)" @click="$emit('showNote', id)" v-bind:id="'notebox'+id" class="h-full">
            <h3 class="py-4 break-words font-frank text-center text-gray-400">  {{ title }}  </h3>
            <p class="pb-2 text-xs float-left italic font-josefin-slab text-violet-800 flex w-full ml-0 mb-2">
                {{ date }}
            </p>
            <div v-if="(deadline !== null && deadline !== undefined && deadline.length > 0)">
                <p class="pb-2 text-sm float-left italic text-violet-800 flex w-full ml-0 mb-2">
                    Deadline: {{ deadline }}
                </p>
            </div>
            <p class="break-words text-left text-gray-400 w-full align-middle line-clamp overflow-hidden"> 
                {{ content }}
            </p>
        </div>

        <!-- Edit box -->
        <div v-if="notesStore.editing.get(id)" v-bind:id="'editbox'+id" >
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

<style>
    .line-clamp {
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical;  
    }

</style>
