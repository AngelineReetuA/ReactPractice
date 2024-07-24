import { useReducer, useState, useMemo, useCallback } from "react";

function App() {
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
  const [names] = useState(["Zebra", "Donkey", "Giraffe", "Alpaca"]);
  const sortedNames = useMemo(() => [...names].sort(), [names]);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const totalCount = useMemo(()=> count1+count2, [count1, count2])

  // useCallback
  const initialItems = ["Zebra", "Donkey", "Giraffe", "Alpaca"];
  const [items, setItems] = useState(initialItems);
  let filteredItems = [];

  const handleSearch = useCallback(
    (e) => {
      console.log("handle search rendered!");
      if (!e.target.value) {
        console.log("empty value");
        setItems(initialItems);
      }
      filteredItems = initialItems.filter((item) =>
        item.includes(e.target.value)
      );
      setItems(filteredItems);
    },
    [filteredItems]
  );

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
        Names: {names.join(", ")}
        <br />
        SortedNames: {sortedNames.join(", ")}
        <br />
        <h5>Double counter</h5>
        <button onClick={() => setCount1(count1 + 1)}>Count {count1}</button>
        <button onClick={() => setCount2(count2 + 1)}>Count {count2}</button>
        <div>Total of two counts: {totalCount}</div>
      </div>
      <hr />
      <div id="usecallback">
        <h4>useCallback</h4>
        <input placeholder="dummy input" /><br/><br/>
        Search: <input type="text" onChange={handleSearch} />
        {items.map((item) => (
          <div key={item}>{item}</div>
        ))}
      </div>
    </>
  );
}

export default App;
