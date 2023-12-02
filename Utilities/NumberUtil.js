
/**
 * Find the max value in an array
 * @param {*} array 
 * @returns Number 
 */
export function findMaxValue(array){
    let max = Number(array[0])

    array.forEach(num => {
        if (+num > max){
            max = num
        }
    })
    return max
}

/**
 * Find the min value in an array
 * @param {Array} array 
 * @returns Number 
 */
export function findMinValue(array){
    let min = Number(array[0])

    array.forEach(num => {
        if (+num < min){
            min = num
        }
    })
    return min
}