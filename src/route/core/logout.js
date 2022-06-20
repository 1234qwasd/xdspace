export default async (req, res) => {
    req.session.destroy(function() {
        res.redirect('/');
    });
}
