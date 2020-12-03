import {task1} from './task1'
import {task2} from './task2'

export const lab3 = async () => {
    await Promise.all([
        // task1(),
        task2()
    ])
}
