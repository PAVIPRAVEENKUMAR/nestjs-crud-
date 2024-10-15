import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsService {
    private readonly itemsModel;
    constructor(itemsModel: Model<Item>);
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    create(createItemDto: CreateItemDto): Promise<Item>;
    delete(id: string): Promise<Item>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<Item>;
}
