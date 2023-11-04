import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Employees.css";
import { NavLink } from "react-router-dom";

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/employees")
      .then((response) => {
        setEmployees(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных о сотрудниках:", error);
      });
  }, []);

  return (
    <div className="employeee">
      <div className="container ">
        <h2 className="container-title mb-4">
          Співробітники санітарної частини
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Ім'я</th>
              <th>Посада</th>
              <th>Ранг</th>
              <th>Контактна інформація</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.emploeeId}>
                <td>{employee.emploeeId}</td>
                <NavLink
                  className="links"
                  to={{ pathname: `/api/employees/profile/${employee.emploeeId}` }}
                >
                  <td title={employee.name}>{employee.name}</td>
                </NavLink>
                <td>{employee.position}</td>
                <td>{employee.rank}</td>
                <td>{employee.contactinformation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeesPage;
