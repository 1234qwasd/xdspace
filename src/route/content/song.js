import { promises as fs } from 'fs';
import { getUser } from '../../schemas/User.js';
import {
    PATH_USERS,
    PATH_USERS_SONGS
} from '../../../config.js';
import path from 'path';

export default async(req, res) => {
    const user = await getUser(req.params.userId);

    if(user && user.profile.song.enabled) {
        const songPath = path.join(
            PROJECT_ROOT,
            PATH_USERS,
            PATH_USERS_SONGS,
            user.profile.song.hash + '.bin'
        );

        res.status(200);
        res.set('content-type', user.profile.song.mime);
        res.sendFile(songPath);
    } else {
        res.status(404);
        res.set('content-type', 'text/plain');
        res.end('404 Not found');
    }
}
