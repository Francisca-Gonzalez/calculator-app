import { useRef, useState } from "react";
import PokeButton from "./components/PokeButton";
import ToggleType from "./components/ToggleType";
import Historial from "./components/Historial";
import sp_cries from "./assets/sp_cries.json";
import spec_cries from "./assets/spec_cries.json";
import num_cries from "./assets/num_cries.json";
import "./App.css";

function App() {
  const [type, setType] = useState("grass");
  const inputRef = useRef(null); 
  const resultRef = useRef(null); 
  const [result, setResult] = useState(0);
  const [operation, setOperation] = useState(null);
  const [num1, setNum1] = useState(null);
  const [num2, setNum2] = useState(null);
  const [waitingNum2, setWaitingNum2] = useState(false);
  const [resultHistory, setResultHistory] = useState([]);
  const [actualSound, setActualSound] = useState(null);

  const audioCache = {};

  const getAudio = (type, num, json) => {
    const key = `${type}${num}`;
    if (!audioCache[key]) {
      const soundPath = Array.isArray(json) ? json[num] : json[num.toString()];
      audioCache[key] = new Audio(soundPath);
    }
    return audioCache[key];
  };

  const playSound = (type, num, jsonKey) => {
    let json;
    if (jsonKey === "num_cries") json = num_cries[type];
    else if (jsonKey === "sp_cries") json = sp_cries;
    else if (jsonKey === "spec_cries") json = spec_cries;
    const key = `${type}${num}`;
    const sound = getAudio(key, json, num);

    if (actualSound) {
      actualSound.pause();
      actualSound.currentTime = 0;
    }

    sound.play();
    setActualSound(sound);

    sound.onended = () => setActualSound(null);
  };

  const operateNumbers = () => {
    const n2 = Number(inputRef.current.value);

    setNum2(n2);

    let res;
    switch (operation) {
        case "+":
            res = num1 + n2;
            break;
        case "-":
            res = num1 - n2;
            break;
        case "*":
            res = num1 * n2;
            break;
        case "/":
            res = n2 !== 0 ? num1 / n2 : (() => { alert("Error: Division by zero"); return null; })();
            break;
        default:
            res = 0;
    }

    setResult(res);
    setResultHistory(prev => {
      const newEntry = { num1, num2: n2, operation, result: res };
      const updated = [newEntry, ...prev]; // agrega al inicio
      return updated.slice(0, 5); // solo últimos 5
    });
    setNum1(null);
    setNum2(null);
    setOperation(null);
    inputRef.current.value = null;
    setWaitingNum2(false);

  };
 
  return ( 
    <div className={`App ${type}`}> 
      <div className={`calculator-header ${type}`}>
        <div className="title">
          <img className="pokeball" src={`${process.env.PUBLIC_URL}/poke-ball.png`} alt="pokeball"/>
          <h1>POKE CALCULATOR</h1> 
        </div>
        <ToggleType setType={setType} type={type}/>
      </div>
      <div className="calculator-input-output">
        <form> 
          <input className={`input ${type}`}
            ref={inputRef} 
            type="text" 
            placeholder="Type a number" 
          />
        </form>
        <p className={`input ${type}`} ref={resultRef}>
          = {result}
        </p> 
      </div>
      <div className="calculator-body">
        <div className="calculator-buttons">
            <div className="calculator-numbers">
              {[...Array(9)].map((_, i) => (
                <PokeButton 
                key={i} 
                num={i} 
                type={type} 
                inputRef={inputRef} 
                number={true}
                operation={operation}
                setOperation={setOperation}
                num1={num1}
                setNum1={setNum1}
                num2={num2}
                setNum2={setNum2}
                operateNumbers={operateNumbers}
                setResult={setResult}
                waitingNum2={waitingNum2}
                setWaitingNum2={setWaitingNum2}
                playSound={playSound}/>
              ))}
              {[...Array(2)].map((_, i) => (
                <PokeButton 
                key={i} 
                num={i} 
                type={type} 
                inputRef={inputRef} 
                number={false} 
                operator={false}
                operation={operation}
                setOperation={setOperation}
                num1={num1}
                setNum1={setNum1}
                num2={num2}
                setNum2={setNum2}
                operateNumbers={operateNumbers}
                setResult={setResult}
                waitingNum2={waitingNum2}
                setWaitingNum2={setWaitingNum2}
                playSound={playSound}/>
              ))}
            </div>
            <div className="calculator-operations">
              {[...Array(7)].map((_, i) => (
                <PokeButton 
                key={i}
                num={i} 
                type={type} 
                inputRef={inputRef} 
                number={false} 
                operator={true}
                operation={operation}
                setOperation={setOperation}
                num1={num1}
                setNum1={setNum1}
                num2={num2}
                setNum2={setNum2}
                operateNumbers={operateNumbers}
                setResult={setResult}
                waitingNum2={waitingNum2}
                setWaitingNum2={setWaitingNum2}
                playSound={playSound}/>
              ))}
            </div>
        </div>
        <div className="calculator-historial">
          <Historial resultHistory={resultHistory} type={type}/>
        </div>
      </div>
    </div> 
  ); 
} 
 
export default App; 