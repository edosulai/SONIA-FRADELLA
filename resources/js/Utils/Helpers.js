export function forElse(array, callback, elseCallback) {
    for (let [i, v] of array.entries()) {
        const isBreak = callback(v, i, true)
        if (isBreak) return
    }
    elseCallback()
}
