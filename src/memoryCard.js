import React from 'react'
import { LevelDifficulty } from './App.js'
import './App.css'

export const MemoryCard = props => {
    return (
        <div style={cardSize(props.difficulty)} onClick={() => { !props.shouldShow && props.handleChoice(props.id) } } className="memoryCard">
            {props.shouldShow && <span>{props.number}</span>}
        </div>
    )
}

const cardSize = (difficulty) => {
    switch (difficulty) {
        case LevelDifficulty.medium: {
            return cardStyle('16%')
        }
        case LevelDifficulty.hard: {
            return cardStyle('12%')
        }
        default: {
            return cardStyle('23%')
        }
    }
}

const cardStyle = (percent) => {
    return { width: percent, height: percent }
}