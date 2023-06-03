import * as core from "@actions/core"

export function createRegex(pattern: string, flags: string): RegExp {
  if (!pattern) {
    pattern = "v(?<version>(?<versionMajor>(0|[1-9]\\d*))\\.(?<versionMinor>(0|[1-9]\\d*))\\.(?<versionPatch>(0|[1-9]\\d*))(?<versionTag>(-(?<versionTagName>\\w+)\\.(?<versionTagNumber>(0|[1-9]\\d*))))?)\\s*$"
  }

  const regex = new RegExp(pattern, flags)

  core.debug(`regex: ${regex}`)

  return regex
}
