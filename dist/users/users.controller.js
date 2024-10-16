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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const user_dto_1 = require("../users/dto/user.dto");
let UsersController = class UsersController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(body) {
        return this.authService.register(body.email, body.password);
    }
    async login(body) {
        return this.authService.login(body.email, body.password);
    }
    async getProfile(authHeader) {
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Token is required');
        }
        const decodedToken = await this.authService.validateToken(token);
        return { message: 'Access granted to profile', user: decodedToken };
    }
    async getAdmin(authHeader) {
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Token is required');
        }
        const decodedToken = await this.authService.validateToken(token);
        const hasAdminRole = await this.authService.hasRole(decodedToken, ['admin']);
        if (!hasAdminRole) {
            throw new common_1.UnauthorizedException('Access denied. Admin role required');
        }
        return { message: 'Access granted to admin area' };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAdmin", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], UsersController);
//# sourceMappingURL=users.controller.js.map