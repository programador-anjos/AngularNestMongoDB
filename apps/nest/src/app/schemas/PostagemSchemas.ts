import * as mongoose from 'mongoose';

export const PostagemSchemas = new mongoose.Schema({
  _id: String,
  titulo: String,
  descricao: String,
  foto: String
});
