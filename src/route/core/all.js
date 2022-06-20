import { getUser } from '../../schemas/User.js';

export default async(req, res) => {
    if(req.viewer && req.viewer.notifications.new_friends) {
        req.viewer.notifications.new_friends = false;
        await req.viewer.save();
    }
    const user = await getUser(req.query.id);
    await user.populate('friends');

    if(user) {
        res.render('pages/list', {
            csrfToken: req.csrfToken(),
            users: user.friends,
            user
        });
    } else {
        res.redirect('/');
    }
}
