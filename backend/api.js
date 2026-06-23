const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const tvRouter = require('./router/tvRouter');
const userRouter = require('./router/userRouter');
const authRouter = require('./router/authRouter');
const moviesRouter = require('./router/moviesRouter');
const paymentRouter = require('./router/paymentRouter');
const discoverRouter = require('./router/discoverRouter');

const app = express();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSWD}@cluster0n.re1gmpk.mongodb.net/?appName=Cluster0N`;

mongoose.connect(url)
.then(()=>{
    console.log("Succesfully connected to Database")
})
.catch((err)=>{
    console.log(`error : ${err.message}`);
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["https://test-jio.vercel.app","http://localhost:3500"],
    credentials: true
}));

/* Routers */
app.use('/api/tv',tvRouter);
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/movies',moviesRouter);
app.use('/api/payment',paymentRouter);
app.use('/api/discover',discoverRouter);

app.listen(process.env.PORT,()=>{
    console.log(`App is listening on Port ${process.env.PORT}`);
})