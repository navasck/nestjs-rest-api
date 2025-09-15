import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// The PartialType function from @nestjs/mapped-types is a utility that creates a new class with all the properties of the input class (CreateUserDto) set to optional. This is particularly useful for Update DTOs in PATCH requests, where you only need to send the fields you want to update, not the entire object.
