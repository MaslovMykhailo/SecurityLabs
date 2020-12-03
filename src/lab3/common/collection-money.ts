import {OnlineCasino} from './online-casino'
import {PlayMode} from './types'

const DESIRED_AMOUNT_OF_MONEY = 1000000

const ERROR_MESSAGE = 'Failed to collect desired amount of money'

export type CollectionMoneyParams = {
    mode: PlayMode;
    accountId: string;
    initialAmountOfMoney: number;
    getNextNumber: () => number;
}

export const collectionDesiredAmountOfMoney = async ({
    mode,
    accountId, 
    getNextNumber,
    initialAmountOfMoney
}: CollectionMoneyParams) => {
    let lastMessage = ''
    let amountOfMoney = initialAmountOfMoney

    while (amountOfMoney < DESIRED_AMOUNT_OF_MONEY) {
        try {
            const {message, account: {money}} = await OnlineCasino.makeBet({
                mode,
                accountId,
                money: Math.round(amountOfMoney / 2),
                number: getNextNumber()
            })
            amountOfMoney = money
            lastMessage = message
        } catch (error) {
            return ERROR_MESSAGE + '\n' + error
        }           
    }

    return lastMessage
}
