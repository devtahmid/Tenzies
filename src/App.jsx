import React from 'react'
import './App.css'
import Dice from './components/dice.jsx'
import Confetti from 'react-confetti'

export default function App() {

  const numberOfDice = 10
  const [dice, setDice] = React.useState(function () {
    let array = []
    for (let index = 1; index <= numberOfDice; ++index) {
      const randomNumber = Math.floor(Math.random() * 6) + 1
      const die = { value: randomNumber, selected: false }
      array.push(die)
    }
    return array
  })

  const [gameStatus, setGameStatus] = React.useState("ongoing")
  const [count, setCount] = React.useState(0)

  const dieElements = dice.map((die, index) => {
    return <Dice key={index} index={index} value={die.value} selected={die.selected} clickDie={clickDie} />
  })

  function handleButtonClick() {
    if (gameStatus === "ongoing")
      randomiseDice()
    else {
      setDice((oldDice) => {
        return oldDice.map((die) => ({ ...die, selected: false }))
      })
      setCount(0)
    }

  }

  function randomiseDice() {

    if (gameStatus === "ongoing") {
      setCount((oldCount) => oldCount + 1)
      const newDice = dice.map((oldDie) => {

        let randomNumber = Math.floor((Math.random() * 6) + 1);
        while (randomNumber === oldDie.value)
          randomNumber = Math.floor((Math.random() * 6) + 1);

        return oldDie.selected ? oldDie : { ...oldDie, value: randomNumber }
      })
      setDice(newDice)
    }

  }



  function clickDie(index) {
    //console.log("clickdie entered at" + Date.now())
    setDice((oldDice) => {
      const newDice = oldDice.map((die, iterator) => {
        return iterator === index ? { ...die, selected: !die.selected } : die
      })
      //console.log("inside setDice" + Date.now())
      return newDice
    })
    //console.log("before checkSTatus" + Date.now())

    //console.log("checkstatus end" + Date.now())
  }

  /*
  turns out, clickDie() was first calling checkStatus() and then setDice()

  Remember when we learnt that react cannot mirror states, this is similar to the process of changing a state and using it to update another state. We get unexpected results. If we want to trigger a function after a state change, we need to use useEffect
  */

  React.useEffect(function () {
    const sampleValue = dice[0].value
    const status = dice.find(function (die, index) {
      //console.log(index, die.selected)
      //console.log("checkstatus console" + Date.now())
      return (die.selected === false) || (die.value !== sampleValue) //find an unselected die or a die with value !== first die's value
    })
    if (status === undefined)
      setGameStatus((oldState) => "ended")
    else
      setGameStatus((oldState) => "ongoing")

    //console.log("check status result " + gameStatus + Date.now())

  }, [dice])

  return (
    <div>
      {gameStatus === "ended" && < Confetti />}
      <div className='black-container'>
        <div className='white-container'>
          <div className='title'>Tenzies</div>
          <div className='description'>Roll untill all dice are the same. Click<br /> each die to freeze it at its current value <br /> between rolls</div>

          <div className='dice-area'>
            {dieElements}
          </div>
          {count !== 0 && <div className='title'>Rolls: {count}</div>}
          <div className='roll-button-div'>
            <button onClick={handleButtonClick}>{`${gameStatus === "ongoing" ? `Roll` : `Restart`}`}</button>
          </div>
        </div>
      </div>
    </div >
  )
}