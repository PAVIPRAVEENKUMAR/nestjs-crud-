"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const items_module_1 = require("./items/items.module");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("./users/users.module");
const keys_1 = require("./config/keys");
const auth_service_1 = require("./auth/auth.service");
const jwt_1 = require("@nestjs/jwt");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [items_module_1.ItemModule, mongoose_1.MongooseModule.forRoot(keys_1.default.mongo_URI, { retryAttempts: 5, retryDelay: 5000 }), users_module_1.UsersModule, jwt_1.JwtModule.register({
                secret: 'yourSecretKey',
                signOptions: { expiresIn: '1h' },
            }),],
        providers: [auth_service_1.AuthService],
        controllers: [auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map