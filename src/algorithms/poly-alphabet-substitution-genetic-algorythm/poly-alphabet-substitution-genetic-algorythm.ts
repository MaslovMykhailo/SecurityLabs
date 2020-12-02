import {GeneticAlgorithmParameters} from '../genetic-algorithm'
import {determineKeyLength} from '../key-length'
import {SubstitutionContext, SubstitutionGeneticAlgorithm} from '../substitution-genetic-algorithm'

import {PolyAlphabetSubstitutionContext} from './poly-alphabet-substitution-context'

export class PolyAlphabetSubstitutionAlgorythm {

    private contexts: PolyAlphabetSubstitutionContext[]

    private subAlgorithms: SubstitutionGeneticAlgorithm[]

    constructor(
        private parameters: GeneticAlgorithmParameters,
        private context: SubstitutionContext
    ) {
        this.parameters = parameters
        this.context = context

        const keyLength = determineKeyLength(this.context.text)

        this.contexts = Array(keyLength)
            .fill(null)
            .map((_, index) => new PolyAlphabetSubstitutionContext(
                this.context.text,
                this.context.alphabet,
                this.context.nGrams,
                this.context.nGramsPeriod,
                index,
                Array(keyLength).fill(null).map(() => this.context.alphabet)
            ))

        this.subAlgorithms = this.contexts
            .map(context => new SubstitutionGeneticAlgorithm(
                this.parameters,
                context
            ))
    }

    private updateKeys = (keys: string[][]) => {
        this.contexts.forEach(context => context.updateKeys(keys)) 
        this.subAlgorithms.forEach(
            geneticAlgorithm => geneticAlgorithm
                .recalculateFitness(geneticAlgorithm.getPopulation())
        )
    }
        

    private getFittestKeys = () => this.subAlgorithms
        .map(geneticAlgorithm => geneticAlgorithm
            .getPopulation()[0]
            .getChromosome()
        )


    private nextGeneration = () => this.subAlgorithms
        .forEach(geneticAlgorithm => {
            const prevPopulation = geneticAlgorithm.getPopulation()
            const nextPopulation = geneticAlgorithm.nextGeneration(prevPopulation)
            geneticAlgorithm.setPopulation(nextPopulation)
        })
    

    public solve = () => Array(this.parameters.generationNumber)
        .fill(null)
        .reduce<string[][]>(
            keys => {
                this.updateKeys(keys)
                this.nextGeneration()
                return this.getFittestKeys()
            },
            this.getFittestKeys()
        )

}
