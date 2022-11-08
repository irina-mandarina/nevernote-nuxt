<script setup>
// debugger
    definePageMeta({
        middleware: ['authorise']
    })
</script>

<template>
    <div class="">
        <NuxtLayout name="default">
            <NoteList />
        </NuxtLayout>
    </div>
</template>
