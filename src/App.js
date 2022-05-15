import Die from './Die'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
  const LOCAL_STORAGE_KEY = 'tenzies.dice'
  const [tenzies, setTenzies] = useState(false)
  const [dice, setDice] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || allNewDice()
  )

  // Write local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dice))
  }, [dice])

  useEffect(() => {
    // Return if all dice don't share the same value
    if (!dice.every(die => die.value === dice[0].value)) return
    // Return if all dice aren't held
    if (!dice.every(die => die.isHeld)) return
    setTenzies(true)
  }, [dice])

  // Return an array of 10 random value betwee 1 and 6
  function allNewDice() {
    return [...Array(10)].map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    })
  }

  function holdDice(dieId) {
    setDice(prevState => prevState.map(die => ({
        ...die,
        isHeld: die.id === dieId ? !die.isHeld : die.isHeld,
      })
    ))
  }

  const diceElement = dice.map(die => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        handleClick={() => holdDice(die.id)}
      />
    )
  })

  function rollDice() {
    // Reset game when over
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    } 
    // otherwise keep rolling the dice that aren't held
    setDice(oldDice => oldDice.map(die => ({
        ...die,
        value: die.isHeld ? die.value : Math.ceil(Math.random() * 6)
      })
    ))
  }

  return (
    <>
      {tenzies && <Confetti recycle={false} numberOfPieces={500} />}
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice">
          {diceElement}
        </div>
        <button onClick={rollDice}>{tenzies ? 'New Game' : 'Roll'}</button>
      </main>
    </>
  )
}
