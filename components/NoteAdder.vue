<script setup>
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from "~~/store/UserStore"

    const notesStore = useNotesStore()
    const userStore = useUserStore()

    const username = computed(() => userStore.username)
    let title = ref(null)
    let content = ref(null)
</script>

<template>
    <div id="note" class="inline-block w-1/4 h-fit bg-gray-900 rounded-3xl p-8 m-6 shadow-lg">

        <div class="block">
            <input v-model="title" type="text" placeholder="Title"
                class="flex mx-auto my-6 break-words font-serif text-md text-center focus:appearance-none focus:outline-none rounded-xl shadow-xl bg-gray-700 border-gray-800 text-gray-200 p-2"
            >

            <textarea v-model="content" type="text" placeholder="Content"
                class="mx-auto mb-8 h-1/2 flex border border-gray-800 w-3/4 tracking-wide text-md italic text-gray-300 focus:appearance-none focus:outline-none rounded-xl shadow-xl bg-gray-700 border-gray-800 p-4"
            />
            <button @click="notesStore.addNote(username, title, content)"
                class="flex mx-auto bg-violet-900 text-gray-900 p-3 rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500"
            >
                Add to notes
            </button>
        </div>
    </div>
</template>