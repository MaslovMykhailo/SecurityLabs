import {unBitShiftLeftXor, unBitShiftRightXor} from '../utils'

export class MersenneTwister {
    
    public static N = 624

    public static M = 397

    private static UpperMask = 0x80000000

    private static LowerMask = 0x7fffffff

    public mtStates: number[] = []

    private mtIndex = MersenneTwister.N + 1

    constructor(seed: number = Math.round(Math.random() * 1000)) {
        this.mtStates[0] = seed >>> 0
        for (this.mtIndex = 1; this.mtIndex < MersenneTwister.N; this.mtIndex++) {
            const temp = this.mtStates[this.mtIndex - 1] ^ (this.mtStates[this.mtIndex - 1] >>> 30)
            this.mtStates[this.mtIndex] = (
                ((((temp & 0xffff0000) >>> 16) * 1812433253) << 16) + 
                (temp & 0x0000ffff) * 1812433253
            ) + this.mtIndex
            this.mtStates[this.mtIndex] >>>= 0
        }
    }

    public next() {
        let temp
      
        if (this.mtIndex >= MersenneTwister.N) {
            const mask01 = [0x0, 0x9908b0df]
            let i
      
            for (i = 0; i < MersenneTwister.N - MersenneTwister.M; i++) {
                temp = (this.mtStates[i] & MersenneTwister.UpperMask) | (this.mtStates[i + 1] & MersenneTwister.LowerMask)
                this.mtStates[i] = this.mtStates[i + MersenneTwister.M] ^ (temp >>> 1) ^ mask01[temp & 0x1]
            }

            for (; i < MersenneTwister.N - 1; i++) { 
                temp = (this.mtStates[i] & MersenneTwister.UpperMask) | (this.mtStates[i + 1] & MersenneTwister.LowerMask)
                this.mtStates[i] = this.mtStates[i + (MersenneTwister.M - MersenneTwister.N)] ^ (temp >>> 1) ^ mask01[temp & 0x1]
            }

            temp = (this.mtStates[MersenneTwister.N - 1] & MersenneTwister.UpperMask) | (this.mtStates[0] & MersenneTwister.LowerMask)
            this.mtStates[MersenneTwister.N - 1] = this.mtStates[MersenneTwister.M - 1] ^ (temp >>> 1) ^ mask01[temp & 0x1]
      
            this.mtIndex = 0
        }
      
        temp = this.mtStates[this.mtIndex++]

        return MersenneTwister.temping(temp)
    }

    public getMTStates() {
        return this.mtStates
    }

    public setMTStates(mt: number[]) {
        this.mtStates = mt
    }

    public static fromMTStates(mtStates: number[]) {
        const rng = new MersenneTwister()
        rng.setMTStates(mtStates.map(MersenneTwister.unTemping))
        return rng
    }

    private static temping(temp: number) {
        temp ^= (temp >>> 11)
        temp ^= (temp << 7) & 0x9d2c5680
        temp ^= (temp << 15) & 0xefc60000
        temp ^= (temp >>> 18)
        return temp >>> 0
    }

    private static unTemping(temp: number) {
        temp = unBitShiftRightXor(temp, 18)
        temp = unBitShiftLeftXor(temp, 15, 0xefc60000)
        temp = unBitShiftLeftXor(temp, 7, 0x9d2c5680)
        temp = unBitShiftRightXor(temp, 11)
        return temp >>> 0
    }

}
