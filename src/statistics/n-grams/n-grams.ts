import path from 'path'

import {getDirFiles, readFile} from '../../utils'

export type NGram = Record<string, number>

class NGrams {

    private nGrams = Array(4)
        .fill(null)
        .reduce<Record<number, NGram>>(
            (nGrams, _, index) => {
                nGrams[index + 1] = {}
                return nGrams
            },
            {}
        )

    public prepare = async () => {
        const nGramFiles = await getDirFiles(path.join(__dirname, 'source'))
        const rawNGrams = await Promise.all(
            nGramFiles
                .map(fileName => path.join(path.join(__dirname, 'source', fileName)))
                .map(fileName => readFile(fileName))
        )
        
        rawNGrams.reduce(
            (records, rawNGram) => {
                const nGrams = rawNGram
                    .split('\n')
                    .map(pair => {
                        const [nGram, count] = pair.split(' ')
                        return [nGram, Number(count)] as const
                    })

                const totalCount = nGrams.reduce(
                    (count, [, nGramCount]) => count + nGramCount,
                    0
                )

                nGrams.forEach(([nGram, nGramCount]) => {
                    records[nGram.length][nGram] = nGramCount / totalCount * 100
                })

                return records
            },
            this.nGrams
        )
    }

    public getNGrams = (n: number) => this.nGrams[n]

}

export const nGrams = new NGrams()
