import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee) private employeeRepositry: Repository<Employee>,
  ) {}
  async create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.employeeRepositry.create(employeeData);
    return this.employeeRepositry.save(employee);
  }
  async getAll(): Promise<Employee[]> {
    return this.employeeRepositry.find();
  }
  async getById(id: number): Promise<Employee> {
    const employee = await this.employeeRepositry.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }
  async updateEmployee(
    id: number,
    updateData: Partial<Employee>,
  ): Promise<Employee> {
    const employee = await this.employeeRepositry.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    const update = Object.assign(employee, updateData);
    return this.employeeRepositry.save(update);
  }
  async deleteEmployee(id: number): Promise<{ message: string }> {
    const result = await this.employeeRepositry.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return { message: `Employee with Id ${id} has been deleted!` };
  }
  async search(filters: {
    name?: string;
    department?: string;
  }): Promise<Employee[]> {
    const query = this.employeeRepositry.createQueryBuilder('employee');
    if (filters.name) {
      query.andWhere('employee.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }
    if (filters.department) {
      query.andWhere('employee.department = :department', {
        department: `${filters.department}`,
      });
    }
    return query.getMany();
  }
}
