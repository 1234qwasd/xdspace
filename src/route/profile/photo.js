export default async (req, res) => {
    res.render('pages/photo', {
        user: req.viewer,
        csrfToken: req.csrfToken()
    });
}
