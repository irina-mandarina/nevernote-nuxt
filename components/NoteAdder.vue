<script setup>
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from "~~/store/UserStore"

    const notesStore = useNotesStore()
    const userStore = useUserStore()

    const username = computed(() => userStore.username)
    let title = ref(null)
    let content = ref(null)
    let deadline = ref(null)
    let privacy = ref("PRIVATE")
    let showPopup = ref(false)

    async function togglePrivacy() {
        showPopup.value = true
        if (privacy.value === "PRIVATE") {
            privacy.value = "PUBLIC"
        }
        else {
            privacy.value = "PRIVATE"
        }
        // var now = new Date().getTime();
        // while(new Date().getTime() < now + 20) {
        //     console.log(showPopup.value)
        // }
        setTimeout(showPopup.value = false, 10000)
        
    }   
</script>

<template>
    <div id="note" class="inline-block w-1/4 h-fit bg-gray-900 rounded-3xl p-8 m-6 shadow-lg">
        <div class="relative w-fit float-right">
            <button @click="togglePrivacy()"
                class="flex p-0 m-0 bg-transparent text-violet-600 duration-700 hover:text-violet-900 float-right border-0 text-sm focus:outline-0 focus:border-0"
                >
                <i v-if="privacy === 'PRIVATE'" class="fa fa-lock" aria-hidden="true"></i>
                <i v-if="privacy === 'PUBLIC'" class="fa fa-unlock" aria-hidden="true"></i>
                <span v-if="showPopup" class="absolute bg-gray-700 w-fit whitespace-nowrap text-gray-300 rounded-lg p-2 translate-x-4 duration-300">
                    Note is {{ privacy }}
                </span>
            </button>
        </div>

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
            <button @click="notesStore.addNote(title, content, deadline, privacy)"
                class="flex mx-auto bg-violet-900 text-gray-900 p-3 rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500"
            >
                Add to notes
            </button>
        </div>
    </div>
</template>