import {findClosestIndexOfCoincidence, Language} from '../statistics'

import {calcIndexOfCoincidenceByKeyLength} from './index-of-coincidence'

export const determineKeyLength = (
    cipherText: string, 
    maxKeyLength = 25
) => {
    const indexesOfCoincidence = calcIndexOfCoincidenceByKeyLength(cipherText, maxKeyLength)
    const closestIndexes = findClosestIndexOfCoincidence(indexesOfCoincidence, Language.EN)      

    const [[bestSmallerKeyLength]] = closestIndexes
        .slice(0, Math.round(maxKeyLength * 0.2))
        .sort(([length1], [length2]) => Number(length1) - Number(length2))

    return Number(bestSmallerKeyLength)
}
