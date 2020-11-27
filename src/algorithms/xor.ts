import {LETTER_FREQUENCY_PERCENT_EN} from '../statistics'
import {toByte} from '../utils'

import {findFrequentLettersCompliance} from './find-frequent-letters-compliance'

export const encryptSingleByteXORCipher = (text: string, key: string) => {
    const byteKey = toByte(key)
    const cipherText = Array.from(Buffer.from(text))
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
        text: String.fromCharCode(
            ...Array
                .from(Buffer.from(cipherText))
                .map(byte => byte ^ byteKey)
        )
    }))
