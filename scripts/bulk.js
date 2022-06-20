import mongo from 'mongoose';
import bcrypt from 'bcrypt';
import { getUser, User, applyDefaultFriends } from '../src/schemas/User.js';
import { MONGO_URL, BCRYPT_ROUNDS } from '../config.js';

const USERS = 100;

await mongo.connect(process.env.MONGODB_URL || MONGO_URL);
let next = (await User.count()) + 1;

for(let i = 0; i < USERS; i++) {
    const email = `${next}@muspace.test`;
    const hash = await bcrypt.hash(next.toString(), BCRYPT_ROUNDS);
    const user = new User({
        _id: new mongo.Types.ObjectId(),
        profile: {
            about: {
                bio: `# Test account\nEmail: ${email}\nPassword: ${next}`
            }
        },
        id: next,
        name: `test.${next}`,
        email,
        pw_hash: hash,
        last_login: new Date()
    });

    console.log(`Created user ${email}`);
    await applyDefaultFriends(user);
    next++;
}

mongo.disconnect();
