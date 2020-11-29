import path from 'path'

import {applySingleByteXORCipher, determineKeyLength, findBestChiSquareStatisticForXOR} from '../../algorithms'
import {getEachNSubstrings, hexToChars, readFile, writeFile} from '../../utils'

export const task3 = async () => {
    const hexCipherText = await readFile(path.join(__dirname, 'task.txt'))
    const cipherText = hexToChars(hexCipherText)

    const keyLength = determineKeyLength(cipherText)

    const byteKey = getEachNSubstrings(cipherText, keyLength)
        .map(findBestChiSquareStatisticForXOR)
        .reduce<number[]>(
            (key, statistic) => [...key, statistic.key],
            []
        )

    const key = String.fromCharCode(...byteKey)

    const solution = cipherText
        .split('')
        .map(
            (encodedChar, index) => applySingleByteXORCipher(
                encodedChar,
                byteKey[index % byteKey.length]
            )
        )
        .join('')
    
    await writeFile(path.join(__dirname, 'solution.txt'), `KEY: ${key}\n${solution}`)
}
