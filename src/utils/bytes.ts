export const toByte = (data: string) => 
    Buffer.from(data)[0]

export const stringToByteArray = (data: string) => 
    Array.from(Buffer.from(data))

export const hexToByteArray = (hex: string) => 
    Array.from(Buffer.from(hex, 'hex'))

export const bytesToString = (bytes: number[] | Buffer) => 
    Buffer.from(bytes).toString()
