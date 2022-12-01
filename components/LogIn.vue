<script setup>
    import { ref } from 'vue'
    import { useUserStore } from "~~/store/UserStore"

    const userStore = useUserStore()
    let username = ref(null)
    let password = ref(null)

    async function logIn() {
        if (await userStore.requestLogIn(username.value, password.value)) {
            navigateTo("/notes")
        }
    }
</script>
<template>
    <div class="w-full h-full fixed bg-gray-800 text-indigo-900 pattern-grid-lg">

        <div class="w-1/3 p-12 h-fit mx-auto mt-32 bg-gray-900 rounded-xl shadow-2xl">
            <div class="w-full text-center my-12">
                <p class="p-4 text-xl text-violet-800">Log into your <span class="font-light duration-300 hover:text-blue-700">Nevernote</span> account</p>
            </div>
            <div class="relative mx-auto z-0 my-8">
                <input v-model="username" id="username" type="text" class="block py-2.5 px-0 w-2/3 text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto py-4 duration-500 hover:border-gray-200" placeholder=" " />
                <label for="username" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-36 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">username</label>
                <!-- <div class="" v-for="(error, index) in v$.username.$errors" :key="index">
                    <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">!</span> {{ error.$message }} </p>    
                </div> -->
            </div>  
        
            <div class="relative mx-auto z-0 my-8">
                <input v-model="password" id="password" type="password" class="block py-2.5 px-0 w-2/3 text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto py-4 duration-500 hover:border-gray-200" placeholder=" " />
                <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-36 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">password</label>
                <!-- <div class="" v-for="(error, index) in v$.password.$errors" :key="index">
                    <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">!</span> {{ error.$message }} </p>    
                </div> -->
            </div>

            <div class="mx-auto flex z-0 mt-12 mb-4">
                <button @click="logIn()" class="mx-auto w-1/4 bg-violet-900 text-gray-900 p-3 font-[500] rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500">
                    <NuxtLink to="/notes"> Log in </NuxtLink>
                </button>   
            </div>

            <div class="mx-auto flex z-0 mt-8 mb-4">
                <NuxtLink to="/signup" class="mx-auto bg-transparent text-gray-400 p-3 hover:text-gray-200 duration-300 focus:outline-none">
                    I don't have an account yet
                </NuxtLink>
            </div>
        </div>

        <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
    </div>
</template>