import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return await this.PrismaService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Role) {
    if (role)
      return this.PrismaService.employee.findMany({
        where: {
          role,
        },
      });
    return this.PrismaService.employee.findMany();
  }

  async findOne(id: number) {
    return this.PrismaService.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.PrismaService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.PrismaService.employee.delete({
      where: {
        id,
      },
    });
  }
}
