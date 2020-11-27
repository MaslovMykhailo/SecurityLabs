export const hexToChars = (hex: string) => {
    const charCodes: number[] = []
    
    for (let i = 0; i < hex.length; i += 2) {
        charCodes.push(
            parseInt(hex.substr(i, 2), 16)    
        )
    }

    return String.fromCharCode(...charCodes)
}
