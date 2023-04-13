const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    return res.send('Hello World');
})

app.post('/imc', (req, res) => {
    const {name, age, weight, height} = req.body;

    const imc = (weight/Math.pow(height/100, 2)).toFixed(2);

    let category;
    if(age < 18) category = 'Menor de 18';
    else if (age >= 18 && age < 60) category = 'Adulto';
    else category = 'Idoso'

    let backgroundColor;

    if(imc < 18.5) backgroundColor = '#EA6955';
    else if(imc >= 18.5 && imc < 25) backgroundColor = '#62F4A5';
    else if(imc >= 25 && imc < 30)  backgroundColor = '#E1DF41';
    else if(imc >= 30)  backgroundColor = '#EA1415';

    return res.send(JSON.stringify({name, category, backgroundColor, imc}));
})

app.listen(port);
