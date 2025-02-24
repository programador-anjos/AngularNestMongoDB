import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../entities/Post';
import { PostagemDTO } from '../../../../../libs/dtos/src/PostagemDTO';

@Injectable()
export class PostagemService {

  constructor(@InjectModel('postagens') private readonly postagemModel: Model<Post>) { }

  async findAll(): Promise<Array<Post>> {
    return await this.postagemModel.find().exec();
  }

  async findById(id: string): Promise<Post> {
    return await this.postagemModel.findById(id).exec();
  }

  async create(post: PostagemDTO): Promise<Post> {
    const createdPost = new this.postagemModel(post);
    return await createdPost.save();
  }

  async update(id: string, post: PostagemDTO): Promise<Post> {
    await this.postagemModel.updateOne({ _id: id }, post).exec();
    return this.findById(id);
  }

  async delete(id: string) {
    return await this.postagemModel.deleteOne({ _id: id }).exec();
  }
}
