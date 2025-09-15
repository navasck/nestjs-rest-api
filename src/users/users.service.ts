import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yesenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User Role Not Found');
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User Not Found');

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}

// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class UsersService {
//   private users = [
//     {
//       id: 1,
//       name: 'Leanne Graham',
//       email: 'Sincere@april.biz',
//       role: 'INTERN',
//     },
//     {
//       id: 2,
//       name: 'Ervin Howell',
//       email: 'Shanna@melissa.tv',
//       role: 'INTERN',
//     },
//     {
//       id: 3,
//       name: 'Clementine Bauch',
//       email: 'Nathan@yesenia.net',
//       role: 'ENGINEER',
//     },
//     {
//       id: 4,
//       name: 'Patricia Lebsack',
//       email: 'Julianne.OConner@kory.org',
//       role: 'ENGINEER',
//     },
//     {
//       id: 5,
//       name: 'Chelsey Dietrich',
//       email: 'Lucio_Hettinger@annie.ca',
//       role: 'ADMIN',
//     },
//   ];

//   findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
//     if (role) {
//       return this.users.filter((user) => user.role === role);
//     }
//     return this.users;
//   }

//   findOne(id: number) {
//     const user = this.users.find((user) => user.id === id);

//     return user;
//   }

//   create(user: {
//     name: string;
//     email: string;
//     role: 'INTERN' | 'ENGINEER' | 'ADMIN';
//   }) {
//     const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
//     const newUser = {
//       id: usersByHighestId[0].id + 1,
//       ...user,
//     };
//     this.users.push(newUser);
//     return newUser;
//   }

//   update(
//     id: number,
//     updatedUser: {
//       name?: string;
//       email?: string;
//       role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
//     },
//   ) {
//     this.users = this.users.map((user) => {
//       if (user.id === id) {
//         return { ...user, ...updatedUser };
//       }
//       return user;
//     });

//     return this.findOne(id);
//   }

//   delete(id: number) {
//     const removedUser = this.findOne(id);

//     this.users = this.users.filter((user) => user.id !== id);

//     return removedUser;
//   }
// }

// The NotFoundException from @nestjs/common is a built-in exception class that represents an HTTP 404 Not Found error. 🚫 Its primary purpose is to signal to the client that the requested resource could not be found on the server.

// NestJS provides a wide range of built -in HTTP exceptions

// 4xx Client Error Exceptions
// These exceptions indicate that the client has made an error.

//   BadRequestException: Thrown for HTTP 400 Bad Request errors.Use this when the request body is malformed, or the data doesn't make sense (e.g., trying to create a user with a negative age).

// UnauthorizedException: Thrown for HTTP 401 Unauthorized errors.Use this when a request lacks valid authentication credentials(e.g., a missing or expired JWT).This is typically handled by authentication guards.

//   ForbiddenException: Thrown for HTTP 403 Forbidden errors.Use this when a client is authenticated but does not have the necessary permissions to access a resource(e.g., a non - admin user trying to delete a user account).This is typically handled by authorization guards.

//     ConflictException: Thrown for HTTP 409 Conflict errors.Use this when a request conflicts with the current state of the server.A common use case is trying to create a resource that already exists, like a user with an email that is already in the database.

//       NotAcceptableException: Thrown for HTTP 406 Not Acceptable errors.Use this when the client's requested format (e.g., via the Accept header) cannot be fulfilled by the server.

// 5xx Server Error Exceptions
// These exceptions indicate an error on the server side.While you typically don't throw these manually, it's good to be aware of them.

//   InternalServerErrorException: Thrown for HTTP 500 Internal Server Error.This is a generic server - side error.NestJS will throw this automatically for unhandled exceptions in your code.

//     BadGatewayException: Thrown for HTTP 502 Bad Gateway errors.

//       ServiceUnavailableException: Thrown for HTTP 503 Service Unavailable errors.Use this when the server is temporarily unable to handle the request due to maintenance or overload.

// By using these specific exception classes, you ensure your API responses are standardized and easily understood by client applications, making your API more reliable and easier to integrate with.
