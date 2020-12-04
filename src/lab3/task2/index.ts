import path from 'path'

import {MersenneTwister} from '../../algorithms'
import {writeFile} from '../../utils'
import {collectionDesiredAmountOfMoney, OnlineCasino, PlayMode} from '../common'

export const task2 = async () => {
    let amountOfMoney = 0

    const time = Math.floor(new Date().getTime() / 1000)

    const {id: accountId} = await OnlineCasino.createAccount()

    let mt: MersenneTwister

    let realNextNumber
    let differenceWithServerTime = 0

    do {
        mt = new MersenneTwister(time + differenceWithServerTime++)
        const {realNumber, account: {money}} = await OnlineCasino.makeBet({
            accountId,
            mode: PlayMode.Mt,
            money: 1,
            number: Math.round(Math.random() * 100)
        })
        realNextNumber = realNumber
        amountOfMoney = money
    } while (
        mt.getRandomNumber() !== realNextNumber &&
        differenceWithServerTime < 100
    )

    const solution = await collectionDesiredAmountOfMoney({
        accountId,
        mode: PlayMode.Mt,
        initialAmountOfMoney: amountOfMoney,
        getNextNumber: () => mt.getRandomNumber()
    })

    await writeFile(path.join(__dirname, 'solution.txt'), solution)
}
