import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaystoreService } from './playstore.service';
import { CreatePlaystoreDto } from './dto/create-playstore.dto';
import { UpdatePlaystoreDto } from './dto/update-playstore.dto';

@Controller('playstore')
export class PlaystoreController {
  constructor(private readonly playstoreService: PlaystoreService) {}

  @Post()
  create(@Body() createPlaystoreDto: CreatePlaystoreDto) {
    return this.playstoreService.create(createPlaystoreDto);
  }

  @Get()
  findAll() {
    return this.playstoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playstoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaystoreDto: UpdatePlaystoreDto) {
    return this.playstoreService.update(+id, updatePlaystoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playstoreService.remove(+id);
  }
}
