import { promises as fs } from 'fs';
import { parse } from 'path';
import { pruneSong } from '../../schemas/User.js';

export default async (req, res) => {
    const user = req.viewer;

    if(req.body.delete) {
        const oldHash = user.profile.song.hash;

        await user.disableMP3();
        await user.save();
        await pruneSong(oldHash);

        return res.redirect(`/?id=${user.id}`);
    }

    if(!req.files.userfile) {
        // No files sent
        return res.redirect('/mp3.php');
    }

    const file = req.files.userfile[0];
    const data = await fs.readFile(file.path);
    await fs.unlink(file.path);

    /**
     * Only allow audio/*
     */
    if(!file.mimetype.startsWith('audio/')) {
        res.status(415);
        res.set('content-type', 'text/plain');

        res.write('415 Unsupported Media Type\n');
        res.write('The audio format you specified is not supported by the server.');

        return res.end();
    }

    const oldHash = user.profile.song.hash;
    await user.updateMP3(parse(file.originalname).name, data, file.mimetype);
    await user.save();
    await pruneSong(oldHash);


    res.redirect(`/?id=${user.id}`);
}
