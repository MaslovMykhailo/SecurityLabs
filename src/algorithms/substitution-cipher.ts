import {toChars} from '../utils'

export const createSubstitutionCipherApplier = (
    alphabet: string | string[],
    key: string | string[]
) => (text: string) => {
    const alphabetChars = toChars(alphabet)
    const keyChars = toChars(key)

    const alphabetMap = alphabetChars
        .reduce<Record<string, string>>(
            (map, letter, index) => {
                map[letter] = keyChars[index % keyChars.length]
                return map
            }, 
            {}  
        )

    return text
        .split('')
        .map(symbol => alphabetMap[symbol] ?? '')
        .join('')
}

export const applySubstitutionCipher = (
    text: string,
    alphabet: string | string[],
    key: string | string[]
) => createSubstitutionCipherApplier(alphabet, key)(text)
