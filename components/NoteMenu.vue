<script setup>
    import { LSGetLogged } from '~~/js/localStorage';
    import { getPermissions, grantPermission, deletePermission } from '~~/js/requests'

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
        await initPermissions()
    })

    async function initPermissions() {
        try {
            response.value = await getPermissions(props.id)
            for (let i = 0; i < response.value.data.length; i++) {
                // see what permissions the logged user has
                let permission = response.value.data[i]
                if (permission.username === LSGetLogged()) {
                    ownPermissions.value.push(permission.permissionType)
                }

                else {
                    if (!users.value.has(permission.username)) {
                        users.value.set(permission.username, [permission.permissionType])
                    }
                    else {
                        let p = users.value.get(permission.username)
                        p.push(permission.permissionType)
                        users.value.set(permission.username, p)
                    }
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async function addPermissions() {
        if (allowRead.value) {
            try {
                const response = await grantPermission(newUser.value, props.id, "GET")
            }
            catch (error) {
                console.log(error)
            }
        }
        if (allowEdit.value) {
            try {
                const response = await grantPermission(newUser.value, props.id, "PUT")
            }
            catch (error) {
                console.log(error)
            }
        }
        if (allowDelete.value) {
            try {
                const response = await grantPermission(newUser.value, props.id, "DELETE")
            }
            catch (error) {
                console.log(error)
            }
        }
        allowDelete.value = false
        allowRead.value = false
        allowEdit.value = false
        await initPermissions()
    }

    async function addPermission(username, permissionType) {
        try {
            const response = await grantPermission(username, props.id, permissionType)
        }
        catch (error) {
            console.log(error)
        }
        await initPermissions()
    }

    async function removePermission(username, permissionType) {
        try {
            const response = await deletePermission(username, props.id, permissionType)
        }
        catch (error) {
            console.log(error)
        }
        await initPermissions()
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

            <ul v-if="permissionsPanel" class="w-full bg-slate-800 mb-2 pt-2">
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
                <Permission v-for="[username, userPermissions] in users" :username="username" :user-permissions="userPermissions" @grant="addPermission" @remove="removePermission" />
            </ul>
        </ul>
    </div>
</template>