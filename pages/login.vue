<script setup>
    definePageMeta({
        middleware: ['redirect-to-notes']
    })
</script>

<template>
  <NuxtLayout name="unauthorised">
    <LogIn />
  </NuxtLayout>
</template>