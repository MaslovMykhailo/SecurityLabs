export const unBitShiftRightXor = (value: number, shift: number) => {
    let i = 0
    let result = 0
    while (i * shift < 32) {
        const partMask = (-1 << (32 - shift)) >>> (shift * i)
        const part = value & partMask
        value ^= part >>> shift
        result |= part
        i++
    }
    return result
}

export const unBitShiftLeftXor = (value: number, shift: number, mask: number) => {
    let i = 0
    let result = 0
    while (i * shift < 32) {
        const partMask = (-1 >>> (32 - shift)) << (shift * i)
        const part = value & partMask
        value ^= (part << shift) & mask
        result |= part
        i++
    }
    return result
}
