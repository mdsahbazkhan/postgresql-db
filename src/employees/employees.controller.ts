import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() body: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(body);
  }
  @Get()
  async getAllEmployee(): Promise<Employee[]> {
    return this.employeeService.getAll();
  }
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.getById(id);
  }
  @Put(':id')
  async updateEmployee(
    @Param('id') id: number,
    @Body() body: Partial<Employee>,
  ): Promise<Employee> {
    return this.employeeService.updateEmployee(id, body);
  }
}
