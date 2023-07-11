import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const initialError = ""
const initialCoordinates = {x: 2, y: 2}

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
  error: initialError,
}
const postURL = 'http://localhost:9000/api/result';
let currentCoordinates = {x: 2, y: 2};
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
export default class AppClass extends React.Component {
  constructor() {
    super();
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    }
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  
  getXY = (idx) => {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    grid.map(location => {
      if(location.index === idx) {
        currentCoordinates = { x: location.x, y: location.y }
        // this.setState({...this.state, coordinates: {x: location.x, y: location.y}})
        
      }
      
    })
  }
 

  getMessage = (messageInput) => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    console.log(messageInput)
    this.setState({...this.state, message: messageInput})
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState(initialState)
    currentCoordinates = {x: 2, y: 2}
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    let nextIndex = 0;
    if(direction === 'up') {
      if(this.state.index === 0 || this.state.index === 1 || this.state.index === 2) {
        this.setState({...this.state, message: "You can't go up"})
        return;
      }
      else{
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          index: this.state.index - 3
        })
        nextIndex = this.state.index - 3
        this.getXY(nextIndex)
      }
    }
    if(direction === 'down') {
      if(this.state.index === 6 || this.state.index === 7 || this.state.index === 8) {
        this.setState({...this.state, message: "You can't go down"})
        return;
      }
      else{
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          index: this.state.index + 3
        })
        nextIndex = this.state.index + 3
        this.getXY(nextIndex)
      }
    }
    if(direction === 'left') {
      if(this.state.index === 0 || this.state.index === 3 || this.state.index === 6) {
        this.setState({...this.state, message: "You can't go left"})
        return;
      }
      else{
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          index: this.state.index - 1
        })
        nextIndex = this.state.index - 1
        this.getXY(nextIndex)
      }
    }
    if(direction === 'right') {
      if(this.state.index === 2 || this.state.index === 5 || this.state.index === 8) {
        this.setState({...this.state, message: "You can't go right"})
        return;
      }
      else{
        this.setState({
          ...this.state,
          steps: this.state.steps + 1,
          index: this.state.index + 1
        })
        nextIndex = this.state.index + 1
        this.getXY(nextIndex)
      }
    }

  }

  move = (evt) => {
    const direction = evt.target.id
    this.getNextIndex(direction)
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
    let emailInput = evt.target.value
    this.setState({
      ...this.state,
      email: emailInput
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault();
    let newPostObject = {
      "x" : currentCoordinates.x,
      "y" : currentCoordinates.y,
      "steps" : this.state.steps,
      "email" : this.state.email
    }
    axios.post(postURL, newPostObject)
    .then(res => {
      // this.getMessage(res.data.message)
      this.setState({...this.state, message: res.data.message})
      
    })
    .catch(err => {
      this.setState({...this.state, error: err.response.data.message})
    })
    this.setState({...this.state, email: initialEmail})
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${currentCoordinates.x}, ${currentCoordinates.y})`}</h3>
          <h3 id="steps">{`You moved ${this.state.steps}`}{this.state.steps === 1 ? " time" : " times"}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input  
          onChange={this.onChange} 
          value={this.state.email} 
          id="email" 
          type="email" 
          placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
        <div className='error'>{this.state.error ? this.state.error : ""}</div>
      </div>
    )
  }
}
