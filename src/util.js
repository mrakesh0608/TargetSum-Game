export function randomNumBetween(min, max) {
    // min and max included 
    return min + Math.floor(Math.random() * (1 + max - min))
}