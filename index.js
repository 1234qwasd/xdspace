/**
 * Main modules
 */
import { promises as fs } from 'fs';
import pkg                from './package.json' assert { type: 'json' };
import * as config        from './config.js';
import mongo              from 'mongoose';
import md                 from 'markdown-it';


/**
 * Express, modules and middleware.
 */
import express           from 'express';
import exSession         from 'express-session';
import exSesStore        from 'connect-mongo'
import exCookie          from 'cookie-parser';
import multer            from 'multer';
import route             from './src/route.js';
import * as mw           from './src/middleware.js';
import { SecretManager } from './src/secret.js';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { getUser, User } from './src/schemas/User.js';
import { deleteOld }     from './src/schemas/AccountRequest.js';

const PORT = process.env.PORT || config.SERVER_PORT || 8090;
global.PROJECT_ROOT = dirname(fileURLToPath(import.meta.url));

/**
 * Connect DB.
 */
await mongo.connect(process.env.MONGODB_URL || config.MONGO_URL, {});

/**
 * Express routing and features.
 */
const app = express();

app.disable('x-powered-by');
app.set('trust proxy', config.SERVER_USES_PROXY)
app.set('views', 'ejs');
app.set('view engine', 'ejs');
const sessionStore = exSesStore.create({ mongoUrl: process.env.MONGODB_URL || config.MONGO_URL });

/**
 * Display page response times (dev mode only).
 */
if(process.env.NODE_ENV != 'production') {
    const exTiming = await import('response-time');

    app.use(exTiming.default((req, res, time) => {
        time = Math.round(time);

        let timeColor = 32;
        if(time > 125) timeColor = 33;
        if(time > 350) timeColor = 31;
        if(req.ip)
            console.log(`\u001b[1;34m${req.method}\t\u001b[1;${timeColor}mt=${time}ms\t\u001b[1;33m\t${req.ip}\u001b[0m\t${req.path}`);
    }));
}

app.use(exSession({
    secret: await SecretManager.getSecret(),
    resave: false,
    saveUninitialized: true,
    store: sessionStore
}));

/**
 * Cookie parser, required
 * for sessions.
 */
app.use(exCookie());
app.use(express.urlencoded({
    extended: false,
    limit: config.MAX_BODY_SIZE
}));

app.use(express.static('./static'));

/**
 * Setup EJS locals
 */
app.locals.config = config;
app.locals.pkg = pkg;
app.locals.md = md(config.MARKDOWN_CONFIG);
app.locals.possessive = (word, append = true) => {
    let apostrophe = word.endsWith('s') ? "'": "'s";
    return append ? word + apostrophe: apostrophe;
}

const upload = multer({ dest: 'uploads/' });

app.use(async (req, res, next) => {
    if(!req.ip) {
        return res.end();
    }

    if(req.session.connected)
        req.viewer = await User.findOne({ _id: req.session.userObjectID });

    /**
     * More EJS aliases
     */
    req.origin = res.locals.origin = config.SERVER_USES_PROXY ? `${req.headers['x-forwarded-proto'] || req.protocol}://${req.get('host')}`: `${req.protocol}://${req.get('host')}`;
    res.locals.req = req;
    res.locals.res = res;
    res.locals.connected = req.session.connected;
    res.locals.adminUI = req.session.adminUI;
    if(req.session.connected)
        res.locals.viewer = req.viewer
    else
        res.locals.viewer = null;


    /**
     * Finally, set `Server` header and pass to next layer.
     */
    res.set('Server', `${pkg.name}/${pkg.version}`);
    next();
});

// Profile
app.get(['/', '/index.php'], ...mw.any, route.profile);

// List
// app.get('/list.php', ...mw.any, route.list);

// All
app.get('/all.php', ...mw.any, route.listAll);

// Random
app.get('/random.php', ...mw.any, route.random);

// Music
app.get('/music.php', ...mw.any, route.music);

// Login
app.get('/login.php', ...mw.out, route.login);
app.post('/login.php', ...mw.out, route.login);

// Register
app.get('/signup.php', ...mw.out, route.signup);
app.post('/signup.php', ...mw.out, route.signup);

// Logout
app.get('/logout.php', ...mw.any, route.logout);

// Confirm email
app.get('/welcome.php', ...mw.out, route.welcome);

// Friend request
app.get('/invitation.php', ...mw.user, route.invitation);

// Block/unblock
app.get('/blokc.php', ...mw.user, route.block);

// Edit profile
app.get('/edit.php', ...mw.user, route.edit);

// Update profile
app.post('/update.php', ...mw.user, route.update);

// Edit MP3
app.get('/mp3.php', ...mw.user, route.editMP3);

// Upload MP3
const mp3Upload = upload.fields([{ name: 'userfile', maxCount: 1 }]);
app.post('/upmp3.php', ...mw.user, mp3Upload, route.uploadMP3);

// Upload photo
app.get('/photo.php', ...mw.user, route.photo);

// Update photo
const photoUpload = upload.fields([{ name: 'userfile', maxCount: 1 }]);
app.post('/upload.php', ...mw.user, photoUpload, route.uploadPhoto);

// View friend requests
app.get('/requests.php', ...mw.user, route.requests);

// Accept friend request
app.post('/accept.php', ...mw.user, route.accept);

// Decline friend request
app.post('/decline.php', ...mw.user, route.decline);

// Post comment
app.post('/comment.php', ...mw.user, route.comment);

// Delete comment
app.post('/delete.php', ...mw.user, route.deleteComment);

// Decline comment
app.post('/dcom.php', ...mw.user, route.declineComment);

// Approve comment
app.post('/dapp.php', ...mw.user, route.approveComment);

// View pending comments
app.get('/review.php', ...mw.user, route.review);

// Search
app.get('/search.php', ...mw.any, route.search);

// Online users
app.get('/online.php', ...mw.any, route.online);

// Classic API
app.get('/api.php', ...mw.any, route.api_classic);

// Admin
app.post('/manage/setaui', ...mw.admin, route.admin.setaui);
app.post('/manage/note', ...mw.admin, mw.hasUser, route.admin.note);
app.get('/manage/ban', ...mw.admin, mw.hasUser, route.admin.ban);
app.post('/manage/ban', ...mw.admin, mw.hasUser, route.admin.ban);
app.get('/manage/switch', ...mw.admin, mw.hasUser, route.admin.switch);
app.post('/manage/switch', ...mw.admin, mw.hasUser, route.admin.switch);

// User data
app.get('/u/:userId/css', route.css);
app.get(['/u/:userId/avatar', '/u/:userId/avatar.jpg'], route.avatar);
app.get(['/u/:userId/audio', '/u/:userId/audio.mp3'], route.song);

// Not Implemented
app.get([
    '/send.php',
    '/report.php',
    '/news.php',
    '/blog.php',
    '/list.php',
    '/mailbox.php'
], mw.any, route.notImplemented);

// Static
app.get('/about.php', mw.any, route.about);
app.get('/help.php', mw.any, route.help);

app.use((err, req, res, next) => {
    if(err) {
        console.error('\u001b[1;31m[error]\u001b[0m', err);
        res.status(500);

        res.render('pages/error', {
            err,
            __dirname: PROJECT_ROOT
        });
    }
});

app.get('*', (req, res) => {
    res.render('pages/notfound');
});

// Delete old AccountRequests
await deleteOld();

setInterval(() => {
    deleteOld();
}, 30000);

app.listen(config.SERVER_PORT, () => {
    console.log(`listening on :${PORT}`);
});
