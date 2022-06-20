import { getUserByEmail, applyDefaultFriends } from '../../schemas/User.js';
import bcrypt from 'bcrypt';

export default async (req, res) => {
    if(req.session.connected)
        return res.redirect(`/?id=${req.session.userId}`);

    let error = '';

    // Attempt login
    if(req.method == 'POST') {
        const { username, password } = req.body;

        if(typeof username != 'string'
            || typeof password != 'string')
            return res.redirect('/login.php');

        let user = await getUserByEmail(username);
        if(user) {
            // User exists
            if(!user.banned) {
                // User is not banned
                const matches = await bcrypt.compare(password, user.pw_hash);
                if(matches) {
                    // Password matches
                    user.last_login = new Date();
                    user.admin_data.last_ip = req.ip;

                    await applyDefaultFriends(user);

                    req.session.connected = true;
                    req.session.userObjectID = user._id.toString();

                    return res.redirect(`/?id=${user.id}`);
                } else error = 'Wrong mail or password';
            } else {
                return res.render('pages/banned');
            }
        } else error = 'Wrong mail or password';

    }

    res.render('pages/login', {
        csrfToken: req.csrfToken(),
        error
    });
}
