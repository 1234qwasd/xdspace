/**
 * Toggle admin mode
 */

export default (req, res) => {
    req.session.adminUI = req.body.state === '1';
    res.redirect(req.body.redirect);
}
