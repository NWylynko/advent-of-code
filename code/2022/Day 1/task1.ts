import { elvesCalories } from "./input"

const elvesSplit = `

`

const elvisItemSplit = `
`

const elvis = elvesCalories.split(elvesSplit)

export const elvisItems = elvis.map((elvisItems) => {

    const items = elvisItems.split(elvisItemSplit).map(Number)
    const total = items.reduce((previousValue, currentValue) => {
        return currentValue + previousValue
    }, 0)

    return total
})

console.log('Most calories being carried', Math.max(...elvisItems))
