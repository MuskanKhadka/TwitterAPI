const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRouter = require('./routes/users');
const dotenv = require('dotenv').config();
const uploadRouter = require('./routes/upload');
const auth = require('./auth');
const cors = require('cors');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.options('*', cors());
app.use(express.urlencoded({extended: true }));
const port = process.env.PORT || 6000;

app.use(express.static(__dirname + "/public"));
mongoose.connect('mongodb://localhost:27017/twitter',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        () => { console.log('successful database connected'); },
    )

    .catch(() => { console.error('error connecting......'); });


app.use('/users', userRouter);
app.use('/upload', uploadRouter);
// app.use(auth.verifyUser);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(port, () => {
    console.log(`App is running at localhost:${port}`);
});
