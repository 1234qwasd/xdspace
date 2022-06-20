import { getUser } from '../../schemas/User.js';
import { typeIs, isID } from '../../util.js';

export default async(req, res) => {
    const user = await getUser(req.query.id);

    let {
        credo,
        gender,
        country,
        about,
        who,
        css
    } = req.body;

    let age = parseInt(req.body.age, 10);

    const hasPermission = req.viewer.admin || req.viewer.id === parseInt(req.query.id, 10);

    if(user && hasPermission) {
        user.updateProfile({
            credo,
            gender,
            country,
            about,
            who,
            css,
            age
        });

        await user.save();
    }

    res.redirect(`/?id=${req.query.id}`);
}
