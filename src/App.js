import Die from './Die'
import { useState } from 'react'
import { nanoid } from 'nanoid'

export default function App() {
  const [dice, setDice] = useState(allNewDice())

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
      <div className="dice">
        {diceElement}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  )
}
