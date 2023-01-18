<script setup>
    let searchParams = ref('')

    let date = ref(new Date())
    let username = ref('alex')
    let orderByDateDesc = ref(true)
    let filterByMethod = ref(false)
    let filterByDate = ref(false)
    let filterByUsername = ref(false)
    let filterByNote= ref(false)

    function searchByUsername() {
        searchParams.value += 'username:' + user.value + ','
    }
    
    let showNav = ref(true)
    let lastKnownScrollPosition = 0
    let currentScrollPosition = 0

    onMounted(() => {
        document.addEventListener("scroll", (event) => {
            currentScrollPosition = window.scrollY
            if (currentScrollPosition > 500) {
                showNav.value = false
            }
            if (currentScrollPosition < lastKnownScrollPosition) {
                // scrolling up
                showNav.value = true
            }
            else {
                showNav.value = false
            }
            lastKnownScrollPosition = window.scrollY
        })
    })
</script>
<template>
    <div class="w-full fixed mx-auto bg-transparent duration-300" :class="{
            'translate-y-0': showNav,
            '-translate-y-full': !showNav
        }">
        <nav class="bg-gray-900 w-3/5 mx-auto p-2 flex rounded-b-lg relative text-center text-violet-500 justify-center">
            <ul class="flex w-2/3 justify-evenly">
                <span class="text-violet-400 font-serif tracking-wide">
                    Filter by: 
                </span>
                <li class="px-4" @click="searchByUsername()">
                    <span class="w-2/3">
                        <input type="checkbox" v-model="filterByUsername" class="p-2 mx-2" />
                        user
                    </span>
                    <input :class="{
                        'opacity-0': !filterByUsername,
                        'disabled': !filterByUsername,
                        'opacity-1': filterByUsername
                        }"
                        class="bg-gray-600 rounded-full border-b-2 w-2/3 border-violet-700 focus:outline-none px-2"/>
                </li>
                <li class="px-4">
                    <span class="w-full">
                        <input type="checkbox" v-model="filterByDate" class="p-2 mx-2" />
                        date
                    </span>
                    <div :class="{
                            'opacity-0': !filterByDate,
                            'disabled': !filterByDate,
                            'opacity-1': filterByDate
                        }">
                        <input type="date"
                        class="bg-gray-600 rounded-full border-b-2 w-1/3 border-violet-700 focus:outline-none px-2"/>
                        -
                        <input type="date"
                        class="bg-gray-600 rounded-full border-b-2 w-1/3 border-violet-700 focus:outline-none px-2"/>
                    </div>
                    
                </li>
                <li class="px-4 relative">
                    <span class="w-2/3">
                        <input type="checkbox" v-model="filterByMethod" class="p-2 mx-2" />
                        method
                    </span>
                    <div :class="{
                        'opacity-0': !filterByMethod,
                        'disabled': !filterByMethod,
                        'opacity-1': filterByMethod
                        }"
                        class="absolute">
                        <ul class="overflow-hidden bg-gray-800 rounded-md">
                            <li class="p-2 hover:text-violet-400 duration-300 hover:bg-slate-900 border-b border-gray-700">
                                GET
                            </li>
                            <li class="p-2 hover:text-violet-400 duration-300 hover:bg-slate-900 border-b border-gray-700">
                                POST
                            </li>
                            <li class="p-2 hover:text-violet-400 duration-300 hover:bg-slate-900 border-b border-gray-700">
                                PUT
                            </li>
                            <li class="p-2 hover:text-violet-400 duration-300 hover:bg-slate-900 border-b border-gray-700">
                                DELETE
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="px-4">
                    <span class="w-2/3">
                        <input type="checkbox" class="p-2 mx-2" />
                        note
                    </span>
                    <input :class="{
                        'opacity-0': !filterByNote,
                        'opacity-1': filterByNote
                    }"
                    type="number" class="bg-gray-600 appearance-none rounded-full border-b-2 w-2/3 border-violet-700 focus:outline-none px-2"/>
                </li>
            </ul>

            <ul class="flex w-1/6 py-4">
                <span class="text-violet-400 font-serif tracking-wide">
                    Sort by: 
                </span>
                <li class="px-2" @click="orderByDateDesc = !orderByDateDesc">
                    date
                    <i class="fa fa-arrow-up" v-if="!orderByDateDesc" />
                    <i class="fa fa-arrow-down" v-else />
                </li>
            </ul>

            <button class="w-1/12 p-3 bg-gray-800 rounded-full float-right focus:outline-none hover:text-violet-400 duration-300" @click="$emit('search', searchParams, orderByDateDesc)">
                <i class="fa-solid fa-magnifying-glass" />
            </button>
        </nav>
    </div>
</template>