<script setup>
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from "~~/store/UserStore"

    const notesStore = useNotesStore()
    const userStore = useUserStore()

    const username = computed(() => userStore.username)
    let title = ref(null)
    let content = ref(null)
    let deadline = ref(null)
</script>

<template>
    <div id="note" class="inline-block w-1/4 h-fit bg-gray-900 rounded-3xl p-8 m-6 shadow-lg">
        <div class="block">
            <input v-model="title" type="text" placeholder="Title"
                class="flex w-3/4 mx-auto my-6 break-words font-frank text-lg text-center focus:appearance-none focus:outline-none rounded-xl shadow-md bg-gray-700 border-gray-800 text-gray-200 p-2"
            >

            <textarea v-model="content" type="text" placeholder="Content"
                class="mx-auto mb-6 h-1/2 flex border border-gray-800 w-3/4 tracking-wide text-md text-gray-300 focus:appearance-none focus:outline-none rounded-xl shadow-md bg-gray-700 border-gray-800 p-4 resize-none"
            />

            <div class="flex mx-auto text-center justify-center">
                <label v-if="(deadline===null)" for="deadline" class="w-1/3">deadline: optional</label>
                <button v-if="(deadline!==null)" class="w-1/3 rounded-lg bg-gray-700 text-violet-400 p-1 h-min mx-3 text-sm hover:bg-gray-800 hover:text-indigo-500 duration-500"
                     @click="(deadline=null)">remove deadline</button>
                <input type="datetime-local" v-model="deadline" id="deadline"
                    class="mb-6 h-1/6 flex border border-gray-800 w-1/2 tracking-wide text-md text-gray-300 focus:appearance-none focus:outline-none rounded-xl shadow-md bg-gray-700 border-gray-800 p-2"/>
            </div>
            <button @click="notesStore.addNote(username, title, content, deadline)"
                class="flex mx-auto bg-violet-900 text-gray-900 p-3 rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500"
            >
                Add to notes
            </button>
        </div>
    </div>
</template>