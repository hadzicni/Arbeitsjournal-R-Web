const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Arbeitsjournal Optionen</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        #container {
            text-align: center;
            padding: 40px;
            background-color: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
        }
        button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            margin-top: 10px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1em;
            transition: background-color 0.3s ease;
            display: block;
            width: 80%;
            margin-left: auto;
            margin-right: auto;
        }
        button:hover {
            background-color: #0056b3;
        }
        .margin-top {
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <div id="container">
        <h1>Arbeitsjournal Optionen</h1>
        <button onclick="fetch('/run-script', { method: 'POST' }).then(response => response.text()).then(data => alert(data)).catch(err => alert('Error: ' + err))">Journal rendern</button>
        <button class="margin-top" onclick="window.location.href='https://fxdbk.usb.ch/surveys/?s=AWTR4W8HNF33TFWM';">Eintrag schreiben</button>
    </div>
</body>
</html>
    `);
});

app.post('/run-script', (req, res) => {
    exec('quarto render Arbeitsjournal_REDCap.qmd', (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send('Script failed to run: ' + stderr);
        }
        res.send('Script run successfully ' + stdout);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
