import React from 'react'
import './App.css'
import DifficultyPicker from './difficultyPicker.js'
import { MemoryCard } from './memoryCard.js'
import { UsernameInputs } from './usernameInputs.js'
import { cardArray } from './gameSetup.js'

export const LevelDifficulty = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard'
}

class MatchingGame extends React.Component {
  state = {
    startGame: false,
    difficulty: LevelDifficulty.easy,
    cards: [],
    matches: [],
    firstChoice: { 'value': undefined, 'index': undefined },
    secondChoice: { 'value': undefined, 'index': undefined },
    playerOneScore: 0,
    playerTwoScore: 0,
    playerOneTurn: true,
    p1Name: '',
    p2Name: ''
  }

  componentDidMount() {
    this.setState({ cards: this.shuffleArray(this.state.difficulty) })
  }

  handleChoice = (num) => {
    this.state.firstChoice.value
      ? this.handleSecondPick(num)
      : this.setState({ firstChoice: { 'value': num.value, 'index': num.index } });
  }

  handleSecondPick = (num) => {
    if (this.state.firstChoice.value === num.value) {
      let pointsToAdd = (typeof (num.value) === 'string')
        ? 10
        : num.value
      const player = this.state.playerOneTurn
        ? 'playerOneScore'
        : 'playerTwoScore'
      this.setState({
        matches: [...this.state.matches, num.value],
        firstChoice: { 'value': undefined, 'index': undefined },
        secondChoice: { 'value': undefined, 'index': undefined },
        [player]: this.state[player] + pointsToAdd,
      })
    } else {
      setTimeout(() => {
        this.setState({
          firstChoice: { 'value': undefined, 'index': undefined },
          secondChoice: { 'value': undefined, 'index': undefined },
          playerOneTurn: !this.state.playerOneTurn,
        })
      }, 1000)
      this.setState({
        secondChoice: { 'value': num.value, 'index': num.index }
      })
    }
  }

  newGame = () => {
    this.setState({
      cards: this.shuffleArray(this.state.difficulty),
      firstChoice: { 'value': undefined, 'index': undefined },
      secondChoice: { 'value': undefined, 'index': undefined },
      playerOneScore: 0,
      playerTwoScore: 0,
      playerOneTurn: true,
      matches: []
    })
  }

  setupGame = () => {
    const { cards, firstChoice, secondChoice, matches, difficulty} = this.state;
    return cards.map((digit, index) => {
      const uniqueId = { 'value': digit, 'index': index }
      const shouldShow = JSON.stringify(firstChoice) === JSON.stringify(uniqueId)
        || JSON.stringify(secondChoice) === JSON.stringify(uniqueId)
        || (matches.indexOf(digit) !== -1)
      return <MemoryCard key={JSON.stringify(uniqueId)}
        number={digit}
        id={uniqueId}
        difficulty={difficulty}
        handleChoice={(num) => this.handleChoice(num)}
        shouldShow={shouldShow} />
    })
  }

  shuffleArray = level => {
    let newArr = cardArray(level);
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
  }

  handleStartGame = () => {
    const {p1Name, p2Name} = this.state;
    if (p1Name && p2Name) {
      this.setState({ startGame: true });
    }
  }

  render() {
    const { playerOneTurn, playerOneScore, playerTwoScore, matches, cards, p1Name, p2Name, startGame } = this.state;
    if (!startGame) {
      return (
        <UsernameInputs playerOneName={(name) => this.setState({ p1Name: name })}
          playerTwoName={(name) => this.setState({ p2Name: name })}
          startGame={() => { this.handleStartGame() } } />
      )
    }
    return (
      <div className="gameContainer">
        <div className="menuBar">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={() => this.newGame()} className="gameBtn">NEW GAME</button>
            <DifficultyPicker levelSelected={(selection) =>
              this.setState({
                difficulty: selection,
                cards: this.shuffleArray(selection)
              })} />
          </div>
          <div>
            <div className="currentPlayer">{playerOneTurn ? `${p1Name}` : `${p2Name}`}</div>
          </div>
          <div>
            <span>{p1Name}: {playerOneScore}</span>
            <span>{p2Name}: {playerTwoScore}</span>
            <button className="gameBtn" onClick={() => { this.setState({ startGame: false }); this.newGame() } }>CHANGE</button>
          </div>
        </div>
        {(matches.length === (cards.length / 2))
      ? <div>GAME OVER</div>
      : (<div className="gameBox">{this.setupGame()}</div>)}
      </div>
    )
  }
}

export default MatchingGame
