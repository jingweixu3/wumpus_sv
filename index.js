const express = require('express');
const path = require('path');


const app = express();
let port = 3000;

let welcomePath = path.join(__dirname + '/index.html');
let gmaePath = path.join(__dirname + '/public/html/game.html');
// let rankPath = path.join(__dirname + '/public/html/rank.html');
// let aiPath = path.join(__dirname + '/public/html/ai.html');

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/script'));

app.get('', (req, res) => res.sendFile(welcomePath));
app.get('/game', (req, res) => res.sendFile(gmaePath));
// app.get('/rank', (req, res) => res.sendFile(rankPath));
// app.get('/AI', (req, res) => res.sendFile(aiPath));

app.listen(port, () => {
    console.log('Server started on port 3000');
});