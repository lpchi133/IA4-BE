import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterUserDto): Promise<{
        message: string;
    }>;
    login(req: any): Promise<{
        accessToken: string;
    }>;
}
