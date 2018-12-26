import { LevelDifficulty } from './App.js'

export const difficulty = (total) => {
    let difficultyArray = []
    for (var i = 1; i <= total; i++) {
        difficultyArray.push(i, i)
    }
    return difficultyArray
}

export const cardArray = (level) => {
    switch (level) {
        case LevelDifficulty.medium: {
            return difficulty(18)
        }
        case LevelDifficulty.hard: {
            return difficulty(32)
        }
        default: {
            return difficulty(8)
        }
    }
}