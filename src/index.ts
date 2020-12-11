import {entryTask} from './entry-task'
import {intro} from './intro'
import {lab1} from './lab1'
import {lab3} from './lab3'
import {lab5} from './lab5'
import {lab6} from './lab6'

(async function main() {
    await Promise.all([
        entryTask(),
        intro(),
        lab1(),
        lab3(),
        lab5(),
        lab6()
    ])
})()

