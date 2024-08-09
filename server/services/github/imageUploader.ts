import { uploadToGitHub } from './contentUploader'
import type { BlogPost } from '@/types/blog'
import type { ImageFile } from '@/types/files'
import { downloadAndConvertImage } from '@/utils/imageUtils'

export async function uploadCoverImage(octokit: any, post: BlogPost, assetsFolderPath: string, branchName: string): Promise<BlogPost> {
  const { webpImageName, imageContent } = await downloadAndConvertImage(post.image, 'cover-image')
  await uploadToGitHub(octokit, `${assetsFolderPath}/${webpImageName}`, `Upload cover image: ${webpImageName}`, imageContent, true, branchName)

  return {
    ...post,
    image: `./assets/${webpImageName}`,
    ogImage: `./assets/${webpImageName}`,
  }
}

export async function uploadAllImages(octokit: any, imageFiles: ImageFile[], assetsFolderPath: string, branchName: string) {
  for (const imageFile of imageFiles)
    await uploadToGitHub(octokit, `${assetsFolderPath}/${imageFile.name}`, `Upload image: ${imageFile.name}`, imageFile.content, true, branchName)
}
