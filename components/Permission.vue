<script setup>
    const props = defineProps({
        username: String,
        userPermissions: Array
    })
    let manage = ref(false)
</script>

<template>
    <div class="flex w-full py-2 border-slate-900 border-t" v-if="username !== undefined && userPermissions !== undefined">

        <div class="w-1/4 p-4">
            {{ username }}
        </div>

        <div class="w-2/3 flex justify-evenly">
            <div v-if="userPermissions.includes('GET') || manage" @click="" class="p-4 hover:text-violet-500 duration-300 relative">
                READ
                <span v-if="manage && userPermissions.includes('GET')"
                    @click="$emit('remove', username, 'GET')"
                    class="absolute right-1 top-1 text-sm text-rose-500 hover:text-rose-600 duration-300">
                    x
                </span>
                <span v-if="manage && !userPermissions.includes('GET')"
                    @click="$emit('grant', username, 'GET')"
                    class="absolute right-1 top-1 text-sm text-blue-300 hover:text-green-600 duration-300">
                    +
                </span>
            </div>
            
            <div v-if="userPermissions.includes('PUT') || manage" @click="" class="p-4 hover:text-violet-500 duration-300 relative">
                EDIT
                <span v-if="manage && userPermissions.includes('PUT')"
                    @click="$emit('remove', username, 'PUT')"
                    class="absolute right-1 top-1 text-sm text-rose-500 hover:text-rose-600 duration-300">
                    x
                </span>
                <span v-if="manage && !userPermissions.includes('PUT')"
                    @click="$emit('grant', username, 'PUT')"
                    class="absolute right-1 top-1 text-sm text-blue-300 hover:text-green-600 duration-300">
                    +
                </span>
            </div>

            <div v-if="userPermissions.includes('DELETE') || manage" @click="" class="p-4 hover:text-violet-500 duration-300 relative">
                DELETE
                <span v-if="manage && userPermissions.includes('DELETE')"
                    @click="$emit('remove', username, 'DELETE')"
                    class="absolute right-1 top-1 text-sm text-rose-500 hover:text-rose-600 duration-300">
                    x
                </span>
                <span v-if="manage && !userPermissions.includes('DELETE')"
                    @click="$emit('grant', username, 'DELETE')"
                    class="absolute right-1 top-1 text-sm text-blue-300 hover:text-green-600 duration-300">
                    +
                </span>
            </div>
        </div>

        <button @click="manage = !manage" class="bg-slate-900 px-4 h-5/6 py-2 my-auto text-sm rounded-full hover:text-indigo-600 hover:bg-gray-900 duration-300 ">
            <span v-if="!manage">manage</span>
            <span v-if="manage">OK</span>
        </button>

    </div>
</template>