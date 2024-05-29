package com.kes.ip.service;

import java.util.List;

import com.kes.ip.dto.EmployeeRequestDto;
import com.kes.ip.dto.EmployeeResponseDto;

public interface EmployeeService {

	EmployeeResponseDto saveEmployee(EmployeeRequestDto empReqDto);

	List<EmployeeResponseDto> getAllEmployees();

	EmployeeResponseDto getEmployeeById(Integer employeeId);

	EmployeeResponseDto updateEmployee(Integer employeeId, EmployeeRequestDto empReqDto);

	String deleteEmployee(Integer employeeId);

}
