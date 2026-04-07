import { Link } from "react-router-dom"
import type { PostCard as PostCardData } from "@shared/contracts/loadCards"
import "../../assets/css/PostCard.css"

type PostCardProps = {
  post: PostCardData
  to: string
  sourceListPath: "/promocoes" | "/blog"
}

export default function PostCard({ post, to, sourceListPath }: PostCardProps) {
  return (
    <Link to={to} state={{ postId: post.id, sourceListPath }} className="post-card">
      <div className="post-card-media">
        <img
          src={post.banner_url}
          alt={post.title}
          loading="lazy"
          className="post-card-image"
        />
      </div>

      <div className="post-card-content">
        <h3 className="post-card-title">
          {post.title}
        </h3>

        <p className="post-card-preview">
          {post.preview}
        </p>
      </div>
    </Link>
  )
}
