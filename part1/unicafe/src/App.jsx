import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = all=== 0? 0 : (good - bad)/ all
  const positive = all=== 0? 0 : good / all * 100

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good +1)} text='good' />
      <Button onClick={() => setNeutral(neutral +1)} text='neutral' />
      <Button onClick={() => setBad(bad +1)} text='bad' />
      <h2>statistics</h2>
      <p>
        good {good}<br/>
        neutral {neutral}<br/>
        bad {bad}<br/>
        all {all}<br/>
        average {average}<br/>
        positive {positive}%
      </p>
    </div>
  )
}

export default App