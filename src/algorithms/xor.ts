import {LETTER_FREQUENCY_PERCENT_EN} from '../statistics'
import {toByte} from '../utils'

import {findFrequentLettersCompliance} from './frequent-letters-compliance'

export const applySingleByteXORCipher = (
    text: string,
    key: string | number
) => {
    const byteKey = typeof key === 'number' ? key % 255 : toByte(key)

    const cipherText = Array
        .from(Buffer.from(text))
        .map(byte => byte ^ byteKey)

    return String.fromCharCode(...cipherText)
}

export const decryptSingleByteXORCipher = (
    cipherText: string,
    possibleDecryptionsCount = 3
) => findFrequentLettersCompliance(
    cipherText,
    LETTER_FREQUENCY_PERCENT_EN,
    possibleDecryptionsCount
)
    .map(([letter, symbol]) => toByte(letter) ^ toByte(symbol))
    .map(byteKey => ({
        key: String.fromCharCode(byteKey),
        text: applySingleByteXORCipher(cipherText, byteKey)
    }))
