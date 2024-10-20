import { useState } from "react";

const ReviewButton = ({ onClick, text }) => {
  return (<button onClick={onClick}> {text} </button>)
}

const StatisticsLine = ({text, value}) => {
  return (
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
  </tr>)
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good+neutral+bad;

  if( all==0 ) 
    return <>
      <h1>statistics</h1>
      No feedback given
    </>
  
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={good}/>
          <StatisticsLine text={"bad"} value={bad}/>
          <StatisticsLine text={"neutral"} value={neutral}/>
          <StatisticsLine text={"all"} value={all}/>
          <StatisticsLine text={"average"} value={(good-bad)/all}/>
          <StatisticsLine text={"positive"} value={good/all*100 + '%'}/>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const submitReview = (setReviewCount) => {
    return () => {
      setReviewCount(prevReviewCount => prevReviewCount += 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <ReviewButton onClick={submitReview(setGood)} text={"good"}/>
      <ReviewButton onClick={submitReview(setNeutral)} text={"neutral"}/>
      <ReviewButton onClick={submitReview(setBad)} text={"bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App