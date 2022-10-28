<script setup>
    definePageMeta({
        middleware: 'redirectToNotes'
    })
</script>

<template>
  <NuxtLayout name="unauthorised">
    <LogIn />
  </NuxtLayout>
</template>