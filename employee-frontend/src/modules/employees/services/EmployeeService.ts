import axios from "axios";
import { IEmployee } from "../models/IEmployee";

export class EmployeeService {
  static serverUrl: string = `http://localhost:8081/api/employees`;

  /**
   * @usage : get all employees
   * @method : GET
   * @params : no-params
   * @url : http://localhost:8081/api/employees
   */
  public static getAllEmployees(): Promise<IEmployee[] | any> {
    return axios.get(`${this.serverUrl}`);
  }

  /**
   * @usage : get employee by id
   * @method : GET
   * @params : employeeId
   * @url : http://localhost:8081/api/employees/:employeeId
   */
  public static getEmployeeById(employeeId: any): Promise<IEmployee | any> {
    return axios.get(`${this.serverUrl}/${employeeId}`);
  }

  /**
   * @usage : save employee
   * @method : POST
   * @params : employee
   * @url : http://localhost:8081/api/employees
   */
  public static saveEmployee(employee: IEmployee): Promise<IEmployee> {
    return axios.post(`${this.serverUrl}`, employee);
  }

  /**
   * @usage : update employee
   * @method : PUT
   * @params : employeeId, employee
   * @url : http://localhost:8081/api/employees/:employeeId
   */
  public static updateEmployee(
    employeeId: any,
    employee: IEmployee
  ): Promise<IEmployee | any> {
    return axios.put(`${this.serverUrl}/${employeeId}`, employee);
  }

  /**
   * @usage : delete employee by id
   * @method : DELETE
   * @params : employeeId
   * @url : http://localhost:8081/api/employees/:employeeId
   */
  public static deleteEmployee(employeeId: any): Promise<any> {
    return axios.delete(`${this.serverUrl}/${employeeId}`);
  }
}
