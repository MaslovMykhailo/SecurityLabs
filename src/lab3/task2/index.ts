import path from 'path'

import {MersenneTwister} from '../../algorithms'
import {writeFile} from '../../utils'
import {collectionDesiredAmountOfMoney, OnlineCasino, PlayMode} from '../common'

export const task2 = async () => {
    let amountOfMoney = 0

    const {id: accountId} = await OnlineCasino.createAccount()

    const mtStates: number[] = []
    while (mtStates.length < MersenneTwister.N) {
        const {realNumber, account: {money}} = await OnlineCasino.makeBet({
            accountId,
            mode: PlayMode.Mt,
            money: 1,
            number: Math.round(Math.random() * 100)
        })
        mtStates.push(realNumber)
        amountOfMoney = money
    }

    const mt = MersenneTwister.fromMTStates(mtStates)

    const solution = await collectionDesiredAmountOfMoney({
        accountId,
        mode: PlayMode.Mt,
        initialAmountOfMoney: amountOfMoney,
        getNextNumber: () => mt.next()
    })

    await writeFile(path.join(__dirname, 'solution.txt'), solution)
}
