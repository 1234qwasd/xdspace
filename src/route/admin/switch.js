export default async (req, res) => {
    let canSwitch = req.viewer.id !== req.user.id && !req.user.admin;

    if(req.method === 'GET') {
        res.render('pages/switch', {
            csrfToken: req.csrfToken(),
            user: req.user,
            canSwitch
        });
    }

    if(req.method === 'POST') {
        if(canSwitch) {
            delete req.session.adminUI;
            req.session.userId = req.user.id;
            res.redirect(`/?id=${req.user.id}`);
        } else {
            res.status(403);
            res.end('403 Forbidden\nSwitching to this user is not allowed.');
        }
    }
}
