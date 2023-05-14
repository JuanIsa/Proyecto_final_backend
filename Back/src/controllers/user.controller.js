'use strict';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import Users from '../dao/handlerUsersDAO.js';
import sendMail from '../services/mailer.js';
import UserDTO from '../dao/dto/userDTO.js';

const userDto= new UserDTO();

dotenv.config();
const instanceOfUsers = new Users();

export const userPostRegister = (req, res) => {
    const infoFront = JSON.parse(req.body.data);
    if (req.file) {
        infoFront['userImg'] = `${req.protocol}://${req.hostname}:${process.env.PORT}/userImg/${req.file.filename}`;
    }
    instanceOfUsers.readUser(infoFront.email)
        .then(data => {
            if (data === null) {
                instanceOfUsers.createUser(infoFront)
                    .then(data => {
                        res.send({ status: 0, message: `${data.completeName} creaste con éxito tu usuario.` })
                        sendMail('juan_isa2003@yahoo.com.ar', 'Nuevo registro', `<h2>${JSON.stringify(data)}</h2>`)
                            .then(() => console.log('Se envió un correo al administrador por la creación de un nuevo usuario.'))
                            .catch(e => console.log(e));
                    })
                    .catch(e => console.log(e));
            } else {
                res.send({ status: 1, message: 'El usuario YA existe. Registrate con otro email.' });
                if (infoFront['userImg'] != undefined) {
                    fs.unlink(`./public/userImg/${req.file.filename}`, (error) => {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        console.log('Se borró la foto de perfíl.');
                    });
                };
            }
        })
        .catch(e => console.log(e));
}
export const userPostLogin = async (req, res) => {
    const userToken =userDto.getTokenDTO(req.user);
    const token = jwt.sign(userToken, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie(process.env.JWT_COOKIE, token).send({ status: 0, message: 'Sesión iniciada con éxito.' });
}
export const userGetCheck = (req, res) => {
    res.send({ status: 0, message: req.user });
}
export const userGetLogout = (req, res) => {
    res.clearCookie(process.env.JWT_COOKIE).send({ status: 1, message: 'Deslogueado.' });
}