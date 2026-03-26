import { loadCards } from "../lib/edgeFunctionsPaths"
import { handleRequest } from "@shared/services/requestHelpers"

export default async function loadCardsService() {
  return handleRequest(
    fetch(loadCards, {
      method: "GET",
    })
  )
}
