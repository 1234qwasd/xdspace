export default async (req, res) => {
    if(req.method === 'GET') {
        res.status(200);
        res.render('pages/ban', {
            user: req.user,
            csrfToken: req.csrfToken()
        })
    }

    if(req.method === 'POST') {
        const { user, body } = req;
        let banned = body.state === '1';

        if(user && req.viewer.id !== user.id && !user.admin) {
            user.banned = banned;

            if(banned) {
                user.admin_data.banned_on = new Date();
                user.admin_data.banned_by = req.viewer;
                user.admin_data.ban_reason = body.reason;
            } else {
                user.admin_data.banned_on = null;
                user.admin_data.banned_by = null;
                user.admin_data.ban_reason = null;
            }

            await user.save();
        }

        res.redirect(`/?id=${user.id}`);
    }
}
