import { loadPost } from "../lib/edgeFunctionsPaths"
import { handleRequest } from "@shared/services/requestHelpers"

export default async function loadPostService(id: string) {
  const url = `${loadPost}?id=${encodeURIComponent(id)}`

  return handleRequest(
    fetch(url, {
      method: "GET",
    })
  )
}
