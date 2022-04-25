import React, { useState, useEffect } from "react";
import Dropdown from "./dropdown";

export default function App() {
  const [value, setValue] = useState(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let employeeData= [];

  useEffect(() => {
    async function getEmployeeData() {
      const response = await fetch("https://gist.githubusercontent.com/daviferreira/41238222ac31fe36348544ee1d4a9a5e/raw/5dc996407f6c9a6630bfcec56eee22d4bc54b518/employees.json");
      const result = await response.json();
      result.data.forEach(data => {
        employeeData.push(data.attributes);
         return employeeData;
       })
    }
    getEmployeeData();
  }, [employeeData]);

  return <div className="container mt-5" style={{width: 200}}>
    <Dropdown 
      options={ employeeData } 
      prompt="Select Manager..."
      value={value}
      id="id"
      label="name"
      onChange={ val => setValue(val) }/>
    </div>;
}
