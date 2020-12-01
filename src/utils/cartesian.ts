export const cartesian = <T>(...allEntries: T[][]): T[][] => allEntries
    .reduce<T[][]>(
        (results, entries) =>
            results
                .map(result => entries.map(entry => [...result, entry]))
                .reduce((subResults, result) => [...subResults, ...result], []), 
        [[]]
    )
