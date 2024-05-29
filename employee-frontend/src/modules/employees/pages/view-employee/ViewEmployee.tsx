import React, { useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import { EmployeeService } from "../../services/EmployeeService";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface IState {
  employee: IEmployee;
  errorMessage: string;
  loading: boolean;
}

const ViewEmployee: React.FC = () => {
  let { id } = useParams();

  const [state, setState] = useState<IState>({
    employee: {} as IEmployee,
    errorMessage: "",
    loading: false,
  });

  const fetchEmployeeById = () => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setState({
          ...state,
          employee: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      });
  };

  useEffect(() => {
    fetchEmployeeById();
  }, [id]);

  let { employee, errorMessage, loading } = state;

  return (
    <>
      <div className="container mt-2 col-md-5 m-auto">
        <div className="card shadow-lg">
          <div className="card-header bg-success text-white">
            <h1>Employee Details</h1>
          </div>
          <div className="card-body">
            <ul className="list-group ulData">
              <li className="list-group-item">
                Employee-Id : <b>{employee.employeeId}</b>
              </li>
              <li className="list-group-item">
                Employee-Name : <b>{employee.employeeName}</b>
              </li>
              <li className="list-group-item">
                Employee-Salary : <b>&#8377; {employee.employeeSalary}.00</b>
              </li>
              <li className="list-group-item">
                Employee-Address : <b>{employee.employeeAddress}</b>
              </li>
            </ul>
            <div className="mt-2 col-md-3">
              <Link to={"/"} className="btn btn-primary">
                <i className="bi bi-arrow-left-circle "></i>
                <span className="ms-2">Go Back</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewEmployee;
