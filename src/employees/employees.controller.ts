import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employees.entity';
import { SupabaseAuthGuard } from 'src/auth/supabase-auth/supabase-auth.guard';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeesService) {}

  @Post()
  async createEmployee(@Body() body: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(body);
  }
  @UseGuards(SupabaseAuthGuard)
  @Get()
  async getAllEmployee(): Promise<Employee[]> {
    return this.employeeService.getAll();
  }
  @Get('search')
  async searchEmployee(
    @Query('name') name?: string,
    @Query('department') department?: string,
  ): Promise<Employee[]> {
    return this.employeeService.search({ name, department });
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
  @Delete(':id')
  async deleteEmployee(@Param('id') id: number): Promise<{ message: string }> {
    return this.employeeService.deleteEmployee(id);
  }
}
