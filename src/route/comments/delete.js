import { getUser } from '../../schemas/User.js';

export default async(req, res) => {
    const user = await getUser(req.body.id);
    if(!user) {
        res.status(404);
        res.end();
        return;
    }

    const timestamp = parseInt(req.body.t, 10);
    const comment = user.profile.comments.find(c => c.created_on.getTime() === timestamp);

    if(!comment) {
        res.status(404);
        res.end();
        return;
    }

    if(
        req.viewer._id.equals(user._id) // Own page
     || comment.author._id.equals(req.viewer._id) // Own comment
    ) {
        await user.removeComment(comment);
        await user.save();
        res.redirect(`/?id=${user.id}`);
    } else {
        res.status(401);
        res.end();
    }
}
