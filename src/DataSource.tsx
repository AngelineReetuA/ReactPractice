import React, { useReducer } from "react";
import {
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";

// to solve the 'never' array issue
// interface - like a pre-defined frame for an object
interface Employee {
  name: string;
  language: string;
  id: string;
  bio: string;
  version: GLfloat;
}

// A custom hook to fetch employees.json
function useEmployeesSource(): {
  // return type definition for typescript
  emps: Employee[];
  search: string;
  setSearch: (search: string) => void;
} {
  // types to define in the useReducer
  type EmployeeState = {
    emps: Employee[];
    search: string;
  };
  type EmployeeActions =
    | { type: "setEmployee"; payload: Employee[] }
    | { type: "setSearch"; payload: string };

  // useReducer syntax:
  // const [state, dispatch] = useReducer(reducerFunction(state, action {like a switchCase}), initialArguments)
  const [{ emps, search }, dispatch] = useReducer(
    (state: EmployeeState, action: EmployeeActions) => {
      switch (action.type) {
        case "setEmployee":
          return { ...state, emps: action.payload };
        case "setSearch":
          return { ...state, search: action.payload };
      }
    },
    {
      emps: [],
      search: "",
    }
  );

  // fetches the data and calls a reducer dispatch to send data
  useEffect(() => {
    fetch("./data/employees.json")
      .then((resp) => resp.json())
      .then((data) =>
        dispatch({
          type: "setEmployee",
          payload: data,
        })
      );
  }, []);

  // setting the search value using the reducer dispatch function
  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  // to filter the array each time search value changes
  const filteredEmps = useMemo(() => {
    return emps.filter((em) => em.name.includes(search));
  }, [emps, search]);

  return { emps: filteredEmps, search, setSearch };
}

export function useEmployees() {
  return useContext(EmployeeContext)!;
}

// using useContext to avoid prop-drilling
export const EmployeeContext = createContext<
  ReturnType<typeof useEmployeesSource> | undefined
>({} as unknown as ReturnType<typeof useEmployeesSource>);

// a provider which takes all the context logic and provides just the result
// so that we dont have to export all the functions to the main file
export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <EmployeeContext.Provider value={useEmployeesSource()}>
        {children}
      </EmployeeContext.Provider>
    </>
  );
}
