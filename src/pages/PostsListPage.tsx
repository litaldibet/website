import { useEffect, useMemo, useState } from "react"
import { isLoadCardsSuccessResponse, type PostCard as PostCardData } from "@shared/contracts/loadCards"
import type { PostCategory } from "@shared/domain/postCategory"
import { isObjectRecord } from "@shared/utils/objectGuards"
import PostCard from "../components/PostCard"
import { matchesCategory } from "../lib/postCategory"
import loadCardsService from "../services/loadCards"
import "../../assets/css/PostsListPage.css"

type PostsListPageProps = {
  title: string
  category: PostCategory
  routePrefix: "/promocoes" | "/blog"
}

function extractErrorMessage(data: unknown, status: number): string {
  if (isObjectRecord(data) && typeof data.error === "string" && data.error) {
    return data.error
  }

  return `Falha ao carregar cards (status ${status}).`
}

export default function PostsListPage({ title, category, routePrefix }: PostsListPageProps) {
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [cards, setCards] = useState<PostCardData[]>([])

  useEffect(() => {
    let disposed = false

    async function loadCards() {
      setLoading(true)
      setErrorMessage(null)

      try {
        const result = await loadCardsService()

        if (result.status !== 200 || !isLoadCardsSuccessResponse(result.data)) {
          if (!disposed) {
            setErrorMessage(extractErrorMessage(result.data, result.status))
            setCards([])
          }
          return
        }

        if (!disposed) {
          setCards(result.data.data)
        }
      } catch {
        if (!disposed) {
          setErrorMessage("Falha inesperada ao carregar cards.")
        }
      } finally {
        if (!disposed) {
          setLoading(false)
        }
      }
    }

    void loadCards()

    return () => {
      disposed = true
    }
  }, [])

  const filteredCards = useMemo(
    () => cards.filter((item) => matchesCategory(item.post_type, category)),
    [cards, category]
  )

  return (
    <section>
      <header className="posts-list-page-header">
        <h1 className="posts-list-page-title">
          {title}
        </h1>
      </header>

      {loading ? (
        <p className="posts-list-page-loading">Carregando...</p>
      ) : null}

      {!loading && errorMessage ? (
        <div className="posts-list-page-error">
          {errorMessage}
        </div>
      ) : null}

      {!loading && !errorMessage && filteredCards.length === 0 ? (
        <p className="posts-list-page-empty">Nenhum post encontrado nesta categoria.</p>
      ) : null}

      {!loading && !errorMessage && filteredCards.length > 0 ? (
        <div className="posts-list-page-grid">
          {filteredCards.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              to={`${routePrefix}/${encodeURIComponent(post.slug)}`}
              sourceListPath={routePrefix}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
