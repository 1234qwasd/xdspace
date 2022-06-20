import mongo from 'mongoose';

const { ObjectId } = mongo.Schema.Types;

export const ReportSchema = new mongo.Schema({
    _id:            ObjectId,
    author:         { type: ObjectId, ref: 'User' },
    user:           { type: ObjectId, ref: 'User' },
    reported_on:    { type: Date, default: Date.now }
});

export const Report = mongo.model('Report', ReportSchema);
