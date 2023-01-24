<script setup>
    const props = defineProps({
        pageNumber: Number,
        pageSize: Number
    })
    const emit = defineEmits([
        'setPageSize'
    ])
    let showPageSizeSlider = ref(false)
    let newPageSize = ref(props.pageSize)
    function setPageSize() {
        showPageSizeSlider.value = false
        emit('setPageSize', (Number)(newPageSize.value))
    }
</script>

<template>
    <div class="py-4 flex w-min mx-auto">
        <button class="mx-3 w-fit px-3 rounded-full bg-slate-900 text-gray-500 hover:text-gray-600 duration-300" 
        @click="$emit('previousPage')" >
            <i class="fa fa-arrow-left" />
        </button>

        <span class="w-32 text-center text-sm text-gray-400 p-3" v-if="!showPageSizeSlider" @click="showPageSizeSlider = true">
            {{ pageNumber }}
        </span>
        <div class="w-32" v-if="showPageSizeSlider">
            <input type="range" min="1" max="500" v-model="newPageSize" >
            <div class="text-red-700 w-max text-center mx-auto hover:text-red-900 duration-300"
            @click="setPageSize()">
                X
            </div>
        </div>

        <button class="mx-3 w-fit px-3 rounded-full bg-slate-900 text-gray-500 hover:text-gray-600 duration-300" 
        @click="$emit('nextPage')" >
            <i class="fa fa-arrow-right"/>
        </button>
    </div>
</template>