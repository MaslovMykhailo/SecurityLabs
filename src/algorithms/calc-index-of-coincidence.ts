import {getEachNSubstrings} from '../utils'

import {countSymbolsFrequency} from './count-symbols-frequency'

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
    maxStep = 25
) => Array(maxStep)
    .fill(null)
    .map((_, step) => getEachNSubstrings(text, step + 1))
    .map(subtexts => subtexts
        .map(calcIndexOfCoincidence)
        .reduce(
            (sum, indexOfCoincidence) => sum + indexOfCoincidence,
            0
        ) / subtexts.length
    )
