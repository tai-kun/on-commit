import * as cp from "node:child_process"
import * as path from "node:path"
import * as process from "node:process"

import { test, expect } from "@jest/globals"

test("test", () => {
  const common = {
    author: {
      email: "foo@bar.baz",
      name: "foo",
      username: "foo"
    },
    committer: {
      email: "foo@bar.baz",
      name: "foo",
      username: "foo"
    },
    id: "9a6747fc6259aa374ab4e1bb03074b6ec672cf99",
    tree_id: "553ae7da92f5505a92bbb8c9d47be76ab9f65bc2",
    url: "https://github.com/foo/bar/commit/9a6747fc6259aa374ab4e1bb03074b6ec672cf99"
  }
  process.env["INPUT_COMMITS"] = JSON.stringify([
    {
      ...common,
      message: "🚀 ビルド"
    },
    {
      ...common,
      message: "🔖 v2.2.0"
    }
  ])

  const np = process.execPath
  const ip = path.join(__dirname, "..", "dist", "index.cjs")

  expect(cp.execFileSync(np, [ip], { env: process.env }).toString())
    .toMatchSnapshot()
})
