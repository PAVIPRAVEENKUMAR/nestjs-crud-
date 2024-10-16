"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const items_service_1 = require("./items.service");
const items_schema_1 = require("./schema/items.schema");
const items_controller_1 = require("./items.controller");
const auth_service_1 = require("../auth/auth.service");
const users_module_1 = require("../users/users.module");
const jwt_1 = require("@nestjs/jwt");
let ItemModule = class ItemModule {
};
exports.ItemModule = ItemModule;
exports.ItemModule = ItemModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, mongoose_1.MongooseModule.forFeature([{ name: 'Item', schema: items_schema_1.ItemSchema }]), jwt_1.JwtModule.register({
                secret: 'yourJwtSecretKey',
                signOptions: { expiresIn: '24hr' },
            })],
        controllers: [items_controller_1.ItemsController],
        providers: [items_service_1.ItemsService, auth_service_1.AuthService, users_module_1.UsersModule],
    })
], ItemModule);
//# sourceMappingURL=items.module.js.map