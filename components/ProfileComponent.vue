<script setup>
    import { onMounted, ref, computed } from 'vue'
    import { useUserStore } from "~~/store/UserStore"

    const userStore = useUserStore()
    
    const username = computed(() => userStore.username)
    const name = computed(() => userStore.name)
    const age = computed(() => userStore.age)
    const address = computed(() => userStore.address)
    const bio = computed(() => userStore.bio)
    let newBio = ref(null)

    onMounted(() => {
        userStore.getUserDetails(username.value)
    })

    function editBio() {
        document.querySelector("#editbox").classList.remove("hidden")
        document.querySelector("#editbox").classList.add("block")
        
        document.querySelector("#biobox").classList.remove("block")
        document.querySelector("#biobox").classList.add("hidden")
        document.querySelector("#editbiobtn").classList.remove("block")
        document.querySelector("#editbiobtn").classList.add("hidden")
        document.querySelector("#savebiobtn").classList.remove("hidden")
        document.querySelector("#savebiobtn").classList.add("block")
    }
    function saveChanges() {
        document.querySelector("#editbox").classList.add("hidden")
        document.querySelector("#editbox").classList.remove("block")
        document.querySelector("#biobox").classList.add("block")
        document.querySelector("#biobox").classList.remove("hidden")
        document.querySelector("#editbiobtn").classList.remove("hidden")
        document.querySelector("#editbiobtn").classList.add("block")
        
        document.querySelector("#savebiobtn").classList.remove("block")
        document.querySelector("#savebiobtn").classList.add("hidden")
        userStore.editBio(username.value, newBio.value)
    }
    
</script>

<template>
    <div class="w-full h-full bg-gray-800 text-indigo-900 pattern-grid-lg p-10">
        <div class="w-1/3 p-8 h-fit mx-auto bg-gray-900 rounded-xl shadow-2xl text-center">
            <div class="w-full text-center my-6">
                <p class="p-2 text-xl text-violet-800">Hello, <span class="font-light duration-300 hover:text-blue-700">  {{ name }} </span>!</p>
            </div>
            
            <img class="mx-auto my-4 w-1/2" src="https://picsum.photos/400"/>
        
            <div class="relative mx-auto z-0 my-8">
                <p class="text-center block py-2 w-2/3 text-md font-light dark:text-gray-400 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-gray-200 dark:border-violet-900 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto cursor-default">
                    {{ username }}
                </p>
            </div>

            <p id="biobox" class="flex w-5/6 text-center block text-serif font-weight-300 mx-auto break-words p-4"> {{ bio }} </p>
            <textarea v-model="newBio" id="editbox" class="hidden mx-auto flex rounded-md w-3/4 tracking-wide text-sm text-gray-400 px-2" type="text" placeholder="Bio"></textarea>
            <button @click="editBio()" id="editbiobtn" class="block my-4 mx-auto bg-[#4310c49d] text-gray-900 p-3 font-[500] rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500">Change bio</button>
            <button @click="saveChanges()" id="savebiobtn" class="hidden my-4 mx-auto bg-violet-900 text-gray-900 p-3 font-[500] rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500">Save changes</button>

            
            <button @click="userStore.logOut(username)" class="my-6 flex mx-auto mx-auto bg-violet-900 text-gray-900 p-3 font-[500] rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500">Log out</button>

        </div>
        
        <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
    </div>
</template>