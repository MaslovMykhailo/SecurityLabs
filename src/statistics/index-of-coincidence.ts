export const INDEX_OF_COINCIDENCE = {
    'EN': 0.067,
    'RU': 0.054
}

export const findClosestIndexOfCoincidence = (
    indexesOfCoincidence: Record<number, number>,
    targetIndex: number
) => Object
    .entries(indexesOfCoincidence)
    .sort(([, index1], [, index2]) => 
        Math.abs(targetIndex - index1) - Math.abs(targetIndex - index2)
    )
