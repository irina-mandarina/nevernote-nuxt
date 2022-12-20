<script setup>
    import { getPermissions } from '~~/js/requests'

    const props = defineProps({
        id: Number
    })

    let permissions =ref([])
    let response = ref(null)
    onBeforeMount(async () => {
        try {
            response.value = await getPermissions(props.id)
            for (let i = 0; i < response.value.data.length; i++) {
                console.log(response.value.data[i])
                if (response.value.data[i].permissionType === "GET") {
                    permissions.value.push("GET")
                }
                else if (response.value.data[i].permissionType === "POST") {
                    permissions.value.push("POST")
                }
                else if (response.value.data[i].permissionType === "PUT") {
                    permissions.value.push("PUT")
                }
                else if (response.value.data[i].permissionType === "DELETE") {
                    permissions.value.push("DELETE")
                }
                
            }
        }
        catch (error) {
            console.log(error)
        }
    })
</script>

<template>
    <div class="w-max bg-slate-900 border border-indigo-900 rounded-2xl m-6 shadow-lg">
        <button @click="$emit('closeMenu')" class="float-right p-2 text-fuchsia-600 hover:text-fuchsia-800 duration-300">
            x
        </button>
        <ul class="p-6" v-if="permissions !== null">
            <li v-if="permissions.includes('PUT')" class="border-b border-slate-600 p-2 text-center w-full"
                @click="">
                Edit
            </li>
            <li v-if="permissions.includes('DELETE')" class="border-b border-slate-600 p-2 text-center w-full"
                @click="">
                Delete
            </li>
            <li v-if="permissions.includes('POST')" class="border-b border-slate-600 p-2 text-center w-full"
                @click="">
                Add permission
                <i class="fa fa-chevron-right" />

                <ul class="absolute rounded-md bg-slate-800 border-gray-700">
                    <button @click="" 
                        class="bg-gray-700 rounded-full float-right mt-2 w-5 h-5 text-center hover:bg-gray-600 duration-300 focus:outline-0 focus:border-0">
                        <i class="fa fa-check text-xs text-indigo-300 bold p-1 align-middle" aria-hidden="true"></i>
                </button>
                </ul>

            </li>
            <li v-if="permissions.includes('GET')" class="p-2 text-center w-full"
                @click="">
                Share link
            </li>
        </ul>
    </div>
</template>