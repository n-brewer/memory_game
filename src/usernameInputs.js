import React from 'react'
import './App.css'

export const UsernameInputs = props => {
    return (
        <div className="usernameInputs">
            <div className="username">
                <div>Player One Name</div>
                <input type="text" onChange={(e) => props.playerOneName(e.target.value)} />
            </div>
            <div className="username">
                <div>Player Two Name</div>
                <input type="text" onChange={(e) => props.playerTwoName(e.target.value)} />
            </div>
            <button onClick={() => props.startGame()} className="gameBtn">START</button>
        </div>
    )
}