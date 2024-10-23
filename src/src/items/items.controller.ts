import { Controller,Get, Post, Put, Delete, Body, Param,UseGuards} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags, ApiOperation, ApiResponse,ApiBearerAuth } from '@nestjs/swagger';
import { AllowRoles } from '../others/decortors/allowRoles.decorator';

@ApiTags('items')
@Controller('items')
@ApiBearerAuth()
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  @AllowRoles('admin')
  @ApiOperation({summary:'Get all items'})
  @ApiResponse({status: 200, description:'Successfully retrieved items.'})
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @AllowRoles('admin')
  @ApiOperation({summary: 'Get the item by id'})
  @ApiResponse({status: 200, description: 'Successfully retrieved the item by id'})
  async findOne(@Param('id') id:string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  @ApiOperation({summary: 'Create a new item'})
  @ApiResponse({status: 201, description:'Item created successfully.'})
  create(@Body() createItemDto: CreateItemDto): Promise<Item>{
    return this.itemsService.create(createItemDto);
  }

  @AllowRoles('admin')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully.' })
  async delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @AllowRoles('admin')
  @Put(':id')
  @ApiOperation({ summary: 'Update an entire item by ID' })
  @ApiResponse({ status: 200, description: 'Item updated successfully.' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }
}