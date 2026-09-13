/*const express = require('express');
const fs = require('fs');
const path = require('path');

const { config } = require("dotenv");

const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");;
    res.header("Access-Control-Request-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");

    // Pass to next layer of middleware
    next(); // Requête autorisée
});

const db = new sqlite3.Database('./epileptomemo.db');
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS waitlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        source TEXT,
        language TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
            if (err) {
            return console.error(err.message);
            }
        }
    );

    db.run(`
        CREATE TABLE IF NOT EXISTS  analytics_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_name TEXT NOT NULL,
            value TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        `,
        (err) => {
            if (err) {
            return console.error(err.message);
            }
        }
   );
});


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user:"epileptomemo@gmail.com",
        access_type:"offline",
        type: 'OAuth2',
        clientId: "618455523746-gsv8iq2kbjcil149qi1edjamkkgn4qec.apps.googleusercontent.com",
        clientSecret: "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",
        refreshToken: "1//04G6Ti1x41o4gCgYIARAAGAQSNwF-L9Ir4H5PokpkSIUFCD8HkJhK1-JI1wd_3tlSxRYRaTlvHh2nDRvNL-WizA2A3tLnp24kpQE"
    }
});

app.post('/api/waitlist', (req, res) => {

  const email = req.body.email?.trim().toLowerCase();
  const source = req.body.source?.trim().toLowerCase();
  const language = req.body.language?.trim().toLowerCase();
  
  let subject = "Wellcome to EpiletoMemo 💙";
  let welcome = "Welcome 👋";
  let joining = "Thank you for joining our waitlist.";
  let firstusers = "You are among the first users interested in EpileptoMemo.";
  let memorygames = "Memory games";
  let seizurejournal = "Seizure journal";
  let reportsandstats = "Reports && Stats tracking";
  let family = "Familly Support";
  let visitwebsite= "Visit Website";
  let updtesoon= "We’ll keep you updated soon.";
  let epileptoteam = "The EpileptoMemo Team";

  if(!language){
    language = "fr";
  }

  if(language == "fr"){
    subject = "Bienvenu sur EpiletoMemo 💙";
    welcome = "Bienvenu 👋";
    joining = "Merci de vous être inscrit sur notre liste d'attente.";
    firstusers = "Vous faites partie des premiers utilisateurs intéressés par EpileptoMemo.";
    memorygames = "Jeux de Mémoire";
    seizurejournal = "Journal des Crises";
    reportsandstats = "Suivi des Rapports et des Statistiques";
    family = "Soutien des familles";
    visitwebsite= "Visiter le Site Web";
    updtesoon= "Nous vous tiendrons au courant très bientôt.";
    epileptoteam = "L'équipe EpileptoMemo";
  }

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  db.get(
    "SELECT id FROM waitlist WHERE email = ?",
    [email],
    (err, row) => {

      if (row) {
        return res.json({
          success: false,
          message: "Already registered"
        });
      }

      db.run(
        "INSERT INTO waitlist(email, source, language) VALUES(?, ?, ?)",
        [email, source, language],
        async function(err) {

          if (err) {
            return res.json({
                success: false,
                message: "DB error"
             });
          }

          try {
            
            let mailOptions = {
                from: '"EpileptoMemo', // sender address
                to: email, // list of receivers
                subject: "Wellcome to EpiletoMemo 💙", // Subject line
                proxy:"https://www.epileptomemo.com",
                attachments: [
                {
                    filename: "epileptomemo.png",
                    path: "./epileptomemo.png",
                    cid: "logo@epileptomemo.com", // matches the cid in the img src attribute
                },],
                
                html: `
        <div style="background:#f5f7fb;padding:30px;font-family:Arial">

        <div style="
        max-width:600px;
        margin:auto;
        background:white;
        border-radius:18px;
        overflow:hidden;
        box-shadow:0 8px 30px rgba(0,0,0,0.08);
        ">

        <div style="
        background: linear-gradient(-90deg, #3283dc, #1d65bf);
        padding:30px;
        text-align:center;
        font-style:italic;
        color:white;
        font-size:30px;
        font-weight:bold;
        ">
        <img src="cid:logo@epileptomemo.com" alt="EpileptoMemo" width="279" title="EpileptoMemo" class="adapt-img">
        </div>

        <div style="padding:35px;color:#333;">

        <h2>${welcome}</h2>

        <p>${joining}</p>

        <p>${firstusers}</p>

        <p>
        🧠 ${memorygames}<br>
        📘 ${seizurejournal}<br>
        📈 ${reportsandstats}<br>
        💙 ${family}
        </p>

        <div style="text-align:center;margin:30px 0;">
        <a href="https://www.epileptomemo.com"
        style="
        background: linear-gradient(180deg, #3484e0, #2a78d8);
        color:white;
        padding:14px 28px;
        border-radius:12px;
        text-decoration:none;
        font-weight:bold;
        ">
        ${visitwebsite}
        </a>
        </div>

        <p>${updtesoon}</p>

        <p><strong>${epileptoteam}</strong></p>

        </div>
        </div>
        </div>
        `
            };

            // send mail with defined transport object
            let info = await transporter.sendMail(mailOptions);
            //callback(info);
            res.json({
                success: true,
                message: "Registered"
            });
        }catch(err){
            // handle
            if (!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        }
        }
      );
    }
  );
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/

/*require('dotenv').config();

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();

const PORT = process.env.PORT || 3001;
const FRONTEND_URL =
    process.env.FRONTEND_URL || 'http://localhost:4200';

app.use(express.json());*/

const express = require('express');
const fs = require('fs');
const path = require('path');

const { config } = require("dotenv");

const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "*");;
    res.header("Access-Control-Request-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");

    // Pass to next layer of middleware
    next(); // Requête autorisée
});

/*
 * --------------------------------------------------
 * CORS
 * --------------------------------------------------
 */

/*app.use((req, res, next) => {

    res.header(
        'Access-Control-Allow-Origin',
        FRONTEND_URL
    );

    res.header(
        'Access-Control-Allow-Credentials',
        'true'
    );

    res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS'
    );

    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});*/


/*
 * --------------------------------------------------
 * DATABASE
 * --------------------------------------------------
 */

const db = new sqlite3.Database('./epileptomemo.db');

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS users (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            email TEXT UNIQUE NOT NULL,

            password_hash TEXT NOT NULL,

            first_name TEXT NOT NULL,

            last_name TEXT NOT NULL,

            role TEXT NOT NULL
                CHECK(role IN ('patient', 'neurologue')),

            birth_date TEXT,

            rpps TEXT UNIQUE,

            email_verified INTEGER NOT NULL DEFAULT 0,

            professional_verified INTEGER NOT NULL DEFAULT 0,

            account_status TEXT NOT NULL DEFAULT 'pending',

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);


    db.run(`
        CREATE TABLE IF NOT EXISTS verification_codes (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            user_id INTEGER NOT NULL,

            code_hash TEXT NOT NULL,

            type TEXT NOT NULL,

            expires_at DATETIME NOT NULL,

            attempts INTEGER NOT NULL DEFAULT 0,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(user_id)
                REFERENCES users(id)
        )
    `);


    db.run(`
        CREATE TABLE IF NOT EXISTS sessions (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            token_hash TEXT UNIQUE NOT NULL,

            user_id INTEGER NOT NULL,

            expires_at DATETIME NOT NULL,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY(user_id)
                REFERENCES users(id)
        )
    `);


    db.run(`
        CREATE TABLE IF NOT EXISTS waitlist (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            email TEXT UNIQUE NOT NULL,

            source TEXT,

            language TEXT,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);


    db.run(`
        CREATE TABLE IF NOT EXISTS analytics_events (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            event_name TEXT NOT NULL,

            value TEXT,

            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

});


/*
 * --------------------------------------------------
 * MAIL
 * --------------------------------------------------
 */

const transporter = nodemailer.createTransport({

    host: process.env.SMTP_HOST,

    port: Number(PORT|| 587),

    secure: false,

    auth: {

        user: process.env.SMTP_USER,

        type: 'OAuth2',

        clientId: process.env.SMTP_CLIENT_ID,

        clientSecret: process.env.SMTP_CLIENT_SECRET,

        refreshToken: process.env.SMTP_REFRESH_TOKEN
    }
});


/*
 * --------------------------------------------------
 * HELPERS
 * --------------------------------------------------
 */

function hashToken(token) {

    return crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
}


function generateToken() {

    return crypto
        .randomBytes(48)
        .toString('hex');
}


function generateCode() {

    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();
}


function hashCode(code) {

    return crypto
        .createHash('sha256')
        .update(code)
        .digest('hex');
}


/*
 * --------------------------------------------------
 * SESSION COOKIE
 * --------------------------------------------------
 */

function setSessionCookie(res, token) {

    const isProduction =
        process.env.NODE_ENV === 'production';

    res.cookie(
        'em_session',
        token,
        {
            httpOnly: true,

            secure: isProduction,

            sameSite: 'lax',

            path: '/',

            maxAge: 7 * 24 * 60 * 60 * 1000
        }
    );
}


function clearSessionCookie(res) {

    res.clearCookie(
        'em_session',
        {
            httpOnly: true,

            secure:
                process.env.NODE_ENV === 'production',

            sameSite: 'lax',

            path: '/'
        }
    );
}


/*
 * --------------------------------------------------
 * COOKIE PARSER
 * --------------------------------------------------
 */

function getCookie(req, name) {

    const cookies = req.headers.cookie;

    if (!cookies) {
        return null;
    }

    const parts = cookies.split(';');

    for (const part of parts) {

        const [key, ...value] =
            part.trim().split('=');

        if (key === name) {

            return decodeURIComponent(
                value.join('=')
            );
        }
    }

    return null;
}


/*
 * --------------------------------------------------
 * AUTH MIDDLEWARE
 * --------------------------------------------------
 */

function requireAuth(req, res, next) {

    const token =
        getCookie(req, 'em_session');

    if (!token) {

        return res.status(401).json({
            success: false,
            message: 'Non authentifié'
        });
    }

    const tokenHash =
        hashToken(token);

    db.get(
        `
        SELECT
            sessions.id AS session_id,
            sessions.expires_at,
            users.id,
            users.email,
            users.first_name,
            users.last_name,
            users.role,
            users.email_verified,
            users.professional_verified,
            users.account_status

        FROM sessions

        INNER JOIN users
            ON users.id = sessions.user_id

        WHERE sessions.token_hash = ?
        `,
        [tokenHash],

        (err, user) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message: 'Erreur serveur'
                });
            }

            if (!user) {

                return res.status(401).json({
                    success: false,
                    message: 'Session invalide'
                });
            }


            const expires =
                new Date(user.expires_at);

            if (expires < new Date()) {

                db.run(
                    `DELETE FROM sessions
                     WHERE id = ?`,
                    [user.session_id]
                );

                clearSessionCookie(res);

                return res.status(401).json({
                    success: false,
                    message: 'Session expirée'
                });
            }


            if (
                user.account_status !== 'active'
            ) {

                return res.status(403).json({
                    success: false,
                    message: 'Compte non actif'
                });
            }


            req.user = user;

            next();
        }
    );
}


/*
 * --------------------------------------------------
 * REGISTER
 * --------------------------------------------------
 */

app.post('/api/auth/register', async (req, res) => {

    /*const language = req.body.language?.trim().toLowerCase();
  
    let subject = "Wellcome to EpiletoMemo 💙";
    let welcome = "Welcome 👋";
    let joining = "Thank you for joining our waitlist.";
    let firstusers = "You are among the first users interested in EpileptoMemo.";
    let memorygames = "Memory games";
    let seizurejournal = "Seizure journal";
    let reportsandstats = "Reports && Stats tracking";
    let family = "Familly Support";
    let visitwebsite= "Visit Website";
    let updtesoon= "We’ll keep you updated soon.";
    let epileptoteam = "The EpileptoMemo Team";

    if(!language){
      language = "fr";
    }

    if(language == "fr"){
      subject = "Bienvenu sur EpiletoMemo 💙";
      welcome = "Bienvenu 👋";
      joining = "Merci de vous être inscrit sur notre liste d'attente.";
      firstusers = "Vous faites partie des premiers utilisateurs intéressés par EpileptoMemo.";
      memorygames = "Jeux de Mémoire";
      seizurejournal = "Journal des Crises";
      reportsandstats = "Suivi des Rapports et des Statistiques";
      family = "Soutien des familles";
      visitwebsite= "Visiter le Site Web";
      updtesoon= "Nous vous tiendrons au courant très bientôt.";
      epileptoteam = "L'équipe EpileptoMemo";
    }*/

    try {

        const {
            email,
            password,
            firstName,
            lastName,
            birthDate,
            role,
            rpps
        } = req.body;


        if (
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !role
        ) {

            return res.status(400).json({
                success: false,
                message: 'Champs obligatoires manquants'
            });
        }


        if (
            !['patient', 'neurologue']
                .includes(role)
        ) {

            return res.status(400).json({
                success: false,
                message: 'Type de compte invalide'
            });
        }


        if (password.length < 10) {

            return res.status(400).json({
                success: false,
                message:
                    'Le mot de passe doit contenir au moins 10 caractères'
            });
        }


        if (
            role === 'neurologue' &&
            !rpps
        ) {

            return res.status(400).json({
                success: false,
                message:
                    'Le numéro RPPS est obligatoire pour un neurologue'
            });
        }


        const normalizedEmail =
            email.trim().toLowerCase();


        db.get(
            `
            SELECT id
            FROM users
            WHERE email = ?
            `,
            [normalizedEmail],

            async (err, existing) => {

                if (err) {

                    console.error(err);

                    return res.status(500).json({
                        message: 'Erreur serveur'
                    });
                }


                if (existing) {

                    return res.status(409).json({
                        success: false,
                        message:
                            'Un compte existe déjà avec cet email'
                    });
                }


                const passwordHash =
                    await bcrypt.hash(
                        password,
                        12
                    );


                const status =
                    role === 'patient'
                        ? 'pending'
                        : 'pending_verification';


                db.run(
                    `
                    INSERT INTO users (

                        email,
                        password_hash,
                        first_name,
                        last_name,
                        role,
                        birth_date,
                        rpps,
                        account_status

                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    `,

                    [
                        normalizedEmail,
                        passwordHash,
                        firstName.trim(),
                        lastName.trim(),
                        role,
                        birthDate || null,
                        role === 'neurologue'
                            ? rpps.trim()
                            : null,
                        status
                    ],

                    async function(err) {

                        if (err) {

                            console.error(err);

                            return res.status(500).json({
                                message:
                                    'Impossible de créer le compte'
                            });
                        }


                        const userId =
                            this.lastID;


                        /*
                         * Code de confirmation email
                         */

                        const code =
                            generateCode();

                        const codeHash =
                            hashCode(code);


                        db.run(
                            `
                            INSERT INTO verification_codes (

                                user_id,
                                code_hash,
                                type,
                                expires_at

                            )
                            VALUES (
                                ?,
                                ?,
                                'email',
                                datetime('now', '+15 minutes')
                            )
                            `,
                            [
                                userId,
                                codeHash
                            ]
                        );


                        await transporter.sendMail({

                            from:
                                `"EpileptoMemo" <${process.env.SMTP_USER}>`,

                            to:
                                normalizedEmail,

                            subject:
                                'Votre code EpileptoMemo',

                            html: `
                                <div style="font-family:Arial">

                                    <h2>
                                        Bienvenue sur EpileptoMemo
                                    </h2>

                                    <p>
                                        Votre code de validation :
                                    </p>

                                    <h1>
                                        ${code}
                                    </h1>

                                    <p>
                                        Ce code est valable
                                        pendant 15 minutes.
                                    </p>

                                </div>
                            `
                        });


                        return res.status(201).json({

                            success: true,

                            message:
                                'Compte créé. Vérifiez votre email.',

                            requiresEmailVerification:
                                true,

                            role
                        });
                    }
                );
            }
        );

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Erreur serveur'
        });
    }
});

/*
 * --------------------------------------------------
 * VERIFY EMAIL
 * --------------------------------------------------
 */

app.post(
    '/api/auth/verify-email',
    (req, res) => {

        const {
            email,
            code
        } = req.body;


        if (!email || !code) {

            return res.status(400).json({
                message:
                    'Email et code obligatoires'
            });
        }


        db.get(
            `
            SELECT *
            FROM users
            WHERE email = ?
            `,
            [
                email.trim().toLowerCase()
            ],

            (err, user) => {

                if (err || !user) {

                    return res.status(400).json({
                        message:
                            'Code invalide'
                    });
                }


                db.get(
                    `
                    SELECT *
                    FROM verification_codes

                    WHERE user_id = ?

                    AND type = 'email'

                    ORDER BY created_at DESC

                    LIMIT 1
                    `,
                    [user.id],

                    (err, verification) => {

                        if (
                            err ||
                            !verification
                        ) {

                            return res.status(400).json({
                                message:
                                    'Code invalide'
                            });
                        }


                        if (
                            new Date(
                                verification.expires_at
                            ) < new Date()
                        ) {

                            return res.status(400).json({
                                message:
                                    'Code expiré'
                            });
                        }


                        const valid =
                            hashCode(code) ===
                            verification.code_hash;


                        if (!valid) {

                            return res.status(400).json({
                                message:
                                    'Code incorrect'
                            });
                        }


                        db.run(
                            `
                            UPDATE users

                            SET
                                email_verified = 1,

                                account_status =
                                    CASE

                                    WHEN role = 'patient'
                                    THEN 'active'

                                    ELSE 'pending_verification'

                                    END

                            WHERE id = ?
                            `,
                            [user.id],

                            () => {

                                db.run(
                                    `
                                    DELETE FROM
                                    verification_codes

                                    WHERE id = ?
                                    `,
                                    [verification.id]
                                );


                                res.json({

                                    success: true,

                                    message:
                                        user.role === 'patient'
                                            ? 'Compte activé'
                                            : 'Email vérifié. Votre compte professionnel doit maintenant être validé.'
                                });
                            }
                        );
                    }
                );
            }
        );
    }
);

/*
 * --------------------------------------------------
 * LOGIN EMAIL
 * --------------------------------------------------
 */
app.post('/api/auth/login', async (req, res) => {

    const {
        email,
        password
    } = req.body;


    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message:
                'Email et mot de passe obligatoires'
        });
    }


    db.get(
        `
        SELECT *
        FROM users
        WHERE email = ?
        `,
        [
            email.trim().toLowerCase()
        ],

        async (err, user) => {

            if (err) {

                console.error(err);

                return res.status(500).json({
                    message:
                        'Erreur serveur'
                });
            }


            if (!user) {

                return res.status(401).json({
                    success: false,
                    message:
                        'Email ou mot de passe incorrect'
                });
            }


            const valid =
                await bcrypt.compare(
                    password,
                    user.password_hash
                );


            if (!valid) {

                return res.status(401).json({
                    success: false,
                    message:
                        'Email ou mot de passe incorrect'
                });
            }


            if (!user.email_verified) {

                return res.status(403).json({
                    success: false,
                    message:
                        'Veuillez vérifier votre adresse email',
                    requiresEmailVerification:
                        true
                });
            }


            if (
                user.account_status ===
                'pending_verification'
            ) {

                return res.status(403).json({
                    success: false,
                    message:
                        'Votre compte professionnel est en attente de validation.'
                });
            }


            if (
                user.account_status !==
                'active'
            ) {

                return res.status(403).json({
                    success: false,
                    message:
                        'Votre compte n’est pas actif.'
                });
            }


            /*
             * Création session
             */

            const token =
                generateToken();

            const tokenHash =
                hashToken(token);


            db.run(
                `
                INSERT INTO sessions (

                    token_hash,
                    user_id,
                    expires_at

                )
                VALUES (
                    ?,
                    ?,
                    datetime('now', '+7 days')
                )
                `,
                [
                    tokenHash,
                    user.id
                ],

                (err) => {

                    if (err) {

                        console.error(err);

                        return res.status(500).json({
                            message:
                                'Impossible de créer la session'
                        });
                    }


                    setSessionCookie(
                        res,
                        token
                    );


                    return res.json({

                        success: true,

                        user: {

                            id: user.id,

                            email: user.email,

                            firstName:
                                user.first_name,

                            lastName:
                                user.last_name,

                            role:
                                user.role
                        }
                    });
                }
            );
        }
    );
});

/*
 * --------------------------------------------------
 * CHECK AUTHENTICATION
 * --------------------------------------------------
 */
app.get(
    '/api/auth/me',
    requireAuth,
    (req, res) => {

        res.json({

            authenticated: true,

            user: {

                id: req.user.id,

                email: req.user.email,

                firstName:
                    req.user.first_name,

                lastName:
                    req.user.last_name,

                role:
                    req.user.role
            }
        });
    }
);

/*
 * --------------------------------------------------
 * LOGOUT
 * --------------------------------------------------
 */
app.post(
    '/api/auth/logout',
    (req, res) => {

        const token =
            getCookie(req, 'em_session');


        if (token) {

            const tokenHash =
                hashToken(token);

            db.run(
                `
                DELETE FROM sessions
                WHERE token_hash = ?
                `,
                [tokenHash]
            );
        }


        clearSessionCookie(res);


        res.json({
            success: true
        });
    }
);

/*
 * --------------------------------------------------
 * GET PATIENTS INFO
 * --------------------------------------------------
 */
app.get(
    '/api/patients/:id',
    requireAuth,
    requireRole('neurologue')
);

app.get(
    '/api/neurologue/patients',
    requireAuth,
    requireRole('neurologue'),
    (req, res) => {

        // ...
    }
);

function requireRole(role) {

    return (req, res, next) => {

        if (!req.user) {

            return res.status(401).json({
                message:
                    'Non authentifié'
            });
        }


        if (req.user.role !== role) {

            return res.status(403).json({
                message:
                    'Accès interdit'
            });
        }


        next();
    };
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});