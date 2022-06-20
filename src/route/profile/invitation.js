import { DEFAULT_FRIENDS_ID } from '../../../config.js';
import { getUser } from '../../schemas/User.js';

export default async(req, res) => {
    const { viewer } = req;
    const user = await getUser(req.query.id);

    if(!user) {
        return res.redirect('/');
    }

    if(
        user.id !== viewer.id
     && !DEFAULT_FRIENDS_ID.includes(user.id)
     && !DEFAULT_FRIENDS_ID.includes(viewer.id)
     && !user.hasBlocked(viewer)
    ) {
        if(user.hasFriend(viewer)) {
            await user.removeFriend(viewer);
        } else {
            await user.requestFriend(viewer);
        }

        await user.save();
    }

    res.redirect(`/?id=${user.id}`);
}
