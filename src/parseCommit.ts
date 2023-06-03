import * as core from "@actions/core"
import { z } from "zod"

import type { Commit } from "./parseCommits"

export function parseCommit(
  regex: RegExp,
  { message }: Readonly<Pick<Commit, "message">>
): Record<string, string> | null {
  core.debug(`message: ${message}`)

  const array = regex.exec(message)

  core.debug(`RegExpExecArray.groups: ${JSON.stringify(array)}`)

  if (array == null) {
    return null
  }

  core.debug(`RegExpExecArray.groups: ${JSON.stringify(array.groups || {})}`)

  const schema = z.record(
    z.string()
      .transform(k => k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)),
    z.string()
      .default("")
  )
  const groups = schema.safeParse(array.groups || {})

  if (groups.success) {
    core.debug(JSON.stringify(groups.data))

    return groups.data
  }

  core.error(groups.error)

  return null
}
