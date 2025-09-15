import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get('interns') // GET /users/interns
  findAllInterns() {
    return this.usersService.findAll('INTERN');
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}

// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
//   Query,
// } from '@nestjs/common';
// import { UsersService } from './users.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get() // GET /users or /users?role=value
//   findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
//     return this.usersService.findAll(role);
//   }

//   @Get(':id') // GET /users/:id
//   findOne(@Param('id') id: string) {
//     return this.usersService.findOne(+id);
//   }

//   @Post() // POST /users
//   create(
//     @Body()
//     user: {
//       name: string;
//       email: string;
//       role: 'INTERN' | 'ENGINEER' | 'ADMIN';
//     },
//   ) {
//     return this.usersService.create(user);
//   }

//   @Patch(':id') // PATCH /users/:id
//   update(
//     @Param('id') id: string,
//     @Body()
//     userUpdate: {
//       name?: string;
//       email?: string;
//       role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
//     },
//   ) {
//     return this.usersService.update(+id, userUpdate);
//   }

//   @Delete(':id') // DELETE /users/:id
//   delete(@Param('id') id: string) {
//     return this.usersService.delete(+id);
//   }
// }

// Pipes

// A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.

// ParseIntPipe and ValidationPipe are built -in pipes in NestJS used for transforming and validating data, respectively.They are used in controllers to ensure that incoming data from HTTP requests meets the expected format and constraints.

// ParseIntPipe is a transformation pipe.Its primary usage is to convert a string from a route parameter or query string into a JavaScript number.

// ValidationPipe is a validation pipe.Its main usage is to validate the structure and content of an incoming request body against a Data Transfer Object(DTO).
