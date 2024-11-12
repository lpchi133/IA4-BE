import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    register(dto: RegisterUserDto): Promise<{
        message: string;
    }>;
    validateUser(email: string, password: string): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        password: string;
    }>;
    login(user: any): Promise<{
        accessToken: string;
    }>;
}
