import mongo from 'mongoose';
import './Mail.js';
import { CommentSchema } from './Comment.js';
import { BlogSchema } from './Blog.js';
import { MailSchema } from './Mail.js';
import { isID } from '../util.js';
import { hash as blake3 } from 'blake3';
import { join } from 'path';
import fs from 'fs-extra';

import {
    t_StrTrim,
    t_Email,
    t_Username,
    t_UserId
} from './_common.js'

import {
    DEFAULT_PROFILE_MOTTO,
    DEFAULT_PROFILE_BIO,
    DEFAULT_PROFILE_MEET,
    DEFAULT_PROFILE_CSS,
    DEFAULT_PROFILE_AGE,
    DEFAULT_PROFILE_GENDER,
    DEFAULT_PROFILE_COUNTRY,
    DEFAULT_FRIENDS_ID,

    MAX_PROFILE_BIO_LENGTH,
    MAX_PROFILE_MEET_LENGTH,
    MAX_PROFILE_CREDO_LENGTH,
    MAX_PROFILE_CSS_LENGTH,
    MAX_PROFILE_AGE,
    MAX_PROFILE_COMMENTS,

    GENDERS,
    COUNTRIES,
    PROFILE_ONLINE_TIME,

    PATH_USERS,
    PATH_USERS_AVATARS,
    PATH_USERS_SONGS
} from '../../config.js';

import { ReportSchema } from './Report.js';

const { ObjectId } = mongo.Schema.Types;

export const getUser = async id => {
    if(typeof id != 'string')
        id = parseInt(id, 10);

    if(!isID(id))
        return null
    else
        return await User.findOne({ id });
}

export const getUserByEmail = async (email, populate = []) => {
    if(typeof email != 'string')
        return null;

    email = email.trim().replace(/\.$/g, '');
    let user = await User.findOne({ email });

    if(!user)
        return null;

    return user;
}

export const applyDefaultFriends = async user => {
    await user.populate({ path: 'friends', select: 'id' });

    for(let id of DEFAULT_FRIENDS_ID) {
        let friend = await getUser(id);

        if(user.friends.find(f => f.id === friend.id))
            continue;

        if(friend && friend.id != user.id) {
            user.friends.push(friend);
            friend.friends.push(user);

            await friend.save();
        }
    }

    await user.save();
}

export const UserSchema = new mongo.Schema({
    _id: ObjectId,

    id:     t_UserId,
    name:   t_Username,
    admin:  { type: Boolean, default: false },
    banned: { type: Boolean, default: false },

    profile: {
        css:    { type: String, trim: true, default: DEFAULT_PROFILE_CSS },

        about: {
            motto:              { type: String, trim: true, default: DEFAULT_PROFILE_MOTTO },
            bio:                { type: String, trim: true, default: DEFAULT_PROFILE_BIO },
            meet:               { type: String, trim: true, default: DEFAULT_PROFILE_MEET },
            age:                { type: Number, min: 1, max: MAX_PROFILE_AGE, default: DEFAULT_PROFILE_AGE },
            gender:             { type: String, default: DEFAULT_PROFILE_GENDER },
            country:            { type: String, default: DEFAULT_PROFILE_COUNTRY }
        },

        song: {
            enabled:        { type: Boolean, default: false },
            name:           t_StrTrim,
            hash:           t_StrTrim,
            last_update:    { type: Date, default: 0 },
            mime:           { ...t_StrTrim, default: 'audio/mp3' }
        },

        comments:   [ CommentSchema ],
        blogs:      [ BlogSchema ],
        top:        [ {type: ObjectId, ref: 'User'} ],

        pending: {
            comments:   [ CommentSchema ],
            friends:    [ {type: ObjectId, ref: 'User'} ]
        }
    },

    notifications: {
        new_friends: { type: Boolean, default: false }
    },

    admin_data: {
        last_ip:    String,
        banned_on:  Date,
        banned_by:  { type: ObjectId, ref: 'User' },
        ban_reason: t_StrTrim,
        note:       t_StrTrim
    },

    avatar: {
        hash:           { type: String, trim: true, default: '_default' },
        last_update:    { type: Date, default: 0 },
        mime:           { ...t_StrTrim, default: 'image/png' }
    },

    pw_hash:    String,
    email:      t_Email,
    created_on: { type: Date, default: Date.now },
    last_login: { type: Date, default: 0 },

    mails:      [ MailSchema ],
    friends:    [ {type: ObjectId, ref: 'User'} ],
    blocked:    [ {type: ObjectId, ref: 'User'} ],
    reports:    [ ReportSchema ]
});

UserSchema.methods.pushComment = async function(comment, approve = false) {
    const { pending, comments } = this.profile;

    if(!comment.content.trim()) {
        return;
    }

    if(!approve) {
        await comment.populate('author');
    }

    if(comment.author.id === this.id || approve) {
        comments.unshift(comment);

        if(comments.length > MAX_PROFILE_COMMENTS) {
            this.profile.comments = comments.slice(0, MAX_PROFILE_COMMENTS);
        }
    } else {
        // Max 5 pending comments per user
        const ownPending = pending.comments.filter(u => u.author._id.equals(comment.author._id));

        if(ownPending.length >= 5) {
            await ownPending.slice(-1)[0].remove();
        }

        this.profile.pending.comments.unshift(comment);
    }
}

UserSchema.methods.hasFriend = function(user) {
    return this.friends.find(f => f.equals(user._id));
}

UserSchema.methods.hasBlocked = function(user) {
    return this.blocked.find(b => b.equals(user._id));
}

UserSchema.methods.blockUser = async function(user) {
    if(!this.hasBlocked(user)) {
        this.blocked.push(user._id);
        await this.removeFriend(user);
    }
}

UserSchema.methods.unblockUser = async function(user) {
    if(this.hasBlocked(user)) {
        await this.blocked.pull(user._id);
    }
}

UserSchema.methods.acceptRequest = async function(user) {
    const { friends } = this.profile.pending;
    if(friends.find(f => f._id.equals(user._id))) {
        await friends.pull(user._id);
        this.friends.push(user._id);
        user.friends.push(this._id);
        await user.save();
        this.notifications.new_friends = true;
    }
}

UserSchema.methods.declineRequest = async function(user) {
    const { friends } = this.profile.pending;
    if(friends.find(f => f._id.equals(user._id))) {
        await friends.pull(user._id);
    }
}

UserSchema.methods.requestFriend = function(user) {
    const { friends } = this.profile.pending;
    if(!friends.find(f => f._id.equals(user._id))) {
        friends.push(user);
    }
}

UserSchema.methods.removeFriend = async function(user) {
    if(this.hasFriend(user)) {
        await this.friends.pull(user._id);
        await user.friends.pull(this._id);
        await user.save();
    }
}

UserSchema.methods.approvePendingComment = async function(comment) {
    await this.pushComment(comment, true);
    await this.profile.pending.comments.pull(comment._id);
}

UserSchema.methods.declinePendingComment = async function(comment) {
    await this.profile.pending.comments.pull(comment._id);
}


UserSchema.methods.removeComment = async function(comment) {
    await this.profile.comments.pull(comment._id);
}

UserSchema.methods.updateProfile = function(profileObj) {
    let { profile } = this;
    let {
        credo,
        gender,
        country,
        about,
        who,
        css,
        age
    } = profileObj;

    if(age) {
        if(isNaN(age) || age < 1) {
            age = DEFAULT_PROFILE_AGE;
        }

        if(age > MAX_PROFILE_AGE) {
            age = MAX_PROFILE_AGE;
        }
    }

    if(gender && !GENDERS.includes(gender)) {
        gender = DEFAULT_PROFILE_GENDER;
    }

    if(country && !COUNTRIES.includes(country)) {
        country = DEFAULT_PROFILE_COUNTRY;
    }

    if(typeof credo == 'string') {
        profile.about.motto = credo.substring(0, MAX_PROFILE_CREDO_LENGTH);
    }

    if(typeof about == 'string') {
        profile.about.bio = about.substring(0, MAX_PROFILE_BIO_LENGTH);
    }

    if(typeof who == 'string') {
        profile.about.meet = who.substring(0, MAX_PROFILE_MEET_LENGTH);
    }

    if(typeof css == 'string') {
        profile.css = css.substring(0, MAX_PROFILE_CSS_LENGTH);
    }

    if(age) {
        profile.about.age = age;
    }

    if(typeof gender != 'undefined') {
        profile.about.gender = gender;
    }

    if(typeof country != 'undefined') {
        profile.about.country = country;
    }
}

UserSchema.methods.updateAvatar = async function(data, mime) {
    const hash = blake3(data).toString('hex');

    if(this.avatar.hash === hash) {
        return;
    }

    this.avatar.hash = hash;
    this.avatar.last_update = new Date();
    this.avatar.mime = mime;

    const target = join(PATH_USERS, PATH_USERS_AVATARS, hash + '.bin');
    if(!(await fs.exists(target))) {
        await fs.writeFile(target, data);
    }
}

UserSchema.methods.updateMP3 = async function(sname, data, mime) {
    const hash = blake3(data).toString('hex');

    this.profile.song.enabled = true;
    this.profile.song.name = sname;
    this.profile.song.hash = hash;
    this.profile.song.last_update = new Date();
    this.profile.song.mime = mime;

    const target = join(PATH_USERS, PATH_USERS_SONGS, hash + '.bin');
    if(!(await fs.exists(target))) {
        await fs.writeFile(target, data);
    }
}

UserSchema.methods.disableMP3 = async function() {
    this.profile.song.enabled = false;
    this.profile.song.name = '';
    this.profile.song.hash = '';
    this.profile.song.last_update = new Date();
    this.profile.song.mime = '';
}

export const User = mongo.model('User', UserSchema);
export const getOnline = async () => {
    const targetTime = new Date(Date.now() - PROFILE_ONLINE_TIME);

    return await User.find({
        banned: false,
        last_login: { $gte: targetTime }
    });
}

export const pruneAvatar = async(hash) => {
    if(hash === '_default') {
        return;
    }

    const oldCount = await User.count({ 'avatar.hash': hash });
    if(oldCount === 0) {
        const oldPath = join(PATH_USERS, PATH_USERS_AVATARS, hash + '.bin')
        await fs.unlink(oldPath);
    }
}

export const pruneSong = async(hash) => {
    if(!hash) {
        return;
    }

    const oldCount = await User.count({ 'profile.song.hash': hash });
    if(oldCount === 0) {
        const oldPath = join(PATH_USERS, PATH_USERS_SONGS, hash + '.bin')
        await fs.unlink(oldPath);
    }
}
