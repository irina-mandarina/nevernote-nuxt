<script setup>
    defineProps({
        role: String,
        owned: Boolean
    })
</script>

<template>
    <div class="flex mx-auto justify-evenly relative w-fit text-center">
        <div v-if="!owned" @click="$emit('addRole', role)"
            class="notOwned rounded-full shadow-lg py-2 px-3 overflow-hidden bg-gray-800 shadow-inner my-3">
            {{ role }}
        </div>
        <div v-if="owned" @click="$emit('removeRole', role)"
            class="owned rounded-full shadow-lg py-2 px-3 overflow-hidden bg-violet-800 shadow-inner my-3">
            {{ role }}
        </div>
    </div>
</template>

<style scoped>
    .notOwned::before {
        content: 'Add ';
        opacity: 0;
    }
    .notOwned:hover::before {
        opacity: 1;
        transition: all 0.3s;
    }
    
    .notOwned::after {
        content: ' role ?';
        opacity: 0;
    }

    .notOwned:hover::after {
        opacity: 1;
        transition: all 0.3s;
    }
    
    .owned::before {
        content: 'Remove ';
        opacity: 0;
    }
    .owned:hover::before {
        opacity: 1;
        transition: all 0.3s;
    }
    
    .owned::after {
        content: ' role ?';
        opacity: 0;
    }

    .owned:hover::after {
        opacity: 1;
        transition: all 0.3s;
    }
</style>