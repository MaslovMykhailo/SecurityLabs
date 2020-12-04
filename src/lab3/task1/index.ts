import path from 'path'

import {calculateUnknownMultiplier, LCG} from '../../algorithms'
import {writeFile} from '../../utils'
import {collectionDesiredAmountOfMoney, OnlineCasino, PlayMode} from '../common'

export const task1 = async () => {
    let amountOfMoney = 0

    const {id: accountId} = await OnlineCasino.createAccount()

    const states: bigint[] = []
    while (states.length < 10) {
        const {realNumber, account: {money}} = await OnlineCasino.makeBet({
            accountId,
            mode: PlayMode.Lcg,
            money: 1,
            number: Math.round(Math.random() * 100)
        })
        states.push(BigInt(realNumber))
        amountOfMoney = money
    }

    let multiplier = BigInt(0)
    let increment = BigInt(0)
    const modulus = BigInt(Math.pow(2, 32))

    while (
        states.length > 1 &&
        (Number(multiplier) === 0 || Number(increment) === 0)
    ) {
        const lcgParams = calculateUnknownMultiplier(modulus, states)

        multiplier = lcgParams.multiplier
        increment = lcgParams.increment

        states.shift()
    }

    const lcg = new LCG(
        multiplier,
        increment,
        modulus,
        states.pop()!
    )

    const solution = await collectionDesiredAmountOfMoney({
        accountId,
        mode: PlayMode.Lcg,
        initialAmountOfMoney: amountOfMoney,
        getNextNumber: () => Number(lcg.getRandomNumber())
    })

    await writeFile(path.join(__dirname, 'solution.txt'), solution)
}
