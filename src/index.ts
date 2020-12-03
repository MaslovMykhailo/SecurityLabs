import {entryTask} from './entry-task'
import {intro} from './intro'
import {lab1} from './lab1'
import {lab3} from './lab3'

(async function main() {
    await Promise.all([
        // entryTask(),
        // intro(),
        // lab1(),
        lab3()
    ])
})()

