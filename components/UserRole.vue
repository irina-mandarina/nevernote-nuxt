<script setup>
    const props = defineProps({
        username: String,
        roles: Array,
    })
</script>
<template>
    <div class="shadow-lg rounded-2xl bg-gray-900 text-violet-200 w-1/5 m-4 p-6">
        <div class="text-center hover:text-violet-400 duration-300">
            {{ username }}
        </div>

        <div class="flex">
            <div class="rounded-full py-2 px-3 m-3" :class="{
                'hasRole': roles.includes('USER'),
                'hasntGotRole': !roles.includes('USER')
            }">
                USER
            </div>

            <div v-if="!roles.includes('USER')" @click="$emit('addRole', username, 'USER')" class="rounded-full shadow-lg py-2 px-3 overflow-hidden bg-gray-800 shadow-inner m-3">
                Add role
            </div>
            <div v-if="roles.includes('USER')" @click="$emit('removeRole', username, 'USER')" class="rounded-full shadow-lg py-2 px-3 overflow-hidden bg-gray-800 shadow-inner m-3">
                Remove role
            </div>
        </div>

        <div class="flex">
            <div class="rounded-full py-2 px-3 m-3" :class="{
                'hasRole': roles.includes('ADMIN'),
                'hasntGotRole': !roles.includes('ADMIN')
            }">
                ADMIN
            </div>
            
            <div v-if="!roles.includes('ADMIN')" @click="$emit('addRole', username, 'ADMIN')" class="rounded-full shadow-lg py-2 px-3 overflow-hidden bg-gray-800 shadow-inner m-3">
                Add role
            </div>
            <div v-if="roles.includes('ADMIN')" @click="$emit('removeRole', username, 'ADMIN')" class="rounded-full shadow-lg py-2 px-3 overflow-hidden bg-gray-800 shadow-inner m-3">
                Remove role
            </div>
        </div>
    </div>
</template>

<style scoped>
    .hasRole {
        background-color: rgb(50, 0, 130);
    }

    
    .hasntGotRole {
        background-color: rgb(48, 46, 58);
        color: rgb(97, 96, 134);
    }
</style>