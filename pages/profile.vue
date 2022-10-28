<script setup>
    definePageMeta({
        middleware: 'authorise'
    })
</script>

<template>
    <NuxtLayout name="default">
        <ProfileComponent />
    </NuxtLayout>
</template>
