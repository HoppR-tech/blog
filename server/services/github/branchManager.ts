import { GITHUB_BRANCH, GITHUB_OWNER, GITHUB_REPO } from '@/server/config/githubConfig'

export async function createBranch(octokit: any, branchName: string) {
  try {
    const { data: branches } = await octokit.rest.repos.listBranches({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
    })

    const mainBranch = branches.find((branch: { name: string }) => branch.name === GITHUB_BRANCH)
    if (!mainBranch)
      throw new Error(`La branche principale ${GITHUB_BRANCH} n'existe pas`)

    await octokit.rest.git.createRef({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      ref: `refs/heads/${branchName}`,
      sha: mainBranch.commit.sha,
    })
  }
  catch (error) {
    console.error(`Erreur lors de la création de la branche ${branchName}:`, error)
    throw new Error(`Impossible de créer la branche ${branchName}: ${error instanceof Error ? error.message : 'Une erreur inconnue s\'est produite'}`)
  }
}

export async function deleteBranch(octokit: any, branchName: string) {
  await octokit.rest.git.deleteRef({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    ref: `heads/${branchName}`,
  })
}
