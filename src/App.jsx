import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "@#$%&*+";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordTpClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, charAllowed, length, passwordGenerator])

  return (
    <>
      <div className="bg-black w-full h-screen pt-14 text-center">
        <div className="max-w-lg mx-auto shadow-md rounded-lg  text-orange-500 bg-gray-700 p-4">
          <h4 className="text-2xl font-semibold mb-3">Password Generator</h4>
          <div className="flex shadow rounded-lg overflow-hidden mb-3">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button onClick={copyPasswordTpClipboard} className=" bg-blue-600 text-white px-2 outline-none">
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={18}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label className="text-lg">Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1 pl-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={(prev) => {
                  setNumberAllowed((prev) => !prev)
                }}
              />
              <label className="text-lg">Number</label>
            </div>
            <div className="flex items-center gap-x-1 pl-2">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charactersInput"
                onChange={(prev) => {
                  setCharAllowed((prev) => !prev)
                }}
              />
              <label className="text-lg">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
