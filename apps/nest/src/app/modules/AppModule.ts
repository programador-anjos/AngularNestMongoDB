import { Module } from '@nestjs/common';
import { PostagemModule } from './PostagemModule';


@Module({
  imports: [PostagemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
