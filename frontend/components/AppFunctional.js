import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const postLocation = 'http://localhost:9000/api/result';


export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
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

  // function testAPI() {
  //   axios.post(postLocation, { "x": 1, "y": 2, "steps": 3, "email": "lady@gaga.com" })
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })
  // }
  // testAPI()

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    let currentCoordinates = {}
    grid.map(location => {
      if(location.index === index) {
        currentCoordinates = {x: location.x, y: location.y}
        console.log(currentCoordinates)
      }
    })

  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
 
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    if(direction === 'up') {
      if(index === 0 || index === 1 || index === 2) {
        return;
      }
      else{
        setIndex(index - 3);
        
      }
      getXY()
    }
    if(direction === 'down') {
      if(index === 6 || index === 7 || index === 8) {
        return;
      }
      else{
        setIndex(index + 3);
      }
    }
    if(direction === 'left') {
      if(index === 0 || index === 3 || index === 6) {
        return;
      }
      else{
        setIndex(index - 1);
      }
    }
    if(direction === 'right') {
      if(index === 2 || index === 5 || index === 8) {
        return;
      }
      else{
        setIndex(index + 1);
      }
    }
    

  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id
    getNextIndex(direction)
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
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
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input 
        id="email" 
        type="email" 
        placeholder="type email" 
        value={email}
        onChange={onChange}
        />
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
