import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialIndex = 4 // the index the "B" is at
const postURL = 'http://localhost:9000/api/result';
let currentCoordinates= {x: 2, y: 2}
const initialMoves = 0
const initialError = ""
let timeOrTimes = "times"
export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [index, setIndex] = useState(initialIndex);
  const [moves, setMoves] = useState(initialMoves);
  const [error, setError] = useState(initialError);
  
  const grid = [
    {index: 0, x: 1, y: 1},
    {index: 1, x: 2, y: 1},
    {index: 2, x: 3, y: 1},
    {index: 3, x: 1, y: 2},
    {index: 4, x: 2, y: 2},
    {index: 5, x: 3, y: 2},
    {index: 6, x: 1, y: 3},
    {index: 7, x: 2, y: 3},
    {index: 8, x: 3, y: 3},
  ]
  if(moves === 1) {
    timeOrTimes = "time"
  }
  else {
    timeOrTimes = "times"
  }
  function getXY(idx) {
    grid.map(location => {
      if (location.index === idx) {
        currentCoordinates = { x: location.x, y: location.y }
      }
    })
  }
  function getMessage(message) {
    setMessage(message)
  }

  function reset() {
    setMoves(initialMoves);
    setEmail(initialEmail);
    currentCoordinates = {x: 2, y: 2};
    setIndex(initialIndex);

    
  }

  function getNextIndex(direction) {
    let nextIndex = 0;
    if(direction === 'up') {
      if(index === 0 || index === 1 || index === 2) {
        return;
      }
      else{
        setIndex(index - 3);       
        setMoves(moves + 1);
        nextIndex = index - 3
        getXY(nextIndex)
      }
    }

    if(direction === 'down') {
      if(index === 6 || index === 7 || index === 8) {
        return;
      }
      else{
        setIndex(index + 3);
        setMoves(moves + 1);
        nextIndex = index + 3
        getXY(nextIndex)
      }
    }
    if(direction === 'left') {
      if(index === 0 || index === 3 || index === 6) {
        return;
      }
      else{
        setIndex(index - 1);
        setMoves(moves + 1)
        nextIndex = index - 1
        getXY(nextIndex)
      }
    }
    if(direction === 'right') {
      if(index === 2 || index === 5 || index === 8) {
        return;
      }
      else{
        setIndex(index + 1);
        setMoves(moves + 1)
        nextIndex = index + 1
        getXY(nextIndex)
      }
    }
    

  }

  function move(evt) {
    const direction = evt.target.id
    getNextIndex(direction)
  }

  function onChange(evt) {
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    evt.preventDefault();
    let newPostObject = {
      "x" : currentCoordinates.x,
      "y" : currentCoordinates.y,
      "steps" : moves,
      "email" : email
    }
    axios.post(postURL, newPostObject)
    .then(res => {
      getMessage(res.data.message)
      
    })
    .catch(err => {
      console.error(err)
      setError(err.response.data.message)
    })
    reset();
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {`(${currentCoordinates.x}, ${currentCoordinates.y})`}</h3>
        <h3 id="steps">{`You moved ${moves} ${timeOrTimes}`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
        id="email" 
        type="email" 
        placeholder="type email" 
        value={email}
        onChange={onChange}
        />
        <input id="submit" type="submit"></input>
      </form>
      <div className='error'>{error ? error : ""}</div>
    </div>
  )
}
