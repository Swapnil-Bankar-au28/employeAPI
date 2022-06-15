const mysql = require('mysql2');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
const port = process.env.PORT || 8080;
//Configuring express server
app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
    host: 'localhost',

    user: 'root',
    password: 'Swapnil321@',
    connetionLimit: 10,
    database: "BookMyShow",
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err)
        console.log('Connection Established Successfully');
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});
app.get('/employee', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});
app.get('/employee/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM employee WHERE uaerID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.delete('/employee/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM learnerdetails WHERE uaerID = 1', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Learner Record deleted successfully.');
        else
            console.log(err);
    })
});
app.listen(port, () => console.log(`Listening on port ${port}..`));