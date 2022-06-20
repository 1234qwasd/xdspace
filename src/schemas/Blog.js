import mongo from 'mongoose';
import { t_UserId, t_StrTrim } from './_common.js';
import { CommentSchema } from './Comment.js';

export const BlogSchema = new mongo.Schema({
    created_on: { type: Date, default: Date.now },
    title:      t_StrTrim,
    corpus:     t_StrTrim
});

export const Blog = mongo.model('Blog', BlogSchema);
