import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemsController {
    private readonly itemsService;
    constructor(itemsService: ItemsService);
    findAll(): Promise<Item[]>;
    findOne(id: string): Promise<Item>;
    create(createItemDto: CreateItemDto): Promise<Item>;
    delete(id: any): Promise<Item>;
    update(id: string, updateItemDto: UpdateItemDto): Promise<Item>;
}
