import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto'; 
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemsModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemsModel.find().exec();
  }

  
  async findOne(id: string): Promise<Item> {
  
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }
    
    const item = await this.itemsModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = new this.itemsModel(createItemDto);
    return await newItem.save();
  }


  async delete(id: string): Promise<Item> {

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const deletedItem = await this.itemsModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return deletedItem;
  }


  async update(id: string, updateItemDto: UpdateItemDto): Promise<Item>{

   if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const updatedItem = await this.itemsModel.findByIdAndUpdate(id, updateItemDto, { new: true }).exec();
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return updatedItem;
  }
}