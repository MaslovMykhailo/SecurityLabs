export const mod = (
    a: bigint,
    b: bigint
) => ((a % b) + b) % b

const egcd = (
    a: bigint,
    b: bigint
): [bigint, bigint, bigint] => {
    if (!a) {
        return [b, BigInt(0), BigInt(1)]
    } 
    const [g, y, x] = egcd(b % a, a)
    return [g, x - y * ~~(b / a), y]
}
export const modinv = (
    a: bigint,
    n: bigint
) => {
    const [g, x] = egcd(a, n)
    if (Number(g) !== 1) return BigInt(0)
    return x % n < 0 ? n + x % n : x % n
}
