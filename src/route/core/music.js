import { User } from '../../schemas/User.js';

export default async(req, res) => {
    const users = await User.find({ 'profile.song.enabled': true });
    res.render('pages/music', {
        csrfToken: req.csrfToken(),
        users
    });
}
