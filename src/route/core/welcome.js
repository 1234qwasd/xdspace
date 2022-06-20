import mongo from 'mongoose';
import { AccountRequest } from '../../schemas/AccountRequest.js';
import { User, applyDefaultFriends } from '../../schemas/User.js';

export default async (req, res) => {
    const token = req.query.id;
    res.set('content-type', 'text/plain');

    if(typeof token !== 'string') {
        return res.redirect('/');
    }

    const request = (await AccountRequest.find({ token }))[0];

    if(request) {
        const id = (await User.count()) + 1;

        const user = new User({
            _id: new mongo.Types.ObjectId(),
            id,
            name: request.name,
            email: request.email,
            pw_hash: request.pw_hash,
            last_login: new Date()
        });

        await request.remove();
        await applyDefaultFriends(user);
        // No need to run user.save() as applyDefaultFriends() does this by default

        res.redirect('/login.php');
    } else res.redirect('/');
}

