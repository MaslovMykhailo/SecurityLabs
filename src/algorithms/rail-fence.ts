type Direction = -1 | 1;

const getNextDirection = (
    direction: Direction,
    row: number,
    step: number
): Direction => {
    if (row === 0) {
        return 1
    }

    if (row === step - 1) {
        return -1
    }

    return direction
}

const MARKER = '^|^'

export const decodeRailFence = (cipher: string, step: number) => {
    if (step < 2) {
        return cipher
    }

    let rails: string[][] = Array(step)
        .fill(null)
        .map(() => Array(cipher.length).fill(''))
        
    let direction: Direction

    let row = 0
    let column = 0

    cipher
        .split('')
        .forEach(() => {
            direction = getNextDirection(direction, row, step)
            rails[row][column++] = MARKER
            row += direction
        })
    
    let index = 0
    rails = rails.map(rail => 
        rail.map(symbol => 
            symbol === MARKER && index < cipher.length ?
                cipher[index++] :
                symbol
        )
    )

    const result: string[] = []

    direction = -1

    row = 0
    column = 0

    cipher.split('').forEach(() => {
        direction = getNextDirection(direction, row, step)
        if (rails[row][column] != MARKER) {
            result.push(rails[row][column++])
        }
        row += direction
    })

    return result.join('')
}
