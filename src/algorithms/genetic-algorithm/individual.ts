import {GeneticAlgorithmParameters} from './genetic-algorythm-parameters'

export abstract class Individual<T> {

    protected fitness: number

    constructor(
        protected chromosome: T,
        protected parameters: GeneticAlgorithmParameters 
    ) {
        this.chromosome = chromosome
        this.parameters = parameters
        this.fitness = 0
    }

    public getChromosome = () => this.chromosome

    public getFitness = () => this.fitness

    public abstract calculateFitness(): number

    public recalculateFitness = () => 
        (this.fitness = this.calculateFitness())

    public abstract mate(individual: Individual<T>): Individual<T>

    public compareTo = (individual: Individual<T>) => 
        Individual.compare(individual, this)

    public static compare = <T>(individual1: Individual<T>, individual2: Individual<T>) =>
        individual2.getFitness() - individual1.getFitness();

}
