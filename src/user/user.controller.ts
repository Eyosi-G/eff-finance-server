import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/auth.decorator';
import { JwtGuard } from 'src/auth/guard/jwt-guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  getUsers(@GetUser() user: User) {
    return this.userService.getUsers(user);
  }

  @Post()
  addUser(@Body() data: CreateUserDto) {
    console.log(data)
    return this.userService.createUser(data);
  }

  @Delete(":id")
  deleteUser(@Param("id") id: number){
    return this.userService.deleteUser(id)
  }
}


