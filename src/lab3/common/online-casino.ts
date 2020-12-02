import fetch, {Response} from 'node-fetch'
import {v4 as uuid} from 'uuid'

import {Account, Bet, BetParams} from './types'

const createResponseError = (
    errorMessage: string,
    response: Response
) => new Error(`
    ${errorMessage}
    Url=${response.url}
    Status=${response.status}
    StatusText=${response.statusText}
`)

const createOnlineCasinoManager = () => {
    const baseUrl = 'http://95.217.177.249/casino'

    return {
        createAccount: (): Promise<Account> => 
            fetch(`${baseUrl}/createacc?id=${uuid()}`)
                .then(response => {
                    if (!response.ok) {
                        throw createResponseError(
                            'Create Account Request Failed',
                            response
                        )
                    }

                    return response.json()
                })
                .catch(console.error),

        makeBet: ({accountId, mode, money, number}: BetParams): Promise<Bet> => 
            fetch(`${baseUrl}/play${mode}?id=${accountId}&bet=${money}&number=${number}`)
                .then(response => {
                    if (!response.ok) {
                        throw createResponseError(
                            'Make Bet Request Failed',
                            response
                        )
                    }

                    return response.json()
                })
                .catch(console.error)  
    }
}

export const OnlineCasino = createOnlineCasinoManager()
