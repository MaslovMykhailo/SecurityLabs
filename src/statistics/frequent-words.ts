export type Language = 'en' | 'ru'

export const FREQUENT_WORDS_RU = [
    'и',
    'в',
    'не',
    'он',
    'на',
    'я',
    'что',
    'тот',
    'быть',
    'с',
    'а',
    'весь',
    'это',
    'как',
    'она',
    'по',
    'но',
    'они',
    'к',
    'у',
    'ты',
    'из',
    'мы',
    'за',
    'вы',
    'так',
    'же',
    'от',
    'сказать',
    'этот'
]

export const FREQUENT_WORDS_EN = [
    'be',
    'and',
    'of',
    'a',
    'in',
    'to',
    'have',
    'too',
    'it',
    'I',
    'that',
    'for',
    'you',
    'he',
    'with',
    'on',
    'do',
    'say',
    'this',
    'they',
    'at',
    'but',
    'we',
    'his',
    'from',
    'that',
    'not',
    'by',
    'she',
    'or',
    'as'
]

export const FREQUENT_WORDS: Record<Language, string[]> = {
    ru: FREQUENT_WORDS_RU,
    en: FREQUENT_WORDS_EN
}

const createWordRegex = (word: string) => 
    new RegExp(`\\s${word}[\\s\\.\\,\\!\\?]`, 'ig')

export const FREQUENT_WORDS_REGEX: Record<Language, RegExp[]> = {
    ru: FREQUENT_WORDS_RU.map(createWordRegex),
    en: FREQUENT_WORDS_EN.map(createWordRegex)
}

export const countFrequentWords = (
    text: string,
    language: Language
) => FREQUENT_WORDS_REGEX[language]
    .reduce((count, regexp) => count + (text.match(regexp)?.length ?? 0), 0)
