const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const port = process.env.PORT || 8080;
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'articles'
});

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
    origin: function(origin, callback){
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

db.connect((err) => {
    if (err) { throw err }
    else { console.log('Connected') }
});

app.get('/articles', (req, res) => {
    let query = `SELECT * FROM articles`;

    db.query(query, (err, result) => {
        if (err) { return res.status(500).send(err) }
        else { res.json(result) }
    })
});

app.get('/search', (req, res) => {
    let searchText = req.query.q;
    let query = `SELECT * FROM articles WHERE title = ?`;

    if (!searchText) { query = `SELECT * FROM articles`}

    db.query(query, searchText, (err, result) => {
        if (err) { return res.status(500).send(err) }
        else { res.json(result) }
    })
});

app.post('/articles', (req, res) => {
    let query = `INSERT INTO articles SET ?`;

    db.query(query, req.body, (err, result) => {
        if (err) { return res.status(500).send(err) }
        else { res.send('Article added') }
    })
});

app.post('/register', (req, res) => {
    let user = req.body.user;

    db.query('SELECT * FROM users WHERE user = ? ', user, (err, result) => {
        if (result.length > 0) {
            res.statusMessage = "User name is taken";
            res.status(201).end()
        }
        else {
            let query = `INSERT INTO users SET ?`;

            db.query(query, req.body, (err, result) => {
                if (err) { return res.status(500).send(err) }
                else { res.send('User registered') }
            })
        }
    });

});

app.post('/login', (req, res) => {
    let user = req.body.user;
    let password = req.body.password;

    let query = `SELECT * FROM users WHERE user = ?  AND password = ?`;

    db.query(query, [user, password], (err, result) => {
        if (err) { return res.status(500).send(err) }
        else { res.json(result) }
    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});