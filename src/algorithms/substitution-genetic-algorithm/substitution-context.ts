import {NGrams} from '../../statistics'
import {applySubstitutionCipher} from '../substitution-cipher'

export class SubstitutionContext {

    constructor(
        public text: string,
        public alphabet: string[],
        public nGrams: NGrams,
        public nGramsPeriod: number
    ) {
        this.nGrams = nGrams
        this.nGramsPeriod = nGramsPeriod
    }

    public getNGrams = () => 
        this.nGrams.getNGrams(this.nGramsPeriod)

    public calculateNGrams = (text: string) => 
        this.nGrams.calculateNGrams(text, this.nGramsPeriod)

    public applySubstitutionCipher = (key: string[]) => 
        applySubstitutionCipher(this.text, this.alphabet, key)

    public calculateNGramsForSubstitution = (key: string[]) => 
        this.calculateNGrams(this.applySubstitutionCipher(key))

}
