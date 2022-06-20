import { getUser } from '../../schemas/User.js';

export default async (req, res) => {
    const user = await getUser(req.body.user);
    if(user) {
        await req.viewer.declineRequest(user);
        await req.viewer.save();
        res.redirect(`/requests.php`);
    } else res.redirect(`/?id=${req.viewer.id}`);
}
