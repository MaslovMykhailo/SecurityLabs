import {shuffle} from '../../utils'
import {GeneticAlgorithm, Individual, GeneticAlgorithmParameters} from '../genetic-algorithm'

import {SubstitutionContext} from './substitution-context'
import {SubstitutionIndividual} from './substitution-individual'
import {SubstitutionPopulation} from './substitution-population'

export class SubstitutionGeneticAlgorithm extends GeneticAlgorithm<string[]> {

    constructor(
        parameters: GeneticAlgorithmParameters,
        private context: SubstitutionContext
    ) {
        super(parameters)
        this.context = context
    }

    public solve = () => {
        const initialPopulation = Array(this.parameters.populationNumber)
            .fill(null)
            .reduce<string[][]>(
                (chromosome, _, index) => {
                    chromosome[index] = shuffle(this.context.alphabet)
                    return chromosome
                },
                []
            )
            .map(candidate => new SubstitutionIndividual(
                candidate,
                this.parameters,
                this.context
            ))

        return Array(this.parameters.generationNumber)
            .fill(null)
            .reduce<SubstitutionPopulation>(
                (population) => {
                    const fittestPopulation = this.tournamentSelection(population)
                    const childCount = population.length - fittestPopulation.length
                    return this.crossover(fittestPopulation, childCount).sort(Individual.compare)
                }, 
                initialPopulation
            )[0]
    }

}
