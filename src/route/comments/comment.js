import mongo from 'mongoose';
import { getUser } from '../../schemas/User.js';
import { Comment } from '../../schemas/Comment.js';
import { typeIs, isID } from '../../util.js';
import { MAX_PROFILE_COMMENTS, MAX_COMMENT_LENGTH } from '../../../config.js';

const { ObjectId } = mongo.Schema.Types;
export default async(req, res) => {
    const viewer = req.viewer;
    const id = parseInt(req.body.user, 10);

    if(!typeIs('string', req.body.comment) || !isID(id)) {
        res.status(400);
        res.end();

        return;
    }

    let user = await getUser(id);
    const content = req.body.comment.substring(0, MAX_COMMENT_LENGTH);

    if(user) {
        await user.pushComment(new Comment({
            _id: new mongo.Types.ObjectId(),
            author: viewer._id,
            content
        }));

        await user.save();

        res.status(200);
        res.redirect(`/?id=${id}`);
    } else res.redirect('/');
}
