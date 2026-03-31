import type { PostCategory } from "@shared/domain/postCategory"

const PROMO_ALIASES = new Set(["PROMOCAO", "PROMOCOES", "PROMOCOE", "PROMOCAOES", "PROMOCAO", "PROMO"]) // Defensive normalization.

function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

export function normalizeCategory(value: string): PostCategory | null {
  const normalized = stripDiacritics(value.trim().toUpperCase())

  if (normalized === "BLOG" || normalized === "POST") {
    return "BLOG"
  }

  if (PROMO_ALIASES.has(normalized)) {
    return "PROMOCAO"
  }

  return null
}

export function matchesCategory(value: string, expected: PostCategory): boolean {
  return normalizeCategory(value) === expected
}
