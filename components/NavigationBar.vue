<script setup>
    import { useNotesStore } from '~~/store/NotesStore'
    import { useUserStore } from '~~/store/UserStore'

    const notesStore = useNotesStore()
    const userStore = useUserStore()
    let showNotesMenu = ref(false)
    let showTasksMenu = ref(false)
    let openMenu = ref(false)
    
    let showNav = ref(true)
    let lastKnownScrollPosition = 0
    let currentScrollPosition = 0
    
    function navigate(noteType) {
        notesStore.setNoteType(noteType)
        navigateTo("/notes")
    }

    function toggleMenu() {
        if (!openMenu.value) {
            showNotesMenu.value = false
            showTasksMenu.value = false
        }
        openMenu.value = !openMenu.value
    }

    onMounted(() => {
        document.addEventListener("scroll", (event) => {
            currentScrollPosition = window.scrollY
            if (currentScrollPosition > 600) {
                showNav.value = false
                openMenu.value = false
            }
            if (currentScrollPosition < lastKnownScrollPosition) {
                // scrolling up
                showNav.value = true
            }
            else {
                showNav.value = false
                openMenu.value = false
            }
            lastKnownScrollPosition = window.scrollY
        })
    })
    
</script>
<template>
    <nav class="fixed z-50 duration-200" :class="{
            'translate-y-0': showNav,
            '-translate-y-full': !showNav
        }">
        <div @click="toggleMenu()" class="p-2">
            <i class="py-2 px-3 bg-gray-600/[0.75] rounded-lg fa fa-solid fa-bars text-gray-300 hover:text-gray-500 duration-300 text-3xl"/>
        </div>
        <ul class="text-gray-300 duration-300 text-xl p-4 menu-ul" :class="{open: openMenu}">
            <li>
                <span class="px-2 hover:text-gray-500 duration-300" @click="navigate('ALL')">
                    All notes
                </span>
                <span class="px-2 hover:text-gray-500 duration-300">
                    <i @click="showNotesMenu = !showNotesMenu" class="fa fa-solid fa-chevron-down"/>    
                </span>
            </li>

            <li>
                <Transition>
                    <span v-if="showNotesMenu"
                        class="px-4 hover:text-gray-500 duration-300" @click="navigate('NOTES')">
                        Notes
                    </span>
                </Transition>
            </li>

            <li>
                <Transition>
                    <span v-if="showNotesMenu">
                        <span class="px-4 hover:text-gray-500 duration-300" @click="navigate('TASKS')">
                            Tasks
                        </span>
                        <span class="px-2 hover:text-gray-500 duration-300">
                            <i @click="showTasksMenu = !showTasksMenu" class="fa fa-solid fa-chevron-down"/>    
                        </span>
                    </span> 
                </Transition>
            </li>

            <li>
                <Transition>
                    <span v-if="showTasksMenu" class="px-6 hover:text-gray-500 duration-300 tasks-menu" @click="navigate('TODO')">
                        To do
                    </span>
                </Transition>
            </li>

            <li>
                <Transition>
                    <span v-if="showTasksMenu" class="px-6 hover:text-gray-500 duration-300 tasks-menu" @click="navigate('COMPLETED')">
                        Completed
                    </span>
                </Transition>
            </li>

            <li>
                <NuxtLink to="/profile" class="px-2 hover:text-gray-500 duration-300">
                    My profile
                </NuxtLink>
            </li>

            <li>
                <NuxtLink to="/history" class="px-2 hover:text-gray-500 duration-300">
                    History
                </NuxtLink>
            </li>

            <li v-if="userStore.roles.includes('ADMIN')">
                <NuxtLink to="/roles" class="px-2 hover:text-gray-500 duration-300">
                    Manage roles
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style>
.menu-ul:not(.open) {
    transform: translate(-100%);
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* .all-notes-menu {
    visibility: visible;
    opacity: 1;
    transition: all 0.5s linear;
} */

/* .all-notes-menu:not(.open) {
    transform: translateX(-100%);
    transition: all 1s linear;
}

.all-notes-menu:has(.open) {
    transform: translateX(1%);
    transition: all 1s linear;
} */
</style>