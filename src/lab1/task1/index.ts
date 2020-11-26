import path from 'path'

import {findFrequentLettersCompliance} from '../../algorithms'
import {LETTER_FREQUENCY_EN} from '../../statistics'
import {readFile, toByte, writeFile} from '../../utils'

const encryptXORCipher = (text: string, key: string) => {
    const byteKey = toByte(key)
    const cipherText = Array.from(Buffer.from(text))
        .map(byte => byte ^ byteKey)
    return String.fromCharCode(...cipherText)
}

const decryptXORCipher = (
    cipherText: string,
    possibleDecryptionsCount = 3
) => findFrequentLettersCompliance(
    cipherText,
    LETTER_FREQUENCY_EN,
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

export const task1 = async () => {
    const text = await readFile(path.join(__dirname, 'sample.txt'))

    const cipherText = encryptXORCipher(text, 'X')
    await writeFile(path.join(__dirname, 'encrypted-sample.txt'), cipherText)

    const possibleTexts = decryptXORCipher(cipherText)
    await Promise.all(possibleTexts.map(
        ({key, text}, index) => writeFile(
            path.join(__dirname, `decrypted-sample-${index + 1}.txt`), 
            `KEY: ${key}\n${text}`
        )
    ))
}
