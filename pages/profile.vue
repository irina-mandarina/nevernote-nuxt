<script setup>
    definePageMeta({
        middleware: 'authorise'
    })
</script>
<template>
    <div>
        <NuxtLayout name="default">
            <ProfileComponent />
        </NuxtLayout>
    </div>
    
</template>
