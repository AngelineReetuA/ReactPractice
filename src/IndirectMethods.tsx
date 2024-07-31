import React from "react";
import { EmployeeProvider, useEmployees } from "./DataSource.tsx";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Employee } from "./Employee.jsx";

// import and tell react that we are going to use query
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

const EmployeeList = () => {
  const { emps } = useEmployees();

  return (
    <>
      {emps.map((oneEmp) => (
        <Link key={oneEmp.id} to={`/${oneEmp.id}`}>
          <div
            style={{ padding: "10px", border: "1px solid" }}
          >
            {oneEmp.name}
          </div>
        </Link>
      ))}
    </>
  );
};

export function SearchBox() {
  const { search, setSearch } = useEmployees();
  return (
    <>
      <input
        type="text"
        placeholder="search"
        value={search}
        style={{ width: "50%", padding: "20px", marginBottom: "10px" }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </>
  );
}

const ListHome = () => {
  return (
    <div style={{ padding: "20px" }}>
      <b>UseContext & Custom Hooks with React Router</b>
      <br />
      <br />
      <div>Search for a name:</div>
      <SearchBox />
      <EmployeeList />
    </div>
  );
};

function IndirectMethods() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <EmployeeProvider>
          <Routes>
            <Route path="/" element={<ListHome />} />
            <Route path="/:id" element={<Employee />} />
          </Routes>
        </EmployeeProvider>
      </QueryClientProvider>
    </>
  );
}

export default IndirectMethods;
