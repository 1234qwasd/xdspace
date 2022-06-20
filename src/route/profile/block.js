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
    ) {
        if(viewer.hasBlocked(user)) {
            await viewer.unblockUser(user);
        } else {
            await viewer.blockUser(user);
        }

        await viewer.save();
    }

    res.redirect(`/?id=${user.id}`);
}
