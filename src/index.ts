import * as core from "@actions/core"

import { createRegex } from "./createRegex"
import { flattenCommit } from "./flattenCommit"
import type { Commit } from "./parseCommits"
import { parseCommit } from "./parseCommit"
import { parseCommits } from "./parseCommits"

function setOutputs(): void

function setOutputs(
  commit: Commit,
  groups: Record<string, string>
): void

function setOutputs(
  commit: Commit | null = null,
  groups: Record<string, string> | null = null
): void {
  if (!commit || !groups) {
    core.setOutput("matched", "false")

    return
  }

  const reservedOutputs = {
    ...flattenCommit(commit),
    matched: "true"
  }

  for (const [key, value] of Object.entries(groups)) {
    if (key in reservedOutputs) {
      continue
    }

    core.setOutput(key, value)
  }

  for (const [key, value] of Object.entries(reservedOutputs)) {
    core.setOutput(key, value)
  }
}

async function run(): Promise<void> {
  const regex = createRegex(core.getInput("pattern"), core.getInput("flags"))
  const commits = await parseCommits(core.getInput("commits"))
  const commitsInv = commits.reverse()

  for (const commit of commitsInv) {
    const groups = parseCommit(regex, commit)

    if (groups) {
      return setOutputs(commit, groups)
    }
  }

  setOutputs()
}

run().catch(ex => {
  if (ex instanceof Error || typeof ex === "string") {
    core.setFailed(ex)
  }
})
