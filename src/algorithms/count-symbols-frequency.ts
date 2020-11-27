export const countSymbolsFrequency = (text: string) => {
    const symbols = text.split('')
    return symbols.reduce<Record<string, number>>(
        (frequencyMap, symbol) => {
            if (frequencyMap[symbol]) {
                return frequencyMap
            }

            frequencyMap[symbol] = symbols.reduce(
                (count, s) => count + Number(s === symbol),
                0
            )
            
            return frequencyMap
        }, 
        {}
    )
}

export const countSymbolsFrequencyPercent = (text: string) => {
    const frequencyMap = countSymbolsFrequency(text)
    Object.keys(frequencyMap).forEach(symbol => {
        frequencyMap[symbol] = (frequencyMap[symbol] / text.length) * 100
    })
    return frequencyMap
}
    
