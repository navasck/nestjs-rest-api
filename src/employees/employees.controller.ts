import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma, Role } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name);

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.logger.log(
      `Request for ALL Employees\t${ip}`,
      EmployeesController.name,
    );
    // return this.employeesService.findAll(role);
    try {
      return this.employeesService.findAll(role);
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}

// The @SkipThrottle() decorator is applied at the class level (EmployeesController).This means all endpoints in this controller are excluded from any default, global throttling rules defined in your NestJS application.

// @Ip(): This decorator injects the client's IP address into the ip parameter, which is then used for logging.

// common subclasses of NestJS's HttpException.

// BadRequestException(400 Bad Request)

// UnauthorizedException(401 Unauthorized)

// NotFoundException(404 Not Found)

// ForbiddenException(403 Forbidden)

// InternalServerErrorException(500 Internal Server Error)
