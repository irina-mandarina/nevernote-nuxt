<template>
    <nav class="w-full top-0 left-0 bg-gray-700 text-indigo-900 pattern-grid-lg">
        <ul class="p-6 text-gray-300 no-underline transition-all duration-300">
            <li class="inline p-6 text-gray-300 font-medium text-lg hover:text-gray-400 duration-300 focus:outline-none">
                <NuxtLink to="/notes">Notes</NuxtLink>
            </li>
            
            <li class="inline p-6 text-gray-300 font-medium text-lg hover:text-gray-400 duration-300 focus:outline-none">
                <NuxtLink to="/profile">My profile</NuxtLink>
            </li>
        </ul>
        <link href="https://unpkg.com/pattern.css" rel="stylesheet" />
    </nav>
</template>