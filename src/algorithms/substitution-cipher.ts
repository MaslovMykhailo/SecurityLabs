import {toChars} from '../utils'

type CharSet = string | string[] 

export const createSubstitutionCipherApplier = (
    alphabet: CharSet,
    key: CharSet
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
    alphabet: CharSet,
    key: CharSet
) => createSubstitutionCipherApplier(alphabet, key)(text)

export const createPolyAlphabetSubstitutionCipherApplier = (
    alphabet: CharSet,
    keys: CharSet[]
) => {
    const cipherAppliers = keys
        .map(toChars)
        .map(key => createSubstitutionCipherApplier(alphabet, key))
    
    return (text: string) => text
        .split('')
        .map((symbol, index) => {
            const applyCipher = cipherAppliers[index % cipherAppliers.length]
            return applyCipher(symbol) ?? ''
        })
        .join('')
}

export const applyPolyAlphabetSubstitutionCipher = (
    text: string,
    alphabet: CharSet,
    keys: CharSet[]
) => createPolyAlphabetSubstitutionCipherApplier(alphabet, keys)(text)
