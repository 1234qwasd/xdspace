import {
    MAX_PROFILE_USERNAME_LENGTH
} from '../../config.js';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const t_UserId = {
    type: Number,
    min: 1
};

export const t_StrTrim = {
    type: String,
    trim: true
};

export const t_Username = {
    type: String,
    trim: true,
    required: 'An username is required',
    minLength: 2,
    maxLength: MAX_PROFILE_USERNAME_LENGTH
}

export const t_Email = {
    type: String,
    trim: true,
    lowercase: true,
    maxLength: 100,
    required: 'An email address is required',
    match: [EMAIL_REGEX, 'A valid email address is required']
}
