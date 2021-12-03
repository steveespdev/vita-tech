const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Kobe7247',
    database: 'vitadb',
});

const trackingNumber = (pr = "NE001", su = "CR") => {
    for (let i = 0; i < 5; i++) pr += ~~(Math.random() * 10);
    return pr + su;
};

//Funcion que retorna todas las ordenes
app.get('/', (req, res) => {
   // emailSender();
    db.query(`SELECT * FROM vitadb.order;`, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/purchase', (req, res) => {
    const name = req.body.name;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const units = req.body.units;
    const trackId = trackingNumber();
    db.query("call vitadb.createOrder(?,?,?,?,?,?,?);"
        , [trackId, name, lastName, address, phoneNumber, email, units], (err, result) => {
            if (err) {
                res.send(err);
            } else {
                const queryResult = JSON.parse(JSON.stringify(result[0]));
                if (queryResult[0].done === 'done') {
                    res.send({ received: true, message: "El pedido fue realizado exitosamente." });
                    emailSender(name, trackId, email);
                }

                if (queryResult[0].notEnough === 'notEnough') {
                    res.send({ received: false, message: "No existe stock suficiente para satisfacer el pedido." });

                }
            }
        }
    );
});

//Call a stored procedure with parameters

app.post('/track-order', (req, res) => {
    const trackNumber = req.body.trackingNumber;
    db.query(`SELECT hour, description, currentPlace FROM vitadb.tracking_order WHERE idOrder = ?`, [trackNumber], (err, result) => {
        if (err) {
            res.send(err);
        } else if (result.length > 0) {
            res.send(result);
        } else {
            res.send(false);
        }
    });
});


const emailSender = (name, trackID, emailAddress) => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //NO BORRAR
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'vitatech4@gmail.com',
            pass: 'ucrvitatech4',
            rejectUnauthorized: false
        }
    });


   
    const mailOptions = {
        from: 'vitatech4@gmail.com',
        to: emailAddress,
        subject: 'Codigo de Rastreo | Compra VitaTech',
        text: 'Gracias por su compra ' + name + '.\n\nEl código de rastreo para su compra es: ' + trackID + '\n\nSaludos.'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}



app.listen(4000, () => {
    console.log('Server is running on port 4000');
});