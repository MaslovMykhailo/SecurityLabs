import path from 'path'

import {countFrequentWords, Language} from '../statistics'
import {readFile, writeFile} from '../utils'

const findBase64Solution = (
    encodedText: string,
    frequentWordsThreshold = 1
): string => {
    const buffer = Buffer.from(encodedText, 'base64')
    const decodedText = buffer.toString('utf8')
    return countFrequentWords(decodedText, Language.EN) > frequentWordsThreshold ?
        decodedText : 
        findBase64Solution(decodedText, frequentWordsThreshold)
}

export const intro = async () => {
    const encodedMessage = await readFile(path.join(__dirname, 'task.txt'))
    const decodedMessage = findBase64Solution(encodedMessage)
    await writeFile(path.join(__dirname, 'solution.txt'), decodedMessage)
} 
