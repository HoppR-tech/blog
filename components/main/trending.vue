<script lang="ts" setup>
// Get the 6 oldest posts published within the last 3 months
const threeMonthsAgo = new Date()
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
const { data } = await useAsyncData('trending-post', () =>
  queryContent('/blogs')
    .where({
      published: true,
      date: { $gte: threeMonthsAgo.toISOString().split('T')[0] } as any,
    })
    .sort({ date: 1 })
    .limit(6)
    .find(), { server: true },
)

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
    }
  })
})

const imageSize = 'h-48'

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content:
        'Bienvenue sur le Blog Tech d\'HoppR. Partage, veille et ressources de la communauté sur les thématiques du Software Craftsmanship, du Cloud, de l\'architecture et de la Tech en générale.',
    },
  ],
  titleTemplate: 'Blog HoppR - %s',
})
</script>

<template>
  <div class="px-4">
    <div class="flex flex-row items-center space-x-3 pt-5 pb-3">
      <Icon name="mdi:star-outline" size="2em" class="text-black dark:text-zinc-300" />
      <h2 class="text-4xl font-semibold text-black dark:text-zinc-300 font-fira">
        Articles à la Une
      </h2>
    </div>
    <div class="grid grid-cols-1 gap-6">
      <template v-for="post in formattedData" :key="post.title">
        <ArchiveCard
          :path="post.path" :title="post.title" :date="post.date" :description="post.description"
          :image="post.image" :alt="post.alt" :og-image="post.ogImage" :tags="post.tags" :published="post.published"
          :image-size="imageSize"
        />
      </template>
      <template v-if="data?.length === 0">
        <BlogEmpty />
      </template>
    </div>
  </div>
</template>
