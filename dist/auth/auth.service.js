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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const util_1 = require("util");
const dotenv = require("dotenv");
dotenv.config();
const scrypt = (0, util_1.promisify)(crypto_1.scrypt);
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';
        this.saltLength = 16;
    }
    async hashPassword(password) {
        const salt = (0, crypto_1.randomBytes)(this.saltLength).toString('hex');
        const hash = (await scrypt(password, salt, 64));
        return { salt, hash: hash.toString('hex') };
    }
    async validatePassword(password, hash, salt) {
        const hashedPassword = (await scrypt(password, salt, 64));
        return hashedPassword.toString('hex') === hash;
    }
    async register(email, password) {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.BadRequestException('User already exists');
        }
        const { salt, hash } = await this.hashPassword(password);
        const newUser = new this.userModel({ email, password: { salt, hash }, });
        return newUser.save();
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { salt, hash } = user.password;
        const isPasswordValid = await this.validatePassword(password, hash, salt);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid password');
        }
        const payload = { email: user.email, sub: user._id, roles: user.roles };
        const token = this.jwtService.sign(payload, { secret: this.jwtSecret, expiresIn: '24h' });
        return { token };
    }
    async validateToken(token) {
        try {
            return this.jwtService.verify(token, { secret: this.jwtSecret });
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async hasRole(user, requiredRoles) {
        return user.roles && requiredRoles.some(role => user.roles.includes(role));
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map