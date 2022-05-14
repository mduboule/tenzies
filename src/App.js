import Die from './Die'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

export default function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    // Return if all dice don't share the same value
    if (!dice.every(die => die.value === dice[0].value)) return
    // Return if all dice aren't held
    if (!dice.every(die => die.isHeld)) return
    setTenzies(true)
    celebrate()
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
    setDice(oldDice => oldDice.map(die => ({
        ...die,
        value: die.isHeld ? die.value : Math.ceil(Math.random() * 6)
      })
    ))
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">
        {diceElement}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  )
}
