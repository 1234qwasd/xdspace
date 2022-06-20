import { promises as fs } from 'fs';
import { pruneAvatar } from '../../schemas/User.js';


export default async (req, res) => {
    const user = req.viewer;

    if(!req.files.userfile) {
        // No files sent
        return res.redirect('/photo.php');
    }

    const file = req.files.userfile[0];
    const data = await fs.readFile(file.path);
    await fs.unlink(file.path);

    /**
     * Only allow image/*
     */
    if(!file.mimetype.startsWith('image/')) {
        res.status(415);
        res.set('content-type', 'text/plain');
        res.write('415 Unsupported Media Type\n');
        res.write('The image format you specified is not supported by the server.');
        return res.end();
    }

    const oldHash = user.avatar.hash;
    await user.updateAvatar(data, file.mimetype);
    await user.save();
    await pruneAvatar(oldHash);

    res.redirect(`/?id=${user.id}`);
}
