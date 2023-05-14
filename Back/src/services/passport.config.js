import passport from "passport";
import local from 'passport-local';

import Users from "../dao/handlerUsersDAO.js";
import { validatePassword } from "./bcrypt.js";

const instancesUser = new Users();
const LocalStrategy = local.Strategy;

export const initializeLocalPassport = () => {
    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await instancesUser.readUser(email);
        if (!user) return done(null, false, { status: 1, message: 'No existe el usuario.' });
        const isValidPassword = await validatePassword(password, user.password);
        if (!isValidPassword) return done(null, false, { status: 1, message: 'Contraseña incorrecta' });
        return done(null, user);
    }));
};
