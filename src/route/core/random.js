import { User } from '../../schemas/User.js';

export default async (req, res) => {
    const count = await User.count({ banned: false });
    const user = count ? await User.findOne({ banned: false })
                                   .skip(Math.floor(Math.random() * count))
                       : null;

    if(user) {
        res.redirect(`/?id=${user.id}`);
    } else {
        res.status(404);
        res.render('pages/sysmsg', {
            message: 'There are no users on this instance.'
        });
    }
}
