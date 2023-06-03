import type { Commit } from "./parseCommits"

export function flattenCommit(commit: Commit) {
  return {
    "commit-author-email": commit["author"]["email"],
    "commit-author-name": commit["author"]["name"],
    "commit-author-username": commit["author"]["username"],
    "commit-committer-email": commit["committer"]["email"],
    "commit-committer-name": commit["committer"]["name"],
    "commit-id": commit["id"],
    "commit-message": commit["message"],
    "commit-tree-id": commit["tree_id"],
    "commit-url": commit["url"]
  }
}
