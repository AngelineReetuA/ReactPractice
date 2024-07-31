import {
  useReducer,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";

function GetList({ getNumbers }) {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setNumbers(getNumbers());
    console.log("UseCallback - Necessary rerender of updating numbers");
  }, [getNumbers]);

  return numbers.map((item) => <div key={item}>{item}</div>);
}

function Hooks() {
  // useState
  const [count, setCount] = useState(0);
  const [namelist, setNamelist] = useState(["Hi", "Hello", "Hola"]);
  const [name, setName] = useState("");

  function addName(e) {
    setNamelist([...namelist, name]);
    setName("");
  }

  // useReducer
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "INCREMENT":
          return { ...state, number: state.number + 1 };
        case "DECREMENT":
          return { ...state, number: state.number - 1 };
        case "ZERO":
          return { ...state, number: 0 };
      }
    },
    {
      number: 0,
    }
  );

  // useMemo
  // Two functions - totalCountBad and totalCount
  // totalCountBad runs everytime submit is hit regardless of value
  // totalCount is only run when submit value changes
  const [count1, setCount1] = useState(0);
  const [count1bad, setCount1Bad] = useState(0);
  const [badtotalcount, setBadtotalcount] = useState(0);
  function totalCountBad() {
    console.log("BAD Count function just ran!");
    setBadtotalcount(count1bad + count1bad * count1bad);
  }
  const totalCount = useMemo(() => {
    console.log("UseMemo - Count function just ran!");
    return count1 + count1 * count1;
  }, [count1]);

  // useCallback CORRECT
  // Bad function unnecessarily renders everytime even when value does not change
  // Correct function memoizes the function so that it runs only when the value changes
  const [number, setNumber] = useState(1);
  const [darkmode, setDarkmode] = useState(false);
  const getNumbers = useCallback(() => {
    return [number, number + 1, number + 2];
  }, [number]);
  const theme = {
    backgroundColor: darkmode ? "#333" : "#FFF",
    color: darkmode ? "#FFF" : "#333",
  };

  // useCallback BAD
  const [numberBAD, setNumberBAD] = useState(1);
  const [darkmodeBAD, setDarkmodeBAD] = useState(false);
  const getNumbersBAD = () => {
    console.log("UseCallback - Unnecessary rerender");
    return [numberBAD, numberBAD + 1, numberBAD + 2];
  };
  const BADtheme = {
    backgroundColor: darkmodeBAD ? "#333" : "#FFF",
    color: darkmodeBAD ? "#FFF" : "#333",
  };

  // useEffect
  const [fruits, setFruits] = useState([]);
  const [fruitData, setFruitData] = useState("");

  // BAD CALL
  // fetch("./data/names.json")
  //   .then((response) => response.json())
  //   .then((data) => setFruits(data));

  // GOOD CALL
  useEffect(() => {
    fetch("./data/names.json")
      .then((response) => response.json())
      .then((data) => setFruits(data));
  }, []);

  const onFruitSelect = (selected) => {
    fetch(`./data/${selected}.json`)
      .then((response) => response.json())
      .then((data) => setFruitData(data));
  };

  // useRef
  const plus = useRef(0);
  const [display, setDisplay] = useState(0);

  function plusOne() {
    plus.current++;
    // setDisplay(plus.current);
    console.log("State: ", display);
    console.log("Ref: ", plus);
  }

  return (
    <>
      <div id="usestate">
        <h4>useState</h4>
        <button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Count: {count}
        </button>
        <br />
        <br />
        <div>
          List of ways to say hello:
          <ul>
            {namelist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <br />
          Know one?{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button onClick={addName}>Add</button>
        </div>
      </div>
      <hr />
      <div id="usereducer">
        <h4>useReducer</h4>
        <div>Number: {state.number}</div>
        <button onClick={() => dispatch({ type: "INCREMENT" })}>
          PLUS ONE
        </button>
        <button onClick={() => dispatch({ type: "DECREMENT" })}>
          MINUS ONE
        </button>
        <button onClick={() => dispatch({ type: "ZERO" })}>RESTART</button>
      </div>
      <hr />
      <div id="usememo">
        <h4>useMemo</h4>
        <h5>A calculation without UseMemo</h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCount1Bad(e.target.number.value);
            totalCountBad();
          }}
        >
          <input type="number" name="number" />
          <button type="submit">Submit</button>
          <div>Calculation: {badtotalcount}</div>
        </form>
        <br />
        <h5>A calculation with UseMemo</h5>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCount1(e.target.number.value);
          }}
        >
          <input type="number" name="number" />
          <button type="submit">Submit</button>
          <div>Calculation: {totalCount}</div>
        </form>
      </div>
      <hr />
      <h4>useCallback</h4>
      <div>CORRECT</div>
      <div id="usecallback" style={theme}>
        <input
          type="number"
          value={number}
          onChange={(e) => {
            setNumber(parseInt(e.target.value));
          }}
        />
        <button onClick={() => setDarkmode((prevDark) => !prevDark)}>
          SwitchTheme
        </button>
        <GetList getNumbers={getNumbers} />
        <br />
      </div>
      <div style={BADtheme}>
        <div>WRONG</div>
        <input
          type="number"
          value={numberBAD}
          onChange={(e) => {
            setNumberBAD(parseInt(e.target.value));
          }}
        />
        <button onClick={() => setDarkmodeBAD((prevDark) => !prevDark)}>
          SwitchTheme
        </button>
        <h4>{getNumbersBAD()}</h4>
      </div>
      <hr />
      <div id="useeffect">
        <h4>useEffect</h4>
        <div>Fruits:</div>
        {fruits.map((fruit) => (
          <button key={fruit} onClick={() => onFruitSelect(fruit)}>
            {fruit}
          </button>
        ))}
        <div>Data: {JSON.stringify(fruitData)}</div>
      </div>
      <hr />
      <div id="useref">
        <h4>UseRef</h4>
        Count clicker:
        <div>Ref value: {plus.current}</div>
        <button onClick={plusOne}>Click: {display}</button>
      </div>
    </>
  );
}

export default Hooks;
