// modules for node and express
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// import "mongoose" - required for DB Access
import mongoose, { mongo } from 'mongoose';

//Step 1 for auth - import modules
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import flash from 'connect-flash';

//modules for JWT support
import cors from 'cors';
import passportJWT from 'passport-jwt';

//define JWT Aliases
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

//Step 2 for auth - define our auth objects
let localStrategy = passportLocal.Strategy; //alias

//Step 3 for auth - import the user model
import User from '../Models/user';

//import the router data
import surveysRouter from '../Routes/surveys'; //Surveys routes
import authRouter from '../Routes/auth'; //authentication routes

// URI
import * as DBConfig from './db';

mongoose.connect((DBConfig.RemoteURI) ? DBConfig.RemoteURI : DBConfig.LocalURI);

const db = mongoose.connection; // alias for the mongoose connection

//Listen for Connection on Errors
db.on("error", function()
{
  console.error("Connection Error");
});

db.on("open", function()
{
  console.log(`Connected to MongoDB at: ${(DBConfig.RemoteURI) ? DBConfig.HostName : "localhost"}`);
});

// define routers
import index from '../Routes/index'; // top level routes
import surveys from '../Routes/surveys';

// Express Web App Configuration
const app = express();
export default app; // exports app as the default Object for this module

// view engine setup
app.set('views', path.join(__dirname, '../Views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /client
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../Client')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

app.use(cors()); //add CORS (cross-origin resource sharing) to the config

//Step 4 - for auth - setup express session 
app.use(session({
  secret: DBConfig.Secret,
  saveUninitialized:false,
  resave: false
}))

//Step 5 -setup Flash

app.use(flash());

//Step 6 - initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

//Step 7 - implement the Auth Strategy
passport.use(User.createStrategy());

//Step 8 - setup User serialization and deserialization (encoding and decoding)
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setup JWT options
let jwtOptions = 
{
  jwtFromRequest: ExtractJwt.fromAuthHeaderAs
}

// route redirects
app.use('/', index);
app.use('/', surveys);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:createError.HttpError, req:express.Request, res:express.Response, next: express.NextFunction) 
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
