<script setup>
    import { useNotesStore } from '~~/store/NotesStore'
    const notesStore = useNotesStore()
    let showNotesMenu = ref(false)
    let showTasksMenu = ref(false)
</script>
<template>
    <nav class="w-full top-0 left-0 bg-gray-700 text-indigo-900 pattern-grid-lg">
        <ul class="p-6 text-gray-300 no-underline transition-all duration-300">
            <li class="inline tracking-wider text-gray-300 font-bold font-marmelad text-xl hover:text-gray-400 duration-300 focus:outline-none"
                @mouseenter="showNotesMenu=true" @click="notesStore.setNoteType('ALL')">
                <NuxtLink class="p-6" to="/notes">
                    All Notes  
                    <i class="fa fa-solid fa-chevron-down"/>
                </NuxtLink>
            </li>
            <div id="dropdown-menu" v-if="showNotesMenu" @mouseover="showNotesMenu=true" @mouseleave="(showNotesMenu=false)"
                class="absolute bg-gray-700 rounded-md hover:rounded-md w-36 mt-6">
                <ul class="w-full">
                    <li class="p-2 border-b border-gray-500 w-full h-full hover:bg-gray-800 duration-300" @click="notesStore.setNoteType('NOTES')">
                        <NuxtLink to="/notes">
                            Notes
                        </NuxtLink>
                    </li>
                    <div class="flex">
                        <li @mouseenter="(showTasksMenu=true)" class="py-2 px-2 w-full h-full hover:bg-gray-800 duration-300" @click="notesStore.setNoteType('TASKS')">
                            <NuxtLink to="/notes">
                                Tasks <i class="fa fa-solid fa-chevron-right w-1/6"/>
                            </NuxtLink>
                        </li>
                        <div id="tasks-menu" v-if="showTasksMenu" @mouseover="showTasksMenu=true" @mouseleave="(showTasksMenu=false)"  @click="notesStore.setNoteType('TASKS')"
                            class="absolute bg-gray-700 rounded-md w-36 ml-32 mt-0 divide-y divide-solid divide-white">
                            <ul class="w-full">
                                <li class="p-2 border-b border-gray-500 w-full h-full hover:bg-gray-800 duration-300" @click="notesStore.setNoteType('TODO')">
                                    <NuxtLink to="/notes">
                                        To do
                                    </NuxtLink>
                                </li>
                                <li class="p-2 w-full h-full hover:bg-gray-800 duration-300" @click="notesStore.setNoteType('COMPLETED')">
                                    <NuxtLink to="/notes">
                                        Completed
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </ul>
            </div>
            
            <li class="inline tracking-wider text-gray-300 font-bold font-marmelad text-xl hover:text-gray-400 duration-300 focus:outline-none  ">
                <NuxtLink class="p-6" to="/profile">My profile</NuxtLink>
            </li>
        </ul>
    </nav>
</template>