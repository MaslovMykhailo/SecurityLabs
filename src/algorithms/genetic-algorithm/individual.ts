export abstract class Individual<T> {

    constructor(
        private chromosome: T, 
        private fitness: number
    ) {
        this.chromosome = chromosome
        this.fitness = this.calculateFitness()
    }

    public getChromosome = () => this.chromosome

    public getFitness = () => this.fitness

    abstract calculateFitness(): number

    abstract mate(individual: Individual<T>): Individual<T>

    public compareTo = (individual: Individual<T>) => 
        Individual.compare(this, individual)

    public static compare = <T>(individual1: Individual<T>, individual2: Individual<T>) =>
        individual1.getFitness() - individual2.getFitness();

}
