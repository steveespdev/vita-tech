const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

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
//Funcion que retorna todas las ordenes
app.get('/', (req, res) => {
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
  //  const units = 1;  //Test
    db.query("call vitadb.createOrder('"+name+"','"+lastName+"','"+address+"','"+phoneNumber+"','"+email+"','"+units+"');"
    , (err, result) => {
            if (err) {
                //res.send({ receive: false });
                res.send(err);
            } else {
                res.send({ receive: true });
            }
        }
    );
});

//Call a stored procedure with parameters

app.post('/track-order', (req, res) => {
    const id = req.body.id;
    db.query(`SELECT * FROM orders WHERE id = ?`, [id], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});




app.listen(4000, () => {
    console.log('Server is running on port 4000');
});