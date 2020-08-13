const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id' : 1,
            'image' : 'https://placeimg.com/64/64/1',
            'name' : '양성원',
            'birthday' : '991106',
            'gender' : '남성',
            'job' : '대학생'
        },
        {
            'id' : 2,
            'image' : 'https://placeimg.com/64/64/2',
            'name' : '강윤주',
            'birthday' : '000110',
            'gender' : '여성',
            'job' : '대학생'
        }
    ]);
});

app.listen(port, () => {console.log('Server Running')});