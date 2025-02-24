import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post, Put, UploadedFile, UseInterceptors
} from '@nestjs/common';
import { PostagemService } from '../services/PostagemService';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PostagemDTO } from '../../../../../libs/dtos/src/PostagemDTO';


@Controller('postagens')
export class PostagensController {
  constructor(private readonly postagemService: PostagemService) {
  }

  @Post()
  create(@Body() postagemDTO: PostagemDTO) {
    return this.postagemService.create(postagemDTO);
  }

  @Get()
  findAll() {
    return this.postagemService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.postagemService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() postagemDTO: PostagemDTO) {
    return this.postagemService.update(id, postagemDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postagemService.delete(id);
  }

  // @Post('/upload')
  // @UseInterceptors(FileInterceptor('imagem', {
  //     storage: diskStorage({
  //       destination: './apps/angular/public/uploads/',
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         const filename = `${uniqueSuffix}${ext}`;
  //         callback(null, filename);
  //       },
  //     }),
  //   }),
  // )
  // uploadArquivo(@UploadedFile() file: any) {
  //   return file.filename;
  // }

}
