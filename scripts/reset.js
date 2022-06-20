import mongo from 'mongoose';
import {
    MONGO_URL,
    PATH_USERS,
    SESSION_SECRET_PATH
} from '../config.js';
import { createInterface } from 'readline';
import fs from 'fs-extra';
import glob from 'fast-glob';
import { join } from 'path';

// Import models
import { AccountRequest } from '../src/schemas/AccountRequest.js';
import { User } from '../src/schemas/User.js';
import { Report } from '../src/schemas/Report.js';

if(!(await fs.exists(PATH_USERS))) {
    console.log('\u001b[1;31mError:\u001b[0m This script must be run in the project root.');
    process.exit(1);
}

await mongo.connect(MONGO_URL, {});
const pt = createInterface(process.stdin, process.stdout);

/**
 * Generate a random string the user has
 * to type out before deletion, to (hopefully)
 * prevent accidental confirmation.
 */
const text = Math.random()
                 .toString(36)
                 .substr(2, 6)
                 .toUpperCase();

console.log('\n\u001b[1;31m!!!!!!!!!!!!!!!!!!!!!!   WARNING   !!!!!!!!!!!!!!!!!!!!!!');
console.log('\u001b[1;31m!! ALL data on this instance will be PERMANENTLY       !!');
console.log('\u001b[1;31m!! deleted: avatars, songs and user records on         !!');
console.log(`\u001b[1;31m!! \u001b[1;34m${MONGO_URL.padEnd(52, ' ')}\u001b[1;31m!!`);
console.log('\u001b[1;31m!! will be removed. Are you sure you want to continue? !!');
console.log('\u001b[1;31m!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\u001b[0m\n');

pt.setPrompt(`Enter the text \u001b[1m${text}\u001b[0m to confirm: `);
pt.prompt();

const modelDeletables = [
    AccountRequest,
    User,
    Report
];

const pathsDeletable = [
    join(PATH_USERS, '**/*.bin'),
    SESSION_SECRET_PATH
];

pt.on('line', async line => {
    if(line.toUpperCase() === text) {
        process.stdout.write('\n');

        // Delete models
        for (const deletable of modelDeletables) {
            process.stdout.write(`Deleting model ${deletable.modelName} ... `);
            await deletable.deleteMany({});
            console.log('done');
        }

        for (const globPath of pathsDeletable) {
            for(const path of await glob(globPath)) {
                process.stdout.write(`Deleting file ${path} ... `);
                await fs.unlink(path);
                console.log('done');
            }
        }

        mongo.disconnect();
        pt.close();
    } else {
        // Wrong text, exit.
        console.log('Cancelled.');
        process.exit(1);
    }
});
