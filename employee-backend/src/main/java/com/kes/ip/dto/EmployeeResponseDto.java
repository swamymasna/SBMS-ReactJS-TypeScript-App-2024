package com.kes.ip.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponseDto {

	private Integer employeeId;

	private String employeeName;

	private Double employeeSalary;

	private String employeeAddress;

	private Date createdDate;

	private Date updatedDate;

}
