import {getEachNSubstrings} from '../utils'

import {countSymbolsFrequency} from './symbols-frequency'

export const calcIndexOfCoincidence = (text: string) => Object
    .values(countSymbolsFrequency(text))
    .reduce(
        (coincidence, frequency) => coincidence + (
            frequency * (frequency - 1)
        ), 
        0
    ) / (text.length * (text.length - 1))


export const calcIndexOfCoincidenceByKeyLength = (
    text: string,
    maxKeyLength = 25
) => Array(maxKeyLength)
    .fill(null)
    .map((_, step) => getEachNSubstrings(text, step + 1))
    .reduce<Record<number, number>>(
        (map, subtexts) => {
            const averageIndexOfCoincidence = subtexts
                .map(calcIndexOfCoincidence)
                .reduce(
                    (sum, indexOfCoincidence) => sum + indexOfCoincidence,
                    0
                ) / subtexts.length

            map[subtexts.length] = averageIndexOfCoincidence    
            return map
        },
        {}
    )
