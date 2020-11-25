import path from 'path'

import { decodeRailFence } from '../algorithms'
import { FREQUENT_WORDS_RU } from '../statistic'
import { readFile, writeFile } from '../utils'

const FREQUENT_WORDS_REGEXP = FREQUENT_WORDS_RU
    .map(word => new RegExp(`\\s${word}[\\s\\.\\,\\!\\?]`, 'ig'))

const countFrequentWords = (text: string) => FREQUENT_WORDS_REGEXP
    .reduce((count, regexp) => count + (text.match(regexp)?.length ?? 0), 0)


export const solveEntryTask = async () => {
    const encodedMessage = await readFile(path.join(__dirname, 'task.txt'))
    let decodedMessage = '[Not decoded]'

    let step = 2
    do {
        const tempDecodedMessage = decodeRailFence(encodedMessage, step++)
        if (countFrequentWords(tempDecodedMessage) > encodedMessage.length * 0.02) {
            decodedMessage = tempDecodedMessage
            break
        }
    } while (step < 10)

    await writeFile(path.join(__dirname, 'solution.txt'), decodedMessage)
} 
