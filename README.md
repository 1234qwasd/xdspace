# muSpace

muSpace is a project aiming to recreate an experience similar to Windows93.net's MySpace,
with a proper database and with better security.

## Install

First, copy `config.example.js` to `config.js` and edit the MongoDB URL to point to your DB.

Then, install dependencies and start:
```bash
$ npm i
$ npm start
```

By default, all users have no admin privileges, you have to run `node scripts/aset <Your user ID>` to grant yourself admin permissions.
