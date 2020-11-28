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

export const shiftString = (string: string, shift: number) => {
    const charArray = string.split('')
    return [...charArray.slice(shift), ...charArray.slice(0, shift)].join('')
}
    
export const toChars = (string: string | string[]): string[] => 
    Array.isArray(string) ? string.flatMap(toChars) : string.split('')
