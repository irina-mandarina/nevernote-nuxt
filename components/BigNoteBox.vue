<script setup>
    import { computed, watch, defineEmits } from 'vue'
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from '~~/store/UserStore'
    const emit = defineEmits(['closeNote']); 

    const notesStore = useNotesStore()
    const userStore = useUserStore()
    const username = computed(() => userStore.username).value
    const id = computed(() => notesStore.bigNoteId)

    let title = ref(null)
    let date = ref(null)
    let content = ref(null)
    let newTitle = ref(null)
    let newContent = ref(null)
    let editing = false

    // watch(id, (newId) => {
    //     console.log(`id is ${newId}`)
    //     if (newId !== undefined && newId !== null) {
    //         let note = notesStore.notes.filter(note => note.id === newId)[0]
    //         title.value = note.title
    //         date.value = note.date
    //         content.value = note.content
    //     }
    // })

    function allowEdit() {
        editing = true
        // newTitle = ref(title.value)
        // console.log(title.value)
        newContent = ref(content.value)
        // document.querySelector("#big-editbox"+id.value).classList.remove("hidden")
        // document.querySelector("#big-editbox"+id.value).classList.add("block")
        // document.querySelector("#big-notebox"+id.value).classList.remove("block")
        // document.querySelector("#big-notebox"+id.value).classList.add("hidden")
    }

    function saveChanges(editedNote) {
        editing = false
        // console.log(("#big-editbox"+id.value))
        // document.querySelector("#big-editbox"+id.value).classList.add("hidden")
        // document.querySelector("#big-editbox"+id.value).classList.remove("block")
        // document.querySelector("#big-notebox"+id.value).classList.add("block")
        // document.querySelector("#big-notebox"+id.value).classList.remove("hidden")
        notesStore.editNote(username, {id: editedNote.id, title: editedNote.title, content: editedNote.content, date: editedNote.date})
    }

    function cancelEdit(id) {
        editing = false
        // document.querySelector("#big-editbox"+id).classList.add("hidden")
        // document.querySelector("#big-editbox"+id).classList.remove("block")
        // document.querySelector("#big-notebox"+id).classList.add("block")
        // document.querySelector("#big-notebox"+id).classList.remove("hidden")
    }

    function closeNote(id) {
        if (editing) {
            cancelEdit(id)

        }
        // this.emit('closeNote', id)
        emit('closeNote', id)
    }
</script>

<template>
    <div :id="'big-note' + id" class="w-1/2 h-fit bg-gray-900 rounded-3xl p-8 mx-auto mt-24 sticky shadow-lg">
        <div class="relative w-fit float-right">
            <button @click="closeNote(id)"
                class="flex p-0 m-0 bg-transparent text-rose-600 duration-700 hover:text-red-900 float-right border-0 text-sm focus:outline-0 focus:border-0"
                >
                <p class="text-xs pt-1 px-2">Close note</p>
                x
            </button>
            <br/>
            <button @click="allowEdit()" class="flex p-0 m-0 mt-2 bg-transparent float-right border-0 text-sm focus:outline-0 focus:border-0">
                <i class="fa fa-pencil stroke-1 hover:stroke-2 duration-500 text-fuchsia-900 hover:text-violet-900"></i>
            </button>
        </div>

        <div :id="'big-notebox'+id" 
            :class="{
                block: !editing,
                hidden: editing
            }" 
        >
            <h3 class="py-4 break-words font-frank text-center text-gray-400">  {{ title }}  </h3>
            <p class="pb-2 text-xs float-left italic text-violet-800 flex w-full ml-0 mb-2">
                {{ date }}
            </p>
            <p class="break-words text-left text-gray-400 w-full align-middle line-clamp overflow-hidden"> 
                {{ content }}
            </p>
        </div>
        
        <div v-bind:id="'big-editbox'+id"
            :class="{
                block: editing,
                hidden: !editing
            }" 
        >
            <input v-model="title" type="text" placeholder="Title" class="break-words mx-auto font-frank rounded-md text-md text-gray-300 text-center py-2 my-2 bg-gray-700 focus:outline-none">
            <textarea v-model="content" class="mx-auto flex rounded-md w-full tracking-wide text-sm italic text-gray-200 p-3 bg-gray-700 focus:outline-none" type="text" placeholder="Content"></textarea>
            
            <button @click="saveChanges({id, title, content, date})" class="button mt-4 mb-4 bg-indigo-800 rounded-xl px-4 py-2 mx-auto flex text-gray-300">
                Save changes
            </button>
            <button @click="cancelEdit(id)" class="button mt-4 mb-4 bg-indigo-800 rounded-xl px-4 py-2 mx-auto flex text-gray-300">
                Cancel
            </button>
        </div>
    </div>
</template>