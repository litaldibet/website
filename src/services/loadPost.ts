import { loadPost } from "../lib/edgeFunctionsPaths"
import type { LoadPostResponse } from "@shared/contracts/loadPost"
import { handleTypedRequest } from "@shared/services/requestHelpers"

export default async function loadPostService(id: string) {
  const url = `${loadPost}?id=${encodeURIComponent(id)}`

  return handleTypedRequest<LoadPostResponse>(
    fetch(url, {
      method: "GET",
    })
  )
}
