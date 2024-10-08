<script setup lang="ts">
import type { Person } from '@/types/blog'

interface Props {
  authors: Person[]
}

const props = defineProps<Props>()

const isSingleAuthor = computed(() => props.authors.length === 1)
</script>

<template>
  <div class="py-5 border-t dark:border-zinc-500 mt-5 text-zinc-700 dark:text-zinc-300">
    <div class="container max-w-6xl mx-auto">
      <h3 class="text-xl font-semibold mb-4 text-center">
        {{ isSingleAuthor ? 'À propos de l\'auteur' : 'À propos des auteurs' }}
      </h3>
      <div class="flex flex-col items-center">
        <div :class="{ 'grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl': !isSingleAuthor, 'flex justify-center': isSingleAuthor }">
          <template v-for="(author, index) in props.authors" :key="author.notionId">
            <div :class="{ 'flex flex-row items-center mb-6 sm:mb-0 relative sm:px-4': !isSingleAuthor, 'flex flex-row items-center': isSingleAuthor }">
              <img :src="author.image" :alt="author.name" class="w-16 h-16 rounded-full mb-0 sm:mr-4 object-cover">
              <div class="text-left ml-4">
                <p class="font-semibold text-base">
                  {{ author.name }}
                </p>
                <div class="flex justify-start space-x-2 mt-2">
                  <a
                    v-if="author.linkedin" :href="author.linkedin" target="_blank" rel="noopener noreferrer"
                    class="text-hoppr-green hover:text-opacity-80" aria-label="LinkedIn"
                  >
                    <Icon name="fa:linkedin-square" size="1.5em" />
                  </a>
                  <a
                    v-if="author.x" :href="author.x" target="_blank" rel="noopener noreferrer"
                    class="text-hoppr-green hover:text-opacity-80" aria-label="Twitter"
                  >
                    <Icon name="fa:twitter-square" size="1.5em" />
                  </a>
                </div>
              </div>
              <div v-if="!isSingleAuthor && index % 2 === 0 && index !== props.authors.length - 1" class="hidden sm:block absolute right-0 top-0 bottom-0 w-px bg-gray-300 dark:bg-zinc-600" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
