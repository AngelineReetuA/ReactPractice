import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function Employee() {
  const location = useLocation();
  const empID = location.pathname.replace("/", "");
  const [userData, setUserData] = useState()
  fetch("./data/employees.json")
    .then((res) => res.json())
    .then((data) => {
        const filtered = data.filter((d) => d.id === empID)
        setUserData(JSON.stringify(filtered))
    });

  return (
    <>
      <div>Employee Details</div>
      {userData}
    </>
  );
}
