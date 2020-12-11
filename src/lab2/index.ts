import {applyXOR} from '../algorithms'
import {bytesToString, hexToByteArray, stringToByteArray, LineReaderFactory} from '../utils'

import {MOST_COMMON_WORDS} from './most-common-words'

const WORDS = MOST_COMMON_WORDS
    .filter(word => word.length > 1)
    .sort((word1, word2) => word2.length - word1.length)

const POSSIBLE_SYMBOLS_REGEXP = /[a-zA-Z.,?! :;'"]/

const CIPHER_TEXT_LINES = [
    'ad924af7a9cdaf3a1bb0c3fe1a20a3f367d82b0f05f8e75643ba688ea2ce8ec88f4762fbe93b50bf5138c7b699',
    'a59a0eaeb4d1fc325ab797b31425e6bc66d36e5b18efe8060cb32edeaad68180db4979ede43856a24c7d',
    'a59a0eaeaad7fc3c56fe82fd1f6bb5a769c43a0f0cfae74f0df56fdae3db8d9d840875ecae2557bf563fcea2',
    'a59a0eaea8ddf93c08fe81e11e2ab2bb6d962f0f1af2f44243b46cc1b6d6c291995d65a9a5234aa204',
    'ad924af7a9cdaf3a1bb0c3f51439a5b628cf215a1fbdee4302a77a8ea2cc86c8984d65ffac6c58bf5b71dab8841136',
    'b09b4afda3caf93c5aa78ce6096bb2a67ad86e4302f3e10602b37acbb1829680935137e8bb2919b6503fccfdca5461',
    'a59a0eaeb5d7af3115b287b31425e6a460d3200f19f5e35406f567dde3cc8d9c9e4179eee92557f1463edc',
    'a18c09ebb6ccaf2d12bbc3c41227aaf37fde274c05bdf5471aa62edaac82968093452da9eb0456bd5b71c6bfcb56',
    'ad924af7a9cdaf3a1bb0c3e71a27adf37fdf3a474dfef44914b17d8ea2cc86c89d4d72f9e93556a44d71dfb8980034b3cea5c4d4',
    'ab864af9a7d4e4790db797fb5b00afbd6fc5acaff9f3e95443b961dda6829680930874e6a42156bf1f25c6a4891c6d',
    'ad924ae0a3d1fb311facc3f5142eb5f366d93c0f01f2f04f0db22ec8b1cb8786925b37eaa82219b94a23ddf1931b34fa',
    'ad924aefaad4af341fb0c3f0143ea8a728c1275b05bdff4916f92eccb6d6c286994672a9bd2356f15224cab9d1',
    'ad924af7a9cdaf3a1bb0c3f51227aaf37cde2b0f18f3e04911b267d8aacc85c89b4179fcbd29',
    'b39d1ee6e6cbe6210ea7c3e01e28a9bd6cc5690f1af2f4520bf561c8e3c68b9b824979eaac6c4ba4517d89f1ca',
    'bd9b1ffcb598e62a5aaa8bf65b0ea7a17cde6e4e03f9a64315b07cd7b7ca8b86910863e1a8381ea21f38c7f183006df6c2a5',
    'a59a0e6c462cf83113bd8bb31238e6be67c42bcded09ff4916f262c2e3c087c897085ae8a76019bc4671dabe8455'
]


const isReadableText = (text: string) => !text
    .split('')
    .some(symbol => !POSSIBLE_SYMBOLS_REGEXP.test(symbol))

const toMinLength = (...strings: string[]) => {
    const minLength = Math.min(...strings.map(s => s.length))
    return strings.map(s => s.substr(0, minLength))
}

const toPairs = <T>(array: T[]) => array
    .reduce<[T, T][]>(
        (pairs, item, index) => {
            if (index < array.length - 1) {
                pairs[index] = [item, array[index + 1]]
            } else {
                pairs[index] = [item, array[0]]
            }
            return pairs
        },
        []
    )

function applyPossibleText(text: string, cipherPair: [string, string]) {
    const textBytes = stringToByteArray(text)
        
    const [line1Bytes, line2Bytes] = toMinLength(...cipherPair).map(hexToByteArray)
    const xorBytes = applyXOR(line1Bytes, line2Bytes)
    
    for (let i = 0; i < xorBytes.length - textBytes.length; i++) {
        const xorBytesPart = xorBytes.slice(i, i + textBytes.length)
        const possiblePartBytes = applyXOR(xorBytesPart, textBytes)
            
        const possiblePart = bytesToString(possiblePartBytes)
        
        if (isReadableText(possiblePart)) {
    
            const [possibleLine1, possibleLine2] = [line1Bytes, line2Bytes].map(
                line => line.map(() => '_')
            )
        
            for (let j = i; j < i + textBytes.length; j++) {
                possibleLine1[j] = possiblePart[j - i]
                possibleLine2[j] = text[j - i]
            }
    
            console.log(`Line1: ${possibleLine1.join('')}`)
            console.log(`Line2: ${possibleLine2.join('')}`)
            console.log('\n')
        }
    
    }
}

export const lab2 = async () => {
    const lineReader = LineReaderFactory()

    const pairs = toPairs(CIPHER_TEXT_LINES)

    for (const word of WORDS) {

        const caption = `Try to apply word: ${word}`

        console.log(caption)
        console.log('='.repeat(caption.length))

        const wordBytes = stringToByteArray(word)

        for (const pairIndex in pairs) {

            console.log(`Pair index: ${pairIndex}`)

            const pair = pairs[pairIndex]

            const [line1Bytes, line2Bytes] = toMinLength(...pair).map(hexToByteArray)
            const xorBytes = applyXOR(line1Bytes, line2Bytes)

            for (let i = 0; i < xorBytes.length - wordBytes.length; i++) {
                const xorBytesPart = xorBytes.slice(i, i + wordBytes.length)
                const possiblePartBytes = applyXOR(xorBytesPart, wordBytes)
        
                const possiblePart = bytesToString(possiblePartBytes)
    
                if (isReadableText(possiblePart)) {

                    const [possibleLine1, possibleLine2] = [line1Bytes, line2Bytes].map(
                        line => line.map(() => '_')
                    )
    
                    for (let j = i; j < i + wordBytes.length; j++) {
                        possibleLine1[j] = possiblePart[j - i]
                        possibleLine2[j] = word[j - i]
                    }

                    console.log(`Line1: ${possibleLine1.join('')}`)
                    console.log(`Line2: ${possibleLine2.join('')}`)

                    await lineReader.question('Next?')
                }

            }

        }
    } 

    await lineReader.close()

    /** 
     * Gotcha!!!
     * word 'which' in pairs[6] after xor gets 'hen t' 
     * let's suppose some line in pairs[6] has text 'when the'
     */

    applyPossibleText('when the', pairs[6])

    /** 
     * Go ahead, try to suppose it would be ' when there '
     */

    applyPossibleText(' when there ', pairs[6])

    /** 
     * Now let's try to suppose there would be 'l which says '
     */

    applyPossibleText('l which says ', pairs[6])

    /** 
     * Do not stop, let's try to suppose there would be ' when there is '
     */

    applyPossibleText(' when there is ', pairs[6])

    /** 
     * Coll, it can be ' will which says to '
     */

    applyPossibleText(' Will which says to ', pairs[6])

    /** 
     * And also it can be ' hold on when there is nothing '
     */

    applyPossibleText(' hold on when there is nothing ', pairs[6])

    /**
     * Hmmm? Maybe pairs[5] can contain some of the line
     */

    applyPossibleText(' hold on when there is nothing ', pairs[5])
    applyPossibleText(' the Will which says to them: "', pairs[5])

    /**
     * Good enough, the first one is in pairs[5]
     * Let's try apply to pair[4] what we got
     */

    applyPossibleText('ve your turn long after they are ', pairs[4])

    /**
     * Not, bad go to the previous pair 
     */

    applyPossibleText(' can force your heart and nerve and ', pairs[3])

    /**
     * Let's use Google to check what we have
     * Oh, it should be "If" by Rudyard Kipling
     */

    applyPossibleText('If you can make one heap of all', pairs[0])

    /**
     * Gotcha!!!
     * It is https://www.poetryfoundation.org/poems/46473/if---
     * 3 and 4 verses
     */

}
