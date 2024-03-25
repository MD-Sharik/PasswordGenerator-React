import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(10);
  const [numbers, setNumbers] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setpassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcsefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let sym = "!@#$%^&*(){}`~_-=+/|,.<>";

    if (numbers) str += num;
    if (char) str += sym;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numbers, char, setpassword]);

  useEffect(() => {
    PasswordGenerator();
  }, [length, numbers, char, PasswordGenerator]);

  // useRef Hook to get reference of element and to make UI good with CopySelect effect

  const passwordRef = useRef(null);
  const copyPassMethod = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-[35rem] flex justify-center rounded-lg shadow-xl p-10 bg-zinc-700 h-[15rem] absolute top-[38%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="mt-5 w-[34rem] ">
          <form className="w-full">
            <div className="flex w-full gap-2 justify-between items-center">
              <input
                className="flex h-10 w-full rounded-md border border-grey/50 bg-white text-indigo-600 px-3 py-2 text-[1.35rem] font-medium font-sans placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-black/50 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="Text"
                value={password}
                placeholder="Password"
                readOnly
                ref={passwordRef}
              />
              <button
                type="button"
                onClick={copyPassMethod}
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Copy
              </button>
            </div>
            <div className="mt-8 w-[30rem] flex gap-1">
              <input
                type="range"
                min={6}
                max={28}
                defaultValue={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label htmlFor="length" className="text-green-300 text-lg">
                Length: {length}
              </label>
              <input
                type="checkbox"
                value="Numbers"
                checked={numbers}
                className="ml-3"
                onChange={() => {
                  setNumbers((prev) => !prev);
                }}
              />
              <label htmlFor="checkbox" className="text-green-300 text-lg">
                Numbers
              </label>
              <input
                type="checkbox"
                value={char}
                className="ml-3"
                onChange={() => {
                  setChar((prev) => !prev);
                }}
              />
              <label htmlFor="Characters" className="text-green-300 text-lg">
                Characters
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
