export default async(req, res) => {
    res.render('pages/edit_mp3', {
        csrfToken: req.csrfToken()
    })
}
