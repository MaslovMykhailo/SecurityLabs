import {LETTER_FREQUENCY_PERCENT_EN} from '../statistics'

import {countSymbolFrequency} from './symbols-frequency'
import {applySingleByteXORCipher} from './xor'

export const calcChiSquareStatisticForXOR = (text: string) => Array(256)
    .fill(null)
    .map((_, index) => index).map(key => {
        const decryptedSymbols = applySingleByteXORCipher(text, key)
            .split('')

        const chiSquareStatistic = Object
            .entries(LETTER_FREQUENCY_PERCENT_EN)
            .reduce(
                (chiSquare, [letter, frequency]) => {
                    const targetFrequency = decryptedSymbols.length * frequency / 100
                    const letterFrequency = countSymbolFrequency(decryptedSymbols, letter)
                    return chiSquare + Math.pow(letterFrequency - targetFrequency, 2) / targetFrequency
                },
                0
            )

        return {key, chiSquareStatistic}
    })

export const findBestChiSquareStatisticForXOR = (text: string) => 
    calcChiSquareStatisticForXOR(text)
        .sort(
            (
                {chiSquareStatistic: chiSquare1}, 
                {chiSquareStatistic: chiSquare2}
            ) => chiSquare1 - chiSquare2
        )[0]

