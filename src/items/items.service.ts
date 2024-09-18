import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto'; 
import { UpdateItemDto } from './dto/Update-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly ItemsModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.ItemsModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    return await this.ItemsModel.findById(id).exec();
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = new this.ItemsModel(createItemDto);
    return await newItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.ItemsModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, item: Item): Promise<Item> {
    return await this.ItemsModel.findByIdAndUpdate(id, UpdateItemDto, { new: true }).exec();
  }
}