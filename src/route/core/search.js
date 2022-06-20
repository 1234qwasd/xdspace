import { User } from '../../schemas/User.js';

export default async(req, res) => {
    let users = await User.find({ banned: false });

    res.render('pages/search', {
        users,
        csrfToken: req.csrfToken()
    });
}
