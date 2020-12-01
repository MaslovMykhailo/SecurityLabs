import path from 'path'

import {getDirFiles, readFile, writeFile} from '../../utils'

import {monograms, bigrams,  quadgrams, trigrams} from './records'

export type NGramRecords = Record<string, number>

export class NGrams {

    private nGrams: NGramRecords[] = [
        monograms,
        bigrams,
        trigrams,
        quadgrams
    ]

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

        await Promise.all(Object
            .entries(this.nGrams)
            .map(([nGramPeriod, nGramRecords]) => writeFile(
                path.join(__dirname, 'records', `records-${nGramPeriod}n.json`),
                JSON.stringify(nGramRecords, undefined, 4)
            ))
        ) 
    }

    public getNGrams = (n: number) => this.nGrams[n - 1]

    public calculateNGrams = (text: string, n: number) => {
        const nGrams: NGramRecords = {}
        let totalNGramCount = 0

        for (let index = 0; index < text.length - n - 1; index++) {
            const nGram = text.slice(index, index + n)
            const nGramCount = text.match(new RegExp(nGram, 'ig'))?.length ?? 0

            totalNGramCount += nGramCount
            nGrams[nGram] = nGramCount
        }

        return Object
            .entries(nGrams)
            .reduce(
                (records, [nGram, nGramCount]) => {
                    records[nGram] = nGramCount / totalNGramCount * 100
                    return records
                },
                nGrams
            )
    }

}

export const nGrams = new NGrams()
