import React, { useEffect, useState } from "react";
import axios from "axios";
const Pagination = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [employeePerPage, setEmployeePerPage] = useState(10);
  const [isDisabled, setIsDisabled] = useState(false);

  const getEmployeeData = async () => {
    const res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    console.log(res.data);
    setEmployeeData(res.data);
  };
  useEffect(() => {
    getEmployeeData();
  }, []);
  //get current data
  const indexOfLastEmployee = currentPage * employeePerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeePerPage;
  currentEmployees = employeeData.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalItems = currentEmployees.length * employeePerPage;
  const totalPages = Math.ceil(totalItems / employeePerPage);

  const prevPage = () => {
    if (currentPage !== indexOfFirstEmployee) {
      setCurrentpage(currentPage - 1);
    }
    if (currentPage === 1) {
      setCurrentpage(1);
    }
  };
  const nextPage = () => {
    if (currentPage !== indexOfLastEmployee) {
      setCurrentpage(currentPage + 1);
    }
    if (currentPage === indexOfLastEmployee) {
      setCurrentpage(indexOfLastEmployee);
    }

    // if (currentPage === indexOfLastEmployee) {
    //   setCurrentpage(indexOfLastEmployee);
    // }
  };

  return (
    <div>
      <h4>Employee Data Table</h4>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        {currentEmployees.map((employee) => {
          return (
            <tr>
              <td key={employee.id}>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          );
        })}
      </table>
      <div className="btns">
        <button onClick={prevPage}>Previous</button>
        <button>{currentPage}</button>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};
export default Pagination;
