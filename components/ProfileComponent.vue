<template>
    <div class="w-full h-full fixed bg-gray-800 text-indigo-900 pattern-grid-lg">
        <div class="w-1/3 p-12 h-fit mx-auto mt-20 bg-gray-900 rounded-xl shadow-2xl text-center">
            <div class="w-full text-center my-8">
                <p class="p-4 text-xl text-violet-800">Hello, <span class="font-light duration-300 hover:text-blue-700">  {{ store.name }} </span>!</p>
            </div>
            
            <img class="mx-auto my-4 w-1/2" src="https://picsum.photos/400"/>
        
            <div class="relative mx-auto z-0 my-8">
                <p class="text-center block py-2 w-2/3 text-md font-light dark:text-gray-400 bg-transparent border-0 border-b-2 rounded-xl border-gray-300 appearance-none dark:text-gray-200 dark:border-violet-900 dark:focus:border-violet-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mx-auto cursor-default">
                    username
                </p>
            </div>

            <p id="biobox" class="flex w-5/6 text-center block text-serif font-weight-300 mx-auto break-words p-4">  bio  </p>
            <textarea id="editbox" class="hidden mx-auto flex rounded-md w-3/4 tracking-wide text-sm text-gray-400 px-2" type="text" placeholder="Bio"></textarea>
            <button id="editbiobtn" class="block my-4 mx-auto bg-[#4310c49d] text-gray-900 p-3 font-[500] rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500">Change bio</button>
            <button id="savebiobtn" class="hidden my-4 mx-auto bg-violet-900 text-gray-900 p-3 font-[500] rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500">Save changes</button>

            
            <button class="my-6 flex mx-auto mx-auto bg-violet-900 text-gray-900 p-3 font-[500] rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500">Log out</button>

        </div>
        
        <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
    </div>
</template>
<style>
div{
color: #4310c49d;

}
</style>