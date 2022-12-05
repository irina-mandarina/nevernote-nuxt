<script setup>
// debugger
    definePageMeta({
        middleware: ['authorise']
    })
</script>

<template>
    <div>
        <NuxtLayout name="default">
            <NoteList />
        </NuxtLayout>
    </div>
</template>
