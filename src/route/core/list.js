import { User } from '../../schemas/User.js';

export default async(req, res) => {
    const userCount = await User.count();
    res.render('pages/list', {
        listAll: true,
        csrfToken: req.csrfToken(),
        userCount
    });
}
