import { getUser, User } from '../../schemas/User.js';

export default async (req, res) => {
    if(!req.query.id) {
        const all = await User.find({});
        let response = {
            fwiends: {},
            success: true
        }

        for(const user of all) {
            response.fwiends[user.id] = {
                name: user.name,
                fwiends: user.friends.length
            }
        }

        res.json(response);
    } else {
        const user = await getUser(req.query.id);
        await user.populate([
            'friends',
            'profile.top'
        ]);

        if(!user) {
            res.status(404);
            res.json({ success: false });
            return;
        }

        if(user.banned){
            res.status(403);
            res.json({ success: false });
            return;
        }

        res.json({
            id: user.id,
            name: user.name,
            avatar: `${req.origin}/u/${user.id}/avatar`,
            age: user.profile.about.age,
            gender: user.profile.about.gender,
            city: '',
            country: user.profile.about.country,
            credo: user.profile.about.motto,
            about: user.profile.about.bio,
            meet: user.profile.about.meet,
            'creation date': ~~(user.created_on.getTime() / 1000),
            'last login': ~~(user.last_login.getTime() / 1000),
            mp3: user.profile.song.enabled ?
                 {
                     name: user.profile.song.name,
                     url: `${req.origin}/u/${user.id}/audio`
                 }: false,
            notifications: {
                // new fw req
                // new fw
                // new msg
                // new com
                // new blog com
            },
            fwiends: user.friends.map(o => o.id),
            top: user.profile.top.map(o => o.id),
            success: true
        });
    }
}
