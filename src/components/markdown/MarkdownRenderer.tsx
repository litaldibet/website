import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize, { defaultSchema } from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import { transformMarkdownAssetUrl } from "./markdownUrlTransform"
import "../../../assets/css/MarkdownRenderer.css"

type MarkdownRendererProps = {
  markdown: string
  postId?: string
  className?: string
}

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), "div"],
  attributes: {
    ...(defaultSchema.attributes ?? {}),
    div: [["align", "center"]]
  }
}

export default function MarkdownRenderer({ markdown, postId, className }: MarkdownRendererProps) {
  const wrapperClassName = className ? `markdown-renderer ${className}` : "markdown-renderer"

  return (
    <div className={wrapperClassName}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeRaw], [rehypeSanitize, sanitizeSchema]]}
        urlTransform={(url, key) => transformMarkdownAssetUrl(url, key, postId)}
        components={{
          img: (props) => <img loading="lazy" decoding="async" {...props} />
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
