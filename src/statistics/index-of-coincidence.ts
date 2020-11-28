import {Language} from './language'

export const INDEX_OF_COINCIDENCE: Record<Language, number> = {
    [Language.EN]: 0.067,
    [Language.RU]: 0.054
}

export const findClosestIndexOfCoincidence = (
    indexesOfCoincidence: Record<number, number>,
    targetIndexLanguage: Language
) => {
    const targetIndex = INDEX_OF_COINCIDENCE[targetIndexLanguage]
    return Object
        .entries(indexesOfCoincidence)
        .sort(([, index1], [, index2]) => 
            Math.abs(targetIndex - index1) - 
            Math.abs(targetIndex - index2)
        )
} 
