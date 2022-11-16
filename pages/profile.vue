<script setup>
    import { useAuth0 } from '@auth0/auth0-vue'

    const auth0 = useAuth0()

    login: () => auth0.loginWithRedirect()
    user: auth0.user
    isAuthenticated: auth0.isAuthenticated
    isLoading: auth0.isLoading

    // login() {
    //     this.$auth0.loginWithRedirect();
    // }
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <ProfileComponent />
        </NuxtLayout>
    </div>
    
</template>
