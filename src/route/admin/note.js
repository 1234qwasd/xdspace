export default async (req, res) => {
    const { user, body } = req;

    if(typeof body.save == 'string')
        user.admin_data.note = body.note
    else if(typeof body.delete == 'string')
        user.admin_data.note = '';

    await user.save();
    res.redirect(req.body.redirect);
}
