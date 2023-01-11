<script setup>
    const props = defineProps({
        username: String,
        roles: Array,
        allRoles: Array
    })
</script>
<template>
    <div class="shadow-lg rounded-2xl bg-gray-900 text-violet-200 w-1/2 m-4 p-6 flex overflow-hidden">
        <div class="text-center hover:text-violet-400 duration-300 py-2 px-4 m-3">
            {{ username }}
        </div>

        <Role v-for="role in allRoles" :role="role" :owned="roles.includes(role)" @add-role="$emit('addRole', username, role)"  @remove-role="$emit('removeRole', username, role)"/>
    </div>
</template>