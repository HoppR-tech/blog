<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { data } = await useAsyncData('home', () => queryContent('/blogs').sort({ _id: -1 }).find())

const elementPerPage = ref(5)
const pageNumber = ref(1)
const searchTest = ref('')

watch(() => route.query.search, (newSearch) => {
  if (newSearch) {
    searchTest.value = newSearch as string
    pageNumber.value = 1
  }
  else {
    searchTest.value = ''
  }
}, { immediate: true })

const formattedData = computed(() => {
  return data.value?.map((articles) => {
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      description: articles.description || 'no-description available',
      image: articles.image || '/not-found.jpg',
      alt: articles.alt || 'no alter data available',
      ogImage: articles.ogImage || '/not-found.jpg',
      date: formatDate(articles.date) || 'not-date-available',
      tags: articles.tags || [],
      published: articles.published || false,
      content: articles.body?.children?.map(child => child.children?.map(c => c.value).join(' ')).join(' ') || '',
    }
  }) || []
})

const searchData = computed(() => {
  if (!searchTest.value)
    return formattedData.value
  return formattedData.value.filter((data) => {
    const lowerTitle = data.title.toLowerCase()
    const lowerDescription = data.description.toLowerCase()
    const lowerContent = data.content.toLowerCase()
    const lowerTags = data.tags.map((tag: string) => tag.toLowerCase())
    const lowerSearchTerm = searchTest.value.toLowerCase()
    return lowerTitle.includes(lowerSearchTerm)
      || lowerDescription.includes(lowerSearchTerm)
      || lowerContent.includes(lowerSearchTerm)
      || lowerTags.some((tag: string | string[]) => tag.includes(lowerSearchTerm))
  })
})

const paginatedData = computed(() => {
  return searchData.value.filter((data, idx) => {
    const startInd = ((pageNumber.value - 1) * elementPerPage.value)
    const endInd = (pageNumber.value * elementPerPage.value) - 1

    if (idx >= startInd && idx <= endInd)
      return true
    else return false
  }) || []
})

function onPreviousPageClick() {
  if (pageNumber.value > 1)
    pageNumber.value -= 1
}

const totalPage = computed(() => {
  const ttlContent = searchData.value.length || 0
  const totalPage = Math.ceil(ttlContent / elementPerPage.value)
  return totalPage
})

function onNextPageClick() {
  if (pageNumber.value < totalPage.value)
    pageNumber.value += 1
}

useHead({
  title: 'Articles',
  meta: [
    {
      name: 'description',
      content: 'Toutes les publications sur le blog d\'HoppR sont ici.',
    },
  ],
  titleTemplate: 'Blog HoppR - %s',
})

// Generate OG Image
const siteData = useSiteConfig()
defineOgImage({
  props: {
    title: 'Articles',
    description: 'Toutes les publications sur le blog d\'HoppR sont ici.',
    siteName: siteData.url,
  },
})
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600">
    <ArchiveHero />

    <div class="px-6">
      <input
        v-model="searchTest"
        placeholder="Search"
        type="text"
        class="block w-full bg-[#F1F2F4] dark:bg-slate-900 dark:placeholder-zinc-500 text-zinc-800 dark:text-zinc-300 rounded-md border-gray-300 dark:border-zinc-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
    </div>

    <ClientOnly>
      <div v-auto-animate class="space-y-5 my-5 px-4">
        <template v-for="post in paginatedData" :key="post.title">
          <ArchiveCard
            :path="post.path"
            :title="post.title"
            :date="post.date"
            :description="post.description"
            :image="post.image"
            :alt="post.alt"
            :og-image="post.ogImage"
            :tags="post.tags"
            :published="post.published"
          />
        </template>

        <ArchiveCard
          v-if="paginatedData.length <= 0"
          title="No Post Found"
          image="/not-found.jpg"
        />
      </div>

      <template #fallback>
        <!-- this will be rendered on server side -->
        <BlogLoader />
        <BlogLoader />
      </template>
    </ClientOnly>

    <div class="flex justify-center items-center space-x-6 ">
      <button :disabled="pageNumber <= 1" @click="onPreviousPageClick">
        <Icon name="mdi:code-less-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber > 1 }" />
      </button>
      <p>{{ pageNumber }} / {{ totalPage }}</p>
      <button :disabled="pageNumber >= totalPage" @click="onNextPageClick">
        <Icon name="mdi:code-greater-than" size="30" :class="{ 'text-sky-700 dark:text-sky-400': pageNumber < totalPage }" />
      </button>
    </div>
  </main>
</template>
