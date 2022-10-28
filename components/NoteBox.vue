<script setup>

    defineProps({
        id: Number,
        title: String,
        content: String,
        date: String
    })

</script>

<template>
    <div id="note" class="inline-block w-1/4 h-fit bg-gray-900 rounded-3xl p-8 m-6 shadow-lg">
        <div class="relative w-fit float-right">
            <button 
                class="flex p-0 m-0 bg-transparent text-rose-600 duration-700 hover:text-red-900 float-right border-0 text-sm focus:outline-0 focus:border-0"
                >
                x
            </button>
            <br/>
            <button class="flex p-0 m-0 mt-2 bg-transparent float-right border-0 text-sm focus:outline-0 focus:border-0">
                <i class="fa fa-pencil stroke-1 hover:stroke-2 duration-500 text-fuchsia-900 hover:text-violet-900"></i>
            </button>
        </div>

        <div class="block">
            <h3 class=" py-4 break-words font-serif text-center text-gray-400">  {{ title }}  </h3>
            <p class="pb-2 text-xs float-left italic text-violet-800 flex w-full ml-0">
                {{ date }}
            </p>
            <p class="pb-8 break-words text-left text-gray-400 flex w-full"> 
                {{ content }}
            </p>
        </div>
        
        <div  class="hidden">
            <input type="text" placeholder="Title" class="break-words mx-auto font-serif rounded-md text-md text-center py-2 my-2">
            <textarea class="mx-auto flex rounded-md w-full tracking-wide text-sm italic text-gray-400 px-2" type="text" placeholder="Content"></textarea>
            
            <button class="button mt-4 mb-4">
                Save changes
            </button>
        </div>

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    </div>
</template>