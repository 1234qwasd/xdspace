import { getUser } from '../../schemas/User.js';

export default async(req, res) => {
    const timestamp = parseInt(req.body.t, 10);
    if(isNaN(timestamp)) {
        return res.redirect(`/?id=${req.viewer.id}`);
    }

    await req.viewer.populate({ path: 'profile.pending.comments' });
    const comment = req.viewer.profile.pending.comments.find(c => c.created_on.getTime() === timestamp);

    if(!comment) {
        res.redirect(`/?id=${req.viewer.id}`);
        return;
    }

    await req.viewer.declinePendingComment(comment);
    await req.viewer.save();

    res.redirect('/review.php');
}
