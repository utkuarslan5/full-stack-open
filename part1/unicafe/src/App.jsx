// App.jsx

import { useState } from 'react'

const Header = ({text}) => {
  return <h1>{text}</h1>
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text} 
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100

  // Only render if feedback given
  if (all === 0) {
    return <p>No feedback given</p>
  }

  const rows = [
    {text: 'Good:', value: good},
    {text: 'Neutral:', value: neutral},
    {text: 'Bad:', value: bad},
    {text: 'All:', value: all}, 
    {text: 'Average:', value: average},
    {text: 'Positive:', value: positive + '%'},
  ]

  return (
    <table>
      <tbody>
        {rows.map(row => (
          <StatisticLine 
            key={row.text}
            text={row.text}
            value={row.value}  
          />
        ))}
      </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const headerText = "Give Feedback"
  const subheaderText = "stats"

  const all = good + neutral + bad 
  const average = (good - bad) / all 
  const positive = (good / all) * 100 + " %"

  return (
    <div>
      <Header text={headerText}/>

      <Button 
        handleClick={() => setGood(good + 1)}
        text="Good"
      />

      <Button
        handleClick={() => setNeutral(neutral + 1)}
        text="Neutral" 
      />
   
      <Button
        handleClick={() => setBad(bad + 1)}
        text="Bad"
      />

      <Header text={subheaderText}/>
      <Statistics 
       good={good}
       neutral={neutral}
       bad={bad}
     />

    </div>

 
  )
}

export default App
