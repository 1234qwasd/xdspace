import { User, getUser } from '../../schemas/User.js';
import { MAX_PROFILE_TOP } from '../../../config.js';

export default async (req, res) => {
    let admin = req.viewer && req.viewer.admin;
    let user = await getUser(req.query.id || 1);

    let userTop;
    let friendCount;
    let isFriend;

    if(user) {
        if(user.banned && !admin)
            return res.redirect('/random.php');

        /**
         * Setting friendCount before running populate()
         * is important, because setting the populate limit
         * removes other non-populated users from the array.
         */
        isFriend = req.viewer && req.viewer.hasFriend(user);
        friendCount = user.friends.length;

        let populate = [
            { path: 'friends', select: 'name id', options: { limit: MAX_PROFILE_TOP } },
            { path: 'profile.comments.author', select: 'name id' }
        ];

        if(admin)
            populate.push({ path: 'admin_data.banned_by', select: 'name id' });

        if(user.profile.top.length === 0) {
            userTop = user.friends;
        } else {
            await user.populate({
                path: 'profile.top',
                select: 'name id',
                options: {
                    limit: MAX_PROFILE_TOP
                }
            });

            userTop = user.top;
        }

        await user.populate(populate);
    }

    res.render('pages/profile', {
        user,
        profile: user ? user.profile: null,
        csrfToken: req.csrfToken(),
        viewer: req.viewer,
        isFriend,
        userTop,
        friendCount
    });
}
