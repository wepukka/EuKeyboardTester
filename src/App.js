import './App.css';
import { useEffect, useState } from 'react'

function App() {

  const fRow = ["Escape", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"]
  const numberRow = ["§", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "Dead"]
  const tabRow = ["Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å", ""]
  const capsRow = ["CapsLock", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä", "'",]
  const shiftRow = ["Shift", "<", "z", "x", "c", "v", "b", "n", "m", ",", ".", "-", ""]
  const ctrlRow = ["Control", "Meta", "Alt", "Spacebar", "AltGraph", "ContextMenu"]
  const rightEndColumn = ["Backspace", "Enter", "Shift", "Ctrl"]
  const [clickedKey, setClickedKey] = useState()
  const [clickAmounts, setClickAmounts] = useState(0);

  const incrementClick = () => {
    setClickAmounts(clickAmounts => clickAmounts + 1)
  }
  // Event listener for keydown // 
  useEffect(() => {
    document.addEventListener('keydown', detectKey, true)
  }, [])

  // If key clicked, change colour // 

  useEffect(() => {
    changeButtonColor(clickedKey)
  }, [clickAmounts])

  // Detect key press // 
  const detectKey = (e) => {
    incrementClick()
    let key = e.key.toString()
    if (key === " ") {
      key = "Spacebar"
    }
    console.log(e.key)
    setClickedKey(key)
  }


  // Change button color by finding div, and changing its style // 
  const changeButtonColor = (clickedKey) => {
    try {
      let element = document.getElementById("keyboardButton_" + clickedKey)
      element.style.backgroundColor = "black"
    } catch (error) {
    }
  }

  // Enter column // 
  const EndRow = () => {
    let buttons = rightEndColumn.map(function (item, index) {
      let id = "keyboardButton_" + item.toString();
      const itemString = item.toString();
      let className = "keyboardButton_" + itemString + " button"

      return <div id={id} key={index} className={className} ><p>{item}</p></div>
    })
    return <div className='columnContainer'>{buttons} </div>
  }

  // All rows //
  const KeyboardRow = (props) => {
    let buttons = props.row.map(function (item, index) {
      let id = "keyboardButton_" + item.toString();

      const itemString = item.toString();
      let className = "keyboardButton_" + itemString + " button"

      return <div id={id} key={index} className={className} ><p>{item}</p></div>
    })
    return <div className='rowContainer'>{buttons} </div>
  }

  // Arrow keys first row // 
  const UpperArrowKeys = () => {
    return <div className='upperArrowRow'>
      <div className='emptyButton'>
      </div>
      <div id="keyboardButton_ArrowUp" className='button'>
        Up
      </div>
      <div className='emptyButton'>
      </div>
    </div>
  }
  // Arrow keys second row // 
  const LowerArrowKeys = () => {
    return <div className="lowerArrowRow">
      <div id="keyboardButton_ArrowLeft" className='button'>
        Left
      </div>
      <div id="keyboardButton_ArrowDown" className='button'>
        Down
      </div>
      <div id="keyboardButton_ArrowRight" className='button'>
        Right
      </div>
    </div>
  }

  // Function buttons // 
  const FunctionButtonRow = (props) => {
    let id1 = "keyboardButton_" + props.leftButton
    let id2 = "keyboardButton_" + props.middleButton
    let id3 = "keyboardButton_" + props.rightButton

    return <div className="functionButtons">
      <div id={id1} className='button'>
        {props.leftButton}
      </div>
      <div id={id2} className='button'>
        {props.middleButton}
      </div>
      <div id={id3} className='button'>
        {props.rightButton}
      </div>
    </div>
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='Title'>
          <h1>EU Keyboard Tester</h1>
        </div>
        <div className='container'>
          <div className="keyboardContainer">
            <KeyboardRow row={fRow} />
            <div className='fRowSpacer'></div>
            <KeyboardRow row={numberRow} />
            <KeyboardRow row={tabRow} />
            <KeyboardRow row={capsRow} />
            <KeyboardRow row={shiftRow} />
            <KeyboardRow row={ctrlRow} />
          </div>
          <EndRow />
          <div className="keysRight">
            <FunctionButtonRow leftButton={"PrintScreen"} middleButton={"ScrollLock"} rightButton={"Pause"} />
            <div className='fRowSpacer'></div>
            <FunctionButtonRow leftButton={"Insert"} middleButton={"Home"} rightButton={"PageUp"} />
            <FunctionButtonRow leftButton={"Delete"} middleButton={"End"} rightButton={"PageDown"} />
            <div className='emptyButton'></div>
            <UpperArrowKeys />
            <LowerArrowKeys />
          </div>
        </div>
        <div className='keyBox'>
          <h1> {clickedKey} </h1>
          <h2> Buttons pressed {clickAmounts}</h2>

        </div>
      </header>
    </div>
  );
}

export default App;
