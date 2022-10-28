<script setup>
    definePageMeta({
        middleware: 'authorise'
    })
</script>

<template>
    <NuxtLayout name="default">
        <NoteList />
    </NuxtLayout>
</template>
