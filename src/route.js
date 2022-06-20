import login                 from './route/core/login.js';
import signup                from './route/core/signup.js';
import welcome               from './route/core/welcome.js';
import logout                from './route/core/logout.js';
import search                from './route/core/search.js';
import listAll               from './route/core/all.js';
import list                  from './route/core/list.js';
import online                from './route/core/online.js';
import random                from './route/core/random.js';
import music                 from './route/core/music.js';
import api_classic           from './route/api/classic.js';

import profile               from './route/profile/profile.js';
import edit                  from './route/profile/edit.js';
import update                from './route/profile/update.js';
import invitation            from './route/profile/invitation.js';
import block                 from './route/profile/block.js';
import photo                 from './route/profile/photo.js';
import uploadPhoto           from './route/profile/upload.js';
import editMP3               from './route/profile/editMP3.js';
import uploadMP3             from './route/profile/uploadMP3.js';
import requests              from './route/profile/requests.js';
import accept                from './route/profile/accept.js';
import decline               from './route/profile/decline.js';

import avatar                from './route/content/avatar.js';
import css                   from './route/content/css.js';
import song                  from './route/content/song.js';

import admin_setaui          from './route/admin/setaui.js';
import admin_note            from './route/admin/note.js';
import admin_ban             from './route/admin/ban.js';
import admin_switch          from './route/admin/switch.js';

import comment               from './route/comments/comment.js';
import review                from './route/comments/review.js';
import deleteComment         from './route/comments/delete.js';
import declineComment        from './route/comments/decline.js';
import approveComment        from './route/comments/approve.js';


function async_catch(handler, requiresLogin = false, bypassBan = false) {
    return async function(req, res, next) {
        try {
            await handler(req, res, next);
        } catch(err) {
            next(err);
        }
    }
}

function route_static(page) {
    return (req, res) => {
        res.status(200);
        res.render(page, req.csrfToken ? { csrfToken: req.csrfToken() }: {});
    }
}

export default {
    /**
     * Core
     */
    login: async_catch(login),
    signup: async_catch(signup),
    welcome: async_catch(welcome),
    logout: async_catch(logout),
    search: async_catch(search),
    online: async_catch(online),
    listAll: async_catch(listAll),
    list: async_catch(list),
    music: async_catch(music),
    random: async_catch(random),
    api_classic: async_catch(api_classic),

    /**
     * Profile
     */
    profile: async_catch(profile),
    edit: async_catch(edit),
    update: async_catch(update),
    invitation: async_catch(invitation),
    block: async_catch(block),
    photo: async_catch(photo),
    uploadPhoto: async_catch(uploadPhoto),
    editMP3: async_catch(editMP3),
    uploadMP3: async_catch(uploadMP3),
    requests: async_catch(requests),
    accept: async_catch(accept),
    decline: async_catch(decline),


    /**
     * Admin
     */
    admin: {
        setaui: async_catch(admin_setaui),
        note: async_catch(admin_note),
        ban: async_catch(admin_ban),
        switch: async_catch(admin_switch)
    },

    /**
     * User content
     */
    avatar: async_catch(avatar),
    song: async_catch(song),
    css: async_catch(css),


    /**
     * Comments
     */
    comment: async_catch(comment),
    review: async_catch(review),
    deleteComment: async_catch(deleteComment),
    declineComment: async_catch(declineComment),
    approveComment: async_catch(approveComment),

    /**
     * Static
     */
    about: route_static('pages/about.ejs'),
    help: route_static('pages/help.ejs'),

    notImplemented: (req, res) => {
        res.status(501);
        res.render('pages/not_implemented.ejs', {
            csrfToken: req.csrfToken()
        });
    }
}
