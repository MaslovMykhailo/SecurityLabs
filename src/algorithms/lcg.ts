import {mod, modinv} from '../utils'

export class LCG {

    private state: bigint

    constructor(
        private multiplier: bigint,
        private increment: bigint,
        private modulus: bigint,
        seed: bigint
    ) {
        this.multiplier = multiplier
        this.increment = increment
        this.modulus = modulus
        this.state = seed
    }

    public next() {
        this.state = mod(this.state * this.multiplier + this.increment, this.modulus)
        return this.state
    }

}

export type LCGParams = {
    multiplier: bigint;
    increment: bigint;
    modulus: bigint;
}

export const calculateUnknownIncrement = (
    multiplier: bigint,
    modulus: bigint,
    states: bigint[]
): LCGParams => {
    const increment = mod(states[1] - states[0] * multiplier, modulus)
    return {multiplier, increment, modulus}
} 

export const calculateUnknownMultiplier = (
    modulus: bigint,
    states: bigint[]
): LCGParams => calculateUnknownIncrement(
    (states[2] - states[1]) * mod(modinv(states[1] - states[0], modulus), modulus),
    modulus,
    states
)
