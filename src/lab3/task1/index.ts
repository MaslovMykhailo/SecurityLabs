import {calculateUnknownMultiplier, LCG} from '../../algorithms'
import {OnlineCasino, PlayMode} from '../common'

export const task1 = async () => {
    let amountOfMoney = 0
    const desiredAmountOfMoney = 1000000

    const {id: accountId} = await OnlineCasino.createAccount()

    const states: bigint[] = []
    while (states.length < 5) {
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

    if (states.length < 1) {
        console.error('Failed to predict lcg next number')
        return
    }

    console.log(states)
    
    const lcg = new LCG(
        multiplier,
        increment,
        modulus,
        states.pop()!
    )

    let lastMessage = 'Empty message'

    while (amountOfMoney < desiredAmountOfMoney) {
        const {message, account: {money}} = await OnlineCasino.makeBet({
            accountId,
            mode: PlayMode.Lcg,
            money: Math.round(amountOfMoney / 2),
            number: Number(lcg.next())
        })
        amountOfMoney = money
        lastMessage = message
    }

    console.log(lastMessage)
}
