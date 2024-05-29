import React, { ChangeEvent, FormEvent, useState } from "react";
import { IEmployee } from "../../models/IEmployee";
import { EmployeeService } from "../../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import { ToastUtil } from "../../../../utils/ToastUtil";

const CreateEmployee: React.FC = () => {
  let navigate = useNavigate();

  let [employee, setEmployee] = useState<IEmployee>({
    employeeName: "",
    employeeSalary: "",
    employeeAddress: "",
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | any>) => {
    setEmployee({
      ...employee,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();
    console.log(employee);

    EmployeeService.saveEmployee(employee)
      .then((response) => {
        if (response) {
          navigate("/employees");
          ToastUtil.displaySuccessToast(`Employee is Saved`);
        }
      })
      .catch((error) => {
        ToastUtil.displayErrorToast("Failed to Save Employee..?");
        console.log(error);
      });
  };

  let { employeeId, employeeName, employeeSalary, employeeAddress } = employee;

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card">
              <div className="card-header bg-warning">
                <h2>Register Employee</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
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
                      value={"Register"}
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

export default CreateEmployee;
