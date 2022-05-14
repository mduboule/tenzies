import Die from './Die'
import { useState } from 'react'
import { nanoid } from 'nanoid'

export default function App() {
  const [dice] = useState(allNewDice())

  // Return an array of 10 random value betwee 1 and 6
  function allNewDice() {
    return [...Array(10)].map(() => {
      return Math.ceil(Math.random() * 6)
    })
  }

  const diceElement = dice.map(die => <Die key={nanoid()} value={die} />)

  return (
    <main>
      <div className="dice">
        {diceElement}
      </div>
    </main>
  )
}
