import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUsernameOrEmail(username: string, email: string): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        password: string;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        password: string;
    }>;
    createUser(data: {
        username: string;
        email: string;
        name: string;
        password: string;
    }): Promise<{
        id: number;
        username: string;
        email: string;
        name: string;
        password: string;
    }>;
    getUserProfile(userId: number): Promise<{
        username: string;
        email: string;
        name: string;
    }>;
}
