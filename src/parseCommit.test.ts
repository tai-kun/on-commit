import { expect, test } from "@jest/globals"

import { createRegex } from "./createRegex"
import { parseCommit } from "./parseCommit"

[
  {
    message: "v0.1.0",
    detected: {
      "version": "0.1.0",
      "version-major": "0",
      "version-minor": "1",
      "version-patch": "0",
      "version-tag": "",
      "version-tag-name": "",
      "version-tag-number": ""
    }
  },
  {
    message: "v0.1.01",
    detected: null
  },
  {
    message: "v0.1.0-beta.0",
    detected: {
      "version": "0.1.0-beta.0",
      "version-major": "0",
      "version-minor": "1",
      "version-patch": "0",
      "version-tag": "-beta.0",
      "version-tag-name": "beta",
      "version-tag-number": "0"
    }
  },
  {
    message: "release: 🔖 v2.2.4",
    detected: {
      "version": "2.2.4",
      "version-major": "2",
      "version-minor": "2",
      "version-patch": "4",
      "version-tag": "",
      "version-tag-name": "",
      "version-tag-number": ""
    }
  }
].forEach(({ message, detected }) => {
  test(message, () => {
    const parsed = parseCommit(createRegex("", "u"), { message })

    if (detected == null) {
      expect(parsed).toBeNull()
    }
    else {
      expect(parsed).toStrictEqual(detected)
    }
  })
})
