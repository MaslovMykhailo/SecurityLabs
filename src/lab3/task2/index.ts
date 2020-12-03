import {MersenneTwister} from '../../algorithms'
import {OnlineCasino, PlayMode} from '../common'

export const task2 = async () => {
    let amountOfMoney = 0
    const desiredAmountOfMoney = 1000000

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

    const mt = MersenneTwister.fromMT(mtStates)

    let lastMessage = 'Empty message'

    while (amountOfMoney < desiredAmountOfMoney) {
        const {message, account: {money}} = await OnlineCasino.makeBet({
            accountId,
            mode: PlayMode.Mt,
            money: Math.round(amountOfMoney / 2),
            number: Number(mt.next())
        })
        amountOfMoney = money
        lastMessage = message
    }

    console.log(lastMessage)
}
