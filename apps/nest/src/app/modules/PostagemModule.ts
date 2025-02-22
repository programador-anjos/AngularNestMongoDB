import { Module } from '@nestjs/common';
import { PostagensController } from '../controllers/PostagensController';
import { PostagemService } from '../services/PostagemService';
import { MongooseModule } from '@nestjs/mongoose';
import { PostagemSchemas } from '../schemas/PostagemSchemas';


@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://programadoranjos:1W3BpPHwLsNo5D22@cluster0.0g4xo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    ),
    MongooseModule.forFeature([{ name: 'postagens', schema: PostagemSchemas }]),
  ],
  controllers: [PostagensController],
  providers: [PostagemService]
})
export class PostagemModule {}
