import mongo from 'mongoose';
import bcrypt from 'bcrypt';
import { SERVER_DISABLE_SIGNUPS, ACCOUNT_REQUEST_EXPIRES, BCRYPT_ROUNDS, EMAIL_ENABLED } from '../../../config.js';
import { AccountRequest, getAccountRequest } from '../../schemas/AccountRequest.js';
import { getUserByEmail } from '../../schemas/User.js';
import { typeIs, randomString } from '../../util.js';
import { sendMail } from '../../mailer.js';

export default async (req, res) => {
    let registering = false;
    let error;

    if(req.session.connected)
        return res.redirect(`/?id=${req.session.userId}`);

    // Create account
    if(req.method == 'POST' && !SERVER_DISABLE_SIGNUPS) {
        registering = true;

        let { name, mail, password } = req.body;

        name = name.trim();
        password = password.trim();

        // Special chars
        if(/[\n\r]/.test(name))
            error = 'Invalid username';

        if(!password || password.toLowerCase() == 'password')
            error = 'A valid password is required';

        if(!error) {
            if(!(await getUserByEmail(mail)) && !(await getAccountRequest(mail))) {
                if(password.length <= 70) {
                    let bcrypt_pwd = await bcrypt.hash(password, BCRYPT_ROUNDS);
                    let request;

                    try {
                        request = new AccountRequest({
                            email: mail,
                            name,
                            pw_hash: bcrypt_pwd,
                            token: randomString(),
                            expires: new Date(Date.now() + ACCOUNT_REQUEST_EXPIRES)
                        });

                        await request.save();
                    } catch(err) {
                        error = Object.values(err.errors)[0].properties.message;
                    }

                    if(request) {
                        if(EMAIL_ENABLED) {
                            sendMail(mail, 'MuSpace Inscription', `Yo ${name}!\n\nTo confirm your inscription go here: ${res.locals.origin}/welcome.php?id=${request.token}\nPlease enjoy make fwiends :)`)
                        } else {
                            console.log(`\u001b[1;36mSIGNUP\t\u001b[1;0m${mail}\t\u001b[0m${res.locals.origin}/welcome.php?id=${request.token}`);
                        }
                    }

                } else error = 'Your password is too long (>70 chars)';
            } else error = 'An account with this email address already exists';
        }
    }

    if(!error)
        res.status(201) // 201 Created
    else
        res.status(400);

    res.render('pages/signup', {
        registering,
        error,
        csrfToken: req.csrfToken()
    });
}
