import fs                      from 'fs-extra';
import { SESSION_SECRET_PATH } from '../config.js';
import { randomBytes }         from 'crypto';

export const SecretManager = {
    secret: null,

    generateSecret: async function() {
        this.secret = randomBytes(64).toString('base64');

        await fs.writeFile(SESSION_SECRET_PATH, this.secret);
        return this.secret;
    },

    getSecret: async function() {
        if(this.secret) {
            return this.secret;
        }

        if(await fs.exists(SESSION_SECRET_PATH)) {
            this.secret = await fs.readFile(SESSION_SECRET_PATH, 'utf8');
            return this.secret;
        } else {
            return await this.generateSecret();
        }
    }
}
