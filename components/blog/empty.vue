<template>
  <article class="group border dark:border-zinc-500 m-2 rounded-2xl overflow-hidden shadow-lg text-zinc-700">
    <NuxtLink to="/">
      <div
        class="lg:h-48 md:h-36 w-full object-cover object-center group-hover:scale-[1.05] transition-all duration-500"
      >
        <LogoConfused />
      </div>
      <div class="p-5">
        <h2
          class="text-3xl font-luciole text-black dark:text-zinc-300 pb-1 group-hover:text-sky-700 dark:group-hover:text-sky-400"
        >
          Aucun article disponible
        </h2>

        <div class="flex group-hover:underline text-sky-700 dark:text-sky-4000 items-center pt-2">
          <p>Retourner à l'accueil</p>
          <LogoArrow />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>
