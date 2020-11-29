export type GeneticAlgorithmParameters = {
    generationNumber: number;
    populationNumber: number;
    crossover: number;
    mutation: number;
    elitism: number;
}

const GENETIC_ALGORITHM_DEFAULT_PARAMETERS: GeneticAlgorithmParameters = {
    generationNumber: 100,
    populationNumber: 100,
    crossover: 0.5,
    mutation: 0.5,
    elitism: 0.5
}

export class GeneticAlgorithmParametersBuilder {
    
    private parameters = {...GENETIC_ALGORITHM_DEFAULT_PARAMETERS}

    public setGenerationNumber = (generationNumber: number) => {
        this.parameters.generationNumber = generationNumber
        return this
    }

    public setPopulationNumber = (populationNumber: number) => {
        this.parameters.populationNumber = populationNumber
        return this
    }

    public setCrossover = (crossover: number) => {
        this.parameters.crossover = crossover
        return this
    }

    public setMutation = (mutation: number) => {
        this.parameters.mutation = mutation
        return this
    }

    public setElitism = (elitism: number) => {
        this.parameters.elitism = elitism
        return this
    }

    public getParameters = () => this.parameters

}
