<script setup>
    import { onMounted, computed } from 'vue'
    import { useUserStore } from "~~/store/UserStore"
    import { LSIsLogged, LSGetLogged } from '~~/js/localStorage';

    const userStore = useUserStore()
    const username = computed(() => userStore.username)
    const name = computed(() => userStore.name)

    onMounted(() => {
        if (LSIsLogged()) {
            if (!userStore.logged) {
                userStore.logIn(LSGetLogged())
            }
            userStore.getUserDetails(username.value)
        }
    })
</script>

<template>
    <div class="w-full h-full absolute bg-gray-800 text-indigo-900 pattern-grid-lg p-10">
        <div class="p-8 h-fit mx-auto text-center">
            <div v-if="userStore.server">
                <div v-if="!userStore.logged" class="w-full text-center my-6">
                    <p class="p-2 text-5xl text-gray-100 font-medium font-frank">Welcome to <span class="font-light duration-300 hover:text-gray-300"> Nevernote </span>!</p>
                    <button class="m-24 rounded-md border-gray-400 duration-500 hover:border-violet-600 focus:outline-none text-xl text-gray-400 font-bold font-marmelad border p-4">
                        <NuxtLink to="/login"> Log in </NuxtLink>
                    </button>
                </div>
                <div v-if="userStore.logged" class="w-full text-center my-6">
                    <p class="p-2 text-5xl text-gray-100 font-medium font-frank font-medium">
                        Hello,
                        <span class="font-light duration-300 hover:text-gray-300"> 
                            {{ name }}
                        </span>!
                    </p>
                    <button class="m-24 rounded-md border-gray-400 duration-500 hover:border-violet-600 focus:outline-none text-xl text-gray-400 font-bold font-marmelad border py-4 px-6">
                        <NuxtLink to="/notes"> See your notes </NuxtLink>
                    </button> 
                </div>
            </div>
            
            <div v-if="!userStore.server">
                <p class="p-2 text-5xl text-gray-100 font-medium font-frank">
                    Welcome to
                    <span class="font-light duration-300 hover:text-gray-300">
                        Nevernote
                    </span>
                    !
                </p>
                <p class="text-white text-lg font-200 my-10">Unfortunately the server is not up.</p>
            </div>

        </div>
    </div>
</template>