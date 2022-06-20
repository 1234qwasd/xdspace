import { getUser } from '../../schemas/User.js';

export default async (req, res) => {
    if(req.viewer.profile.pending.friends.length === 0) {
        return res.redirect(`/?id=${req.viewer.id}`);
    }

    await req.viewer.populate('profile.pending.friends');
    res.render('pages/requests', {
        csrfToken: req.csrfToken(),
        requests: req.viewer.profile.pending.friends
    });
}
