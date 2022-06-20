export default async(req, res) => {
    if(req.viewer.profile.pending.comments.length === 0) {
        return res.redirect(`/?id=${req.viewer.id}`);
    }

    await req.viewer.populate({ path: 'profile.pending.comments.author', select: 'name id' });

    res.render('pages/review', {
        csrfToken: req.csrfToken(),
        comments: req.viewer.profile.pending.comments,
        viewer: req.viewer
    });
}
