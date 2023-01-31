export function forElse(array, callback, elseCallback) {
    let isBreak = false
    for (let [i, v] of array.entries()) {
        callback(v, i, () => isBreak = true)
        if (isBreak) return
    }
    elseCallback()
}
