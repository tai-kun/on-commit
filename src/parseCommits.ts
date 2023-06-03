import * as core from "@actions/core"
import { z } from "zod"

// https://github.com/shinnn/github-username-regex
const GITHUB_USERNAME_REGEX = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i
const SHA_1_REGEX = /^[a-f0-9]{40}$/

const unameSchema = z.union([
  z.literal(""), // bot
  z.string()
    .regex(GITHUB_USERNAME_REGEX)
])
const idSchema = z.string()
  .regex(SHA_1_REGEX)
const commitSchema = z.object({
  author: z.object({
    email: z.string()
      .email(),
    name: unameSchema,
    username: unameSchema
  }),
  committer: z.object({
    email: z.string()
      .email(),
    name: unameSchema,
    username: unameSchema
  }),
  id: idSchema,
  message: z.string(),
  tree_id: idSchema,
  url: z.string()
    .url()
})

export interface Commit extends z.output<typeof commitSchema> {}

export type Commits = Commit[]

export async function parseCommits(commitsJson: string): Promise<Commits> {
  const json = JSON.parse(commitsJson.trim() || "[]")
  const commits = await z.array(commitSchema).spa(json)

  if (commits.success) {
    core.debug(JSON.stringify(commits.data, null, 2))

    return commits.data
  }

  core.error(commits.error)

  return []
}
