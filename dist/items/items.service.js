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
exports.ItemsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let ItemsService = class ItemsService {
    constructor(itemsModel) {
        this.itemsModel = itemsModel;
    }
    async findAll() {
        return await this.itemsModel.find().exec();
    }
    async findOne(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
        }
        const item = await this.itemsModel.findById(id).exec();
        if (!item) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }
    async create(createItemDto) {
        const newItem = new this.itemsModel(createItemDto);
        return await newItem.save();
    }
    async delete(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
        }
        const deletedItem = await this.itemsModel.findByIdAndDelete(id).exec();
        if (!deletedItem) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        return deletedItem;
    }
    async update(id, updateItemDto) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
        }
        const updatedItem = await this.itemsModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
        if (!updatedItem) {
            throw new common_1.NotFoundException(`Item with ID ${id} not found`);
        }
        return updatedItem;
    }
};
exports.ItemsService = ItemsService;
exports.ItemsService = ItemsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Item')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ItemsService);
//# sourceMappingURL=items.service.js.map