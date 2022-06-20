import { getOnline } from '../../schemas/User.js';

export default async (req, res) => {
    res.render('pages/online', {
        csrfToken: req.csrfToken(),
        online: await getOnline()
    });
}
