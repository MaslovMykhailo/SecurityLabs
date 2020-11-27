import path from 'path'

import {decryptSingleByteXORCipher} from '../../algorithms'
import {readFile, writeFile} from '../../utils'

export const task2 = async () => {
    const cipherText = await readFile(path.join(__dirname, 'task.txt'))

    const [partialSolution] = decryptSingleByteXORCipher(cipherText, 1)
        .map(({key, text}) => `KEY: ${key}\n${text}`)

    await writeFile(path.join(__dirname, 'solution.txt'), partialSolution)
}
