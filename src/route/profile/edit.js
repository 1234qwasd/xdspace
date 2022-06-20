import { getUser } from '../../schemas/User.js';

export default async (req, res) => {
    let id = parseInt(req.query.id, 10);
    let user = await getUser(id);
    if(user && (req.viewer.admin || req.viewer.id === id)) {
        res.render('pages/edit', {
            user,
            profile: user.profile,
            csrfToken: req.csrfToken()
        });
    } else res.redirect('/');
}
