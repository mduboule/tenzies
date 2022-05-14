import Die from './Die'

export default function App() {
  // Return an array of 10 random value betwee 1 and 6
  function allNewDice() {
    return [...Array(10)].map(value => {
      return Math.floor(Math.random() * 6) + 1
    })
  }

  const value = 4

  return (
    <main>
      <div className="dices">
        <Die value={value} />
        <Die value={value} />
        <Die value={value} />
        <Die value={value} />
        <Die value={value} />
        <Die value={value} />
        <Die value={value} />
        <Die value={value} />
        <Die value={value} />
        <Die value={value} />
      </div>
    </main>
  )
}
