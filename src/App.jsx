import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const copyPassword = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*-+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, passwordGenerator]);

  return (
    <div className="container">
      <h1> Password Generator </h1>

      <div className="secondContainer">
        <input
          className="input"
          type="text"
          value={password}
          readOnly
          placeholder="password"
          ref={passwordRef}
        />
        <button className="btn" onClick={copyPassword}>
          Copy
        </button>
      </div>
      <div className="thirdContainer">
        <input
          onChange={(e) => setLength(e.target.value)}
          type="range"
          min={8}
          max={40}
          value={length}
        />
        <label>Length:{length}</label>

        <input
          type="checkbox"
          defaultChecked={number}
          onChange={() => {
            setNumber((prev) => !prev);
          }}
        />
        <label htmlFor="numberInput">Numbers</label>
        <input
          type="checkbox"
          defaultChecked={character}
          onChange={() => {
            setCharacter((prev) => !prev);
          }}
        />
        <label htmlFor="characterInput">Character</label>
      </div>
    </div>
  );
}

export default App;
