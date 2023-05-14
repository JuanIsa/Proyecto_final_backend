import { Router } from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import upload from '../services/upload.js';
import executePolicies from '../middlewares/authJTS.js';
import { userPostRegister, userPostLogin, userGetCheck, userGetLogout } from '../controllers/user.controller.js';

const usersRoute = Router();
usersRoute.use(cookieParser());
usersRoute.post('/register', upload.single('file'), userPostRegister);
usersRoute.post('/login', passport.authenticate('login', { session: false }), userPostLogin);
usersRoute.get('/check', executePolicies(), userGetCheck);
usersRoute.get('/logout', userGetLogout);

export default usersRoute;