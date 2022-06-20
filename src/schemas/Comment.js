import mongo from 'mongoose';
import {
    t_StrTrim,
    t_UserId
} from './_common.js';

const { ObjectId } = mongo.Schema.Types;

export const CommentSchema = new mongo.Schema({
    _id:        ObjectId,
    created_on: { type: Date, default: Date.now },
    author:     { type: ObjectId, ref: 'User'},
    content:    t_StrTrim
});

export const Comment = mongo.model('Comment', CommentSchema);
