import {getMostFrequentLetters} from '../statistics'

import {countSymbolsFrequencyPercent} from './symbols-frequency'

const findClosestFrequency = (
    frequentSymbolsMap: Record<string, number>,
    targetFrequency: number
) => Object
    .entries(frequentSymbolsMap)
    .reduce(
        ([closestSymbol, closestFrequency], [symbol, frequency]) => 
            Math.abs(targetFrequency - closestFrequency) < 
            Math.abs(targetFrequency - frequency) ?
                [closestSymbol, closestFrequency] :
                [symbol, frequency]
        ,
        Object.entries(frequentSymbolsMap)[0]
    )

export const findFrequentLettersCompliance = (
    text: string,
    frequentLettersMap: Record<string, number>,
    count = 3
) => {
    const symbolsFrequency = countSymbolsFrequencyPercent(text)
    const mostFrequentLetters = getMostFrequentLetters(frequentLettersMap, count)
    return mostFrequentLetters
        .map(([, targetFrequency]) => findClosestFrequency(symbolsFrequency, targetFrequency))
        .reduce<[string, string][]>(
            (compliance, [symbol], index) => [
                ...compliance,
                [mostFrequentLetters[index][0], symbol]
            ],
            []
        )
}
