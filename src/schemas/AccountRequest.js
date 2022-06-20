import mongo from 'mongoose';
import { t_StrTrim, t_Email } from './_common.js';

export const getAccountRequest = async function(email) {
    return await AccountRequest.findOne({ email });
}

export const AccountRequestSchema = new mongo.Schema({
    name:       t_StrTrim,
    pw_hash:    String,
    email:      t_Email,
    token:      String,
    expires:    Date
});

export const AccountRequest = mongo.model('AccountRequest', AccountRequestSchema);

/**
 * Deletes expired AccountRequests.
 * @returns {Promise}
 */
export const deleteOld = async () => {
    const now = Date.now();

    await AccountRequest.deleteMany({
        expires: { $lte: now }
    });
}
