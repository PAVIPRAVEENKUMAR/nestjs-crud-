import { Controller,Get, Post, Put, Delete, Body, Param,UseGuards} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';  
import { RolesGuard } from '../auth/roles.guard';  
import { SetMetadata } from '@nestjs/common';


@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved items.' }  )
  async findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get the item by id'})
  @ApiResponse({status: 200, description: 'Successfully retrieved the item by id'})
  async findOne(@Param('id') id:string): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({ status: 201, description: 'Item created successfully.' })
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @SetMetadata('roles', ['admin'])
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiResponse({ status: 200, description: 'Item deleted successfully.' })
  delete(@Param('id') id): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update an entire item by ID' })
  @ApiResponse({ status: 200, description: 'Item updated successfully.' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }
}