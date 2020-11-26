import path from 'path'

import { decodeRailFence } from '../algorithms'
import { calcFrequentWordsThreshold, countFrequentWords } from '../statistics'
import { readFile, writeFile } from '../utils'

const findTextRailFence = (
    encodedText: string,
    step = 2, 
    frequentWordsThreshold = calcFrequentWordsThreshold(encodedText)
): string => {
    if (step > 10) {
        return '[Not decoded]'
    }

    const decodedText = decodeRailFence(encodedText, step)
    return countFrequentWords(decodedText, 'ru') > frequentWordsThreshold ? 
        decodedText :
        findTextRailFence(encodedText, ++step, frequentWordsThreshold)
}

export const entryTask = async () => {
    const encodedMessage = await readFile(path.join(__dirname, 'task.txt'))
    const decodedMessage = findTextRailFence(encodedMessage)
    await writeFile(path.join(__dirname, 'solution.txt'), decodedMessage)
}
