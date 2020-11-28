import path from 'path'

import {applySingleByteXORCipher, calcIndexOfCoincidenceByKeyLength, findBestChiSquareStatisticForXOR} from '../../algorithms'
import {findClosestIndexOfCoincidence, Language} from '../../statistics'
import {getEachNSubstrings, hexToChars, readFile, writeFile} from '../../utils'

export const task3 = async () => {
    const hexCipherText = await readFile(path.join(__dirname, 'task.txt'))
    const cipherText = hexToChars(hexCipherText)

    const indexesOfCoincidence = calcIndexOfCoincidenceByKeyLength(cipherText)
    const closestIndexes = findClosestIndexOfCoincidence(indexesOfCoincidence, Language.EN)      

    const [[bestSmallerKeyLength]] = closestIndexes
        .slice(0, 5)
        .sort(([length1], [length2]) => Number(length1) - Number(length2))

    const byteKey = getEachNSubstrings(cipherText, Number(bestSmallerKeyLength))
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
