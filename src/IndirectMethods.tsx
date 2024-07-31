import React from "react";
import { EmployeeProvider, useEmployees } from "./DataSource.tsx";

const EmployeeList = () => {
  const { emps } = useEmployees();
  return (
    <>
      {emps.map((oneEmp) => (
        <div key={oneEmp.id} style={{ padding: "10px" }}>
          {oneEmp.name}
        </div>
      ))}
    </>
  );
};

function SearchBox() {
  const { search, setSearch } = useEmployees();
  return (
    <>
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </>
  );
}

function IndirectMethods() {
  return (
    <>
      <EmployeeProvider>
        <div style={{ padding: "20px" }}>
          <b>UseContext & Custom Hooks with Tanstack Router</b>
          <br/><br/>
          <div>Search for a name:</div>
          <SearchBox />
          <EmployeeList />
        </div>
      </EmployeeProvider>
    </>
  );
}

export default IndirectMethods;
