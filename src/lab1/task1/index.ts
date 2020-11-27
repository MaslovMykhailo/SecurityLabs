import path from 'path'

import {encryptSingleByteXORCipher, decryptSingleByteXORCipher} from '../../algorithms'
import {readFile, writeFile} from '../../utils'

export const task1 = async () => {
    const text = await readFile(path.join(__dirname, 'sample.txt'))

    const cipherText = encryptSingleByteXORCipher(text, 'X')
    await writeFile(path.join(__dirname, 'encrypted-sample.txt'), cipherText)

    const possibleTexts = decryptSingleByteXORCipher(cipherText)
    await Promise.all(possibleTexts.map(
        ({key, text}, index) => writeFile(
            path.join(__dirname, `decrypted-sample-${index + 1}.txt`), 
            `KEY: ${key}\n${text}`
        )
    ))
}
