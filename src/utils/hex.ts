export const hexToBytes = (hex: string) => {
    const bytesArray: number[] = []
    
    for (let i = 0; i < hex.length; i += 2) {
        bytesArray.push(
            parseInt(hex.substr(i, 2), 16)    
        )
    }

    return bytesArray
}

export const hexToChars = (hex: string) => 
    String.fromCharCode(...hexToBytes(hex))

export const hexToString = (hex: string) => 
    Buffer.from(hex, 'hex').toString()

export const stringToHex = (string: string) => 
    Buffer.from(string).toString('hex')

