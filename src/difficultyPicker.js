import React from 'react'
import { LevelDifficulty } from './App.js'

class DifficultyPicker extends React.Component {
    state = {
        difficulty: LevelDifficulty.easy
    }

    handleSelection = (e) => {
        this.setState({ difficulty: e.target.value })
        this.props.levelSelected(e.target.value)
    }

    render() {
        const {difficulty} = this.state
        return (
            <div>
                <div style={{ display: 'flex' }}>
                    <input checked={difficulty === LevelDifficulty.easy}
                        onChange={this.handleSelection}
                        type="radio"
                        value={LevelDifficulty.easy} />
                    <div>EASY</div>
                </div>
                <div style={{ display: 'flex' }}>
                    <input checked={difficulty === LevelDifficulty.medium}
                        onChange={this.handleSelection}
                        type="radio"
                        value={LevelDifficulty.medium} />
                    <div>MEDIUM</div>
                </div>
                <div style={{ display: 'flex' }}>
                    <input checked={difficulty === LevelDifficulty.hard}
                        onChange={this.handleSelection}
                        type="radio"
                        value={LevelDifficulty.hard} />
                    <div>HARD</div>
                </div>
            </div>
        )
    }
}

export default DifficultyPicker