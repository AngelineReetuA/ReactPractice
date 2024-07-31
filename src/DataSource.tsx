import React, { useReducer } from "react";
import {
  useEffect,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useQuery } from "@tanstack/react-query";

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
    search: string;
  };
  type EmployeeActions =
    | { type: "setSearch"; payload: string };

  // useReducer syntax:
  // const [state, dispatch] = useReducer(reducerFunction(state, action {like a switchCase}), initialArguments)
  const [{  search }, dispatch] = useReducer(
    (state: EmployeeState, action: EmployeeActions) => {
      switch (action.type) {
        case "setSearch":
          return { ...state, search: action.payload };
      }
    },
    {
      search: "",
    }
  );

  // react query
  const {data: emps} = useQuery({
    queryKey: ["emps"],
    queryFn: () => fetch('./data/employees.json').then((res)=>{
      if(!res.ok){
        throw new Error("Error is fetching!")
      }
      return res.json()
    }),
    initialData: [],
  })

  // setting the search value using the reducer dispatch function
  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  // to filter the array each time search value changes
  const filteredEmps = useMemo(() => {
    return emps.filter((em) => em.name.toLowerCase().includes(search.toLowerCase()));
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
