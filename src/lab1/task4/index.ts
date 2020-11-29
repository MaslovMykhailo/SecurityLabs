import path from 'path'

import {applySubstitutionCipher, GeneticAlgorithmParametersBuilder, SubstitutionContext, SubstitutionGeneticAlgorithm} from '../../algorithms'
import {nGrams} from '../../statistics'
import {generateEnglishAlphabet, readFile, writeFile} from '../../utils'

export const task4 = async () => {
    const cipherText = await readFile(path.join(__dirname, 'task.txt'))

    const alphabet = generateEnglishAlphabet()
    const key = new SubstitutionGeneticAlgorithm(
        new GeneticAlgorithmParametersBuilder()
            .setGenerationNumber(2500)
            .setPopulationNumber(250)
            .setCrossover(0.65)
            .setMutation(0.15)
            .setElitism(0.55)
            .getParameters(),
        new SubstitutionContext(
            cipherText,
            alphabet,
            nGrams,
            3
        )
    )
        .solve()
        .getChromosome()
        .join('')
        

    const solution = applySubstitutionCipher(cipherText, alphabet, key)
    await writeFile(path.join(__dirname, 'solution.txt'), `KEY: ${key}\n${solution}`)
}
