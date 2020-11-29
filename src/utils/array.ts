export const swap = <T>(
    array: T[],
    index1: number,
    index2: number
) =>  {
    const swappedArray = [...array];

    [
        swappedArray[index1],
        swappedArray[index2]
    ] = [
        swappedArray[index2],
        swappedArray[index1]
    ]
    
    return swappedArray
}

export const shuffle = <T>(array: T[]) => [...array]
    .sort(() => Math.random() - 0.5)
