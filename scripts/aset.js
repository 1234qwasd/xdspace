// Set admin
import mongo from 'mongoose';
import { getUser } from '../src/schemas/User.js';
import { MONGO_URL } from '../config.js';

await mongo.connect(MONGO_URL);

const users = process.argv.slice(2);

for(const id of users) {
	const user = await getUser(id);

	if(user) {
		user.admin = !user.admin;
		await user.save();

		console.log(`\u001b[1;32m[ok]\u001b[0m set \u001b[1;33m${user.name}\u001b[0m admin=${user.admin}`);
	} else {
		console.warn(`\u001b[1;33m[warn]\u001b[0m Unknown ID ${id}.`);
	}
}

mongo.disconnect();
