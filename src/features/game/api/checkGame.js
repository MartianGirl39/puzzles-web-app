export const checkComplete = async (game) => {
    return !game.some(item => item.value !== item.answer);
}

export const findErrorsForSudoku = async (game) => {
    const errors = [...getErrorsForRows(game), ...getErrorsForCol(game)]
    return [...errors, ...getErrorsForSquare(game)]
}

export const findErrorsForFutoshiki = async (game) => {
    return [...getErrorsForRows(game), ...getErrorsForCol(game)]
}

const getErrorsForRows = (game) => {
    const errors = []
    // console.log("\nCHECKING ROWS\n")
    const size = Math.sqrt(game.length)
    // console.log("size is " + size)
    for (let i=0; i<game.length; i+=size) {
        const row = game.slice(i, i+size)
        // console.log("checking row size is " + row.length + " row is " + row.map(item => item.value))
        const occured = new Map()
        row.forEach((item, rowIndex) => {
            // console.log("item is " + item.value)
            if(occured.has(item.value) && Number(item.value) !== 0) {
                // console.log(`!!! error found at ${i+rowIndex}: item is ${item.value}`)
                errors.push(i + rowIndex)
                errors.push(occured.get(item.value))
                // console.log(`errors is ${errors}`)
            }
            occured.set(item.value, i+rowIndex)
            // console.log("item has occurred " + item.value + " occurred items: ", [...occured]);
        })
    }
    return errors
}

const getErrorsForCol = (game) => {
    const errors = []
    const size = Math.sqrt(game.length)
    for (let i=0; i<size; i++) {
        const col = game.filter((item, index) => {
            if (index === i)  return true
            else if (index < size) return false
            return index%size === i
        })
        const occured = new Map()
        col.forEach((item, index) => {
            if(occured.has(item.value) && Number(item.value) !== 0) {
                // console.log(`error found at ${index*size+i}: item is ${item.value} item is really ${game[index*size+i].value}`)
                errors.push(index*size+i) // size = 9, i=7, index = 6, 9*7=63+6 = 69
                errors.push(occured.get(item.value))
            }
            occured.set(item.value, index*size+i)
        })
    }
    return errors
}

const getErrorsForSquare = (game) => {
    const errors = []
    const size = Math.sqrt(game.length)
    // each row of squares
    for (let i=0; i<game.length; i+=Math.floor(game.length/3)) {    // assuming size=9 first iteration i=0, second iteration=27, last iteration = 54
        // getting each square takes square; each square is from it's starting index, let's say i, range(i+size*r, i+size*r+3), range(i+size*r, i+size*r+3) range(i+size*r, i+size*r+3)
        for(let k=i; k<i+size; k+=Math.floor(size/3)) {   //first iteration = 0, 3, 6, k=0
            const square = [...game.slice(k, k+3), ...game.slice(k+size, k+size+3), ...game.slice(k+size*2, k+size*2+3)]
            // console.log("k is " + k)
            // console.log("square is filled with " + square.map(item => item.value))
            const occured = new Map()
            square.forEach((item) => {
                // console.log(`item is ${item.value}`)
                const indexFound = game.indexOf(item)
                if(occured.has(item.value) && Number(item.value) !== 0) {
                    // console.log(`error found at ${indexFound}: item is ${item}`)
                    errors.push(indexFound)
                    errors.push(occured.get(item.value))
                }
                occured.set(item.value, indexFound)
            })
        }
    }
    return errors
}