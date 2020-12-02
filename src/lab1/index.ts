import {task1} from './task1'
import {task2} from './task2'
import {task3} from './task3'
import {task4} from './task4'
import {task5} from './task5'

export const lab1 = async () => {
    await Promise.all([
        task1(),
        task2(),
        task3(),
        task4(),
        task5()
    ])
}
