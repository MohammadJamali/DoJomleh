// lib/dictionary-types.ts
import enDictionary from '@/dictionaries/en.json'

export type Dictionary = typeof enDictionary

// Optional: Create deep partial type for incomplete translations
export type PartialDictionary = {
  [K in keyof Dictionary]?: Partial<Dictionary[K]>
}