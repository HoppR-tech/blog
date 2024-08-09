import { defineEventHandler } from 'h3'
import { fetchPostsToPublishFromNotion } from '@/server/services/notionService'
import { GitHubService } from '@/server/services/github/githubService'
import { getOctokit } from '@/server/services/github/octokitClient'

export default defineEventHandler(async (event) => {
  try {
    const postsToPublish = await fetchPostsToPublishFromNotion()

    if (postsToPublish.length === 0)
      return { message: 'No articles to publish.' }

    const octokit = await getOctokit(52971414)
    const githubService = new GitHubService(octokit)

    await Promise.all(postsToPublish.map(post => githubService.publishPostToGitHub(post)))

    return { posts: postsToPublish, message: '✅ Articles successfully published on GitHub' }
  }
  catch (error) {
    console.error('❌ Error while synchronizing articles:', error)
    return { error: `❌ Error while synchronizing articles.\n${error}` }
  }
})
