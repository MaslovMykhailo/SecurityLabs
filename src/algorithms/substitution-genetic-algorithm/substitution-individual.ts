import {swap} from '../../utils'
import {Individual, GeneticAlgorithmParameters} from '../genetic-algorithm'

import {SubstitutionContext} from './substitution-context'

export class SubstitutionIndividual extends Individual<string[]> {

    constructor(
        chromosome: string[],
        parameters: GeneticAlgorithmParameters,
        private context: SubstitutionContext
    ) {
        super(chromosome, parameters)
        this.context = context
        this.fitness = this.calculateFitness()
    }

    public calculateFitness = () => {
        const nGrams = this.context.calculateNGramsForSubstitution(
            this.chromosome
        )

        return Object
            .entries(nGrams)
            .reduce(
                (fitness, [nGram, nGramCount]) => 
                    fitness + nGramCount + Math.log2(
                        this.context.getNGrams()[nGram] || 0
                    ),
                0
            )
    }

    public mate = (substitutionIndividual: SubstitutionIndividual) => {
        const parentGenes = new Set(substitutionIndividual.chromosome)
        const parentGeneIndexes = new Set(
            this.chromosome.reduce<number[]>(
                (geneIndexes, gene, index) => {
                    if (Math.random() < this.parameters.crossover) {
                        geneIndexes.push(index)
                        parentGenes.delete(gene)
                    }

                    return geneIndexes
                },
                []
            )
        )

        const parentChromosome = Array.from(parentGenes)

        const childChromosome = this.chromosome.map(
            (parentGene, index) => 
                parentGeneIndexes.has(index) ?
                    parentGene :
                    parentChromosome.shift() as string
        )

        const child = new SubstitutionIndividual(
            childChromosome,
            this.parameters, 
            this.context
        )

        if (Math.random() < this.parameters.mutation) {
            child.mutate()
        }

        return child
    }

    public mutate = () => {
        const [gene1Index, gene2Index] = Array(2)
            .fill(null)
            .map(() => Math.floor(Math.random() * this.chromosome.length))

        this.chromosome = swap(this.chromosome, gene1Index, gene2Index)
    }

}
