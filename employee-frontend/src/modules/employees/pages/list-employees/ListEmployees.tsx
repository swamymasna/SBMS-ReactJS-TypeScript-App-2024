import React, { useEffect, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import { EmployeeService } from "../../services/EmployeeService";
import { ToastUtil } from "../../../../utils/ToastUtil";
import NoRecordFound from "../../components/NoRecordFound";
import { Link } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import SpinnerUI from "../../components/SpinnerUI";

interface IState {
  employees: IEmployee[];
  loading: boolean;
  errorMessage: string;
}

const ListEmployees: React.FC = () => {
  const [state, setState] = useState<IState>({
    employees: [] as IEmployee[],
    loading: false,
    errorMessage: "",
  });

  const fetchAllEmployees = () => {
    setState({ ...state, loading: true });
    EmployeeService.getAllEmployees()
      .then((response) => {
        setState({
          ...state,
          loading: false,
          employees: response.data,
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
    fetchAllEmployees();
  }, []);

  const removeEmployee = (id: any): any => {
    EmployeeService.deleteEmployee(id)
      .then((response) => {
        if (response) {
          fetchAllEmployees();
          ToastUtil.displaySuccessToast("Employee is Deleted");
        }
      })
      .catch((error) => {
        ToastUtil.displayErrorToast("Failed to Delete Employee");
      });
  };

  let { employees, errorMessage, loading } = state;

  return (
    <>
      {loading && <SpinnerUI />}
      {Object.keys(errorMessage).length > 0 && (
        <ErrorMessage message={errorMessage} />
      )}
      {!errorMessage && !loading && employees.length > 0 ? (
        <div className="container mt-2">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center">Employees List Details</h2>
            </div>
            <div className="card-body tableData">
              <table className="table table-bordered table-hover ">
                <thead>
                  <tr>
                    <th>Employee-Id</th>
                    <th>Employee-Name</th>
                    <th>Employee-Salary</th>
                    <th>Employee-Address</th>
                    <th colSpan={3}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.employeeId}>
                      <td>{employee.employeeId}</td>
                      <td>{employee.employeeName}</td>
                      <td>&#8377; {employee.employeeSalary.toFixed(2)}</td>
                      <td>{employee.employeeAddress}</td>

                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeEmployee(employee.employeeId)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>

                      <td>
                        <Link
                          to={`/update-employee/${employee.employeeId}`}
                          className="btn btn-info"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                      </td>

                      <td>
                        <Link
                          to={`/view-employee/${employee.employeeId}`}
                          className="btn btn-dark"
                        >
                          <i className="bi bi-eye"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <NoRecordFound />
      )}
    </>
  );
};

export default ListEmployees;
