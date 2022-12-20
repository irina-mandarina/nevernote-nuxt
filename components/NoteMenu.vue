<script setup>
    import { LSGetLogged } from '~~/js/localStorage';
    import { getPermissions } from '~~/js/requests'

    const props = defineProps({
        id: Number
    })

    let ownPermissions = ref([])
    let users = ref(new Map())
    let response = ref(null)
    let permissionsPanel = ref(false)

    let newUser = ref(null)
    let allowRead = ref(false)
    let allowEdit = ref(false)
    let allowDelete = ref(false)

    onBeforeMount(async () => {
        try {
            response.value = await getPermissions(props.id)
            for (let i = 0; i < response.value.data.length; i++) {
                // see what permissions the logged user has
                let permission = response.value.data[i]
                if (permission.username === LSGetLogged()) {
                    ownPermissions.value.push(permission.permissionType)
                }

                else {
                    if (!users.value.includes(permission.username)) {
                        users.value.set(permission.username, [permission.permissionType])
                    }
                    else {
                        let p = users.value.get(permission.username).push(permission.permissionType)
                        users.value.set(permission.username, p)
                    }
                }
            }
        console.log(users.value)
        }
        catch (error) {
            console.log(error)
        }
    })

    function addPermissions() {
        alert(1)
        if (allowRead) {
            // grant
        }
        if (allowEdit) {
            // grant
        }
        if (allowDelete) {
            // grant
        }
    }
</script>

<template>
    <div class="right-0 top-0 bottom-0 bg-slate-900 border border-indigo-900 rounded-2xl fixed shadow-lg text-violet-600">
        <!-- <button @click="$emit('closeMenu')" class="float-right p-2 text-fuchsia-600 hover:text-fuchsia-800 duration-300">
            x
        </button> -->
        <ul class="" v-if="ownPermissions !== null">
            <li v-if="ownPermissions.includes('PUT')" class="border-b border-slate-600 p-4 text-center w-full hover:bg-slate-800/[.3] duration-300"
                @click="">
                Edit
            </li>
            <li v-if="ownPermissions.includes('DELETE')" class="border-b border-slate-600 p-4 text-center w-full hover:bg-slate-800/[.3] duration-300"
                @click="">
                Delete
            </li>
            <li v-if="ownPermissions.includes('GET')" class="border-b border-slate-600 p-4 text-center w-full hover:bg-slate-800/[.3] duration-300"
                @click="">
                Copy link
            </li>
            <li v-if="ownPermissions.includes('POST')" class="text-center p-4 w-full hover:bg-slate-800/[.3] duration-300"
                @click="permissionsPanel = !permissionsPanel">
                Manage permissions
                <i class="fa fa-chevron-right" v-if="!permissionsPanel"/>
                <i class="fa fa-chevron-down" v-if="permissionsPanel"/>
            </li>

            <ul v-if="permissionsPanel" class="w-full bg-slate-800 mb-2 py-4">
                <!-- add permissions -->
                <div class="w-full">
                    <div class="w-fit py-4 mx-auto">
                        Permissions for
                        <input type="text" v-model="newUser"
                            class="break-words mx-auto font-frank rounded-full text-md text-gray-300 text-center py-2 bg-gray-700 focus:outline-none">
                    </div>
                    <div class="justify-evenly flex mx-8">
                        <span @click="allowRead = !allowRead" :class="{
                            'text-violet-400': allowRead, 'font-bold': allowRead
                            }"
                            class="p-4 hover:text-violet-500 duration-300">
                            READ
                        </span>
                        <span @click="allowEdit = !allowEdit" :class="{
                            'text-violet-400': allowEdit, 'font-bold': allowEdit
                            }" class="p-4 hover:text-violet-500 duration-300">
                            EDIT
                        </span>
                        <span @click="allowDelete = !allowDelete" :class="{
                            'text-violet-400': allowDelete, 'font-bold': allowDelete
                            }" class="p-4 hover:text-violet-500 duration-300">
                            DELETE
                        </span>
                    </div>
                    <button :disabled="!(allowEdit || allowRead || allowDelete)"
                        @click="addPermissions()"
                        class="text-center flex my-4 mx-auto py-2 px-4 bg-indigo-900 text-gray-300 hover:bg-violet-900 hover:text-gray-400 duration-300 rounded-full">
                        Add permissions
                    </button>
                </div>

                <!-- existing permissions for other users -->
                <!-- should be scrollable FIX LATER!! -->
                <div v-for="[username, userPermissions] in users" class="flex w-full">
                    <span class="w-1/3 p-4">
                        {{ username }}
                    </span>
                    <span class="w-2/3 flex justify-evenly">
                        <span v-if="userPermissions.includes('GET')" @click="" class="p-4 hover:text-violet-500 duration-300">
                            READ
                        </span>
                        <span v-if="userPermissions.includes('PUT')" @click="" class="p-4 hover:text-violet-500 duration-300">
                            EDIT
                        </span>
                        <span v-if="userPermissions.includes('DELETE')" @click="" class="p-4 hover:text-violet-500 duration-300">
                            DELETE
                        </span>
                    </span>
                </div>
            </ul>
        </ul>
    </div>
</template>