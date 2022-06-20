import { getUser } from '../../schemas/User.js';

export default async(req, res) => {
    let user = await getUser(req.params.userId);

    if(user) {
        res.status(200);
        res.set('content-type', 'text/css');

        res.end(user.profile.css);
    } else {
        res.status(404);
        res.end('/* Not found. */');
    }
}
