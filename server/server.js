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
});

