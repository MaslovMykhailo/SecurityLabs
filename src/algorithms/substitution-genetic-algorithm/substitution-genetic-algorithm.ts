import {shuffle} from '../../utils'
import {GeneticAlgorithm, GeneticAlgorithmParameters, Individual} from '../genetic-algorithm'

import {SubstitutionContext} from './substitution-context'
import {SubstitutionIndividual} from './substitution-individual'
import {SubstitutionPopulation} from './substitution-population'

export class SubstitutionGeneticAlgorithm extends GeneticAlgorithm<string[]> {

    private population: SubstitutionPopulation

    constructor(
        parameters: GeneticAlgorithmParameters,
        private context: SubstitutionContext
    ) {
        super(parameters)
        this.context = context
        this.population = this.createInitialPopulation()
    }

    public getPopulation = () => 
        this.population

    public setPopulation = (population: SubstitutionPopulation) => 
        (this.population = population)

    public createInitialPopulation = () => Array(this.parameters.populationNumber)
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

    public solve = () => Array(this.parameters.generationNumber)
        .fill(null)
        .reduce(this.nextGeneration, this.population)[0]
        .getChromosome()

}
