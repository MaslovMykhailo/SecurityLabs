import path from 'path'

import {decodeRailFence} from '../algorithms'
import {countFrequentWords, Language} from '../statistics'
import {readFile, writeFile} from '../utils'

const findRailFenceSolution = (
    encodedText: string,
    step = 2, 
    frequentWordsThreshold = 50
): string => {
    if (step > 10) {
        return '[Not decoded]'
    }

    const decodedText = decodeRailFence(encodedText, step)
    return countFrequentWords(decodedText, Language.RU) > frequentWordsThreshold ? 
        decodedText :
        findRailFenceSolution(encodedText, ++step, frequentWordsThreshold)
}

export const entryTask = async () => {
    const encodedMessage = await readFile(path.join(__dirname, 'task.txt'))
    const decodedMessage = findRailFenceSolution(encodedMessage)
    await writeFile(path.join(__dirname, 'solution.txt'), decodedMessage)
}
