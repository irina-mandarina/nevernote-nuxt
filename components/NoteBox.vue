<script setup>
    import { ref } from 'vue'
    import { LSGetLogged } from '~~/js/localStorage'
    import { useNotesStore } from '~~/store/NotesStore'

    let notesStore = useNotesStore()

    const props = defineProps({
        note: Object,
        loggedUserPermissions: Array,
        editing: Boolean
    })

    // let editable = ref(props.note.username === LSGetLogged())
    let displayNoteMenu = ref(false)
    let newTitle = ref(props.note.title)
    let newContent = ref(props.note.content)
    let newDeadline = ref(props.note.deadline)
</script>

<template>
    <div v-if="(note != undefined && note != null)" v-bind:id="'note' + note.id" class="inline-block w-1/4 bg-gray-900 rounded-3xl p-8 m-6 shadow-lg">
        <!-- Side menu -->
        <div v-if="loggedUserPermissions.includes('PUT')">
            <div class="relative w-fit float-right">
                <NuxtLink :to="'/notes/' + note.id"
                    class="flex p-0 m-0 mr-1 bg-transparent text-fuchsia-600 duration-700 hover:text-fuchsia-900 float-right border-0 text-sm focus:outline-0 focus:border-0">
                    ... 
                </NuxtLink>
                <br />
                <button @click="$emit('toggleNoteBoxPrivacy', note.id)"
                    class="flex p-0 m-0 mt-1 bg-transparent text-fuchsia-800 duration-700 hover:text-fuchsia-900 float-right border-0 text-sm focus:outline-0 focus:border-0"
                    >
                    <i v-if="note.privacy === 'PRIVATE'" class="fa fa-lock" aria-hidden="true"></i>
                    <i v-if="note.privacy === 'PUBLIC'" class="fa fa-unlock" aria-hidden="true"></i>
                </button>
                <br />
                <button @click="$emit('allowEdit', note.id)"
                    class="flex p-0 m-0 mt-2 bg-transparent float-right border-0 text-sm focus:outline-0 focus:border-0">
                    <i class="fa fa-pencil stroke-1 hover:stroke-2 duration-500 text-fuchsia-900 hover:text-violet-900"></i>
                </button>
            </div>
            <div class="relative w-fit float-left">
                <button @click="$emit('completeTask', note.id)" v-if="(note.deadline !== undefined && note.deadline !== null)" 
                    class="bg-gray-700 rounded-full float-right mt-2 w-5 h-5 text-center hover:bg-gray-600 duration-300 focus:outline-0 focus:border-0">
                    <i v-if="note.completed" class="fa fa-check text-xs text-indigo-300 bold p-1 align-middle" aria-hidden="true"></i>
                </button>
            </div>
        </div>

        <!-- Note info -->
        <div v-if="!loggedUserPermissions.includes('PUT') || (!editing)" @click="$emit('showNote', note.id)" 
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
        <div v-if="loggedUserPermissions.includes('PUT') && editing" v-bind:id="'editbox'+note.id" >
            <input v-model="newTitle" type="text" placeholder="Title"
                class="break-words mx-auto font-frank rounded-md text-md text-gray-300 text-center py-2 my-2 bg-gray-700 focus:outline-none">
            <textarea v-model="newContent" type="text" placeholder="Content"
                class="mx-auto flex rounded-md w-full tracking-wide text-sm italic text-gray-200 p-3 bg-gray-700 focus:outline-none">
            </textarea>
            
            <button @click="$emit('saveChanges', {id: note.id, content: newContent, title: newTitle})"
                class="button mt-4 mb-4 bg-indigo-800 rounded-xl px-4 py-2 mx-auto flex text-gray-300">
                Save changes
            </button>
            <button @click="$emit('cancelEdit', note.id)" class="button mt-4 mb-4 bg-indigo-800 rounded-xl px-4 py-2 mx-auto flex text-gray-300">
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
