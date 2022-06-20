/**
 * Markdown options
 */
export const MARKDOWN_CONFIG = {
    html: false,
    breaks: true,
    linkify: true,
    typographer: false
}

/**
 * Profile limits
 */
export const MAX_PROFILE_USERNAME_LENGTH = 20;
export const MAX_PROFILE_BIO_LENGTH = 10000;
export const MAX_PROFILE_MEET_LENGTH = 512;
export const MAX_PROFILE_CREDO_LENGTH = 50;
export const MAX_PROFILE_CSS_LENGTH = 256000;
export const MAX_PROFILE_AGE = 101;
export const MAX_PROFILE_COMMENTS = 100;
export const MAX_PROFILE_TOP = 8;

export const MAX_COMMENT_LENGTH = 512;

/**
 * Message limits
 */
export const MAX_MESSAGE_SUBJECT_LENGTH = 24;
export const MAX_MESSAGE_CONTENT_LENGTH = 200;

/**
 * Blogs limits
 */
export const MAX_BLOG_TITLE_LENGTH = 40;
export const MAX_BLOG_CORPUS_LENGTH = 4096;
export const MAX_BLOG_COMMENTS = 10;

/**
 * Profile variables
 */
export const PROFILE_ONLINE_TIME = 900000;
export const GENDERS = [
    'Male',
    'Female',
    'Other',
    'Doge',
    'Furry',
    'Agender',
    'Androgyne',
    'Androgynous',
    'Bigender',
    'Bot',
    'Cis',
    'Cisgender',
    'Cis Female',
    'Cis Male',
    'Cis Man',
    'Cis Woman',
    'Cisgender Female',
    'Cisgender Male',
    'Cisgender Man',
    'Cisgender Woman',
    'Female to Male',
    'Ex-President',
    'FTM',
    'Gender Fluid',
    'Gender Nonconforming',
    'Gender Questioning',
    'Gender Variant',
    'Genderqueer',
    'Intersex',
    'Male to Female',
    'MTF',
    'Neither',
    'Neutrois',
    'Non-binary',
    'Pangender',
    'Specter',
    'Trans',
    'Trans*',
    'Transformer',
    'Trans Female',
    'Trans* Female',
    'Trans Male',
    'Trans* Male',
    'Trans Man',
    'Trans* Man',
    'Trans Person',
    'Trans* Person',
    'Trans Woman',
    'Trans* Woman',
    'Transfeminine',
    'Transgender',
    'Transgender Female',
    'Transgender Male',
    'Transgender Man',
    'Transgender Person',
    'Transgender Woman',
    'Transmasculine',
    'Transsexual',
    'Transsexual Female',
    'Transsexual Male',
    'Transsexual Man',
    'Transsexual Person',
    'Transsexual Woman',
    'Two-Spirit'
];

export const COUNTRIES = [
    'Interzone',
    'Afghanistan',
    'Albania',
    'Algeria',
    'American Samoa',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antarctica',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegowina',
    'Botswana',
    'Bouvet Island',
    'Brazil',
    'British Indian Ocean Territory',
    'Brunei Darussalam',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Christmas Island',
    'Cocos (Keeling) Islands',
    'Colombia',
    'Comoros',
    'Congo',
    'the Democratic Republic of the Congo',
    'Cook Islands',
    'Costa Rica',
    'Cote d\'Ivoire',
    'Croatia (Hrvatska)',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'East Timor',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands (Malvinas)',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'France Metropolitan',
    'French Guiana',
    'French Polynesia',
    'French Southern Territories',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guadeloupe',
    'Guam',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Heard and Mc Donald Islands',
    'Holy See (Vatican City State)',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran (Islamic Republic of)',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Democratic People\'s Republic of Korea',
    'Republic of Korea',
    'Kuwait',
    'Kyrgyzstan',
    'Lao, People\'s Democratic Republic',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libyan Arab Jamahiriya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Martinique',
    'Mauritania',
    'Mauritius',
    'Mayotte',
    'Mexico',
    'Micronesia',
    'Monaco',
    'Mongolia',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'Niue',
    'Norfolk Island',
    'Northern Mariana Islands',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Pitcairn',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russian Federation',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia (Slovak Republic)',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Georgia and the South Sandwich Islands',
    'Spain',
    'Sri Lanka',
    'St. Helena',
    'St. Pierre and Miquelon',
    'Sudan',
    'Suriname',
    'Svalbard and Jan Mayen Islands',
    'Eswatini',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syrian Arab Republic',
    'Taiwan',
    'Tajikistan',
    'Thailand',
    'Togo',
    'Tokelau',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks and Caicos Islands',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'United States Minor Outlying Islands',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Venezuela',
    'Vietnam',
    'Virgin Islands (British)',
    'Virgin Islands (U.S.)',
    'Wallis and Futuna Islands',
    'Western Sahara',
    'Yemen',
    'Yugoslavia',
    'Zambia',
    'Zimbabwe'
];

/**
 * Profile defaults
 */
export const DEFAULT_PROFILE_MOTTO = 'Test Credo';
export const DEFAULT_PROFILE_BIO = 'Naber.';
export const DEFAULT_PROFILE_MEET = 'Bilmem';

export const DEFAULT_PROFILE_CSS = 'body{background:#fff;}';

export const DEFAULT_PROFILE_AGE = 9;
export const DEFAULT_PROFILE_GENDER = 'Other';
export const DEFAULT_PROFILE_COUNTRY = 'Interzone';
export const DEFAULT_FRIENDS_ID = [1];

/**
 * [advanced] File paths
 */
export const PATH_USERS = 'data/users';
export const PATH_USERS_AVATARS = 'avatars'; // Relative to PATH_USERS
export const PATH_USERS_SONGS = 'songs'; // Relative to PATH_USERS

/**
 * DB Stuff
 *
 * MONGO_URL:
 *  The URL mongoose should use to connect.
 *
 * BCRYPT_ROUNDS:
 *  The number of rounds bcrypt should use. Higher numbers
 *  make it more secure, but will make logging in / signing up slower.
 *  If you're not sure, you can try the bcrypt benchmark script
 *  by running `npm run bcrypt`.
 */
export const MONGO_URL = 'mongodb+srv://dbs1:Kaya12241224@cluster0.nwxid.mongodb.net/?retryWrites=true&w=majority';
export const BCRYPT_ROUNDS = 10;

/**
 * General muSpace/server config
 *
 * SERVER_NAME / SERVER_DESCRIPTION:
 *  Text displayed in the Discord/OGP embed.
 *
 * SERVER_DISABLE_SIGNUPS:
 *  Enable/disable signups. SERVER_DISABLE_SIGNUPS_MESSAGE can
 *  be set to show a message on the signup page, or set to `false`
 *  to not show anything.
 *
 * SERVER_PORT:
 *  The port express/SPDY will listen on.
 *
 * SERVER_USES_PROXY:
 *  Will tell express to trust proxy header such
 *  as `x-forwarded-for` for getting the real IP address.
 *
 *  You can use this config if you use `proxy_pass` with NGINX:
 *
 *      proxy_set_header Host               $host;
 *      proxy_set_header X-Forwarded-For    $remote_addr;
 *      proxy_set_header X-Forwarded-Proto  $scheme;
 * 
 * MAX_BODY_SIZE:
 *  Maximum file size express can accept (applies to profile pictures / songs).
 */
export const SERVER_NAME = 'XDSPACE';
export const SERVER_DESCRIPTION = 'xD';
export const SERVER_DISABLE_SIGNUPS = false;
export const SERVER_DISABLE_SIGNUPS_MESSAGE = 'Please come back later.';
export const SERVER_PORT = 8090;
export const SERVER_USES_PROXY = false;
export const MAX_BODY_SIZE = '4mb';

/**
 * Account config
 */
export const SESSION_SECRET_PATH = 'data/session.bin';
export const ACCOUNT_REQUEST_EXPIRES = 3600000; // 1 hour

/**
 * Organization domain.
 * 
 * This is what's shown on the page footer.
 * 
 * Set ORG to `false` if you don't have a main
 * website / domain.
 */
export const ORG = true;
export const ORG_NAME = 'SMILE SOSYAL';
export const ORG_URL = 'http://smileforum.my-board.org';

/**
 * EMail options.
 * Specify your SMTP settings in order to send emails.
 * If left disabled, nothing will happen, and the welcome token will be logged in console.
 * 
 * EMAIL_SECURE is not required to be true if you are using STARTTLS. 
 * Use port 465 to use standard TLS with this option.
 * 
 * EMAIL_REJECT_UNAUTHORIZED rejects invalid certificates used.
 * Many self hosted mailservers do not have a valid certificate, which would require this option to be false.
 */
export const EMAIL_ENABLED = true;
export const EMAIL_HOST = 'smtp.mail.com.tr';
export const EMAIL_SECURE = true;
export const EMAIL_REJECT_UNAUTHORIZED = true;
export const EMAIL_PORT = 465;
export const EMAIL_USER = 'kayabulba70@mail.com.tr';
export const EMAIL_PASSWORD = 'Kaya12241224';
export const EMAIL_FROM = '"xDSpace" <system@example.org>';
export const EMAIL_SIGNATURE = 'Kaya from xDSpace';
