import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { isLoadCardsSuccessResponse } from "@shared/contracts/loadCards"
import { isLoadPostSuccessResponse, type PostDetails } from "@shared/contracts/loadPost"
import type { PostCategory } from "@shared/domain/postCategory"
import { isObjectRecord } from "@shared/utils/objectGuards"
import { MarkdownRenderer } from "../components/markdown"
import { matchesCategory } from "../lib/postCategory"
import loadCardsService from "../services/loadCards"
import loadPostService from "../services/loadPost"
import "../../assets/css/PostDetailsPage.css"

type PostDetailsPageProps = {
  category: PostCategory
  listPath: "/promocoes" | "/blog"
}

type PostLocationState = {
  postId?: string
  sourceListPath?: "/promocoes" | "/blog"
}

function extractErrorMessage(data: unknown, status: number): string {
  if (isObjectRecord(data) && typeof data.error === "string" && data.error) {
    return data.error
  }

  return `Falha ao carregar post (status ${status}).`
}

async function resolvePostIdFromSlug(slug: string, category: PostCategory): Promise<string | null> {
  const result = await loadCardsService()

  if (result.status !== 200 || !isLoadCardsSuccessResponse(result.data)) {
    return null
  }

  const found = result.data.data.find((item) => item.slug === slug && matchesCategory(item.post_type, category))

  return found?.id ?? null
}

export default function PostDetailsPage({ category, listPath }: PostDetailsPageProps) {
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [post, setPost] = useState<PostDetails | null>(null)

  useEffect(() => {
    let disposed = false

    async function loadPost() {
      setLoading(true)
      setErrorMessage(null)
      setPost(null)

      const currentSlug = (slug ?? "").trim()

      if (!currentSlug) {
        if (!disposed) {
          setLoading(false)
          setErrorMessage("Slug inválido.")
        }
        return
      }

      try {
        const state = (location.state as PostLocationState | null) ?? null
        let postId = state?.postId?.trim() || null

        if (!postId) {
          postId = await resolvePostIdFromSlug(currentSlug, category)
        }

        if (!postId) {
          if (!disposed) {
            setErrorMessage("Post não encontrado para este slug.")
          }
          return
        }

        const result = await loadPostService(postId)

        if (result.status !== 200 || !isLoadPostSuccessResponse(result.data)) {
          if (!disposed) {
            setErrorMessage(extractErrorMessage(result.data, result.status))
          }
          return
        }

        const loadedPost = result.data.data

        if (!matchesCategory(loadedPost.post_type, category)) {
          if (!disposed) {
            setErrorMessage("Este post não pertence a esta categoria.")
          }
          return
        }

        if (loadedPost.slug !== currentSlug) {
          if (!disposed) {
            setErrorMessage("Slug do post não confere com a URL informada.")
          }
          return
        }

        if (!disposed) {
          setPost(loadedPost)
        }
      } catch {
        if (!disposed) {
          setErrorMessage("Falha inesperada ao carregar post.")
        }
      } finally {
        if (!disposed) {
          setLoading(false)
        }
      }
    }

    void loadPost()

    return () => {
      disposed = true
    }
  }, [slug, category, location.state])

  if (loading) {
    return <p className="post-details-loading">Carregando post...</p>
  }

  if (errorMessage || !post) {
    return (
      <section className="post-details-error">
        <p className="post-details-error-message">{errorMessage ?? "Post não encontrado."}</p>
        <Link
          to={listPath}
          className="post-details-back-link"
        >
          Voltar para a listagem
        </Link>
      </section>
    )
  }

  function handleGoBack() {
    const state = (location.state as PostLocationState | null) ?? null

    if (state?.sourceListPath === listPath) {
      navigate(-1)
      return
    }

    navigate(listPath)
  }

  return (
    <section className="post-details-page">
      <article className="post-details-article">
        <img
          src={post.banner_url}
          alt={post.title}
          className="post-details-banner"
        />

        <div className="post-details-content">
          <h1 className="post-details-title">
            {post.title}
          </h1>

          <MarkdownRenderer markdown={post.content_markdown} postId={post.id} />
        </div>
      </article>

      <div className="post-details-actions">
        <button
          type="button"
          className="post-details-go-back-button"
          onClick={handleGoBack}
        >
          Voltar
        </button>
      </div>
    </section>
  )
}
