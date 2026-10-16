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

require('dotenv').config();

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");;
    //res.header("Access-Control-Request-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    if(req.method === "OPTIONS"){
        return res.status(200).end();
    }
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

/*const transporter = nodemailer.createTransport({

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
});*/
console.log("host = "+process.env.SMTP_HOST);
console.log("port = "+process.env.SMTP_PORT);
console.log("user = "+process.env.SMTP_USER);
console.log("pass = "+process.env.SMTP_PASS);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST||"smtp.gmail.com",
  port: process.env.SMTP_PORT||465,
  //secure: false, // OBLIGATOIRE pour le port 587
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER||"epileptomemo@gmail.com",
    pass: process.env.SMTP_PASS // /!\ LIRE L'ÉTAPE 2 CI-DESSOUS
  },
  /*tls: {
    // Évite le blocage si votre réseau local/antivirus interfère
    rejectUnauthorized: false 
  }*/
});


function dbGet(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.get(sql, params, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function dbRun(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    });
}

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

    return crypto
        .randomInt(100000, 1000000)
        .toString();
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
   console.log("register called");

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
                    console.log("❌ Un compte existe déjà avec cet email");
                    return res.status(409).json({
                        success: false,
                        message:
                            'Un compte existe déjà avec cet email'
                    });
                }

                try {
                    await transporter.verify();
                     console.log('SMTP server is ready to take messages');
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

                } catch (error) {
                    console.error('SMTP connection error:', error);
                    return res.status(500).json({
                        message:
                            'Impossible de créer le compte'
                    });
                }
                
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
 * SEND VERIFICATION EMAIL
 * --------------------------------------------------
 */

async function sendVerificationEmail(
    email,
    firstName,
    code
) {

    await transporter.sendMail({

        from: `"EpileptoMemo" <${process.env.SMTP_USER}>`,

        to: email,

        subject:
            'Votre code de validation EpileptoMemo',

        html: `
            <div style="
                font-family:Arial,sans-serif;
                max-width:600px;
                margin:auto;
                color:#182B57;
            ">

                <h2>
                    Bienvenue sur EpileptoMemo 💙
                </h2>

                <p>
                    Bonjour ${escapeHtml(firstName)},
                </p>

                <p>
                    Voici votre code de validation :
                </p>

                <div style="
                    font-size:32px;
                    font-weight:bold;
                    letter-spacing:8px;
                    padding:20px 0;
                    color:#3478F6;
                ">
                    ${code}
                </div>

                <p>
                    Ce code est valable pendant
                    <strong>15 minutes</strong>.
                </p>

                <p>
                    Si vous n'êtes pas à l'origine
                    de cette inscription, vous pouvez
                    ignorer cet e-mail.
                </p>

            </div>
        `
    });
}

/*
 * --------------------------------------------------
 * VERIFY EMAIL
 * --------------------------------------------------
 */

app.post('/api/auth/verify-email', async (req, res) => {

    try {

        const email = req.body.email
            ?.trim()
            .toLowerCase();

        const code = String(req.body.code || '')
            .trim();

        console.log('--------------------------------');
        console.log('VERIFY EMAIL');
        console.log('email reçu :', email);
        console.log('code reçu  :', code);
        console.log('--------------------------------');


        // --------------------------------------------------
        // VALIDATION
        // --------------------------------------------------

        if (!email || !/^\d{6}$/.test(code)) {

            console.log('Email ou code invalide');

            return res.status(400).json({
                success: false,
                message: 'Code de vérification invalide.'
            });
        }


        // --------------------------------------------------
        // RECHERCHE UTILISATEUR
        // --------------------------------------------------

        const user = await dbGet(
            `
            SELECT
                id,
                email,
                first_name,
                last_name,
                role,
                email_verified,
                account_status
            FROM users
            WHERE email = ?
            `,
            [email]
        );


        console.log('USER TROUVÉ :', user);


        if (!user) {

            console.log('❌ Utilisateur introuvable');

            return res.status(400).json({
                success: false,
                message: 'Code de vérification invalide ou expiré.'
            });
        }


        console.log('user.id =', user.id);
        console.log('user.email =', user.email);
        console.log('user.email_verified =', user.email_verified);


        // --------------------------------------------------
        // EMAIL DÉJÀ VÉRIFIÉ
        // --------------------------------------------------

        if (user.email_verified === 1) {

            return res.status(400).json({
                success: false,
                message: 'Cette adresse e-mail est déjà vérifiée.'
            });
        }


        // --------------------------------------------------
        // RECHERCHE DU CODE
        // --------------------------------------------------

        const verification = await dbGet(
            `
            SELECT
                id,
                code_hash,
                expires_at,
                attempts,
                created_at
            FROM verification_codes
            WHERE user_id = ?
              AND type = 'email'
            ORDER BY created_at DESC
            LIMIT 1
            `,
            [user.id]
        );


        console.log('VERIFICATION TROUVÉE :', verification);


        if (!verification) {

            console.log('❌ Aucun code trouvé');

            return res.status(400).json({
                success: false,
                message: 'Aucun code de vérification valide.'
            });
        }


        console.log('Code hash DB :', verification.code_hash);
        console.log('Expiration   :', verification.expires_at);
        console.log('Tentatives   :', verification.attempts);


        // --------------------------------------------------
        // EXPIRATION
        // --------------------------------------------------

        const expired = await dbGet(
            `
            SELECT
                datetime('now') >= datetime(?) AS expired
            `,
            [verification.expires_at]
        );


        console.log('EXPIRÉ :', expired);


        if (expired.expired === 1) {

            await dbRun(
                `
                DELETE FROM verification_codes
                WHERE id = ?
                `,
                [verification.id]
            );

            return res.status(400).json({
                success: false,
                message: 'Ce code a expiré. Demandez un nouveau code.'
            });
        }


        // --------------------------------------------------
        // MAXIMUM 5 TENTATIVES
        // --------------------------------------------------

        if (verification.attempts >= 5) {

            await dbRun(
                `
                DELETE FROM verification_codes
                WHERE id = ?
                `,
                [verification.id]
            );

            return res.status(429).json({
                success: false,
                message: 'Trop de tentatives. Demandez un nouveau code.'
            });
        }


        // --------------------------------------------------
        // COMPARAISON DU CODE
        // --------------------------------------------------

        const submittedHash = hashCode(code);

        console.log('Hash reçu :', submittedHash);
        console.log('Hash DB   :', verification.code_hash);


        if (submittedHash !== verification.code_hash) {

            console.log('❌ CODE INCORRECT');

            await dbRun(
                `
                UPDATE verification_codes
                SET attempts = attempts + 1
                WHERE id = ?
                `,
                [verification.id]
            );

            return res.status(400).json({
                success: false,
                message: 'Code incorrect.'
            });
        }


        // --------------------------------------------------
        // CODE CORRECT
        // --------------------------------------------------

        console.log('✅ CODE CORRECT');


        // Le code ne peut plus être réutilisé
        await dbRun(
            `
            DELETE FROM verification_codes
            WHERE id = ?
            `,
            [verification.id]
        );


        // --------------------------------------------------
        // ACTIVATION DU COMPTE
        // --------------------------------------------------

        const newStatus =
            user.role === 'patient'
                ? 'active'
                : 'pending_verification';


        await dbRun(
            `
            UPDATE users
            SET
                email_verified = 1,
                account_status = ?
            WHERE id = ?
            `,
            [
                newStatus,
                user.id
            ]
        );


        // --------------------------------------------------
        // SESSION PATIENT
        // --------------------------------------------------

        if (user.role === 'patient') {

            const token = generateToken();

            const tokenHash = hashToken(token);


            await dbRun(
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
                ]
            );


            setSessionCookie(res, token);
        }


        // --------------------------------------------------
        // RÉPONSE
        // --------------------------------------------------

        return res.json({

            success: true,

            message:
                user.role === 'patient'
                    ? 'Adresse e-mail vérifiée.'
                    : 'Adresse e-mail vérifiée. Votre compte doit maintenant être validé professionnellement.',

            user: {

                id: user.id,

                email: user.email,

                firstName: user.first_name,

                lastName: user.last_name,

                role: user.role
            }
        });


    } catch (error) {

        console.error(
            'verify-email error:',
            error
        );

        return res.status(500).json({

            success: false,

            message:
                'Une erreur interne est survenue.'
        });
    }
});

/*
 * --------------------------------------------------
 * OLD VERIFY EMAIL
 * --------------------------------------------------
*/

/*app.post(
    '/api/auth/verify-email',
    async (req, res) => {

        try {

            const email =
                req.body.email
                    ?.trim()
                    .toLowerCase();
            console.log("email: ", email);
            const code =
                String(req.body.code || '')
                    .trim();
            console.log("code: ", code);

            if (!email || !/^\d{6}$/.test(code)) {
                console.log("Invalid email or code");
                return res.status(400).json({
                    success: false,
                    message:
                        'Code de vérification invalide.'
                });
            }
            
            const request= "SELECT id,email,first_name,last_name,role,email_verified,account_status FROM users WHERE email = '"+email+"'";
            console.log("request: ", request);

            const user = await db.get(
               "SELECT id,email,first_name,last_name,role,email_verified,account_status FROM users WHERE email = 'jeanchristophemorin@gmail.com'"
            );
            
            if(user == undefined || user == null){
                console.log("User not exist");
            }
            else{
                console.log("user: ", user);
                console.log("user.email: ", user.email);
                console.log("user.email_verified: ", user.email_verified);
            }

            if (!user) {

                console.log("User not found");
                return res.status(400).json({
                    success: false,
                    message:
                        'Code de vérification invalide ou expiré.'
                });
            }


            if (user.email_verified === 1) {
                console.log("Email already verified");
                return res.status(400).json({
                    success: false,
                    message:
                        'Cette adresse e-mail est déjà vérifiée.'
                });
            }

            console.log("user id = "+user.id);

            const verification =
                await db.run(
                    `
                    SELECT
                        id,
                        code_hash,
                        expires_at,
                        attempts
                    FROM verification_codes
                    WHERE user_id = ?
                      AND type = 'email'
                    ORDER BY created_at DESC
                    LIMIT 1
                    `,
                    [user.id]
            );


            if (!verification) {
                console.log("No verification code found");
                return res.status(400).json({
                    success: false,
                    message:
                        'Aucun code de vérification valide.'
                });
            }

            console.log("verification: ", verification.code_hash, verification.expires_at, verification.attempts);
            
            Le serveur vérifie lui-même
            l'expiration.
        

            const expired =
                await db.run(
                    `
                    SELECT
                        datetime('now') >= datetime(?) AS expired
                    `,
                    [verification.expires_at]
                );


            if (expired.expired === 1) {
                console.log("Verification code expired");
                await db.run(
                    `
                    DELETE FROM verification_codes
                    WHERE id = ?
                    `,
                    [verification.id]
                );

                return res.status(400).json({
                    success: false,
                    message:
                        'Ce code a expiré. Demandez un nouveau code.'
                });
            }


            Maximum 5 essais.
            

            if (verification.attempts >= 5) {
                console.log("Too many attempts");
                await db.run(
                    `
                    DELETE FROM verification_codes
                    WHERE id = ?
                    `,
                    [verification.id]
                );

                return res.status(429).json({
                    success: false,
                    message:
                        'Trop de tentatives. Demandez un nouveau code.'
                });
            }


            const submittedHash =
                hashCode(code);


            if (
                submittedHash !==
                verification.code_hash
            ) {
                console.log("sumittedHash: ", submittedHash);
                console.log("verification.code_hash: ", verification.code_hash);
                console.log("Incorrect code");
                await db.run(
                    `
                    UPDATE verification_codes
                    SET attempts = attempts + 1
                    WHERE id = ?
                    `,
                    [verification.id]
                );

                return res.status(400).json({
                    success: false,
                    message:
                        'Code incorrect.'
                });
            }


            Le code est correct.
            On le consomme immédiatement.
            

            await db.run(
                `
                DELETE FROM verification_codes
                WHERE id = ?
                `,
                [verification.id]
            );


            Activation du compte.
            

            const newStatus =
                user.role === 'patient'
                    ? 'active'
                    : 'pending_verification';


            await db.run(
                `
                UPDATE users
                SET
                    email_verified = 1,
                    account_status = ?
                WHERE id = ?
                `,
                [
                    newStatus,
                    user.id
                ]
            );


            
             * Patient :
             * création immédiate de session.
             *
             * Neurologue :
             * pas de session tant que la
             * validation professionnelle
             * n'est pas terminée.
             *

            if (user.role === 'patient') {

                const token =
                    generateToken();

                const tokenHash =
                    hashToken(token);


                await db.run(
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
                    ]
                );


                setSessionCookie(
                    res,
                    token
                );
            }


            return res.json({

                success: true,

                message:
                    user.role === 'patient'
                        ? 'Adresse e-mail vérifiée.'
                        : 'Adresse e-mail vérifiée. Votre compte doit maintenant être validé professionnellement.',

                user: {

                    id: user.id,

                    email: user.email,

                    firstName:
                        user.first_name,

                    lastName:
                        user.last_name,

                    role: user.role
                }
            });


        } catch (error) {

            console.error(
                'verify-email error:',
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    'Une erreur interne est survenue.'
            });
        }
    }
);*/

/**
 * --------------------------------------------------
 * RESEND CODE EMAIL
 * --------------------------------------------------
 */
app.post(
    '/api/auth/resend-verification-code',
    async (req, res) => {

        try {

            const email =
                req.body.email
                    ?.trim()
                    .toLowerCase();


            if (!email) {

                return res.status(400).json({
                    success: false,
                    message:
                        'Adresse e-mail obligatoire.'
                });
            }


            const user =
                await db.get(
                    `
                    SELECT
                        id,
                        email,
                        first_name,
                        email_verified,
                        account_status
                    FROM users
                    WHERE email = ?
                    `,
                    [email]
                );


            /*
             * Ne pas révéler si un compte
             * existe ou non.
             */

            if (!user) {

                return res.json({
                    success: true,
                    message:
                        'Si cette adresse correspond à un compte en attente, un nouveau code sera envoyé.'
                });
            }


            if (user.email_verified === 1) {

                return res.status(400).json({
                    success: false,
                    message:
                        'Cette adresse e-mail est déjà vérifiée.'
                });
            }


            /*
             * Vérification d'un éventuel
             * code envoyé très récemment.
             */

            const recentCode =
                await db.get(
                    `
                    SELECT
                        id,
                        created_at
                    FROM verification_codes
                    WHERE user_id = ?
                      AND type = 'email'
                    ORDER BY created_at DESC
                    LIMIT 1
                    `,
                    [user.id]
                );


            if (recentCode) {

                const tooSoon =
                    await db.get(
                        `
                        SELECT
                            datetime('now')
                            <
                            datetime(
                                ?,
                                '+60 seconds'
                            ) AS too_soon
                        `,
                        [recentCode.created_at]
                    );


                if (tooSoon.too_soon === 1) {

                    return res.status(429).json({

                        success: false,

                        message:
                            'Veuillez patienter environ une minute avant de demander un nouveau code.'
                    });
                }
            }


            /*
             * Tous les anciens codes
             * deviennent invalides.
             */

            await db.run(
                `
                DELETE FROM verification_codes
                WHERE user_id = ?
                  AND type = 'email'
                `,
                [user.id]
            );


            const code =
                generateCode();

            const codeHash =
                hashCode(code);


            await db.run(
                `
                INSERT INTO verification_codes (
                    user_id,
                    code_hash,
                    type,
                    expires_at,
                    attempts
                )
                VALUES (
                    ?,
                    ?,
                    'email',
                    datetime('now', '+15 minutes'),
                    0
                )
                `,
                [
                    user.id,
                    codeHash
                ]
            );


            await sendVerificationEmail(
                user.email,
                user.first_name,
                code
            );


            return res.json({

                success: true,

                message:
                    'Un nouveau code vient de vous être envoyé.'
            });


        } catch (error) {

            console.error(
                'resend-verification-code error:',
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    'Impossible de renvoyer le code.'
            });
        }
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