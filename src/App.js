import React,{useState} from 'react'
import './App.css';
import Sound1 from "./audio/Sound1.wav";
import Sound2 from "./audio/Sound3.wav";
let timer;
function App() {
  const [rangeNumber,setRangeNumber]=useState(40);
  const [playing,setPlaying]=useState(false);
  const [count,setCount] = useState(0);
  const [bpm,setBpm] = useState(4);

 let sound1=new Audio(Sound1);
 let sound2=new Audio(Sound2);
 const handleBpmChange = event => {
  const bpmTemp = event.target.value;

  if (playing) {
    // Stop the old timer and start a new one
    clearInterval(timer);
     timer = setInterval(playClick, (60 /rangeNumber) * 1000);

    // Set the new BPM, and reset the beat counter
    setCount(0);
   setRangeNumber(bpmTemp)
  } else {
    // Ohterwise just update the bpm
   setRangeNumber(bpmTemp)
  }
};
 const playClick = () => {
 

  // The first beat will have a different sound than the others
  if (count % bpm === 0) {
    sound2.play();
  } else {
    sound1.play();
  }

  // Keep track of which beat we're on

  setCount(count%bpm);
};
const startStop = () => {
  if (playing) {
    // Stop the timer
    clearInterval(timer);
   setPlaying(false);
  } else {
    // Start a timer with the current BPM
    timer = setInterval(playClick(60 / rangeNumber) * 1000);
  
    setCount(0);
    setPlaying(true);
    playClick();
  }
};

  return (
    <div className="App">
      <div className="container">
      <h1>Metronome</h1>
      <div>{rangeNumber} BPM</div>
    <input type="range"  onChange={handleBpmChange} id="range" min="40" max="200" />
    <button onClick={startStop}>{playing?"STOP":"START"}</button>

      </div>
   
        </div>
  );
}

export default App;
