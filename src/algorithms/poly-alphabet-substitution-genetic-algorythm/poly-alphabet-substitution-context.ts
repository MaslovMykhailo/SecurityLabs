import {NGrams} from '../../statistics'
import {applyPolyAlphabetSubstitutionCipher} from '../substitution-cipher'
import {SubstitutionContext} from '../substitution-genetic-algorithm'

export class PolyAlphabetSubstitutionContext extends SubstitutionContext {
    
    constructor(
        text: string,
        alphabet: string[],
        nGrams: NGrams,
        nGramsPeriod: number,
        private keyIndex: number,
        private keys: string[][]
    ) {
        super(text, alphabet, nGrams, nGramsPeriod)
        this.keyIndex = keyIndex
        this.keys = keys
    }

    public updateKeys = (keys: string[][]) => {
        this.keys = keys
    }

    public applySubstitutionCipher = (key: string[]) => {
        const keys = [...this.keys]
        keys[this.keyIndex] = key

        return applyPolyAlphabetSubstitutionCipher(
            this.text,
            this.alphabet,
            keys
        )
    }

}
