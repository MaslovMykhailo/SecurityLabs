import path from 'path'

import {createPolyAlphabetSubstitutionCipherApplier, GeneticAlgorithmParametersBuilder, PolyAlphabetSubstitutionAlgorythm, SubstitutionContext} from '../../algorithms'
import {nGrams} from '../../statistics'
import {generateEnglishAlphabet, readFile, writeFile} from '../../utils'

export const task5 = async () => {
    const cipherText = await readFile(path.join(__dirname, 'task.txt'))

    const alphabet = generateEnglishAlphabet()
    const keys = new PolyAlphabetSubstitutionAlgorythm(
        new GeneticAlgorithmParametersBuilder()
            .setGenerationNumber(500)
            .setPopulationNumber(250)
            .setCrossover(0.65)
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
        .map(keys => keys.join(''))

    const applyPolyAlphabetSubstitutionCipher = createPolyAlphabetSubstitutionCipherApplier(alphabet, keys)
    const solution = applyPolyAlphabetSubstitutionCipher(cipherText)
    
    return writeFile(path.join(__dirname, 'solution.txt'), `KEY: ${keys}\n${solution}`)
}
