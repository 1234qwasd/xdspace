import { getUser } from './schemas/User.js';
import exCSRF from 'csurf';

const csrf = exCSRF({ cookie: true });

/**
 * Middleware components
 */

/**
 * Logout if user is banned
 */
const banCheck = (req, res, next) => {
    if(req.viewer.banned)
        return res.redirect('/logout.php');

    next();
}

/**
 * Page requires being logged out
 */
const loggedOut = (req, res, next) => {
    if(req.session.connected)
        return res.redirect(`/?id=${req.session.userId}`);

    next();
}

/**
 * Page requires being logged in
 */
const loggedIn = (req, res, next) => {
    if(!req.session.connected)
        return res.redirect('/login.php');

    next();
}

/**
 * Page requires admin
 * Also sets the req.user variable
 */
const isAdmin = (req, res, next) => {
    if(!req.viewer.admin) {
        res.status(403);
        res.end('403 Forbidden');
    } else {
        getUser(req.query.user || req.body.user).then(user => {
            req.user = user;
            next();
        });
    }
}

export const hasUser = (req, res, next) => {
    if(!req.user) {
        res.status(400);
        res.end('400 Bad request\n\nMissing user');
    } else next();
}

export const any   = [ csrf ];
export const out   = [ csrf, loggedOut ];
export const user  = [ csrf, loggedIn, banCheck ];
export const admin = [ csrf, loggedIn, banCheck, isAdmin ];
