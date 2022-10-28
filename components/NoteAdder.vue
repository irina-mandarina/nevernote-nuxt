<template>
    <div id="note" class="inline-block w-1/4 h-fit bg-gray-900 rounded-3xl p-8 m-6 shadow-lg">

        <div class="block">
            <input type="text" placeholder="Title"
                class="flex mx-auto my-6 break-words font-serif text-md text-center focus:appearance-none focus:outline-none rounded-xl shadow-xl bg-gray-700 border-gray-800 p-2"
            >

            <textarea type="text" placeholder="Content"
                class="mx-auto mb-8 h-1/2 flex border border-gray-800 w-3/4 tracking-wide text-md italic text-gray-400 focus:appearance-none focus:outline-none rounded-xl shadow-xl bg-gray-700 border-gray-800 p-4"
            />
            <button
                class="flex mx-auto bg-violet-900 text-gray-900 p-3 rounded-2xl shadow-lg focus:outline-none hover:bg-violet-800 hover:rounded-3xl duration-500"
            >
                Add to notes
            </button>
        </div>
    </div>
</template>