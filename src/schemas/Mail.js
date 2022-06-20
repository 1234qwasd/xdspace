import mongo from 'mongoose';
import {
    MAX_MESSAGE_SUBJECT_LENGTH,
    MAX_MESSAGE_CONTENT_LENGTH
} from '../../config.js';
import { t_UserId, t_StrTrim } from './_common.js';

export const MailSchema = new mongo.Schema({
    author:     t_UserId,
    created_on: { type: Date, default: Date.now },
    subject:    { type: String, trim: true, maxlength: MAX_MESSAGE_SUBJECT_LENGTH },
    content:    { type: String, trim: true, maxlength: MAX_MESSAGE_CONTENT_LENGTH },
    id:         mongo.ObjectId
});

export const Mail = mongo.model('Mail', MailSchema);
