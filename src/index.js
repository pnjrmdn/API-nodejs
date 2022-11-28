
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const {db} = require('./model/dbConn');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3001, () => {console.log('Url API running in port 3001')})

// - - - - - - - - - - - - - - - - - - - - - - read
app.get('/api/readDataUsers', (req, res) => {
    const sqlQuery = "SELECT * FROM users";

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
})

app.get('/api/readUsers/:user_email', (req, res) => {
    const userEmail = req.params.user_email;

    const sqlQuery = "SELECT * FROM users WHERE user_email = ?";

    db.query(sqlQuery, userEmail, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
})

// - - - - - - - - - - - - - - - - - - - - - - create
app.post('/api/createUsers', (req, res) => {
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;

    const sqlQuery = "INSERT INTO users (user_name, user_email, user_password) VALUE (?, ?, ?)";

    db.query(sqlQuery, [userName, userEmail, userPassword], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
})

// - - - - - - - - - - - - - - - - - - - - - - update
app.put('/api/updateUsers', (req, res) => {

    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;

    const sqlQuery = "UPDATE users SET user_name = ?, user_password = ? WHERE user_email = ?";

    db.query(sqlQuery, [userName, userPassword, userEmail], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })

})

// - - - - - - - - - - - - - - - - - - - - - - delete
app.delete('/api/deleteUsers', (req, res) => {
    const userId = req.body.user_id;

    const sqlQuery = "DELETE FROM users WHERE user_id = ?";

    db.query(sqlQuery, userId, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            console.log(result);
        }
    })
})