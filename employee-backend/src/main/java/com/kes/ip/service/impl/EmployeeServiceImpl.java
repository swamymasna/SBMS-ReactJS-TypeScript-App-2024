package com.kes.ip.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.kes.ip.dto.EmployeeRequestDto;
import com.kes.ip.dto.EmployeeResponseDto;
import com.kes.ip.entity.Employee;
import com.kes.ip.exception.EmployeeServiceBusinessException;
import com.kes.ip.exception.ResourceNotFoundException;
import com.kes.ip.repository.EmployeeRepository;
import com.kes.ip.service.EmployeeService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

	private EmployeeRepository employeeRepository;

	private ModelMapper modelMapper;

	@Override
	public EmployeeResponseDto saveEmployee(EmployeeRequestDto empReqDto) {

		EmployeeResponseDto employeeResponseDto = null;

		Employee employee = null;

		try {

			employee = modelMapper.map(empReqDto, Employee.class);

			employee = employeeRepository.save(employee);

			if (employee != null) {
				employeeResponseDto = modelMapper.map(employee, EmployeeResponseDto.class);

			} else {
				employeeResponseDto = null;
			}

		} catch (Exception ex) {
			throw new EmployeeServiceBusinessException(
					String.format("Exception Occured While Saving Employee Into the Database : %s", ex));
		}

		return employeeResponseDto;
	}

	@Override
	public List<EmployeeResponseDto> getAllEmployees() {

		List<EmployeeResponseDto> employeesList = null;

		List<Employee> employees = null;

		try {

			employees = employeeRepository.findAll();

			if (!employees.isEmpty()) {
				employeesList = employees.stream().map(employee -> modelMapper.map(employee, EmployeeResponseDto.class))
						.collect(Collectors.toList());
			} else {
				employeesList = Collections.emptyList();
			}

		} catch (Exception ex) {
			throw new EmployeeServiceBusinessException(
					String.format("Exception Occured While Fetching Employees From the Database : %s", ex));
		}

		return employeesList;
	}

	@Override
	public EmployeeResponseDto getEmployeeById(Integer employeeId) {

		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException(String.format("Employee Not Found With Id : %s", employeeId)));

		return modelMapper.map(employee, EmployeeResponseDto.class);
	}

	@Override
	public EmployeeResponseDto updateEmployee(Integer employeeId, EmployeeRequestDto empReqDto) {

		EmployeeResponseDto employeeResponseDto = null;

		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException(String.format("Employee Not Found With Id : %s", employeeId)));

		try {

			employee.setEmployeeName(empReqDto.getEmployeeName());
			employee.setEmployeeSalary(empReqDto.getEmployeeSalary());
			employee.setEmployeeAddress(empReqDto.getEmployeeAddress());

			employee = employeeRepository.save(employee);

			if (employee != null) {
				employeeResponseDto = modelMapper.map(employee, EmployeeResponseDto.class);
			} else {
				employeeResponseDto = null;
			}

		} catch (Exception ex) {
			throw new EmployeeServiceBusinessException(
					String.format("Exception Occured While Updating Employees into the Database : %s", ex));

		}

		return employeeResponseDto;
	}

	@Override
	public String deleteEmployee(Integer employeeId) {

		String message = null;

		Employee employee = employeeRepository.findById(employeeId).orElseThrow(
				() -> new ResourceNotFoundException(String.format("Employee Not Found With Id : %s", employeeId)));

		try {

			if (employee.getEmployeeId().equals(employeeId)) {
				employeeRepository.deleteById(employeeId);
				message = "Employee Deleted Successfully With Id : " + employeeId;
			} else {
				message = "Failed to Delete an Employee..?";
			}

		} catch (Exception ex) {
			throw new EmployeeServiceBusinessException(
					String.format("Exception Occured While Deleting Employee From the Database : %s", ex));

		}

		return message;
	}

}
