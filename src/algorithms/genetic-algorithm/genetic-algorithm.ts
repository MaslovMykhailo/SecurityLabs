import {Individual} from './individual'
import {Population} from './population'
import {GeneticAlgorithmParameters} from './genetic-algorythm-parameters'

export abstract class GeneticAlgorithm<T> {

    constructor(protected parameters: GeneticAlgorithmParameters) {
        this.parameters = parameters
    }

    abstract solve(): Individual<T> 

    public tournamentSelection = (population: Population<T>) => {
        const fittestPopulation = this.getFittestPopulation(population)
        const fittestCount = Math.round(Math.max(0.55, this.parameters.elitism) * population.length)
        return fittestPopulation.slice(0, fittestCount)
    }

    public crossover = (population: Population<T>, childCount: number) => {
        const children = Array(childCount)
            .fill(null)
            .map((_, index) => {
                const parent = population[index]
                const matesPopulation = population.slice(index + 1)
                return parent.mate(this.getRandomIndividual(matesPopulation))
            })
        return [...children, ...population]
    } 

    public getFittestPopulation = (population: Population<T>) => 
        [...population].sort(Individual.compare)

    public getRandomIndividual = (population: Population<T>) => 
        population[Math.floor(Math.random() * population.length)]

}
