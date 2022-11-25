<script setup>
    import { useUserStore } from '~~/store/UserStore'

    const userStore = useUserStore()
    const username = ref(null)
    const password = ref(null)
    const name = ref(null)
    const age = ref(null)
    const address = ref(null)

</script>

<template>
    <div class="w-full h-full fixed bg-gray-800 text-indigo-900 pattern-grid-lg">

        <div class="w-1/3 p-12 h-fit mx-auto mt-12 bg-gray-900 rounded-xl shadow-2xl">
            <div class="w-full text-center my-12">
                <p class="p-4 text-xl text-violet-800">Create your <span class="font-light duration-300 hover:text-blue-700">Nevernote</span> account</p>
            </div>

            <div class="w-3/4 mx-auto">
                <div class="relative mx-auto z-0 my-8">
                    <input v-model="name" type="text" id="name" class="block py-2.5 px-2 w-2/3 text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto py-4" placeholder=" " />
                    <label for="name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-36 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Name</label>
                </div>
<!-- 
                <div :class="{ error: v$.age.$errors.length }" class="relative mx-auto z-0 my-8">
                    <input v-model="v$.age.$model" type="number" id="age" class="block py-2.5 px-0 w-1/3 text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto py-4" placeholder=" " />
                    <label for="age" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-36 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Age</label>
                    <div class="" v-for="(error, index) in v$.age.$errors" :key="index">
                        <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">!</span> {{ error.$message }} </p>    
                    </div>
                </div> -->

                <div class="relative mx-auto z-0 my-8">
                    <input v-model="age" type="number" id="age" class="block py-2.5 px-0 w-1/3 text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto py-4" placeholder=" " />
                    <label for="age" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-36 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Age</label>
                </div>
                
                <div class="relative mx-auto z-0 my-8">
                    <input v-model="address" type="text" id="adress" class="block py-2.5 px-2 w-2/3 text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto py-4" placeholder=" " />
                    <label for="address" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-36 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Adress</label>
                </div>

                <div class="relative mx-auto z-0 my-8">
                    <input v-model="username" type="text" id="username" class="block py-2.5 px-2 w-2/3 text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto py-4" placeholder=" " />
                    <label for="username" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-36 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">username</label>
                    <!-- <div class="" v-for="(error, index) in v$.username.$errors" :key="index">
                        <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">!</span> {{ error.$message }} </p>    
                    </div> -->
                </div>  

                <div class="relative mx-auto z-0 my-8">
                    <input v-model="password" type="password" id="password" class="block py-2.5 px-2 w-2/3 text-sm text-gray-900 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto py-4" placeholder=" " />
                    <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-3 -z-10 origin-[0] peer-focus:left-36 peer-focus:text-violet-600 peer-focus:dark:text-violet-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">password</label>
                    <!-- <div class="" v-for="(error, index) in v$.password.$errors" :key="index">
                        <p id="outlined_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">!</span> {{ error.$message }} </p>    
                    </div> -->
                </div>

            </div>
            
            <div class="mx-auto flex z-0 mt-12 mb-4">
                <button @click="userStore.register({username, password, name, age, address})" class="mx-auto w-1/4 bg-violet-900 text-gray-900 p-3 font-[500] rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500">
                    Sign up
                </button>   
            </div>

            <div class="mx-auto flex z-0 mt-8 mb-4">
                <NuxtLink to="/" class="mx-auto bg-transparent text-gray-400 p-3 hover:text-gray-200 duration-300 focus:outline-none">
                    I already have an account
                </NuxtLink>
            </div>
        </div>

        <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
    </div>
</template>