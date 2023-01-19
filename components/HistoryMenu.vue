<script setup>

    let maxDate = ref(null)
    let minDate = ref(null)
    let username = ref(null)
    let noteId = ref(null)
    let method = ref(null)

    let orderByDateDesc = ref(true)
    let filterByMethod = ref(false)
    let filterByDate = ref(false)
    let filterByUsername = ref(false)
    let filterByNote= ref(false)
    let methodSelector = ref(false)
    
    let showNav = ref(true)
    let lastKnownScrollPosition = 0
    let currentScrollPosition = 0

    let searchParams = ref([])

    const emits = defineEmits([
        'search'
    ])

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

    function search() {
        searchParams.value = ''
        if (filterByUsername.value) {
            searchParams.value += 'username:' + username.value + ','
        }
        if (filterByDate.value) {
            searchParams.value += 'date>' + minDate.value + ',date<' + maxDate.value + ','
        }
        if (filterByMethod.value) {
            searchParams.value += 'method:' + method.value + ','
        }
        if (filterByNote.value) {
            searchParams.value += 'subjectId:' + noteId.value + ',subject:note,'
        }
        console.log(searchParams)
        emits('search', searchParams.value, orderByDateDesc.value)
    }
</script>
<template>
    <div class="w-full fixed mx-auto bg-transparent duration-300" :class="{
            'translate-y-0': showNav,
            '-translate-y-full': !showNav
        }">
        <nav class="bg-gray-900 w-fit max-w-5/6 mx-auto p-4 flex rounded-b-lg relative text-center text-violet-500 justify-center">
            <ul class="flex w-2/3">
                <span class="text-violet-400 whitespace-nowrap font-serif tracking-wide">
                    Filter by: 
                </span>
                <li class="px-4">
                    <span class="w-2/3">
                        <input type="checkbox" v-model="filterByUsername" class="p-2 mx-2" />
                        user
                    </span>
                    <input v-model="username"
                    :class="{
                        'opacity-0': !filterByUsername,
                        'disabled': !filterByUsername,
                        'enabled': filterByUsername,
                        'opacity-1': filterByUsername
                    }"
                    class="bg-transparent rounded-full border-b-2 w-2/3 border-violet-700 focus:outline-none px-2"/>
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
                        <input type="date" v-model="minDate"
                        class="bg-gray-600 rounded-full border-b-2 w-1/3 border-violet-700 focus:outline-none px-2"/>
                        -
                        <input type="date" v-model="maxDate"
                        class="bg-gray-600 rounded-full border-b-2 w-1/3 border-violet-700 focus:outline-none px-2"/>
                    </div>
                    
                </li>
                <li class="px-4 relative">
                    <span class="flex mb-2">
                        <input type="checkbox" v-model="filterByMethod" class="p-2 mx-2" />
                        method
                    </span>
                    <span v-if="filterByMethod && !methodSelector && method !== null"
                    class="p-2 hover:text-violet-400 duration-300 hover:bg-slate-900 rounded-md border border-gray-700"
                    @click="methodSelector = !methodSelector">
                        {{ method }}
                    </span>
                    <div :class="{
                        'opacity-0': !filterByMethod,
                        'disabled': !filterByMethod,
                        'opacity-1': filterByMethod
                        }"
                        class="absolute">
                        <ul v-if="(filterByMethod && method === null) || methodSelector" class="overflow-hidden bg-gray-800 rounded-md" @click="methodSelector = false">
                            <li @click="method = 'GET'" 
                            :class="{
                                'bg-slate-900': method === 'GET'
                            }" 
                            class="p-2 hover:text-violet-400 duration-300 hover:bg-slate-900 border-b border-gray-700">
                                GET
                            </li>
                            <li @click="method = 'POST'" 
                            :class="{
                                'bg-slate-900': method === 'POST'
                            }" 
                            class="p-2 hover:text-violet-400 duration-300 hover:bg-slate-900 border-b border-gray-700">
                                POST
                            </li>
                            <li @click="method = 'PUT'" 
                            :class="{
                                'bg-slate-900': method === 'PUT'
                            }" 
                            class="p-2 hover:text-violet-400 duration-300 hover:bg-slate-900 border-b border-gray-700">
                                PUT
                            </li>
                            <li @click="method = 'DELETE'" 
                            :class="{
                                'bg-slate-900': method === 'DELETE'
                            }" 
                            class="p-2 hover:text-violet-400 duration-300 hover:bg-slate-900 border-b border-gray-700">
                                DELETE
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="px-4">
                    <span class="w-2/3">
                        <input type="checkbox" v-model="filterByNote" class="p-2 mx-2" />
                        note
                    </span>
                    <input :class="{
                        'opacity-0': !filterByNote,
                        'opacity-1': filterByNote
                    }"
                    v-model="noteId"
                    type="number" class="bg-transparent appearance-none rounded-full border-b-2 w-2/3 border-violet-700 focus:outline-none px-2"/>
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

            <button class="w-1/12 p-3 bg-gray-800 rounded-full float-right focus:outline-none hover:text-violet-400 duration-300" @click="search()">
                <i class="fa-solid fa-magnifying-glass" />
            </button>
        </nav>
    </div>
</template>