export const getEachNSubstrings = (string: string, n: number) => string
    .split('')
    .reduce<string[][]>(
        (charArrays, char, index) => {
            charArrays[index % n].push(char)
            return charArrays
        },
        Array(n).fill(null).map(() => [])
    )
    .map(substring => substring.join(''))


// string
//     .split('')
//     .reduce<string[]>(
//         (charArray, char, index) => [
//             ...charArray,
//             ...(index % n === 1 ? [char] : [])
//         ], 
//         []
//     )
//     .join('')

export const shiftString = (string: string, shift: number) => {
    const charArray = string.split('')
    return [...charArray.slice(shift), ...charArray.slice(0, shift)].join('')
}
    
