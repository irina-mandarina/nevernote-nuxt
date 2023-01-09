<script setup>
    import { getAllUsersRoles, removeRole, addRole } from '~~/js/requests'
    let rolesMap = ref(new Map())

    definePageMeta({
        middleware: ['admin-access']
    })

    onBeforeMount(async () => {
        initRoles()
    })
    
    async function initRoles() {
        try {
            const response = await getAllUsersRoles()
            console.log(response)
            for (let i = 0; i < response.data.length; i++) {
                if (!rolesMap.value.has(response.data[i].username)) {
                    rolesMap.value.set(response.data[i].username, [response.data[i].role])
                }
                else {
                    let r = rolesMap.value.get(response.data[i].username)
                    r.push(response.data[i].role)
                    rolesMap.value.set(response.data[i].username, r)
                }
            }
            console.log(rolesMap.value)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function deleteRole(username, role) {
        try {
            const response = await removeRole(username, role)
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
        initRoles()
    }
    
    async function postRole(username, role) {
        try {
            const response = await addRole(username, role)
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
        initRoles()
    }
</script>
<template>
    <div>
        <NuxtLayout name="default">
            <div class="flex flex-wrap justify-evenly pt-32">
                <UserRole v-for="[username, roles] in rolesMap" :roles="roles" :username="username" :all-roles="['USER', 'ADMIN']"
                @remove-role="deleteRole" @add-role="postRole" />
            </div>
        </NuxtLayout>
    </div>
</template>