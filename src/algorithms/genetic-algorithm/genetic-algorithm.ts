import {Individual} from './individual'
import {Population} from './population'

export abstract class GeneticAlgorithm<T> {

    constructor(private population: Population<T>) {
        this.population = population
    }

    abstract solve(): Individual<T> 

    public abstract performElitism(population: Population<T>): Population<T>  

    public abstract performMutation(parent1: Individual<T>, parent2: Individual<T>): Individual<T>

    public getFittestPopulation = () => 
        this.population.sort(Individual.compare)

}
