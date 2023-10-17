import { useState, useEffect } from 'react';
import React, { createRef } from 'react';
import './App.css';
import beep from './ping-82822.mp3';

function App() {

  const [sessionLength, setSessionLength]= useState(25);
  const [breakLength, setBreakLength]= useState(5);
  const [timerLabel, setTimerLabel]= useState('Session');
  const [timeLeft, setTimeLeft]=useState(sessionLength*60);
  const [isRunning, setIsRunning] =useState(false);
  const audioRef = React.createRef();

  useEffect(() => {
    let timer;
    
    if (isRunning && timeLeft > 0) {
      
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerLabel === 'Session') {
        setTimeout(() => {
          setTimerLabel('Break');
          setTimeLeft(breakLength * 60);
          document.getElementById('beep').play();
        }, 1000); 
      } else {
        setTimeout(() => {
          setTimerLabel('Session');
          setTimeLeft(sessionLength * 60);
          document.getElementById('beep').play();
        }, 1000); 
      }
    }
    
    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeLeft, timerLabel, breakLength, sessionLength]);
   

  const handleStartStop=()=>{
    setIsRunning(!isRunning);
  }

  const handleReset=()=>{
    if(isRunning===true){
    setIsRunning(!isRunning);
        }    
    setTimerLabel("Session");
    setTimeLeft(25 * 60);
    setSessionLength(25);
    setBreakLength(5);
    const audio = audioRef.current;
    audio.pause();
    audioRef.current.currentTime = 0;
  }

  const handleIncreaseSession=()=>{
    if (sessionLength < 60 && sessionLength>1) {
      setSessionLength(sessionLength + 1);
      
      if (!isRunning) {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
}

const handleDecreaseSession=()=>{
  if (sessionLength < 60 && sessionLength>1) {
    setSessionLength(sessionLength - 1);
   
    if (!isRunning) {
      setTimeLeft((sessionLength - 1) * 60);
    }
  }
}

const handleIncreaseBreak=()=>{
  if (breakLength < 60 && breakLength>1) {
    setBreakLength(breakLength + 1);
   
  }
}
const handleDecreaseBreak=()=>{
  if (breakLength < 60 && breakLength>1) {
    setBreakLength(breakLength - 1);
  }
}


  return (
    <div className="App">
      <div className="App-header">
        <p>
          25+5 Clock
        </p>
        <audio id="beep" ref={audioRef} src={beep}></audio>
        <div id='clock'>
          <div id="grid-1">
          <div id="break-label">
            <p>Break</p>
            <button id='break-increment' onClick={handleIncreaseBreak}>Increase Break</button>
            <p id="break-length">{breakLength}</p>
            <button id='break-decrement' onClick={handleDecreaseBreak}>Decrease Break</button>
          </div>
          <div id="session-label">
          <p>Session</p>
          <button id='session-increment' onClick={handleIncreaseSession}>Increase Session</button>
            <p id="session-length">{sessionLength}</p>
            <button id='session-decrement' onClick={handleDecreaseSession}>Decrease Session</button>
          </div>
          </div>
          <div id="timer-label"><p>{timerLabel}</p></div>
          <button id="start_stop" onClick={handleStartStop}>Start/Stop</button>
          <button id="reset" onClick={handleReset}>Reset</button>
          <div id='time-left'><p>{Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
              {(timeLeft % 60).toString().padStart(2, '0')}</p></div>
        </div>
       </div>
    </div>
  );
}

export default App;
