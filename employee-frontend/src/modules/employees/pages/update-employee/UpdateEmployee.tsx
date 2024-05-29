import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IEmployee } from "../../models/IEmployee";
import { EmployeeService } from "../../services/EmployeeService";
import { ToastUtil } from "../../../../utils/ToastUtil";

const UpdateEmployee: React.FC = () => {
  let navigate = useNavigate();
  let { id } = useParams();

  let [employee, setEmployee] = useState<IEmployee>({
    employeeId: "",
    employeeName: "",
    employeeSalary: "",
    employeeAddress: "",
  });

  const fetchEmployeeById = () => {
    EmployeeService.getEmployeeById(id)
      .then((response) => {
        setEmployee({
          ...employee,
          employeeId: response.data.employeeId,
          employeeName: response.data.employeeName,
          employeeSalary: response.data.employeeSalary,
          employeeAddress: response.data.employeeAddress,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEmployeeById();
  }, [id]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | any>) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();
    console.log(employee);

    EmployeeService.updateEmployee(id, employee)
      .then((response) => {
        if (response) {
          navigate("/employees");
          ToastUtil.displaySuccessToast(`Employee is Updated`);
        }
      })
      .catch((error) => {
        ToastUtil.displayErrorToast("Failed to Update Employee..?");
        console.log(error);
      });
  };

  let { employeeId,employeeName, employeeSalary, employeeAddress } = employee;

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card">
              <div className="card-header bg-info">
                <h2>Edit Employee</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>

                <div className="mt-2">
                    <input
                      type="text"
                      name="employeeId"
                      value={employeeId}
                      onChange={handleOnChange}
                      readOnly
                      className="form-control bg-info-subtle fw-bold"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      name="employeeName"
                      value={employeeName}
                      onChange={handleOnChange}
                      placeholder="Enter Employee Name"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      name="employeeSalary"
                      value={employeeSalary}
                      onChange={handleOnChange}
                      placeholder="Enter Employee Salary"
                      className="form-control"
                    />
                  </div>

                  <div className="mt-2">
                    <input
                      type="text"
                      name="employeeAddress"
                      value={employeeAddress}
                      onChange={handleOnChange}
                      placeholder="Enter Employee Address"
                      className="form-control"
                    />
                  </div>

                  <div className="col-md-1 mt-2">
                    <input
                      type="submit"
                      value={"Update"}
                      className="btn btn-success"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateEmployee;
