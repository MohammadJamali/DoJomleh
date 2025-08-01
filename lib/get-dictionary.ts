// lib/get-dictionary.ts
import { Dictionary } from './dictionary-types'
import { Locale } from './i18n-config'

const dictionaryCache = new Map<Locale, Dictionary>()

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  // Return cached dictionary if available
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale)!
  }

  try {
    // Dynamic import with type safety
    const dict = await import(`@/dictionaries/${locale}.json`)
    const dictionary = dict.default as Dictionary
    dictionaryCache.set(locale, dictionary)
    return dictionary
  } catch (error) {
    console.error(`Missing translations for ${locale}, falling back to EN`)
    
    // Cache fallback too
    if (!dictionaryCache.has('en')) {
      const enDict = await import('@/dictionaries/en.json')
      dictionaryCache.set('en', enDict.default as Dictionary)
    }
    
    return dictionaryCache.get('en')!
  }
}