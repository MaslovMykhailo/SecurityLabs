import path from 'path'

import {createSubstitutionCipherApplier, GeneticAlgorithmParametersBuilder, SubstitutionContext, SubstitutionGeneticAlgorithm} from '../../algorithms'
import {nGrams} from '../../statistics'
import {generateEnglishAlphabet, readFile, writeFile} from '../../utils'

export const task4 = async () => {
    const cipherText = await readFile(path.join(__dirname, 'task.txt'))

    const alphabet = generateEnglishAlphabet()
    const key = new SubstitutionGeneticAlgorithm(
        new GeneticAlgorithmParametersBuilder()
            .setGenerationNumber(500)
            .setPopulationNumber(250)
            .setCrossover(0.6)
            .setMutation(0.3)
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
        .join('')

    const applySubstitutionCipher = createSubstitutionCipherApplier(alphabet, key)    
    const solution = applySubstitutionCipher(cipherText)
    
    return writeFile(path.join(__dirname, 'solution-.txt'), `KEY: ${key}\n${solution}`)
}
