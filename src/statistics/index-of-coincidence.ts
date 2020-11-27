export const INDEX_OF_COINCIDENCE = {
    'en': 0.067,
    'ru': 0.054
}

export const findClosestIndexOfCoincidence = (
    indexesOfCoincidence: Record<number, number>,
    targetIndex: number
) => Object
    .entries(indexesOfCoincidence)
    .sort(([, index1], [, index2]) => 
        Math.abs(targetIndex - index1) - Math.abs(targetIndex - index2)
    )
