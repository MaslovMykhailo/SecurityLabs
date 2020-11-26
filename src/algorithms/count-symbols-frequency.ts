export const countSymbolsFrequency = (text: string) => {
    const symbols = text.split('')
    return symbols.reduce<Record<string, number>>(
        (frequencyMap, symbol) => {
            if (frequencyMap[symbol]) {
                return frequencyMap
            }

            const symbolsCount = symbols.reduce(
                (count, s) => count + Number(s === symbol),
                0
            )
            
            frequencyMap[symbol] = (symbolsCount / symbols.length) * 100
            return frequencyMap
        }, 
        {}
    )
}
