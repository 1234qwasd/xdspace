import { promises as fs } from 'fs';
import { getUser } from '../../schemas/User.js';
import {
    PATH_USERS,
    PATH_USERS_AVATARS
} from '../../../config.js';
import path from 'path';

export default async(req, res) => {
    const user = await getUser(req.params.userId);

    if(user) {
        const avatarPath = path.join(
            PROJECT_ROOT,
            PATH_USERS,
            PATH_USERS_AVATARS,
            user.avatar.hash + (user.avatar.hash != '_default' ? '.bin': '')
        );

        res.status(200);
        res.set('content-type', user.avatar.mime);
        res.sendFile(avatarPath);
    } else {
        res.status(404);
        res.set('content-type', 'text/plain');
        res.end('404 Not found.');
    }
}
