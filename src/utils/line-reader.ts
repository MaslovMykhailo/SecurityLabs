import readline from 'readline'

export const LineReaderFactory = () => {
    const lineReader = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    return {
        question: (question: string) => new Promise<string>(
            resolve => lineReader.question(question + '\n', resolve)
        ),
        close: () => {
            const promise = new Promise<void>(
                resolve => lineReader.on('close', resolve)
            )
            lineReader.close()
            return promise
        }  
    }
}
