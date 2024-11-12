"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existingUser = await this.userService.findByUsernameOrEmail(dto.username, dto.email);
        if (existingUser) {
            throw new common_1.BadRequestException(existingUser.username === dto.username
                ? 'Username already in use.'
                : 'Email already in use.');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        await this.userService.createUser({
            username: dto.username,
            email: dto.email,
            name: dto.name,
            password: hashedPassword,
        });
        return { message: 'Registration successful!' };
    }
    async validateUser(email, password) {
        const findUser = await this.userService.findByEmail(email);
        if (!findUser) {
            throw new common_1.BadRequestException('Email is not registered.');
        }
        if (!(await bcrypt.compare(password, findUser.password))) {
            throw new common_1.BadRequestException('Password is incorrect.');
        }
        return findUser;
    }
    async login(user) {
        const { password: pass, ...payload } = user;
        return { accessToken: this.jwtService.sign(payload) };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map