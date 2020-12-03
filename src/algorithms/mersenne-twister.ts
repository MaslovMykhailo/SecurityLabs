import {unBitShiftLeftXor, unBitShiftRightXor} from '../utils'

export class MersenneTwister {
    
    public static N = 624

    public static M = 397

    private static UpperMask = 0x80000000

    private static LowerMask = 0x7fffffff

    public mt: number[] = []

    private mti = MersenneTwister.N + 1

    constructor(seed: number = Math.round(Math.random() * 1000)) {
        this.mt[0] = seed >>> 0
        for (this.mti = 1; this.mti < MersenneTwister.N; this.mti++) {
            const temp = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)
            this.mt[this.mti] = (
                ((((temp & 0xffff0000) >>> 16) * 1812433253) << 16) + 
                (temp & 0x0000ffff) * 1812433253
            ) + this.mti
            this.mt[this.mti] >>>= 0
        }
    }

    public next() {
        let temp
      
        if (this.mti >= MersenneTwister.N) {
            const mask01 = [0x0, 0x9908b0df]
            let i
      
            for (i = 0; i < MersenneTwister.N - MersenneTwister.M; i++) {
                temp = (this.mt[i] & MersenneTwister.UpperMask) | (this.mt[i + 1] & MersenneTwister.LowerMask)
                this.mt[i] = this.mt[i + MersenneTwister.M] ^ (temp >>> 1) ^ mask01[temp & 0x1]
            }

            for (; i < MersenneTwister.N - 1; i++) { 
                temp = (this.mt[i] & MersenneTwister.UpperMask) | (this.mt[i + 1] & MersenneTwister.LowerMask)
                this.mt[i] = this.mt[i + (MersenneTwister.M - MersenneTwister.N)] ^ (temp >>> 1) ^ mask01[temp & 0x1]
            }

            temp = (this.mt[MersenneTwister.N - 1] & MersenneTwister.UpperMask) | (this.mt[0] & MersenneTwister.LowerMask)
            this.mt[MersenneTwister.N - 1] = this.mt[MersenneTwister.M - 1] ^ (temp >>> 1) ^ mask01[temp & 0x1]
      
            this.mti = 0
        }
      
        temp = this.mt[this.mti++]

        return MersenneTwister.temping(temp)
    }

    public getMT() {
        return this.mt
    }

    public setMT(mt: number[]) {
        this.mt = mt
    }

    public static fromMT(mt: number[]) {
        const rng = new MersenneTwister()
        rng.setMT(mt.map(MersenneTwister.unTemping))
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
