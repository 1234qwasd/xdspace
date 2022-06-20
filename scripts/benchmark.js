import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

let lastTime = 0;
let rounds = 6;

while(lastTime < 100) {
	let password = randomBytes(12).toString('base64');
	let start = Date.now();

	await bcrypt.hash(password, rounds);
	lastTime = Date.now() - start;
	console.log(`${rounds} rounds took ${lastTime}ms`);

	rounds++;
}

console.log('\nrecommended bcrypt rounds:', rounds - 2);